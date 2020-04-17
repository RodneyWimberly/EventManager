using Arch.EntityFrameworkCore.UnitOfWork;
using AutoMapper;
using EventManager.DataAccess.Models;
using System.Collections;
using System.Linq;
using System.Reflection;

namespace EventManager.Web.ViewModels.Mappers
{
    public class GenericConcurrencyMapper<TViewModel, TEntity> : ITypeConverter<TViewModel, TEntity>
        where TViewModel : ApplicationViewModelBase, new()
        where TEntity : ApplicationEntityBase, new()
    {
        readonly IUnitOfWork _unitOfWork;
        public GenericConcurrencyMapper(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public TEntity Convert(TViewModel source, TEntity destination, ResolutionContext context)
        {
            if (source == null)
                return null;

            if (destination == null)
            {
                destination = source.Id > 0 ?
                    _unitOfWork.GetRepository<TEntity>().GetFirstOrDefault(predicate: e => e.Id == source.Id) :
                    OnNewEntity(source, context);

            }
            if (destination.Id == source.Id &&
                (destination.RowVersion == null || destination.RowVersion.IsEqualTo(source.RowVersion)))
            {
                destination = OnUpdateEntity(destination, source, context);
            }
            else
                throw new MappingConcurrencyException<TViewModel, TEntity>(source, destination);
            return destination;
        }

        protected virtual TEntity OnNewEntity(TViewModel viewModel, ResolutionContext context)
        {
            TEntity entity = new TEntity()
            {
                Id = viewModel.Id,
                CreatedBy = viewModel.CreatedBy,
                CreatedDate = viewModel.CreatedDate,
                UpdatedBy = viewModel.UpdatedBy,
                UpdatedDate = viewModel.UpdatedDate,
                RowVersion = viewModel.RowVersion
            };
            return CopyProperties(viewModel, entity, context);
        }

        protected virtual TEntity OnUpdateEntity(TEntity entity, TViewModel viewModel, ResolutionContext context)
        {
            return CopyProperties(viewModel, entity, context);
        }

        private TEntity CopyProperties(TViewModel source, TEntity destination, ResolutionContext context)
        {
            PropertyInfo[] sourceProperties = source.GetType().GetProperties(),
                destinationProperties = destination.GetType().GetProperties();

            foreach (PropertyInfo sourceProperty in sourceProperties)
            {
                PropertyInfo destinationProperty = destinationProperties.Where(d =>
                    d.Name == sourceProperty.Name &&
                    d.PropertyType == sourceProperty.PropertyType)
                    .FirstOrDefault();
                if (destinationProperty != null)
                {
                    object sourceValue = sourceProperty.GetValue(source),
                        destinationValue = destinationProperty.GetValue(destination);

                    if (destinationProperty.PropertyType.IsSubclassOf(typeof(IEnumerable)))
                    {
                        destinationProperty.SetValue(destination, context.Mapper.Map(sourceValue, destinationValue, sourceProperty.PropertyType, destinationProperty.PropertyType));
                    }
                    else
                    {
                        if (destinationValue != sourceValue)
                            destinationProperty.SetValue(destination, sourceValue);
                    }
                }
            }
            return destination;
        }
    }
}

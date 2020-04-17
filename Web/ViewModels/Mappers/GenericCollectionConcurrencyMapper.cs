using Arch.EntityFrameworkCore.UnitOfWork;
using AutoMapper;
using EventManager.DataAccess.Models;
using System.Collections.Generic;
using System.Linq;

namespace EventManager.Web.ViewModels.Mappers
{
    public class GenericCollectionConcurrencyMapper<TViewModel, TEntity> : ITypeConverter<ICollection<TViewModel>, ICollection<TEntity>>
      where TViewModel : ApplicationViewModelBase, new()
      where TEntity : ApplicationEntityBase, new()
    {
        readonly IUnitOfWork _unitOfWork;
        public GenericCollectionConcurrencyMapper(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public ICollection<TEntity> Convert(ICollection<TViewModel> source, ICollection<TEntity> destination, ResolutionContext context)
        {
            if (source == null)
                return null;

            if (destination == null)
            {
                destination = new List<TEntity>();
            }
            if (destination.Count == 0 && source.Count > 0)
            {
                foreach (TViewModel sourceItem in source)
                {
                    TEntity destinitionItem = _unitOfWork.GetRepository<TEntity>().GetFirstOrDefault(predicate: e => e.Id == sourceItem.Id);

                    destination.Add(destinitionItem != null ?
                        context.Mapper.Map(sourceItem, destinitionItem) :
                        context.Mapper.Map<TEntity>(sourceItem));
                }
            }
            else
            {
                foreach (TViewModel sourceItem in source)
                {
                    TEntity destinationItem = destination.Where(d => d.Id == sourceItem.Id).SingleOrDefault();
                    if (destinationItem == null)
                    {
                        destinationItem = _unitOfWork.GetRepository<TEntity>().GetFirstOrDefault(e => e, e => e.Id == sourceItem.Id);
                        if (destinationItem == null)
                            destinationItem = context.Mapper.Map<TEntity>(sourceItem);
                        destination.Add(destinationItem);
                    }
                    else
                        destinationItem = context.Mapper.Map(sourceItem, destinationItem);
                }
            }
            return destination;
        }
    }
}

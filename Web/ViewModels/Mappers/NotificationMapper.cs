/*using Arch.EntityFrameworkCore.UnitOfWork;
using AutoMapper;
using EventManager.DataAccess.Models;

namespace EventManager.Web.ViewModels.Mappers
{
    public class NotificationMapper : ITypeConverter<NotificationViewModel, Notification>
    {
        readonly IUnitOfWork _unitOfWork;
        public NotificationMapper(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public Notification Convert(NotificationViewModel source, Notification destination, ResolutionContext context)
        {
            if (source == null)
                return null;

            if (destination == null)
            {
                destination = source.Id > 0 ?
                    _unitOfWork.GetRepository<Notification>().GetFirstOrDefault(predicate: n => n.Id == source.Id) :
                    new Notification(source.Id, source.Header, source.Body, source.IsRead, source.IsPinned, source.Date)
                    {
                        CreatedBy = source.CreatedBy,
                        CreatedDate = source.CreatedDate,
                        UpdatedBy = source.UpdatedBy,
                        UpdatedDate = source.UpdatedDate,
                        RowVersion = source.RowVersion
                    };
            }
            if (destination.Id == source.Id &&
                (destination.RowVersion == null || destination.RowVersion.IsEqualTo(source.RowVersion)))
            {
                if (destination.Header != source.Header)
                    destination.Header = source.Header;
                if (destination.Body != source.Body)
                    destination.Body = source.Body;
                if (destination.IsRead != source.IsRead)
                    destination.IsRead = source.IsRead;
                if (destination.IsPinned != source.IsPinned)
                    destination.IsPinned = source.IsPinned;
                if (destination.Date != source.Date)
                    destination.Date = source.Date;
            }
            else
                throw new MappingConcurrencyException<NotificationViewModel, Notification>(source, destination);
            return destination;
        }
    }
}
*/
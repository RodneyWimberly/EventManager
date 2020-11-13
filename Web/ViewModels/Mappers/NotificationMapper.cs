using Arch.EntityFrameworkCore.UnitOfWork;
using AutoMapper;
using Castle.Core.Internal;
using EventManager.DataAccess.Events.Models;

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
                destination = source.Id.IsNullOrEmpty() ?
                    new Notification(source.Id, source.Header, source.Body, source.IsRead, source.IsPinned, source.Date)
                    {
                        CreatedBy = source.CreatedBy,
                        CreatedDate = source.CreatedDate,
                        UpdatedBy = source.UpdatedBy,
                        UpdatedDate = source.UpdatedDate,
                    } :
                    _unitOfWork.GetRepository<Notification>().GetFirstOrDefault(predicate: n => n.Id == source.Id);
            }
            if (destination.Id == source.Id)
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

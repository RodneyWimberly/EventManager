

using System.ComponentModel.DataAnnotations;

namespace EventManager.Shared.DataAccess.Interfaces
{
    public interface IConcurrencyTrackingEntity
    {
        [Timestamp]
        byte[] RowVersion { get; set; }
    }
}

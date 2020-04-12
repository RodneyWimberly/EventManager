

using System.ComponentModel.DataAnnotations;

namespace EventManager.DataAccess.Core.Interfaces
{
    public interface IConcurrencyTrackingEntity
    {
        [Timestamp]
        byte[] RowVersion { get; set; }
    }
}

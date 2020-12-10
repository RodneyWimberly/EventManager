using EventManager.Shared.Core;
using EventManager.Shared.DataAccess.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Linq.Dynamic.Core;

namespace EventManager.Shared.DataAccess
{
    public static class PropertyBuilderExtensions
    {
        /// <summary>
        /// Converts DateTime to string and back preserving the timezone information. 
        /// SQLite doesn't have good DateTime data type so strings are used for persistence.
        /// </summary>
        /// <param name="propertyBuilder"></param>
        /// <returns></returns>
        public static PropertyBuilder<DateTime> SetupDateTimeEntityProperty(this PropertyBuilder<DateTime> propertyBuilder)
        {
            return propertyBuilder.HasConversion(v => v.ToUniversalTime().ToString("o", CultureInfo.CurrentCulture), v => DateTime.Parse(v, null, DateTimeStyles.AssumeUniversal));
        }

        /// <summary>
        /// Converts TimeOfDay to string and back
        /// SQLite doesn't have good TimeOfDay data type so strings are used for persistence.     /// </summary>
        /// <param name="propertyBuilder"></param>
        /// <returns></returns>
        public static PropertyBuilder<TimeOfDay> SetupTimeOfDayEntityProperty(this PropertyBuilder<TimeOfDay> propertyBuilder)
        {
            return propertyBuilder.HasConversion(v => v.ToString(), v => TimeOfDay.Parse(v));
        }

        public static void UpdateAuditableEntities<T>(this T dbContext) where T : DbContext, IAuditableDbContext
        {
            IEnumerable<EntityEntry> modifiedEntries = dbContext.ChangeTracker.Entries()
                .Where(x => x.Entity is IAuditableEntity &&
                       (x.State == EntityState.Added ||
                       x.State == EntityState.Modified));

            DateTime now = DateTime.UtcNow;
            foreach (EntityEntry entry in modifiedEntries)
            {
                IAuditableEntity entity = (IAuditableEntity)entry.Entity;

                if (entry.State == EntityState.Added)
                {
                    entity.CreatedDate = now;
                    entity.CreatedBy = dbContext.CurrentUserId;
                }
                else
                {
                    dbContext.Entry(entity).Property(x => x.CreatedBy).IsModified = false;
                    dbContext.Entry(entity).Property(x => x.CreatedDate).IsModified = false;
                }

                entity.UpdatedDate = now;
                entity.UpdatedBy = dbContext.CurrentUserId;
            }
        }
    }
}

using EventManager.DataAccess.Core.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace EventManager.DataAccess.Extensions
{
    public static class EntityTypeBuilderExtensions
    {
        public static EntityTypeBuilder<TEntity> SetupPrimaryKeyEntityProperty<TEntity>(this EntityTypeBuilder<TEntity> entityTypeBuilder) where TEntity : class, IPrimaryKeyEntity<string>
        {
            entityTypeBuilder.HasIndex(e => e.Id).IsUnique();
            return entityTypeBuilder;
        }

        public static EntityTypeBuilder<TEntity> SetupEntityTable<TEntity>(this EntityTypeBuilder<TEntity> entityTypeBuilder, string tableName) where TEntity : class, IPrimaryKeyEntity<string>, IAuditableEntity, IConcurrencyTrackingEntity
        {
            entityTypeBuilder.SetupPrimaryKeyEntityProperty();
            entityTypeBuilder.ToTable(tableName);
            return entityTypeBuilder;
        }

        public static EntityTypeBuilder<TEntity> SetupEntityContainer<TEntity>(this EntityTypeBuilder<TEntity> entityTypeBuilder, string containerName) where TEntity : class, IPrimaryKeyEntity<string>, IAuditableEntity
        {
            entityTypeBuilder.SetupPrimaryKeyEntityProperty();
            entityTypeBuilder.SetupAuditableEntityProperties();
            entityTypeBuilder.UseETagConcurrency();
            entityTypeBuilder.ToContainer(containerName);
            return entityTypeBuilder;
        }

        public static EntityTypeBuilder<TEntity> SetupAuditableEntityProperties<TEntity>(this EntityTypeBuilder<TEntity> entityTypeBuilder) where TEntity : class, IAuditableEntity
        {
            entityTypeBuilder.Property(e => e.CreatedDate).SetupDateTimeEntityProperty();
            entityTypeBuilder.Property(e => e.UpdatedDate).SetupDateTimeEntityProperty();
            return entityTypeBuilder;
        }

    }
}

using EventManager.Identity.DataAccess.Models;
using EventManager.Shared.DataAccess;
using EventManager.Shared.DataAccess.Constants;
using EventManager.Shared.DataAccess.Extensions;
using EventManager.Shared.DataAccess.Interfaces;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;

namespace EventManager.Identity.DataAccess
{
    public class IdentityDbContext : IdentityDbContext<User,
                                                        Role,
                                                        string,
                                                        UserClaim,
                                                        UserRole,
                                                        UserLogin,
                                                        RoleClaim,
                                                        UserToken>, IAuditableDbContext
    {
        public DbSet<FidoStoredCredential> FidoStoredCredential { get; set; }
        private string _currentUserId;
        public string CurrentUserId
        {
            get => string.IsNullOrEmpty(_currentUserId) ? Ids.SystemUserId : _currentUserId;
            set => _currentUserId = value;
        }

        public IdentityDbContext(DbContextOptions<IdentityDbContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            // RoleClaims
            builder.Entity<RoleClaim>().ToTable("RoleClaims");

            // UserClaims 
            builder.Entity<UserClaim>().ToTable("UserClaims");

            // UserLogins
            builder.Entity<UserLogin>().ToTable("UserLogins");

            // UserRoles
            builder.Entity<UserRole>().ToTable("UserRoles");

            // UserTokens
            builder.Entity<UserToken>().ToTable("UserTokens");

            // User
            builder.Entity<User>().SetupEntityTable("Users");
            builder.Entity<User>().HasMany(u => u.Claims)
                .WithOne()
                .HasForeignKey(c => c.UserId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade);
            builder.Entity<User>().HasMany(u => u.Roles)
                .WithOne()
                .HasForeignKey(r => r.UserId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade);

            // Role
            builder.Entity<Role>().SetupEntityTable("Roles");
            builder.Entity<Role>()
                .HasMany(r => r.Claims)
                .WithOne()
                .HasForeignKey(c => c.RoleId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade);
            builder.Entity<Role>()
                .HasMany(r => r.Users)
                .WithOne()
                .HasForeignKey(r => r.RoleId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<FidoStoredCredential>().HasKey(m => m.Id);
        }

        public override int SaveChanges()
        {
            this.UpdateAuditableEntities();
            return base.SaveChanges();
        }

        public override int SaveChanges(bool acceptAllChangesOnSuccess)
        {
            this.UpdateAuditableEntities();
            return base.SaveChanges(acceptAllChangesOnSuccess);
        }

        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            this.UpdateAuditableEntities();
            return base.SaveChangesAsync(cancellationToken);
        }

        public override Task<int> SaveChangesAsync(bool acceptAllChangesOnSuccess, CancellationToken cancellationToken = default)
        {
            this.UpdateAuditableEntities();
            return base.SaveChangesAsync(acceptAllChangesOnSuccess, cancellationToken);
        }
    }
}

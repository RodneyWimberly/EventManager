using EventManager.DataAccess.Core.Interfaces;
using EventManager.DataAccess.Accounts.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;

namespace EventManager.DataAccess.Accounts
{
    public class AccountsDbContext : IdentityDbContext<User,
                                                        Role,
                                                        string,
                                                        UserClaim,
                                                        UserRole,
                                                        UserLogin,
                                                        RoleClaim,
                                                        UserToken>, IHttpDbContext
    {
        private const string systemUserId = "11111111-1111-1111-1111-111111111111";
        private string _currentUserId;
        public string CurrentUserId
        {
            get => string.IsNullOrEmpty(_currentUserId) ? systemUserId : _currentUserId;
            set => _currentUserId = value;
        }

        public AccountsDbContext(DbContextOptions<AccountsDbContext> options) : base(options)
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

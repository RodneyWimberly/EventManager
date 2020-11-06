using EventManager.DataAccess.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace EventManager.DataAccess
{
    public class AccountManagerDbContext : IdentityDbContext<ApplicationUser,
                                                              ApplicationRole,
                                                              string,
                                                              ApplicationUserClaim,
                                                              ApplicationUserRole,
                                                              ApplicationUserLogin,
                                                              ApplicationRoleClaim,
                                                              ApplicationUserToken>
    {
        private const string systemUserId = "11111111-1111-1111-1111-111111111111";
        private string _currentUserId;
        public string CurrentUserId
        {
            get => string.IsNullOrEmpty(_currentUserId) ? systemUserId : _currentUserId;
            set => _currentUserId = value;
        }

        public AccountManagerDbContext(DbContextOptions<AccountManagerDbContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            // RoleClaims
            builder.Entity<ApplicationRoleClaim>().ToTable("RoleClaims");

            // UserClaims 
            builder.Entity<ApplicationUserClaim>().ToTable("UserClaims");

            // UserLogins
            builder.Entity<ApplicationUserLogin>().ToTable("UserLogins");

            // UserRoles
            builder.Entity<ApplicationUserRole>().ToTable("UserRoles");

            // UserTokens
            builder.Entity<ApplicationUserToken>().ToTable("UserTokens");

            // ApplicationUser
            builder.Entity<ApplicationUser>().SetupEntityTable("Users");
            builder.Entity<ApplicationUser>().HasMany(u => u.Claims)
                .WithOne()
                .HasForeignKey(c => c.UserId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade);
            builder.Entity<ApplicationUser>().HasMany(u => u.Roles)
                .WithOne()
                .HasForeignKey(r => r.UserId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade);

            // ApplicationRole
            builder.Entity<ApplicationRole>().SetupEntityTable("Roles");
            builder.Entity<ApplicationRole>()
                .HasMany(r => r.Claims)
                .WithOne()
                .HasForeignKey(c => c.RoleId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade);
            builder.Entity<ApplicationRole>()
                .HasMany(r => r.Users)
                .WithOne()
                .HasForeignKey(r => r.RoleId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}

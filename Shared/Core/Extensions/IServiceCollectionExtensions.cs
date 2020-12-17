using EventManager.Shared.Core.Email;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace EventManager.Shared.Core.Extensions
{
    public static class IServiceCollectionExtensions
    {
        public static IServiceCollection ConfigureEmailService(this IServiceCollection services,
             IConfiguration configuration)
        {
            services.Configure<SmtpConfig>(configuration.GetSection("SmtpConfig"));
            services.AddScoped<IEmailService, EmailService>();
            return services;
        }

        public static IServiceCollection ConfigureEmailSender(this IServiceCollection services,
          IConfiguration configuration)
        {
            services.Configure<EmailSettings>(configuration.GetSection("EmailSettings"));
            services.AddTransient<IEmailSender, EmailSender>();
            return services;
        }




    }

}

using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace EventManager.Web
{
  public class Startup
  {
    public void ConfigureServices(IServiceCollection services)
    {
      services.AddControllers();
    }

    public void Configure(IApplicationBuilder app, IWebHostEnvironment env, ILogger<Startup> logger)
    {
      logger.LogInformation("Configuring the HTTP request pipeline");
      if (env.IsDevelopment()) app.UseDeveloperExceptionPage();
      app.UseHttpsRedirection();
      app.UseStaticFiles();
      app.UseRouting();
      app.UseEndpoints(endpoints => { endpoints.MapDefaultControllerRoute(); });
    }
  }
}

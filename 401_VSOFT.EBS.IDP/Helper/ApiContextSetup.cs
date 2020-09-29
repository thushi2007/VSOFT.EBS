using System;
using System.IO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

using Serilog;
using Serilog.Events;

using VSOFT.EBS.BO;

namespace VSOFT.EBS.IDP.Helper
{
    public class ApiContextSetup
    {
        public string AppName { get; set; }
        public string AppVersion { get; set; }
        public DateTime AppStarted { get; set; }

        public ApiConfigs AppConfigs { get; set; }
        public String AppEnvironment { get; set; }

        public IServiceCollection RootServices { get; set; }

        public ApiContextSetup(DateTime appStarted)
        {
            this.AppStarted = appStarted;
        }

        /// <summary>
        /// Loading all resources
        /// </summary>
        public void LoadAllConfigs()
        {
            this.LoadEnvironment();
            this.LoadConfigurations();
            this.LoadLogger();
        }

        /// <summary>
        /// Inject all needed services
        /// </summary>
        /// <param name="services">Services to inject</param>
        public void ConfigureServices(IServiceCollection services)
        {
            this.RootServices = services ?? new ServiceCollection();
            this.AddConfigurationService();
            this.AddLoggingService();
            this.AddDataContextService();
            this.AddAppContext();
        }

        /// <summary>
        /// Loading configuration and inject service to application
        /// </summary>
		private void AddConfigurationService()
        {
            this.RootServices.AddSingleton(this.AppConfigs);
        }

        /// <summary>
        /// Loading logging and inject service to application
        /// </summary>
		private void AddLoggingService()
        {
            this.RootServices.AddSingleton<ILogger>(Log.Logger);
        }

        /// <summary>   
        /// Loading database context and inject service to application
        /// </summary>
		private void AddDataContextService()
        {
            this.RootServices.AddDbContext<UserDbContext>(options =>
                options.UseSqlServer(this.AppConfigs.Secure.SqlConnectionString, 
                options => options.EnableRetryOnFailure()));
        }

        /// <summary>
        /// Loading the whole web context
        /// </summary>
        private void AddAppContext()
        {
            this.RootServices.AddScoped((provider) =>
            {
                return (ApiContext)Activator.CreateInstance(typeof(ApiContext),
                     this.AppName,
                     this.AppVersion,
                     this.AppStarted,
                     this.AppEnvironment,
                     provider.GetService<ApiConfigs>(),
                     provider.GetRequiredService<ILogger>(),
                     provider.GetService<UserDbContext>());
            });
        }

        /// <summary>
        /// Loading environment 
        /// </summary>
        private void LoadEnvironment()
        {
            string envVariable = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");

            switch (envVariable)
            {
                case "Development":
                    this.AppEnvironment = "Development";
                    break;
                case "Stage":
                    this.AppEnvironment = "Stage";
                    break;
                default:
                    this.AppEnvironment = "Production";
                    break;
            }
        }

        /// <summary>
        /// Loading local/secure/log configurations
        /// </summary>
        private void LoadConfigurations()
        {
            var config = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json", false, true)
                .AddJsonFile($"appsettings.{this.AppEnvironment}.json", false, true)
                .AddEnvironmentVariables()
                .Build();

            ApiConfigs appConfig = (ApiConfigs)Activator.CreateInstance(typeof(ApiConfigs));
            config.Bind(appConfig);

            this.AppConfigs = appConfig;

            AppName = appConfig.AppName;
            AppVersion = appConfig.AppVersion;
        }

        /// <summary>
        /// Loading logging configurations
        /// </summary>
        public void LoadLogger()
        {
            string logPath = Directory.GetCurrentDirectory() + this.AppConfigs.Logging.LogFilePath;

            Log.Logger = new LoggerConfiguration()
                .MinimumLevel.Override("Microsoft", LogEventLevel.Warning)
                .MinimumLevel.Override("System", LogEventLevel.Warning)
                .Enrich.FromLogContext()
                .Enrich.WithProperty("Application", this.AppConfigs.AppName)
                .WriteTo.Console(restrictedToMinimumLevel: LogEventLevel.Information)
                .CreateLogger();
            AppDomain.CurrentDomain.ProcessExit += (s, e) => Log.CloseAndFlush();
        }
    }
}

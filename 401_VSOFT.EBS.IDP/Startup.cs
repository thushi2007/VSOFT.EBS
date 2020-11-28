using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Reflection;

using System.Security.Cryptography.X509Certificates;
using IdentityServer4.Services;
using IdentityServer4.Validation;

using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using Newtonsoft.Json.Serialization;

using Swashbuckle.AspNetCore.Filters;
using Swashbuckle.AspNetCore.SwaggerUI;

using VSOFT.EBS.BO;
using VSOFT.EBS.IDP.Helper;

namespace VSOFT.EBS.IDP
{
    public class Startup
    {
        ApiContextSetup apiSetup;
        readonly string MyAllowSpecificOrigins = "allowSpecificOrigins";


        public Startup(IConfiguration config)
        {
            apiSetup = new ApiContextSetup(DateTime.Now, config);
            apiSetup.LoadAllConfigs();
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddHealthChecks();

            var cultureInfo = new CultureInfo("de-CH");
            cultureInfo.NumberFormat.CurrencySymbol = "CHF";
                
            CultureInfo.DefaultThreadCurrentCulture = cultureInfo;
            CultureInfo.DefaultThreadCurrentUICulture = cultureInfo;

            apiSetup.ConfigureServices(services);

            services.AddIdentity<AspNetUser, AspNetRole>()
            .AddEntityFrameworkStores<UserDbContext>()
            .AddDefaultTokenProviders();

            services.AddIdentityServer(options =>
            {
                options.IssuerUri = apiSetup.AppConfigs.Secure.IssuerUrl;
                options.Authentication.CookieLifetime = new TimeSpan(24, 0, 0);
                options.Authentication.CookieSlidingExpiration = false;
            })
             .AddInMemoryApiResources(Config.GetApisResources())
             .AddInMemoryClients(Config.GetClients())
             .AddInMemoryApiScopes(Config.GetApiScopes())
             .AddDeveloperSigningCredential()
             //.AddSigningCredential(cert)
             .AddProfileService<ProfileService>();

            services.AddTransient<IResourceOwnerPasswordValidator, ResourceOwnerPasswordValidator>();
            services.AddTransient<IProfileService, ProfileService>();

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo
                {
                    Title = apiSetup.AppConfigs.AppName,
                    Description = "eSuperMarket Identity Server for frontend clients like angular and native mobile apps.",
                    Version = apiSetup.AppConfigs.AppVersion
                });

                c.ExampleFilters();
                c.EnableAnnotations();

                c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    Description =
                          "Bearer authorization with an access token issued by Anibis Identity. Example: \"bearer {token}\"",
                    In = ParameterLocation.Header,
                    Name = "Authorization",
                    Type = SecuritySchemeType.ApiKey
                });

                c.AddSecurityRequirement(new OpenApiSecurityRequirement()
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type = ReferenceType.SecurityScheme,
                                Id = "Bearer"
                            },
                            Scheme = "oauth2",
                            Name = "Bearer",
                            In = ParameterLocation.Header,

                        },
                        new List<string>()
                    }
                });

                c.ResolveConflictingActions(apiDescriptions => apiDescriptions.First());

                var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
                var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
                c.IncludeXmlComments(xmlPath);
            });
            services.AddSwaggerExamplesFromAssemblyOf<object>();
            services.AddHttpContextAccessor();
            services.AddCors(options =>
            {               
                options.AddPolicy(MyAllowSpecificOrigins,
                builder =>
                {
                    var origins = apiSetup.AppConfigs.ClientOrigin.Split(";");
                    builder.WithOrigins(origins)
                        .AllowAnyHeader()
                        .AllowAnyMethod();
                }); 
            });

            services.AddControllers()
            .AddNewtonsoftJson(options =>
            {
                options.SerializerSettings.ContractResolver = new DefaultContractResolver();
                options.SerializerSettings.DateFormatHandling = Newtonsoft.Json.DateFormatHandling.IsoDateFormat;
                options.SerializerSettings.DateTimeZoneHandling = Newtonsoft.Json.DateTimeZoneHandling.Local;
            }).AddXmlSerializerFormatters();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, UserDbContext dbContext, UserManager<AspNetUser> userManager, RoleManager<AspNetRole> roleManager)
        {
            dbContext.Database.EnsureCreated(); 
            DbInitializer.Initialize(userManager, roleManager);

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHealthChecks("/healthcheck");

            app.UseCors(MyAllowSpecificOrigins);
            app.UseIdentityServer();
            app.UseHttpsRedirection();

            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", apiSetup.AppConfigs.AppName);
                c.RoutePrefix = "swagger";

                c.DefaultModelExpandDepth(2);
                c.DefaultModelRendering(ModelRendering.Example);
                c.DefaultModelsExpandDepth(-1);
                c.DisplayOperationId();
                c.DisplayRequestDuration();
                c.DocExpansion(DocExpansion.List);
                c.EnableDeepLinking();
                c.EnableFilter();
                c.ShowExtensions();
                c.EnableValidator();
                c.SupportedSubmitMethods(SubmitMethod.Get, SubmitMethod.Head, SubmitMethod.Post, SubmitMethod.Put);
            });

            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}

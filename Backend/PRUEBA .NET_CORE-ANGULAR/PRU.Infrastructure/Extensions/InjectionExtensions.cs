using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using PRU.Infrastructure.Persitences.Context;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PRU.Infrastructure.Extensions
{
    public static class InjectionExtensions
    {
        public static IServiceCollection AddInjectionInfrastructure(this IServiceCollection services, IConfiguration configuration)
        {
            var assembly = typeof(PruContext).Assembly.FullName;
            services.AddDbContext<PruContext>(options => options.UseSqlServer(
                configuration.GetConnectionString("Pruconnection"),
                b => b.MigrationsAssembly(assembly)), ServiceLifetime.Transient

            );
          /*  services.AddTransient<IUnitOfWork, UnitOfWork>();
            services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
            services.AddTransient<IGenerateExcel, GenerateExcel>();
            services.AddTransient<IFileStorageLocal, FileStorageLocal>();*/
            return services;
        }


    }
}

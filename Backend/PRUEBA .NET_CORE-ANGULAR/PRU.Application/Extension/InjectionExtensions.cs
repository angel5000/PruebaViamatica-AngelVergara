using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using PRU.Application.Interfaces;
using PRU.Application.Services;

namespace PRU.Application.Extension
{
    public static class InjectionExtensions
    {
        public static IServiceCollection AddInjectionApplication(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddSingleton(configuration);

            services.AddValidatorsFromAssembly(Assembly.GetExecutingAssembly());



            services.AddAutoMapper(Assembly.GetExecutingAssembly());
            services.AddScoped<IUsuariosApplication, UsuariosApplication>();
            return services;

        }

    }

}

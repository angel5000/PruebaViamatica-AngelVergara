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
using PRU.Application.Commons.Validations;

namespace PRU.Application.Extension
{
    public static class InjectionExtensions
    {
        public static IServiceCollection AddInjectionApplication(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddSingleton(configuration);

            services.AddValidatorsFromAssembly(Assembly.GetExecutingAssembly());



            services.AddAutoMapper(Assembly.GetExecutingAssembly());
            services.AddScoped<Validaciones>();

           services.AddScoped<IUsuariosApplication, UsuariosApplication>();

           services.AddScoped<ISesiones, Sesiones>();
           services.AddScoped<IAdministrador, Administrador>();
           services.AddScoped<IAuth, Auth>();
           services.AddScoped<IDashboardApplication, DashboardApplication>();
           services.AddScoped<IRecuperaContraseñaApplication, RecuperaContraseñaApplication>();
            services.AddScoped<IRolesOpcionesApplication, RolesOpcionesApplication>();
            return services;

        }

    }

}

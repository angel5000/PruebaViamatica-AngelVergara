using DocumentFormat.OpenXml.Spreadsheet;
using PRU.Application.Commons.Bases.Response;
using PRU.Application.Dtos.Usuarios.Request;
using PRU.Infrastructure.Persitences.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace PRU.Application.Commons.Validations
{
    public class Validaciones
    {
        private readonly PruContext _context;
        public Validaciones(PruContext context)
        {
            _context = context;

        }
        /*
        public string GenerarCorreo(string nombres, string apellidos, string identificacion)
        {
            // Reemplazar los espacios por puntos en los nombres y apellidos
            nombres = nombres.Replace(" ", "");
            apellidos = apellidos.Replace(" ", "");

            // Generar el correo base con los nombres y apellidos modificados
            var correoBase = $"{nombres[0].ToString().ToLower()}{apellidos.ToLower()}@mail.com";
            var correo = correoBase;
            int contador = 1;

            // Verificar si el correo ya existe y, en ese caso, añadir un contador al final
            while (_context.Usuarios.Any(u => u.Mail == correo))
            {
                correo = $"{nombres[0].ToString().ToLower()}{apellidos.ToLower()}{contador}@mail.com";
                contador++;
            }

            return correo;
        }*/

      public bool ValidarUsuario(string nombreUsuario)
{
    var regex = new Regex(@"^(?=.*[A-Z])(?=.*\d)[A-Za-z0-9]{8,20}$");
    return regex.IsMatch(nombreUsuario);
}

        public bool ValidarContraseña(string contraseña)
        {
            var regex = new Regex(@"^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$");
            return regex.IsMatch(contraseña);
        }
        public bool ValidarIdentificacion(string identificacion)
        {
            var regex = new Regex(@"^\d{10}$");
            if (!regex.IsMatch(identificacion)) return false;

            for (int i = 0; i < identificacion.Length - 3; i++)
            {
                if (identificacion[i] == identificacion[i + 1] && identificacion[i + 1] == identificacion[i + 2] && identificacion[i + 2] == identificacion[i + 3])
                {
                    return false;
                }
            }
            return true;
        }

        public bool ValidateUser(TokenRequest model)
        {
            var usuario = _context.Usuarios .FirstOrDefault(u => u.UserName == model.Credenciales || u.Mail == model.Credenciales);

            if (usuario != null)
            {
                if (usuario.SesionActive!.Equals("Inactivo"))
                {
                    return false; // La sesión ya está activa
                }

                if (usuario.Password == model.Password)
                {
                    // Iniciar sesión: establecer la sesión activa
                    usuario.SesionActive = "Activo";
                    _context.SaveChanges();
                    return true;
                }

                else
                {
                    // Contraseña incorrecta
                    return false;
                }
            }

            return false; // Usuario no encontrado
        }



       
        public string VerificacionRoles(int resultado)
        {
            string rol = "";
            if (resultado == 1)
            {
                rol = "Administrador";
            }
            if (resultado == 2)
            {
                rol = "Usuario";
            }
            return rol;
        }


    }
}

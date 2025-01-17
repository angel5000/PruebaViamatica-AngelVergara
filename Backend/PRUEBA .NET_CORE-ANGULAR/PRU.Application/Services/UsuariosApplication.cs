using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using PRU.Application.Commons.Bases.Response;
using PRU.Application.Commons.Validations;
using PRU.Application.Dtos.Usuarios.Request;
using PRU.Application.Interfaces;
using PRU.Infrastructure.Persitences.Context;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace PRU.Application.Services
{
    public class UsuariosApplication : IUsuariosApplication
    {

        private readonly PruContext _context;
        private readonly Validaciones _validaciones;

        public UsuariosApplication(PruContext context, Validaciones validaciones)
        {
            _context = context;
            _validaciones = validaciones;
        }
        public static bool ValidarIdentificacion(string identificacion)
        {
            if (string.IsNullOrEmpty(identificacion))
            {
                throw new ArgumentNullException(nameof(identificacion), "La identificación no puede ser nula o vacía");
            }

            // Lógica de validación con Regex
            return Regex.IsMatch(identificacion, @"^[0-9]{10}$");
        }
        public async Task<BaseResponse<bool>> RegisterUser(UsuarioRequest requestDto)
        {
            if (!_validaciones.ValidarIdentificacion(requestDto.Identificacion!))
            {
                return new BaseResponse<bool>
                {
                    IsSucces = false,
                    Message = "Identificacion no valida, revisar por favor",
                    Data = false
                };
            }
          
            // Validar usuario
            if (!_validaciones.ValidarUsuario(requestDto.UserName!))
            {
                return new BaseResponse<bool>
                {
                    IsSucces = false,
                    Message = "El nombre de usuario no es válido. Debe tener entre 8 y 20 caracteres alfanuméricos.",
                    Data = false
                };
            }

            // Validar contraseña
            if (!_validaciones.ValidarContraseña(requestDto.Password))
            {
                return new BaseResponse<bool>
                {
                    IsSucces = false,
                    Message = "La contraseña no es válida. Debe tener al menos 8 caracteres, incluir una mayúscula, un número y un carácter especial.",
                    Data = false
                };
            }

            // Verificar si el correo ya existe
            var correoGenerado = _validaciones.GenerarCorreo(requestDto.Nombres, requestDto.Apellidos, requestDto.Identificacion);
            var existeCorreo = await _context.Usuarios.AnyAsync(u => u.Mail == correoGenerado);
            if (existeCorreo)
            {
                return new BaseResponse<bool>
                {
                    IsSucces = false,
                    Message = "El correo ya está registrado.",
                    Data = false
                };
            }

            var identificacionParam = new SqlParameter("@Identificacion", requestDto.Identificacion);
            var nombresParam = new SqlParameter("@Nombres", requestDto.Nombres);
            var apellidosParam = new SqlParameter("@Apellidos",  requestDto.Apellidos);
            var fechaNacimientoParam = new SqlParameter("@FechaNacimiento",  requestDto.FechaNacimiento);
            var mailParam = new SqlParameter("@Mail", correoGenerado);
            var userNameParam = new SqlParameter("@UserName",  requestDto.UserName);
            var passwordParam = new SqlParameter("@Password",  requestDto.Password);
            var statusParam = new SqlParameter("@Status", "Activo");  // Asumiendo que el estado es "Activo"
            var sesionActiveParam = new SqlParameter("@SesionActive", "S");  // "S" o "N" dependiendo del estado

            // Parámetros de salida
            var personaIdParam = new SqlParameter("@PersonaId", SqlDbType.Int) { Direction = ParameterDirection.Output };
            var usuarioIdParam = new SqlParameter("@UsuarioId", SqlDbType.Int) { Direction = ParameterDirection.Output };

            try
            {
                // Ejecutar el procedimiento almacenado
                await _context.Database.ExecuteSqlRawAsync (
                    "EXEC sp_RegistrarPersonaYUsuario @Identificacion, @Nombres, @Apellidos, @FechaNacimiento, @Mail, @UserName, @Password, @Status, @SesionActive, @PersonaId OUTPUT, @UsuarioId OUTPUT",
                    identificacionParam, nombresParam, apellidosParam, fechaNacimientoParam, mailParam, userNameParam, passwordParam, statusParam, sesionActiveParam, personaIdParam, usuarioIdParam
                );

                // Obtener los ID generados para Persona y Usuario
                var personaId = (int)personaIdParam.Value;
                var usuarioId = (int)usuarioIdParam.Value;

                return new BaseResponse<bool>
                {
                    IsSucces = true,
                    Data = true,  // Indica que la operación fue exitosa
                    Message = "Registro exitoso",
                    TotalRecords = 1,  // Puedes ajustar este valor según el caso
                    Errors = null,
                    AdditionalData = new { PersonaId = personaId, UsuarioId = usuarioId }
                };
            }
            catch (Exception ex)
            {
                return new BaseResponse<bool>
                {
                    IsSucces = false,
                    Data = false,  // Indica que la operación falló
                    Message = $"Error al registrar los datos: {ex.Message}",
                    TotalRecords = 0,
                    Errors = null
                };
            }


        }
    }
}

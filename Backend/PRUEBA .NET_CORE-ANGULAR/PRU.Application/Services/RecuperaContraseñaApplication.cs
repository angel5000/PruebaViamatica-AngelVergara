using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using PRU.Application.Commons.Bases.Response;
using PRU.Application.Commons.Validations;
using PRU.Application.Dtos.Administrador.Usuarios;
using PRU.Application.Dtos.RecuperarContrasena.Request;
using PRU.Application.Interfaces;
using PRU.Domain.Entities;
using PRU.Infrastructure.Persitences.Context;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PRU.Application.Services
{
    public class RecuperaContraseñaApplication : IRecuperaContraseñaApplication
    {
        private readonly PruContext _context;
        private readonly Validaciones _validaciones;

        public RecuperaContraseñaApplication(PruContext context, Validaciones validaciones)
        {
            _context = context;
            _validaciones = validaciones;
        }

        public async Task<BaseResponse<bool>> RecuperarContrasena(RecuperaContrasena requestDto)
        {
            var response = new BaseResponse<bool>();

            if (!_validaciones.ValidarContraseña(requestDto.NuevaContrasena!))
            {

                response.IsSucces = false;
                response.Message = "La contraseña no es válida. Debe tener al menos 8 " +
                          "caracteres, incluir una mayúscula, un número y un carácter especial.";

                return response;
            }

            try
            {
                var identificacionParam = new SqlParameter("@Identificacion", requestDto.Identificacion);
                var passwordParam = new SqlParameter("@NuevaContrasena", requestDto.NuevaContrasena);
                var verifpasswordParam = new SqlParameter("@ConfirNuevaContrasena", requestDto.ConfirNuevaContrasena);
                var mailParam = new SqlParameter("@Email", requestDto.Email);
                var Mensaje = new SqlParameter("@Mensaje", SqlDbType.NVarChar,255) { Direction = ParameterDirection.Output };
                await _context.Database.ExecuteSqlRawAsync(
      "EXEC CambiarContrasena @Email,@Identificacion,@NuevaContrasena,@ConfirNuevaContrasena, @Mensaje OUTPUT",
    identificacionParam, mailParam,
     passwordParam, verifpasswordParam,Mensaje
                );

                response.IsSucces = true;
               
                response.Message = (string)Mensaje.Value;
               
            }
            catch (Exception e)
            {
                response.IsSucces = false;
       
                response.Message = $"Ocurrio un error al cambiar la contraseña {e.Message}";
                
            }
            return response;
            
        }
    }
}

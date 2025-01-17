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
using System.Threading.Tasks;

namespace PRU.Application.Services
{
    public class Auth : IAuth
    {

        private readonly PruContext _context;
        private readonly Validaciones _validaciones;

        public Auth(PruContext context, Validaciones validaciones)
        {
            _context = context;
            _validaciones = validaciones;
        }
        public async Task<BaseResponse<int>> Login(TokenRequest requestDto)
        {
            var response = new BaseResponse<int>();
            try { 
           
            var outputParam = new SqlParameter
            {
                ParameterName = "@Result",
                SqlDbType = SqlDbType.Int,
                Direction = ParameterDirection.Output,

            };
            var outputParam2 = new SqlParameter
            {
                ParameterName = "@Rol",
                SqlDbType = SqlDbType.Int,
                Direction = ParameterDirection.Output
            };
            var parametros = new[]
            {
        new SqlParameter("@Login", requestDto.Credenciales ?? (object)DBNull.Value),
        new SqlParameter("@Password", requestDto.Password ?? (object)DBNull.Value),
        outputParam,outputParam2
    };

          await _context.Database.ExecuteSqlRawAsync("EXEC InicioSesion @Login, @Password, @Result OUTPUT, @Rol OUTPUT", parametros);

            var resultado = (int)outputParam.Value;
            var Rol = (int)outputParam2.Value;
            if (resultado == -1)
            {
                 response = new BaseResponse<int>();

                response.IsSucces = false;
                response.Message = "Cuenta bloqueada, contacte al administrador";
                response.Data = resultado;
                return response;
              
            }
            if (resultado == 0)
            {
                response = new BaseResponse<int>();

                response.IsSucces = false;
                response.Message = "Credenciales incorrectas, Intentelo denuevo";
                response.Data = resultado;
                return response;
              
            }
            if (resultado == 1)
            {
                string nombRol = _validaciones.VerificacionRoles(Rol);
                 response = new BaseResponse<int>();

                response.IsSucces = true;
                response.Message = "Sesión iniciada exitosamente. (" + nombRol + ")";
                response.Data = Rol;
                return response;
            }
            else if (resultado == 2)
            {
                 response = new BaseResponse<int>();

                response.IsSucces = false;
                response.Message = "Ya existe una sesión activa para este usuario.";
                response.Data = resultado;
                return response;
                
            }
            else
             {

                response = new BaseResponse<int>();

                response.IsSucces = false;
                response.Message = "Usuario/correo no existente, verifique su informacion";
                response.Data = resultado;
                return response;
            }

            }
            catch (Exception e) {
                response = new BaseResponse<int>();

                response.IsSucces = false;
                response.Message = "Usuario/correo no existente, verifique su informacion";
                response.Data = 0;
                Console.WriteLine(e.Message);
               
               
            }
            return response;
        }


        public async Task<BaseResponse<bool>> Logout(string login)
        {
            var response = new BaseResponse<bool>();
            var parametros = new[]
            {
          new SqlParameter("@Login", login ?? (object)DBNull.Value)
                 };

            var result = await _context.Database.ExecuteSqlRawAsync("EXEC CerrarSesion @Login", parametros);

            if (result !=0)
            {
                response.IsSucces = true;
                response.Message = "Sesion cerrada con exito";
                Console.Write("response: "+response.IsSucces);
                return response;
            }

            return response;
        }
    

    }
}

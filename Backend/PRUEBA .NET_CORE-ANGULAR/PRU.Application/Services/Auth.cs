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
        public async Task<BaseResponse<bool>> Login(TokenRequest requestDto)
        {
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
                return new BaseResponse<bool>
                {
                    IsSucces = true,
                    Message = "Cuenta bloqueada, contacte al administrador",
                    Data = true
                };
            }
            if (resultado == 0)
            {

                return new BaseResponse<bool>
                {
                    IsSucces = false,
                    Message = "Credenciales incorrectas, Intentelo denuevo",
                    Data = true
                };
            }
            if (resultado == 1)
            {
                string nombRol= _validaciones.VerificacionRoles(Rol);
                return new BaseResponse<bool>
                {
                    IsSucces = true,
                    Message = "Sesión iniciada exitosamente. ("+nombRol+")",
                    Data = true
                };
            }
            else if (resultado == 2)
            {
                return new BaseResponse<bool>
                {
                    IsSucces = false,
                    Message = "Ya existe una sesión activa para este usuario.",
                    Data = false
                };
            }
            else
            {
                return new BaseResponse<bool>
                {
                    IsSucces = false,
                    Message = "Credenciales incorrectas.",
                    Data = false
                };
            }
        }


        public async Task<BaseResponse<bool>> Logout(string login)
        {
            var parametros = new[]
            {
        new SqlParameter("@Login", login ?? (object)DBNull.Value)
    };

            await _context.Database.ExecuteSqlRawAsync("EXEC CerrarSesion @Login", parametros);

            return new BaseResponse<bool>
            {
                IsSucces = true,
                Message = "Sesión cerrada exitosamente.",
                Data = true
            };
        }


    }
}

using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using PRU.Application.Commons.Bases.Response;
using PRU.Application.Commons.Validations;
using PRU.Application.Dtos.Usuarios.Request;
using PRU.Application.Dtos.Usuarios.Response;
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
            try
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
                    Direction = ParameterDirection.Output,
                  
                };

                var outputParam3 = new SqlParameter
                {
                    ParameterName = "@UsuarioId",
                    SqlDbType = SqlDbType.Int,
                    Direction = ParameterDirection.Output,
                  
                };

                var outputParam4 = new SqlParameter
                {
                    ParameterName = "@UserName",
                    SqlDbType = SqlDbType.NVarChar,
                    Size = 50,
                    Direction = ParameterDirection.Output,
                    
                };

                var outputParam5 = new SqlParameter
                {
                    ParameterName = "@Mail",
                    SqlDbType = SqlDbType.NVarChar,
                    Size = 50,
                    Direction = ParameterDirection.Output,
                   
                };

                var outputParam6 = new SqlParameter
                {
                    ParameterName = "@Nombres",
                    SqlDbType = SqlDbType.NVarChar,
                    Size = 100,
                    Direction = ParameterDirection.Output,
                   
                };

                var outputParam7 = new SqlParameter
                {
                    ParameterName = "@Apellidos",
                    SqlDbType = SqlDbType.NVarChar,
                    Size = 100,
                    Direction = ParameterDirection.Output,
                   
                };

                var outputParam8 = new SqlParameter
                {
                    ParameterName = "@Identificacion",
                    SqlDbType = SqlDbType.NVarChar,
                    Size = 50,
                    Direction = ParameterDirection.Output,
                 
                };

                var outputParam9 = new SqlParameter
                {
                    ParameterName = "@FechaNacimiento",
                    SqlDbType = SqlDbType.Date,
                    Direction = ParameterDirection.Output,
                   
                };

                var outputParam10 = new SqlParameter
                {
                    ParameterName = "@FechaIngreso",
                    SqlDbType = SqlDbType.DateTime,
                    Direction = ParameterDirection.Output,
                  
                };

                var outputParam11 = new SqlParameter
                {
                    ParameterName = "@FechaCierre",
                    SqlDbType = SqlDbType.DateTime,
                    Direction = ParameterDirection.Output,
                   
                };

                var parametros = new[]
                {
            new SqlParameter("@Login", requestDto.Credenciales ?? (object)DBNull.Value),
            new SqlParameter("@Password", requestDto.Password ?? (object)DBNull.Value),
            /*   new SqlParameter("@Rol", requestDto ?? (object)DBNull.Value),
            new SqlParameter("@UsuarioId", requestDto.Password ?? (object)DBNull.Value),
               new SqlParameter("@UserName", requestDto.Credenciales ?? (object)DBNull.Value),
            new SqlParameter("@Nombres", requestDto.Password ?? (object)DBNull.Value),
             new SqlParameter("@Rol", requestDto.Credenciales ?? (object)DBNull.Value),
            new SqlParameter("@Apellidos", requestDto.Password ?? (object)DBNull.Value),

             new SqlParameter("@Identificacion", requestDto.Credenciales ?? (object)DBNull.Value),
            new SqlParameter("@FechaNacimiento", requestDto.Password ?? (object)DBNull.Value),
             new SqlParameter("@FechaCierre", requestDto.Credenciales ?? (object)DBNull.Value),
            new SqlParameter("@FechaIngreso", requestDto.Password ?? (object)DBNull.Value),*/
          
            outputParam,
            outputParam2,
            outputParam3,
            outputParam4,
            outputParam5,
            outputParam6,
            outputParam7,
            outputParam8,
            outputParam9,
            outputParam10,
            outputParam11
        };
               
            var resultadodt=    await _context.Database.ExecuteSqlRawAsync("EXEC InicioSesion @Login, @Password, @Result OUTPUT, @Rol OUTPUT, @UsuarioId OUTPUT," +
                    " @UserName OUTPUT, @Mail OUTPUT, @Nombres OUTPUT, @Apellidos OUTPUT," +
                    " @Identificacion OUTPUT, @FechaNacimiento OUTPUT,@FechaIngreso OUTPUT,@FechaCierre OUTPUT", parametros);
              
                
                if ((int)outputParam.Value == 0) { Console.WriteLine($"nulo {parametros}");
                    response.IsSucces = false;
                    response.Message = "Credenciales incorrectas, Intentelo denuevo";
                    response.Data =0;
                    return response;

                }
                var resultado = (int)outputParam.Value ;
                var rol = (int)outputParam2.Value ; 
                var id = (int)outputParam3.Value; 

                    if (resultado == -1)
                    {
                        response.IsSucces = false;
                        response.Message = "Cuenta bloqueada, contacte al administrador";
                        response.Data = resultado;
                        return response;
                    }



                    if (resultado == 1)
                    {
                        string nombRol = _validaciones.VerificacionRoles(rol);

                        response.IsSucces = true;
                        response.Message = "Sesión iniciada exitosamente. (" + nombRol + ")";
                        response.Data = rol;
                        response.AdditionalData = id;
                        // Asignar los datos personales a DataPersonal
                        response.DataPersonal = new UsuariosResponse
                        {
                            UserName = (string)outputParam4.Value,
                            Mail = (string)outputParam5.Value,
                            Nombres = (string)outputParam6.Value,
                            Apellidos = (string)outputParam7.Value,
                            Identificacion = (string)outputParam8.Value,
                            FechaNacimiento = DateOnly.FromDateTime((DateTime)outputParam9.Value),
                            FechaIngreso = outputParam10.Value != DBNull.Value ? (DateTime)outputParam10.Value : DateTime.MinValue,
                            FechaCierre = outputParam11.Value != DBNull.Value ? (DateTime)outputParam11.Value : DateTime.MinValue




                        };

                        return response;
                    }
                    else if (resultado == 2)
                    {
                        response.IsSucces = false;
                        response.Message = "Ya existe una sesión activa para este usuario.";
                        response.Data = resultado;
                        return response;
                    }
                    else
                    {
                        response.IsSucces = false;
                        response.Message = "Usuario/correo no existente, verifique su informacion...";
                        response.Data = resultado;
                        return response;
                   }
                
            }
            catch (Exception e)
            {
                response.IsSucces = false;
                response.Message = $"Error en el proceso de inicio de sesión { e.Message} ";
                response.Data = 0;
                Console.WriteLine(e.Message);
                return response;
            }
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

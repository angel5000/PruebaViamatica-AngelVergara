using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using PRU.Application.Commons.Bases.Response;
using PRU.Application.Commons.Validations;
using PRU.Application.Dtos.Administrador.DatosPersonales.Response;
using PRU.Application.Dtos.UsuarioGeneral.Request;
using PRU.Application.Dtos.UsuarioGeneral.Response;
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

        public UsuariosApplication(PruContext context)
        {
            _context = context;
        }

        public async Task<BaseResponse<UsuarioGResponse>> DatosUsuarioGPerfil(int id)
        {
            var response = new BaseResponse<UsuarioGResponse>();

            // Establecer la conexión con la base de datos

            using var connection = (SqlConnection)_context.Database.GetDbConnection();
            try
            {

               
                if (connection.State != System.Data.ConnectionState.Open)
                    await connection.OpenAsync();

               
                using (var command = new SqlCommand("ConsultarDatosUsuarioGeneral", connection))
                {
                    command.CommandType = System.Data.CommandType.StoredProcedure;

                    // Parámetro para el procedimiento almacenado
                    command.Parameters.AddWithValue("@idUsuario", id);

                    // Ejecutar el comando y obtener el resultado
                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        if (await reader.ReadAsync())
                        {

                            var user = new UsuarioGResponse
                            {
                                Identificacion = reader["Identificacion"]?.ToString(),
                                UserName = reader["UserName"]?.ToString(),
                                Mail = reader["Mail"]?.ToString(),
                                Nombres = reader["Nombres"]?.ToString(),
                                FechaIngreso = reader["FechaIngreso"] != DBNull.Value ? (DateTime)reader["FechaIngreso"] : DateTime.MinValue,
                                Apellidos = reader["Apellidos"]?.ToString(),
                                FechaNacimiento = reader["FechaNacimiento"] != DBNull.Value
    ? reader["FechaNacimiento"] is DateTime fechaTime
        ? DateOnly.FromDateTime(fechaTime)
        : (DateOnly?)null
    : (DateOnly?)null,

                            };

                         
                            response.IsSucces = true;
                            response.Message = "Usuario encontrado.";
                            response.Data = user;
                        }
                        else
                        {
                           
                            response.IsSucces = false;
                            response.Message = "Usuario no encontrado.";
                            response.Data = null;
                        }
                    }
                }
            }
            catch (SqlException ex)
            {
               
                response.IsSucces = false;
                response.Message = $"Error al consultar el usuario: {ex.Message}";
                response.Data = null;
            }
            catch (Exception ex)
            {
                
                response.IsSucces = false;
                response.Message = $"Error inesperado: {ex.Message}";
                response.Data = null;
            }

            return response;
        }

        public async Task<BaseResponse<bool>> EditDTPersonalUsuario(UsuarioGRequest requestDto, int id)
        {
            var response = new BaseResponse<bool>();
            using var connection = (SqlConnection)_context.Database.GetDbConnection(); // Obtener la conexión del DbContext.

            try
            {
                await connection.OpenAsync();

                using (var command = new SqlCommand("ActualizarDatosUsuarioGeneral", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;

                    command.Parameters.AddWithValue("@IdUsuario", id);
                    command.Parameters.AddWithValue("@NuevoUserName", requestDto.UserName ?? (object)DBNull.Value);

                    command.Parameters.AddWithValue("@Nombres", requestDto.Nombres ?? (object)DBNull.Value);
                    command.Parameters.AddWithValue("@Apellidos", requestDto.Apellidos ?? (object)DBNull.Value);
                    command.Parameters.AddWithValue("@FechaNacimiento", requestDto.FechaNacimiento.HasValue
                        ? requestDto.FechaNacimiento.Value.ToDateTime(TimeOnly.MinValue)
                        : (object)DBNull.Value);

                    var result = (int)(await command.ExecuteScalarAsync());


                    if (result == 1)
                    {
                        response.IsSucces = true;
                        response.Message = "Actualización realizada con éxito.";
                        response.Data = true;
                    }
                    else
                    {
                        response.IsSucces = false;
                        response.Message = "No se encontraron registros para actualizar, o no tiene permisos para esto";
                        response.Data = false;
                    }
                }
            }
            catch (SqlException ex)
            {
                response.IsSucces = false;
                response.Message = $"Error al actualizar: {ex.Message}";
                response.Data = false;
            }
            catch (Exception ex)
            {
                response.IsSucces = false;
                response.Message = $"Error inesperado: {ex.Message}";
                response.Data = false;
            }

            return response;

        }
    }
}

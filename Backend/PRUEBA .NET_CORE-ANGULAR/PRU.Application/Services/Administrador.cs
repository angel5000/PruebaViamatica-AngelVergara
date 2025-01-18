using DocumentFormat.OpenXml.Spreadsheet;
using Microsoft.EntityFrameworkCore;
using PRU.Application.Commons.Bases.Response;
using PRU.Application.Commons.Validations;
using PRU.Application.Dtos.Administrador.Usuarios;
using PRU.Application.Interfaces;
using PRU.Infrastructure.Persitences.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PRU.Application.Services
{
    public class Administrador : IAdministrador
    {
        private readonly PruContext _context;
        private readonly Validaciones _validaciones;

        public Administrador(PruContext context, Validaciones validaciones)
        {
            _context = context;
            _validaciones = validaciones;
        }


        public async Task<BaseResponse<IEnumerable<UsuariosAdmResponseDto>>> ListaUsuarios(int usuarioId)
        {
            var response = new BaseResponse<IEnumerable<UsuariosAdmResponseDto>>();

            try
            {
                if (usuarioId >0)
                {
                    using var connection = _context.Database.GetDbConnection(); // Usa la conexión de tu DbContext.
                    await connection.OpenAsync();

                    using var command = connection.CreateCommand();
                    command.CommandText = "ConsultarUsuariosYPersonas";
                    command.CommandType = System.Data.CommandType.StoredProcedure;

                    // Agregar el parámetro UsuarioId al comando
                    var param = command.CreateParameter();
                    param.ParameterName = "@UsuarioId";
                    param.Value = usuarioId;
                    command.Parameters.Add(param);

                    using var reader = await command.ExecuteReaderAsync();
                    var usuariosAdmList = new List<UsuariosAdmResponseDto>();

                    while (await reader.ReadAsync())
                    {
                        usuariosAdmList.Add(new UsuariosAdmResponseDto
                        {
                            idUsuario = Convert.ToInt32(reader["idUsuario"]),
                            UserName = reader["UserName"]?.ToString(),
                            Password = reader["Password"]?.ToString(),
                            Mail = reader["Mail"]?.ToString(),
                            SesionActive = reader["SesionActive"]?.ToString(),
                            StatusUsuario = reader["StatusUsuario"]?.ToString(),
                            IntentosFallidos = Convert.ToInt32(reader["IntentosFallidos"]),
                            Nombres = reader["Nombres"]?.ToString(),
                            Apellidos = reader["Apellidos"]?.ToString(),
                            Identificacion = reader["Identificacion"]?.ToString(),
                            FechaNacimiento = reader["FechaNacimiento"] != DBNull.Value
                                ? DateOnly.FromDateTime(Convert.ToDateTime(reader["FechaNacimiento"]))
                                : null,
                            StatusPersona = reader["StatusPersona"]?.ToString(),
                        });
                    }

                    response.Data = usuariosAdmList;
                    response.IsSucces = true;
                    response.Message = "Usuarios consultados exitosamente.";
                }
            }
            catch (Exception ex)
            {
                response.IsSucces = false;
                response.Message = $"Error al consultar usuarios: {ex.Message}";
            }
        
            return response;
        
        }

    }
}

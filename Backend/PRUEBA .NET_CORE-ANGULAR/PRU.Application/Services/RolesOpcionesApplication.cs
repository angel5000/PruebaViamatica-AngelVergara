using DocumentFormat.OpenXml.Spreadsheet;
using Microsoft.EntityFrameworkCore;
using PRU.Application.Commons.Bases.Response;
using PRU.Application.Dtos.Administrador.Roles;
using PRU.Application.Dtos.Administrador.Usuarios;
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
    public class RolesOpcionesApplication : IRolesOpcionesApplication
    {
        private readonly PruContext _context;

        public RolesOpcionesApplication(PruContext context)
        {
            _context = context;
        }

        public async Task<BaseResponse<IEnumerable<RolesOpcionesresponse>>> OpcionesRoles(int usuarioId)
        {
            var response = new BaseResponse<IEnumerable<RolesOpcionesresponse>>();
            try
            {
                if (usuarioId > 0)
                {
                    using var connection = _context.Database.GetDbConnection(); // Usa la conexión de tu DbContext.
                    await connection.OpenAsync();

                    using var command = connection.CreateCommand();
                    command.CommandText = "ROLESOPCIONES";
                    command.CommandType = System.Data.CommandType.StoredProcedure;

                    var param = command.CreateParameter();
                    param.ParameterName = "@IdUsuario";
                    param.Value = usuarioId;
                    command.Parameters.Add(param);

                 
                    using var reader = await command.ExecuteReaderAsync();
                    var Rolesopciones = new List<RolesOpcionesresponse>();

                    while (await reader.ReadAsync())
                    {
                        Rolesopciones.Add(new RolesOpcionesresponse
                        {
                           Opcion_IdOpcion = Convert.ToInt32(reader["Opcion_IdOpcion"]),
                            Activo = reader["Activo"] == DBNull.Value ? (bool?)null : Convert.ToBoolean(reader["Activo"]),
                     

                    });
                }

                    response.Data = Rolesopciones;
                    response.IsSucces = true;
                   
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

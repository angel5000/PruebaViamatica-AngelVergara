using DocumentFormat.OpenXml.Spreadsheet;
using Microsoft.EntityFrameworkCore;
using PRU.Application.Commons.Bases.Request;
using PRU.Application.Commons.Bases.Response;
using PRU.Application.Commons.Validations;
using PRU.Application.Dtos.Administrador.Usuarios;
using PRU.Application.Dtos.Sesiones.Response;
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
    public class Sesiones : ISesiones
    {
        private readonly PruContext _context;
      

        public Sesiones(PruContext context)
        {
            _context = context;
           
        }
        public async Task<BaseResponse<IEnumerable<SesionsResponse>>> ListaSesiones(int usuarioId, BaseFilterRequest filters)
        {
            var response = new BaseResponse<IEnumerable<SesionsResponse>>();
            var totalpage = 0;
            try
            {
                if (usuarioId > 0)
                {
                    using var connection = _context.Database.GetDbConnection(); // Usa la conexión de tu DbContext.
                    await connection.OpenAsync();

                    using var command = connection.CreateCommand();
                    command.CommandText = "SESIONES";
                    command.CommandType = System.Data.CommandType.StoredProcedure;

                    // Agregar el parámetro UsuarioId al comando
                    var param = command.CreateParameter();
                    param.ParameterName = "@IdPersona";
                    param.Value = usuarioId;
                    command.Parameters.Add(param);
                    ////filtros
                    ///



                    if (filters.NumFilter.HasValue)
                    {
                        var paramNumFilter = command.CreateParameter();
                        paramNumFilter.ParameterName = "@NumFilter";
                        paramNumFilter.Value = filters.NumFilter.Value;
                        command.Parameters.Add(paramNumFilter);
                    }

                    if (!string.IsNullOrWhiteSpace(filters.TextFilter))
                    {
                        var paramTextFilter = command.CreateParameter();
                        paramTextFilter.ParameterName = "@TextFilter";
                        paramTextFilter.Value = filters.TextFilter;
                        command.Parameters.Add(paramTextFilter);
                    }

                    if (filters.StateFilter.HasValue)
                    {
                        var paramStateFilter = command.CreateParameter();
                        paramStateFilter.ParameterName = "@StateFilter";
                        paramStateFilter.Value = filters.StateFilter.Value;
                        command.Parameters.Add(paramStateFilter);
                    }

                    if (!string.IsNullOrWhiteSpace(filters.StartDate))
                    {
                        var paramStartDate = command.CreateParameter();
                        paramStartDate.ParameterName = "@FechaInicio";
                        paramStartDate.Value = filters.StartDate;
                        command.Parameters.Add(paramStartDate);
                    }

                    if (!string.IsNullOrWhiteSpace(filters.EndDate))
                    {
                        var paramEndDate = command.CreateParameter();
                        paramEndDate.ParameterName = "@FechaFin";
                        paramEndDate.Value = filters.EndDate;
                        command.Parameters.Add(paramEndDate);
                    }

                    // Paginación
                    var paramNumPage = command.CreateParameter();
                    paramNumPage.ParameterName = "@NumPage";
                    paramNumPage.Value = filters.NumPage;
                    command.Parameters.Add(paramNumPage);

                    var paramNumRecordsPage = command.CreateParameter();
                    paramNumRecordsPage.ParameterName = "@NumRecordsPage";
                    paramNumRecordsPage.Value = filters.NumRecordsPage; // Asignar el valor entero desde filters
                    paramNumRecordsPage.DbType = DbType.Int32; // Especificar que el tipo es entero
                    command.Parameters.Add(paramNumRecordsPage);
                    ;
                    var paramTotalRecords = command.CreateParameter();
                    paramTotalRecords.ParameterName = "@TotalRecords";
                    paramTotalRecords.DbType = DbType.Int32; // Especificar que el tipo es entero
                    paramTotalRecords.Direction = ParameterDirection.Output; // Definir como parámetro de salida
                    command.Parameters.Add(paramTotalRecords);
                    using (var reader2 = command.ExecuteReader())
                    {
                        // Procesar los resultados del procedimiento almacenado
                        while (reader2.Read())
                        {
                            // Aquí procesas cada fila obtenida del procedimiento almacenado
                        }
                    }

                    if (filters.StartDate == null && filters.EndDate == null)
                    {
                        totalpage = (int)paramTotalRecords.Value;
                        using var reader2 = await command.ExecuteReaderAsync();
                        var sesiones2 = new List<SesionsResponse>();

                        while (await reader2.ReadAsync())
                        {
                            sesiones2.Add(new SesionsResponse
                            {

                                FechaIngreso = reader2["FechaIngreso"] != DBNull.Value
                        ? Convert.ToDateTime(reader2["FechaIngreso"])
                        : (DateTime?)null,
                                FechaCierre = reader2["FechaCierre"] != DBNull.Value
                       ? Convert.ToDateTime(reader2["FechaCierre"])
                       : (DateTime?)null,
                                SesionExitosa = Convert.ToInt32(reader2["SesionExitosa"]),
                                SesionFallida = Convert.ToInt32(reader2["SesionFallida"]),
                              
                            });
                        }
                          response.Data =sesiones2;
                    response.IsSucces = true;
                        response.TotalRecords = totalpage;
                        response.Message = "Sesiones consultados exitosamente.";
                    }
                    else
                    {
                        totalpage = (int)paramTotalRecords.Value!;
                        using var reader = await command.ExecuteReaderAsync();
                        var sesiones = new List<SesionsResponse>();

                        while (await reader.ReadAsync())
                        {
                            sesiones.Add(new SesionsResponse
                            {

                                FechaIngreso = reader["PrimeraFecha"] != DBNull.Value
                        ? Convert.ToDateTime(reader["PrimeraFecha"])
                        : (DateTime?)null,
                                FechaCierre = reader["UltimaFecha"] != DBNull.Value
                       ? Convert.ToDateTime(reader["UltimaFecha"])
                       : (DateTime?)null,
                                SesionExitosa = Convert.ToInt32(reader["SesionExitosa"]),
                                SesionFallida = Convert.ToInt32(reader["SesionFallida"]),
                                SesionFallidaTotales = Convert.ToInt32(reader["TotalFallidos"]),
                                RegistrosTotales = Convert.ToInt32(reader["TotalRegistros"]),

                            });
                        }
                        response.Data = sesiones;
                        response.IsSucces = true;
                        response.TotalRecords = totalpage;
                        response.Message = "Sesiones consultados exitosamente.";
                    }
                   
                   

                  
                }
            }
            catch (Exception ex)
            {
                response.IsSucces = false;
                response.Message = $"Error al consultar sesiones: {ex.Message}";
            }

            return response;

        }
    }
}

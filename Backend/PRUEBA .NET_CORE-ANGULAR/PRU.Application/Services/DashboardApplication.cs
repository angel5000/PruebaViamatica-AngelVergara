using DocumentFormat.OpenXml.Spreadsheet;
using Microsoft.EntityFrameworkCore;
using PRU.Application.Commons.Bases.Request;
using PRU.Application.Commons.Bases.Response;
using PRU.Application.Commons.Validations;
using PRU.Application.Dtos.Administrador.Usuarios;
using PRU.Application.Dtos.Dashboard.Response;
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
    public class DashboardApplication : IDashboardApplication
    {
        private readonly PruContext _context;
       

        public DashboardApplication(PruContext context, Validaciones validaciones)
        {
            _context = context;
          
        }

        public async Task<BaseResponse<IEnumerable<DashboardResponseResumen>>> InfoResumeDash()
        {

            var response = new BaseResponse<IEnumerable<DashboardResponseResumen>>();
            var totalpage = 0;
            try
            {
                
                    using var connection = _context.Database.GetDbConnection(); // Usa la conexión de tu DbContext.
                    await connection.OpenAsync();

                    using var command = connection.CreateCommand();
                    command.CommandText = "ResumenDashboard";
                    command.CommandType = System.Data.CommandType.StoredProcedure;

           
                    using (var reader2 = command.ExecuteReader())
                    {
                        // Procesar los resultados del procedimiento almacenado
                        while (reader2.Read())
                        {
                            // Aquí procesas cada fila obtenida del procedimiento almacenado
                        }
                    }

 
                        using var reader = await command.ExecuteReaderAsync();
                        var resultList = new List<DashboardResponseResumen>();

                        while (await reader.ReadAsync())
                        {
                          
                            resultList.Add(new DashboardResponseResumen
                            {
                               TotalUsuarios = Convert.ToInt32(reader["TotalUsuarios"]),
                                TotalSesionActiva = Convert.ToInt32(reader["TotalSesionActiva"]),
                                TotalBloqueados = Convert.ToInt32(reader["TotalBloqueados"])

                            });
                        }
                        response.Data = resultList;
                        response.IsSucces = true;
                    
              

                  
            }
            catch (Exception ex)
            {
                response.IsSucces = false;
                response.Message = $"Error al consultar la información: {ex.Message}";
            }

            return response;




        }

        public async Task<BaseResponse<IEnumerable<DashboardResponse>>> ListInfodashboard(int usuarioId, BaseFilterRequestSimple filters)
        {
            var response = new BaseResponse<IEnumerable<DashboardResponse>>();
            var totalpage = 0;
            try
            {
                if (usuarioId > 0)
                {
                    using var connection = _context.Database.GetDbConnection(); // Usa la conexión de tu DbContext.
                    await connection.OpenAsync();

                    using var command = connection.CreateCommand();
                    command.CommandText = "ConsultarEstadosUsuarios";
                    command.CommandType = System.Data.CommandType.StoredProcedure;

                    // Agregar parámetros al comando
                    var paramUsuarioId = command.CreateParameter();
                    paramUsuarioId.ParameterName = "@idUsuario";
                    paramUsuarioId.Value = usuarioId;
                    paramUsuarioId.DbType = System.Data.DbType.Int32;
                    command.Parameters.Add(paramUsuarioId);

                    var paramFiltro = command.CreateParameter();
                    paramFiltro.ParameterName = "@Filtro";
                    paramFiltro.Value = filters.NumFilter ?? (object)DBNull.Value; // Usa el valor del filtro o NULL
                    paramFiltro.DbType = System.Data.DbType.Int32;
                    command.Parameters.Add(paramFiltro);

                    var paramSesionActiva = command.CreateParameter();
                    paramSesionActiva.ParameterName = "@SesionActiva";
                    paramSesionActiva.Value = filters.TextFilterSesion ?? (object)DBNull.Value; // Usa el valor de SesionActiva o NULL
                    paramSesionActiva.DbType = System.Data.DbType.String;
                    command.Parameters.Add(paramSesionActiva);

                    var paramSesionFallida = command.CreateParameter();
                    paramSesionFallida.ParameterName = "@SesionFallida";
                    paramSesionFallida.Value = filters.StateFilter ?? (object)DBNull.Value; // Usa el valor de SesionFallida o NULL
                    paramSesionFallida.DbType = System.Data.DbType.Int32;
                    command.Parameters.Add(paramSesionFallida);

                    var paramEstado = command.CreateParameter();
                    paramEstado.ParameterName = "@Estado";
                    paramEstado.Value = filters.StateFilterText ?? (object)DBNull.Value; // Usa el valor de Estado o NULL
                    paramEstado.DbType = System.Data.DbType.String;
                    command.Parameters.Add(paramEstado);
                    var paramNumPage = command.CreateParameter();
                    paramNumPage.ParameterName = "@NumPage";
                    paramNumPage.Value = filters.NumPage;
                    command.Parameters.Add(paramNumPage);

                    var paramNumRecordsPage = command.CreateParameter();
                    paramNumRecordsPage.ParameterName = "@NumRecordsPage";
                    paramNumRecordsPage.Value = filters.NumRecordsPage; // Asignar el valor entero desde filters
                    paramNumRecordsPage.DbType = DbType.Int32; // Especificar que el tipo es entero
                    command.Parameters.Add(paramNumRecordsPage);

                    var paramTotalRecords = command.CreateParameter();
                    paramTotalRecords.ParameterName = "@TotalRecords";
                    paramTotalRecords.DbType = DbType.Int32; // Debe ser entero
                    paramTotalRecords.Direction = ParameterDirection.Output; // Parámetro de salida
                    command.Parameters.Add(paramTotalRecords);


                    using (var reader2 = command.ExecuteReader())
                    {
                        // Procesar los resultados del procedimiento almacenado
                        while (reader2.Read())
                        {
                            // Aquí procesas cada fila obtenida del procedimiento almacenado
                        }
                    }
                 

                    if (filters.NumFilter == 3)
                    {
                        totalpage = (int)paramTotalRecords.Value;
                        using var reader = await command.ExecuteReaderAsync();
                        var resultList = new List<DashboardResponse>();
                       
                        while (await reader.ReadAsync())
                        {
                            // Mapear los resultados al modelo DashboardResponse
                            resultList.Add(new DashboardResponse
                            {
                                idUsuario = reader.GetInt32(reader.GetOrdinal("idUsuario")),
                                UserName = reader.GetString(reader.GetOrdinal("UserName")),
                                SesionActive = reader.GetString(reader.GetOrdinal("SesionActive")),
                                StatusUsuario = reader.GetString(reader.GetOrdinal("Status")),
                                IntentosFallidos = reader.GetInt32(reader.GetOrdinal("IntentosFallidos")),
                             
                                /*FechaIngreso = reader["FechaIngreso"] != DBNull.Value
                            ? Convert.ToDateTime(reader["FechaIngreso"])
                            : (DateTime?)null,
                                FechaCierre = reader.IsDBNull(reader.GetOrdinal("FechaCierre")) ? (DateTime?)null : reader.GetDateTime(reader.GetOrdinal("FechaCierre")),
                                SesionExitosa = reader.IsDBNull(reader.GetOrdinal("SesionExitosa")) ? (int?)null : reader.GetInt32(reader.GetOrdinal("SesionExitosa")),
                                SesionFallida = reader.IsDBNull(reader.GetOrdinal("SesionFallida")) ? (int?)null : reader.GetInt32(reader.GetOrdinal("SesionFallida"))*/

                            });
                        }
                        response.Data = resultList;
                        response.IsSucces = true;
                        response.TotalRecords = totalpage;
                    }

                    if (filters.NumFilter == 2)
                    {
                        totalpage = (int)paramTotalRecords.Value;
                        using var reader = await command.ExecuteReaderAsync();
                        var resultList = new List<DashboardResponse>();
                        
                        while (await reader.ReadAsync())
                        {
                            // Mapear los resultados al modelo DashboardResponse
                            resultList.Add(new DashboardResponse
                            {
                                idUsuario = reader.GetInt32(reader.GetOrdinal("idUsuario")),
                                UserName = reader.GetString(reader.GetOrdinal("UserName")),
                            
                                StatusUsuario = reader.GetString(reader.GetOrdinal("Status")),


                                FechaIngreso = reader.GetString(reader.GetOrdinal("FechaIngreso")),

                                SesionExitosa = reader.GetString(reader.GetOrdinal("SesionExitosa")),
                                SesionFallida = reader.GetString(reader.GetOrdinal("SesionFallida")),
                            });
                        }
                        response.Data = resultList;
                        response.IsSucces = true;
                        response.TotalRecords = totalpage;
                    }

                }
                else
                {
                    response.IsSucces = false;
                    response.Message = "El usuario no tiene permisos para ejecutar esta consulta.";
                }
            }
            catch (Exception ex)
            {
                response.IsSucces = false;
                response.Message = $"Error al consultar la información: {ex.Message}";
            }

            return response;
        }

    }
}

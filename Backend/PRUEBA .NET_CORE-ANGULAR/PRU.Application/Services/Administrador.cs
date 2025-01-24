using DocumentFormat.OpenXml.Spreadsheet;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using PRU.Application.Commons.Bases.Request;
using PRU.Application.Commons.Bases.Response;
using PRU.Application.Commons.Validations;
using PRU.Application.Dtos.Administrador.DatosPersonales;
using PRU.Application.Dtos.Administrador.DatosPersonales.Response;
using PRU.Application.Dtos.Administrador.Usuarios;
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
    public class Administrador : IAdministrador
    {
        private readonly PruContext _context;
        private readonly Validaciones _validaciones;

        public Administrador(PruContext context, Validaciones validaciones)
        {
            _context = context;
            _validaciones = validaciones;
        }

        public async Task<BaseResponse<bool>> RegisterUser(UsuarioRequest requestDto)
        {

            if (!_validaciones.ValidarIdentificacion(requestDto.Identificacion!))
            {
                return new BaseResponse<bool>
                {
                    IsSucces = false,
                    Message = $"Identificacion no valida, revisar por favor: {requestDto.Identificacion}",
                    Data = false
                };
            }

            // Validar usuario
            if (!_validaciones.ValidarUsuario(requestDto.UserName!))
            {
                return new BaseResponse<bool>
                {
                    IsSucces = false,
                    Message = "El nombre de usuario no es válido. Debe tener entre 8 y 20 caracteres alfanuméricos y almenos una mayuscula.",
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


            var identificacionParam = new SqlParameter("@Identificacion", requestDto.Identificacion);
            var nombresParam = new SqlParameter("@Nombres", requestDto.Nombres);
            var apellidosParam = new SqlParameter("@Apellidos", requestDto.Apellidos);
            var fechaNacimientoParam = new SqlParameter("@FechaNacimiento", requestDto.FechaNacimiento);
            var userNameParam = new SqlParameter("@UserName", requestDto.UserName);
            var passwordParam = new SqlParameter("@Password", requestDto.Password);
            var statusParam = new SqlParameter("@Status", requestDto.StadoPersona);
            var statuspersonaParam = new SqlParameter("@StatusPersona", requestDto.StadoPersona);
            var sesionActiveParam = new SqlParameter("@SesionActive", requestDto.SesionActive);
            var RolParam = new SqlParameter("@ROL", requestDto.Rol);

            var personaIdParam = new SqlParameter("@PersonaId", SqlDbType.Int) { Direction = ParameterDirection.Output };
            var usuarioIdParam = new SqlParameter("@UsuarioId", SqlDbType.Int) { Direction = ParameterDirection.Output };

            try
            {

                await _context.Database.ExecuteSqlRawAsync(
      "EXEC sp_RegistrarPersonaYUsuario @Identificacion, @Nombres, @Apellidos, @FechaNacimiento, " +
      " @UserName, @Password, @Status,  @StatusPersona,@SesionActive,@ROL , @PersonaId OUTPUT, @UsuarioId OUTPUT",
   identificacionParam, nombresParam, apellidosParam, fechaNacimientoParam,
   userNameParam, passwordParam, statusParam, statuspersonaParam, sesionActiveParam, RolParam, personaIdParam, usuarioIdParam
                );

                var personaId = (int)personaIdParam.Value;
                var usuarioId = (int)usuarioIdParam.Value;

                return new BaseResponse<bool>
                {
                    IsSucces = true,
                    Data = true,
                    Message = "Registro exitoso",
                    TotalRecords = 1,
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

                };
            }


        }


        public async Task<BaseResponse<bool>> EditUser(UserEditResponse requestDto, int idAdmin)
        {
            var response = new BaseResponse<bool>();
            using var connection = (SqlConnection)_context.Database.GetDbConnection(); // Obtener la conexión del DbContext.

            try
            {
                await connection.OpenAsync(); // Abrir la conexión asíncronamente si no está abierta.

                using (var command = new SqlCommand("ActualizarUsuarioYPersona", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;

                    command.Parameters.AddWithValue("@IdUsuarioAdmin", idAdmin);
                    command.Parameters.AddWithValue("@IdUsuario", requestDto.IdUsuario);
                    command.Parameters.AddWithValue("@UserName", requestDto.UserName ?? (object)DBNull.Value);
                    command.Parameters.AddWithValue("@SesionActive", requestDto.SesionActive ?? (object)DBNull.Value);
                    command.Parameters.AddWithValue("@StatusUsuario", requestDto.StatusUsuario ?? (object)DBNull.Value);
                    command.Parameters.AddWithValue("@IdPersona", requestDto.IdPersona);
                    command.Parameters.AddWithValue("@Nombres", requestDto.Nombres ?? (object)DBNull.Value);
                    command.Parameters.AddWithValue("@Apellidos", requestDto.Apellidos ?? (object)DBNull.Value);
                    command.Parameters.AddWithValue("@FechaNacimiento", requestDto.FechaNacimiento.HasValue
                        ? requestDto.FechaNacimiento.Value.ToDateTime(TimeOnly.MinValue)
                        : (object)DBNull.Value);
                    command.Parameters.AddWithValue("@StatusPersona", requestDto.StatusPersona ?? (object)DBNull.Value);


                    var rowsAffected = await command.ExecuteNonQueryAsync();

                    if (rowsAffected > 0)
                    {
                        response.IsSucces = true;
                        response.Message = "Actualización realizada con éxito.";
                        response.Data = true;
                    }
                    else
                    {
                        response.IsSucces = false;
                        response.Message = "No se encontraron registros para actualizar.";
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

        public async Task<BaseResponse<UserEditResponse>> UserbyId(int id)
        {
            var response = new BaseResponse<UserEditResponse>();


            using var connection = (SqlConnection)_context.Database.GetDbConnection();
            try
            {


                if (connection.State != System.Data.ConnectionState.Open)
                    await connection.OpenAsync();

                // Crear el comando SQL para ejecutar el procedimiento almacenado
                using (var command = new SqlCommand("ConsultarUsuarioPorId", connection))
                {
                    command.CommandType = System.Data.CommandType.StoredProcedure;


                    command.Parameters.AddWithValue("@idUsuario", id);

                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        if (await reader.ReadAsync())
                        {

                            var user = new UserEditResponse
                            {
                                UserName = reader["UserName"]?.ToString(),
                                SesionActive = reader["SesionActive"]?.ToString(),
                                StatusUsuario = reader["Status"]?.ToString(),
                                Nombres = reader["Nombres"]?.ToString(),
                                IdUsuario = reader["idUsuario"] != DBNull.Value
    ? Convert.ToInt32(reader["idUsuario"])
    : 0,
                                IdPersona = reader["idPersona"] != DBNull.Value
    ? Convert.ToInt32(reader["idPersona"])
    : 0,
                                Apellidos = reader["Apellidos"]?.ToString(),
                                FechaNacimiento = reader["FechaNacimiento"] != DBNull.Value
    ? reader["FechaNacimiento"] is DateTime fechaTime
        ? DateOnly.FromDateTime(fechaTime)
        : (DateOnly?)null
    : (DateOnly?)null,
                                StatusPersona = reader["Status"]?.ToString()
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
        public async Task<BaseResponse<IEnumerable<UsuariosAdmResponseDto>>> ListaUsuarios(int usuarioId, BaseFilterRequest filters)
        {
            var response = new BaseResponse<IEnumerable<UsuariosAdmResponseDto>>();
            var totalpage = 0;
            try
            {
                if (usuarioId > 0)
                {
                    using var connection = _context.Database.GetDbConnection();
                    await connection.OpenAsync();

                    using var command = connection.CreateCommand();
                    command.CommandText = "ConsultarUsuariosYPersonasConFiltros";
                    command.CommandType = System.Data.CommandType.StoredProcedure;

                    var param = command.CreateParameter();
                    param.ParameterName = "@UsuarioId";
                    param.Value = usuarioId;
                    command.Parameters.Add(param);
                    ////filtros

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

                    if (!string.IsNullOrWhiteSpace(filters.StateFilter))
                    {
                        var paramStateFilter = command.CreateParameter();
                        paramStateFilter.ParameterName = "@StateFilter";
                        paramStateFilter.Value = filters.StateFilter;
                        command.Parameters.Add(paramStateFilter);
                    }

                    if (!string.IsNullOrWhiteSpace(filters.StartDate))
                    {
                        var paramStartDate = command.CreateParameter();
                        paramStartDate.ParameterName = "@StartDate";
                        paramStartDate.Value = filters.StartDate;
                        command.Parameters.Add(paramStartDate);
                    }

                    if (!string.IsNullOrWhiteSpace(filters.EndDate))
                    {
                        var paramEndDate = command.CreateParameter();
                        paramEndDate.ParameterName = "@EndDate";
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
                    paramNumRecordsPage.Value = filters.NumRecordsPage;
                    paramNumRecordsPage.DbType = DbType.Int32;
                    command.Parameters.Add(paramNumRecordsPage);
                    ;
                    var paramTotalRecords = command.CreateParameter();
                    paramTotalRecords.ParameterName = "@TotalRecords";
                    paramTotalRecords.DbType = DbType.Int32;
                    paramTotalRecords.Direction = ParameterDirection.Output;
                    command.Parameters.Add(paramTotalRecords);


                    using (var reader2 = command.ExecuteReader())
                    {

                        while (reader2.Read())
                        {
                            //cuenta los datos alamacenados para la paginacion
                        }
                    }


                    totalpage = (int)paramTotalRecords.Value;


                    using var reader = await command.ExecuteReaderAsync();
                    var usuariosAdmList = new List<UsuariosAdmResponseDto>();

                    while (await reader.ReadAsync())
                    {
                        usuariosAdmList.Add(new UsuariosAdmResponseDto
                        {
                            idUsuario = Convert.ToInt32(reader["idUsuario"]),
                            UserName = reader["UserName"]?.ToString(),

                            Mail = reader["Mail"]?.ToString(),
                            SesionActive = reader["SesionActive"]?.ToString(),
                            StatusUsuario = reader["StatusUsuario"]?.ToString(),
                            IntentosFallidos = Convert.ToInt32(reader["IntentosFallidos"]),
                            idPersona = Convert.ToInt32(reader["idPersona"]),
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
                    response.TotalRecords = totalpage;
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

        public async Task<BaseResponse<bool>> EliminarUsuario(int id, int idAdmin)
        {
            var response = new BaseResponse<bool>();
            var resultado = 0;
            try
            {
                using var connection = (SqlConnection)_context.Database.GetDbConnection(); // Obtener la conexión del DbContext.

                try
                {
                    await connection.OpenAsync();

                    using (var command = new SqlCommand("EliminarUsuario", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;

                        command.Parameters.AddWithValue("@IdAdmin", idAdmin);
                        command.Parameters.AddWithValue("@UsuarioId", id);
                        var paramResultado = command.CreateParameter();
                        paramResultado.ParameterName = "@Resultado";
                        paramResultado.DbType = DbType.Int32;
                        paramResultado.Direction = ParameterDirection.Output;
                        command.Parameters.Add(paramResultado);
                        await command.ExecuteNonQueryAsync();
                        resultado = (int)paramResultado.Value;

                        if (resultado == 1)
                        {

                            response.IsSucces = true;
                            response.Message = "EXITO AL ELIMINAR USUARIO";
                            response.AdditionalData = resultado;

                        }
                        if (resultado == -1)
                        {
                            response.IsSucces = false;
                            response.Message = "OCURRIO UN ERROR AL ELIMINAR AL USUARIO, VERIFIQUE EL ID DEL USUARIO, " +
                                "O QUIZA NO TENGA PERMISOS PARA REALIZAR ESTA ACCION";

                            response.AdditionalData = resultado;
                        }


                    }

                }
                catch (SqlException ex)
                {
                    response.IsSucces = false;
                    response.Message = $"Error inesperado: {ex.Message}";
                    response.Data = false;
                }
            }
            catch (Exception e)
            {
                response.IsSucces = false;
                response.Message = $"Error inesperado: {e.Message}";
                response.Data = false;
            }
            return response;

        }



        public async Task<BaseResponse<DatospersonalesAdminResponse>> DatosAdminPerfil(int id)
        {
            var response = new BaseResponse<DatospersonalesAdminResponse>();

            // Establecer la conexión con la base de datos

            using var connection = (SqlConnection)_context.Database.GetDbConnection();
            try
            {

                // Asegurarse de que la conexión esté abierta
                if (connection.State != System.Data.ConnectionState.Open)
                    await connection.OpenAsync();

                // Crear el comando SQL para ejecutar el procedimiento almacenado
                using (var command = new SqlCommand("ConsultarDatosAdmin", connection))
                {
                    command.CommandType = System.Data.CommandType.StoredProcedure;

                    // Parámetro para el procedimiento almacenado
                    command.Parameters.AddWithValue("@idUsuario", id);

                    // Ejecutar el comando y obtener el resultado
                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        if (await reader.ReadAsync())
                        {
                           
                            var user = new DatospersonalesAdminResponse
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

                            // Asignar los valores a la respuesta
                            response.IsSucces = true;
                            response.Message = "Usuario encontrado.";
                            response.Data = user;
                        }
                        else
                        {
                            // Si no se encuentra ningún usuario
                            response.IsSucces = false;
                            response.Message = "Usuario no encontrado.";
                            response.Data = null;
                        }
                    }
                }
            }
            catch (SqlException ex)
            {
                // Capturar errres específicos de SQL
                response.IsSucces = false;
                response.Message = $"Error al consultar el usuario: {ex.Message}";
                response.Data = null;
            }
            catch (Exception ex)
            {
                // Capturar cualquier otro tipo de error
                response.IsSucces = false;
                response.Message = $"Error inesperado: {ex.Message}";
                response.Data = null;
            }

            return response;


        }

        public async Task<BaseResponse<bool>> EditDTPersonal(DatosPersonalesAdminRequest requestDto, int id)
        {
            var response = new BaseResponse<bool>();
            using var connection = (SqlConnection)_context.Database.GetDbConnection(); 

            try
            {
                await connection.OpenAsync(); 

                using (var command = new SqlCommand("ActualizarDatosAdmin", connection))
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
                        response.Message = "No se encontraron registros para actualizar.";
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

using PRU.Application.Commons.Bases.Request;
using PRU.Application.Commons.Bases.Response;
using PRU.Application.Dtos.Administrador.Usuarios;
using PRU.Application.Dtos.Usuarios.Request;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PRU.Application.Interfaces
{
   public interface IAdministrador
    {
        Task<BaseResponse<IEnumerable<UsuariosAdmResponseDto>>> ListaUsuarios(int usuarioId, BaseFilterRequest filters);
        Task<BaseResponse<bool>> RegisterUser(UsuarioRequest requestDto);
        Task<BaseResponse<bool>> EditUser(UserEditResponse requestDto, int id);
        Task<BaseResponse<UserEditResponse>> UserbyId(int id);
        Task<BaseResponse<bool>> EliminarUsuario(int id, int idAdmin);
    }
}

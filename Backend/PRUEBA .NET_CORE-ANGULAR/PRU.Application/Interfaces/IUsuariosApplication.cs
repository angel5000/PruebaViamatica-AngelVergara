using PRU.Application.Commons.Bases.Response;
using PRU.Application.Dtos.Administrador.DatosPersonales;
using PRU.Application.Dtos.Administrador.DatosPersonales.Response;
using PRU.Application.Dtos.UsuarioGeneral.Request;
using PRU.Application.Dtos.UsuarioGeneral.Response;
using PRU.Application.Dtos.Usuarios.Request;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PRU.Application.Interfaces
{
   public interface IUsuariosApplication
    {

        Task<BaseResponse<UsuarioGResponse>> DatosUsuarioGPerfil(int id);
        Task<BaseResponse<bool>> EditDTPersonalUsuario(UsuarioGRequest requestDto, int id);
    }
}

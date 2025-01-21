using PRU.Application.Commons.Bases.Request;
using PRU.Application.Commons.Bases.Response;
using PRU.Application.Dtos.Administrador.Usuarios;
using PRU.Application.Dtos.Sesiones.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PRU.Application.Interfaces
{
    public interface ISesiones
    {
        Task<BaseResponse<IEnumerable<SesionsResponse>>> ListaSesiones(int usuarioId, BaseFilterRequest filters);
        //Task<BaseResponse<IEnumerable<UsuariosAdmResponseDto>>> ListaSesiones(int usuarioId, BaseFilterRequest filters);


    }
}

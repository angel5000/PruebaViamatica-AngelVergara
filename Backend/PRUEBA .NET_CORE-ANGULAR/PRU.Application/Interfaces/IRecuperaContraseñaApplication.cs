using PRU.Application.Commons.Bases.Response;
using PRU.Application.Dtos.RecuperarContrasena.Request;
using PRU.Application.Dtos.Usuarios.Request;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PRU.Application.Interfaces
{
    public interface IRecuperaContraseñaApplication
    {
        Task<BaseResponse<bool>> RecuperarContrasena(RecuperaContrasena requestDto);

    }
}

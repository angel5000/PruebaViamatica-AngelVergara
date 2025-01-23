using PRU.Application.Commons.Bases.Request;
using PRU.Application.Commons.Bases.Response;
using PRU.Application.Dtos.Administrador.Roles;
using PRU.Application.Dtos.Administrador.Usuarios;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PRU.Application.Interfaces
{
 public interface IRolesOpcionesApplication
    {
        Task<BaseResponse<IEnumerable<RolesOpcionesresponse>>> OpcionesRoles(int usuarioId);


    }
}

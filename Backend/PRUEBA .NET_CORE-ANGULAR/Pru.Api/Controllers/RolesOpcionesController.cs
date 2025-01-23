using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PRU.Application.Commons.Bases.Request;
using PRU.Application.Interfaces;

namespace Pru.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RolesOpcionesController : ControllerBase
    {
        private readonly IRolesOpcionesApplication IRolesApplication;

        public RolesOpcionesController(IRolesOpcionesApplication iRolesApplication)
        {
            IRolesApplication = iRolesApplication;
        }

        [HttpGet("RolesOpciones")]
        public async Task<IActionResult> RolesOpciones(int idUsuario)
        {
            var response = await IRolesApplication.OpcionesRoles(idUsuario);
            return Ok(response);
        }


    }
}

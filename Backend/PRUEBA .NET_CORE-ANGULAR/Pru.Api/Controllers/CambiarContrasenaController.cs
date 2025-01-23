using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PRU.Application.Dtos.Administrador.Usuarios;
using PRU.Application.Dtos.RecuperarContrasena.Request;
using PRU.Application.Interfaces;

namespace Pru.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CambiarContrasenaController : ControllerBase
    {
        private readonly IRecuperaContraseñaApplication IRCApplication;

        public CambiarContrasenaController(IRecuperaContraseñaApplication iRCApplication)
        {
            IRCApplication = iRCApplication;
        }

        [HttpPut("ctrsnueva")]
        public async Task<IActionResult> EditUsuarios( [FromForm] RecuperaContrasena requestDto)
        {
            var response = await IRCApplication.RecuperarContrasena(requestDto);
            return Ok(response);


        }


    }

}

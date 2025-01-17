using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PRU.Application.Dtos.Usuarios.Request;
using PRU.Application.Interfaces;

namespace Pru.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuariosController : ControllerBase
    {

        private readonly IUsuariosApplication userApplication;

        public UsuariosController(IUsuariosApplication userApplication)
        {
            this.userApplication = userApplication;
        }
        [HttpPost("register")]
        public async Task<IActionResult> RegisterUser([FromBody] UsuarioRequest requestDto)
        {
            var response = await userApplication.RegisterUser(requestDto);
     
            if (response.IsSucces)
            {
                return Ok(new
                {
                    response.Message,
                    response.AdditionalData
                });  // Retorna un OK con los datos adicionales (como los IDs generados)
            }

            return StatusCode(500, new
            {
                response.Message,
                //response.Errors
            });  // Si hubo un error, retorna un código 500 con el mensaje de error
        }
    }
}

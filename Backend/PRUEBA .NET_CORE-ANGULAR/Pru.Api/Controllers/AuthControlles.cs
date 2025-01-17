using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PRU.Application.Dtos.Usuarios.Request;
using PRU.Application.Interfaces;

namespace Pru.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthControlles : ControllerBase
    {

        private readonly IAuth IAuthApplication;

        public AuthControlles(IAuth iAuthApplication)
        {
            this.IAuthApplication = iAuthApplication;
        }

        [HttpPost("Login")]
        public async Task<IActionResult> LoginUser([FromBody] TokenRequest requestDto)
        {
            var response = await IAuthApplication.Login(requestDto);

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
                response.Errors
            });  // Si hubo un error, retorna un código 500 con el mensaje de error
        }
        [HttpPost("Logout")]
        public async Task<IActionResult> Loginout([FromBody] string credenciales)
        {
            var response = await IAuthApplication.Logout(credenciales);

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
                response.Errors
            });  // Si hubo un error, retorna un código 500 con el mensaje de error
        }


    }
}

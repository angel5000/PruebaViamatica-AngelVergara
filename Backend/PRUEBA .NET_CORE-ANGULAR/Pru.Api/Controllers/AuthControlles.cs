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
            return Ok(response);
        }
        [HttpPost("Logout")]
        public async Task<IActionResult> Loginout([FromBody] string credenciales)
        {
            var response = await IAuthApplication.Logout(credenciales);

            return Ok(response);
        }


    }
}

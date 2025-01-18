using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PRU.Application.Dtos.Administrador.Usuarios;
using PRU.Application.Dtos.Usuarios.Request;
using PRU.Application.Interfaces;

namespace Pru.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly IAdministrador IAdminApplication;

        public AdminController(IAdministrador iAuthApplication)
        {
            this.IAdminApplication = iAuthApplication;
        }
        [HttpGet("ListaUsuarios")]
        public async Task<IActionResult> ListaUsuarios(int idUsuario)
        {
            var response = await IAdminApplication.ListaUsuarios(idUsuario) ;
            return Ok(response);
        }


    }
}

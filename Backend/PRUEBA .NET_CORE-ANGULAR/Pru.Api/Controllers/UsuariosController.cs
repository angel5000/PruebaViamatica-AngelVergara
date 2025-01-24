using Azure;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PRU.Application.Dtos.Administrador.DatosPersonales;
using PRU.Application.Dtos.UsuarioGeneral.Request;
using PRU.Application.Dtos.Usuarios.Request;
using PRU.Application.Interfaces;
using PRU.Domain.Entities;
using PRU.Infrastructure.FileExcel;

namespace Pru.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuariosController : ControllerBase
    {

        private readonly IUsuariosApplication IUsuarioApplication;

        public UsuariosController(IUsuariosApplication iUsuarioApplication)
        {
            IUsuarioApplication = iUsuarioApplication;
        }
        [HttpPut("EditUserGdt/{idUser:int}")]
        public async Task<IActionResult> EditUsuarioGeneralPerfil(int idUser, [FromForm] UsuarioGRequest requestDto)
        {
            var response = await IUsuarioApplication.EditDTPersonalUsuario(requestDto, idUser);
            return Ok(response);


        }
        [HttpGet("infoperfilUsuarioG/{idUser:int}")]
        public async Task<IActionResult> MostrarDtosPerfilUsuarioG(int idUser)
        {
            var response = await IUsuarioApplication.DatosUsuarioGPerfil(idUser);
            return Ok(response);
        }
    }
}

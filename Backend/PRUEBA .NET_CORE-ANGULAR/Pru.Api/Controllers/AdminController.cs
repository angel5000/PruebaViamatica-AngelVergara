using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PRU.Application.Commons.Bases.Request;
using PRU.Application.Dtos.Administrador.Usuarios;
using PRU.Application.Dtos.Usuarios.Request;
using PRU.Application.Interfaces;
using PRU.Infrastructure.FileExcel;

namespace Pru.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly IAdministrador IAdminApplication;

      
        private readonly IUploadExcel upexcel;
        public AdminController(IAdministrador iAuthApplication,  IUploadExcel upexcel)
        {
            this.IAdminApplication = iAuthApplication;

            this.upexcel = upexcel;
        }
        [HttpGet("ListaUsuarios")]
        public async Task<IActionResult> ListaUsuarios(int idUsuario, [FromQuery] BaseFilterRequest filters)
        {
            var response = await IAdminApplication.ListaUsuarios(idUsuario,filters) ;
            return Ok(response);
        }





        [HttpPost("register")]
        public async Task<IActionResult> RegisterUser([FromForm] UsuarioRequest requestDto)
        {
            var response = await IAdminApplication.RegisterUser(requestDto);

            return Ok(response);
           
        }


        [HttpPost("registerbyExcel")]
        public async Task<IActionResult> RegisterUserbyExcel(IFormFile archivo, [FromServices] IUploadExcel uploadExcelService)
        {

            var usuarios = upexcel.SubirExcel<UsuarioRequest>(archivo);

            foreach (var usuario in usuarios)
            {
                // Registrar cada usuario individualmente
                var response = await IAdminApplication.RegisterUser(usuario);

                // Validar respuesta en caso de error
                if (!response.IsSucces)
                {
                    return BadRequest($"Error al registrar usuario: {response.Message}");
                }

            }
            return Ok("Excel subido correctamente");

        }


        [HttpPut("EditbyAdmin/{idAdmin:int}")]
        public async Task<IActionResult> EditUsuarios(int idAdmin,[FromForm] UserEditResponse requestDto)
        {
            var response = await IAdminApplication.EditUser(requestDto, idAdmin);
            return Ok(response);


        }

        [HttpGet("{idUsuario:int}")]
        public async Task<IActionResult> CategorybyId(int idUsuario)
        {
            var response = await IAdminApplication.UserbyId(idUsuario);
            return Ok(response);
        }
        [HttpPut("DeletUser/{idAdmin:int}")]
        public async Task<IActionResult> EliminarUsuario(int idAdmin, int idUsuario)
        {
            var response = await IAdminApplication.EliminarUsuario (idUsuario, idAdmin);
            return Ok(response);


        }







    }
}

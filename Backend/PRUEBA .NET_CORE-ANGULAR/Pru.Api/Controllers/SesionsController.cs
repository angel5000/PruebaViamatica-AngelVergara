using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PRU.Application.Commons.Bases.Request;
using PRU.Application.Interfaces;
using PRU.Infrastructure.FileExcel;

namespace Pru.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SesionsController : ControllerBase
    {
        private readonly ISesiones ISesionsApplication;



        public SesionsController(ISesiones ISesionsApplication)
        {
            this.ISesionsApplication = ISesionsApplication;

        }
        [HttpGet("ListaSesiones")]
        public async Task<IActionResult> ListaUsuarios(int idUsuario, [FromQuery] BaseFilterRequestDates filters)
        {
            var response = await ISesionsApplication.ListaSesiones(idUsuario, filters);
            return Ok(response);
        }

    }
}

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PRU.Application.Commons.Bases.Request;
using PRU.Application.Interfaces;
using PRU.Infrastructure.FileExcel;

namespace Pru.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DashboardController : ControllerBase
    {
        private readonly IDashboardApplication IDashboarApplication;

public DashboardController(IDashboardApplication iDashboarApplication)
        {
            IDashboarApplication = iDashboarApplication;
        }

        [HttpGet("Dashboard")]
        public async Task<IActionResult> ListaUsuarios(int idUsuario, [FromQuery] BaseFilterRequestSimple filters)
        {
            var response = await IDashboarApplication.ListInfodashboard(idUsuario, filters);
            return Ok(response);
        }
        [HttpGet("DashboardCount")]
        public async Task<IActionResult> DashboardCount()
        {
            var response = await IDashboarApplication.InfoResumeDash();
            return Ok(response);
        }
    }
}

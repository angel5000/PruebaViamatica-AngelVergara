using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PRU.Application.Dtos.Dashboard.Response
{
    public class DashboardResponse
    {
        public int idUsuario { get; set; }
        public string? FechaIngreso { get; set; }
        public string? FechaCierre { get; set; }
        public string? SesionExitosa { get; set; }
        public string? SesionFallida { get; set; }
        public string? SesionActive { get; set; }
        public int? IntentosFallidos { get; set; }
        public string? UserName { get; set; }
        public string? StatusUsuario { get; set; }

    }
    public class DashboardResponseResumen
    {
        public int TotalUsuarios { get; set; }
        public int TotalBloqueados { get; set; }
        public int TotalSesionActiva { get; set; }


    }

}

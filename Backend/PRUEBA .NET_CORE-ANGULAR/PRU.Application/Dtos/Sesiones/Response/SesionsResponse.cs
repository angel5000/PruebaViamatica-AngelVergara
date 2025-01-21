using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PRU.Application.Dtos.Sesiones.Response
{
    public class SesionsResponse
    {
        public DateTime? FechaIngreso { get; set; }
        public DateTime? FechaCierre { get; set; }
        public int SesionExitosa { get; set; }
        public int SesionFallida { get; set; }
        public int SesionFallidaTotales { get; set; }

        public int RegistrosTotales { get; set; }
    }
    }
 

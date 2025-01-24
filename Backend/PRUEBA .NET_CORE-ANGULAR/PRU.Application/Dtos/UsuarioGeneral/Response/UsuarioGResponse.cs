using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PRU.Application.Dtos.UsuarioGeneral.Response
{
    public class UsuarioGResponse
    {
        public string? UserName { get; set; }
        public string? Mail { get; set; }
        public string? Nombres { get; set; }
        public string? Apellidos { get; set; }
        public string? Identificacion { get; set; }
        public DateOnly? FechaNacimiento { get; set; }
        public DateTime? FechaIngreso { get; set; }

    }
}

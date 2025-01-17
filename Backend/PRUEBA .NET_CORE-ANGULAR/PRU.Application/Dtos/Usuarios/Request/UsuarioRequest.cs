using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PRU.Application.Dtos.Usuarios.Request
{
   public class UsuarioRequest
    {
        public string? Nombres { get; set; }

        public string? Apellidos { get; set; }

        public string? Identificacion { get; set; }

        public DateOnly? FechaNacimiento { get; set; }


        public string? StatadoPersona { get; set; }
        public string? UserName { get; set; }

        public string? Password { get; set; }


        public string? SesionActive { get; set; }
    
        public string? StatadoUsuario { get; set; }

    }
}

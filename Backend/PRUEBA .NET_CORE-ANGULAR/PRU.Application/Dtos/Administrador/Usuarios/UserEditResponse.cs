using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PRU.Application.Dtos.Administrador.Usuarios
{
  public class UserEditResponse
    {
        public string? UserName { get; set; }
        public string? SesionActive { get; set; }
        public int? IdPersona { get; set; }
        public string? StatusUsuario { get; set; }
        public string? Nombres { get; set; }
        public string? Apellidos { get; set; }
        public DateOnly? FechaNacimiento { get; set; }
        public string? StatusPersona { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PRU.Application.Dtos.Usuarios.Request
{
public class TokenRequest
    {

    
        public string? Credenciales { get; set; }
        public string? Password { get; set; }
     /*   public bool SesionActiva { get; set; } // Nuevo campo
        public string? Status { get; set; } // Estado del usuario (Activo, Bloqueado)
        public int IntentosFallidos { get; set; }*/
    }
}

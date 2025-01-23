using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PRU.Application.Dtos.RecuperarContrasena.Request
{
   public class RecuperaContrasena
    {
        public string? NuevaContrasena { get; set; }
        public string? ConfirNuevaContrasena { get; set; }
        public string? Email { get; set; }
        public string? Identificacion { get; set; }

    }
}

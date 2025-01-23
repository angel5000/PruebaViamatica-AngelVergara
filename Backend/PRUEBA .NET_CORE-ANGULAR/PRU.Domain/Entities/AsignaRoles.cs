using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PRU.Domain.Entities
{
   public class AsignaRoles
    {
        public int? IdUsuario { get; set; }
        public int? Opcion_IdOpcion { get; set;}
        public bool? Activo { get; set; }
        // Relación con Usuarios
        public virtual Usuarios Usuario { get; set; } = null!;

        // Relación con RolOpciones
        public virtual RolOpciones Opcion { get; set; } = null!;
    }
}

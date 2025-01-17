using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PRU.Domain.Entities
{
    public partial class Rol_Usuarios
    {
        public int Rol_idRol { get; set; }
        public int Usuarios_idUsuarios { get; set; }

        public virtual Rol Rol { get; set; } = null!;
        public virtual Usuarios Usuario { get; set; } = null!;
    }
}

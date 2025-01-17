using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PRU.Domain.Entities
{
    public partial class Rol_rol_Opciones
    {
        public int Rol_idRol { get; set; }
        public int RolOpciones_idOpciones { get; set; }

        public virtual Rol Rol { get; set; } = null!;
        public virtual RolOpciones RolOpciones { get; set; } = null!;
    }
}

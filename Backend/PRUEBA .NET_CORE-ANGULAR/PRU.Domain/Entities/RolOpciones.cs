using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PRU.Domain.Entities
{
    public partial class RolOpciones
    {
        public string? NombreOpciones { get; set; }
        public int idOpciones { get; set; }

        public virtual ICollection<Rol_rol_Opciones> Rol_rol_Opciones { get; set; } = new List<Rol_rol_Opciones>();
    }
}

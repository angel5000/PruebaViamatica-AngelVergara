using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PRU.Domain.Entities
{
    public partial class Rol
    {
        public int idRol { get; set; }
        public string? RolName { get; set; }

        public virtual ICollection<Rol_Usuarios> RolUsuarios { get; set; } = new List<Rol_Usuarios>();


    }
}

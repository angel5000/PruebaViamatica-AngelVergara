using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PRU.Domain.Entities
{
    public partial class Usuarios
    {
        public int idUsuario { get; set; }
        public string? UserName { get; set; }

        public string? Password { get; set; }

        public string? Mail { get; set; }

        public string? SesionActive { get; set; }
        public int IntentosFallidos { get; set; }
        public int Persona_IdPersona2 { get; set; }

        public string? Status { get; set; }
       
        public virtual ICollection<Rol_Usuarios> RolUsuarios { get; set; } = new List<Rol_Usuarios>();
        public virtual Persona Persona { get; set; } = null!;
        public virtual ICollection<Sessions> Sesiones { get; set; } = new List<Sessions>();
        public virtual ICollection<AsignaRoles> AsignaRoles { get; set; } = new List<AsignaRoles>();

    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PRU.Domain.Entities
{
    public partial class Persona
    {
        public int idPersona { get; set; }
        public string? Nombres { get; set; }

        public string? Apellidos { get; set; }

        public string? Identificacion { get; set; }

        public DateOnly? FechaNacimiento { get; set; }
      

        public string? Status { get; set; }

        public virtual ICollection<Usuarios> Usuarios { get; set; } = new List<Usuarios>();

    }
}

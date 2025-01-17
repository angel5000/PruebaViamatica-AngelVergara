using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PRU.Domain.Entities
{
    public partial class Sessions { 
    
        public DateTime?  FechaIngreso { get; set; }
        public DateTime? FechaCierre { get; set; }
        public int idPersona { get; set; }

        public virtual Usuarios Usuario { get; set; } = null!;

    }
}

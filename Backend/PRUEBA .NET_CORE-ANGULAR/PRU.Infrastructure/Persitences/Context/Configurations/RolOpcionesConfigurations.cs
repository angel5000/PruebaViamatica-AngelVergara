using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using PRU.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PRU.Infrastructure.Persitences.Context.Configurations
{
    public class RolOpcionesConfigurations : IEntityTypeConfiguration<RolOpciones>
    {
        public void Configure(EntityTypeBuilder<RolOpciones> builder)
        {
            builder.HasKey(e => e.idOpciones);

            builder.Property(e => e.NombreOpciones)
                .HasMaxLength(50)
                .IsUnicode(false);
        }
    }
}

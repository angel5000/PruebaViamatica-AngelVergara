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
    public class SessionsConfigurations : IEntityTypeConfiguration<Sessions>
    {
        public void Configure(EntityTypeBuilder<Sessions> builder)
        {
            builder.HasKey(e => new { e.idPersona, e.FechaIngreso });

            builder.HasOne(e => e.Usuario)
                .WithMany(u => u.Sesiones)
                .HasForeignKey(e => e.idPersona)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}

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
    public class PersonaConfigurations : IEntityTypeConfiguration<Persona>
    {
        public void Configure(EntityTypeBuilder<Persona> builder)
        {
            builder.HasKey(e => e.idPersona);

            builder.Property(e => e.Nombres)
                .HasMaxLength(100)
                .IsUnicode(false);

            builder.Property(e => e.Apellidos)
                .HasMaxLength(100)
                .IsUnicode(false);

            builder.Property(e => e.Identificacion)
                .HasMaxLength(20)
                .IsUnicode(false);

            builder.Property(e => e.Status)
                .HasMaxLength(20)
                .IsUnicode(false);
        }
    }
}

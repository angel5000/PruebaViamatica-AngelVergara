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
    public class RolRolOpcionesConfigurations : IEntityTypeConfiguration<Rol_rol_Opciones>
    {
        public void Configure(EntityTypeBuilder<Rol_rol_Opciones> builder)
        {
            builder.HasKey(e => new { e.Rol_idRol, e.RolOpciones_idOpciones });

            builder.HasOne(e => e.Rol)
                .WithMany()
                .HasForeignKey(e => e.Rol_idRol)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(e => e.RolOpciones)
                .WithMany(r => r.Rol_rol_Opciones)
                .HasForeignKey(e => e.RolOpciones_idOpciones)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}

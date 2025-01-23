using DocumentFormat.OpenXml.Vml.Office;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PRU.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PRU.Infrastructure.Persitences.Context.Configurations
{
    public class AsignaRolesConfigurations : IEntityTypeConfiguration<AsignaRoles>
    {
        public void Configure(EntityTypeBuilder<AsignaRoles> builder)
        {
            builder.HasKey(ar => new { ar.IdUsuario, ar.Opcion_IdOpcion });

            // Relación con Usuarios
            builder.HasOne(ar => ar.Usuario)
                  .WithMany(u => u.AsignaRoles)
                  .HasForeignKey(ar => ar.IdUsuario);

            // Relación con RolOpciones
            builder.HasOne(ar => ar.Opcion)
                  .WithMany(ro => ro.AsignaRoles)
                  .HasForeignKey(ar => ar.Opcion_IdOpcion);

            // Otros campos
            builder.Property(ar => ar.Activo).IsRequired();

        }
    }
}

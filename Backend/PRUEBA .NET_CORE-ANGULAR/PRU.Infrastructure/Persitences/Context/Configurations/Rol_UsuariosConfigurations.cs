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
    public class RolUsuariosConfigurations : IEntityTypeConfiguration<Rol_Usuarios>
    {
        public void Configure(EntityTypeBuilder<Rol_Usuarios> builder)
        {
            builder.HasKey(e => new { e.Rol_idRol, e.Usuarios_idUsuarios });

            builder.HasOne(e => e.Rol)
                .WithMany(r => r.RolUsuarios)
                .HasForeignKey(e => e.Rol_idRol)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(e => e.Usuario)
                .WithMany(u => u.RolUsuarios)
                .HasForeignKey(e => e.Usuarios_idUsuarios)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}

using DocumentFormat.OpenXml.Spreadsheet;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PRU.Domain.Entities;

namespace PRU.Infrastructure.Persitences.Context.Configurations
{
   public class UsuariosConfigurations : IEntityTypeConfiguration<Usuarios>
    {

        public void Configure(EntityTypeBuilder<Usuarios> builder)
        {
            builder.HasKey(e => e.idUsuario);

            builder.Property(e => e.UserName)
                .HasMaxLength(50)
                .IsUnicode(false);

            builder.Property(e => e.Mail)
                .HasMaxLength(100)
                .IsUnicode(false);

            builder.Property(e => e.SesionActive)
                .HasMaxLength(20)
                .IsUnicode(false);

            builder.Property(e => e.Status)
                .HasMaxLength(20)
                .IsUnicode(false);
            builder.Property(e => e.IntentosFallidos)
              .HasColumnType("int") 
                .IsRequired(); 

            builder.HasOne(e => e.Persona)
                .WithMany(p => p.Usuarios)
                .HasForeignKey(e => e.Persona_IdPersona2)
                .OnDelete(DeleteBehavior.Restrict);
        }
    



}
}

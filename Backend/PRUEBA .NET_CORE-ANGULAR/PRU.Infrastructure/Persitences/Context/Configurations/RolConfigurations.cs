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
    public class RolConfigurations : IEntityTypeConfiguration<Rol>
    {
        public void Configure(EntityTypeBuilder<Rol> builder)
        {
            builder.HasKey(e => e.idRol);

            builder.Property(e => e.RolName)
                .HasMaxLength(50)
                .IsUnicode(false);
        }
    }
}

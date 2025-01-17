using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Reflection;
using Microsoft.EntityFrameworkCore;
using PRU.Domain.Entities;
using ClosedXML.Parser;

namespace PRU.Infrastructure.Persitences.Context
{
    public partial class PruContext : DbContext
    {
        public PruContext()
        {

        }
        public PruContext(DbContextOptions<PruContext> options)
     : base(options)

        {
        }

        public DbSet<Persona> Personas { get; set; }
        public DbSet<Usuarios> Usuarios { get; set; }
        public DbSet<Sessions> Sessions { get; set; }
        public DbSet<Rol> Roles { get; set; }
        public DbSet<Rol_Usuarios> RolUsuarios { get; set; }
        public DbSet<RolOpciones> RolOpciones { get; set; }
        public DbSet<Rol_rol_Opciones> RolRolOpciones { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.HasAnnotation("Relationl:Collation", "Modern_Spanish_CI_AS");
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);


    }
}

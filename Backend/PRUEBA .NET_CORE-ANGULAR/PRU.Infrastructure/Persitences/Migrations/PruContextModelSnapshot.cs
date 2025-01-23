﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using PRU.Infrastructure.Persitences.Context;

#nullable disable

namespace PRU.Infrastructure.Persitences.Migrations
{
    [DbContext(typeof(PruContext))]
    partial class PruContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "9.0.1")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("Relationl:Collation", "Modern_Spanish_CI_AS");

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("PRU.Domain.Entities.AsignaRoles", b =>
                {
                    b.Property<int>("IdUsuario")
                        .HasColumnType("int");

                    b.Property<int>("Opcion_IdOpcion")
                        .HasColumnType("int");

                    b.Property<bool>("Activo")
                        .HasColumnType("bit");

                    b.HasKey("IdUsuario", "Opcion_IdOpcion");

                    b.HasIndex("Opcion_IdOpcion");

                    b.ToTable("AsignaRoles");
                });

            modelBuilder.Entity("PRU.Domain.Entities.Persona", b =>
                {
                    b.Property<int>("idPersona")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("idPersona"));

                    b.Property<string>("Apellidos")
                        .HasMaxLength(100)
                        .IsUnicode(false)
                        .HasColumnType("varchar(100)");

                    b.Property<DateOnly?>("FechaNacimiento")
                        .HasColumnType("date");

                    b.Property<string>("Identificacion")
                        .HasMaxLength(20)
                        .IsUnicode(false)
                        .HasColumnType("varchar(20)");

                    b.Property<string>("Nombres")
                        .HasMaxLength(100)
                        .IsUnicode(false)
                        .HasColumnType("varchar(100)");

                    b.Property<string>("Status")
                        .HasMaxLength(20)
                        .IsUnicode(false)
                        .HasColumnType("varchar(20)");

                    b.HasKey("idPersona");

                    b.ToTable("Personas");
                });

            modelBuilder.Entity("PRU.Domain.Entities.Rol", b =>
                {
                    b.Property<int>("idRol")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("idRol"));

                    b.Property<string>("RolName")
                        .HasMaxLength(50)
                        .IsUnicode(false)
                        .HasColumnType("varchar(50)");

                    b.HasKey("idRol");

                    b.ToTable("Roles");
                });

            modelBuilder.Entity("PRU.Domain.Entities.RolOpciones", b =>
                {
                    b.Property<int>("idOpciones")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("idOpciones"));

                    b.Property<string>("NombreOpciones")
                        .HasMaxLength(50)
                        .IsUnicode(false)
                        .HasColumnType("varchar(50)");

                    b.HasKey("idOpciones");

                    b.ToTable("RolOpciones");
                });

            modelBuilder.Entity("PRU.Domain.Entities.Rol_Usuarios", b =>
                {
                    b.Property<int>("Rol_idRol")
                        .HasColumnType("int");

                    b.Property<int>("Usuarios_idUsuarios")
                        .HasColumnType("int");

                    b.HasKey("Rol_idRol", "Usuarios_idUsuarios");

                    b.HasIndex("Usuarios_idUsuarios");

                    b.ToTable("RolUsuarios");
                });

            modelBuilder.Entity("PRU.Domain.Entities.Rol_rol_Opciones", b =>
                {
                    b.Property<int>("Rol_idRol")
                        .HasColumnType("int");

                    b.Property<int>("RolOpciones_idOpciones")
                        .HasColumnType("int");

                    b.HasKey("Rol_idRol", "RolOpciones_idOpciones");

                    b.HasIndex("RolOpciones_idOpciones");

                    b.ToTable("RolRolOpciones");
                });

            modelBuilder.Entity("PRU.Domain.Entities.Sessions", b =>
                {
                    b.Property<int>("idPersona")
                        .HasColumnType("int");

                    b.Property<DateTime>("FechaIngreso")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("FechaCierre")
                        .HasColumnType("datetime2");

                    b.Property<int>("SesionExitosa")
                        .HasColumnType("int");

                    b.Property<int>("SesionFallida")
                        .HasColumnType("int");

                    b.HasKey("idPersona", "FechaIngreso");

                    b.ToTable("Sessions");
                });

            modelBuilder.Entity("PRU.Domain.Entities.Usuarios", b =>
                {
                    b.Property<int>("idUsuario")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("idUsuario"));

                    b.Property<int>("IntentosFallidos")
                        .HasColumnType("int");

                    b.Property<string>("Mail")
                        .HasMaxLength(100)
                        .IsUnicode(false)
                        .HasColumnType("varchar(100)");

                    b.Property<string>("Password")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Persona_IdPersona2")
                        .HasColumnType("int");

                    b.Property<string>("SesionActive")
                        .HasMaxLength(20)
                        .IsUnicode(false)
                        .HasColumnType("varchar(20)");

                    b.Property<string>("Status")
                        .HasMaxLength(20)
                        .IsUnicode(false)
                        .HasColumnType("varchar(20)");

                    b.Property<string>("UserName")
                        .HasMaxLength(50)
                        .IsUnicode(false)
                        .HasColumnType("varchar(50)");

                    b.HasKey("idUsuario");

                    b.HasIndex("Persona_IdPersona2");

                    b.ToTable("Usuarios");
                });

            modelBuilder.Entity("PRU.Domain.Entities.AsignaRoles", b =>
                {
                    b.HasOne("PRU.Domain.Entities.Usuarios", "Usuario")
                        .WithMany("AsignaRoles")
                        .HasForeignKey("IdUsuario")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("PRU.Domain.Entities.RolOpciones", "Opcion")
                        .WithMany("AsignaRoles")
                        .HasForeignKey("Opcion_IdOpcion")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Opcion");

                    b.Navigation("Usuario");
                });

            modelBuilder.Entity("PRU.Domain.Entities.Rol_Usuarios", b =>
                {
                    b.HasOne("PRU.Domain.Entities.Rol", "Rol")
                        .WithMany("RolUsuarios")
                        .HasForeignKey("Rol_idRol")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("PRU.Domain.Entities.Usuarios", "Usuario")
                        .WithMany("RolUsuarios")
                        .HasForeignKey("Usuarios_idUsuarios")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("Rol");

                    b.Navigation("Usuario");
                });

            modelBuilder.Entity("PRU.Domain.Entities.Rol_rol_Opciones", b =>
                {
                    b.HasOne("PRU.Domain.Entities.RolOpciones", "RolOpciones")
                        .WithMany("Rol_rol_Opciones")
                        .HasForeignKey("RolOpciones_idOpciones")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("PRU.Domain.Entities.Rol", "Rol")
                        .WithMany()
                        .HasForeignKey("Rol_idRol")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("Rol");

                    b.Navigation("RolOpciones");
                });

            modelBuilder.Entity("PRU.Domain.Entities.Sessions", b =>
                {
                    b.HasOne("PRU.Domain.Entities.Usuarios", "Usuario")
                        .WithMany("Sesiones")
                        .HasForeignKey("idPersona")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("Usuario");
                });

            modelBuilder.Entity("PRU.Domain.Entities.Usuarios", b =>
                {
                    b.HasOne("PRU.Domain.Entities.Persona", "Persona")
                        .WithMany("Usuarios")
                        .HasForeignKey("Persona_IdPersona2")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("Persona");
                });

            modelBuilder.Entity("PRU.Domain.Entities.Persona", b =>
                {
                    b.Navigation("Usuarios");
                });

            modelBuilder.Entity("PRU.Domain.Entities.Rol", b =>
                {
                    b.Navigation("RolUsuarios");
                });

            modelBuilder.Entity("PRU.Domain.Entities.RolOpciones", b =>
                {
                    b.Navigation("AsignaRoles");

                    b.Navigation("Rol_rol_Opciones");
                });

            modelBuilder.Entity("PRU.Domain.Entities.Usuarios", b =>
                {
                    b.Navigation("AsignaRoles");

                    b.Navigation("RolUsuarios");

                    b.Navigation("Sesiones");
                });
#pragma warning restore 612, 618
        }
    }
}

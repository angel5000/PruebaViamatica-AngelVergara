using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PRU.Infrastructure.Persitences.Migrations
{
    /// <inheritdoc />
    public partial class CrearEntidades : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Personas",
                columns: table => new
                {
                    idPersona = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nombres = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: true),
                    Apellidos = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: true),
                    Identificacion = table.Column<string>(type: "varchar(20)", unicode: false, maxLength: 20, nullable: true),
                    FechaNacimiento = table.Column<DateOnly>(type: "date", nullable: true),
                    Status = table.Column<string>(type: "varchar(20)", unicode: false, maxLength: 20, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Personas", x => x.idPersona);
                });

            migrationBuilder.CreateTable(
                name: "Roles",
                columns: table => new
                {
                    idRol = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RolName = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Roles", x => x.idRol);
                });

            migrationBuilder.CreateTable(
                name: "RolOpciones",
                columns: table => new
                {
                    idOpciones = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NombreOpciones = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RolOpciones", x => x.idOpciones);
                });

            migrationBuilder.CreateTable(
                name: "Usuarios",
                columns: table => new
                {
                    idUsuario = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserName = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Mail = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: true),
                    SesionActive = table.Column<string>(type: "varchar(20)", unicode: false, maxLength: 20, nullable: true),
                    Persona_IdPersona2 = table.Column<int>(type: "int", nullable: false),
                    Status = table.Column<string>(type: "varchar(20)", unicode: false, maxLength: 20, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Usuarios", x => x.idUsuario);
                    table.ForeignKey(
                        name: "FK_Usuarios_Personas_Persona_IdPersona2",
                        column: x => x.Persona_IdPersona2,
                        principalTable: "Personas",
                        principalColumn: "idPersona",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "RolRolOpciones",
                columns: table => new
                {
                    Rol_idRol = table.Column<int>(type: "int", nullable: false),
                    RolOpciones_idOpciones = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RolRolOpciones", x => new { x.Rol_idRol, x.RolOpciones_idOpciones });
                    table.ForeignKey(
                        name: "FK_RolRolOpciones_RolOpciones_RolOpciones_idOpciones",
                        column: x => x.RolOpciones_idOpciones,
                        principalTable: "RolOpciones",
                        principalColumn: "idOpciones",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_RolRolOpciones_Roles_Rol_idRol",
                        column: x => x.Rol_idRol,
                        principalTable: "Roles",
                        principalColumn: "idRol",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "RolUsuarios",
                columns: table => new
                {
                    Rol_idRol = table.Column<int>(type: "int", nullable: false),
                    Usuarios_idUsuarios = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RolUsuarios", x => new { x.Rol_idRol, x.Usuarios_idUsuarios });
                    table.ForeignKey(
                        name: "FK_RolUsuarios_Roles_Rol_idRol",
                        column: x => x.Rol_idRol,
                        principalTable: "Roles",
                        principalColumn: "idRol",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_RolUsuarios_Usuarios_Usuarios_idUsuarios",
                        column: x => x.Usuarios_idUsuarios,
                        principalTable: "Usuarios",
                        principalColumn: "idUsuario",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Sessions",
                columns: table => new
                {
                    FechaIngreso = table.Column<DateTime>(type: "datetime2", nullable: false),
                    idPersona = table.Column<int>(type: "int", nullable: false),
                    FechaCierre = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Sessions", x => new { x.idPersona, x.FechaIngreso });
                    table.ForeignKey(
                        name: "FK_Sessions_Usuarios_idPersona",
                        column: x => x.idPersona,
                        principalTable: "Usuarios",
                        principalColumn: "idUsuario",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_RolRolOpciones_RolOpciones_idOpciones",
                table: "RolRolOpciones",
                column: "RolOpciones_idOpciones");

            migrationBuilder.CreateIndex(
                name: "IX_RolUsuarios_Usuarios_idUsuarios",
                table: "RolUsuarios",
                column: "Usuarios_idUsuarios");

            migrationBuilder.CreateIndex(
                name: "IX_Usuarios_Persona_IdPersona2",
                table: "Usuarios",
                column: "Persona_IdPersona2");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "RolRolOpciones");

            migrationBuilder.DropTable(
                name: "RolUsuarios");

            migrationBuilder.DropTable(
                name: "Sessions");

            migrationBuilder.DropTable(
                name: "RolOpciones");

            migrationBuilder.DropTable(
                name: "Roles");

            migrationBuilder.DropTable(
                name: "Usuarios");

            migrationBuilder.DropTable(
                name: "Personas");
        }
    }
}

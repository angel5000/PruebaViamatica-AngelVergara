using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PRU.Infrastructure.Persitences.Migrations
{
    /// <inheritdoc />
    public partial class tablaasignaroles : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AsignaRoles",
                columns: table => new
                {
                    IdUsuario = table.Column<int>(type: "int", nullable: false),
                    Opcion_IdOpcion = table.Column<int>(type: "int", nullable: false),
                    Activo = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AsignaRoles", x => new { x.IdUsuario, x.Opcion_IdOpcion });
                    table.ForeignKey(
                        name: "FK_AsignaRoles_RolOpciones_Opcion_IdOpcion",
                        column: x => x.Opcion_IdOpcion,
                        principalTable: "RolOpciones",
                        principalColumn: "idOpciones",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AsignaRoles_Usuarios_IdUsuario",
                        column: x => x.IdUsuario,
                        principalTable: "Usuarios",
                        principalColumn: "idUsuario",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AsignaRoles_Opcion_IdOpcion",
                table: "AsignaRoles",
                column: "Opcion_IdOpcion");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AsignaRoles");
        }
    }
}

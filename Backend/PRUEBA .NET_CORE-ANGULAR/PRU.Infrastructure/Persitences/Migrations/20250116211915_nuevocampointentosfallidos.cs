using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PRU.Infrastructure.Persitences.Migrations
{
    /// <inheritdoc />
    public partial class nuevocampointentosfallidos : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "IntentosFallidos",
                table: "Usuarios",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IntentosFallidos",
                table: "Usuarios");
        }
    }
}

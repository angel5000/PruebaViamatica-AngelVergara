using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PRU.Infrastructure.Persitences.Migrations
{
    /// <inheritdoc />
    public partial class Camposdesesion : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "SesionExitosa",
                table: "Sessions",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "SesionFallida",
                table: "Sessions",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SesionExitosa",
                table: "Sessions");

            migrationBuilder.DropColumn(
                name: "SesionFallida",
                table: "Sessions");
        }
    }
}

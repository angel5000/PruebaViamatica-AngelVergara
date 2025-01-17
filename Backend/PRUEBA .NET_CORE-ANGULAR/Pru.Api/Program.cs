using DocumentFormat.OpenXml.Office2016.Drawing.ChartDrawing;
using PRU.Application.Commons.Validations;
using PRU.Application.Extension;
using PRU.Application.Interfaces;
using PRU.Application.Services;
using PRU.Infrastructure.Extensions;

var builder = WebApplication.CreateBuilder(args);
var Configuration = builder.Configuration;
var Cors = "Cors";
builder.Services.AddInjectionInfrastructure(Configuration);
//builder.Services.AddInjectionApplication(Configuration);
// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddHttpContextAccessor();
builder.Services.AddScoped<Validaciones>();

builder.Services.AddScoped<IUsuariosApplication, UsuariosApplication>();
builder.Services.AddScoped<IAuth, Auth>();
builder.Services.AddCors(option =>
{
    option.AddPolicy(name: Cors, builder => { builder.WithOrigins("http://localhost:4200"); builder.AllowAnyMethod(); builder.AllowAnyHeader(); });
});
var app = builder.Build();
app.UseCors(Cors);
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseStaticFiles();
app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
public partial class Program
{ }
using Microsoft.AspNetCore.Http;
using OfficeOpenXml;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PRU.Infrastructure.FileExcel
{
    public class UploadExcel : IUploadExcel
    {
        public List<T> SubirExcel<T>(IFormFile file) where T : class, new()
        {
            ExcelPackage.LicenseContext = LicenseContext.NonCommercial;

            if (file == null || file.Length == 0)
            {
                throw new ArgumentException("Debe cargar un archivo válido.");
            }

            var extension = System.IO.Path.GetExtension(file.FileName).ToLower();
            if (extension != ".xlsx")
            {
                throw new ArgumentException("Formato de archivo no soportado. Use .xlsx.");
            }

            var entities = new List<T>();

            using (var stream = file.OpenReadStream())
            using (var package = new ExcelPackage(stream))
            {
                var worksheet = package.Workbook.Worksheets[0]; // Leer la primera hoja
                var rowCount = worksheet.Dimension.Rows;
                var colCount = worksheet.Dimension.Columns;

                for (int row = 2; row <= rowCount; row++) // Saltar la fila de encabezados
                {
                    var entity = new T();
                    bool isRowValid = true;

                    for (int col = 1; col <= colCount; col++)
                    {
                        var property = typeof(T).GetProperties()[col - 1]; // Mapear columna a propiedad
                        var cellValue = worksheet.Cells[row, col].Text;

                        // Verificar si la celda está vacía o contiene un valor nulo
                        if (string.IsNullOrEmpty(cellValue))
                        {
                            isRowValid = false; // Marcar la fila como inválida si encuentra un campo vacío
                            break; // Detener la iteración de columnas para esta fila
                        }

                        if (property.PropertyType == typeof(DateOnly?))
                        {
                            if (DateOnly.TryParse(cellValue, out var date))
                            {
                                property.SetValue(entity, date);
                            }
                            else
                            {
                                property.SetValue(entity, null); // Manejar valores no válidos
                            }
                        }
                        else
                        {
                            property.SetValue(entity, Convert.ChangeType(cellValue, property.PropertyType));
                        }
                    }

                    // Solo agregar a la lista si la fila es válida
                    if (isRowValid)
                    {
                        entities.Add(entity);
                    }
                }
            }

            return entities;
        }
    }
}

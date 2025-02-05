using Azure;
using DocumentFormat.OpenXml.Bibliography;
using Microsoft.AspNetCore.Http;
using PRU.Application.Commons.Bases.Response;
using PRU.Application.Dtos.Administrador.Usuarios;
using PRU.Application.Dtos.UsuarioGeneral.Request;
using PRU.Application.Dtos.Usuarios.Request;
using PRU.Application.Interfaces;
using PRU.Infrastructure.FileExcel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PRU.Application.Services
{
    public class RegisterbyExcelApplication: IRegisterbyExcelApplication
    {
        private readonly IUploadExcel upexcel;
        private readonly IAdministrador IAdminApplication;
        public RegisterbyExcelApplication(IUploadExcel upexcel, IAdministrador iAdminApplication)
        {


            this.upexcel = upexcel;
            IAdminApplication = iAdminApplication;
        }
      

        public async Task<BaseResponse<bool>> RegisterUserbyexcel(IFormFile archivo)
        {
            
            var usuarios = upexcel.SubirExcel<UsuarioRequest>(archivo);
            var response = new BaseResponse<bool>();
            foreach (var usuario in usuarios)
            {

                response= await IAdminApplication.RegisterUser(usuario);


            }
            return response;
        }
    }
}

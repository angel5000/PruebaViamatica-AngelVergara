﻿using Microsoft.AspNetCore.Http;
using PRU.Application.Commons.Bases.Response;
using PRU.Application.Dtos.Usuarios.Request;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PRU.Application.Interfaces
{
    public interface IRegisterbyExcelApplication
    {
        Task<BaseResponse<bool>> RegisterUserbyexcel(IFormFile archivo);



    }
}

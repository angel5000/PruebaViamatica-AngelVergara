﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FluentValidation.Results;

namespace PRU.Application.Commons.Bases.Response
{
    public class BaseResponse<T>
    {
        public bool IsSucces { get; set; }
        public T? Data { get; set; }
        public int TotalRecords { get; set; }
        public string? Message { get; set; }
        public object? AdditionalData { get; set; }
        public IEnumerable<ValidationFailure>? Errors { get; set; }



    }
}

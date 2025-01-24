using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PRU.Application.Commons.Bases.Request
{
   public class BaseFilterRequest:BasePaginationRequest
    {
  
        public int? NumFilter { get; set; } = null;
        public string? TextFilter { get; set; } = null;
        public string? StateFilter { get; set; } = null;
        public string? StartDate { get; set; } = null;
        public string? EndDate { get; set; } = null;

        
    }
    public class BaseFilterRequestDates : BasePaginationRequest
    {

  
        public string? StartDate { get; set; } = null;
        public string? EndDate { get; set; } = null;


    }
    public class BaseFilterRequestSimple : BasePaginationRequest
    {

        public int? NumFilter { get; set; } = null;
        public string? TextFilterSesion { get; set; } = null;
        public string? StateFilter { get; set; } = null;
        public string? StateFilterText { get; set; } = null;

    }
}

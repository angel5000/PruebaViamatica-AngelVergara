using PRU.Application.Commons.Bases.Request;
using PRU.Application.Commons.Bases.Response;
using PRU.Application.Dtos.Dashboard.Response;
using PRU.Application.Dtos.Sesiones.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PRU.Application.Interfaces
{
   public interface IDashboardApplication
    {
        Task<BaseResponse<IEnumerable<DashboardResponse>>> ListInfodashboard(int usuarioId, BaseFilterRequestSimple filters);
        Task<BaseResponse<IEnumerable<DashboardResponseResumen>>> InfoResumeDash();

    }
}

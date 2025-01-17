using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PRU.Infrastructure.Persitences.Interfaces
{
    public interface IUnitOfWork : IDisposable
    {
      //  IUserRepository user { get; }
        void SaveChange();
        Task SaveChangeAsyn();

        IDbTransaction BeginTransaction();

    }
}

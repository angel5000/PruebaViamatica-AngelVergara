using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Linq.Expressions;
using PRU.Domain.Entities;
namespace PRU.Infrastructure.Persitences.Interfaces
{
   public interface IGenericRepository<T> where T : BaseEntity
    {

        IQueryable<T> GetAllQueryable();
        Task<IEnumerable<T>> GetAllAsync();
        Task<IEnumerable<T>> GetSelectAsync();
        Task<T> GetByIdAsync(int id);
        Task<bool> RegisterAsync(T entity);
        Task<bool> EditAsync(T entity);
        Task<bool> RemoveAsync(int id);
        IQueryable<T> GetEntityQuery(Expression<Func<T, bool>>? filter = null);


    }
}

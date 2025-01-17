using Microsoft.EntityFrameworkCore;
using PRU.Domain.Entities;
using PRU.Infrastructure.Persitences.Interfaces;
using PRU.Infrastructure.Persitences.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using ClosedXML.Parser;
using PRU.Utilities.Static;

namespace PRU.Infrastructure.Persitences.Repositorio
{
    public class GenericRepository<T> : IGenericRepository<T> where T : BaseEntity
    {
        private readonly PruContext _context;


        private readonly DbSet<T> _entity;

        public GenericRepository(PruContext context)
        {
            _context = context;
            _entity = _context.Set<T>();
        }
        public Task<bool> EditAsync(T entity)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<T>> GetAllAsync()
        {
            var getall = await _entity.Where(x => x.State!.Equals(StateTypes.Active) && x.AuditDeleteUser == null && x.AuditDeleteDate == null)
              .AsNoTracking().ToListAsync();

            return getall;
        }

        public IQueryable<T> GetAllQueryable()
        {
            throw new NotImplementedException();
        }

        public async Task<T> GetByIdAsync(int id)
        {
            var getbyid = await _entity!.AsNoTracking().FirstOrDefaultAsync(x => x.Id.Equals(id));
            return getbyid!;

        }

        public IQueryable<T> GetEntityQuery(Expression<Func<T, bool>>? filter = null)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<T>> GetSelectAsync()
        {
            throw new NotImplementedException();
        }

        public async Task<bool> RegisterAsync(T entity)
        {
         //   entity.AuditCreateUser = 1;
            entity.AuditCreateDate = DateTime.Now;
            await _context.AddAsync(entity);
            var recordAffected = await _context.SaveChangesAsync();
            return recordAffected > 0;
        }

        public async Task<bool> RemoveAsync(int id)
        {
            T entity = await GetByIdAsync(id);
         //   entity!.AuditDeleteUser = 1;
         //   entity.AuditDeleteDate = DateTime.Now;
           // entity.State = "";
            _context.Update(entity);

            var recordAffected = await _context.SaveChangesAsync();
            return recordAffected > 0;
        }
    }
}

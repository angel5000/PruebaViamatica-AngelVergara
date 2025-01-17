using ClosedXML.Parser;
using Microsoft.EntityFrameworkCore.Storage;
using PRU.Infrastructure.Persitences.Context;
using PRU.Infrastructure.Persitences.Interfaces;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PRU.Infrastructure.Persitences.Repositorio
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly PruContext _context;
        public UnitOfWork(PruContext context)
        {
            _context = context;
           
        }
        public IDbTransaction BeginTransaction()
        {
            var transaction = _context.Database.BeginTransaction();
            return transaction.GetDbTransaction();



        }

        public void Dispose()
        {

            _context.Dispose();

        }

        public void SaveChange()
        {
            _context.SaveChanges();


        }

        public async Task SaveChangeAsyn()
        {
            await _context.SaveChangesAsync();

        }

    }
}

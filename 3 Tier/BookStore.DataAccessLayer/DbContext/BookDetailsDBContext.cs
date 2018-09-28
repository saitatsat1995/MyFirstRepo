using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BookStore.Entities;

namespace BookStore.DataAccessLayer.DbContext
{
    /// <summary>
    /// BookDetailsDbContext
    /// </summary>
   public class BookDetailsDBContext : System.Data.Entity.DbContext
    {
        /// <summary>
        /// constructor for class BookDetailsDbContext with base DbContext
        /// </summary>
        public BookDetailsDBContext() : base("name = BookStore")
        {

        }

        /// <summary>
        /// List of all Books
        /// </summary>
        public virtual DbSet<BookDetails> bookDetails { get; set; }
    }
}

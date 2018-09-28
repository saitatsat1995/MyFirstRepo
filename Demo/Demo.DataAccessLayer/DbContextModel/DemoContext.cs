using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;
using Demo.EntityLayer;

namespace Demo.DataAccessLayer.DbContextModel
{
    class DemoContext : DbContext
    {
        public DemoContext() : base("name = DemoConnection") {

        }

        public virtual DbSet<Book> Books { get; set; }
    }
}

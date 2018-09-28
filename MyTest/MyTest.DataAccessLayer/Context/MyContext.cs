using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;
using MyTest.EntityLayer;

namespace MyTest.DataAccessLayer.Context
{
    class MyContext : DbContext
    {
        public MyContext() : base("name=BookStoreConn")
        {

        }
        public virtual DbSet<book> Books { get; set; }
    }
}

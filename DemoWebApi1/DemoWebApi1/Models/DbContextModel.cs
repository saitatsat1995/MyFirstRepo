using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;

namespace DemoWebApi1.Models
{
    public class DbContextModel : DbContext
    {
        public DbContextModel() : base("name=MyBanda") {

        }

        public virtual DbSet<User> DbModels { get; set; }
    }
}
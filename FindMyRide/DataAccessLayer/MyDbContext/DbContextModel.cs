using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;
using EntityLayer;
namespace DataAccessLayer.MyDbContext
{
    public class DbContextModel : DbContext
    {
        public DbContextModel() : base("name=ModelConnection"){

        }

        public virtual DbSet<User> DbUserModel { get; set; }
    }
}

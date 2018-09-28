using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;
using TrackAllocation.EntityLayer;

namespace TrackAllocation.DataAccessLayer.MyDbContext
{
    class DbContextModel : DbContext
    {
        public DbContextModel() : base("name = MyConection") {

        }

        public virtual DbSet<locations> Locations {get; set;}
        public virtual DbSet<TrackDetails> TracksDetails { get; set; }
    }
}

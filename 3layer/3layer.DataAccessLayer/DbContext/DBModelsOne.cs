using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using _3layer.EntityLayer;
using System.Data.Entity;


namespace _3layer.DataAccessLayer.DbContext
{
   public  class DBModelsOne : System.Data.Entity.DbContext
    {
          public DBModelsOne() : base ("name=BookStoreConn")
        {

        }

        public virtual DbSet<BookDetails> BookDetails { get; set; }
         
    }
}

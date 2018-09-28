using MyTest.DataAccessLayer.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MyTest.EntityLayer;

namespace MyTest.DataAccessLayer
{
    public class TestManegerClass
    {
        MyContext con = new MyContext();

        public void saveBookDetails(book b) {
            this.con.Books.Add(b);
            this.con.SaveChanges();
        }
    }
}

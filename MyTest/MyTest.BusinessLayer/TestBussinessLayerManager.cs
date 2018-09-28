using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MyTest.DataAccessLayer;
using MyTest.EntityLayer;

namespace MyTest.BusinessLayer
{
    public class TestBussinessLayerManager
    {
        public TestManegerClass TMC = new TestManegerClass();

        public void insertBook(book b) {

            TMC.saveBookDetails(b);

        }
    }
}

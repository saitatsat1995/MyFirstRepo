using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Demo.DataAccessLayer;
using Demo.EntityLayer;
namespace Demo.BusinessLayer
{
    public class BussinessLayerManager
    {
        public DataAccessLayerManager DALM = new DataAccessLayerManager();

        public string storeBook_BAL(Book b) {
            string str = DALM.storeBook_DAL(b);
            return str;
        }

        public List<Book> GetBook_BAL() {
            return DALM.getBook_DAL();
        }

        public Book getBookById_BAL(int id) {
            return DALM.getBookByID_DAL(id);
        }

        public void upDateBookById(Book b) {
            DALM.upDateBookById_DAL(b);
        }

        public void deleteBookByID_BAL(int id) {
            DALM.deleteBookByID_DAL(id);
        }
    }
}

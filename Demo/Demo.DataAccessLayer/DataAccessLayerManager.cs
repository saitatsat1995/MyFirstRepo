using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Demo.DataAccessLayer.DbContextModel;
using Demo.EntityLayer;
namespace Demo.DataAccessLayer
{
    public class DataAccessLayerManager
    {
        DemoContext db = new DemoContext();

        public string storeBook_DAL(Book book) {
            string str = "";
            try
            {
                db.Books.Add(book);
                db.SaveChanges();
            }
            catch (Exception ex) {
                str = ex.Message;
            }
            return str;
        }

        public List<Book> getBook_DAL() {
            var list = db.Books.ToList();
            return list;
        }

        public Book getBookByID_DAL(int id) {

            Book b = new Book();
            b= db.Books.Where(x => x.id == id).FirstOrDefault();

            return b;
        }

        public void upDateBookById_DAL(Book b) {
            int id = b.id;
            Book b1 = db.Books.Where(x => x.id == id).FirstOrDefault();
            b1.name = b.name;
            db.SaveChanges();
        }

        public void deleteBookByID_DAL(int id) {
            Book b = db.Books.Where(x => x.id == id).FirstOrDefault();
            db.Books.Remove(b);
            db.SaveChanges();
        }
    }
}

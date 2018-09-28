using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BookStore.Entities;

namespace BookStore.DataAccessLayer
{
  public class BookDetailsSave
    {
        private readonly DbContext.BookDetailsDBContext dbContext = new DbContext.BookDetailsDBContext();

        public List<BookDetails> GetBookDetails()
        {
            List<BookDetails> details = new List<BookDetails>();
            try
            {
                details = dbContext.bookDetails.ToList<BookDetails>();
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex.Message);
            }

            return details;
        }
        public void SaveBookDetails(BookDetails bookDetails)
        {
            try
            {
                dbContext.bookDetails.Add(bookDetails);

                this.dbContext.SaveChanges();
            }

            catch(Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
        }
    }
}

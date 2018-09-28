using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BookStore.DataAccessLayer;
using BookStore.Entities;

namespace BookStore.BusinessLayer
{
    public class BookStoreManager
    {
        private readonly BookDetailsSave saveBookDetails = new BookDetailsSave();
        public void SaveBookDetail(BookDetails bookDetails)
        {
            
            saveBookDetails.SaveBookDetails(bookDetails);
        }

        public List<BookDetails> GetDetails()
        {
            return saveBookDetails.GetBookDetails();
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace BookStore.Entities
{
    [Table("tbBookDetails")]
    public class BookDetails
    {
        [Key]
        public int Book_ID { get; set; }

        [Required(AllowEmptyStrings = false, ErrorMessage = "Book name is Required")]
        public string Book_Title { get; set; }
        public string Author { get; set; }

        [Required(AllowEmptyStrings = false, ErrorMessage = "Location is Required")]
        public string Location { get; set; }
        public string Category { get; set; }
        public string Pages { get; set; }
        public string Tags { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace _3layer.EntityLayer
{
    [Table("tblBookStore")]
   public class BookDetails
    {


        
       
            [Key]


            public int Id { get; set; }
            public string Name { get; set; }
        
    }
}

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyTest.EntityLayer
{
    [Table("tblBook")]
    public class book
    {
        [Key]
        private int id;
        private int name;
        private string subject;
        private string location;

        public int Id { get => id; set => id = value; }
        public int Name { get => name; set => name = value; }
        public string Subject { get => subject; set => subject = value; }
        public string Location { get => location; set => location = value; }
    }
}

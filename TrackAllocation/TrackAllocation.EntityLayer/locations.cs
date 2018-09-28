using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TrackAllocation.EntityLayer
{
    [Table("tblLocation")]
    public class locations
    {
        [Key]
        private int id;
        private string locationName;

        public int Id { get => id; set => id = value; }
        public string LocationName { get => locationName; set => locationName = value; }
    }
}

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TrackAllocation.EntityLayer
{
    [Table("trackDetails")]
    public class TrackDetails
    {
        [Key]
        private int id;
        private int mid;
        private string location1;
        private string location2;
        private string location3;
        private string track;

        public int Id { get => id; set => id = value; }
        public int Mid { get => mid; set => mid = value; }
        public string Location1 { get => location1; set => location1 = value; }
        public string Location2 { get => location2; set => location2 = value; }
        public string Location3 { get => location3; set => location3 = value; }
        public string Track { get => track; set => track = value; }
    }
}

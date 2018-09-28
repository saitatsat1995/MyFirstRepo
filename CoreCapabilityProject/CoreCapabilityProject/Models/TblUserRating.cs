using System;
using System.Collections.Generic;

namespace CoreCapabilityProject.Models
{
    public partial class TblUserRating
    {
        public int Id { get; set; }
        public int GiverUserId { get; set; }
        public int ReciverUserId { get; set; }
        public int Rating { get; set; }
        public string Review { get; set; }
        public string Date { get; set; }
        public string Time { get; set; }
    }
}

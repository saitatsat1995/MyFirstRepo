using System;
using System.Collections.Generic;

namespace CoreCapabilityProject.Models
{
    public partial class TblVechileLog
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string VechileImage { get; set; }
        public string VechileRegNumber { get; set; }
        public string Company { get; set; }
        public string Model { get; set; }
        public int IsAc { get; set; }
        public int SeatCapacity { get; set; }
    }
}

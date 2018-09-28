using System;
using System.Collections.Generic;

namespace CoreCapabilityProject.Models
{
    public partial class TblRidersLog
    {
        public int Id { get; set; }
        public int RiderId { get; set; }
        public int RideLogId { get; set; }
        public string Status { get; set; }
        public string Remark { get; set; }
        public int Rating { get; set; }
        public string PriceToPay { get; set; }
    }
}

using System;
using System.Collections.Generic;

namespace CoreCapabilityProject.Models
{
    public partial class TblRideLog
    {
        public int Id { get; set; }
        public int RideHostId { get; set; }
        public string StartTime { get; set; }
        public string EndTime { get; set; }
        public string StartDate { get; set; }
        public string EndDate { get; set; }
        public int StartPointLocationId { get; set; }
        public int EndPointLocationId { get; set; }
        public double PriceForRide { get; set; }
        public int TotalSeatAvailable { get; set; }
        public int VacantSeats { get; set; }
        public string Status { get; set; }
    }
}

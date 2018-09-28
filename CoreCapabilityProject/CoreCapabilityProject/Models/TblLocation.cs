using System;
using System.Collections.Generic;

namespace CoreCapabilityProject.Models
{
    public partial class TblLocation
    {
        public int Id { get; set; }
        public string Pincode { get; set; }
        public string Area { get; set; }
        public string Town { get; set; }
        public string District { get; set; }
    }
}

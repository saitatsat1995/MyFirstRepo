using System;
using System.Collections.Generic;

namespace CoreCapabilityProject.Models
{
    public partial class TblRefferalCodeLog
    {
        public int Id { get; set; }
        public int ReffererId { get; set; }
        public string ReffererEmail { get; set; }
        public string RefferalCode { get; set; }
        public string RefferalEmail { get; set; }
    }
}

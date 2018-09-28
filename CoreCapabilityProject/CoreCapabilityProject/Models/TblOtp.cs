using System;
using System.Collections.Generic;

namespace CoreCapabilityProject.Models
{
    public partial class TblOtp
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string Email { get; set; }
        public string Otp { get; set; }
        public string Date { get; set; }
        public string Time { get; set; }
    }
}

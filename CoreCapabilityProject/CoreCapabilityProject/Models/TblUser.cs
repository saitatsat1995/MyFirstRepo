using System;
using System.Collections.Generic;

namespace CoreCapabilityProject.Models
{
    public partial class TblUser
    {
        public int Id { get; set; }
        public string Fname { get; set; }
        public string Lname { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Mobile { get; set; }
        public string Address { get; set; }
        public string Pincode { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Country { get; set; }
        public int IsVerified { get; set; }
        public string Dob { get; set; }
        public string Gender { get; set; }
        public string ProfilePic { get; set; }
        public string IdProof { get; set; }
        public int Rating { get; set; }
        public string Role { get; set; }
        public int Points { get; set; }
        public string LoginType { get; set; }
    }
}

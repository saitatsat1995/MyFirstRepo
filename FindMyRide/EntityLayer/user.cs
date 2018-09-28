using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntityLayer
{
    [Table("TblUser")]
    public class User
    {
        [Key]
        private int id;
        private string fname;
        private string lname;
        private string email;
        private string pass;
        private string mobile;
        private string address;
        private int pin;
        private string city;
        private string state;
        private string country;
        private int isVerified;
        private string dob;
        private string gender;
        private string profile_pic;
        private string id_proof;
        private int rating;
        private string role;

        public int Id { get => id; set => id = value; }
        public string Fname { get => fname; set => fname = value; }
        public string Lname { get => lname; set => lname = value; }
        public string Email { get => email; set => email = value; }
        public string Pass { get => pass; set => pass = value; }
        public string Mobile { get => mobile; set => mobile = value; }
        public string Address { get => address; set => address = value; }
        public int Pin { get => pin; set => pin = value; }
        public string City { get => city; set => city = value; }
        public string State { get => state; set => state = value; }
        public string Country { get => country; set => country = value; }
        public int IsVerified { get => isVerified; set => isVerified = value; }
        public string Dob { get => dob; set => dob = value; }
        public string Gender { get => gender; set => gender = value; }
        public string Profile_pic { get => profile_pic; set => profile_pic = value; }
        public string Id_proof { get => id_proof; set => id_proof = value; }
        public int Rating { get => rating; set => rating = value; }
        public string Role { get => role; set => role = value; }
    }
}

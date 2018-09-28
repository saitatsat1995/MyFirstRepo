using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace DemoWebApi1.Models
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
        private int num;
        private string address;
        private int pin;
        private string city;
        private string state;
        private string country;
        private int isVerified;
        private string dob;
        private string gender;

        public int Id { get => id; set => id = value; }
        public string Fname { get => fname; set => fname = value; }
        public string Lname { get => lname; set => lname = value; }
        public string Email { get => email; set => email = value; }
        public string Pass { get => pass; set => pass = value; }
        public int Num { get => num; set => num = value; }
        public string Address { get => address; set => address = value; }
        public int Pin { get => pin; set => pin = value; }
        public string City { get => city; set => city = value; }
        public string State { get => state; set => state = value; }
        public string Country { get => country; set => country = value; }
        public int IsVerified { get => isVerified; set => isVerified = value; }
        public string Dob { get => dob; set => dob = value; }
        public string Gender { get => gender; set => gender = value; }
    }
}
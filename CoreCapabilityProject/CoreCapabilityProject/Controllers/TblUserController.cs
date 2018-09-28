using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CoreCapabilityProject.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CoreCapabilityProject.Controllers
{
    [Produces("application/json")]
    [Route("api/TblUser")]
    public class TblUserController : Controller
    {
        [HttpGet]
        public IEnumerable<TblUser> Get()
        {
            var context = new Orchard5Context();
            var list = context.TblUser;
            return list;
        }

        // GET api/TblUser/5
        [HttpGet("{id}")]
        public TblUser Get(int id)
        {
            var context = new Orchard5Context();
            var list = context.TblUser.Where(x=>x.Id==id).FirstOrDefault();
            return list;
        }

        // POST api/TblUser
        [HttpPost]
        public void Post(TblUser user)
        {
            var context = new Orchard5Context();
            context.TblUser.Add(user);
            context.SaveChanges();
        }

        // PUT api/TblUser/5
        [HttpPut("{id}")]
        public void Put(int id, TblUser user)
        {
            var context = new Orchard5Context();
            var list = context.TblUser.Where(x => x.Id == id).FirstOrDefault();
            list.Fname = user.Fname;
            list.Lname = user.Lname;
            list.Email = user.Email;
            list.Password = user.Password;
            list.Mobile = user.Mobile;
            list.Address = user.Address;
            list.Pincode = user.Pincode;
            list.City = user.City;
            list.State = user.State;
            list.Country = user.Country;
            list.IsVerified = user.IsVerified;
            list.Dob = user.Dob;
            list.Gender = user.Gender;
            list.ProfilePic = user.ProfilePic;
            list.IdProof = user.IdProof;
            list.Rating = user.Rating;
            list.Role = user.Role;
            list.Points = user.Points;
            list.LoginType = user.LoginType;
            context.SaveChanges();
        }

        // DELETE api/TblUser/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            var context = new Orchard5Context();
            var user=context.TblUser.Where(x=>x.Id==id).FirstOrDefault();
            context.TblUser.Remove(user);
            context.SaveChanges();
        }
    }
}
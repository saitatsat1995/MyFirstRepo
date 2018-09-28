using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Web.Http;
using System.Web.Http.Description;
using DataAccessLayer.MyDbContext;
using EntityLayer;
using FindMyRide.Models;
using System.Collections;

namespace FindMyRide.Controllers
{
    public class UsersController : ApiController
    {
        private DbContextModel db = new DbContextModel();
        //public GMailer gMailer = new GMailer();

        // GET: api/Users
        public IQueryable<User> GetDbUserModel()
        {
            return db.DbUserModel;
        }

        // GET: api/Users/5
        [ResponseType(typeof(User))]
        public IHttpActionResult GetUser(int id)
        {
            User user = db.DbUserModel.Find(id);
            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        // PUT: api/Users/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutUser(int id, User user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != user.Id)
            {
                return BadRequest();
            }

            db.Entry(user).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Users
        [ResponseType(typeof(User))]
        public string PostUser(User user)
        {
            string sts = "";
            if (!ModelState.IsValid)
            {
                sts = "Invalid Details";
            }
            var email = user.Email;
            var num = db.DbUserModel.Where(x=>x.Email==email).Count();
            if (num > 0)
            {
                sts = "You have entered a regitered Email ID, Login to continue...";
                return sts;
            }
            else {
                db.DbUserModel.Add(user);
                db.SaveChanges();
                sts = "Successfully Registered...";
            }
            return sts;
        }

        // DELETE: api/Users/5
        [ResponseType(typeof(User))]
        public IHttpActionResult DeleteUser(int id)
        {
            User user = db.DbUserModel.Find(id);
            if (user == null)
            {
                return NotFound();
            }

            db.DbUserModel.Remove(user);
            db.SaveChanges();

            return Ok(user);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool UserExists(int id)
        {
            return db.DbUserModel.Count(e => e.Id == id) > 0;
        }
        [HttpGet]
        public ArrayList UserLogin(string UserEmail,string UserPass) {
            string str = "Error";
            ArrayList result = new ArrayList();
            int num=db.DbUserModel.Where(x => x.Email == UserEmail).Count();
            if (num > 0)
            {
                var details = db.DbUserModel.Where(x => x.Email == UserEmail).FirstOrDefault();
                if (details.Pass == UserPass)
                {
                    str = "Successfully Logged in....";
                    result.Add(str);
                    result.Add(details);
                }
                else {
                    str = "Invalid Password Entered....";
                    result.Add(str);
                }
            }
            else {
                str = "Email ID Is Not Registered...";
                result.Add(str);
            }
            return result;
        }

        [HttpGet]
        public User UserDetails(int UserId) {
            User u = new User();
            u= db.DbUserModel.Where(x=>x.Id==UserId).FirstOrDefault();
            return u;
        }
        [HttpPost]
        public int UserDetailsUpdate(User UserOBJ) {
            var db_user = db.DbUserModel.Where(x=>x.Id==UserOBJ.Id).FirstOrDefault();
            db_user.Fname = UserOBJ.Fname;
            db_user.Lname = UserOBJ.Lname;
            db_user.Mobile = UserOBJ.Mobile;
            db_user.Dob = UserOBJ.Dob;
            db_user.Gender = UserOBJ.Gender;
            db_user.Address = UserOBJ.Address;
            db_user.City = UserOBJ.City;
            db_user.State = UserOBJ.State;
            db_user.Country = UserOBJ.Country;
            db_user.Pin = UserOBJ.Pin;
            int flag=db.SaveChanges();
            return flag;
        }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using test.Models;

namespace test.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            if (Session["user_id"] != null) {
                return RedirectToAction("Account","Home");
            }
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        public ActionResult Login(string userEmail,string userPassword) {
            string test="";
            if (Session["user_id"] != null)
            {
                return RedirectToAction("Account","Home");
            }
            else
            {
                using (mvc_1Entities db = new mvc_1Entities())
                {
                    var userDetails = db.users.Where(x => x.email == userEmail && x.password == userPassword).FirstOrDefault();
                    if (userDetails != null)
                    {
                        test = "Successfully Logged in...";
                        ViewBag.status = test;
                        Session["user_id"] = userDetails.id;
                        return RedirectToAction("Account", "Home");
                    }
                    else
                    {
                        test = "Invalid Email ID or Password....";
                        ViewBag.status = test;
                    }
                }
            }
                return RedirectToAction("Index","Home");
        }

        public ActionResult Account() {
            int id = 0;
            if (Session["user_id"]!=null)
            {
                id = Convert.ToInt32(Session["user_id"]);
                using (mvc_1Entities db = new mvc_1Entities())
                {
                    var userDetails = db.users.Where(x => x.id == id).FirstOrDefault();
                    ViewBag.Id = Convert.ToInt32(userDetails.id);
                    ViewBag.userName = userDetails.userName;
                    ViewBag.email = userDetails.email;
                }
            }
            else {
                return RedirectToAction("Login","Home");
            }

            return View();
        }
        public ActionResult SignUp() {
            if (Session["user_id"] != null) {
                return RedirectToAction("Index","Home");
            }

            return View();
        }

        public ActionResult UserSignUp(string userName, string userEmail, string userPass1, string userPass2) {
            string test="";
            using (mvc_1Entities db = new mvc_1Entities())
            {
                var userDetails = db.users.Where(x => x.email == userEmail).FirstOrDefault();
                if (userDetails != null)
                {
                    test = "Email Exist..";
                }
                else if (userPass1 != userPass2)
                {
                    test = "Re-Enter the Passwoord...";
                }
                else {
                    user u = new user(userName,userPass1,userEmail);
                    db.users.Add(u);
                    db.SaveChanges();
                    return RedirectToAction("Index","Home");
                }
            }
            ViewBag.error = test;
            return View();
        }
        public ActionResult Logout() {
            Session["user_id"] = null;
            Session.Remove("user_id");
            ViewBag.status = "";
            Session.Clear();
            Session.Abandon();
            return RedirectToAction("Index","redirecter");
        }
    }
}
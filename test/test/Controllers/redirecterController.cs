using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace test.Controllers
{
    public class redirecterController : Controller
    {
        // GET: redirecter
        public ActionResult Index()
        {
            Session["user_id"] = null;
            Session.Remove("user_id");
            ViewBag.status = "";
            Session.Clear();
            Session.Abandon();
            return RedirectToAction("Index","Home");
        }
    }
}
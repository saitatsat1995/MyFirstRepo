using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MyTest.BusinessLayer;
using MyTest.EntityLayer;

namespace MyTest.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            book b = new book();
            b.Id = 1;
            b.Name = 1;
            TestBussinessLayerManager TBLM = new TestBussinessLayerManager();
            TBLM.insertBook(b);
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
    }
}
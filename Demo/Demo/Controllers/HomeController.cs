using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Demo.EntityLayer;
using Demo.BusinessLayer;

namespace Demo.Controllers
{
    public class HomeController : Controller
    {
        BussinessLayerManager BLM = new BussinessLayerManager();
        public ActionResult Index()
        {
            ViewBag.list = BLM.GetBook_BAL();
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

        public ActionResult storeData(string Dataname) {
            Book b = new Book();
            b.id = 1;
            b.name = Dataname;
            BLM.storeBook_BAL(b);
            return RedirectToAction("/Index");
        }

        public ActionResult Edit(int id) {
            ViewBag.bookData=BLM.getBookById_BAL(id);
            return View();
        }

        public ActionResult Edit_data(int id, string Dataname) {
            Book b = new Book();
            b.id = id;
            b.name = Dataname;
            BLM.upDateBookById(b);
            return RedirectToAction("/Index");
        }

        public ActionResult Delete(int id) {
            BLM.deleteBookByID_BAL(id);
            return RedirectToAction("/Index");
        }
    }
}
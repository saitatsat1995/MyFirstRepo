using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MyGadgetStore.Models;

namespace MyGadgetStore.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            using (MyGadgetStoreEntities db = new MyGadgetStoreEntities())
            {
                var list = db.gadgets.ToList();
                ViewBag.IMG = list;
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

        public ActionResult ADD() {

            return View();
        }

        public ActionResult Add_gadget(string name,string company,string category,int quantity,HttpPostedFileBase fileName) {
;            using (MyGadgetStoreEntities db = new MyGadgetStoreEntities())
            {
                if (Request.Files.Count > 0)
                {
                    var file = fileName;

                    if (file != null && file.ContentLength > 0)
                    {
                        var f = Path.GetFileName(file.FileName);
                        var path = Path.Combine(Server.MapPath("~/Content/images/"), f);
                        file.SaveAs(path);

                        gadget g = new gadget();
                        g.name = name;
                        g.company = company;
                        g.category = category;
                        g.quantity = quantity;
                        g.isFav = 0;
                        g.image = f;

                        db.gadgets.Add(g);
                        db.SaveChanges();
                        ViewBag.msg = "Product Successfully Added...";
                        ViewBag.page = "/Home/ALL";
                        return RedirectToAction("Message");
                    }
                }
            }
            ViewBag.msg = "Unable to process your request...";
            return RedirectToAction("Message");
        }
        public ActionResult Message()
        {
            return View();
        }

        public ActionResult ALL() {
            using (MyGadgetStoreEntities db = new MyGadgetStoreEntities()) {
                var list = db.gadgets.ToList();
                ViewBag.ALL = list;
            }
                return View();
        }
        public ActionResult Add_to_fav(int id)
        {
            using (MyGadgetStoreEntities db = new MyGadgetStoreEntities())
            {
                var list = db.gadgets.Where(x => x.id == id).FirstOrDefault();
                list.isFav = 1;
                db.SaveChanges();
            }
            return View();
        }
        public ActionResult Remove_to_fav(int id)
        {
            using (MyGadgetStoreEntities db = new MyGadgetStoreEntities())
            {
                var list = db.gadgets.Where(x => x.id == id).FirstOrDefault();
                list.isFav = 0;
                db.SaveChanges();
            }
            return View();
        }
        public ActionResult FAV()
        {
            using (MyGadgetStoreEntities db = new MyGadgetStoreEntities())
            {
                var list = db.gadgets.Where(x => x.isFav == 1).ToList();
                ViewBag.FavList = list;
            }
            return View();
        }

        public ActionResult Search(string query)
        {
            using (MyGadgetStoreEntities db = new MyGadgetStoreEntities())
            {
                var list = db.gadgets.Where(x => x.name.Contains(query)).ToList();
                ViewBag.SearchProduct = list;
            }
            return View();
        }
        public string Search_book_server(string val)
        {
            string str = "";
            using (MyGadgetStoreEntities db = new MyGadgetStoreEntities())
            {
                var list = db.gadgets.Where(x => x.name.Contains(val)).ToArray();
                foreach (var i in list)
                {
                    str = str + "<div class='w3-padding w3-border search_data w3-white' style='width:100%'>" + i.name+ "</div>";
                }

            }

            return str;
        }
    }
}
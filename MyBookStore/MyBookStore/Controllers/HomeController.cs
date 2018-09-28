using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using MyBookStore.Models;
using Newtonsoft;
using System.Data.Entity;

namespace MyBookStore.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
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

        public ActionResult Add() {

            return View();
        }

        public async Task<ActionResult> add_data(string book_title,string book_author,string book_location,string book_category,int book_pages,string book_tags, HttpPostedFileBase fileBase) {
            string str="";

            if (Request.Files.Count > 0)
            {
                var file = fileBase;

                if (file != null && file.ContentLength > 0)
                {
                    var fileName =Path.GetFileName(file.FileName);
                    var path = Path.Combine(Server.MapPath("~/Content/images/"), fileName);
                    file.SaveAs(path);
                    using (MyBookStoreEntities db = new MyBookStoreEntities())
                    {
                        book b = new book();
                        b.title = book_title;
                        b.author = book_author;
                        b.location = book_category;
                        b.pages = book_pages;
                        b.tags = book_tags;
                        b.img =fileName;

                        db.books.Add(b);
                        await db.SaveChangesAsync();

                        str = "Book Successfully Added...";
                    }
                }
                else
                {
                    str = "Empty File Selected...";
                }
            }
            else {
                str = "File Not Found..";
            }
            ViewBag.msg = str;
            return View();
        }

        public  async Task<string> Search_book_server(string val) {
            string str = "";
            using (MyBookStoreEntities db = new MyBookStoreEntities()) {
                var list = await db.books.Where(x => x.title.Contains(val)).ToArrayAsync();
                foreach (var i in list)
                {
                    str = str + "<div class='w3-padding w3-border search_data w3-white' style='width:100%'>" + i.title + "</div>";
                }
                
            }
           
            return str;
        }

        public async Task<ActionResult> Search(string query) {
            using (MyBookStoreEntities db = new MyBookStoreEntities())
            {
                var list = await db.books.Where(x => x.title.Contains(query)).ToListAsync();
                ViewBag.SearchProduct = list;
            }
                return View();
        }

        public async Task<ActionResult> Add_to_fav(int id) {
            using (MyBookStoreEntities db = new MyBookStoreEntities())
            {
                var list = await db.books.Where(x => x.id == id).FirstOrDefaultAsync();
                list.isFav = 1;
                db.SaveChanges();
            }
            return View();
        }

        public async Task<ActionResult> FAV() {
            using (MyBookStoreEntities db = new MyBookStoreEntities())
            {
                var list = await db.books.Where(x => x.isFav==1).ToListAsync();
                ViewBag.FavList = list;
            }
            return View();
        }

        public ActionResult ALL() {
            MyBookStoreEntities db = new MyBookStoreEntities();
            var list = db.books.ToList();
            ViewBag.ALL= list;
            return this.Json(list, JsonRequestBehavior.AllowGet);
        }

        public async Task<ActionResult> Remove_to_fav(int id)
        {
            using (MyBookStoreEntities db = new MyBookStoreEntities())
            {
                var list = await db.books.Where(x => x.id == id).FirstOrDefaultAsync();
                list.isFav = 0;
                await db.SaveChangesAsync();
            }
            return View();
        }
        public async Task<ActionResult> ALL_CHECKBOX() {
            using (MyBookStoreEntities db = new MyBookStoreEntities())
            {
                var list = await db.books.ToListAsync();
                ViewBag.ALL = list;
            }
            return View();
        }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using BookStore.Entities;
using BookStore.BusinessLayer;

namespace bookStore.Controllers
{
    public class BookStoreController : Controller
    {
       private readonly BookStoreManager bookStoreManager = new BookStoreManager();
        // GET: BookStore
        public ActionResult Index(BookDetails bookDetails)
        {
           
            List<BookDetails> bDetails = bookStoreManager.GetDetails();


            IEnumerable<BookDetails> details = bDetails.Cast<BookDetails>().Select(detail => detail);

            return View(details);
        }

        // GET: BookStore/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: BookStore/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: BookStore/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "Book_ID,Book_Title,Author,Location,Category,Pages,Tags")] BookDetails bookDetails)
        {

            
            // TODO: Add insert logic here
            if (ModelState.IsValid)
            {
                bookStoreManager.SaveBookDetail(bookDetails);
                return RedirectToAction("Index", bookDetails);
            }


            return View(bookDetails);

        }

        // GET: BookStore/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: BookStore/Edit/5
        [HttpPost]
        public ActionResult Edit(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add update logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        // GET: BookStore/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: BookStore/Delete/5
        [HttpPost]
        public ActionResult Delete(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add delete logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }
    }
}

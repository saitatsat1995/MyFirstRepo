using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using test.Models;

namespace test.Controllers
{
    public class EventsController : Controller
    {
        // GET: Events
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult Creat_Event() {
            if (Session["user_id"] != null)
            {
                
            }
            else {
                return RedirectToAction("Index", "Home");
            }
            return View();
        }

        public ActionResult server_data(string eventTitle,DateTime eventDate,int eventDuration,string eventDescription,string eventLocation,int eventIsPublic) {
            Event_Details e = new Event_Details();
            e.title = eventTitle;
            e.startDateTime = eventDate.ToString();
            e.duration = eventDuration.ToString();
            e.description = eventDescription;
            e.location = eventLocation;
            e.isPublic = eventIsPublic;
            e.user_id = Convert.ToInt32(Session["user_id"]);
            using (mvc_1Entities1 db = new mvc_1Entities1()) {
                db.Event_Details.Add(e);
                db.SaveChanges();
                ViewBag.Message = "Event Created Successfully";
            }
                return RedirectToAction("My_Events","Events");
        }

        public ActionResult My_Events() {
            if (Session["user_id"] == null) {
                return RedirectToAction("Index","Home");
            }
            using (mvc_1Entities1 db=new mvc_1Entities1()) {
                int id = Convert.ToInt32(Session["user_id"]);
                var data = db.Event_Details.Where(x => x.user_id ==id).ToList();
                ViewBag.EventDetails = data;
            }
            return View();
        }

        public ActionResult Edit(int Event_ID) {
            using (mvc_1Entities1 db = new mvc_1Entities1())
            {
                var data = db.Event_Details.Where(x => x.id == Event_ID).FirstOrDefault();
                ViewBag.EED= data;
            }
            return View();
        }

        public ActionResult Edit_server_data(int id, string eventTitle, DateTime eventDate, int eventDuration, string eventDescription, string eventLocation, int eventIsPublic) {
            using (mvc_1Entities1 db = new mvc_1Entities1())
            {
                var e = db.Event_Details.Find(id);
                e.id = id;
                e.title = eventTitle;
                e.startDateTime = eventDate.ToString();
                e.duration = eventDuration.ToString();
                e.description = eventDescription;
                e.location = eventLocation;
                e.isPublic = eventIsPublic;
                db.SaveChanges();
            }
            return RedirectToAction("My_Events","Events");
        }

        public ActionResult Delete(int Event_ID) {
            using (mvc_1Entities1 db = new mvc_1Entities1())
            {
                var e = db.Event_Details.Find(Event_ID);
                db.Event_Details.Remove(e);
                db.SaveChanges();
            }
            return RedirectToAction("My_Events","Events");
        }
    }
}
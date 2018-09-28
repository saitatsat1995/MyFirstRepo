using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using EntityAssignment.Models;

namespace EntityAssignment.Controllers
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

        public ActionResult ADD_TRACK() {

            return View();
        }

        public ActionResult add_track_server(int trackid,string trackName,string leadName,string room) {
            string str = "Successfully Completed...";
            using (EntityEntities db =new EntityEntities()) {
                track t = new track();
                t.Track_ID = trackid;
                t.Track_Name = trackName;
                t.LeadName = leadName;
                t.RoomAllocated = room;
                db.tracks.Add(t);
                db.SaveChanges();
                ViewBag.msg = "Track Added Successfully..";
                return RedirectToAction("/ALL_TRACKS");
            }
                return RedirectToAction("/ADD_TRACK");
        }

        public ActionResult ALL_TRACKS() {
            using (EntityEntities db =new EntityEntities()) {
                var list = db.tracks.ToList();
                ViewBag.trackList = list;
            }
                return View();
        }

        public ActionResult ADD_MIND() {
            using (EntityEntities db = new EntityEntities())
            {
                var list = db.tracks.ToList();
                ViewBag.trackList = list;
            }
            return View();
        }

        public ActionResult add_minds_server(int mid,string name,string gender,string ph,int trackId) {
            using (EntityEntities db = new EntityEntities()) {
                mind m = new mind();
                m.MID = mid;
                m.Name = name;
                m.Gender = gender;
                m.ContactNumber = ph.ToString();
                m.track_id = trackId;
                db.minds.Add(m);
                db.SaveChanges();
                return RedirectToAction("/ALL_MINDS");
            }
                return View();
        }

        public ActionResult ALL_MINDS() {
            using (EntityEntities db = new EntityEntities())
            {
                var list = db.minds.ToList();
                ViewBag.mindList = list;
            }
            return View();
        }

        public ActionResult EDIT_MINDS(int id) {
            using (EntityEntities db = new EntityEntities())
            {
                var list = db.minds.Where(x=>x.MID==id).FirstOrDefault();
                ViewBag.mind = list;
                var list1 = db.tracks.ToList();
                ViewBag.trackList = list1;
            }
            return View();
        }
        public ActionResult edit_minds_server(int mid, string name, string gender, string ph, int trackId) {
            using (EntityEntities db = new EntityEntities())
            {
                var list = db.minds.Where(x => x.MID == mid).FirstOrDefault();

                list.Name = name;
                list.Gender = gender;
                list.ContactNumber = ph;
                list.track_id = trackId;
                db.SaveChanges();
                return RedirectToAction("/ALL_MINDS");
            }
                return View();
        }

        public ActionResult MIND_DETAILS(int id) {
            using (EntityEntities db=new EntityEntities()) {
                var list = db.minds.Where(x => x.MID == id).FirstOrDefault();
                int track_id = Convert.ToInt32(list.track_id);
                var list1 = db.tracks.Where(x => x.Track_ID == track_id).FirstOrDefault();
                ViewBag.mindDetails = list;
                ViewBag.trackDetails=list1;
            }
            return View();
        }

        public ActionResult Delete(int id) {
            using (EntityEntities db = new EntityEntities())
            {
                var list = db.minds.Where(x => x.MID == id).FirstOrDefault();
                db.minds.Remove(list);
                db.SaveChanges();
                return RedirectToAction("/ALL_MINDS");
            }
                return View();
        }
    }
}
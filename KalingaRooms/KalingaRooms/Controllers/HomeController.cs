using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using KalingaRooms.Models;

namespace KalingaRooms.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            using (KalingaRoomsEntities db=new KalingaRoomsEntities()) {
                ViewBag.RoomCount = db.kalingaRooms.Count();
                ViewBag.MindCount = db.minds.Count();
                ViewBag.VRoom = db.kalingaRooms.Where(x => x.beds < 2).Count();
                var allocatedBed = db.minds.Where(x => x.room_id != null).Count();
                ViewBag.VBed = (ViewBag.RoomCount * 2) - allocatedBed;
                ViewBag.UMind = db.minds.Where(x => x.room_id == null).Count();
                ViewBag.ROOM = db.kalingaRooms.ToList();
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

        public ActionResult Add_User() {
            return View();
        }

        public ActionResult add_user_server(string mid, string name, string track, HttpPostedFileBase fileBase) {
            string str = " " + mid + " " + name + " " + track;
            using (KalingaRoomsEntities db = new KalingaRoomsEntities())
            {
                if (Request.Files.Count > 0)
                {
                    var file = fileBase;

                    if (file != null && file.ContentLength > 0)
                    {
                        var f = Path.GetFileName(file.FileName);
                        var path = Path.Combine(Server.MapPath("~/Content/images/"), f);
                        file.SaveAs(path);

                        mind m = new mind();
                        m.mid = mid;
                        m.name = name;
                        m.track = track;
                        m.img = f;

                        db.minds.Add(m);
                        db.SaveChanges();

                        ViewBag.msg = "Mind Added Successfully";
                        ViewBag.forward = "/Home/Mindes";
                        return View();
                    }
                    else {
                        ViewBag.msg = "Unable to Process Your Request...";
                    }
                }
            }
            return View();
        }

        public ActionResult msg() {

            return View();
        }

        public ActionResult Minds() {
            using (KalingaRoomsEntities db = new KalingaRoomsEntities())
            {
                var list = db.minds.ToList();
                ViewBag.MindList = list;
            }
            return View();
        }

        public ActionResult Rooms(){
            using (KalingaRoomsEntities db = new KalingaRoomsEntities())
            {
                var list = db.kalingaRooms.ToList();
                ViewBag.KalingaRooms = list;
            }
            return View();
        }

        public ActionResult add_room_server(string rid,string block,int floor_number)
        {
            string str = ""+rid+" "+block+" "+floor_number;
            using (KalingaRoomsEntities db=new KalingaRoomsEntities()) {
                kalingaRoom r = new kalingaRoom();
                r.room_id = rid;
                r.blook = block;
                r.floor = floor_number.ToString();
                r.beds = 0;
                db.kalingaRooms.Add(r);
                db.SaveChanges();
            }
            ViewBag.msg = "Room Successfully Added..";
            ViewBag.forward = "/Home/Rooms";
            return RedirectToAction("/Rooms");
        }

        public ActionResult assign_room(string id) {
            using (KalingaRoomsEntities db=new KalingaRoomsEntities()) {
                var list = db.minds.Where(x => x.room_id == null).ToList();
                ViewBag.assign_room = list;
                ViewBag.assign_room_id = id;
            }
                return View();
        }

        public ActionResult assign_room_to_minds(string room_id,string mind_id) {
            using (KalingaRoomsEntities db=new KalingaRoomsEntities()) {
                int id = Convert.ToInt32(mind_id);
                int rid = Convert.ToInt32(room_id);
                var list = db.minds.Where(x => x.id == id).FirstOrDefault();
                list.room_id = Convert.ToInt32(room_id);
                var list1 = db.kalingaRooms.Where(x => x.id == rid).FirstOrDefault();
                int bed = (int)list1.beds;
                list1.beds = bed + 1;
                db.SaveChanges();
                
            }
            return View();
        }

        public ActionResult edit_assign_room(string room_id) {
            int rid = Convert.ToInt32(room_id);
            using (KalingaRoomsEntities db=new KalingaRoomsEntities()) {
                var list = db.minds.Where(x => x.room_id == rid).ToList();
                int count = list.Count();
                ViewBag.mindList = list;
                ViewBag.roomDetails = db.kalingaRooms.Where(x => x.id == rid).FirstOrDefault();
            }
                return View();
        }

        public ActionResult remove_mind_from_room(string mind_id,string room_id) {
            int id = Convert.ToInt32(mind_id);
            int rid = Convert.ToInt32(room_id);
            using (KalingaRoomsEntities db=new KalingaRoomsEntities()) {
                var list = db.minds.Where(x => x.id == id).FirstOrDefault();
                list.room_id = null;
                var list1 = db.kalingaRooms.Where(x => x.id == rid).FirstOrDefault();
                int beds = (int)list1.beds;
                list1.beds = beds - 1;
                db.SaveChanges();
            }
            return RedirectToAction("/Rooms");
        }

        public ActionResult edit_room_details(int id,string rid,string block,int floor_number) {
            using (KalingaRoomsEntities db=new KalingaRoomsEntities()) {
                var list = db.kalingaRooms.Where(x => x.id == id).FirstOrDefault();
                list.room_id = rid;
                list.blook = block;
                list.floor = floor_number.ToString();
                db.SaveChanges();
                return RedirectToAction("/Rooms");
            }
                return View();
        }
    }
}
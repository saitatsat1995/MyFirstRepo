using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TrackAllocation.EntityLayer;
using TrackAllocation.BussinessLayer;

namespace TrackAllocation.Controllers
{
    public class HomeController : Controller
    {
        private BusinessLayerManager BLM = new BusinessLayerManager();
        public ActionResult Index()
        {
            ViewBag.LocationList = BLM.getgetAllLocationsBAL();
            ViewBag.Details = BLM.getAllPreferenceDetails_BAL();
            return View();
        }
        public ActionResult Add_preference(int mid,string location1, string location2, string location3,string track) {
            TrackDetails td = new TrackDetails();
            td.Mid = mid;
            td.Location1 = location1;
            td.Location2 = location2;
            td.Location3 = location3;
            td.Track = track;
            ViewBag.msg=BLM.Add_Preference_BAL(td);
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
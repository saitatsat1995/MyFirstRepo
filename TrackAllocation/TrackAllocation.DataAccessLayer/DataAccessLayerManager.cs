using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TrackAllocation.EntityLayer;
using TrackAllocation.DataAccessLayer.MyDbContext;

namespace TrackAllocation.DataAccessLayer
{
    public class DataAccessLayerManager
    {
        private DbContextModel db = new DbContextModel();
        public List<locations> getAllLocationsDAL() {
            var list = db.Locations.ToList();
            return list;
        }

        public void Add_Preference_dal(TrackDetails t){
            db.TracksDetails.Add(t);
            db.SaveChanges();
        }

        public List<List<string>> getAllPreferenceDetails_DAL() {
            List < List<string> > Data = new List< List<string> >();
            var list1 = db.TracksDetails.ToList();
            foreach (var i in list1) {
                List<string> temp = new List<string>();
                temp.Add((i.Mid).ToString());
                int l1 = Convert.ToInt32(i.Location1);
                int l2 = Convert.ToInt32(i.Location2);
                int l3 = Convert.ToInt32(i.Location3);
                var temp_l1 = db.Locations.Where(x => x.Id == l1).FirstOrDefault();
                var temp_l2 = db.Locations.Where(x => x.Id == l2).FirstOrDefault();
                var temp_l3 = db.Locations.Where(x => x.Id == l3).FirstOrDefault();
                temp.Add(temp_l1.LocationName);
                temp.Add(temp_l2.LocationName);
                temp.Add(temp_l3.LocationName);
                temp.Add(i.Track);
                Data.Add(temp);
            }
            return Data;
        }
    }
}

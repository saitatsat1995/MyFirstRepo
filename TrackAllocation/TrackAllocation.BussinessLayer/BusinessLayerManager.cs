using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TrackAllocation.DataAccessLayer;
using TrackAllocation.EntityLayer;

namespace TrackAllocation.BussinessLayer
{
    public class BusinessLayerManager
    {
        private DataAccessLayerManager DALM = new DataAccessLayerManager();

        public List<locations> getgetAllLocationsBAL() {
            return DALM.getAllLocationsDAL();
        }

        public string Add_Preference_BAL(TrackDetails t) {
            String msg = "";
            if (t.Location1 == t.Location2 || t.Location1 == t.Location3 || t.Location2 == t.Location3)
            {
                msg = "Please Select Atomic Prefrence Location...";
            }
            else {
                DALM.Add_Preference_dal(t);
                msg = "Track Added Successfully";
            }
            return msg;
        }

        public List<List<String>> getAllPreferenceDetails_BAL() {
            return DALM.getAllPreferenceDetails_DAL();
        }
    }
}

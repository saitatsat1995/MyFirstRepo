using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Data.SqlClient;

namespace IotFinalProject.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Title = "Home Page";

            return View();
        }

        public string AddDeviceServer(string deviceName,string deviceStatus,string deviceValue) {
            string status = "";
            string connString = null;
            SqlConnection conn;
            connString = "Data Source=G1C2ML14328;Initial Catalog=test;Integrated Security = true;";
            conn = new SqlConnection(connString);
            conn.Open();
            String query = "INSERT INTO DEviceLog (device_name,device_status,device_value) VALUES (@name,@status,@value)";

            using (SqlCommand command = new SqlCommand(query, conn))
            {
                command.Parameters.AddWithValue("@name", deviceName);
                command.Parameters.AddWithValue("@status", deviceStatus);
                command.Parameters.AddWithValue("@value", deviceValue);

                //conn.Open();
                int result = command.ExecuteNonQuery();

                // Check Error
                if (result < 0)
                    status = ("Error inserting data into Database!");
            }
            conn.Close();
            return "Sai";
        }
    }
}

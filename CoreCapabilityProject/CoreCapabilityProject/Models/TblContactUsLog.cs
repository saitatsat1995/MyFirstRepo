using System;
using System.Collections.Generic;

namespace CoreCapabilityProject.Models
{
    public partial class TblContactUsLog
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Number { get; set; }
        public string Msg { get; set; }
        public string Date { get; set; }
        public string Time { get; set; }
    }
}

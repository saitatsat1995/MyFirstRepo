//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace MyGadgetStore.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class gadget
    {
        public int id { get; set; }
        public string name { get; set; }
        public string company { get; set; }
        public string image { get; set; }
        public string category { get; set; }
        public Nullable<int> quantity { get; set; }
        public Nullable<int> isFav { get; set; }
    }
}

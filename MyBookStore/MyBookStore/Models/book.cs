//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace MyBookStore.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class book
    {
        public int id { get; set; }
        public string author { get; set; }
        public string location { get; set; }
        public string category { get; set; }
        public Nullable<int> pages { get; set; }
        public string tags { get; set; }
        public string title { get; set; }
        public string img { get; set; }
        public Nullable<int> isFav { get; set; }
    }
}

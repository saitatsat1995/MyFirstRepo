using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleApp2
{
    class parent {
        public void ParentMethod() {
            Console.WriteLine("I am the parent Class method");
        }
    }

    class child : parent {

        public void ParentMethod() {

        }
    }
    class Program
    {
        static void Main(string[] args)
        {
            child c = new child();
            c.ParentMethod();
            Console.ReadLine();
        }
    }
}

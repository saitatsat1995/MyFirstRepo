using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleApp1
{
    class clsStudent {
        public int[] s;
        public clsStudent() {
            s = new int[10];
        }

        public int this[int i] {
            get {
                return s[i];
            }
            set {
                s[i] = value;
            }
        }
    }
    class Program
    {
        static void Main(string[] args)
        {
            clsStudent a = new clsStudent();
            for (int i=0;i<a.s.Length;i++) {
                a[i] = int.Parse(Console.ReadLine());
            }
            for (int i = 0; i < a.s.Length; i++)
            {
                Console.WriteLine(a[i]);
            }
            Console.ReadLine();
        }
    }
}

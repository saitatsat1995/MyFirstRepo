using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.Support.UI;

namespace BookMyRideSelenium
{
    class Program
    {
        static void Main(string[] args)
        {
            IWebDriver dr = new ChromeDriver();
            dr.Navigate().GoToUrl("https://bookmyridedotnetangulardevjuly2018.azurewebsites.net/");
            dr.Manage().Window.Maximize();
            dr.Navigate().GoToUrl("https://bookmyridedotnetangulardevjuly2018.azurewebsites.net/#/User/Login");
            dr.FindElement(By.Name("user_email")).SendKeys("sai.mishra2@mindtree.com");
            dr.FindElement(By.Name("user_pass")).SendKeys("Sai@12345");
            dr.FindElement(By.XPath("//button[@class='w3-btn w3-blue w3-round w3-small']")).Click();
            Thread.Sleep(5000);
            dr.FindElement(By.XPath("//*[@id='mainBody']/app-account/div[1]/div[1]/div[2]/h6/button")).Click();
            dr.FindElement(By.Name("user_fname")).Clear();
            dr.FindElement(By.Name("user_fname")).SendKeys("Saitatsat");
            dr.FindElement(By.Name("user_lname")).Clear();
            dr.FindElement(By.Name("user_lname")).SendKeys("Mishra");
            Thread.Sleep(1000);
            dr.FindElement(By.Name("user_num")).Clear();
            dr.FindElement(By.Name("user_num")).SendKeys("8339829343");
            Thread.Sleep(1000);
            dr.FindElement(By.Name("user_dob")).SendKeys("08082000");
            Thread.Sleep(1000); 
            dr.FindElement(By.Name("user_address")).Clear();
            dr.FindElement(By.Name("user_address")).SendKeys("ITER College, Khandagiri");
            Thread.Sleep(1000);
            dr.FindElement(By.Name("user_city")).Clear();
            dr.FindElement(By.Name("user_city")).SendKeys("Bhubaneswar");
            Thread.Sleep(1000);
            dr.FindElement(By.Name("user_state")).Clear();
            dr.FindElement(By.Name("user_state")).SendKeys("Odisha");
            Thread.Sleep(1000);
            dr.FindElement(By.Name("user_pin")).Clear();
            dr.FindElement(By.Name("user_pin")).SendKeys("752034");
            dr.FindElement(By.XPath("//*[@id='collapseExample']/form/div[11]/button")).Click();
            Thread.Sleep(4000);
            dr.FindElement(By.XPath("//*[@id='mainBody']/app-account/div[1]/div[1]/div[2]/h6/button")).Click();
            Thread.Sleep(3000);
            dr.FindElement(By.XPath("//*[@id='mainBody']/app-account/div[1]/div[1]/div[3]/h6/button")).Click();
            Thread.Sleep(1000);
            dr.FindElement(By.Name("regNumber1")).Clear();
            dr.FindElement(By.Name("regNumber1")).SendKeys("OD02AB1234");
            Thread.Sleep(1000);
            dr.FindElement(By.Name("company1")).Clear();
            dr.FindElement(By.Name("company1")).SendKeys("Maruit");
            Thread.Sleep(1000);
            dr.FindElement(By.Name("model1")).Clear();
            dr.FindElement(By.Name("model1")).SendKeys("Swift Dzire");
            Thread.Sleep(1000);
            dr.FindElement(By.Name("seatCapacity1")).Clear();
            dr.FindElement(By.Name("seatCapacity1")).SendKeys("5");
            Thread.Sleep(1000);
            dr.FindElement(By.XPath("//*[@id='collapseExample1']/form/div[5]/select/option[1]")).Click();
            Thread.Sleep(1000);
            dr.FindElement(By.XPath("//*[@id='collapseExample1']/form/div[6]/button")).Click();
            Thread.Sleep(4000);
            dr.FindElement(By.XPath("//*[@id='mainBody']/app-account/div[1]/div[1]/div[3]/h6/button")).Click();
            Thread.Sleep(3000);

            dr.FindElement(By.XPath("//*[@id='mainBody']/app-account/div[1]/div[2]/div[1]/h6/button")).Click();
            Thread.Sleep(3000);
            dr.FindElement(By.XPath("//*[@id='mainBody']/app-account/div[1]/div[2]/div[1]/h6/button")).Click();
            Thread.Sleep(3000);

            dr.FindElement(By.XPath("//*[@id='mainBody']/app-account/div[1]/div[2]/div[2]/h6/button")).Click();
            Thread.Sleep(3000);
            dr.FindElement(By.XPath("//*[@id='mainBody']/app-account/div[1]/div[2]/div[2]/h6/button")).Click();
            Thread.Sleep(3000);

            dr.Close();
            dr.Quit();
        }
    }
}

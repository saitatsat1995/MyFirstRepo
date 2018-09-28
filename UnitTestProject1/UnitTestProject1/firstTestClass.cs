using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
namespace UnitTestProject1
{
    [TestClass]
    public class firstTestClass
    {
        [TestMethod]
        public void CheomeMethod()
        {
            IWebDriver driver = new ChromeDriver();
            driver.Navigate().GoToUrl("https://bookmyridedotnetangulardevjuly2018.azurewebsites.net/");
            driver.Manage().Window.Maximize();
            driver.Close();
            driver.Quit();
        }
    }
}

using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace B_IgnitedPostalCodeKata
{
    internal class Program
    {
        public static string sCurrentDirectory = AppDomain.CurrentDomain.BaseDirectory;
        public static string path = System.IO.Path.Combine(sCurrentDirectory, @"..\..\..\resource\postalcodes.txt");
        public static string sFilePath = Path.GetFullPath(path);
        

        static void Main(string[] args)
        {
            string menuChoice;
            do
            {
                Console.Clear();
                Console.WriteLine("Welcome to the PostalCode Kata");
                Console.WriteLine("--------------------------------");
                Console.Write("Please enter a postalcode: ");
                String postalCode = Console.ReadLine();
                PostalCodeSearch(postalCode);

                Console.Write("Do you wish to search for another postalcode? (y/n)");
                menuChoice = Console.ReadLine().ToUpper();
            } while (menuChoice == "Y");
            

        }
        public static void PostalCodeSearch(string postalCode)
        {
            List<string> result = new();

            Console.WriteLine("Postalcodes found:");
                foreach (char c in postalCode)
                {
                    foreach (var match in File.ReadLines(sFilePath)
                            .Select((text) => new { text })
                            .Where(x => x.text.Contains(c)))
                    {
                    result.Add(match.text);
                    }
                }
            result = result.OrderBy(b => b).Distinct(new FirstCharsComparer(4)).ToList();

                foreach (var item in result)
                {
                    Console.WriteLine(item);
                }
        }

        public class FirstCharsComparer : IEqualityComparer<string>
        {
            private int numChars;
            public FirstCharsComparer(int numChars)
            {
                this.numChars = numChars;
            }

            public bool Equals(string x, string y)
            {
                return x.Substring(0, numChars) == y.Substring(0, numChars);
            }

            public int GetHashCode(string obj)
            {
                return obj.Substring(0, numChars).GetHashCode();
            }
        }
    }
}

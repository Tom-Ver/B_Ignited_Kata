import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

import java.nio.file.Path;
import java.nio.file.Paths;

public class SeleniumKata {
    static String firstNameField = "//*[@id=\"firstName\"]";
    static String lastNameField = "//*[@id=\"lastName\"]";
    static String emailField = "//*[@id=\"userEmail\"]";
    static String genderField = "//*[@id=\"genterWrapper\"]/div[2]/div[1]";
    static String mobileField = "//*[@id=\"userNumber\"]";
    static String dateOfBirthField = "//*[@id=\"dateOfBirthInput\"]";
    static String subjectsField = "//*[@id=\"subjectsInput\"]";
    static String hobbiesField = "//*[@id=\"hobbiesWrapper\"]/div[2]/div[1]";
    static String addressField = "//*[@id=\"currentAddress\"]";
    static String stateField = "//*[@id=\"state\"]";
    static String cityField = "//*[@id=\"city\"]";
    static String submitBtn = "//*[@id=\"submit\"]";


    public static void main(String[] args) {

        WebDriverManager.chromedriver().setup();
        ChromeDriver driver = new ChromeDriver();

        DataGenerator generator = new DataGenerator();


        //Maximize window
        driver.manage().window().maximize();

        //Go to the correct website
        driver.get("https://demoqa.com/");

        //Navigate to the practice form
        driver.findElement(By.xpath("//*[@id=\"app\"]/div/div/div[2]/div/div[2]")).click();
        driver.findElement(By.xpath("//*[@id=\"app\"]/div/div/div[2]/div[1]/div/div/div[2]/div")).click();

        //Fill in the form
        driver.findElement(By.xpath(firstNameField)).sendKeys(generator.getFirstname()); //Firstname
        driver.findElement(By.xpath(lastNameField)).sendKeys(generator.getLastname()); //Name
        driver.findElement(By.xpath(emailField)).sendKeys(generator.getEmail()); //Email
        driver.findElement(By.xpath(genderField)).click(); //Gender
        driver.findElement(By.xpath(mobileField)).sendKeys(generator.getPhone()); //Phone
        driver.findElement(By.xpath(dateOfBirthField)).sendKeys(Keys.chord(Keys.CONTROL, "a"),"24 Jul 1991", Keys.ENTER);


        driver.findElement(By.xpath(subjectsField)).sendKeys("Hi"); //Subjects
        driver.findElement(By.xpath(subjectsField)).sendKeys(Keys.TAB); //Subjects
        driver.findElement(By.xpath(subjectsField)).sendKeys("Ac"); //Subjects
        driver.findElement(By.xpath(subjectsField)).sendKeys(Keys.ARROW_DOWN); //Subjects
        driver.findElement(By.xpath(subjectsField)).sendKeys(Keys.TAB); //Subjects
        driver.findElement(By.xpath(hobbiesField)).click(); //Hobbies

        Path path = Paths.get("src/person.jpg");
        WebElement chooseFile = driver.findElement(By.id("uploadPicture")); //Upload file
        chooseFile.sendKeys(path.toAbsolutePath().toString()); //Path to the file to upload here

        driver.findElement(By.xpath(addressField)).sendKeys(generator.getAddress()); //Current Address


        //driver.quit();

    }
}

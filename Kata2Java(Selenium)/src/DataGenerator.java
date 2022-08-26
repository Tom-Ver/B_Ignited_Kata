import java.util.Random;

public class DataGenerator {

    //---------------Variables-----------------------
    private static final Random RANDOM = new Random();
    private static final String[] FIRSTNAMES = {"Jolijn", "Helena", "Kaat", "Elisabeth", "Vanessa", "Louise", "Jolien", "Ann", "Sophie"};
    private static final String[] LASTNAMES = {"Peeters", "Janssens", "De Bolle", "Verschueren", "Tytgat", "Laermans", "Smets", "Verelst", "Langenakker"};
    private static final String[] EMAILPROVIDERS = {"@outlook.com", "@gmail.com", "@hotmail.com", "@live.be", "@icloud.com"};
    private static final String[] PHONENUMBERS = {"0985976542", "09875648321", "0123456789", "9876543210", "0895632145"};
    private static final String[] ADDRESSES = {"Grote Straat 32, 3000 Leuven", "A.NobelStr 4059 New York", "Teststraat 14 3500 Hasselt"};



    //Get a firstname
    public String getFirstname(){
        return FIRSTNAMES[RANDOM.nextInt(FIRSTNAMES.length)];
    }
    //Get a lastname
    public String getLastname(){
        return LASTNAMES[RANDOM.nextInt(LASTNAMES.length)];
    }
    //Get a email
    public String getEmail(){return getFirstname() + getLastname() + EMAILPROVIDERS[RANDOM.nextInt(EMAILPROVIDERS.length)];}
    //Get an address
    public String getAddress(){return ADDRESSES[RANDOM.nextInt(ADDRESSES.length)];}

    //Get a PhoneNumber
    public String getPhone(){
        return PHONENUMBERS[RANDOM.nextInt(PHONENUMBERS.length)];
    }

}

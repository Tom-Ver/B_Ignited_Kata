document.addEventListener('DOMContentLoaded', () => {

// Global variables
const submitButton = document.getElementById('submit');
const selectCountry = document.getElementById('countries');
const covidInfo = document.getElementById('covidInfo');
const vaccineInfo = document.getElementById('vaccineInfo');
const countries = []; //Array of all the countries with their population
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
let totalMonth;

//Get all the countries from the countries API and load them as objects into the countries array
getCountries(); //Get the countries from the api

submitButton.addEventListener("click", getCovidInfo);



//Get all countries from the api, store their population in the arraylist, call the addCountriesToSelect()
function getCountries(){
fetch('https://restcountries.com/v2/all?fields=name,population').then(res=> {
    return res.json()
}).then(data => {
    data.forEach(country => {
        let c = {
            "name": country.name,
            "population": country.population
        }
        countries.push(c);
    })
    addCountriesToSelect();
}).catch(err => {
    console.log(err);
})
}
function addCountriesToSelect(){
    let countriesOutput="";
    countries.forEach(c => {
        countriesOutput += `<option value="${c.name}">${c.name}</option>`;
    })
    selectCountry.innerHTML = countriesOutput;
}
//Get the date, format using formatSelectedDate(), get the name of the month in a string, call getTotalCasesByCountry...
function getCovidInfo() {
    totalMonth = 0;
    //Get the selected country
    var selectedCountryElement = document.querySelector("#countries");
    var selectedCountry = selectedCountryElement.value;
    //Get the months and format them in the correct pattern (YYYY-MM) for the api call
    const selectedMonth = document.getElementById("month").value;
    var month = new Date(selectedMonth);
    var selectedMonthAsDate = formatSelectedDate(new Date(month), 1);
    var untilDate = formatSelectedDate(new Date(month), 2);
    var monthAsString = monthNames[month.getMonth()];
    getTotalCasesByCountryInTimeRangeOneMonth(selectedCountry, selectedMonthAsDate, untilDate, monthAsString);
}
//API Call to get the covid cases in the chosen country and month
function getTotalCasesByCountryInTimeRangeOneMonth(selectedCountry,selectedMonthAsDate,untilDate, monthName){
    let count = 0;
    const apiUrl=   'https://api.covid19api.com/total/country/'+
                    selectedCountry +'/status/confirmed?from=' +
                    selectedMonthAsDate + '&to=' + untilDate;

    fetch(apiUrl).then(res=> {
        return res.json()
    }).then(covidData => {
        covidData.forEach(date => {
            totalMonth += date.Cases;
            count++;
        })
        let country = countries.find(x => x.name == selectedCountry); // Find the country in the array to get the population
        let deci = 100*((totalMonth/count)/country.population); // Calculate the average number of cases
        let percentage = parseInt(deci);
        covidInfo.innerHTML=    "Confirmed cases in " + 
                                monthName + " = " + percentage +
                                "% of the total population of " + selectedCountry +".";
        
    }).catch(err => {
        console.log(err);
    })
    getVaccineInfo(selectedCountry);
}
//Get the current vaccine info
async function getVaccineInfo(selectedCountry){
    if(selectedCountry == "Russian Federation"){selectedCountry = "Russia";}
    const apiUrl = 'https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/vaccinations/country_data/' + selectedCountry + '.csv';
    const csv = await fetch(apiUrl);
    const data = await csv.text(); 
    const rows = data.split('"').slice(1);
    var latest = rows[rows.length - 2];
    vaccineInfo.innerHTML="The vaccine currently used is " + latest;
    
}
//Format the dates for the api call
function formatSelectedDate(date, multi){
var selMonth = date.getMonth() + multi;
var selYear = date.getFullYear();
var formattedDate = selYear + "-" + selMonth;
return formattedDate;}
});


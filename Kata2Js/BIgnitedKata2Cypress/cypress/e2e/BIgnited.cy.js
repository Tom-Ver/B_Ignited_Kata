//Locationselectors
const fields = {
  FIRSTNAME: '//*[@id="firstName"]',
  LASTNAME: '//*[@id="lastName"]',
  EMAIL: '//*[@id="userEmail"]',
  GENDER: '//*[@id="genterWrapper"]/div[2]/div[1]/label',
  MOBILE: '//*[@id="userNumber"]',
  DATEOFBIRTH: '#dateOfBirth-wrapper',
  DATEPICKER: '.react-datepicker__day--024',
  SUBJECTS:'//*[@id="subjectsContainer"]/div/div[1]',
  HOBBIES: '//*[@id="hobbiesWrapper"]/div[2]/div[1]/label',
  UPLOADPICTURE: '//*[@id="uploadPicture"]',
  ADDRESS: '//*[@id="currentAddress"]',
  STATE: '//*[@id="state"]',
  CITY: '//*[@id="city"]',
  SUBMITBTN: '//*[@id="submit"]'
}

const PICTURE_TO_UPLOAD = 'person.jpg';

//The actual test
describe('BIgnited Test', () => {
  it('Fills in the demo form', () => {
    
    cy.visit('https://demoqa.com/')
    cy.contains('Forms').click()
    cy.contains('Practice Form').click()
    cy.xpath(fields.FIRSTNAME).type('James')
    cy.xpath(fields.LASTNAME).type('Smith')
    cy.xpath(fields.EMAIL).type('James_Smith@hotmail.com')
    cy.xpath(fields.GENDER).click({force: true})
    cy.xpath(fields.MOBILE).type('0143698754')
    cy.get(fields.DATEOFBIRTH).click()
    cy.get(fields.DATEPICKER).click()
    cy.xpath(fields.SUBJECTS).type('hi{enter}')
    cy.xpath(fields.HOBBIES).click({force: true})
    cy.xpath(fields.UPLOADPICTURE).attachFile(PICTURE_TO_UPLOAD)
    cy.xpath(fields.ADDRESS).type('7th street')
    cy.xpath(fields.STATE).type('nc{enter}')
    cy.xpath(fields.CITY).type('de{enter}')
    cy.xpath(fields.SUBMITBTN).click({force: true})


  })
})
function generateID(){
    return (Math.floor(Math.random() * 250000)).toString();
}

describe('test 1', ()=>{
    var ID = generateID()
    var email = 'QATEST' + ID +'@email.com'
    var pass = 'qaTest1!'
    before('visits the site', ()=>{
        cy.visit('/').wait(1000)
    })
    it('visits the site', () => {
        cy.url().should('contain','http://tww-website.s3-website-us-east-1.amazonaws.com/')
    })
    it('Verifies the ability to navigate to log in', () =>{
        cy.LogInButton().eq(0).should('exist')
        cy.LogInButton().eq(0).click()
        cy.url().should('contain','http://tww-website.s3-website-us-east-1.amazonaws.com/login/')
    })
    it("Verifies the ability to navigate to signup and verifies all fields are present" , () =>{
        cy.SignUpLink().click()
        cy.url().should('contain','http://tww-website.s3-website-us-east-1.amazonaws.com/signup/')
        cy.get('#firstName').should('exist')
        cy.get('#lastName').should('exist')
        cy.get('#state').should('exist')
        cy.get('#age').should('exist')
        cy.get('#email').should('exist')
        cy.get('#password').should('exist')
        cy.get('#passwordconfirmation').should('exist')
    })
    it('Signs up for an account',()=>{
        cy.get('#firstName').type('QA')
        cy.get('#lastName').type('TEST')
        cy.get('#state').type('CT')
        cy.get('#age').type('20')
        cy.get('#email').type(email)
        cy.get('#password').type(pass)
        cy.get('#passwordconfirmation').type(pass)
        cy.SignUpButton().click().wait(5000)
    })
    it('Signs in with previously created email and password, land on search page', ()=>{
        cy.get('#email').type(email)
        cy.get('#password').type(pass)
        cy.SignInButton().click().wait(3000)
        cy.url().should('contain','/search')
    })
    it('Verifies Ability to navigate to Home', ()=>{
        cy.HomeNav().click()
        cy.url().should('eq','http://tww-website.s3-website-us-east-1.amazonaws.com/')
    })
    it('verifies that the Make, Model, and Year dropdowns are enabled in the correct order', () =>{
        cy.SearchNav().click()
        cy.SelectMakeDropdown().should('be.enabled')
        cy.SelectModelDropdown().should('be.disabled')
        cy.SelectYearDropdown().should('be.disabled')
        cy.SelectMakeDropdown().click()
        cy.get('div').contains('Honda').click()
        cy.SelectModelDropdown().should('be.enabled')
        cy.SelectModelDropdown().type('civ')
        cy.selectOption('Civic').click()
        cy.SelectYearDropdown().should('be.enabled')
        cy.SelectYearDropdown().click()
        cy.selectOption('2000').click()
        cy.SubmitButton().click({force:true})
    })
    it('verifies that the page is populated with recall information, safety rating, and premium calculation.', ()=>{
        cy.xpath("//div[contains(text(),'Recall Information:')]").should('exist')
        cy.contains('2000').should('exist')
        cy.contains('Honda').should('exist')
        cy.contains('Civic').should('exist')
        cy.contains('Premium').should('exist')
    })
    
})
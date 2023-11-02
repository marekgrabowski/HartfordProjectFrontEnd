describe('test 1', ()=>{
    it('visits the site', () => {
        cy.visit('/').wait(1000)
        cy.url().should('contain','http://tww-website.s3-website-us-east-1.amazonaws.com/')
    })
    it('Verifies Search Button goes to Search Page', () =>{
        cy.GoToSearchButton().click()
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
        cy.xpath("//div[.='Civic']").click()
        cy.SelectYearDropdown().should('be.enabled')
        cy.SelectYearDropdown().click()
    })
})
//Template
Cypress.Commands.add("", ()=>{})


Cypress.Commands.add("GoToSearchButton", ()=>{
    cy.xpath("//a[.='Go to Search']")
})
Cypress.Commands.add("HomeNav", ()=>{
    cy.xpath("//nav/descendant::a[.='Home']")
})
Cypress.Commands.add("SearchNav", ()=>{
    cy.xpath("//nav/descendant::a[.='Search']")
})
Cypress.Commands.add("SelectMakeDropdown", ()=>{
    cy.xpath("//div[.='Select Make']/following-sibling::div/child::input")
})
Cypress.Commands.add("SelectModelDropdown", ()=>{
    cy.xpath("//div[.='Select Model']/following-sibling::div/child::input")
})
Cypress.Commands.add("SelectYearDropdown", ()=>{
    cy.xpath("//div[.='Select Year']/following-sibling::div/child::input")
})
Cypress.Commands.add("selectOption", (entry)=>{
    cy.xpath("//div[.='"+entry+"']")
})
Cypress.Commands.add("LogInButton", ()=>{
    cy.xpath("//a[@href='/login']")
})
Cypress.Commands.add("SignUpLink" , () => {
    cy.xpath("//a[@href='/signup']")
})
Cypress.Commands.add("SignUpButton", ()=>{
    cy.xpath("//button[.='Sign Up']")
})
Cypress.Commands.add("SignInButton", ()=>{
    cy.xpath("//button[.='Sign in']")
})


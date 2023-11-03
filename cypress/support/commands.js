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
    cy.xpath()
})
Cypress.Commands.add("", ()=>{})

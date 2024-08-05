const webAddress = 'https://sandbox-app.brighthr.com/login';
const username = 'gacaxak713@orsbap.com';
const password = 'A1234567890B';


function login()
// Login
{
  cy.visit(webAddress);
  cy.get('#email').type(username);
  cy.get('#password').type(password);
  cy.get('.flex-row > .rounded').click();
}

describe('Bright HR tests in page',() =>{ //the start of describe brackets
  //essentially "describe" wraps a series of "it"s and each "it" is a stand alone test :) 
  // so "describe" is often used for a "test suite"

  it('can login',() =>
    {
      login();
    })


  it('Navigate to Employee page',() =>
    {
    login();
    cy.get('[data-e2e="employees"]').click();
  })

  it('can fill new employee details and add another employee', () => {
    login();

    cy.get('[data-e2e="employees"]').click();
    cy.get('.my-6 > .rounded').click();


    const fillNewEmployee =(firstName,lastName) =>{

      cy.get('.rounded-t-lg > .text-lg').should("exist");
      cy.get('.rounded-t-lg > .text-lg').should('contain',('Add employee'));
      cy.get('#firstName').type (firstName);
      cy.get('#lastName').type (lastName);
      cy.get('#email').type ('shilpachinnari@yahoo.com');
      cy.get('#phoneNumber').type('07534567878');
      cy.get('[data-testid="input-selector"]').click();
      cy.get(':nth-child(3) > .DayPicker-Day--startOfWeek > .DayPicker-Day-Date > .DayPicker-Day-Circle > .DayPicker-Day-Number').click();
      cy.get('#jobTitle').type('QA');
      //cy.get('.sticky > .text-white').click();
      cy.get('form').submit();
      cy.wait(2000);
    }

    fillNewEmployee('Joe','aaaa');
      cy.get('button').contains('Add another employee').click();
      fillNewEmployee('Jane','aaab');
      cy.get('[aria-label="Close modal"]').click();
      //Employees exist on employee tab
      cy.get(':nth-child(1) > .h-full > .flex-col > .text-base').should('have.text', 'Joe aaaa');
      cy.get(':nth-child(2) > .h-full > .flex-col > .text-base').should('have.text', 'Jane aaab');

      const deleteFirstByName = (name) => 
        {
      
          cy.get(':nth-child(1) > .h-full > .flex-col > .text-base').should('contain', name);
          cy.get(':nth-child(1) > [data-testid="EditButton"] > .fill-current').click()
          cy.get('a').contains("Delete employee record").click();
          cy.get('[data-testid="deleteCheckBox"]').check({force:true});
          cy.get('button').contains("Delete " + name).click();
          cy.get('button').contains("Return to employee hub").click();
        }
        deleteFirstByName("Joe");

        deleteFirstByName("Jane");

  })



})  //the end of describe brackets




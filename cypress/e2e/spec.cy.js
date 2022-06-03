// I organize elemts as functions in separate files for admistrative purposes
const { Page } = require('./pageObjects')
const page = new Page()

describe('Take Home Project', () => {

  it('should navigate to Gala Games List Page', () => {
    cy.visit('https://app.gala.games/games')
    cy.title().should('eq', 'Gala Games')

    /*
      I spent an embarrassing amount of time trying to get passed the Usercentrics Consent Management overlay without success.
      I realize this most likely disqualifies me from being considered for this opportunity. I this is literally the first time in my 
      entire career of writing automation that I cannot interact with an element. I am stumped, disappointed in myself and insanely
      curious as to how your team is getting passed that overlay when executing automation. I tried a few approaches that I have 
      documented below.
    */

    /*
      Attempted to implement this - https://kittygiraudel.com/2020/03/15/preventing-cookie-banners-with-cypress/ - FAILED
    */
      

    /*
      The following Custom Cypress Command calls 'localStorage.setItem('uc_user_interaction', true)' in the hopes that the Local 
      Storage key "uc_user_interaction" would be set to "true" stopping the overlay from loading - FAILED
    */  
  // cy.UCInteraction()


    /*
      Attempted to set the Local Storage value in the test - FAILED
    */
  // localStorage.setItem('uc_user_interaction', 'true')

    /*
      Attempted to use the https://www.npmjs.com/package/cypress-localstorage-commands package - FAILED
    */
  // cy.setLocalStorage('uc_user_interaction', 'true')

    /*
      Various desperate attempts. There were a lot more locators in this section but I deleted them since 
      it's obvious I was flailing - FAILED
    */
  // cy.get('[data-testid="uc-overlay"]').children()
  // cy.get('[id="usercentrics-root"]').children()
  // cy.get('[class="sc-iwjdpV fXFHEI"]')
  // Cypress.$('[data-testid="uc-accept-all-button"]').trigger('click');
  // cy.get('[data-testid="uc-accept-all-button"]').click({force:true});

   /*
      Found another suggestion on Stack Overflow - FAILED
   */
  //   cy.visit('https://app.gala.games', {
  //     onBeforeLoad: function (window) {
  //         window.localStorage.setItem('uc_user_interaction', 'true');
  //     }
  // })
  })

  it('From the Games page I should not be able to launch Town Star without being logged in', () => {
    // I saw no reason to define all elements in the pageObject file since it's the same usage for all elements
    // I also define page specific functions in my page object files when applicable
    // This is definitely a result of my webdriver experience (POM)
    page.townStar().click()
    page.dialogText().should('contain', 'Create your Account')
    page.closeModal().click()
  })

  it('From the Store page Search for an item of your choice', () => {
    cy.visit('https://app.gala.games/store')
    cy.title().should('eq', 'Gala Games')
    cy.get('[data-testid="search-bar-input"]').type('Snoop\'s')
    cy.get('[data-testid="item-name"]').should('contain.text', 'Snoop\'s Bumpin\' Lowrider (Ancient)')
    cy.get('[data-testid="search-bar-input"]').clear()
  })

  it('From the Store page I should be able to filter Town Star items by Epic Rarity', () => {
    cy.get(':nth-child(1) > .v-expansion-panel-content > .v-expansion-panel-content__wrap > :nth-child(7) > .mb-0').click()
    cy.get(':nth-child(2) > .v-expansion-panel-content > .v-expansion-panel-content__wrap > :nth-child(4) > [data-testid="item-filter-checkbox"] > .v-icon').click()
    cy.get('.d-flex > .accentLight--text').should('have.text', '\n              Nothing to see here... please adjust your filters.\n            ')
    cy.contains('clear all').click()
  })

  it('From the Store page I should be able to filter Spider Tank items by Rare Rarity', () => {
    cy.get(':nth-child(1) > .v-expansion-panel-content > .v-expansion-panel-content__wrap > :nth-child(5) > .mb-0').click()
    cy.get(':nth-child(2) > .v-expansion-panel-content > .v-expansion-panel-content__wrap > :nth-child(3) > [data-testid="item-filter-checkbox"] > .v-icon').click()
    cy.get(':nth-child(2) > [data-testid="store-item"] > .accent > :nth-child(2) > .justify-space-between').should('have.text', '\n          Spider Tanks\n         ')
    cy.get(':nth-child(2) > [data-testid="store-item"] > .accent > [data-testid="item-name"]').should('contain', 'Rare')
  })

  /*
    All in all this was a great experience. I will say the test does execute if the overlay is interacted with. Again, 
    If you have the inclination I would love to know how your team is overcoming that overlay cause it really is driving me a bit nuts.
  */

})

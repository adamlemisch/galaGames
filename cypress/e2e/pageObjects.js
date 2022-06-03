export class Page {

    townStar = () => cy.get('.action-button-container > .gala-btn')
    dialogText = () =>  cy.get('.v-form > :nth-child(1) > .mt-10')
    closeModal = () => cy.get('.close-modal')

}
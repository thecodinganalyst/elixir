describe('Frame Test', () => {
  it('Loads the sample table when selected', () => {
    cy.visit('/')
    cy.get('.sidenav').contains('Sample Table 1').click()
    cy.get('.mat-sidenav-content').get('.elixir-table')
  })

  it('Loads the sample form when selected', () => {
    cy.visit('/')
    cy.get('.sidenav').contains('Sample Form 1').click()
    cy.get('.mat-sidenav-content').get('form')
  })
})

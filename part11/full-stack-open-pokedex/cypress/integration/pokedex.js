describe('Pokedex', function () {
  it(
    'front page can be opened',
    {
      defaultCommandTimeout: 15000,
    },
    function () {
      cy.visit('http://localhost:5000')
      cy.contains('ivysaur')
      cy.contains(
        'Pokémon and Pokémon character names are trademarks of Nintendo.'
      )
    }
  )

  it('a pokemon deck can be opened', () => {
    cy.visit('http://localhost:5000')
    cy.contains('ivysaur').click()
    cy.contains('overgrow')
    cy.contains('chlorophyll')
  })
})

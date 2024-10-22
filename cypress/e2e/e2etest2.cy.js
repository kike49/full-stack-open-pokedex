describe('Pokedex', function () {
  it('pokemon page can be opened', function () {
    cy.visit('localhost:5000/pokemon/ivysaur')
    cy.contains('chlorophyll')
    cy.contains(
      'Pokémon and Pokémon character names are trademarks of Nintendo.'
    )
  })
})

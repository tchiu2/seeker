describe('Search page', () => {
  beforeEach(() => {
    cy.visit('/');

    cy.get('input')
      .type('harry potter{enter}');
  });

  it('allows users to search for books and infinitely load results (via button click)', () => {
    cy.get('h2')
      .should('contain', 'Harry Potter');

    cy.scrollTo('bottom');

    cy.contains('Load more').click();

    cy.get('h2')
      .should('have.length.gte', 20);
  });

  it('displays a preview link on search results that opens in a new tab', () => {
    cy.contains('Preview')
      .should('have.attr', 'target', '_blank');
  });

  it('allows users to search by author via clicking on a name in a search result', () => {
    cy.contains('Rowling').click();

    cy.get('input')
      .should('not.have.value', 'harry potter')
      .invoke('val')
      .then(value => {
        expect(value).to.contain('Rowling');
        expect(value).to.contain('inauthor');
      });
  });
});

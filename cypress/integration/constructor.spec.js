describe('service is available', function () {
  it('should be available on localhost:3000', function () {
    cy.visit('http://localhost:3000');
  });
});

describe('app works correctly with burger constructor', function () {
  before(function () {
    cy.setCookie('token', 'testJWT');
    cy.setCookie('RefreshToken', 'testRefreshToken');
    cy.intercept('GET', 'https://norma.nomoreparties.space/api/ingredients', {
      fixture: 'ingredients.json',
    });
    cy.visit('http://localhost:3000');
  });

  it('should open constructor page by default', function () {
    cy.contains('Соберите бургер');
  });

  it('should load ingredients', function () {
    cy.get('[class^=ingredient-card_link__]').first().as('ingredient');
    cy.get('@ingredient').should('exist');
  });

  it('should open modal window with ingredient info', function () {
    cy.get('[class^=ingredient-card_link__]').first().as('ingredient');
    cy.get('@ingredient').click();

    cy.get('[class^=modal_root__]').first().as('modal');
    cy.get('@modal').should('exist');

    cy.get('@modal').should('contain', 'Краторная булка N-200i');

    cy.get('@modal').find('[class^=modal_close__]').click();
  });

  it('should drag bun to container', function () {
    cy.get('#bun').find('[class^=ingredient-card_link__]').first().as('bun');
    cy.get('[class^=burger-constructor_section__]')
      .find('div')
      .first()
      .as('constructor');

    cy.get('@bun').should('contain', 'Краторная булка N-200i');

    cy.get('@bun').trigger('dragstart');
    cy.get('@constructor').trigger('drop');
  });

  it('should drag sauce to container', function () {
    cy.get('#sauce')
      .find('[class^=ingredient-card_link__]')
      .first()
      .as('sauce');
    cy.get('[class^=burger-constructor_section__]')
      .find('div')
      .first()
      .as('constructor');

    cy.get('@sauce').should('contain', 'Соус Spicy-X');

    cy.get('@sauce').trigger('dragstart');
    cy.get('@constructor').trigger('drop');
  });

  it('should drag main course to container', function () {
    cy.get('#main').find('[class^=ingredient-card_link__]').first().as('main');
    cy.get('[class^=burger-constructor_section__]')
      .find('div')
      .first()
      .as('constructor');

    cy.get('@main').should('contain', 'Филе Люминесцентного тетраодонтимформа');

    cy.get('@main').trigger('dragstart');
    cy.get('@constructor').trigger('drop');
  });

  it("should change ingredients order by drag'n'drop", function () {
    cy.get('[class^=burger-constructor_scrollArea__]').as('scrollArea');
    cy.get('@scrollArea')
      .find('[class^=draggable-constructor-element_element__]')
      .first()
      .as('firstIngredient');
    cy.get('@firstIngredient').next().as('secondIngredient');

    cy.get('@firstIngredient').should('contain', 'Соус Spicy-X');
    cy.get('@secondIngredient').should(
      'contain',
      'Филе Люминесцентного тетраодонтимформа',
    );

    cy.get('@firstIngredient').trigger('dragstart');
    cy.get('@secondIngredient').trigger('dragenter').trigger('drop');

    cy.get('@scrollArea')
      .find('[class^=draggable-constructor-element_element__]')
      .first()
      .as('firstIngredientAfterRearrangement');
    cy.get('@firstIngredientAfterRearrangement')
      .next()
      .as('secondIngredientAfterRearrangement');

    cy.get('@secondIngredientAfterRearrangement').should(
      'contain',
      'Соус Spicy-X',
    );
    cy.get('@firstIngredientAfterRearrangement').should(
      'contain',
      'Филе Люминесцентного тетраодонтимформа',
    );
  });

  it('should delete ingredient from constructor', function () {
    cy.get('[class^=burger-constructor_scrollArea__]').as('scrollArea');
    cy.get('@scrollArea')
      .find('[class^=draggable-constructor-element_element__]')
      .first()
      .as('ingredient');

    cy.get('@ingredient').should(
      'contain',
      'Филе Люминесцентного тетраодонтимформа',
    );

    cy.get('@ingredient')
      .find('[class^=constructor-element__action]')
      .as('btn');
    cy.get('@btn').click();

    cy.get('@scrollArea')
      .find('[class^=draggable-constructor-element_element__]')
      .first()
      .as('ingredient');

    cy.get('@ingredient').should('contain', 'Соус Spicy-X');
  });

  it('should perform checkout and open modal window', function () {
    cy.intercept('POST', 'https://norma.nomoreparties.space/api/orders', {
      fixture: 'order.json',
    });
    cy.get('[class^=burger-constructor_total__]').first().as('total');
    cy.get('@total').find('button').click();

    cy.get('[class^=modal_root__]').first().as('modal');
    cy.get('@modal').should('exist');

    cy.get('@modal').should('contain', 'Ваш заказ начали готовить');
  });
});

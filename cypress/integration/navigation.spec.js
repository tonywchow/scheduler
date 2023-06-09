describe("Navigation", () => {
  it("should visit root", () => {
    cy.visit("/");
  });

  it("should navigate to Tuesday", () => {
    cy.visit("/");
    // Find the list item that has a descendent with the text content "Tuesday" and click
    cy.contains("[data-testid=day]", "Tuesday")
      .click()
      //Allows us to check that "Tuesday" list item has a particular off white background colour
      .should("have.class", "day-list__item--selected");
  });
});

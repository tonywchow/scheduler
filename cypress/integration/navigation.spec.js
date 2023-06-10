// beforeEach(() => {
//   cy.visit("/");
// });

describe("Navigation", () => {
  it("should visit root", () => {
    cy.visit("/");
  });

  it("should navigate to Tuesday", () => {
    cy.visit("/");
// Find the list item that has a descendent with the text content "Tuesday" and click
    cy.get("li").contains("Tuesday").click();
//Allows us to check that "Tuesday" list item has a particular off white background colour
    cy.contains("li", "Tuesday").should(
      "have.css",
      "background-color",
      "rgb(242, 242, 242)"
    );
  });
});

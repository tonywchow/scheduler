describe("Appointments", () => {
  beforeEach(() => {
    //Resets the database before each test
    cy.request("GET", "/api/debug/reset");
    //Visits the root server
    cy.visit("/");
    //Confirms that the DOM contains the text "Monday"
    cy.contains("Monday");
  });

  it("should book an interview", () => {
    cy.get("[alt=Add]").first().click();

    cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones");
    cy.get("[alt='Sylvia Palmer']").click();
    //Since there is no testid or alt attribute on the save button, we will use the text content
    cy.contains(/save/i).click();
    //Assertion to confirm the SHOW component is displaying the student and interview names
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });

  it("should edit an interview", () => {
    //Since edit button is only revealed when we hover over the appointment, we need to force the action and disable the "waiting for actionability"
    cy.get("[alt=Edit]").first().click({ force: true });

    cy.get("[data-testid=student-name-input]").clear().type("Billy Bob");
    cy.get('[alt="Tori Malcolm"]').click();

    cy.contains(/save/i).click();

    cy.contains(".appointment__card--show", "Billy Bob");
    cy.contains(".appointment__card--show", "Tori Malcolm");
  });

  it("should cancel an interview", () => {
    cy.get("[alt=Delete]").click({ force: true });
    cy.contains(/confirm/i).click();
    //Confirming the deletion of the appointment
    cy.contains(/deleting/i).should("exist");
    cy.contains(/deleting/i).should("not.exist");

    cy.contains(".appointment__card--show", "Archie Cohen").should("not.exist");
  });
});

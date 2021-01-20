/// <reference types="Cypress" />

describe("Na simulação", () => {
  let setOrigin;
  let setDestiny;
  let setPlan;
  let setTime;

  let expectPlanDescription;
  let expectValueWithPlan;
  let expectValueWithoutPlan;

  before(() => {
    setOrigin = (value) => {
      cy.get(
        "[data-cy=origin] > po-field-container > .po-field-container > .po-field-container-content > .po-input"
      ).type(`${value}{enter}`);
    };
    setDestiny = (value) => {
      cy.get(
        "[data-cy=destiny] > po-field-container > .po-field-container > .po-field-container-content > .po-input"
      ).type(`${value}{enter}`);
    };
    setPlan = (value) => {
      cy.get(
        "[data-cy=plan] > po-field-container > .po-field-container > .po-field-container-content > .po-input"
      ).type(`${value}{enter}`);
    };
    setTime = (value) => {
      cy.get(
        "[data-cy=time] > po-field-container > .po-field-container > .po-field-container-content > .po-input"
      ).type(`${value}{enter}`);
    };

    expectPlanDescription = (expectation) => {
      cy.get("[data-cy=planDescription]").should("contain.text", expectation);
    };

    expectValueWithPlan = (expectation) => {
      cy.get("[data-cy=valueWithPlan]").should("contain.text", expectation);
    };

    expectValueWithoutPlan = (expectation) => {
      cy.get("[data-cy=valueWithoutPlan]").should("contain.text", expectation);
    };
  });

  it("Origin:011 Destiny:016 Time:20 Plan:ConverseMuito 30", () => {
    cy.visit("http://localhost:4200/");

    setOrigin("São Paulo - 011");
    setDestiny("Ribeirão Preto - 016");
    setPlan("ConverseMuito 30");
    setTime(20);
    expectPlanDescription("ConverseMuito 30");
    expectValueWithPlan("$0.00");
    expectValueWithoutPlan("$38.00");
  });

  it("Origin:011 Destiny:017 Time:80 Plan:ConverseMuito 60", () => {
    cy.visit("http://localhost:4200/");

    setOrigin("São Paulo - 011");
    setDestiny("São José do Rio Preto - 017");
    setPlan("ConverseMuito 60");
    setTime(80);
    expectPlanDescription("ConverseMuito 60");
    expectValueWithPlan("$37.40");
    expectValueWithoutPlan("$136.00");
  });

  it("Origin:018 Destiny:011 Time:200 Plan:ConverseMuito 120", () => {
    cy.visit("http://localhost:4200/");

    setOrigin("Presidente Prudente - 018");
    setDestiny("São Paulo - 011");
    setPlan("ConverseMuito 120");
    setTime(200);
    expectPlanDescription("ConverseMuito 120");
    expectValueWithPlan("$167.20");
    expectValueWithoutPlan("$380.00");
  });

  it("Origin:018 Destiny:017 Time:100 Plan:ConverseMuito 30", () => {
    cy.visit("http://localhost:4200/");

    setOrigin("Presidente Prudente - 018");
    setDestiny("São José do Rio Preto - 017");
    setPlan("ConverseMuito 30");
    setTime(100);
    expectPlanDescription("ConverseMuito 30");
    expectValueWithPlan("$0.00");
    expectValueWithoutPlan("$0.00");
  });
});

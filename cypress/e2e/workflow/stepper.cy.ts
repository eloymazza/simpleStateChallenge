/// <reference types="cypress" />

describe("New Stepper workflow", () => {
  it("should login successfully", () => {
    cy.visit("http://localhost:5173/");

    // Login page
    cy.get("[data-testid='email-input']").type("example@email.com");
    cy.get("[data-testid='password-input']").type("password123");
    cy.get("[data-testid='login-button']").click();

    // New Investment
    cy.get("[data-testid='investment-type-container'] > div")
      .should("be.visible")
      .click();
    cy.contains("Retiro Flex").click();

    cy.get("[data-testid='currency-container'] > div")
      .should("be.visible")
      .click();

    // Select usd from dropwdown
    cy.contains("USD").click();

    cy.get("[data-testid='amount']").type("1000");
    cy.get("[data-testid='continue-button']").click();

    // Simulate investment Step loaded
    cy.contains("Total de la inversión");

    cy.wait(1000);

    // Continue to next step
    cy.get("[data-testid='continue-button']").click();

    // Payment Step
    cy.get("#termsAndConditions").check();
    // Load Receiptment
    cy.get("#fileInput").attachFile("receipt.jpg");

    cy.get("[data-testid='finish-button']").click();

    // Modal loaded
    cy.contains("Ya registramos tu inversión");
    cy.get("[data-testid='exit-button']").click();
  });
});

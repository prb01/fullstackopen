describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset")
    cy.request("POST", "http://localhost:3003/api/users", {
      name: "test password",
      username: "test",
      password: "password",
    })
    cy.visit("http://localhost:3000")
  })

  it("login form is shown", function () {
    cy.contains("Username")
    cy.contains("Password")
  })

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#username").type("test")
      cy.get("#password").type("password")
      cy.contains("Login").click()

      cy.contains("logged in")
      cy.contains("logout")
      cy.get(".info").should("have.css", "color", "rgb(47, 157, 98)")
    })

    it("fails with incorrect credentials", function () {
      cy.get("#username").type("test")
      cy.get("#password").type("wrong")
      cy.contains("Login").click()

      cy.get("html").should("not.contain", "logged in")
      cy.get(".error").should("have.css", "color", "rgb(186, 59, 69)")
    })
  })
})

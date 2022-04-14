describe("Note app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/api/testing/reset")
    const user = {
      name: "root sekret",
      username: "root",
      password: "sekret",
    }
    cy.request("POST", "http://localhost:3001/api/users/", user)
    cy.visit("http://localhost:3000")
  })

  it("front page can be opened", function () {
    cy.contains("Notes")
    cy.contains("Note app, made by PRB01")
  })

  it("login form can be opened", function () {
    cy.contains("login").click()
  })

  it("user can login", function () {
    cy.contains("login").click()
    cy.get("#username").type("root")
    cy.get("#password").type("sekret")
    cy.get("#login-button").click()

    cy.contains("logged in")
  })

  describe("when logged in", function () {
    beforeEach(function () {
      cy.login({ username: "root", password: "sekret" })
      cy.visit("http://localhost:3000")
    })

    it("a new note can be created", function () {
      cy.contains("new note").click()
      cy.get("#note-content").type("a note created by cypress")
      cy.contains("Save").click()
      cy.contains("a note created by cypress")
    })

    describe("and several notes exist", function () {
      beforeEach(function () {
        cy.createNote({content: "first note", important: false})
        cy.createNote({content: "second note", important: false})
        cy.createNote({content: "third note", important: false})
      })

      it("one of those can be made important", function () {
        cy.contains("first note").parent().find("button").as("importantButton")
        cy.get("@importantButton").click()
        cy.get("@importantButton").contains("make not important")
      })

      it("then example", function () {
        cy.get("button").then((buttons) => {
          console.log("number of buttons", buttons.length)
          cy.wrap(buttons[0]).click()
        })
      })
    })
  })

  it("login fails with wrong password", function () {
    cy.contains("login").click()
    cy.get("#username").type("root")
    cy.get("#password").type("incorrect")
    cy.get("#login-button").click()

    cy.get(".error").contains("Incorrect credentials")
    cy.get(".error")
      .should("have.css", "color", "rgb(255, 0, 0)")
      .and("have.css", "border-style", "solid")

    cy.get("html").should("not.contain", "logged in")
  })
})

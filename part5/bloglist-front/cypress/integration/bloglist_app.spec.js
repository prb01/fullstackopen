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

  describe("When logged in", function () {
    beforeEach(function () {
      cy.login({ username: "test", password: "password" })
    })

    it("A blog can be created", function () {
      const title = "test blog title"
      const author = "Blog Bloggy"
      const url = "http://www.blog.com"

      cy.contains("add blog").click()
      cy.get("#title").type(title)
      cy.get("#author").type(author)
      cy.get("#url").type(url)
      cy.contains("Submit").click()

      cy.contains(`${title} by ${author}`)
      cy.get(".info").contains("added")
    })

    describe("When there are several blogs", function () {
      beforeEach(function () {
        cy.createBlog({
          title: "blog 1",
          author: "1st blogger",
          url: "http://www.blog1.com",
        })

        cy.createBlog({
          title: "blog 2",
          author: "2nd blogger",
          url: "http://www.blog2.com",
        })

        cy.createBlog({
          title: "blog 3",
          author: "3rd blogger",
          url: "http://www.blog3.com",
        })
      })
    
      it.only("A blog can be liked", function () {
        cy.contains("blog 1").parent().find("button").as("viewButton")
        cy.get("@viewButton").click()

        //No likes beforehand
        cy.contains("likes").contains("0")

        //Like increases by 1 when like button is clicked
        cy.contains("like").click()
        cy.contains("likes").contains("1")
      })
    })


  })
})

describe("To-Do App", () => {
  
    beforeEach(() => {
      cy.visit("http://localhost:3000"); // Change if deployed
    });
  
    it("adds a new task", () => {
      cy.get("input[placeholder='Enter task']").type("Cypress Test Task");
      cy.contains("Add Task").click();
      cy.contains("Cypress Test Task").should("exist");
    });
  
    it("marks a task as completed", () => {
      cy.get("input[placeholder='Enter task']").type("Complete Me");
      cy.contains("Add Task").click();
  
      cy.get("input[type='checkbox']").first().click();
      cy.contains("Complete Me").should("have.class", "line-through");
    });
  
    it("sets a due date for a task", () => {
      cy.get("input[placeholder='Enter task']").type("Task with Date");
      cy.get("input[type='date']").type("2025-01-22");
      cy.contains("Add Task").click();
      cy.contains("2025-01-22").should("exist");
    });
  
    it("sets priority for a task", () => {
      cy.get("input[placeholder='Enter task']").type("High Priority Task");
      cy.get("select").select("High");
      cy.contains("Add Task").click();
      cy.contains("High").should("exist");
    });
  
    it("deletes a task", () => {
      cy.get("input[placeholder='Enter task']").type("Delete Me");
      cy.contains("Add Task").click();
      
      cy.contains("❌").click();
      cy.contains("Delete Me").should("not.exist");
    });
  
    it("clears all tasks", () => {
      cy.get("input[placeholder='Enter task']").type("Task 1");
      cy.contains("Add Task").click();
      cy.get("input[placeholder='Enter task']").type("Task 2");
      cy.contains("Add Task").click();
  
      cy.contains("Clear All Tasks").click();
      cy.get("ul").should("not.exist");
    });
  
  });
  
import { Given, Then, When } from "@cucumber/cucumber";
import AddEmployeePage from "../../pages/AddEmployeePage";

let addEmp: AddEmployeePage;

Given('user is on dashboard', async function () {
  addEmp = new AddEmployeePage(this.page);
});

When('user clicks on PIM module', { timeout: 20000 }, async function () {
  await addEmp.clickPIM();
});

When('user clicks on add employee button', async function () {
  await addEmp.clickaddEmployee();
});

When('user enters employee details', async function () {
  await addEmp.addEmployeeDetails("bala", "tripura");
});

When('user clicks on save button', async function () {
  await addEmp.clickSaveBtn();
});

Then('user should see add employee form', { timeout: 20000 }, async function () {

  await this.page.waitForSelector("h6:has-text('PIM')", {
    timeout: 20000
  });

});
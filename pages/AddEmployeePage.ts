import selectors from "../test-data/selectors.json";
import BasePage from "./BasePage";

export default class AddEmployeePage extends BasePage {

  async clickPIM() {
    await this.page.waitForSelector(selectors.PIM.pimMenu, { timeout: 20000 });
    await this.click(selectors.PIM.pimMenu);
  }

  async clickaddEmployee() {
    await this.page.waitForSelector(selectors.PIM.addEmployee, { timeout: 20000 });
    await this.click(selectors.PIM.addEmployee);
  }

  async addEmployeeDetails(firstname: string, lastname: string) {
    await this.page.waitForSelector(selectors.PIM.firstName, { timeout: 20000 });
    await this.fill(selectors.PIM.firstName, firstname);
    await this.fill(selectors.PIM.lastName, lastname);
  }

  async clickSaveBtn() {
    await this.click(selectors.PIM.saveBtn);
  }
}
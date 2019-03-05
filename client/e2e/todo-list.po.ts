import {browser, element, by, promise, ElementFinder} from 'protractor';
import {Key} from 'selenium-webdriver';

export class TodoPage {
  navigateTo(): promise.Promise<any> {
    return browser.get('/todos');
  }

  // http://www.assertselenium.com/protractor/highlight-elements-during-your-protractor-test-run/
  highlightElement(byObject) {
    function setStyle(element, style) {
      const previous = element.getAttribute('style');
      element.setAttribute('style', style);
      setTimeout(() => {
        element.setAttribute('style', previous);
      }, 200);
      return 'highlighted';
    }

    return browser.executeScript(setStyle, element(byObject).getWebElement(), 'color: red; background-color: yellow;');
  }

  getTodoTitle() {
    const title = element(by.id('todo-list-title')).getText();
    this.highlightElement(by.id('todo-list-title'));

    return title;
  }

  typeABody(body: string) {
    const input = element(by.id('todoBody'));
    input.click();
    input.sendKeys(body);
  }

  typeACategory(category: string) {
    const input = element(by.id('todoCategory'));
    input.click();
    input.sendKeys(category);
  }

  getOwner(owner: string) {
    const input = element(by.id('todoOwner'));
    input.click();
    input.sendKeys(owner);
    this.click('submit');
  }

  getStatus(status: string) {
    const input = element(by.id('todoStatus'));
    input.click();
    input.sendKeys(status);
    this.click('submit');
  }

  //We don't want searching by ID, but oID is technically the only unique identifier (bar the fact that the bodies are
  // probably unique in practice but not in theory)
  getUniqueTodoByID(_id: string) {
    const todo = element(by.id(_id)).getText();
    this.highlightElement(by.id(_id));

    return todo;
  }

  getTodos() {
    return element.all(by.className('todos'));
  }

  backspace() {
    browser.actions().sendKeys(Key.BACK_SPACE).perform();
  }

  elementExistsWithId(idOfElement: string): promise.Promise<boolean> {
    if (element(by.id(idOfElement)).isPresent()) {
      this.highlightElement(by.id(idOfElement));
    }
    return element(by.id(idOfElement)).isPresent();
  }

  elementExistsWithCss(cssOfElement: string): promise.Promise<boolean> {
    return element(by.css(cssOfElement)).isPresent();
  }

  click(idOfButton: string): promise.Promise<void> {
    this.highlightElement(by.id(idOfButton));
    return element(by.id(idOfButton)).click();
  }

  field(idOfField: string) {
    return element(by.id(idOfField));
  }

  button(idOfButton: string) {
    this.highlightElement(by.id(idOfButton));
    return element(by.id(idOfButton));
  }

  getTextFromField(idOfField: string) {
    this.highlightElement(by.id(idOfField));
    return element(by.id(idOfField)).getText();
  }

}

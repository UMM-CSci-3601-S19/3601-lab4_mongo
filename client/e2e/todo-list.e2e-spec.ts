import {TodoPage} from './todo-list.po';
import {browser, protractor, element, by} from 'protractor';
import {Key} from 'selenium-webdriver';

// This line (combined with the function that follows) is here for us
// to be able to see what happens (part of slowing things down)
// https://hassantariqblog.wordpress.com/2015/11/09/reduce-speed-of-angular-e2e-protractor-tests/

const origFn = browser.driver.controlFlow().execute;

browser.driver.controlFlow().execute = function () {
  let args = arguments;

  // queue 100ms wait between test
  // This delay is only put here so that you can watch the browser do its thing.
  // If you're tired of it taking long you can remove this call or change the delay
  // to something smaller (even 0).
  origFn.call(browser.driver.controlFlow(), () => {
    return protractor.promise.delayed(100);
  });

  return origFn.apply(browser.driver.controlFlow(), args);
};


describe('Todo list', () => {
  let page: TodoPage;

  beforeEach(() => {
    page = new TodoPage();
  });

  it('should get and highlight Todos title attribute ', () => {
    page.navigateTo();
    expect(page.getTodoTitle()).toEqual('Todos');
  });

  it('should type something in filter name box and check that it returned correct element', () => {
    page.navigateTo();
    page.getOwner('t');
    expect(page.getUniqueTodoByID('kittypage@surelogic.com')).toEqual('Kitty Page');
    page.backspace();
    page.getOwner('lynn');
    expect(page.getUniqueTodoByID('lynnferguson@niquent.com')).toEqual('Lynn Ferguson');
  });

  it('Should open the expansion panel and get the company', () => {
    page.navigateTo();
    page.getStatus('complete');
    browser.actions().sendKeys(Key.ENTER).perform();

    const barry_element = element(by.id('Barry'));
    browser.wait(protractor.ExpectedConditions.presenceOf(barry_element), 10000);

    // This is just to show that the panels can be opened
    browser.actions().sendKeys(Key.TAB).perform();
    browser.actions().sendKeys(Key.ENTER).perform();
  });

  it('Should allow us to filter todos based on owner', () => {
    page.navigateTo();
    page.getOwner('workm');
    page.getTodos().then((todos) => {
      expect(todos.length).toBe(49);
    });
    expect(page.getUniqueTodoByID('58af3a600343927e48e8721a')).toEqual('Workman');
    expect(page.getUniqueTodoByID('58af3a600343927e48e87219')).toEqual('Workman');
  });

  it('Should allow us to clear a search for status and then still successfully search again', () => {
    page.navigateTo();
    page.getStatus('complete');
    page.getTodos().then((todos) => {
      expect(todos.length).toBe(145);
    });
    page.click('statusClearSearch');
    page.getTodos().then((todos) => {
      expect(todos.length).toBe(304);
    });
    page.getStatus('co');
    page.getTodos().then((todos) => {
      expect(todos.length).toBe(145);
    });
  });

  it('Should allow us to search for an owner, update that search string, and then still successfully search', () => {
    page.navigateTo();
    page.getOwner('b');
    page.getTodos().then((todos) => {
      expect(todos.length).toBe(142);
    });
    page.field('todoOwner').sendKeys('a');
    page.click('submit');
    page.getTodos().then((todos) => {
      expect(todos.length).toBe(51);
    });
  });

// For examples testing modal dialog related things, see:
// https://code.tutsplus.com/tutorials/getting-started-with-end-to-end-testing-in-angular-using-protractor--cms-29318
// https://github.com/blizzerand/angular-protractor-demo/tree/final

  it('Should have an add todo button', () => {
    page.navigateTo();
    expect(page.elementExistsWithId('addNewTodo')).toBeTruthy();
  });

  it('Should open a dialog box when add todo button is clicked', () => {
    page.navigateTo();
    expect(page.elementExistsWithCss('add-todo')).toBeFalsy('There should not be a modal window yet');
    page.click('addNewTodo');
    expect(page.elementExistsWithCss('add-todo')).toBeTruthy('There should be a modal window now');
  });

  describe('Add Todo', () => {

    beforeEach(() => {
      page.navigateTo();
      page.click('addNewTodo');
    });

    it('Should actually add the todo with the information we put in the fields', () => {
      page.navigateTo();
      page.click('addNewTodo');
      page.field('ownerField').sendKeys('Bob Keppers');
      // Need to clear the age field because the default value is -1.
      page.field('statusField').clear();
      page.field('statusField').sendKeys('26');
      page.field('bodyField').sendKeys('Finish e2e tests');
      page.field('categoryField').sendKeys('homework');
      expect(page.button('confirmAddTodoButton').isEnabled()).toBe(true);
      page.click('confirmAddTodoButton');

      /*
       * This tells the browser to wait until the (new) element with ID
       * 'tracy@awesome.com' becomes present, or until 10,000ms whichever
       * comes first. This allows the test to wait for the server to respond,
       * and then for the client to display this new todo.
       * http://www.protractortest.org/#/api?view=ProtractorExpectedConditions
       */
      const bob_element = element(by.id('Bob Keppers'));
      browser.wait(protractor.ExpectedConditions.presenceOf(bob_element), 10000);

      // expect(page.getUniqueTodoByID('tracy@awesome.com')).toMatch('Tracy Kim.*'); // toEqual('Tracy Kim');
    });

    describe('Add Todo (Validation)', () => {

      afterEach(() => {
        page.click('exitWithoutAddingButton');
      });

      it('Should allow us to put information into the fields of the add todo dialog', () => {
        expect(page.field('ownerField').isPresent()).toBeTruthy('There should be an owner field');
        page.field('ownerField').sendKeys('Ruth Berg');
        expect(element(by.id('statusField')).isPresent()).toBeTruthy('There should be a status field');
        // Need to clear this field because the default value is -1.
        page.field('statusField').clear();
        page.field('statusField').sendKeys('complete');
        expect(page.field('bodyField').isPresent()).toBeTruthy('There should be a body field');
        page.field('bodyField').sendKeys('Take out the trash');
        expect(page.field('categoryField').isPresent()).toBeTruthy('There should be a category field');
        page.field('categoryField').sendKeys('video games');
      });

      it('Should show the validation error message about owner name containing and invalid character', () => {
        expect(element(by.id('ownerField')).isPresent()).toBeTruthy('There should be an age field');
        page.field('ownerField').clear();
        page.field('ownerField').sendKeys('!');
        expect(page.button('confirmAddTodoButton').isEnabled()).toBe(false);
        //clicking somewhere else will make the error appear
        page.field('ownerField').click();
        expect(page.getTextFromField('owner-error')).toBe('Owner must contain only numbers and letters');
      });

      it('Should show the validation error message about owner being required', () => {
        expect(element(by.id('ownerField')).isPresent()).toBeTruthy('There should be an owner field');
        page.field('ownerField').clear();
        expect(page.button('confirmAddTodoButton').isEnabled()).toBe(false);
        //clicking somewhere else will make the error appear
        page.field('statusField').click();
        expect(page.getTextFromField('owner-error')).toBe('Owner is required');
      });

      it('Should show the validation error message about category being required', () => {
        expect(element(by.id('categoryField')).isPresent()).toBeTruthy('There should be a category field');
        // '\b' is a backspace, so this enters an 'A' and removes it so this
        // field is "dirty", i.e., it's seen as having changed so the validation
        // tests are run.
        page.field('categoryField').sendKeys('A\b');
        expect(page.button('confirmAddTodoButton').isEnabled()).toBe(false);
        //clicking somewhere else will make the error appear
        page.field('bodyField').click();
        expect(page.getTextFromField('category-error')).toBe('Category is required');
      });

      it('Should show the validation error message about status format', () => {
        expect(element(by.id('emailField')).isPresent()).toBeTruthy('There should be an email field');
        page.field('nameField').sendKeys('Donald Jones');
        page.field('ageField').sendKeys('30');
        page.field('emailField').sendKeys('donjones.com');
        expect(page.button('confirmAddTodoButton').isEnabled()).toBe(false);
        //clicking somewhere else will make the error appear
        page.field('nameField').click();
        expect(page.getTextFromField('email-error')).toBe('Email must be formatted properly');
      });
    });
  });
});


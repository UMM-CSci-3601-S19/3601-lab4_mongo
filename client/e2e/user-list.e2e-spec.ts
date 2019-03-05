// import {UserPage} from './user-list.po';
// import {browser, protractor, element, by} from 'protractor';
// import {Key} from 'selenium-webdriver';
//
// // This line (combined with the function that follows) is here for us
// // to be able to see what happens (part of slowing things down)
// // https://hassantariqblog.wordpress.com/2015/11/09/reduce-speed-of-angular-e2e-protractor-tests/
//
// const origFn = browser.driver.controlFlow().execute;
//
// browser.driver.controlFlow().execute = function () {
//     let args = arguments;
//
//     // queue 100ms wait between test
//     // This delay is only put here so that you can watch the browser do its thing.
//     // If you're tired of it taking long you can remove this call or change the delay
//     // to something smaller (even 0).
//     origFn.call(browser.driver.controlFlow(), () => {
//         return protractor.promise.delayed(100);
//     });
//
//     return origFn.apply(browser.driver.controlFlow(), args);
// };
//
//
// describe('User list', () => {
//   let page: UserPage;
//
//   beforeEach(() => {
//     page = new UserPage();
//   });
//
//   it('should get and highlight Users title attribute ', () => {
//     page.navigateTo();
//     expect(page.getUserTitle()).toEqual('Users');
//   });
//
//   it('should type something in filter name box and check that it returned correct element', () => {
//     page.navigateTo();
//     page.typeAName('t');
//     expect(page.getUniqueUser('kittypage@surelogic.com')).toEqual('Kitty Page');
//     page.backspace();
//     page.typeAName('lynn');
//     expect(page.getUniqueUser('lynnferguson@niquent.com')).toEqual('Lynn Ferguson');
//   });
//
//   it('Should open the expansion panel and get the company', () => {
//     page.navigateTo();
//     page.getCompany('DATA');
//     browser.actions().sendKeys(Key.ENTER).perform();
//
//     expect(page.getUniqueUser('valerieerickson@datagene.com')).toEqual('Valerie Erickson');
//
//     // This is just to show that the panels can be opened
//     browser.actions().sendKeys(Key.TAB).perform();
//     browser.actions().sendKeys(Key.ENTER).perform();
//   });
//
// // For examples testing modal dialog related things, see:
// // https://code.tutsplus.com/tutorials/getting-started-with-end-to-end-testing-in-angular-using-protractor--cms-29318
// // https://github.com/blizzerand/angular-protractor-demo/tree/final
//
//   it('Should have an add user button', () => {
//     page.navigateTo();
//     expect(page.elementExistsWithId('addNewUser')).toBeTruthy();
//   });
//
//   it('Should open a dialog box when add user button is clicked', () => {
//     page.navigateTo();
//     expect(page.elementExistsWithCss('add-user')).toBeFalsy('There should not be a modal window yet');
//     page.click('addNewUser');
//     expect(page.elementExistsWithCss('add-user')).toBeTruthy('There should be a modal window now');
//   });
//
//   describe('Add User', () => {
//
//     beforeEach(() => {
//       page.navigateTo();
//       page.click('addNewUser');
//     });
//
//     describe('Add User (Validation)', () => {
//
//       afterEach(() => {
//         page.click('exitWithoutAddingButton');
//       });
//
//       it('Should allow us to put information into the fields of the add user dialog', () => {
//         expect(page.field('nameField').isPresent()).toBeTruthy('There should be a name field');
//         page.field('nameField').sendKeys('Dana Jones');
//         expect(element(by.id('ageField')).isPresent()).toBeTruthy('There should be an age field');
//         // Need to clear this field because the default value is -1.
//         page.field('ageField').clear();
//         page.field('ageField').sendKeys('24');
//         expect(page.field('companyField').isPresent()).toBeTruthy('There should be a company field');
//         page.field('companyField').sendKeys('Awesome Startup, LLC');
//         expect(page.field('emailField').isPresent()).toBeTruthy('There should be an email field');
//         page.field('emailField').sendKeys('dana@awesome.com');
//       });
//
//       it('Should show the validation error message about age being too small if the age is less than 15', () => {
//         expect(element(by.id('ageField')).isPresent()).toBeTruthy('There should be an age field');
//         page.field('ageField').clear();
//         page.field('ageField').sendKeys('2');
//         expect(page.button('confirmAddUserButton').isEnabled()).toBe(false);
//         //clicking somewhere else will make the error appear
//         page.field('nameField').click();
//         expect(page.getTextFromField('age-error')).toBe('Age must be at least 15');
//       });
//
//       it('Should show the validation error message about age being required', () => {
//         expect(element(by.id('ageField')).isPresent()).toBeTruthy('There should be an age field');
//         page.field('ageField').clear();
//         expect(page.button('confirmAddUserButton').isEnabled()).toBe(false);
//         //clicking somewhere else will make the error appear
//         page.field('nameField').click();
//         expect(page.getTextFromField('age-error')).toBe('Age is required');
//       });
//
//       it('Should show the validation error message about name being required', () => {
//         expect(element(by.id('nameField')).isPresent()).toBeTruthy('There should be a name field');
//         // '\b' is a backspace, so this enters an 'A' and removes it so this
//         // field is "dirty", i.e., it's seen as having changed so the validation
//         // tests are run.
//         page.field('nameField').sendKeys('A\b');
//         expect(page.button('confirmAddUserButton').isEnabled()).toBe(false);
//         //clicking somewhere else will make the error appear
//         page.field('ageField').click();
//         expect(page.getTextFromField('name-error')).toBe('Name is required');
//       });
//
//       it('Should show the validation error message about the format of name', () => {
//         expect(element(by.id('nameField')).isPresent()).toBeTruthy('There should be an name field');
//         page.field('nameField').sendKeys('Don@ld Jones');
//         expect(page.button('confirmAddUserButton').isEnabled()).toBe(false);
//         //clicking somewhere else will make the error appear
//         page.field('ageField').click();
//         expect(page.getTextFromField('name-error')).toBe('Name must contain only numbers and letters');
//       });
//
//       it('Should show the validation error message about the name being taken', () => {
//         expect(element(by.id('nameField')).isPresent()).toBeTruthy('There should be an name field');
//         page.field('nameField').sendKeys('abc123');
//         expect(page.button('confirmAddUserButton').isEnabled()).toBe(false);
//         //clicking somewhere else will make the error appear
//         page.field('ageField').click();
//         expect(page.getTextFromField('name-error')).toBe('Name has already been taken');
//       });
//
//       it('Should show the validation error message about email format', () => {
//         expect(element(by.id('emailField')).isPresent()).toBeTruthy('There should be an email field');
//         page.field('nameField').sendKeys('Donald Jones');
//         page.field('ageField').sendKeys('30');
//         page.field('emailField').sendKeys('donjones.com');
//         expect(page.button('confirmAddUserButton').isEnabled()).toBe(false);
//         //clicking somewhere else will make the error appear
//         page.field('nameField').click();
//         expect(page.getTextFromField('email-error')).toBe('Email must be formatted properly');
//       });
//     });
//   });
// });
//

import React from "react";
import { render  } from "react-dom";
import { act } from "react-dom/test-utils";
// import { render, screen } from '@testing-library/react';
 import Hello from './App';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });
const faker = require('faker');
const puppeteer = require('puppeteer');


// assert.ok(visa.match(/^4(([0-9]){12}|([0-9]){3}(\-([0-9]){4}){3})$/));
  // assert.ok(luhnFormula(visa));
const CardDetail = {
  Card_holder_name: faker.name.firstName()+ ' ' + faker.name.lastName(),
  Credit_card_number : faker.providers.credit_card.credit_card_number(),
  Credit_card_type : faker.providers.credit_card.credit_card_provider(),
  Expiration_date : faker.providers.credit_card.credit_card_expire(),
  Security_code:  faker.providers.credit_card.credit_card_security_code(),
Billing_postal_code: faker.providers.address.postcode()
};

describe('Contact Form', () => {
  test('Can submit contact form', async () => {
    let browser = await puppeteer.launch({
      headless: false,
      devtools: true,
      slowMo: 250
    });
    let page = await browser.newPage();

    page.emulate({
      viewport: {
        width: 500,
        height: 900
      },
      userAgent: ''
    });
    
    await page.goto('http://localhost:3002/');
    await page.waitForSelector('.billing-form');
    await page.click("input[name=Card_holder_name]");
    await page.type("input[name=Card_holder_name]", CardDetail.Card_holder_name);
    await page.click("input[name=Credit_card_number]");
    await page.type("input[name=Credit_card_number]", CardDetail.Credit_card_number);
    await page.click("textarea[name=Credit_card_type]");
    await page.type("textarea[name=Credit_card_type]", CardDetail.Credit_card_type);
    await page.click("textarea[name=Expiration_date]");
    await page.type("textarea[name=Expiration_date]", CardDetail.Expiration_date);
    await page.click("textarea[name=Security_code]");
    await page.type("textarea[name=Security_code]", CardDetail.Security_code);
    await page.click("textarea[name=Billing_postal_code]");
    await page.type("textarea[name=Billing_postal_code]", CardDetail.Billing_postal_code);
    //await page.click("input[type=checkbox]");

    await page.click("input[name=question]");

    await page.click("button[type=submit]");

    browser.close();
  }, 9000000);
});


let container = null;
it("renders with or without a name", () => {
  act(() => {
    render(<Hello />, container);
  });
  expect(container.textContent).toBe("Hey, stranger");

  act(() => {
    render(<Hello name="Jenny" />, container);
  });
  expect(container.textContent).toBe("Hello, Jenny!");

  act(() => {
    render(<Hello name="Margaret" />, container);
  });
  expect(container.textContent).toBe("Hello, Margaret!");
});
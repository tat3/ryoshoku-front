describe('basic test', () => {

  it('can render App without crashing', (browser) => {
    browser.url('http://localhost:3000/')
      .waitForElementVisible('body')
      .assert.titleContains('Ryoshoku')
      .assert.noConsoleErrors()
  });

  it('can render choosing dormitory page without crashing', (browser) => {
    browser.url('http://localhost:3000/dormitory')
      .waitForElementVisible('body')
      .assert.titleContains('Ryoshoku')
      .assert.noConsoleErrors()
  });
  afterEach(browser => browser.end())
})
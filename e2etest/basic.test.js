describe('basic test', () => {
  before(browser => browser.url('http://localhost:3000/'))

  it('can render App without crashing', (browser) => {
    browser
      .waitForElementVisible('body')
      .assert.titleContains('Ryoshoku')
      .assert.noConsoleErrors()
  });

  afterEach(browser => browser.end())
})
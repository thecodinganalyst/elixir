import { browser, logging } from 'protractor';

describe('workspace-project App', () => {

  it('should have title as Elixir', async () => {
    await browser.get(browser.baseUrl);
    expect(await browser.getTitle()).toEqual('Elixir');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});

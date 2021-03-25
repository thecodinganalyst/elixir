import {browser, by, element, logging} from 'protractor';

describe('FrameComponent', () => {

  beforeEach(async () => {
    await browser.get(browser.baseUrl);
  });

  it('should load the sample table when selected', async () => {
    const sampleTableLink = element.all(by.css('.mat-list-item')).first();
    const tableComp = element(by.tagName('table'));
    await sampleTableLink.click();
    expect(await tableComp.isPresent()).toBe(true);
  });

  it('should load the sample form when selected', async () => {
    const sampleTableLink = element.all(by.css('.mat-list-item')).get(1);
    const tableComp = element(by.tagName('form'));
    await sampleTableLink.click();
    expect(await tableComp.isPresent()).toBe(true);
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});

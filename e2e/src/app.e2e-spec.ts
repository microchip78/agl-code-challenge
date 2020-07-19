import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('Fantastic Pets', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display have header', () => {
    page.navigateTo();
    expect(page.getHeader()).toEqual('Fantastic Pets');
  });

  it('should have footer with developed by', () => {
    page.navigateToCats();
    expect(page.getDevelopedByFooter()).toEqual('Developed by: Chirag Patel');
  });

  it('cats should have two pet lists', () => {
    page.navigateToCats();
    expect(page.getPetListsCount().count()).toEqual(2);
  });

  it('first pets list should have title Male', () => {
    page.navigateToCats();
    expect(page.getPetListTitle(1)).toEqual('Male');
  });

  it('second pets list should have title Female', () => {
    page.navigateToCats();
    expect(page.getPetListTitle(2)).toEqual('Female');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(
      jasmine.objectContaining({
        level: logging.Level.SEVERE,
      } as logging.Entry)
    );
  });
});

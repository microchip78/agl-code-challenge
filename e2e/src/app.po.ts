import { browser, by, element, ElementArrayFinder } from 'protractor';

export class AppPage {
  navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl) as Promise<unknown>;
  }

  navigateToCats(): Promise<unknown> {
    return browser.get(browser.baseUrl + '/pets/cat') as Promise<unknown>;
  }

  getHeader(): Promise<string> {
    return element(by.css('app-root header h2')).getText() as Promise<string>;
  }

  getDevelopedByFooter(): Promise<string> {
    return element(
      by.css('app-root footer span:last-of-type')
    ).getText() as Promise<string>;
  }

  getPetListsCount(): ElementArrayFinder {
    return element.all(by.css('app-root app-pet-list'));
  }

  getPetListTitle(elementNo: number): Promise<string> {
    const selector = `app-root app-pet-list:nth-child(${elementNo}) h5`;
    return element(by.css(selector)).getText() as Promise<string>;
  }
}

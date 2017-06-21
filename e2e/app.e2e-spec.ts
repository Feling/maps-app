import { MapsAppPage } from './app.po';

describe('maps-app App', () => {
  let page: MapsAppPage;

  beforeEach(() => {
    page = new MapsAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

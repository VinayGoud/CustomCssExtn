import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import { BaseApplicationCustomizer } from '@microsoft/sp-application-base';
import * as strings from 'NewsStylingCustomizerApplicationCustomizerStrings';

require('./assets/newsStyles.css');

const LOG_SOURCE: string =
  'NewsStylingCustomizerApplicationCustomizer';

const NEWS_WEB_PART_SELECTOR: string =
  '[data-sp-feature-tag*="NewsWebPart"]';

const NEWS_ITEM_SELECTOR: string =
  '[data-automation-id="newsItem"]';

const NEWS_NAVIGATION_CLASS: string =
  'news-navigation-in-progress';


const NAVIGATION_TIMEOUT_MS: number = 5000;

export default class NewsStylingCustomizerApplicationCustomizer
  extends BaseApplicationCustomizer<Record<string, never>> {

  private _navigationTimeoutId: number | undefined;

  @override
  public onInit(): Promise<void> {
    Log.info(
      LOG_SOURCE,
      `Initialized ${strings.Title}`
    );


    document.addEventListener(
      'click',
      this._handleNewsClick,
      true
    );

    this.context.application.navigatedEvent.add(
      this,
      this._onNavigated
    );

    return Promise.resolve();
  }

  private _handleNewsClick = (event: MouseEvent): void => {
    if (!(event.target instanceof Element)) {
      return;
    }

    // Only handle a normal left-click.
    if (
      event.button !== 0 ||
      event.ctrlKey ||
      event.metaKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    const link: HTMLAnchorElement | null =
      event.target.closest('a');

    if (!link) {
      return;
    }

    const newsItem: Element | null =
      link.closest(NEWS_ITEM_SELECTOR);

    if (!newsItem) {
      return;
    }

    const newsWebPart: Element | null =
      newsItem.closest(NEWS_WEB_PART_SELECTOR);

    if (!newsWebPart) {
      return;
    }


    document.body.classList.add(
      NEWS_NAVIGATION_CLASS
    );

    this._armNavigationTimeout();
  };

  private _onNavigated = (): void => {
    this._clearNavigationTimeout();

    document.body.classList.remove(
      NEWS_NAVIGATION_CLASS
    );
  };

  private _armNavigationTimeout(): void {
    this._clearNavigationTimeout();

    this._navigationTimeoutId = window.setTimeout(() => {
      document.body.classList.remove(NEWS_NAVIGATION_CLASS);
      this._navigationTimeoutId = undefined;
    }, NAVIGATION_TIMEOUT_MS);
  }

  private _clearNavigationTimeout(): void {
    if (this._navigationTimeoutId !== undefined) {
      window.clearTimeout(this._navigationTimeoutId);
      this._navigationTimeoutId = undefined;
    }
  }

  @override
  public onDispose(): void {
    document.removeEventListener(
      'click',
      this._handleNewsClick,
      true
    );

    this.context.application.navigatedEvent.remove(
      this,
      this._onNavigated
    );

    this._clearNavigationTimeout();

    document.body.classList.remove(
      NEWS_NAVIGATION_CLASS
    );
  }
}

import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import { BaseApplicationCustomizer } from '@microsoft/sp-application-base';
import * as strings from 'NewsStylingCustomizerApplicationCustomizerStrings';

require('./assets/newsStyles.css');

const LOG_SOURCE: string = 'NewsStylingCustomizerApplicationCustomizer';

export interface INewsStylingCustomizerApplicationCustomizerProperties {}

export default class NewsStylingCustomizerApplicationCustomizer
  extends BaseApplicationCustomizer<INewsStylingCustomizerApplicationCustomizerProperties> {

  @override
  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);
    return Promise.resolve();
  }
}















// import { Log } from '@microsoft/sp-core-library';
// import {
//   BaseApplicationCustomizer
// } from '@microsoft/sp-application-base';
// import { Dialog } from '@microsoft/sp-dialog';

// import * as strings from 'NewsStylingCustomizerApplicationCustomizerStrings';

// const LOG_SOURCE: string = 'NewsStylingCustomizerApplicationCustomizer';

// /**
//  * If your command set uses the ClientSideComponentProperties JSON input,
//  * it will be deserialized into the BaseExtension.properties object.
//  * You can define an interface to describe it.
//  */
// export interface INewsStylingCustomizerApplicationCustomizerProperties {
//   // This is an example; replace with your own property
//   testMessage: string;
// }

// /** A Custom Action which can be run during execution of a Client Side Application */
// export default class NewsStylingCustomizerApplicationCustomizer
//   extends BaseApplicationCustomizer<INewsStylingCustomizerApplicationCustomizerProperties> {

//   public onInit(): Promise<void> {
//     Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);

//     let message: string = this.properties.testMessage;
//     if (!message) {
//       message = '(No properties were provided.)';
//     }

//     Dialog.alert(`Hello from ${strings.Title}:\n\n${message}`).catch(() => {
//       /* handle error */
//     });

//     return Promise.resolve();
//   }
// }


// import { override } from '@microsoft/decorators';
// import { Log } from '@microsoft/sp-core-library';
// import {
//   BaseApplicationCustomizer
// } from '@microsoft/sp-application-base';

// import * as strings from 'NewsStylingCustomizerApplicationCustomizerStrings';

// require('./assets/newsStyles.css');

// const LOG_SOURCE: string = 'NewsStylingCustomizerApplicationCustomizer';

// export interface INewsStylingCustomizerApplicationCustomizerProperties {
//   cssFileUrl?: string; // optional — allows overriding CSS path per-site via property pane/JSON
//   targetPageName?: string;
// }

// export default class NewsStylingCustomizerApplicationCustomizer
//   extends BaseApplicationCustomizer<INewsStylingCustomizerApplicationCustomizerProperties> {

//   private _linkElement: HTMLLinkElement | undefined;

//   @override
//   public onInit(): Promise<void> {
//     Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);

//  const targetPageName: string = this.properties.targetPageName || 'Global-News.aspx';
//   const currentPath: string = window.location.pathname.toLowerCase();

//   const isTargetPage: boolean = currentPath.endsWith(`/${targetPageName.toLowerCase()}`);

//   if (!isTargetPage) {
//     Log.info(LOG_SOURCE, 'Not target page - skipping CSS injection');
//     return Promise.resolve();
//   }

//     // Use property override if provided, otherwise default to Site Assets path
//     const cssUrl: string = this.properties.cssFileUrl
//       || `${this.context.pageContext.web.absoluteUrl}/SiteAssets/newsStyles.css`;

//     this._injectCss(cssUrl);

//     return Promise.resolve();
//   }

//   private _injectCss(url: string): void {
//     // Avoid duplicate injection on re-render/navigation in modern pages
//     const existing = document.getElementById('news-styling-customizer-css');
//     if (existing) {
//       return;
//     }

//     this._linkElement = document.createElement('link');
//     this._linkElement.id = 'news-styling-customizer-css';
//     this._linkElement.rel = 'stylesheet';
//     this._linkElement.href = url;
//     document.head.appendChild(this._linkElement);

//     Log.info(LOG_SOURCE, `Injected CSS from: ${url}`);
//   }

//   @override
//   public onDispose(): void {
//     // Clean up if the extension is unloaded
//     if (this._linkElement && this._linkElement.parentNode) {
//       this._linkElement.parentNode.removeChild(this._linkElement);
//     }
//   }
// }
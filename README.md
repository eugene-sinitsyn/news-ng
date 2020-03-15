# News web application built with Angular ![](src/assets/favicon.ico)

## Live on GitHub Pages
[eugene-sinitsyn.github.io/news-ng/](https://eugene-sinitsyn.github.io/news-ng/)

## Features:
- **Articles**
  - View 100 top news articles worldwide
  - Save article to "read later"
  - Navigate using "back to top" button
- **Filtering**
  - Search for news sources by country and category
  - Search for top articles by country, category, news sources and a search term **\***
  - Save active filter to localStorage
  - Browse saved filters and apply one from the list
- **Preferences**
  - Change application language **\*\***
  - Toggle "infinite" scrolling
  - Switch between dark and light themes
  - Set default filter from saved filters
  - Choose page size - number of articles displayed at a time
  - Save preferences to localStorage
  - Clear localStorage using "Clear user data" button
- **Caching**
  - List of news sources is cached for 1 day

**\*** _Filter parameters "override" rules: `News source` overrides `country` and `category`; any parameter overrides `language` meaning that if no parameters are applyed articles are searched by currently selected `language`_

**\*\*** _Translations are currently filled with placeholders_

### Technologies used:
- `@angular`
- `@angular/forms` _(reactive)_
- `@angular/cdk`
- `@angular/material`
- `@ngx-translate`
- `@ngrx`
- `gh-pages`
- `webpack-bundle-analyzer`

How-to references:
  - `gh-pages` [package.json](package.json) ("`deploy`" script)
  - `ControlValueAccessor` [sources-selector.component.ts](src/root-module/components/sources-selector/sources-selector.component.ts)
  - `MatFormFieldControl` [sources-selector.component.ts](src/root-module/components/sources-selector/sources-selector.component.ts)
  - API key **interceptor** [api-key.interceptor.ts](src/root-module/interceptors/api-key.interceptor.ts)
  - Metadata **decorator** [metadata.decorator.ts](src/root-module/decorators/metadata.decorator.ts)
  - Immediate store event [root.effects.ts](src/root-module/state/effects/root.effects.ts)
  - Toggling spinner with RxJS startWith & endWith [top.effects.ts](src/root-module/state/effects/top.effects.ts)
  - `localStorage` service [local-storage.service.ts](src/root-module/services/local-storage/local-storage.service.ts)
  - **Angular material** theme loader [theme-loader.directive.ts](src/root-module/directives/theme-loader.directive.ts)
  - `coerceBooleanProperty` [articles-list.component.ts](src/root-module/components/articles/list/articles-list.component.ts)
  - **infinite scrolling** [pager.component.ts](src/root-module/components/pager/pager.component.ts)
  - organizing imports [services/index.ts](src/root-module/services/index.ts)
  - bundle analyzer [package.json](package.json) ("`build`" and "`stats`" scripts)
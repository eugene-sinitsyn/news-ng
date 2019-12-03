import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { environment } from '@environment';
import { ViewModule } from '@view';

if (environment.production) enableProdMode();

platformBrowserDynamic()
  .bootstrapModule(ViewModule)
  .catch(err => console.error(err));
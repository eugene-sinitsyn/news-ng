import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { ViewModule } from './view/view.module';
import { environment } from './environments/environment';

if (environment.production) enableProdMode();

platformBrowserDynamic()
  .bootstrapModule(ViewModule)
  .catch(err => console.error(err));
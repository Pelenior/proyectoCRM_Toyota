import { ApplicationConfig } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  // El de http es para que se pueda usar en todo el proyecto, el otro es necesario para el Angular Material
  providers: [provideAnimationsAsync(), provideHttpClient()]
};

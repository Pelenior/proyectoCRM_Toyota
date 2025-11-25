import { ApplicationConfig } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  // El de http es para que se pueda usar en todo el proyecto
  providers: [provideHttpClient()]
};

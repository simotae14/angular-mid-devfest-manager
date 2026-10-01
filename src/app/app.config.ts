import { ApplicationConfig, provideZoneChangeDetection, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding, withViewTransitions } from '@angular/router';
import { IMAGE_LOADER, ImageLoaderConfig } from '@angular/common';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { routes } from './app.routes';
import { API_URL } from './core/tokens';

export const appConfig: ApplicationConfig = {
  providers: [
    // Day 2: switch to provideZonelessChangeDetection()
    provideZonelessChangeDetection(),

    provideRouter(routes, withComponentInputBinding(), withViewTransitions()),

    provideHttpClient(withFetch()),

    { provide: API_URL, useValue: 'http://localhost:3000' },
    /*
    {
      provide: IMAGE_LOADER,
      useValue: (config: ImageLoaderConfig) => {
        // remove /images/ from src
        const src = config.src.replace('/images/', '');
        return `https://static-assets.dev/cdn-cgi/image/width=${config.width},format=auto/https://storage.googleapis.com/images-cdn-e0395.firebasestorage.app/${src}`;
      },
    },
    */
  ],
};

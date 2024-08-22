import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
  provideRouter,
  withComponentInputBinding,
  withEnabledBlockingInitialNavigation,
  withHashLocation,
  withInMemoryScrolling,
  withRouterConfig,
  withViewTransitions
} from '@angular/router';

import { DropdownModule, SidebarModule } from '@coreui/angular';
import { IconSetService } from '@coreui/icons-angular';
import { routes } from './app.routes';
import { CoreModule } from './core/core.module';
import {
  provideHttpClient,
  withInterceptorsFromDi
} from '@angular/common/http';
import { LMarkdownEditorModule } from 'ngx-markdown-editor';
import { MarkdownModule } from 'ngx-markdown';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withRouterConfig({
        onSameUrlNavigation: 'reload'
      }),
      withInMemoryScrolling({
        scrollPositionRestoration: 'top',
        anchorScrolling: 'enabled'
      }),
      withEnabledBlockingInitialNavigation(),
      withViewTransitions(),
      withHashLocation(),
      withComponentInputBinding()
    ),
    importProvidersFrom(
      CoreModule,
      SidebarModule,
      DropdownModule,
      LMarkdownEditorModule,
      MarkdownModule.forRoot()
    ),
    IconSetService,
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi())
  ]
};

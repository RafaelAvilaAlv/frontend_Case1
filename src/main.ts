import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  providers: [
    ...appConfig.providers!,
    provideHttpClient() // ✅ Provee HttpClient para servicios como AuthService
  ]
});

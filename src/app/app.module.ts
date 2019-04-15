import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpClient } from '@angular/common/http';
import {
  MatDialogModule,
  MatButtonModule,
  MatInputModule,
  MatCardModule,
  MatMenuModule,
  MatToolbarModule,
  MatDatepickerModule,
  MatNativeDateModule
} from '@angular/material';

import { environment } from '../environments/environment';

// Routing
import { AppRoutingModule } from './app-routing.module';

// Services
import { RequestService } from './services/request.service';

// Guards
import {AuthenticationGuard} from './guards/authentication-guard';

// Interceptors
import { HeadersInterceptor } from './interceptors/interceptors.header';
import { EmptyResponseBodyErrorInterceptor } from './interceptors/interceptors.empty';
import { LoggingInterceptor } from './interceptors/interceptors.logging';

// Components
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { HeaderComponent } from './components/header/header.component';
import { DataComponent } from './components/data/data.component';
import { SubscribeComponent } from './components/subscribe/subscribe.component';
import { ProfileComponent } from './components/profile/profile.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ModalComponent } from './components/popups/modal/modal.component';
import { ErrorComponent } from './components/popups/error/error.component';

// Reducers
import { reducers, metaReducers } from './reducers';

// Effects
import { GetDataEffect } from './effects/get-data.effect';
import { LoginEffect } from './effects/login.effect';
import { LogoutEffect } from './effects/logout.effect';
import { RegistrationEffect } from './effects/registration.effect';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegistrationComponent,
    HeaderComponent,
    DataComponent,
    SubscribeComponent,
    ProfileComponent,
    NotFoundComponent,
    ModalComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([GetDataEffect, LoginEffect, LogoutEffect, RegistrationEffect]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatMenuModule,
    MatToolbarModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [

    // Services
    RequestService,

    // Guards
    AuthenticationGuard,

    // Interceptors
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeadersInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: EmptyResponseBodyErrorInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoggingInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent, ModalComponent]
})
export class AppModule { }

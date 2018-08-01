import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpClient } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store, ActionReducerMap, combineReducers } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import {
  MatDialogModule,
  MatButtonModule,
  MatInputModule,
  // MatListModule,
  // MatSelectModule,
  MatCardModule,
  // MatRadioModule,
  // MatTooltipModule,
  MatMenuModule,
  // MatIconModule,
  // MatTableModule,
  // MatSliderModule,
  // MatTabsModule,
  MatToolbarModule,
  MatDatepickerModule,
  MatNativeDateModule,
  // MatCheckboxModule,
  // MatPaginatorModule,
  // MatExpansionModule,
  // MatProgressBarModule,
  // MatGridListModule
} from '@angular/material';

// Routing
import { RoutingConfig } from './app.routes';

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
import { ModalComponent } from './components/popups/modal/modal.component';
import { ErrorComponent } from './components/popups/error/error.component';

// Reducers
import { Reducers, State } from './reducers/index';

// Effects
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
    ModalComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    StoreModule.forRoot(Reducers),
    EffectsModule.forRoot([
      LoginEffect,
      LogoutEffect,
      RegistrationEffect,]),
    StoreDevtoolsModule.instrument({ maxAge: 10 }),
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatMenuModule,
    MatToolbarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    RoutingConfig
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
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: EmptyResponseBodyErrorInterceptor,
    //   multi: true
    // },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoggingInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent, ModalComponent]
})
export class AppModule {}

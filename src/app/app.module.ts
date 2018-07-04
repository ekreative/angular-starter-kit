import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpClient } from '@angular/common/http';
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
export class AppModule {}

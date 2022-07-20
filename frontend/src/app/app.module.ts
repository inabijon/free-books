import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';

import { MaterialModule } from './material.module';
import { LayoutModule } from '@angular/cdk/layout';
import { AuthModule } from './auth/auth/auth.module';
import { AdminModule } from './admin/admin/admin.module';
import { BookService } from './services/book.service';
import { AuthService } from './services/auth.service';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    LayoutModule,
    AuthModule,
    AdminModule,
    ToastrModule.forRoot({
      timeOut: 1200,
    }),
    FormsModule,
    PdfViewerModule,

  ],
  providers: [BookService, AuthService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  },],
  bootstrap: [AppComponent]
})
export class AppModule { }

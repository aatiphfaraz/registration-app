import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AdminModule } from './admin/admin.module';
import { UserModule } from './user/user.module';
import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { AuthGuard } from './_services/auth.guard';
import { LoginGuard } from './_services/login.guard';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AdminModule,
    UserModule,
    SharedModule,
  ],
  providers: [authInterceptorProviders, AuthGuard, LoginGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}

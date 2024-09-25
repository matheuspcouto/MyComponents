import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ModalComponent } from './shared/components/modal/modal.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { ToastrModule } from 'ngx-toastr';
import { AuthGuard } from './guards/auth.guard';
import { SiteAtivoGuard } from './guards/site-ativo.guard';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { LoaderService } from './shared/components/loader/loader.service';
import { HeaderComponent } from './shared/components/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    ModalComponent,
    LoaderComponent,
    FooterComponent,
    HeaderComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    NgxMaskPipe,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 4000,
      positionClass: 'toast-top-right',
      preventDuplicates: false,
      maxOpened: 4,

    }),
  ],
  providers: [SiteAtivoGuard, AuthGuard, provideNgxMask(),
    { provide: HTTP_INTERCEPTORS, useClass: LoaderService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }

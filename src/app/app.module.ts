import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import {MatFormFieldModule} from '@angular/material/form-field';

import {SplitterModule} from 'primeng/splitter';
import {PanelModule} from 'primeng/panel';
import {ToastModule} from 'primeng/toast';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {RadioButtonModule} from 'primeng/radiobutton';
import {ButtonModule} from 'primeng/button';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SubjectComponent } from './admin/subject/subject.component';
import { QuestionComponent } from './admin/question/question.component';
import { HomeComponent } from './client/home/home.component';
import { MenubarComponent } from './admin/menubar/menubar.component';
import { MenuComponent } from './client/menu/menu.component';
import { LoginComponent } from './client/login/login.component';
import { SignupComponent } from './client/signup/signup.component';
import { RankedComponent } from './client/ranked/ranked.component';
import { LoginAdminComponent } from './admin/login-admin/login-admin.component';

@NgModule({
  declarations: [
    AppComponent,
    SubjectComponent,
    QuestionComponent,
    HomeComponent,
    MenubarComponent,
    MenuComponent,
    LoginComponent,
    SignupComponent,
    RankedComponent,
    LoginAdminComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatListModule,
    MatFormFieldModule,
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'danger', // set defaults here
    }),
    SplitterModule,
    PanelModule,
    ToastModule,
    MessagesModule,
    MessageModule,
    RadioButtonModule,
    ButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

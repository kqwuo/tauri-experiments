import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { fr_FR } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import fr from '@angular/common/locales/fr';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FileExplorerComponent } from './components/file-explorer/file-explorer.component';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { FileExplorerItemComponent } from './components/file-explorer-item/file-explorer-item.component';
import { EditorComponent } from './components/editor/editor.component';
import { MonacoEditorModule, NgxMonacoEditorConfig } from 'ngx-monaco-editor';

registerLocaleData(fr);

const monacoConfig: NgxMonacoEditorConfig = {
  baseUrl: './assets', // configure base path cotaining monaco-editor directory after build default: './assets'
  defaultOptions: { scrollBeyondLastLine: true }, // pass default options to be used
  onMonacoLoad: () => { console.log((<any>window).monaco); } // here monaco object will be available as window.monaco use this function to extend monaco editor functionalities.
};

@NgModule({
  declarations: [
    AppComponent,
    FileExplorerComponent,
    FileExplorerItemComponent,
    EditorComponent
  ],
  imports: [
    NzMenuModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MonacoEditorModule.forRoot()
  ],
  providers: [{ provide: NZ_I18N, useValue: fr_FR }],
  bootstrap: [AppComponent]
})
export class AppModule { }

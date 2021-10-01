import { Component } from '@angular/core';
import { FileEntry } from '@tauri-apps/api/fs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  public title = 'tauri-app';
  public selectedFile: FileEntry | undefined;

  public selectItem(item: FileEntry) {
    this.selectedFile = item;
  }
}

import { AfterViewChecked, AfterViewInit, Component } from '@angular/core';
import { FileEntry } from '@tauri-apps/api/fs';
import { getCurrent } from '@tauri-apps/api/window';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements AfterViewChecked {
  public title = 'tauri-app';
  public selectedFile: FileEntry | undefined;
  public openRoute: string | undefined;

  ngAfterViewChecked(): void {
    getCurrent().listen('open', (event: any) => { console.debug(event); });
  }

  public selectItem(item: FileEntry) {
    this.selectedFile = item;
  }
}

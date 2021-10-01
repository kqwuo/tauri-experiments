import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FileEntry, readDir } from "@tauri-apps/api/fs";
import { WebviewWindow } from '@tauri-apps/api/window';

@Component({
  selector: 'app-file-explorer',
  templateUrl: './file-explorer.component.html',
  styleUrls: ['./file-explorer.component.less']
})
export class FileExplorerComponent implements OnInit {
  @Input() item?: FileEntry;
  @Output() itemChange = new EventEmitter<FileEntry>();
  @Output() selectedItem = new EventEmitter<FileEntry>();
  public itemList: Array<FileEntry>;

  constructor() {
    this.itemList = new Array<FileEntry>();
  }

  async ngOnInit(): Promise<void> {
    if (this.item) {
      this.itemList = await this.openFolder(this.item.path);
    } else {
      this.itemList = await this.openFolder();
    }
  }

  public async selectItem(event: MouseEvent, item: FileEntry): Promise<void> {
    if (item.children !== undefined && item.children.length === 0) {
      item.children = await this.openFolder(item.path);
    } else {
      if (event.shiftKey) {
        // open new window
        const webview = new WebviewWindow('theUniqueLabel', {
          url: `http://localhost:4200`
        });

        setTimeout( async () => {
          const webview2 = new WebviewWindow('theUniqueLabel', {
            url: `http://localhost:4200`
          });
          await webview2.emit('open', item.path);
        }, 1000);

      } else {
        // open file in current window
        this.selectedItem.emit(item);
      }
    }
  }

  private async openFolder(path: string = './'): Promise<Array<FileEntry>> {
    return await readDir(path);
  }

}

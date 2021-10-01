import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FileEntry, readDir } from "@tauri-apps/api/fs";

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

  public async selectItem(item: FileEntry): Promise<void> {
    if (item.children !== undefined && item.children.length === 0) {
      item.children = await this.openFolder(item.path);
    } else {
      // open file
      this.selectedItem.emit(item);
    }
  }

  private async openFolder(path: string = './'): Promise<Array<FileEntry>> {
    return await readDir(path);
  }

}

import { Component, Input, OnInit } from '@angular/core';
import { FileEntry } from '@tauri-apps/api/fs';

@Component({
  selector: 'app-file-explorer-item',
  templateUrl: './file-explorer-item.component.html',
  styleUrls: ['./file-explorer-item.component.less']
})
export class FileExplorerItemComponent implements OnInit {
  @Input() item: FileEntry | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}

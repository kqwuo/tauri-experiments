import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FileEntry, readTextFile } from '@tauri-apps/api/fs';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.less']
})
export class EditorComponent implements OnInit, OnChanges {
  @Input() selectedItem: FileEntry | undefined;
  public textFile: string;
  public editorOptions = {theme: 'vs-dark', language: 'text'};

  constructor() {
    this.textFile = '';
  }

  async ngOnInit(): Promise<void> {
    if (this.selectedItem)
      await this.readFile(this.selectedItem)
  }

  async ngOnChanges(): Promise<void> {
    if (this.selectedItem)
      await this.readFile(this.selectedItem)
  }

  async readFile(file: FileEntry) {
    console.debug(file.name);
    this.textFile = await readTextFile(file.path);
    console.debug(this.textFile);
  }

}

import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FileEntry, readTextFile } from '@tauri-apps/api/fs';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.less']
})
export class EditorComponent implements OnInit, OnChanges {
  @Input() openRoute: string | undefined;
  @Input() selectedItem: FileEntry | undefined;
  public textFile: string;
  public editorOptions = {theme: 'vs-dark', language: 'text'};

  constructor() {
    this.textFile = '';
  }

  async ngOnInit(): Promise<void> {
    if (this.selectedItem)
      await this.readFile(this.selectedItem)
    else if(this.openRoute)
      await this.readFile(this.openRoute);
  }

  async ngOnChanges(): Promise<void> {
    if (this.selectedItem)
      await this.readFile(this.selectedItem)
  }

  async readFile(file: FileEntry | string) {
    if (file as FileEntry)
      this.textFile = await readTextFile((file as FileEntry).path);
    else
      this.textFile = await readTextFile(file as string);
    console.debug(this.textFile);
  }

}

import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from "@angular/core";
import { LMarkdownEditorModule } from "ngx-markdown-editor";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-text-editor",
  standalone: true,
  imports: [LMarkdownEditorModule, FormsModule],
  template: `
    <md-editor
      #editor
      [(ngModel)]="content"
      (ngModelChange)="contentChanged(content)"
      [options]="{showPreviewPanel: true}"
    ></md-editor>
  `
})
export class TextEditorComponent implements AfterViewInit {
  @ViewChild("editor", { static: true, read: ElementRef }) editor!: ElementRef;

  @Input() content = "";
  @Output("content-changed") contentChange = new EventEmitter<string>();

  ngAfterViewInit() {
    const textarea = this.editor.nativeElement.querySelector("textarea");
    if (textarea) {
      textarea.focus();
    }
  }

  contentChanged(content: string) {
    this.contentChange.emit(content);
  }
}

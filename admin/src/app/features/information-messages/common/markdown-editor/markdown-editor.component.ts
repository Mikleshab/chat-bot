import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LMarkdownEditorModule } from 'ngx-markdown-editor';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-markdown-editor',
  standalone: true,
  imports: [LMarkdownEditorModule, FormsModule],
  templateUrl: './markdown-editor.component.html',
  styleUrl: './markdown-editor.component.scss'
})
export class MarkdownEditorComponent {
  @Input() content = '';
  @Output('content-changed') contentChange = new EventEmitter<string>();

  contentChanged(content: string) {
    this.contentChange.emit(content);
  }
}

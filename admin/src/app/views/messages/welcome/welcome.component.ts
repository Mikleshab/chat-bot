import { AfterViewInit, Component } from '@angular/core';
import * as ace from 'ace-builds';
import {
  CardBodyComponent,
  CardComponent,
  CardHeaderComponent,
  RowComponent
} from '@coreui/angular';
import { WelcomeMessageComponent } from '../../../features/information-messages/welcome-message/welcome-message.component';

@Component({
  templateUrl: 'welcome.component.html',
  standalone: true,
  imports: [
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    RowComponent,
    WelcomeMessageComponent
  ]
})
export class WelcomeComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    this.setEditorOptions();
  }

  setEditorOptions() {
    const element = document.querySelector('md-editor .ace_editor');
    const editor = ace.edit(element!);
    editor.setOptions({
      fontSize: '16px'
    });
  }
}

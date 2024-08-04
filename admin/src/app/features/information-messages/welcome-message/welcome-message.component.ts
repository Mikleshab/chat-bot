import { Component } from '@angular/core';
import { MarkdownEditorComponent } from '../common/markdown-editor/markdown-editor.component';
import {
  GetWelcomeMessageGQL,
  UpdateWelcomeMessageGQL
} from '../../../graphql/generated';
import { debounceTime, map, take } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-welcome-message',
  standalone: true,
  imports: [MarkdownEditorComponent, AsyncPipe, NgIf],
  templateUrl: './welcome-message.component.html',
  styleUrls: ['./welcome-message.component.scss']
})
export class WelcomeMessageComponent {
  welcomeMessage$ = this.getWelcomeMessageGQL
    .watch()
    .valueChanges.pipe(map(({ data }) => data.getWelcomeMessage));

  private textChange$ = new Subject<string>();

  constructor(
    private readonly getWelcomeMessageGQL: GetWelcomeMessageGQL,
    private readonly updateWelcomeMessageGQL: UpdateWelcomeMessageGQL
  ) {
    this.textChange$.pipe(debounceTime(2000)).subscribe(text => {
      this.updateWelcomeMessageGQL
        .mutate({ text })
        .pipe(take(1))
        .subscribe(response => console.log('response', response));
    });
  }

  textChanged(text: string) {
    console.log('text: ', text);
    this.textChange$.next(text);
  }
}

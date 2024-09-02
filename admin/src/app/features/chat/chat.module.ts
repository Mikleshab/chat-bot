import { NgModule } from "@angular/core";
import { SwitchChatComponent } from "./components/switch-chat/switch-chat.component";
import { AnnouncementsModule } from "./components/announcements/announcements.module";
import { ContainerComponent, FormSelectDirective } from "@coreui/angular";


@NgModule({
  declarations: [SwitchChatComponent],
  exports: [
    SwitchChatComponent
  ],
  imports: [AnnouncementsModule, ContainerComponent, FormSelectDirective]
})
export class ChatModule {
}

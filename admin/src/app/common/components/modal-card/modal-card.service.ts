import { ComponentRef, EnvironmentInjector, Injectable, Injector, Type, ViewContainerRef } from "@angular/core";
import { Observable, Subject, switchMap } from "rxjs";
import { ModalCardComponent } from "./modal-card.component";
import { EmbedComponentInterface } from "./embedded-component.interface";

@Injectable({
  providedIn: "root"
})
export class ModalService {
  private modalRef!: ComponentRef<ModalCardComponent>;
  private responseSubject: Subject<any> | null = null;

  constructor(
    private injector: Injector,
    private environmentInjector: EnvironmentInjector
  ) {}

  open<R>(viewContainerRef: ViewContainerRef, component: Type<EmbedComponentInterface<R>>, params: {
    title: string;
    size?: "sm" | "lg" | "xl";
  }, data: any = {}): Observable<R> {
    this.responseSubject = new Subject<R>();

    this.modalRef = viewContainerRef.createComponent(ModalCardComponent, {
      injector: this.injector,
      environmentInjector: this.environmentInjector
    });

    this.modalRef.instance.title = params.title;
    this.modalRef.instance.size = params.size || "lg";

    const embeddedComponentRef = this.modalRef.instance.bodyContainer.createComponent<
      EmbedComponentInterface<R>
    >(component, {
      injector: this.injector,
      environmentInjector: this.environmentInjector
    });

    Object.keys(data).forEach(key => {
      embeddedComponentRef.instance[key] = data[key];
    });

    this.modalRef.instance.close.pipe(
      switchMap(() => embeddedComponentRef.instance.close())
    ).subscribe((response) => {
      this.responseSubject!.next(response);
      this.close();
    });

    this.modalRef.instance.cancel.subscribe(() => {
      this.close();
    });

    return this.responseSubject.asObservable() as Observable<R>;
  }

  close() {
    if (this.modalRef) {
      this.modalRef.destroy();
    }

    if (this.responseSubject) {
      this.responseSubject.complete();
      this.responseSubject = null;
    }
  }
}

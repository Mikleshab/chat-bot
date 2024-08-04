import { Component, computed, DestroyRef, inject, Input } from "@angular/core";
import {
  BreadcrumbRouterComponent,
  ColorModeService,
  ContainerComponent,
  DropdownComponent,
  DropdownItemDirective,
  DropdownMenuDirective,
  DropdownToggleDirective,
  HeaderComponent,
  HeaderNavComponent,
  HeaderTogglerDirective,
  NavItemComponent,
  NavLinkDirective,
  SidebarToggleDirective
} from "@coreui/angular";
import { ActivatedRoute, RouterLink, RouterLinkActive } from "@angular/router";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { delay, filter, map, tap } from "rxjs/operators";
import { IconDirective } from "@coreui/icons-angular";
import { NgTemplateOutlet } from "@angular/common";

@Component({
  selector: "app-default-header",
  templateUrl: "./default-header.component.html",
  standalone: true,
  imports: [
    ContainerComponent,
    SidebarToggleDirective,
    HeaderTogglerDirective,
    IconDirective,
    HeaderNavComponent,
    NavItemComponent,
    NavLinkDirective,
    RouterLink,
    RouterLinkActive,
    NgTemplateOutlet,
    BreadcrumbRouterComponent,
    DropdownComponent,
    DropdownToggleDirective,
    DropdownMenuDirective,
    DropdownItemDirective
  ]
})
export class DefaultHeaderComponent extends HeaderComponent {

  readonly #activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  readonly #colorModeService = inject(ColorModeService);
  readonly colorMode = this.#colorModeService.colorMode;
  readonly #destroyRef: DestroyRef = inject(DestroyRef);

  readonly colorModes = [
    { name: "light", text: "Light", icon: "cilSun" },
    { name: "dark", text: "Dark", icon: "cilMoon" },
    { name: "auto", text: "Auto", icon: "cilContrast" }
  ];

  readonly icons = computed(() => {
    const currentMode = this.colorMode();
    return this.colorModes.find(mode => mode.name === currentMode)?.icon ?? "cilSun";
  });

  constructor() {
    super();
    this.#colorModeService.localStorageItemName.set("coreui-free-angular-admin-template-theme-default");
    this.#colorModeService.eventName.set("ColorSchemeChange");

    this.#activatedRoute.queryParams
      .pipe(
        delay(1),
        map(params => (params["theme"]?.match(/^[A-Za-z0-9\s]+/)?.[0] as string)),
        filter(theme => ["dark", "light", "auto"].includes(theme)),
        tap(theme => {
          this.colorMode.set(theme);
        }),
        takeUntilDestroyed(this.#destroyRef)
      )
      .subscribe();
  }

  @Input() sidebarId = "sidebar1";
}

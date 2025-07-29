import {Directive, ElementRef, HostListener, Injector, Input, TemplateRef} from '@angular/core';
import {Overlay, OverlayRef} from "@angular/cdk/overlay";
import {TooltipComponent} from "./tooltip.component";
import {ComponentPortal} from "@angular/cdk/portal";
import {TOOLTIP_DATA} from "../const";
import {PositionUnion} from "../models/types";

@Directive({
  selector: '[libTooltip]',
  standalone: true
})
export class TooltipDirective {
  @Input() tooltipContent!: string | TemplateRef<any>;
  @Input() width!: string;
  @Input() height!: string;
  @Input() position: PositionUnion = "start";
  @Input() tmpData?: any;
  private overlayRef!: OverlayRef;
  constructor(private readonly overlay: Overlay,
              private readonly injector: Injector,
              private readonly _el:ElementRef) { }
  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.attachTooltip();
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    if(this.overlayRef?.hasAttached()) {
      this.overlayRef.dispose();
    }
  }

  attachTooltip(): void {
    if(!this.tooltipContent || !this.overlayRef?.hasAttached()) return;
    this.overlayRef = this.overlay.create(
      {
        positionStrategy: this.positionStrategy(this.position)
      }
    );
    const injector = Injector.create(
      {
        parent: this.injector,
        providers: [
          {
            provide: TOOLTIP_DATA,
            useValue: {
              tooltipContent: this.tooltipContent,
              width: this.width,
              height: this.height,
              tmpData: this.tmpData,
            }
          }
        ]
      }
    )
    const portal = new ComponentPortal(
      TooltipComponent,
      null,
      injector
    )
    this.overlayRef.attach(portal);
  }

  positionStrategy(position: PositionUnion){
    return this.overlay
      .position()
      .flexibleConnectedTo(this._el)
      .withPositions(
        [
          {
            originX: position,
            originY: "top",
            overlayX: position,
            overlayY: "bottom",
            panelClass: "top"
          }
        ]
      )
  }
}

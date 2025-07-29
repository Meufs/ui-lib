import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Inject,
  OnInit,
  TemplateRef
} from '@angular/core';
import {TOOLTIP_DATA} from "../const";
import {TooltipData} from "../models/interfaces";
import {NgTemplateOutlet} from "@angular/common";

@Component({
  selector: 'lib-tooltip',
  standalone: true,
  imports: [
    NgTemplateOutlet
  ],
  templateUrl: './tooltip.component.html',
  styleUrl: './tooltip.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TooltipComponent implements OnInit {
    contentString!:string;
    contentTemplate!: TemplateRef<any>;
    isString!:boolean;
    @HostBinding('style.width') tooltipWidth!: string;

    constructor(@Inject(TOOLTIP_DATA) public data:TooltipData) {
    }

    ngOnInit(): void {
      this.initContent();
    }

    initContent(): void {
      const {tooltipContent, width} = this.data;
      this.tooltipWidth = width || "fit-content";
      this.isString = !(tooltipContent instanceof TemplateRef);
      this.isString && (this.contentString = tooltipContent as string);
      !this.isString && (this.contentTemplate = tooltipContent as TemplateRef<any>)
    }
}

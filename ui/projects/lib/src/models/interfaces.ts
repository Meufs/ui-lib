import {TemplateRef} from "@angular/core";

export interface TooltipData {
  tooltipContent: string | TemplateRef<any>;
  width: string;
  height: string;
  tmpData: unknown;
}

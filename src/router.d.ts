import type { DefineComponent } from "vue";
import "vue-router";

declare module "vue-router" {
  interface RouteMeta {
    title?: string;
    icon?: DefineComponent | string;
    showInSidebar?: boolean;
    requireAuth?: boolean;
    roles?: string[];
    badge?: number;
    guestOnly?: boolean;
  }
}

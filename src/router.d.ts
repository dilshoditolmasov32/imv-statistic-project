import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    title?: string
    icon?: string
    showInSidebar?: boolean
    requireAuth?: boolean
    roles?: string[] 
    badge?: number
    guestOnly?: boolean
  }
}

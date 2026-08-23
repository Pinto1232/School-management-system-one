export type DashboardTone = 'neutral' | 'brand' | 'info' | 'success' | 'warning' | 'danger'

export interface AppNavigationItem {
  label: string
  to: string
  icon: string
  badge?: number | string
  disabled?: boolean
  exact?: boolean
  target?: '_self' | '_blank'
}

export interface WordPressSidebarLink {
  id: number
  key: string
  label: string
  path: string
  icon: string
  roles: string[]
  parent_id: number | null
  position: number
  enabled: boolean
  target: '_self' | '_blank'
}

export interface WordPressSidebarResponse {
  data: WordPressSidebarLink[]
  meta: {
    total: number
    role: string | null
    tree: boolean
    include_disabled: boolean
  }
}

export type TableAlignment = 'start' | 'center' | 'end'

export interface DataTableColumn {
  key: string
  label: string
  align?: TableAlignment
  sortable?: boolean
  width?: string
}

export type DataTableRow = Record<string, unknown>
export type SortDirection = 'asc' | 'desc'

export type AttendanceStatus = 'present' | 'late' | 'absent' | 'excused'

export interface AttendanceStudent {
  id: string
  name: string
  secondary?: string
  image?: string
}

export interface TimetableDay {
  key: string
  label: string
  date?: string
}

export interface TimetableEntry {
  id: string
  day: string
  start: string
  end?: string
  title: string
  subtitle?: string
  room?: string
  tone?: DashboardTone
}

export type ToastTone = 'info' | 'success' | 'warning' | 'error'

export interface ToastMessage {
  id: string
  title: string
  description?: string
  tone: ToastTone
  duration: number
}

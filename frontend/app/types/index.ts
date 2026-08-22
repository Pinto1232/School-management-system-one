export interface User {
  id?: string
  _id?: string
  firstName: string
  lastName: string
  email: string
  role?: string
  image?: string
}

export interface AuthResponse {
  message: string
  token: string
  user: User
}

export interface PackagePlan {
  _id?: string
  id?: string | number
  name: string
  price: number
  description?: string
  features?: string[] | Record<string, boolean>
  image?: string
  [key: string]: unknown
}

export interface ContentImage {
  path: string
}

export interface SiteContent {
  _id?: string
  title?: string
  subTitle?: string
  subHeadings?: string
  description?: string
  buttonsTitle?: string[]
  images?: ContentImage[]
  section?: string
}

export interface ApiErrorShape {
  data?: {
    error?: string
    message?: string
    errors?: Array<{ msg?: string }>
  }
  message?: string
  statusCode?: number
}

export interface SchoolPerson {
  id: string
  name: string
  email: string
  role: string
  group: string
  attendance: number
  status: 'Active' | 'Pending' | 'Inactive'
  image?: string
}

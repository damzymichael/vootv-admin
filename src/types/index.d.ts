export interface Audio<T = any, D = any> {
  id: string
  title: string
  link: string
  size: number
  cloudId: string
  timeRecorded: Date
  preacher: string
  createdAt: Date
  updatedAt: Date
  streams: T[]
  downloads: D[]
}

export interface User {
  id: string
  fullName: string
  email: string
  phoneNumber: string
  location?: { state: string }
}

export interface Location {
  id: string
  country: string
  state: string
  address: string
  pastorInCharge: string
}

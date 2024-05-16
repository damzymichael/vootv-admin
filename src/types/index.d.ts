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
  services?: Service[]
}

export interface Service {
  day: string
  theme: string
  time: string
  startTimes: string[]
}

export interface Login {
  email: string
  password: string
}

export interface Program {
  theme: string
  type: 'PROGRAM' | 'EVENT'
  startTime: Date
  endTime: Date
  banner: { secure_url: string }
  additionalInfo: string
  location: Pick<Location, 'country' | 'state'>
}

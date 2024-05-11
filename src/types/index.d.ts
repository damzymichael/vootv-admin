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

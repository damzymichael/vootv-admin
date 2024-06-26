import type { AxiosError } from 'axios'

declare module '@tanstack/vue-query' {
  interface Register {
    defaultError: AxiosError<string>
  }
}

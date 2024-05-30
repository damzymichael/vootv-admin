import { ref } from 'vue'
import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query'
import axios from 'axios'
import type { AxiosError, AxiosResponse } from 'axios'
import type { Audio, User, Location, Service, Login, Program } from '@/types'
import { useToast } from 'vue-toastification'
import { useRouter } from 'vue-router'

// export function useAxios() {
//   const loading = ref(0)
//   const instance = axios.create({
//     baseURL: import.meta.env.VITE_API_URL,
//     withCredentials: true,
//     onDownloadProgress: (event) => {
//       const percentCompleted = event.total ? Math.round((event.loaded * 100) / event.total) : 0
//       console.log(percentCompleted)
//       loading.value = percentCompleted
//     },
//     headers: { 'Access-Control-Allow-Orign': '*' }
//   })

//   return { instance, loading }
// }

export const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: { 'Access-Control-Allow-Orign': '*' }
})

const useError = () => {
  const $toast = useToast()
  const queryClient = useQueryClient()
  const router = useRouter()
  return (error: AxiosError<string>) => {
    if (error.response?.status === 401) {
      queryClient.clear()
      router.replace('/')
    }
    $toast.error(error.response?.data || error.message)
    return false
  }
}

// Todo Cache authentication request
//* User requests
export function useUsers() {
  const errorHandler = useError()
  // const { instance } = useAxios()

  return useQuery<User[]>({
    queryKey: ['users'],
    queryFn: async () => {
      const { data } = await instance.get('/user')
      return data
    },
    throwOnError: (error) => errorHandler(error)
  })
}

export function useLogin() {
  const $toast = useToast()
  const router = useRouter()
  // const { instance } = useAxios()

  return useMutation<AxiosResponse<string>, AxiosError<string>, Login>({
    mutationFn: (data) => instance.post('/user/login?admin=true', data),
    onSuccess: (data) => {
      $toast.success(data.data, { timeout: 3000 })
      router.replace('/overview')
    },
    onError: (error) => $toast.error(error.response?.data as string)
  })
}

export function useLogout() {
  const $toast = useToast()
  const router = useRouter()
  const queryClient = useQueryClient()
  // const { instance } = useAxios()

  return useMutation<AxiosResponse<string>, AxiosError<string>>({
    mutationFn: () => instance.post('/user/logout'),
    onSuccess: (data) => {
      $toast.success(data.data, { timeout: 3000 })
      queryClient.clear()
      router.replace('/')
    },
    onError: (error) => $toast.error(error.response?.data as string)
  })
}

export function useUser(id: string) {
  const errorHandler = useError()
  // const { instance } = useAxios()

  return useQuery<User>({
    queryKey: ['users', id],
    queryFn: async () => {
      const { data } = await instance.get('/user/' + id)
      return data
    },
    throwOnError: (error) => errorHandler(error)
  })
}
//* User requests

//* Audio Requests
export function useAudiosQuery() {
  const errorHandler = useError()
  // const { instance } = useAxios()

  return useQuery<Audio[]>({
    queryKey: ['audios'],
    queryFn: async () => {
      const { data } = await instance.get('/audio')
      return data
    },
    throwOnError: (error) => errorHandler(error)
  })
}

export const useAddAudio = () => {
  const queryClient = useQueryClient()
  const $toast = useToast()
  const errorHandler = useError()
  // const { instance } = useAxios()

  return useMutation<AxiosResponse<string>, AxiosError<string>, FormData>({
    mutationFn: (formData) => instance.post('/audio', formData),
    onSuccess: (data) => {
      $toast.success(data.data, { timeout: 3000 })
      queryClient.invalidateQueries({ queryKey: ['audios'] })
    },
    onError: (error) => errorHandler(error)
  })
}

enum Status {
  COMPLETED,
  ONGOING,
  FAILED
}
type Stream = { id: string; user: { fullName: string }; createdAt: Date; duration: number }
type Download = { id: string; user: { fullName: string }; createdAt: Date; status: Status }

export function useAudioQuery(id: string) {
  const errorHandler = useError()
  // const { instance } = useAxios()

  return useQuery<Audio<Stream, Download>>({
    queryKey: ['audios', id],
    queryFn: async () => {
      const { data } = await instance.get('/audio/' + id)
      return data
    },
    throwOnError: (error) => errorHandler(error)
  })
}

export function useDeleteAudio(id: string) {
  // const { instance } = useAxios()

  const queryClient = useQueryClient()
  const $toast = useToast()
  const router = useRouter()

  const errorHandler = useError()

  return useMutation<AxiosResponse<string>, AxiosError<string>>({
    mutationFn: () => instance.delete('/audio/' + id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['audios'] })
      $toast.success(data.data, { timeout: 3000 })
      router.push({ path: '/sermon', replace: true })
    },
    onError: (error) => errorHandler(error)
  })
}
//* Audio Requests

//* Location requests
type LocationBody = Omit<Location, 'id'>
export function useAddLocation() {
  // const { instance } = useAxios()

  const $toast = useToast()
  const queryClient = useQueryClient()
  const errorHandler = useError()

  return useMutation<AxiosResponse<string>, AxiosError<string>, LocationBody>({
    mutationFn: (location) => instance.post('/location', location),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['locations'] })
      $toast.success(data.data, { timeout: 3000 })
    },
    onError: (error) => errorHandler(error)
  })
}

export function useLocations() {
  // const { instance } = useAxios()

  const errorHandler = useError()
  return useQuery<Location[]>({
    queryKey: ['locations'],
    queryFn: async () => {
      const { data } = await instance.get('/location')
      return data
    },
    throwOnError: (error) => errorHandler(error)
  })
}

export function useLocation(id: string) {
  // const { instance } = useAxios()

  const errorHandler = useError()

  return useQuery<Location>({
    queryKey: ['locations', id],
    queryFn: async () => {
      const { data } = await instance.get('/location/' + id)
      return data
    },
    throwOnError: (error) => errorHandler(error)
  })
}

type Address = Omit<Location, 'id' | 'pastorInCharge'>
export function useUpdateLocation(id: string) {
  // const { instance } = useAxios()

  const $toast = useToast()
  const queryClient = useQueryClient()
  const errorHandler = useError()

  return useMutation<AxiosResponse<string>, AxiosError<string>, Address>({
    mutationFn: (data) => instance.patch('/location/' + id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['locations', id] })
      $toast.success(data.data, { timeout: 3000 })
    },
    onError: (error) => errorHandler(error)
  })
}
//* Location requests

//*Service requests
type ServiceBody = Omit<Service, 'time'>
export function useAddService(id: string) {
  // const { instance } = useAxios()

  const $toast = useToast()
  const queryClient = useQueryClient()
  const errorHandler = useError()

  return useMutation<AxiosResponse<string>, AxiosError<string>, ServiceBody>({
    mutationFn: (data) => instance.post('/service/' + id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['locations', id] })
      $toast.success(data.data, { timeout: 3000 })
    },
    onError: (error) => errorHandler(error)
  })
}
//*Service requests

//* Programs request
export function useAddProgram() {
  // const { instance } = useAxios()

  const router = useRouter()
  const queryClient = useQueryClient()
  const errorHandler = useError()
  const $toast = useToast()

  return useMutation<AxiosResponse<string>, AxiosError<string>, FormData>({
    mutationFn: (formData) => instance.post('/program', formData),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['programs'] })
      $toast.success(data.data, { timeout: 3000 })
      router.replace('/programs')
    },
    onError: (error) => errorHandler(error)
  })
}

export function usePrograms() {
  // const { instance } = useAxios()

  const errorHandler = useError()
  return useQuery<Program[]>({
    queryKey: ['programs'],
    queryFn: async () => {
      const { data } = await instance.get('/program')
      return data
    },
    throwOnError: (error) => errorHandler(error)
  })
}

export function useDeleteProgram() {
  // const { instance } = useAxios()
  const queryClient = useQueryClient()
  const errorHandler = useError()
  const $toast = useToast()

  return useMutation<AxiosResponse<string>, AxiosError<string>, string>({
    mutationFn: (id) => instance.delete('/program/' + id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['programs'] })
      $toast.success(data.data, { timeout: 3000 })
    },
    onError: (error) => errorHandler(error)
  })
}

type Params = { id: string; formData: FormData }

export function useUpdateProgram() {
  // const { instance } = useAxios()
  const queryClient = useQueryClient()
  const errorHandler = useError()
  const $toast = useToast()

  return useMutation<AxiosResponse<string>, AxiosError<string>, Params>({
    mutationFn: ({ id, formData }) => instance.patch('/program/' + id, formData),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['programs'] })
      $toast.success(data.data, { timeout: 3000 })
    },
    onError: (error) => errorHandler(error)
  })
}
//* Programs request

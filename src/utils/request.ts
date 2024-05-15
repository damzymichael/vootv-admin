import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query'
import axios from 'axios'
import type { AxiosError, AxiosResponse } from 'axios'
import type { Audio, User, Location, Service, Login } from '@/types'
import { useToast } from 'vue-toastification'
import { useRouter } from 'vue-router'

const instance = axios.create({ baseURL: import.meta.env.VITE_API_URL, withCredentials: true })

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

export function useLogin() {
  const $toast = useToast()
  const router = useRouter()

  return useMutation<AxiosResponse<string>, AxiosError<string>, Login>({
    mutationFn: (data) => instance.post('/user/login?admin=true', data),
    onSuccess: (data) => {
      $toast.success(data.data, { timeout: 4000 })
      router.replace('/overview')
    },
    onError: (error) => $toast.error(error.response?.data as string)
  })
}

//* Audio Requests
export function useAudiosQuery() {
  const errorHandler = useError()

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

  return useMutation<AxiosResponse<string>, AxiosError<string>, FormData>({
    mutationFn: (formData) => instance.post('/audio', formData),
    onSuccess: (data) => {
      $toast.success(data.data, { timeout: 4000 })
      queryClient.invalidateQueries({ queryKey: ['audios'] })
    },
    onError: (error) => errorHandler(error)
  })
}

export function useAudioQuery(id: string) {
  const errorHandler = useError()

  return useQuery<Audio>({
    queryKey: ['audios', id],
    queryFn: async () => {
      const { data } = await instance.get('/audio/' + id)
      return data
    },
    throwOnError: (error) => errorHandler(error)
  })
}

export function useDeleteAudio(id: string) {
  const queryClient = useQueryClient()
  const $toast = useToast()
  const router = useRouter()

  const errorHandler = useError()

  return useMutation<AxiosResponse<string>, AxiosError<string>>({
    mutationFn: () => instance.delete('/audio/' + id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['audios'] })
      $toast.success(data.data, { timeout: 4000 })
      router.push({ path: '/sermon', replace: true })
    },
    onError: (error) => errorHandler(error)
  })
}
//* Audio Requests

//* User requests
export function useUsers() {
  const errorHandler = useError()

  return useQuery<User[]>({
    queryKey: ['users'],
    queryFn: async () => {
      const { data } = await instance.get('/user')
      return data
    },
    throwOnError: (error) => errorHandler(error)
  })
}

export function useUser(id: string) {
  const errorHandler = useError()

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

//* Location requests
type LocationBody = Omit<Location, 'id'>
export function useAddLocation() {
  const $toast = useToast()
  const queryClient = useQueryClient()
  const errorHandler = useError()

  return useMutation<AxiosResponse<string>, AxiosError<string>, LocationBody>({
    mutationFn: (location) => instance.post('/location', location),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['locations'] })
      $toast.success(data.data, { timeout: 4000 })
    },
    onError: (error) => errorHandler(error)
  })
}

export function useLocations() {
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
  const $toast = useToast()
  const queryClient = useQueryClient()
  const errorHandler = useError()

  return useMutation<AxiosResponse<string>, AxiosError<string>, Address>({
    mutationFn: (data) => instance.patch('/location/' + id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['locations', id] })
      $toast.success(data.data, { timeout: 4000 })
    },
    onError: (error) => errorHandler(error)
  })
}
//* Location requests

//*Service requests
type ServiceBody = Omit<Service, 'time'>
export function useAddService(id: string) {
  const $toast = useToast()
  const queryClient = useQueryClient()
  const errorHandler = useError()

  return useMutation<AxiosResponse<string>, AxiosError<string>, ServiceBody>({
    mutationFn: (data) => instance.post('/service/' + id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['locations', id] })
      $toast.success(data.data, { timeout: 4000 })
    },
    onError: (error) => errorHandler(error)
  })
}

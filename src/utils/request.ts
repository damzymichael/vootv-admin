import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query'
import type { UseQueryReturnType } from '@tanstack/vue-query'
import axios from 'axios'
import type { AxiosError, AxiosResponse } from 'axios'
import type { Audio } from '@/types'
import { useToast } from 'vue-toastification'
import { useRouter } from 'vue-router'

const instance = axios.create({ baseURL: import.meta.env.VITE_API_URL })

export function useAudiosQuery(): UseQueryReturnType<Audio[], AxiosError<string>> {
  return useQuery({
    queryKey: ['audios'],
    queryFn: async () => {
      const { data } = await instance.get('/audio')
      return data
    }
  })
}

export const useAddAudio = () => {
  const queryClient = useQueryClient()
  const $toast = useToast()
  return useMutation<AxiosResponse<string>, AxiosError<string>, FormData>({
    mutationFn: (formData) => instance.post('/audio', formData),
    onSuccess: (data) => {
      $toast.success(data.data, { timeout: 4000 })
      queryClient.invalidateQueries({ queryKey: ['audios'] })
    },
    onError: (error) => $toast.error(error.response?.data as string)
  })
}

export function useAudioQuery(id: string): UseQueryReturnType<Audio, AxiosError<string>> {
  return useQuery({
    queryKey: ['audios', id],
    queryFn: async () => {
      const { data } = await instance.get('/audio/' + id)
      return data
    }
  })
}

export function useDeleteAudio(id: string) {
  const queryClient = useQueryClient()
  const $toast = useToast()
  const router = useRouter()
  return useMutation<AxiosResponse<string>, AxiosError<string>>({
    mutationFn: () => instance.delete('/audio/' + id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['audios'] })
      $toast.success(data.data, { timeout: 4000 })
      router.push({ path: '/sermon', replace: true })
    },
    onError: (error) => $toast.error(error.response?.data as string)
  })
}

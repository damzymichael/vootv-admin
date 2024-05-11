import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query'
import type { UseQueryReturnType } from '@tanstack/vue-query'
import axios from 'axios'
import type { AxiosError, AxiosResponse } from 'axios'
import type { Audio } from '@/types/Audio'
import { useToast } from 'vue-toast-notification'

export function useAudioQuery(): UseQueryReturnType<Audio[], AxiosError<string>> {
  return useQuery({
    queryKey: ['audios'],
    queryFn: async (): Promise<Audio[]> => {
      const { data } = await axios.get('http://localhost:4000/audio')
      return data
    }
  })
}

export const useAddAudio = () => {
  const queryClient = useQueryClient()
  const $toast = useToast()
  return useMutation<AxiosResponse<string>, Error, FormData>({
    mutationFn: (formData) => axios.post('http://localhost:4000/audio', formData),
    onSuccess: (data) => {
      $toast.success(data.data, { duration: 3000 })
      queryClient.invalidateQueries({ queryKey: ['audios'] })
    }
  })
}

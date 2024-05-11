<script setup lang="ts">
import { useAudioQuery, useAddAudio } from '@/utils/request'
import { useToast } from 'vue-toast-notification'
import Modal from '@/components/Modal.vue'
import Button from '@/components/Button.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { audios } from '@/lib/index'

const router = useRouter()
const $toast = useToast()
const dateValue = ref(new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60_000))

// const { isPending, data, error } = useAudioQuery()

const { mutateAsync, isPending: uploading } = useAddAudio()

const handleSubmit = async (e: Event) => {
  const formData = new FormData(e.currentTarget as HTMLFormElement)
  for (const [, value] of formData.entries()) {
    if (!value.toString().trim()) {
      $toast.warning('Missing input')
      return
    }
  }
  try {
    await mutateAsync(formData)
    document.getElementById('closeModal')?.click()
  } catch (error) {}
}
</script>

<template>
  <!-- <p class="mb-3 text-bold">Actual audio number: {{ data?.length }}</p> -->
  <header class="flex justify-between items-center mb-2">
    <h1 class="sm:text-lg font-semibold">Audio Sermons</h1>
    <button onclick="my_modal_2.showModal()" class="btn btn-xs sm:btn-sm md:btn-md" role="button">
      Upload Audio
    </button>
  </header>
  <div class="overflow-x-auto">
    <table class="table min-w-[700px]">
      <thead>
        <tr>
          <th></th>
          <th>Title</th>
          <th>Preacher</th>
          <th>Duration</th>
          <th>Streams</th>
          <th>Downloads</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(audio, index) in audios"
          :key="index"
          class="hover cursor-pointer"
          @click="router.push('/audios/1')"
        >
          <th>{{ index + 1 }}</th>
          <td>{{ audio.title }}</td>
          <td>{{ audio.preacher }}</td>
          <td>{{ audio.duration }}</td>
          <td>{{ audio.streams }}</td>
          <td>{{ audio.downloads }}</td>
        </tr>
      </tbody>
    </table>
  </div>

  <Modal title="Upload Audio" id="my_modal_2">
    <form class="card-body p-1 sm:p-4" @submit.prevent="handleSubmit">
      <div class="form-control gap-4">
        <input
          type="text"
          placeholder="Preacher"
          class="input input-bordered"
          required
          name="title"
        />
        <input
          type="text"
          placeholder="Title"
          class="input input-bordered"
          required
          name="preacher"
        />
        <input type="file" class="file-input input-bordered" accept=".mp3,audio/*" name="audio" />
        <input
          type="datetime-local"
          class="input input-bordered"
          v-model="dateValue"
          name="timeRecorded"
        />
      </div>
      <div class="form-control mt-4">
        <button class="btn btn-primary">Upload</button>
      </div>
    </form>
    <button id="closeModal" onclick="my_modal_2.close()"></button>
  </Modal>
</template>

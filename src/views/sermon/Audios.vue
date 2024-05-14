<script setup lang="ts">
import { useAudiosQuery, useAddAudio } from '@/utils/request'
import { useToast } from 'vue-toastification'
import Modal from '@/components/Modal.vue'
import Button from '@/components/Button.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const $toast = useToast()
const dateValue = ref(new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60_000))

const { isPending, data, error } = useAudiosQuery()

const { mutateAsync, isPending: uploading } = useAddAudio()

const handleSubmit = async (e: Event) => {
  const form = e.currentTarget as HTMLFormElement
  const formData = new FormData(form)
  for (const [key, value] of formData.entries()) {
    const trimmedValue = value.toString().trim()
    if (!trimmedValue) {
      $toast.warning('Missing input')
      return
    }
    if (typeof value != 'object') formData.set(key, trimmedValue)
  }
  await mutateAsync(formData)
  form.reset()
  document.getElementById('closeModal')?.click()
}
</script>

<template>
  <header class="flex justify-between items-center mb-2">
    <h1 class="sm:text-lg font-semibold">Audio Sermons</h1>
    <button onclick="my_modal_2.showModal()" class="btn btn-sm md:btn-md" role="button">
      Upload Audio
    </button>
  </header>
  <div class="overflow-x-auto">
    <div v-if="isPending" class="flex gap-3 flex-col items-center justify-center h-32">
      <span class="loading loading-ring loading-lg"></span>
      Fetching Audios
    </div>
    <div v-else-if="error">
      <p>{{ error }}</p>
    </div>
    <div v-else>
      <div v-if="data && data.length < 1">
        <p class="text-center font-semibold my-14">No audio, click upload to add new audio</p>
      </div>
      <div v-else>
        <table class="table min-w-[700px]">
          <thead>
            <tr>
              <th></th>
              <th>Title</th>
              <th>Preacher</th>
              <th>Date</th>
              <th>Duration</th>
              <th>Streams</th>
              <th>Downloads</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(audio, index) in data"
              :key="index"
              class="hover cursor-pointer"
              @click="router.push(`/audios/${audio.id}`)"
            >
              <th>{{ index + 1 }}</th>
              <td>{{ audio.title }}</td>
              <td>{{ audio.preacher }}</td>
              <td>{{ new Date(audio.timeRecorded).toLocaleDateString() }}</td>
              <td>{{ 'N/A' }}</td>
              <td>{{ 'N/A' }}</td>
              <td>{{ 'N/A' }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <Modal title="Upload Audio" id="my_modal_2">
    <form id="audio" class="card-body p-1 sm:p-4" @submit.prevent="handleSubmit">
      <div class="form-control gap-4">
        <input
          type="text"
          placeholder="Preacher"
          class="input input-bordered"
          required
          name="preacher"
        />
        <input type="text" placeholder="Title" class="input input-bordered" required name="title" />
        <input type="file" class="file-input input-bordered" accept=".mp3,audio/*" name="audio" />
        <input
          type="datetime-local"
          class="input input-bordered"
          v-model="dateValue"
          name="timeRecorded"
        />
      </div>
      <div class="form-control mt-4">
        <Button class="btn btn-primary" :loading="uploading">Upload</Button>
      </div>
    </form>
    <button id="closeModal" onclick="my_modal_2.close()"></button>
  </Modal>
</template>

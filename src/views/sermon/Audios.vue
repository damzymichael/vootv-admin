<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import VueDatePicker from '@vuepic/vue-datepicker'

const router = useRouter()

const dateValue = ref(new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60_000))

watch(dateValue, (newValue) => {
  console.log(newValue)
})

// const picked = ref(new Date())

interface Audio {
  title: string
  preacher: string
  duration: `${number} ${'min' | 'hr'}`
  streams: number
  downloads: number
}

const audios: Audio[] = [
  {
    title: 'Prayer Altar',
    preacher: 'Apostle Arome Osayi',
    duration: '54 min',
    streams: 450,
    downloads: 750
  },
  {
    title: 'The Peace offering',
    preacher: 'Apostle Arome Osayi',
    duration: '2 hr',
    streams: 700,
    downloads: 1020
  },
  {
    title: 'The meal offering',
    preacher: 'Apostle Arome Osayi',
    duration: '2 hr',
    streams: 1040,
    downloads: 567
  }
]
</script>

<template>
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
  <dialog id="my_modal_2" class="modal">
    <div class="modal-box h-[70vh]">
      <h3 class="font-bold mb-8 text-lg text-center">Upload Audio</h3>
      <form class="card-body p-1 sm:p-4">
        <div class="form-control gap-4">
          <input type="file" class="file-input input-bordered" accept=".mp3,audio/*" />
          <input type="text" placeholder="Preacher" class="input input-bordered" required />
          <!-- <VueDatePicker v-model="picked" /> -->
          <input type="datetime-local" class="input input-bordered" v-model="dateValue" />
        </div>
        <div class="form-control mt-4">
          <button class="btn btn-primary">Upload</button>
        </div>
      </form>
      <p class="py-6 text-center">Press ESC key or click outside to close</p>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
</template>

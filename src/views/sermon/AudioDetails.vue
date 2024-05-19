<script setup lang="ts">
import Button from '@/components/Button.vue'
import Modal from '@/components/Modal.vue'
import { useAudioQuery, useDeleteAudio } from '@/utils/request'
import { useRoute } from 'vue-router'

const route = useRoute()

const audioId = route.params.id as string

const { data, isPending, error } = useAudioQuery(audioId)

const { isPending: deleting, mutate } = useDeleteAudio(audioId)

function formatTime(minutes: number) {
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60
  return `${hours}:${remainingMinutes < 10 ? '0' : ''}${remainingMinutes}`
}
</script>

<template>
  <div class="audio-details">
    <div v-if="isPending" class="h-[90vh] flex items-center justify-center">
      <span class="loading loading-ring w-[3rem]"></span>
    </div>
    <div v-else-if="error">
      <p>{{ error }}</p>
    </div>
    <div v-else>
      <h2 class="text-2xl mb-4 font-semibold">Audio Details</h2>
      <!-- play audio -->
      <div class="bg-base-200 min-h-40 rounded-2xl p-3">
        <!-- <audio controls>
        <source :src="calling_my_name" type="audio/mpeg" />
      </audio> -->

        <div class="mb-4">
          <p className="text-sm mb-2">
            <span className="font-bold">Title:</span> {{ data?.title }}
          </p>
          <p className="text-sm mb-2">
            <span className="font-bold">Preacher:</span> {{ data?.preacher }}
          </p>
          <p className="text-sm mb-2">
            <span className="font-bold">Streams:</span> {{ data?.streams.length }}
          </p>
          <p className="text-sm mb-2">
            <span className="font-bold">Downloads:</span> {{ data?.downloads.length }}
          </p>
        </div>

        <button class="btn btn-error btn-sm mb-3" onclick="my_modal_2.showModal()">Delete</button>

        <!-- Confirmation modal  -->
        <Modal id="my_modal_2" title="Are you sure you want to delete">
          <div class="flex gap-4 justify-center">
            <button class="btn btn-neutral btn-sm mb-3" onclick="my_modal_2.close()">Close</button>
            <Button @click="mutate" :loading="deleting" class="btn btn-error btn-sm mb-3">
              Delete
            </Button>
          </div>
        </Modal>

        <section class="flex flex-wrap gap-3 justify-between">
          <!-- Streams  -->
          <div class="overflow-x-auto md:w-[48%]">
            <h2 class="font-semibold mb-2 text-lg">Streams</h2>
            <div class="overflow-x-auto border border-gray-300 rounded-xl mb-4">
              <table class="table min-w-[450px]" v-if="data && data.streams.length > 0">
                <thead class="bg-neutral">
                  <tr>
                    <th>User</th>
                    <th>Date</th>
                    <th>Duration</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="stream in data.streams" :key="stream.id" class="hover cursor-pointer">
                    <td>{{ stream.user.fullName }}</td>
                    <td>{{ new Date(stream.createdAt).toDateString() }}</td>
                    <td class="tracking-widest">{{ formatTime(stream.duration) }}</td>
                  </tr>
                </tbody>
              </table>
              <p v-else>No streams for this audio</p>
              <!-- <button class="btn btn-primary btn-sm mb-2 ml-2">View more</button> -->
            </div>
          </div>
          <!-- Downloads  -->
          <div class="overflow-x-auto md:w-[48%]">
            <h2 class="font-semibold mb-2 text-lg">Downloads</h2>
            <div class="overflow-x-auto border border-gray-300 rounded-xl mb-4">
              <table class="table min-w-[450px]" v-if="data && data.downloads.length > 0">
                <thead class="bg-neutral">
                  <tr>
                    <th>User</th>
                    <th>Date</th>
                    <th>status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="download in data?.downloads"
                    :key="download.id"
                    class="hover cursor-pointer"
                  >
                    <td>{{ download.user.fullName }}</td>
                    <td>{{ new Date(download.createdAt).toDateString() }}</td>
                    <td>{{ download.status.toString().toLowerCase() }}</td>
                  </tr>
                </tbody>
              </table>
              <p v-else>No downloads for this audio</p>
              <!-- <button class="btn btn-primary btn-sm mb-2 ml-2">View more</button> -->
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

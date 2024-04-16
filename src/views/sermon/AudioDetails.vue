<template>
  <div class="audio-details">
    <h2 class="text-2xl mb-4 font-semibold">Audio Details</h2>
    <!-- play audio -->
    <div class="bg-base-200 min-h-40 rounded-2xl p-3">
      <!-- <audio controls>
        <source :src="calling_my_name" type="audio/mpeg" />
      </audio> -->

      <div class="">
        <div class="mb-4">
          <p className="text-sm mb-2"><span className="font-bold">Title:</span> Fire Altar</p>
          <p className="text-sm mb-2">
            <span className="font-bold">Preacher:</span> Apostle Arome Osayi
          </p>
          <p className="text-sm mb-2"><span className="font-bold">Streams:</span> 100,000</p>
          <p className="text-sm mb-2"><span className="font-bold">Downloads:</span> 2,000</p>
        </div>
        <section class="flex flex-wrap gap-3 justify-between">
          <!-- Streams  -->
          <div class="overflow-x-auto md:w-[48%]">
            <h2 class="font-semibold mb-2 text-lg">Streams</h2>
            <div class="overflow-x-auto border border-gray-300 rounded-xl mb-4">
              <table class="table min-w-[450px]">
                <thead class="bg-neutral">
                  <tr>
                    <th>User</th>
                    <th>Date</th>
                    <th>Completed</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(stream, index) in streams" :key="index" class="hover cursor-pointer">
                    <td>{{ stream.user }}</td>
                    <td>{{ stream.time.toLocaleString() }}</td>
                    <td>{{ stream.completed }}</td>
                  </tr>
                </tbody>
              </table>
              <button class="btn btn-primary btn-sm mb-2 ml-2">View more</button>
            </div>
          </div>
          <!-- Downloads  -->
          <div class="overflow-x-auto md:w-[48%]">
            <h2 class="font-semibold mb-2 text-lg">Downloads</h2>
            <div class="overflow-x-auto border border-gray-300 rounded-xl mb-4">
              <table class="table min-w-[450px]">
                <thead class="bg-neutral">
                  <tr>
                    <th>User</th>
                    <th>Date</th>
                    <th>Completed</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(stream, index) in streams" :key="index" class="hover cursor-pointer">
                    <td>{{ stream.user }}</td>
                    <td>{{ stream.time.toLocaleString() }}</td>
                    <td>{{ stream.completed }}</td>
                  </tr>
                </tbody>
              </table>
              <button class="btn btn-primary btn-sm mb-2 ml-2">View more</button>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import calling_my_name from '@/assets/Calling-my-name.mp3'
interface Stream {
  user: string
  time: Date
  completed: boolean
}

const streams: Stream[] = [
  { user: 'Dan Charles', time: new Date(), completed: true },
  { user: 'Dan Charles', time: new Date('2023-12-10, 22:20'), completed: false },
  { user: 'Dan Charles', time: new Date(), completed: true }
]
</script>

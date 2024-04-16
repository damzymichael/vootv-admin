<script setup lang="ts">
import pfp from '@/assets/pfp.png'
interface StreamHistory {
  title: string
  preacher: string
  type: 'video' | 'audio'
  date: Date
  duration: `${number} ${'min' | 'hr'}`
}

const streamInfo: StreamHistory[] = [
  {
    title: 'The peace offering',
    preacher: 'Apostle Arome Osayi',
    type: 'audio',
    date: new Date(),
    duration: '2 hr'
  },
  {
    title: 'The fire Altar',
    preacher: 'Apostle Arome Osayi',
    type: 'video',
    date: new Date(),
    duration: '40 min'
  },
  {
    title: 'Breaking Boundaries',
    preacher: 'Reverend Dan Charles',
    type: 'audio',
    date: new Date(),
    duration: '40 min'
  }
]
</script>

<template>
  <div class="profile">
    <h2 class="text-2xl mb-4 font-semibold">Profile</h2>

    <section>
      <!-- Contact and location details  -->
      <div class="flex flex-wrap rounded-2xl bg-base-200 items-start gap-3 p-3 mb-3">
        <h1 class="w-full font-bold text-xl text-primary">Personal Information</h1>
        <img :src="pfp" alt="Profile picture" class="rounded-2xl" />
        <div>
          <p className="text-sm mb-2"><span className="font-bold">Full Name:</span> Dan Charles</p>
          <p className="text-sm mb-2">
            <span className="font-bold">Email:</span> dancharles23@gmail.com
          </p>
          <p className="text-sm mb-2">
            <span className="font-bold">Phone Number:</span> 09087654321
          </p>
          <p className="text-sm mb-2"><span className="font-bold">Location:</span> RCN Akure</p>
        </div>
      </div>

      <div class="flex flex-wrap gap-3 items-start justify-between">
        <!-- Streaming and downloading information  -->
        <div class="w-full md:w-[49%] rounded-2xl bg-base-200 p-3">
          <h1 class="font-bold text-xl text-primary mb-4">Streaming Information</h1>
          <div class="mb-4">
            <p className="text-sm mb-2"><span className="font-bold">Stream count:</span> 400</p>
            <p className="text-sm mb-2"><span className="font-bold">Download:</span> 400</p>
          </div>
          <h2 class="font-bold mb-2">Streaming history</h2>
          <div class="overflow-x-auto border border-gray-300 rounded-xl mb-4">
            <table class="table min-w-[700px]">
              <thead class="bg-neutral">
                <tr>
                  <th></th>
                  <th>Title</th>
                  <th>Preacher</th>
                  <th>Type</th>
                  <th>Date</th>
                  <th>Duration</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(audio, index) in streamInfo" :key="index">
                  <th>{{ index + 1 }}</th>
                  <td>{{ audio.title }}</td>
                  <td>{{ audio.preacher }}</td>
                  <td>{{ audio.type }}</td>
                  <td>{{ audio.date.toLocaleDateString() }}</td>
                  <td>{{ audio.duration }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <!-- Partnership -->
        <div class="w-full md:w-[49%] rounded-2xl bg-base-200 p-3">
          <h1 class="font-bold text-xl text-primary mb-4">Partnership</h1>
          <p class="text-error">No partnership history...</p>
        </div>
      </div>
    </section>
  </div>
</template>

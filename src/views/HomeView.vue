<script setup lang="ts">
import DownloadIcon from '@/components/svgs/DownloadIcon.vue'
import UsersIcon from '@/components/svgs/UsersIcon.vue'
import StreamsIcon from '@/components/svgs/StreamsIcon.vue'
import RegisterIcon from '@/components/svgs/RegisterIcon.vue'
import AudioIcon from '@/components/svgs/AudioIcon.vue'
import YoutubeIcon from '@/components/svgs/YoutubeIcon.vue'
import PartnerIcon from '@/components/svgs/PartnerIcon.vue'
import IncomeIcon from '@/components/svgs/IncomeIcon.vue'
import LocationIcon from '@/components/svgs/LocationIcon.vue'
import { useUsers, useAudiosQuery, useLocations } from '@/utils/request'

const { data: users } = useUsers()

const { data: audios } = useAudiosQuery()

const { data: locations } = useAudiosQuery()

const statisticalData: { description: string; stat: number }[] = [
  { description: 'Total Users', stat: 3000 },
  { description: 'Partners', stat: 400 },
  { description: 'Income', stat: 500000 },
  { description: 'Videos', stat: 3000 },
  { description: 'Audios', stat: 7000 },
  { description: 'Downloads', stat: 5000 },
  { description: 'Locations', stat: 50 }
]
</script>

<template>
  <div class="home">
    <!-- ADD CHART HERE  -->
    <h1 class="text-2xl mb-4 font-semibold">Statistics</h1>
    <div class="stats shadow flex flex-wrap">
      <div class="stat sm:w-1/2 md:w-1/3 lg:w-1/4">
        <div class="stat-figure text-secondary">
          <UsersIcon />
        </div>
        <div class="stat-title">Users</div>
        <div class="stat-value">{{ users?.length || 'N/A' }}</div>
        <!-- <div class="stat-desc">↗︎ 400 (22%)</div> -->
      </div>

      <!-- <div class="stat sm:w-1/2 md:w-1/3 lg:w-1/4">
        <div class="stat-figure text-secondary">
          <RegisterIcon />
        </div>
        <div class="stat-title">New Registers</div>
        <div class="stat-value">200</div>
        <div class="stat-desc">↘︎ 90 (14%)</div>
      </div> -->

      <div class="stat sm:w-1/2 md:w-1/3 lg:w-1/4">
        <div class="stat-figure text-secondary">
          <PartnerIcon />
        </div>
        <div class="stat-title">Partners</div>
        <div class="stat-value">1200</div>
        <div class="stat-desc">+200 last month</div>
      </div>

      <div class="stat sm:w-1/2 md:w-1/3 lg:w-1/4">
        <div class="stat-figure text-secondary">
          <IncomeIcon />
        </div>
        <div class="stat-title">Income</div>
        <!-- Smaller text here  -->
        <div class="stat-value text-3xl">N 1,500,000</div>
        <div class="stat-desc">↗︎100,000 (14%)</div>
      </div>

      <div class="stat sm:w-1/2 md:w-1/3 lg:w-1/4">
        <div class="stat-figure text-secondary">
          <AudioIcon />
        </div>
        <div class="stat-title">Audios</div>
        <div class="stat-value">{{ audios?.length || 'N/A' }}</div>
        <!-- <div class="stat-desc">+3 last week</div> -->
      </div>

      <div class="stat sm:w-1/2 md:w-1/3 lg:w-1/4">
        <div class="stat-figure text-secondary">
          <YoutubeIcon />
        </div>
        <div class="stat-title">Videos</div>
        <div class="stat-value">300</div>
        <div class="stat-desc">+5 last month</div>
      </div>

      <div class="stat sm:w-1/2 md:w-1/3 lg:w-1/4">
        <div class="stat-figure text-secondary">
          <StreamsIcon />
        </div>
        <div class="stat-title">Streams</div>
        <div class="stat-value">450,000</div>
        <div class="stat-desc">↗︎100,000 (14%)</div>
      </div>

      <div class="stat sm:w-1/2 md:w-1/4">
        <div class="stat-figure text-secondary">
          <DownloadIcon />
        </div>
        <div class="stat-title">Downloads</div>
        <div class="stat-value">31K</div>
        <div class="stat-desc">Jan 1st - Feb 1st</div>
      </div>

      <div class="stat sm:w-1/2 md:w-1/3 lg:w-1/4">
        <div class="stat-figure text-secondary">
          <LocationIcon />
        </div>
        <div class="stat-title">Locations</div>
        <!-- Smaller text here  -->
        <div class="stat-value text-3xl">{{ locations?.length  || 'N/A' }}</div>
        <!-- <div class="stat-desc">+10 last year</div> -->
      </div>
    </div>
  </div>
</template>

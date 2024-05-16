<script setup lang="ts">
import { useRouter } from 'vue-router'
import CalenderIcon from '@/components/svgs/CalenderIcon.vue'
import TimeIcon from '@/components/svgs/TimeIcon.vue'
import { usePrograms } from '@/utils/request'

const router = useRouter()

const { data, isPending } = usePrograms()
</script>

<template>
  <div class="program">
    <header class="flex items-center justify-between mb-2">
      <h1 class="text-2xl font-semibold">Programs & Events</h1>
      <button
        class="btn btn-sm sm:btn-md btn-outline btn-primary mt-3"
        @click="router.push('/programs/add-program')"
      >
        Add Program
      </button>
    </header>
    <section>
      <div class="bg-base-200 rounded-md p-3 mb-3">
        <h2 class="mb-3 text-lg font-medium">Ongoing programs</h2>
        <div class="flex gap-2">
          <div class="w-1/5 bg-current h-24 rounded-lg"></div>
          <div>
            <h3 class="mb-2">Festival of glory</h3>
            <div class="badge badge-error rounded-none mb-2">LIVE</div>
            <div class="flex gap-2 items-center">
              <CalenderIcon /> <span>End Date: 24/7/24</span>
            </div>
          </div>
        </div>
      </div>
      <div class="bg-base-200 mb-3 rounded-md p-3">
        <h2 class="mb-3 text-lg font-medium">Upcoming Programs</h2>
        <div class="flex gap-2">
          <div class="w-1/5 bg-current h-24 rounded-lg"></div>
          <div>
            <h3 class="mb-1">Festival of glory</h3>
            <div class="flex gap-2 mb-1 items-center">
              <CalenderIcon /> <span>24th - 26th Dec, 2024</span>
            </div>
            <div class="flex gap-2 items-center"><TimeIcon /> <span>8AM & 4PM</span></div>
          </div>
        </div>
      </div>

      <div class="bg-base-200 rounded-md p-3">
        <h2 class="mb-3 text-lg font-medium">Upcoming Events at our centers</h2>
        <div class="flex items-center gap-2 mb-4">
          <div class="w-1/5 bg-current h-24 rounded-lg"></div>
          <div>
            <h3 class="mb-1">Festival of glory</h3>
            <div class="flex gap-2 mb-1 items-center">
              <CalenderIcon /> <span>24th - 26th Dec, 2024</span>
            </div>
            <div class="flex gap-2 items-center"><TimeIcon /> <span>8AM & 4PM</span></div>
            <p class="flex items-center gap-2">
              <svg
                width="20px"
                height="20px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    d="M12 21C15.5 17.4 19 14.1764 19 10.2C19 6.22355 15.866 3 12 3C8.13401 3 5 6.22355 5 10.2C5 14.1764 8.5 17.4 12 21Z"
                    class="stroke-current"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                  <path
                    d="M12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12Z"
                    class="stroke-current"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                </g>
              </svg>
              <span> RCN Akure</span>
            </p>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <div class="w-1/5 bg-current h-24 rounded-lg"></div>
          <div>
            <h3 class="mb-1">Festival of glory</h3>
            <div class="flex gap-2 mb-1 items-center">
              <CalenderIcon /> <span>24th - 26th Dec, 2024</span>
            </div>
            <div class="flex gap-2 items-center"><TimeIcon /> <span>8AM & 4PM</span></div>
            <p class="flex items-center gap-2">
              <svg
                width="20px"
                height="20px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    d="M12 21C15.5 17.4 19 14.1764 19 10.2C19 6.22355 15.866 3 12 3C8.13401 3 5 6.22355 5 10.2C5 14.1764 8.5 17.4 12 21Z"
                    class="stroke-current"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                  <path
                    d="M12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12Z"
                    class="stroke-current"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                </g>
              </svg>
              <span> RCN Lagos</span>
            </p>
          </div>
        </div>
      </div>
    </section>

    <button class="btn btn-sm sm:btn-md btn-outline btn-primary mt-3">View all programs</button>
  </div>
</template>

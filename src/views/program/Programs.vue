<script setup lang="ts">
import { useRouter } from 'vue-router'
import CalenderIcon from '@/components/svgs/CalenderIcon.vue'
import TimeIcon from '@/components/svgs/TimeIcon.vue'
import { usePrograms } from '@/utils/request'
import { formatDay, formatDate } from '@/utils/UI'
import Modal from '@/components/Modal.vue'
import Button from '@/components/Button.vue'

const router = useRouter()

const { data, isPending, isError } = usePrograms()

const displayTimeframe = (start: Date, end: Date) => {
  const startDate = new Date(start)
  const endDate = new Date(end)

  return startDate.getMonth() == endDate.getMonth()
    ? `${formatDay(startDate)} - ${formatDate(endDate)}`
    : `${formatDate(startDate)} - ${formatDate(endDate)}`
}
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
    <div v-if="isPending" class="flex gap-3 flex-col items-center justify-center h-32">
      <span class="loading loading-ring loading-lg mt-10"></span>
      Fetching Programs
    </div>

    <div v-else-if="isError">
      <p>Error occured while fetching</p>
    </div>

    <section v-else>
      <div class="bg-base-200 rounded-md p-3 mb-3">
        <!-- Ongoing programs  -->
        <h2 class="mb-3 text-lg font-medium">Ongoing programs</h2>
        <div
          class="flex flex-wrap items-start gap-2 mb-4"
          v-for="program in data?.filter(
            (program) =>
              program.type == 'PROGRAM' &&
              new Date(program.startTime) < new Date() &&
              new Date(program.endTime) > new Date()
          )"
        >
          <img
            :src="program.banner.secure_url"
            alt="program-banner"
            class="w-full sm:w-1/5 aspect-video object-cover rounded-2xl"
          />
          <div>
            <h3 class="mb-2 font-bold text-lg">{{ program.theme }}</h3>
            <div class="badge badge-error rounded-none mb-2">LIVE</div>
            <div class="flex gap-2 items-center">
              <CalenderIcon />
              <span>Ends: {{ new Date(program.endTime).toDateString() }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Upcoming programs  -->
      <div class="bg-base-200 mb-3 rounded-md p-3">
        <h2 class="mb-3 text-lg font-medium">Upcoming Programs</h2>
        <div
          class="flex flex-wrap gap-2 mb-4"
          v-for="program in data?.filter(
            (program) => program.type == 'PROGRAM' && new Date(program.startTime) > new Date()
          )"
        >
          <img
            :src="program.banner.secure_url"
            alt="program-banner"
            class="w-full sm:w-1/5 aspect-video object-cover rounded-2xl"
          />
          <div>
            <h3 class="mb-1 font-bold text-lg">{{ program.theme }}</h3>
            <div class="flex gap-2 mb-1 items-center">
              <CalenderIcon />
              <span>{{ displayTimeframe(program.startTime, program.endTime) }}</span>
            </div>
            <div class="flex gap-2 items-center"><TimeIcon /> <span>8AM & 4PM</span></div>
          </div>
          <div class="w-full flex gap-2">
            <button class="btn btn-outline btn-primary" onclick="delete_modal.showModal()">
              Edit
            </button>
            <button class="btn btn-outline btn-error">Delete</button>
          </div>
        </div>
      </div>

      <!-- Upcoming events  -->
      <div class="bg-base-200 rounded-md p-3">
        <h2 class="mb-3 text-lg font-medium">Upcoming Events at our centers</h2>
        <div
          class="flex flex-wrap items-center gap-2 mb-4"
          v-for="program in data?.filter(
            (program) => program.type == 'EVENT' && new Date(program.startTime) > new Date()
          )"
        >
          <img
            :src="program.banner.secure_url"
            alt="program-banner"
            class="w-full sm:w-1/5 aspect-video object-cover rounded-2xl"
          />
          <div>
            <h3 class="mb-1 font-bold text-lg">{{ program.theme }}</h3>
            <div class="flex gap-2 mb-1 items-center">
              <CalenderIcon />
              <span>{{ displayTimeframe(program.startTime, program.endTime) }}</span>
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
              <span> RCN {{ program.location.state }}</span>
            </p>
          </div>
          <div class="w-full flex gap-2">
            <button class="btn btn-outline btn-primary" onclick="delete_modal.showModal()">
              Edit
            </button>
            <button class="btn btn-outline btn-error">Delete</button>
          </div>
        </div>
      </div>
      <button class="btn btn-sm sm:btn-md btn-outline btn-primary mt-3">View all programs</button>
    </section>

    <!-- Delete Confirmation modal  -->
    <Modal id="delete_modal" title="Are you sure you want to delete">
      <div class="flex gap-4 justify-center">
        <button class="btn btn-neutral btn-sm mb-3" onclick="delete_modal.close()">Close</button>
        <Button class="btn btn-error btn-sm mb-3"> Delete </Button>
      </div>
    </Modal>

    <!-- Edit Confirmation modal  -->
    <Modal id="edit_modal" title="Edit program"> </Modal>
  </div>
</template>

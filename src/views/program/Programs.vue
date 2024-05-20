<script setup lang="ts">
import { useRouter } from 'vue-router'
import CalenderIcon from '@/components/svgs/CalenderIcon.vue'
import TimeIcon from '@/components/svgs/TimeIcon.vue'
import { usePrograms } from '@/utils/request'
import { formatDay, formatDate } from '@/utils/UI'
import Modal from '@/components/Modal.vue'
import Button from '@/components/Button.vue'
import LocationIcon from '@/components/svgs/LocationIcon.vue'
import CloseIcon from '@/components/svgs/CloseIcon.vue'
import { ref, reactive, watch } from 'vue'
import { useDeleteProgram, useLocations, useUpdateProgram } from '@/utils/request'
import type { Program } from '@/types'

const router = useRouter()

const { data, isPending, isError } = usePrograms()

const { data: locations } = useLocations()

const deleteId = ref<string>('')

const { mutateAsync, isPending: deleting } = useDeleteProgram()

const { mutateAsync: update, isPending: updating } = useUpdateProgram()

const currentProgram = ref<Program | undefined>(undefined)

const program = reactive({
  theme: '',
  startTime: new Date().toISOString().slice(0, 16),
  endTime: new Date().toISOString().slice(0, 16),
  venue: '',
  additionalInfo: '',
  locationId: ''
})

const handleSubmit = async (e: Event) => {
  const form = e.currentTarget as HTMLFormElement
  const formData = new FormData(form)
  for (const [key, value] of formData.entries()) {
    const trimmedValue = value.toString().trim()
    if (typeof value != 'object') formData.set(key, trimmedValue)
  }
  if (currentProgram.value) {
    const { id } = currentProgram.value
    formData.append('locationId', program.locationId)
    await update({ id, formData })
  }
  form.reset()
  document.getElementById('close_edit_modal')?.click()
}

const deleteProgram = async (id: string) => {
  await mutateAsync(id)
  document.getElementById('close_delete')?.click()
}

const displayTimeframe = (start: Date, end: Date) => {
  const startDate = new Date(start)
  const endDate = new Date(end)

  return startDate.getMonth() == endDate.getMonth()
    ? `${formatDay(startDate)} - ${formatDate(endDate)}`
    : `${formatDate(startDate)} - ${formatDate(endDate)}`
}

watch(currentProgram, () => {
  if (currentProgram.value) {
    const { theme, startTime, endTime, additionalInfo, venue, locationId } = currentProgram.value
    program.theme = theme
    program.startTime = new Date(startTime).toISOString().slice(0, 16)
    program.endTime = new Date(endTime).toISOString().slice(0, 16)
    program.additionalInfo = additionalInfo
    program.venue = venue
    program.locationId = locationId
  }
})
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
      <!-- Ongoing programs  -->
      <div class="bg-base-200 rounded-md p-3 mb-3">
        <h2 class="mb-3 text-lg font-medium">Ongoing programs</h2>
        <div
          class="flex flex-wrap items-start gap-2 mb-4"
          v-for="program in data?.filter(
            (program) =>
              new Date(program.startTime) < new Date() && new Date(program.endTime) > new Date()
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
            <p class="flex items-center gap-2" v-show="program.type == 'EVENT'">
              <LocationIcon :width="20" :height="20" class="w-5" />
              <span> RCN {{ program.location.state }}</span>
            </p>
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
            <button
              class="btn btn-outline btn-primary"
              onclick="edit_modal.showModal()"
              @click="currentProgram = program"
            >
              Edit
            </button>
            <button
              class="btn btn-outline btn-error"
              @click="deleteId = program.id"
              onclick="delete_modal.showModal()"
            >
              Delete
            </button>
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
              <LocationIcon :width="20" :height="20" class="w-5" />
              <span> RCN {{ program.location.state }}</span>
            </p>
          </div>
          <div class="w-full flex gap-2">
            <button
              class="btn btn-outline btn-primary"
              @click="currentProgram = program"
              onclick="edit_modal.showModal()"
            >
              Edit
            </button>
            <button
              class="btn btn-outline btn-error"
              @click="deleteId = program.id"
              onclick="delete_modal.showModal()"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
      <button class="btn btn-sm sm:btn-md btn-outline btn-primary mt-3">View all programs</button>
    </section>

    <!-- Delete Confirmation modal  -->
    <Modal id="delete_modal" title="Are you sure you want to delete">
      <div class="flex gap-4 justify-center">
        <button class="btn btn-neutral btn-sm mb-3" onclick="delete_modal.close()">Close</button>
        <Button
          class="btn btn-error btn-sm mb-3"
          :loading="deleting"
          @click="deleteProgram(deleteId)"
        >
          Delete
        </Button>
      </div>
      <button id="close_delete" onclick="delete_modal.close()"></button>
    </Modal>

    <!-- Edit Form modal  -->
    <Modal id="edit_modal" title="Edit program">
      <button id="close_edit_modal" onclick="edit_modal.close()" class="absolute top-4 right-4">
        <CloseIcon :width="25" :height="25" />
      </button>
      <form class="card-body mx-auto p-1 sm:p-4" @submit.prevent="handleSubmit">
        <div class="form-control gap-4">
          <input
            type="text"
            class="input input-bordered"
            placeholder="Theme"
            required
            name="theme"
            v-model="program.theme"
          />

          <label class="input input-bordered flex items-center gap-2">
            Start time
            <input
              name="startTime"
              type="datetime-local"
              class="grow"
              required
              v-model="program.startTime"
            />
          </label>

          <label class="input input-bordered flex items-center gap-2">
            End time
            <input
              name="endTime"
              type="datetime-local"
              class="grow"
              required
              v-model="program.endTime"
            />
          </label>

          <label class="form-control w-full">
            <div class="label">
              <span class="label-text">Add new picture for program banner</span>
            </div>
            <input
              type="file"
              name="banner"
              class="file-input file-input-bordered w-full"
              accept="image/*"
            />
          </label>

          <label class="form-control w-full">
            <div class="label">
              <span class="label-text">Choose RCN center or enter venue address below</span>
            </div>
            <select
              v-model="program.venue"
              class="select select-bordered w-full"
              @change="
                program.locationId = locations?.find(
                  (location) => location.address == program.venue
                )?.id as string
              "
            >
              <option disabled selected>RCN Global</option>
              <option v-for="location in locations" :value="location.address">
                {{ `${location.state}, ${location.country}` }}
              </option>
            </select>
          </label>

          <input
            name="venue"
            placeholder="Venue"
            class="input input-bordered w-full"
            required
            v-model="program.venue"
          />

          <textarea
            class="textarea textarea-bordered h-24"
            placeholder="Additional information"
            name="additionalInfo"
            v-model="program.additionalInfo"
          ></textarea>
        </div>
        <div class="form-control mt-4">
          <Button :loading="updating" class="btn btn-primary">Save</Button>
        </div>
      </form>
    </Modal>
  </div>
</template>

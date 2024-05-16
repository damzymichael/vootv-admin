<script setup lang="ts">
import { ref } from 'vue'
import Button from '@/components/Button.vue'
import { useAddProgram, useLocations } from '@/utils/request'

const eventType = ref('PROGRAM')

const venue = ref('RCN Global')

const locationId = ref('')

const { mutateAsync, isPending } = useAddProgram()

const { data } = useLocations()

const handleSubmit = async (e: Event) => {
  const form = e.currentTarget as HTMLFormElement
  const formData = new FormData(form)
  for (const [key, value] of formData.entries()) {
    const trimmedValue = value.toString().trim()
    if (typeof value != 'object') formData.set(key, trimmedValue)
  }
  if (locationId.value) formData.set('locationId', locationId.value)
  await mutateAsync(formData)
  form.reset()
}
</script>
<template>
  <div class="px-auto">
    <h1 class="font-bold mb-2 text-lg text-center">Add Program</h1>
    <form
      class="card-body mx-auto p-1 sm:p-4 w-full sm:w-4/5 md:w-3/5"
      @submit.prevent="handleSubmit"
    >
      <div class="form-control gap-4">
        <div class="flex gap-3">
          <label class="label cursor-pointer">
            <span class="label-text mr-2">Program</span>
            <input
              type="radio"
              name="type"
              value="PROGRAM"
              class="radio checked:bg-blue-500"
              v-model="eventType"
            />
          </label>
          <label class="label cursor-pointer">
            <span class="label-text mr-2">Event</span>
            <input
              type="radio"
              name="type"
              value="EVENT"
              class="radio checked:bg-blue-500"
              v-model="eventType"
            />
          </label>
        </div>
        <input type="text" class="input input-bordered" placeholder="Theme" required name="theme" />

        <label class="input input-bordered flex items-center gap-2">
          Start time
          <input name="startTime" type="datetime-local" class="grow" required />
        </label>

        <label class="input input-bordered flex items-center gap-2">
          End time
          <input name="endTime" type="datetime-local" class="grow" required />
        </label>

        <label class="form-control w-full">
          <div class="label">
            <span class="label-text">Add picture for program banner</span>
          </div>
          <input type="file" name="banner" class="file-input file-input-bordered w-full" required />
        </label>

        <label class="form-control w-full">
          <div class="label">
            <span class="label-text">Choose RCN center or enter venue address below</span>
          </div>
          <select
            @change="locationId = data?.find((location) => location.address == venue)?.id as string"
            v-model="venue"
            class="select select-bordered w-full"
          >
            <option disabled selected>RCN Global</option>
            <option v-for="location in data" :value="location.address">
              {{ `${location.state}, ${location.country}` }}
            </option>
          </select>
        </label>

        <input
          v-model="venue"
          name="venue"
          placeholder="Venue"
          class="input input-bordered w-full"
          required
        />

        <textarea
          class="textarea textarea-bordered h-24"
          placeholder="Additional information"
          name="additionalInfo"
        ></textarea>
      </div>
      <div class="form-control mt-4">
        <Button :loading="isPending" class="btn btn-primary">Upload</Button>
      </div>
    </form>
  </div>
</template>

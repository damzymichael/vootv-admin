<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useToast } from 'vue-toastification'
import SearchIcon from '@/components/svgs/SearchIcon.vue'
import Modal from '@/components/Modal.vue'
import Button from '@/components/Button.vue'
import { useAddLocation, useLocations } from '@/utils/request'

const $toast = useToast()

const location = reactive({ country: '', state: '', pastorInCharge: '', address: '' })

const open = ref({ global: false, nigeria: false, abroad: false })

const { mutateAsync, isPending: uploading } = useAddLocation()

const { isPending, data, isError } = useLocations()

const handleSubmit = async (e: Event) => {
  for (const [key, value] of Object.entries(location)) {
    const trimmedValue = value.toString().trim()
    if (!trimmedValue) {
      $toast.warning('Missing input')
      return
    }
    location[key as keyof typeof location] = trimmedValue
  }
  await mutateAsync(location)
  for (const key of Object.keys(location)) location[key as keyof typeof location] = ''
  document.getElementById('closeModal')?.click()
}
</script>

<template>
  <div class="location">
    <header class="flex items-center justify-between mb-5">
      <h1 class="text-2xl mb-4 font-semibold">Locations</h1>
      <label class="input input-bordered flex items-center gap-2">
        <input type="text" class="grow" placeholder="Search" />
        <SearchIcon />
      </label>
    </header>
    <Modal title="Add new Location" id="add_location">
      <form id="location_form" class="card-body p-1 sm:p-4" @submit.prevent="handleSubmit">
        <div class="form-control gap-4">
          <input
            type="text"
            placeholder="Country"
            class="input input-bordered"
            required
            v-model="location.country"
          />
          <input
            type="text"
            placeholder="State"
            class="input input-bordered"
            required
            v-model="location.state"
          />
          <input
            type="text"
            placeholder="Pastor-in-charge"
            class="input input-bordered"
            required
            v-model="location.pastorInCharge"
          />
          <textarea
            class="textarea textarea-bordered h-24"
            placeholder="Address"
            required
            v-model="location.address"
          ></textarea>
        </div>
        <div class="form-control mt-4">
          <Button :loading="uploading" class="btn btn-primary">Save</Button>
        </div>
      </form>
      <button id="closeModal" onclick="add_location.close()"></button>
    </Modal>
    <section class="flex flex-col gap-3 mb-6">
      <div class="collapse bg-base-200">
        <input
          type="radio"
          name="my-accordion-1"
          :checked="open.global"
          @click="open.global = !open.global"
        />
        <div class="collapse-title text-xl font-semibold">RCN Global</div>
        <div class="collapse-content">
          <p class="text-neutral-400 font-semibold">
            RCN Global meets anywhere weekly with over 10 services weekly
          </p>
        </div>
      </div>
      <div class="collapse bg-base-200">
        <input
          type="radio"
          name="my-accordion-1"
          :checked="open.nigeria"
          @click="open.nigeria = !open.nigeria"
        />
        <div
          class="collapse-title text-xl font-semibold"
          @click="!data && $toast.info('Please wait')"
        >
          RCN Nigeria
        </div>
        <div class="collapse-content flex flex-wrap gap-3" v-if="data">
          <router-link
            :to="`/location/${location.id}`"
            v-for="location in data.filter((location) => location.country == 'Nigeria')"
            :key="location.id"
          >
            <div class="bg-neutral-500 p-2 rounded-lg">
              <h2 class="font-medium">RCN {{ location.state }}</h2>
              <address>{{ location.address }}, {{ location.state }} State, Nigeria</address>
            </div>
          </router-link>
        </div>
      </div>
      <div class="collapse bg-base-200">
        <input
          type="radio"
          name="my-accordion-1"
          :checked="open.abroad"
          @click="open.abroad = !open.abroad"
        />
        <div
          class="collapse-title text-xl font-semibold"
          @click="!data && $toast.info('Please wait')"
        >
          RCN Centers outside Nigeria
        </div>
        <div class="collapse-content flex flex-wrap gap-3" v-if="data">
          <router-link
            :to="`/location/${location.id}`"
            v-for="location in data.filter((location) => location.country != 'Nigeria')"
            :key="location.id"
          >
            <div class="bg-neutral-500 p-2 rounded-lg">
              <h2 class="font-medium">RCN {{ location.state }}</h2>
              <address>
                {{ location.address }}, {{ location.state }}, {{ location.country }}
              </address>
            </div>
          </router-link>
        </div>
      </div>
    </section>
    <button class="btn btn-info" onclick="add_location.showModal()">Add new location</button>
  </div>
</template>

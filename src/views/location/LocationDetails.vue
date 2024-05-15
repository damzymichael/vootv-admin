<script setup lang="ts">
import Modal from '@/components/Modal.vue'
import Button from '@/components/Button.vue'
import pfp from '@/assets/pfp.png'
import HomeIcon from '@/components/svgs/HomeIcon.vue'
import { useRoute } from 'vue-router'
import { useLocation, useUpdateLocation, useAddService } from '@/utils/request'
import { reactive, watchEffect } from 'vue'
import { useToast } from 'vue-toastification'
import type { Service } from '@/types'
import { formatTime } from '@/utils/UI'

const $toast = useToast()

const route = useRoute()

const locationId = route.params.id as string

const { data, isPending, error } = useLocation(locationId)

const { mutateAsync, isPending: updating } = useUpdateLocation(locationId)

const { mutateAsync: mutateService, isPending: addingService } = useAddService(locationId)

const addressForm = reactive({ country: '', state: '', address: '' })

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

const service = reactive<Service>({ day: 'Select day', theme: '', time: '', startTimes: [] })

watchEffect(() => {
  if (data.value) {
    const { country, state, address } = data.value
    addressForm.country = country
    addressForm.state = state
    addressForm.address = address
  }
})

const submitAddress = async () => {
  for (const [key, value] of Object.entries(addressForm)) {
    const trimmedValue = value.trim()
    if (!trimmedValue) {
      $toast.warning('Missing input')
      return
    }
    addressForm[key as keyof typeof addressForm] = trimmedValue
  }
  await mutateAsync(addressForm)
  document.getElementById('closeModal')?.click()
}

const addService = async () => {
  let { day, theme, time, startTimes } = service
  if (day == 'Select day') return $toast.warning('Missing input')
  if (!time && startTimes.length < 1) return $toast.warning('Enter time/times for service')
  service.theme = theme.trim()
  if (time && !startTimes.includes(time.trim())) {
    startTimes.push(time)
    service.time = ''
  }

  await mutateService({ day, theme, startTimes })

  service.day = 'Select day'
  service.theme = ''
  service.time = ''
  service.startTimes = []

  document.getElementById('closeServiceModal')?.click()
}

function addTime(e: KeyboardEvent) {
  if (e.key == ',' && service.time) {
    service.startTimes.push(service.time.trim().replace(',', ''))
    service.time = ''
  }
}

function deleteTime(id: number) {
  service.startTimes = service.startTimes.filter((_, index) => index != id)
}
</script>

<template>
  <div>
    <div v-if="isPending" class="h-[90vh] flex items-center justify-center">
      <span class="loading loading-ring w-[3rem]"></span>
    </div>
    <div v-else-if="error">
      <p>{{ error }}</p>
    </div>
    <section class="flex flex-col gap-3" v-else>
      <h1 class="font-bold text-xl mb-3">Branch Information</h1>
      <div class="flex flex-wrap rounded-2xl bg-base-200 items-center gap-3 p-3">
        <img :src="pfp" alt="Profile picture" class="rounded-full" />
        <div>
          <h2 class="font-bold text-xl">RCN {{ data?.state }}</h2>
          <h4 class="text-lg">
            <span class="font-semibold">Pastor-in-charge:</span> {{ data?.pastorInCharge }}
          </h4>
        </div>
      </div>
      <div class="w-full bg-base-200 rounded-2xl p-3 flex flex-wrap gap-1 sm:gap-3 items-center">
        <HomeIcon />
        <p class="sm:text-lg min-w-[200px]">
          {{ data?.address }}, {{ data?.state }} {{ data?.country == 'Nigeria' ? 'State' : '' }},
          {{ data?.country }}.
        </p>
        <button class="btn btn-outline btn-accent ml-auto mt-2" onclick="address.showModal()">
          Change address
        </button>
      </div>
      <Modal title="Change address" id="address">
        <form class="card-body p-1 sm:p-4" @submit.prevent="submitAddress">
          <div class="form-control gap-4">
            <input
              type="text"
              class="input input-bordered"
              disabled
              v-model="addressForm.country"
            />
            <input
              type="text"
              class="input input-bordered"
              placeholder="State"
              required
              v-model="addressForm.state"
            />
            <textarea
              class="textarea textarea-bordered h-24"
              placeholder="Address"
              required
              v-model="addressForm.address"
            ></textarea>
          </div>
          <div class="form-control mt-4">
            <Button class="btn btn-primary" :loading="updating">Save</Button>
          </div>
        </form>
        <button id="closeModal" onclick="address.close()"></button>
      </Modal>

      <div class="w-full bg-base-200 rounded-2xl p-3 flex flex-wrap gap-3 items-center">
        <h1 class="w-full font-bold text-xl mb-3 text-primary">Service times</h1>
        <p v-if="data?.services && data?.services?.length < 1">No services</p>
        <div v-else class="border border-primary p-2 rounded-lg" v-for="service in data?.services">
          <h3 class="uppercase mb-2">{{ service.day }}</h3>
          <div class="flex gap-2">
            <div className="badge badge-lg rounded-none" v-for="time in service.startTimes">
              {{ formatTime(time) }}
            </div>
          </div>
        </div>
        <div class="w-full mt-3">
          <button class="btn btn-outline btn-accent" onclick="serviceForm.showModal()">
            Add service schedule
          </button>
        </div>
      </div>
      <Modal title="Add service" id="serviceForm">
        <form class="card-body p-1 sm:p-4" @submit.prevent="addService">
          <div class="form-control gap-4">
            <select class="select select-bordered w-full" required v-model="service.day">
              <option disabled selected>Select day</option>
              <option v-for="day in days" :value="day">{{ day }}</option>
            </select>
            <input
              type="text"
              placeholder="Theme"
              class="input input-bordered"
              required
              v-model="service.theme"
            />
            <label class="form-control w-full">
              <div class="label">
                <span class="label-text">
                  Enter starting times for service seperated by a comma
                </span>
              </div>
              <input
                type="time"
                placeholder="E.g 8 AM, 9 AM"
                class="input input-bordered w-full"
                v-model="service.time"
                @keyup="addTime"
              />
              <div class="label justify-start gap-3">
                <div
                  className="badge badge-neutral badge-lg gap-3 p-3"
                  v-for="(time, index) in service.startTimes"
                >
                  <span>{{ time }}</span>
                  <span class="text-gray-300 hover:cursor-pointer" @click="deleteTime(index)">
                    X
                  </span>
                </div>
              </div>
            </label>
          </div>
          <div class="form-control mt-4">
            <Button :loading="addingService" class="btn btn-primary">Save</Button>
          </div>
        </form>
        <button onclick="serviceForm.close()" id="closeServiceModal"></button>
      </Modal>

      <div class="w-full bg-base-200 rounded-2xl p-3 flex flex-wrap gap-3 items-center">
        <h1 class="w-full font-bold text-xl mb-3 text-primary">Contact Details</h1>
        <div>
          <p className="text-sm mb-2">
            <span className="font-bold">Email Address:</span> rcnlagos404@gmail.com
          </p>
          <p className="text-sm mb-2">
            <span className="font-bold">Phone</span> <a href="tel:+2347087654321">07098765432</a>
          </p>
          <p className="text-sm mb-2">
            <span className="font-bold">Instagram:</span> RCN Ministries Lagos
          </p>
          <p className="text-sm mb-2"><span className="font-bold">Website:</span> rcn.dev</p>
        </div>
      </div>
    </section>
  </div>
</template>

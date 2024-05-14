<script setup lang="ts">
import Modal from '@/components/Modal.vue'
import Button from '@/components/Button.vue'
import pfp from '@/assets/pfp.png'
import HomeIcon from '@/components/svgs/HomeIcon.vue'
import { useRoute } from 'vue-router'
import { useLocation } from '@/utils/request'
import { reactive, watchEffect } from 'vue'

const route = useRoute()

const { data, isPending, error } = useLocation(route.params.id as string)

const addressForm = reactive({ country: '', state: '', address: '' })

watchEffect(() => {
  if (data.value) {
    const { country, state, address } = data.value
    addressForm.country = country
    addressForm.state = state
    addressForm.address = address
  }
})

const submitAddress = async () => {}
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
            <Button class="btn btn-primary">Save</Button>
          </div>
        </form>
      </Modal>

      <div class="w-full bg-base-200 rounded-2xl p-3 flex flex-wrap gap-3 items-center">
        <h1 class="w-full font-bold text-xl mb-3 text-primary">Service times</h1>
        <div class="border border-primary p-2 rounded-lg">
          <h3 class="uppercase mb-2">Wednesdays</h3>
          <div class="flex gap-2">
            <div className="badge badge-lg rounded-none">5:00 PM</div>
            <div className="badge badge-lg rounded-none">7:00 PM</div>
          </div>
        </div>
        <div class="border border-primary p-2 rounded-lg">
          <h3 class="uppercase mb-2">Sundays</h3>
          <div class="flex gap-2">
            <div className="badge badge-lg rounded-none">8:00 AM</div>
            <div className="badge badge-lg rounded-none">12:00 PM</div>
            <div className="badge badge-lg rounded-none">4:00 PM</div>
          </div>
        </div>
        <div class="w-full mt-3">
          <button class="btn btn-outline btn-accent">Add service schedule</button>
        </div>
      </div>

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

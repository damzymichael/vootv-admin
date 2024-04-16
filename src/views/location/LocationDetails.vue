<template>
  <section class="flex flex-col gap-3">
    <h1 class="font-bold text-xl mb-3">Branch Information</h1>
    <div class="flex flex-wrap rounded-2xl bg-base-200 items-center gap-3 p-3">
      <img :src="pfp" alt="Profile picture" class="rounded-full" />
      <div>
        <h2 class="font-bold text-xl">RCN Lagos</h2>
        <h4 class="text-lg">
          <span class="font-semibold">Pastor-in-charge:</span> Rev Austin Ukporhe
        </h4>
      </div>
    </div>
    <div class="w-full bg-base-200 rounded-2xl p-3 flex flex-wrap gap-3 items-center">
      <HomeIcon />
      <p class="sm:text-lg min-w-[200px]">
        Academy Guest House, Plot 6A Lateef Jakande Rd, Agidingbi 101212, Ikeja, Lagos State,
        Nigeria.
      </p>
      <button class="btn btn-accent ml-auto">Change address</button>
    </div>

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
        <button class="btn btn-accent">Add service schedule</button>
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
          <span className="font-bold">Instagram:</span> RCN Ministries Lagps
        </p>
        <p className="text-sm mb-2"><span className="font-bold">Website:</span> rcn.dev</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import pfp from '@/assets/pfp.png'
import HomeIcon from '@/components/svgs/HomeIcon.vue'
</script>

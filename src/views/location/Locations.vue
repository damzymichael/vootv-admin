<template>
  <div class="location">
    <header class="flex items-center justify-between mb-5">
      <h1 class="text-2xl mb-4 font-semibold">Locations</h1>
      <label class="input input-bordered flex items-center gap-2">
        <input type="text" class="grow" placeholder="Search" />
        <SearchIcon />
      </label>
    </header>
    <section class="flex flex-col gap-3 mb-6">
      <div class="collapse bg-base-200">
        <input type="radio" name="my-accordion-1" checked="true" />
        <div class="collapse-title text-xl font-semibold">RCN Global</div>
        <div class="collapse-content">
          <p class="text-neutral-400 font-semibold">
            RCN Global meets anywhere weekly with over 10 services weekly
          </p>
        </div>
      </div>
      <div class="collapse bg-base-200">
        <input type="radio" name="my-accordion-1" />
        <div class="collapse-title text-xl font-semibold">RCN Nigeria</div>
        <div class="collapse-content flex flex-wrap gap-3">
          <router-link to="/location/1">
            <div class="bg-neutral-500 p-2 rounded-lg">
              <h2 class="font-medium">RCN Lagos</h2>
              <address>
                Academy Guest House, Plot 6A Lateef Jakande Rd, Agidingbi 101212, Ikeja, Lagos
                State, Nigeria
              </address>
            </div>
          </router-link>

          <router-link to="/location/1">
            <div class="bg-neutral-500 p-2 rounded-lg">
              <h2 class="font-medium">RCN Makurdi</h2>
              <address>114 Senator Akume Way, 970101, Kanshio, Benue State, Nigeria.</address>
            </div>
          </router-link>

          <router-link to="/location/1">
            <div class="bg-neutral-500 p-2 rounded-lg">
              <h2 class="font-medium">RCN Ibadan</h2>
              <address>
                St. Charles Primary School, Opp Sacred heart Hospital OBUDU, Oyo State, Nigeria.
              </address>
            </div>
          </router-link>
        </div>
      </div>
      <div class="collapse bg-base-200">
        <input type="radio" name="my-accordion-1" />
        <div class="collapse-title text-xl font-semibold">RCN Centers outside Nigeria</div>
        <div class="collapse-content flex flex-wrap gap-3">
          <router-link to="/location/1">
            <div class="bg-neutral-500 p-2 rounded-lg">
              <h2 class="font-medium">RCN Glasgow</h2>
              <address>272 Bath Street, Glasgow, United Kingdom. G2 4JR.</address>
            </div>
          </router-link>

          <router-link to="/location/1">
            <div class="bg-neutral-500 p-2 rounded-lg">
              <h2 class="font-medium">RCN London</h2>
              <address>5th Floor, 20 Cavendish Square, London, United Kingdom</address>
            </div>
          </router-link>
        </div>
      </div>
    </section>
    <button class="btn btn-info">Add new location</button>
  </div>
</template>

<script setup lang="ts">
import SearchIcon from '@/components/svgs/SearchIcon.vue'
</script>

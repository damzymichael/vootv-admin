<script setup lang="ts">
import CalenderIcon from '../components/svgs/CalenderIcon.vue'
import TimeIcon from '../components/svgs/TimeIcon.vue'
</script>

<template>
  <div class="program">
    <h1 class="text-2xl mb-4 font-semibold">Programs & Events</h1>
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

        <button
          class="btn btn-sm sm:btn-md btn-outline btn-primary mt-3"
          onclick="my_modal_2.showModal()"
        >
          Add Program
        </button>
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

        <button
          class="btn btn-sm sm:btn-md btn-outline btn-primary mt-3"
          onclick="my_modal_3.showModal()"
        >
          Add Event
        </button>
      </div>
    </section>
    <dialog id="my_modal_2" class="modal">
      <div class="modal-box h-[70vh]">
        <h3 class="font-bold mb-4 text-lg text-center">Add a program</h3>
        <form class="card-body p-1 sm:p-4">
          <div class="form-control gap-4">
            <input type="text" class="input input-bordered" placeholder="Theme" required />
            <input type="text" class="input input-bordered" placeholder="Venue" required />
            <input type="text" placeholder="Preacher" class="input input-bordered" required />
            <label class="input input-bordered flex items-center gap-2">
              Start time
              <input type="datetime-local" class="grow" />
            </label>

            <label class="input input-bordered flex items-center gap-2">
              End time
              <input type="datetime-local" class="grow" />
            </label>
          </div>
          <div class="form-control mt-4">
            <button class="btn btn-primary">Upload</button>
          </div>
        </form>
        <p class="py-3 text-center">Press ESC key or click outside to close</p>
      </div>
      <form method="dialog" class="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>

    <dialog id="my_modal_3" class="modal">
      <div class="modal-box h-[70vh]">
        <h3 class="font-bold mb-3 text-lg text-center">Add an Event</h3>
        <form class="card-body p-1 sm:p-4">
          <div class="form-control gap-4">
            <input type="text" class="input input-bordered" placeholder="Theme" required />
            <select class="select select-info w-full max-w-xs">
              <option disabled selected>Select branch</option>
              <option>RCN Lagos</option>
              <option>RCN Akure</option>
              <option>RCN Abuja</option>
            </select>
            <input type="text" placeholder="Preacher" class="input input-bordered" required />
            <label class="input input-bordered flex items-center gap-2">
              Start time
              <input type="datetime-local" class="grow" />
            </label>

            <label class="input input-bordered flex items-center gap-2">
              End time
              <input type="datetime-local" class="grow" />
            </label>
          </div>
          <div class="form-control mt-4">
            <button class="btn btn-primary">Upload</button>
          </div>
        </form>
        <p class="py-3 text-center">Press ESC key or click outside to close</p>
      </div>
      <form method="dialog" class="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  </div>
</template>

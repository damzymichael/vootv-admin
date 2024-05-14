<script setup lang="ts">
import { useUsers } from '@/utils/request'
import { useRouter } from 'vue-router'

const router = useRouter()

const { data, isPending, error } = useUsers()
</script>

<template>
  <div class="user">
    <h1 class="text-2xl mb-4 font-semibold">Users</h1>
    <section class="overflow-x-auto">
      <div v-if="isPending" class="flex gap-3 flex-col items-center justify-center h-32">
        <span class="loading loading-ring loading-lg"></span>
        Fetching Users
      </div>
      <div v-else-if="error">
        <p>{{ error }}</p>
      </div>
      <div v-else>
        <div v-if="data && data.length < 1">
          <p class="text-center font-semibold text-lg my-14">No users has signed up</p>
        </div>
        <div v-else>
          <table class="table min-w-[700px]">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Phone Number</th>
                <th>Streams</th>
                <th>Downloads</th>
                <th>Partner</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(user, index) in data"
                :key="index"
                class="hover cursor-pointer"
                @click="router.push(`/users/${user.id}`)"
              >
                <th>{{ index + 1 }}</th>
                <td>{{ user.fullName }}</td>
                <td>{{ user.phoneNumber }}</td>
                <td>{{ 'N/A' }}</td>
                <td>{{ 'N/A' }}</td>
                <td>{{ 'NO' }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

interface User {
  name: string
  email?: string
  phoneNumber: string
  streams: number
  downloads: number
  dateJoined?: Date
  partner: 'YES' | 'NO'
}

const users: User[] = [
  {
    name: 'Dan Charles Okoto',
    phoneNumber: '09087654321',
    streams: 450,
    downloads: 750,
    partner: 'YES'
  },
  {
    name: 'Dan Charles Okoto',
    phoneNumber: '09087654321',
    streams: 450,
    downloads: 750,
    partner: 'NO'
  },
  {
    name: 'Dan Charles Okoto',
    phoneNumber: '09087654321',
    streams: 450,
    downloads: 750,
    partner: 'YES'
  },
  {
    name: 'Dan Charles Okoto',
    phoneNumber: '09087654321',
    streams: 450,
    downloads: 750,
    partner: 'NO'
  }
]
</script>

<template>
  <div class="user">
    <h1 class="text-2xl mb-4 font-semibold">Users</h1>
    <div class="overflow-x-auto">
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
            v-for="(user, index) in users"
            :key="index"
            class="hover cursor-pointer"
            @click="router.push('/users/1')"
          >
            <th>{{ index + 1 }}</th>
            <td>{{ user.name }}</td>
            <td>{{ user.phoneNumber }}</td>
            <td>{{ user.streams }}</td>
            <td>{{ user.downloads }}</td>
            <td>{{ user.partner }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

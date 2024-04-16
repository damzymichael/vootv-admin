<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

interface Partner {
  name: string
  phoneNumber: string
  lastPayment: Date
  amount: number
  paymentStatus: 'one-time' | 'recurring'
}

const partners: Partner[] = [
  {
    name: 'Dan Charles Okoto',
    phoneNumber: '09087654321',
    lastPayment: new Date('2024/10/20'),
    amount: 50000,
    paymentStatus: 'one-time'
  },
  {
    name: 'Dan Charles Okoto',
    phoneNumber: '09087654321',
    lastPayment: new Date('2023/05/19'),
    amount: 75000,
    paymentStatus: 'recurring'
  },
  {
    name: 'Dan Charles Okoto',
    phoneNumber: '09087654321',
    lastPayment: new Date('2022/06/13'),
    amount: 20000,
    paymentStatus: 'one-time'
  },
  {
    name: 'Dan Charles Okoto',
    phoneNumber: '09087654321',
    lastPayment: new Date('2021-12-20'),
    amount: 10000,
    paymentStatus: 'recurring'
  }
]
</script>

<template>
  <div class="partner">
    <Toast />
    <h1 class="text-2xl mb-4 font-semibold">Partners</h1>
    <div class="overflow-x-auto">
      <table class="table min-w-[700px]">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Phone Number</th>
            <th>Last payment</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(partner, index) in partners"
            :key="index"
            class="hover cursor-pointer"
            @click="router.push('/partnership/1')"
          >
            <th>{{ index + 1 }}</th>
            <td>{{ partner.name }}</td>
            <td>{{ partner.phoneNumber }}</td>
            <td>{{ partner.lastPayment.toLocaleDateString() }}</td>
            <td>{{ partner.amount }}</td>
            <td>{{ partner.paymentStatus }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

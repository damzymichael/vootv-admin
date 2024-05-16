<template>
  <div id="partner">
    <div class="flex flex-wrap rounded-2xl bg-base-200 items-start gap-3 p-3 mb-3">
      <h1 class="w-full font-bold text-xl text-primary">Partner Information</h1>
      <div>
        <p className="text-sm mb-2"><span className="font-bold">Partner:</span> Dan Charles</p>
        <p className="text-sm mb-2">
          <span className="font-bold">Email Address:</span> dancharles23@gmail.com
        </p>
        <p className="text-sm mb-2"><span className="font-bold">Location: </span>RCN Akure</p>
        <p className="text-sm mb-2"><span className="font-bold">Phone Number:</span> 09087654321</p>
      </div>
    </div>
    <h1 class="font-bold text-xl text-primary mb-4">Payment history</h1>
    <div class="overflow-x-auto border border-gray-300 rounded-xl mb-4">
      <table class="table min-w-[700px]">
        <thead class="bg-neutral">
          <tr>
            <th></th>
            <th>Purpose</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Payment Method</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(payment, index) in payments" :key="index">
            <th>{{ index + 1 }}</th>
            <td>{{ payment.purpose }}</td>
            <td>{{ payment.amount.toLocaleString() }}</td>
            <td>{{ payment.date.toLocaleDateString() }}</td>
            <td>{{ payment.method }}</td>
            <td>{{ payment.type }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Payment {
  purpose: string
  amount: number
  date: Date
  method: string
  type: 'one-time' | 'recurring'
}
const payments: Payment[] = [
  {
    purpose: 'Tithe',
    amount: 2000,
    date: new Date('2024/04/12'),
    method: 'Card',
    type: 'recurring'
  },
  {
    purpose: 'Donation',
    amount: 10000,
    date: new Date('2023/12/12'),
    method: 'Bank Traansfer',
    type: 'one-time'
  }
]
</script>

<script setup lang="ts">
import { reactive, watchEffect, ref } from 'vue'
import type { Login } from '@/types'
import { useLogin } from '@/utils/request'
import Button from '@/components/Button.vue'
import { instance } from '@/utils/request'
import { useRouter } from 'vue-router'

const router = useRouter()

const { mutateAsync, isPending } = useLogin()

const login = reactive<Login>({ email: '', password: '' })

const loading = ref(false)

watchEffect(async () => {
  loading.value = true
  try {
    const { data } = await instance.get<string>('/user/auth?admin=true')
    loading.value = false
    if (data) router.replace('/overview')
  } catch (error) {
    loading.value = false
  }
})

const handleSubmit = async () => {
  for (const [key, value] of Object.entries(login)) {
    const trimmedValue = value.toString().trim()
    login[key as keyof typeof login] = trimmedValue
  }
  await mutateAsync(login)
}
</script>

<template>
  <div class="login flex flex-col items-center justify-center pt-3">
    <header class="text-center">
      <h1 class="text-3xl mb-1 font-extrabold">Voice of One TV</h1>
      <h2 class="text-xl font-bold">Admin Dashboard</h2>
    </header>
    <div class="w-screen h-[70vh] flex gap-3 flex-col items-center justify-center" v-if="loading">
      <span class="loading loading-ring loading-lg"></span>
      Authenticating
    </div>
    <div class="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100 mt-[9vh]" v-else>
      <h1 class="text-center mt-4 font-semibold text-2xl">Login</h1>
      <form class="card-body" @submit.prevent="handleSubmit">
        <div class="form-control">
          <label class="label">
            <span class="label-text">Email </span>
          </label>
          <input
            type="email"
            placeholder="Email"
            class="input input-bordered"
            required
            v-model="login.email"
          />
        </div>
        <div class="form-control">
          <label class="label">
            <span class="label-text">Password </span>
          </label>
          <input
            type="password"
            placeholder="Password"
            class="input input-bordered"
            required
            v-model="login.password"
          />
        </div>
        <div class="form-control mt-6">
          <Button class="btn btn-primary" :loading="isPending">Login</Button>
        </div>
      </form>
    </div>
  </div>
</template>

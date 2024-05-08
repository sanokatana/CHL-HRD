<script setup>
import { useTheme } from 'vuetify'
import AuthProvider from '@/views/pages/authentication/AuthProvider.vue'
import authV1MaskDark from '@images/pages/auth-v1-mask-dark.png'
import authV1MaskLight from '@images/pages/auth-v1-mask-light.png'
import authV1Tree2 from '@images/pages/auth-v1-tree-2.png'
import authV1Tree from '@images/pages/auth-v1-tree.png'
import { reactive, computed } from 'vue'
import axios from 'axios'
import Backend from '@/backend'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { useStore } from 'vuex'

const router = useRouter()
const store = useStore()
const form = reactive({
  email: '',
  password: '',
  remember: false,
})
const username = ref('')
const password = ref('')
const isLoading = ref(false)
const isLoggedIn = ref(false)
const backend = new Backend()

const login = async () => {
  try {
    const response = await backend.user.login({
      email: form.email,
      password: form.password
    })

    const { token } = response.data
    store.commit('login', response.data);

    // Store user data and token in localStorage
    
    localStorage.setItem('token', token)
    const responseUser = await backend.user.findUser({
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const { user } = responseUser.data
    localStorage.setItem('user', JSON.stringify(user))

    // Redirect to the desired route upon successful login
    router.push('/dashboard')
  } catch (error) {
    console.error('Login failed:', error);
  } finally {
    isLoading.value= false;
  }
}

const vuetifyTheme = useTheme()

const authThemeMask = computed(() => {
  return vuetifyTheme.global.name.value === 'light' ? authV1MaskLight : authV1MaskDark
})

const isPasswordVisible = ref(false)
</script>

<template>
  <!-- eslint-disable vue/no-v-html -->

  <div class="auth-wrapper d-flex align-center justify-center pa-4">
    <VCard
      class="auth-card pa-4 pt-7"
      min-width="500"
    >
      <VCardItem class="justify-center">
        <VCardTitle class="font-weight-semibold text-2xl text-proper">
          Cipta Harmoni Lestari Web App
        </VCardTitle>
      </VCardItem>

      <VCardText class="pt-2">
        <h5 class="text-h5 font-weight-semibold mb-1">
          Welcome to CHL HRD Application
        </h5>
        <p class="mb-0">
          Please sign-in to your account
        </p>
      </VCardText>

      <VCardText>
        <VForm @submit.prevent="login">
          <VRow>
            <!-- email -->
            <VCol cols="12">
              <VTextField
                v-model="form.email"
                label="Email"
                type="email"
              />
            </VCol>

            <!-- password -->
            <VCol cols="12">
              <VTextField
                v-model="form.password"
                label="Password"
                placeholder="············"
                :type="isPasswordVisible ? 'text' : 'password'"
                :append-inner-icon="isPasswordVisible ? 'ri-eye-off-line' : 'ri-eye-line'"
                @click:append-inner="isPasswordVisible = !isPasswordVisible"
              />

              <!-- remember me checkbox -->
              <div class="d-flex align-center justify-space-between flex-wrap mt-1 mb-4">
                <VCheckbox
                  v-model="form.remember"
                  label="Remember me"
                />
              </div>

              <!-- login button -->
              <VBtn
                block
                @click="login"
              >
                Login
              </VBtn>
            </VCol>

      
            <VCol
              cols="12"
              class="text-center"
            >
            </VCol>
          </VRow>
        </VForm>
      </VCardText>
    </VCard>

    <VImg
      class="auth-footer-start-tree d-none d-md-block"
      :src="authV1Tree"
      :width="250"
    />

    <VImg
      :src="authV1Tree2"
      class="auth-footer-end-tree d-none d-md-block"
      :width="350"
    />

    <!-- bg img -->
    <VImg
      class="auth-footer-mask d-none d-md-block"
      :src="authThemeMask"
    />
  </div>
</template>

<style lang="scss">
@use "@core-scss/pages/page-auth.scss";
</style>

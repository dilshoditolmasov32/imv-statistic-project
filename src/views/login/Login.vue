<script setup lang="ts">
import { onMounted, ref } from "vue";
import { Loading } from "@/components";
import LoginImage from "@/assets/images/png/login-image.webp";
import LogoIcon from "@/assets/icons/logo.svg";
import { useAuthStore } from "@/store/auth.pinia";
import generate from "@/utils/generateCode"


const isLoading = ref(true);
const authStore = useAuthStore();



onMounted(async () => {
  console.log("AUTH PAGE MOUNTED");
  const params = new URLSearchParams(window.location.search);
  const code = params.get('code');
  const verify = localStorage.getItem('verify');

  if (code && verify) {
    isLoading.value = true;
    try {
      await authStore.auth({
        code: code,
        redirect_url: import.meta.env.VITE_SSO_BASE_URL + '/auth',
        code_verifier: verify
      });
    } catch (error) {
      isLoading.value = false;
    }
  } else {
    isLoading.value = false;
  }
});

const handleLogin = (e: Event) => {
  console.log("AUTH PAGE MOUNTED");
  e.preventDefault();
  const { challenge, verify } = generate();
  localStorage.setItem('verify', verify);
  window.location.href = `https://sso.mf.uz/oauth2/login?clientId=e-grant&redirectUri=${import.meta.env.VITE_SSO_BASE_URL}/auth&codeChallenge=${challenge}`;

}
</script>

<template>
  <Transition name="fade" mode="out-in">
    <Loading v-if="isLoading" />
    <div v-else class="login-page">
      <div class="login-user-data">
        <a href="/" class="logo">
          <img :src="LogoIcon" alt="logo icon" />
        </a>

        <div class="login-user">
          <div>
            <h3>Kirish</h3>
          </div>
          <button @click="handleLogin" class="login-button">IMV ID orqali kirish</button>
        </div>

        <p class="login-text">© Axborot texnologiyalari markazi - {{ new Date().getFullYear() }}</p>
      </div>

      <div class="login-image">
        <img :src="LoginImage" alt="login image" />
        <div class="image-text">
          <p>
            O‘zbekiston Respublikasi Prezidentining 01.02.2024-yildagi
            PQ-785-sonli qarori ijrosida yaratildi
          </p>
        </div>
      </div>
    </div>
  </Transition>

</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.login-page {
  width: 100%;
  display: flex;
  height: 100vh;
}

.login-user-data {
  width: 50%;
  position: relative;
  padding: 32px;
  display: flex;
  flex-direction: column;
}

.logo img {
  height: 32px;
}

.login-user {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
}

.login-user h3 {
  font-size: 24px;
  font-weight: 600;
  margin: 0;
}

.login-button {
  width: 360px;
  background: #17b26a;
  color: #fff;
  font-weight: 600;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: 0.2s;
  padding: 12px;
}

.login-button:hover {
  background: #14965a;
}

.login-text {
  position: absolute;
  left: 32px;
  bottom: 32px;
  font-size: 14px;
  color: #535862;
}

.login-image {
  width: 50%;
  height: 100vh;
  position: relative;
  overflow: hidden;
}

.login-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
}

.image-text {
  position: absolute;
  bottom: 32px;
  right: 32px;
  left: 32px;
  background: #ffffff4d;
  backdrop-filter: blur(6px);
  padding: 24px 20px;
  border-radius: 12px;
  border: 1px solid #ffffff4d;
}

.image-text p {
  margin: 0;
  font-size: 14px;
  color: #1b1919;
  line-height: 1.5;
  font-weight: 600;
}
</style>

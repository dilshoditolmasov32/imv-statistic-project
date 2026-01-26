<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { Loading } from "@/components";
import { useAuthStore } from "@/store/auth";
import LoginImage from "@/assets/images/png/login-image.png";
import LogoIcon from "@/assets/images/svg/login-logo.svg";

const router=useRouter()
const isLoading = ref(true)
const authStore=useAuthStore()

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false
  }, 1500);
});

const handleLogin=()=>{
  localStorage.setItem("token", "fake-token-123");
  localStorage.setItem("user", JSON.stringify({ role: "admin", name: "Admin" }));
  authStore.token = "fake-token-123";
  authStore.user = {id:1, role: "admin", name: "Admin" };
    router.push("/")
}

</script>

<template>
  <Transition name="fade" mode="out-in">
  <Loading v-if="isLoading"/>
  <div v-else class="login-page">
    <div class="login-user-data">
      <a href="/" class="logo">
        <img :src="LogoIcon" alt="logo icon" />
      </a>

      <div class="login-user">
        <div>
          <h3>Kirish</h3>
        </div>
        <button 
        @click="handleLogin"
        class="login-button">IMV ID orqali kirish</button>
      </div>

      <p class="login-text">© Axborot texnologiyalari markazi - 2025</p>
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

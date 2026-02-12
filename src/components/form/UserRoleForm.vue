<script lang="ts" setup>
import { reactive, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { FormState } from "@/interface/FormState";
import Loading from "@components/loading/Loading.vue"
import { useAuthStore } from "@/store/auth";

const router = useRouter();
const authStore = useAuthStore();
const loading =ref(true)
onMounted(() => {
  setTimeout(() => {
    loading.value = false;
  }, 1500);
});

const formState = reactive<FormState>({
  username: "",
  password: "",
});
const onFinishFailed = (values: any) => {
  console.log("Success:", values);
};

const onFinish = (values: any) => {
  console.log("Success:", values);

  localStorage.setItem("token", "fake-token-123");
  localStorage.setItem("user", JSON.stringify({ role_name: "admin", name: "Admin" }));

  authStore.token = "fake-token-123";
  authStore.user = { id: 1, role_name: "admin", name: "Admin" };

  router.push("/");
};

</script>

<template>
  <Loading v-if="loading"/>
  <div class="login-page" v-else>
  <div class="login-left">
   <div class="user-role-form">
      <a-form
        :model="formState"
        name="basic"
        autocomplete="off"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
      >
        <a-form-item
          name="username"
          :rules="[{ required: true, message: 'Iltimos ismingizni kiriting', }]"
        >
          <p>Ismingiz  <span>
          *
          </span></p>
          <a-input v-model:value="formState.username"   placeholder="Dilshodbek..." required/>
        </a-form-item>

        <a-form-item
          name="password"
          :rules="[{ required: true, message: 'Iltimos parolingizni kiriting' }]"
        >
          <p>Parol 
          <span>
          *
          </span>
         </p>
          <a-input-password v-model:value="formState.password"    placeholder="123456" required
 />
        </a-form-item>

        <a-form-item>
          <a-button html-type="submit" @click="handleUserRoleState"> Kirish </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
  </div>
   
</template>

<style scoped>
.login-page {
  width: 100%;
  height: 100dvh;
  position: relative;
  background-image: url("../../assets/images/png/user-role.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  display: flex;
  align-items: center;
}

.login-page::before {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 0.55) 0%,
    rgba(0, 0, 0, 0.35) 35%,
    rgba(0, 0, 0, 0.1) 60%,
    rgba(0, 0, 0, 0) 100%
  );
}

.login-left {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 550px;
  margin-left: 50px;
  display: flex;
  align-items: center;
}

.user-role-form {
  width: 100%;
  background: #ffffff;
  border-radius: 14px;
  padding: 32px;
  box-shadow: 0px 20px 50px rgba(0, 0, 0, 0.25);
}

.user-role-form p {
  margin-bottom: 6px;
  font-size: 14px;
  font-weight: 500;
  color: #414651;
}
.user-role-form p span{
  color: #f04438;
}

:deep(.ant-form-item-required::before) {
  color: #f04438; 
}

:deep(.ant-input),
:deep(.ant-input-password) {
  padding: 10px 14px;
  border-radius: 8px;
  border: 1px solid #E9EAEB;
  box-shadow: 0px 1px 2px 0px #0A0D1408;
  font-size: 14px;
  transition: all 0.2s ease;
  text-transform: capitalize;
}

:deep(.ant-input:hover),
:deep(.ant-input-password:hover) {
  border-color: #17b26a;
}
:deep(ant-input css-dev-only-do-not-override-1p3hq3p){
  border:none !important;
}

:deep(.ant-input:focus),
:deep(.ant-input-focused),
:deep(.ant-input-password:focus),
:deep(.ant-input-password-focused) {
  border-color: #17b26a;
  box-shadow: 0 0 0 2px rgba(23, 178, 106, 0.15);
}

:deep(.ant-input-password-icon) {
  color: #98a2b3;
}

:deep(.ant-form-item-has-error .ant-input),
:deep(.ant-form-item-has-error .ant-input-password) {
  border-color: #f04438;
}

:deep(.ant-form-item-explain-error) {
  font-size: 12px;
  color: #f04438;
}

:deep(.ant-btn) {
  width: 100%;
  height: 44px;
  background: #17b26a;
  border-radius: 10px;
  border: none;
  font-size: 15px;
  font-weight: 600;
  color: #fff;
  transition: all 0.25s ease;
}

:deep(.ant-btn:hover) {
  background: #149f60;
  color: #fff;
}

:deep(.ant-btn:active) {
  background: #128a54;
}

:deep(.ant-btn:focus-visible) {
  box-shadow: 0 0 0 3px rgba(23, 178, 106, 0.25);
}

@media (max-width: 768px) {
  .login-left {
    margin-left: 0;
    justify-content: center;
    padding: 16px;
  }

  .login-page::before {
    background: rgba(0, 0, 0, 0.45);
  }
}

</style>
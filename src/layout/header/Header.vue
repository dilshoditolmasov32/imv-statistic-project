<script setup lang="ts">
import { nextTick, ref } from "vue";
import VueIcon from "@kalimahapps/vue-icons/VueIcon";
import userImageIcon from "@/assets/images/jpg/userIcon.jpg";
import hamburgerIcon from "@assets/icons/hamburger-menu.png";
import useTimerDate from "@/composables/useTimerDate.vue";
import { AnOutlinedMenuFold, AnOutlinedMenuUnfold } from "@kalimahapps/vue-icons";

const isOpen = ref(false);
const search = ref("");
const inputRef = ref<HTMLInputElement | null>(null);

const emit = defineEmits<{
  (e: "toggle"): void;
}>();
const props = defineProps<{
  isSidebarOpen: boolean;
}>();



const toggleSidebar = () => {
  console.log("HEADER: toggle bosildi");
  emit("toggle");
};

const openSearch = () => {
  isOpen.value = true;
  nextTick();
  const focusInput = () => {
    if (inputRef.value) {
      inputRef.value.focus();
    }
  };
};

const closeSearch = () => {
  if (!search.value) {
    isOpen.value = false;
  }
};
</script>

<template>
  <div class="header-layout">
    <div class="header-time">

      <button v-if="isSidebarOpen" class="toggle-btn" @click="toggleSidebar">
<AnOutlinedMenuFold style="font-size: 32px"/>
       
      </button>
      <button class="toggle-btn" v-else @click="toggleSidebar">
       <AnOutlinedMenuUnfold style="font-size: 32px"/>
      </button>
      <useTimerDate />
    </div>
    <div class="header-settings">
      <div class="search-wrapper">
        <button class="search-button" v-if="!isOpen" @click="openSearch">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.5 17.5L14.5834 14.5833M16.6667 9.58333C16.6667 13.4954 13.4954 16.6667 9.58333 16.6667C5.67132 16.6667 2.5 13.4954 2.5 9.58333C2.5 5.67132 5.67132 2.5 9.58333 2.5C13.4954 2.5 16.6667 5.67132 16.6667 9.58333Z"
              stroke="#717680"
              stroke-width="1.66667"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
        <input
          v-else
          ref="inputRef"
          v-model="search"
          type="text"
          class="search-input"
          placeholder="Izlash..."
          @blur="closeSearch"
        />
      </div>

      <button>
        <svg
          width="19"
          height="19"
          viewBox="0 0 19 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.16829 11.6683C10.549 11.6683 11.6683 10.549 11.6683 9.16829C11.6683 7.78758 10.549 6.66829 9.16829 6.66829C7.78758 6.66829 6.66829 7.78758 6.66829 9.16829C6.66829 10.549 7.78758 11.6683 9.16829 11.6683Z"
            stroke="#717680"
            stroke-width="1.67"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M14.7744 11.441C14.6735 11.6695 14.6434 11.923 14.688 12.1687C14.7325 12.4145 14.8497 12.6413 15.0244 12.8198L15.0698 12.8653C15.2107 13.006 15.3224 13.1731 15.3987 13.357C15.4749 13.541 15.5142 13.7381 15.5142 13.9372C15.5142 14.1363 15.4749 14.3335 15.3987 14.5174C15.3224 14.7014 15.2107 14.8685 15.0698 15.0092C14.9291 15.1501 14.762 15.2618 14.5781 15.3381C14.3941 15.4143 14.197 15.4536 13.9978 15.4536C13.7987 15.4536 13.6016 15.4143 13.4176 15.3381C13.2337 15.2618 13.0666 15.1501 12.9259 15.0092L12.8804 14.9637C12.7019 14.7891 12.4751 14.6719 12.2293 14.6274C11.9836 14.5828 11.7301 14.6129 11.5016 14.7137C11.2776 14.8098 11.0865 14.9692 10.9519 15.1725C10.8173 15.3757 10.745 15.6139 10.7441 15.8577V15.9865C10.7441 16.3883 10.5844 16.7737 10.3003 17.0578C10.0161 17.342 9.63074 17.5016 9.2289 17.5016C8.82706 17.5016 8.44167 17.342 8.15753 17.0578C7.87338 16.7737 7.71375 16.3883 7.71375 15.9865V15.9183C7.70788 15.6675 7.62672 15.4244 7.4808 15.2203C7.33489 15.0163 7.13097 14.8609 6.89557 14.7744C6.66707 14.6735 6.4136 14.6434 6.16785 14.688C5.92209 14.7325 5.69532 14.8497 5.51678 15.0244L5.47132 15.0698C5.33061 15.2107 5.1635 15.3224 4.97957 15.3987C4.79563 15.4749 4.59847 15.5142 4.39935 15.5142C4.20024 15.5142 4.00308 15.4749 3.81914 15.3987C3.63521 15.3224 3.4681 15.2107 3.32739 15.0698C3.18651 14.9291 3.07476 14.762 2.99851 14.5781C2.92226 14.3941 2.88301 14.197 2.88301 13.9978C2.88301 13.7987 2.92226 13.6016 2.99851 13.4176C3.07476 13.2337 3.18651 13.0666 3.32739 12.9259L3.37284 12.8804C3.54749 12.7019 3.66465 12.4751 3.70921 12.2293C3.75377 11.9836 3.72368 11.7301 3.62284 11.5016C3.52681 11.2776 3.36735 11.0865 3.1641 10.9519C2.96085 10.8173 2.72268 10.745 2.4789 10.7441H2.35011C1.94827 10.7441 1.56288 10.5844 1.27874 10.3003C0.994593 10.0161 0.834961 9.63074 0.834961 9.2289C0.834961 8.82706 0.994593 8.44167 1.27874 8.15753C1.56288 7.87338 1.94827 7.71375 2.35011 7.71375H2.41829C2.66905 7.70788 2.91224 7.62672 3.11625 7.4808C3.32026 7.33489 3.47565 7.13097 3.56223 6.89557C3.66308 6.66707 3.69316 6.4136 3.6486 6.16785C3.60404 5.92209 3.48688 5.69532 3.31223 5.51678L3.26678 5.47132C3.12591 5.33061 3.01415 5.1635 2.9379 4.97957C2.86165 4.79563 2.82241 4.59847 2.82241 4.39935C2.82241 4.20024 2.86165 4.00308 2.9379 3.81914C3.01415 3.63521 3.12591 3.4681 3.26678 3.32739C3.4075 3.18651 3.5746 3.07476 3.75854 2.99851C3.94247 2.92226 4.13963 2.88301 4.33875 2.88301C4.53786 2.88301 4.73502 2.92226 4.91896 2.99851C5.1029 3.07476 5.27 3.18651 5.41072 3.32739L5.45617 3.37284C5.63472 3.54749 5.86149 3.66465 6.10724 3.70921C6.353 3.75377 6.60646 3.72368 6.83496 3.62284H6.89557C7.11963 3.52681 7.31073 3.36735 7.44533 3.1641C7.57994 2.96085 7.65217 2.72268 7.65314 2.4789V2.35011C7.65314 1.94827 7.81277 1.56288 8.09692 1.27874C8.38107 0.994593 8.76645 0.834961 9.16829 0.834961C9.57014 0.834961 9.95552 0.994593 10.2397 1.27874C10.5238 1.56288 10.6834 1.94827 10.6834 2.35011V2.41829C10.6844 2.66207 10.7567 2.90025 10.8913 3.1035C11.0259 3.30675 11.217 3.4662 11.441 3.56223C11.6695 3.66308 11.923 3.69316 12.1687 3.6486C12.4145 3.60404 12.6413 3.48688 12.8198 3.31223L12.8653 3.26678C13.006 3.12591 13.1731 3.01415 13.357 2.9379C13.541 2.86165 13.7381 2.82241 13.9372 2.82241C14.1363 2.82241 14.3335 2.86165 14.5174 2.9379C14.7014 3.01415 14.8685 3.12591 15.0092 3.26678C15.1501 3.4075 15.2618 3.5746 15.3381 3.75854C15.4143 3.94247 15.4536 4.13963 15.4536 4.33875C15.4536 4.53786 15.4143 4.73502 15.3381 4.91896C15.2618 5.1029 15.1501 5.27 15.0092 5.41072L14.9637 5.45617C14.7891 5.63472 14.6719 5.86149 14.6274 6.10724C14.5828 6.353 14.6129 6.60646 14.7137 6.83496V6.89557C14.8098 7.11963 14.9692 7.31073 15.1725 7.44533C15.3757 7.57994 15.6139 7.65217 15.8577 7.65314H15.9865C16.3883 7.65314 16.7737 7.81277 17.0578 8.09692C17.342 8.38107 17.5016 8.76645 17.5016 9.16829C17.5016 9.57014 17.342 9.95552 17.0578 10.2397C16.7737 10.5238 16.3883 10.6834 15.9865 10.6834H15.9183C15.6745 10.6844 15.4363 10.7567 15.2331 10.8913C15.0298 11.0259 14.8704 11.217 14.7744 11.441Z"
            stroke="#717680"
            stroke-width="1.67"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
      <button>
        <svg
          width="17"
          height="19"
          viewBox="0 0 17 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.91117 16.6667C6.49878 17.1853 7.27065 17.5 8.11602 17.5C8.9614 17.5 9.73327 17.1853 10.3209 16.6667M13.116 5.83337C13.116 4.50729 12.5892 3.23552 11.6516 2.29784C10.7139 1.36016 9.44211 0.833374 8.11602 0.833374C6.78994 0.833374 5.51817 1.36016 4.58049 2.29784C3.64281 3.23552 3.11602 4.50729 3.11602 5.83337C3.11602 8.40853 2.46641 10.1717 1.74074 11.3379C1.12863 12.3216 0.822572 12.8135 0.833794 12.9507C0.84622 13.1026 0.878406 13.1605 1.00084 13.2514C1.11141 13.3334 1.60985 13.3334 2.60673 13.3334H13.6253C14.6222 13.3334 15.1206 13.3334 15.2312 13.2514C15.3536 13.1605 15.3858 13.1026 15.3983 12.9507C15.4095 12.8135 15.1034 12.3216 14.4913 11.3379C13.7656 10.1717 13.116 8.40853 13.116 5.83337Z"
            stroke="#717680"
            stroke-width="1.66667"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>

      <button id="user-profile">
        <img
          :src="userImageIcon"
          alt="user icon"
          width="40"
          height="40"
          aria-label="Settings"
        />
      </button>
    </div>
  </div>
</template>

<style scoped>
.header-time {
  display: flex;
  align-items: center;
  gap: 20px;
}

/* .toggle-btn{
  position: absolute;
  left: 0;
} */
.header-layout {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 25px;
  padding: 1rem 2rem;
  border-bottom: 1px solid #e9eaeb;
  background: #fff;
  position: sticky;
  top: 0;
  z-index: 999;
  background: #fff;
  width: 100%;
}

.header-settings {
  display: flex;
  align-items: center;
  gap: 4px;
}

.search-wrapper {
  position: relative;
}

.search-button {
  cursor: pointer;
}

.search-input {
  width: 20rem;
  padding: 8px 12px;
  border-radius: 10px;
  border: 1px solid #ccc;
  outline: none;
  box-shadow: 0px 1px 2px 0px #0a0d120d;
  color: #000;
}

.search-input::placeholder {
  color: #717680;
}
.header-settings button {
  padding: 8px 10px;
  margin-top: 4px;
}

#user-profile {
  padding: 0;
  margin: 0;
}

#user-profile img {
  width: 100%;
  border-radius: 50%;
  border: 0.75px solid #00000014;
}
</style>

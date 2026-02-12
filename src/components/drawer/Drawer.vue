<script lang="ts" setup>
import { ref, computed, onMounted, onUnmounted, watch } from "vue";
import SearchInput from "../search-input/Search.vue";
import closeIcon from "@assets/icons/closeIcon.svg";

const props = defineProps({
  isOpen: {
    required: true,
    type: Boolean,
  },
  drawerTitle: {
    type: String,
    default: "Ma'lumot",
  },
  drawerText: {
    type: String,
    default: "",
    required: true,
  },
  width: {
    type: Number,
    default: 560,
  },
});

const search = ref("");
const emit = defineEmits(["close", "success"]);

const handleSearch = () => {
  emit("success");
};

// 2. Endi 'props' nomi pastda bemalol ishlaydi
watch(() => props.isOpen, (newVal) => {
  if (!newVal) {
    search.value = "";
  }
});

// ... qolgan rezayz (resize) mantiqlari
const screenWidth = ref(window.innerWidth);
const handleResize = () => { screenWidth.value = window.innerWidth; };

onMounted(() => { window.addEventListener("resize", handleResize); });
onUnmounted(() => { window.removeEventListener("resize", handleResize); });

const drawerWidth = computed(() => {
  return screenWidth.value < 1400 ? 420 : 560;
});
</script>
<template>
  <a-drawer
    :open="isOpen"
    :width="drawerWidth"
    placement="right"
    @close="$emit('close')"
    :maskStyle="{background:'#00000066', height:'100vh'}"
    :headerStyle="{padding:'32px'}"
    :bodyStyle="{padding:'32px', }"
  >
    <template #title>
      <h3 class="drawer-title">
        {{ drawerTitle }}
      </h3>
    </template>
    <template #closeIcon>
      <button class="close-button">
        <img :src="closeIcon" alt="close icon" />
      </button>
    </template>

    <slot>
    <p class="input-title">{{ drawerText }}
    <span>*</span>
    </p>
      <SearchInput v-model="search" />

      <button class="search-button" @click="handleSearch"
      
      :disabled="search.length !==14"
      :style="{opacity: search.length !== 14 ? 0.5 : 1, cursor: search.length !== 14 ? 'not-allowed' : 'pointer' }"
      >Izlash</button>
    </slot>
  </a-drawer>
</template>

<style scoped>
:deep(.ant-drawer-mask) {
  background: #00000066 !important;
}

:deep(.ant-drawer-body) {
  padding: 24px;
  display: flex;
  flex-direction: column;
}

.drawer-title {
  color: #101828;
  font-weight: 600;
  font-size: 30px;
  line-height: 38px;
  letter-spacing: 0%;
}

.close-button {
  padding: 14px;
  background: #0a0d12;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.search-button {
  background: #17b26a;
  color: #fff;
  border: 2px solid #0a0d120d;
  font-size: 15px;
  padding: 10px 16px;
  border-radius: 6px;
  font-weight: 600;
  box-shadow: 0px 1px 2px 0px #0a0d120d;
  margin-top: 16px;
}

.input-title{
    color: #414651;
    font-weight: 500;
    text-transform: uppercase;
    font-size: 16px;
    margin-bottom: 6px;
}

.input-title span{ 
    color: #079455;
    font-weight: 500;
    font-size: 18px;
}
</style>

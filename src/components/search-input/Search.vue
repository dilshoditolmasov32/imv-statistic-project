<script lang="ts" setup>
import { ref, watch } from "vue";
import searchIcon from "../../assets/icons/search.svg"
const props = defineProps<{
  modelValue: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const value = ref(props.modelValue);

watch(() => props.modelValue, (newVal) => {
  value.value = newVal;
});

const handleInput = (e: Event) => {
  const input = e.target as HTMLInputElement;
  const val = input.value;
  value.value = val;
  emit("update:modelValue", val);
};
</script>


<template>
  <div>
    <a-input :value="value" @input="handleInput" placeholder="Izlash..." class="custom-search-input">

      <template #prefix>
        <img :src="searchIcon" alt="search icon" aria-label="search icon" class="search-image-icon">
      </template>
    </a-input>


  </div>
</template>

<style scoped>
.custom-search-input {
  width: 100%;
  border-radius: 6px;
  box-shadow: 0px 1px 2px 0px #0A0D120D;
  border: 1px solid #F5F5F5;
  padding: 10px 14px;
  color: #717680;
  text-transform: capitalize;
  outline: none;
  transition: border 0.4s ease-in-out;
  font-size: 15px;
}



.custom-search-input:hover {
  border: 1px solid #F5F5F5 !important;
}

.search-image-icon {
  width: 20px;
  height: 20px;
  margin-right: 8px;
}

.input-error {
  border-color: #f5222d !important;
}

.error-text {
  color: #f5222d;
  font-size: 12px;
  margin: 0;
  margin-top: 4px;
  font-weight: 500;
}

:deep(.ant-input-prefix) {
  display: flex;
  align-items: center;
  border-color: #F5F5F5 !important;
  box-shadow: none !important;
}
</style>

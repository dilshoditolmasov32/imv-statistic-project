<script lang="ts" setup>
import { computed } from "vue";
import prev from "../../assets/icons/prev.svg";
import next from "../../assets/icons/next.svg";

const props = defineProps<{
  total: number;
  page: number;
  pageSize: number;
}>();

const emit = defineEmits<{
  (e: "update:page", value: number): void;
}>();

const totalPages = computed(() => Math.ceil(props.total / props.pageSize));
const goPrev = () => {
  if (props.page > 1) {
    emit("update:page", props.page - 1);
  }
};

const goNext = () => {
  if (props.page < totalPages.value) {
    emit("update:page", props.page + 1);
  }
};
</script>

<template>
  <div class="custom-pagination">
    <button class="nav-button" :disabled="page === 1" @click="goPrev">
      <img :src="prev" />
      <span>Oldingi</span>
    </button>

    <div class="pagination-link">
      <a-pagination :current="page" :total="total" :page-size="pageSize" :show-size-changer="false"
        @change="emit('update:page', $event)" />

    </div>


    <button class="nav-button" :disabled="page === totalPages" @click="goNext">
      <span>Keyingi</span>
      <img :src="next" />
    </button>
  </div>

</template>

<style scoped>
.custom-pagination {
  width: 100%;
  padding-bottom: 18px;
  display: flex;
  justify-content: space-between;
}

:deep(.ant-pagination) {
  display: flex !important;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  list-style: none;
  padding: 0;
}

:deep(.ant-pagination-prev),
:deep(.ant-pagination-next) {
  display: none !important;
  order: 1;
  border: 1px solid #d5d7da;
  box-shadow: 0px 1px 2px 0px #0a0d120d;
  font-weight: 600;
  color: #414651;
  font-size: 16px;
  border-radius: 12px;
}

:deep(.ant-pagination-next) {
  order: 3;
}

:deep(.ant-pagination-item-link) {
  display: none !important;
  border: none !important;
  box-shadow: none !important;
}

:deep(.ant-pagination-item),
:deep(.ant-pagination-jump-prev),
:deep(.ant-pagination-jump-next) {
  order: 2;
  margin: 0 4px;
}

.nav-button {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 15px;
  border: 1px solid #d0d5dd;
  border-radius: 12px;
  background: white;
  cursor: pointer;
  transition: all 0.3s;
}

.nav-button:disabled{
 background-color:  #f5f5f5; 
  color: #666666;           
  cursor: not-allowed;   
  opacity: 0.65;              
  pointer-events: none;  
}

.nav-button span {
  font-weight: 600;
  color: #535862;
  font-size: 18px;
}

:deep(.ant-pagination-item) {
  background: transparent !important;
  border-radius: 12px;
  border: 1px solid #f5f5f5 !important;
}

:deep(.ant-pagination-item a) {
  color: #535862 !important;
  font-weight: 500;
  font-size: 15px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
}

:deep(.ant-pagination-prev) {
  margin-right: auto;
}

:deep(.ant-pagination-next) {
  margin-left: auto;
}

:deep(.ant-pagination-item),
:deep(.ant-pagination-jump-prev),
:deep(.ant-pagination-jump-next) {
  margin: 0 2px;
  width: 40px;
  height: 40px;
  line-height: 32px;
  border: none !important;
  background: transparent !important;
}

:deep(.ant-pagination-prev .ant-pagination-item-link),
:deep(.ant-pagination-next .ant-pagination-item-link) {
  border: none !important;
  background: transparent !important;
  display: flex;
  align-items: center;
  padding: 0;
}

:deep(.ant-pagination-item-active) {
  background: transparent !important;
  border: none !important;
}

:deep(.ant-pagination-item-active a) {
  background: #f5f5f5 !important;
  border-radius: 8px;
  color: #252b37 !important;
  width: 40px;
  height: 40px;
}
</style>

<script setup lang="ts">
import Loading from "../loading/Loading.vue";
defineProps<{
  data: any[];
  columns: any[];
  hideAction?: boolean;
  loading?: boolean;
}>();

const emit = defineEmits<{
  (e: "approve", record: any): void;
  (e: "reject", record: any): void;
  (e: "edit", record: any): void;
  (e: "delete", id: number): void;
}>();


</script>

<template>
  <div class="table-container">
    <Loading v-if="loading" />
    <a-table
      :dataSource="data"
      :columns="columns"
      :pagination="false"
      :class="{ 'is-loading': loading }"
      bordered
      rowKey="id"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'actionState'">
          <slot name="actionContent" :record="record">
            <div
              v-if="!record.actionState.confirmed && !record.actionState.cancelled"
              class="action-btns"
            >
              <button class="confirm-btn" @click="emit('approve', record)">
                Tasdiqlash
              </button>
              <button class="reject-btn" @click="emit('reject', record)">
                Rad etish
              </button>
            </div>
            <div v-else>
              <button v-if="record.actionState.confirmed" class="confirmed-btn">
                Tasdiqlangan
              </button>
              <button v-if="record.actionState.cancelled" class="rejected-btn">
                Rad etilgan
              </button>
            </div>
          </slot>
        </template>

        <template v-else-if="column.key === 'actions'">
          <div class="operation-btns">
            <a-button
              v-if="record.buttons?.editBtn"
              type="link"
              @click="emit('edit', record)"
            >
              <img :src="record.buttons.editBtn" alt="edit" width="18" />
            </a-button>

            <a-button
              v-if="record.buttons?.deleteBtn"
              type="link"
              danger
              @click="emit('delete', record.id)"
            >
              <img :src="record.buttons.deleteBtn" alt="delete" width="18" />
            </a-button>
          </div>
        </template>
      </template>
    </a-table>
  </div>
</template>

<style scoped>
.table-container {
  position: relative;
}

.is-loading {
  opacity: 0.5;
  pointer-events: none;
}

.no-hover-change:hover {
  color: inherit !important;
  border-color: #d9d9d9 !important;
  background-color: #fff !important;
}

.action-btns,
.operation-btns {
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
}

:deep(.ant-table-thead > tr > th) {
  background-color: #e9eaeb;
}

/* Jadvalning asosiy qismi (body) uchun */
:deep(.ant-table-tbody > tr > td) {
  font-weight: 400;
  font-size: 15px;
  color: #535862;
  /* padding: 7px 24px; */
}

:deep(.ant-table-thead > tr > th) {
  font-weight: 600;
  font-size: 16px;
  background: #fafafa;
  color: #717680;
}

.confirm-btn,
.reject-btn {
  padding: 8px 14px;
  background: #17b26a;
  border: 2px solid;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: 600;
  border-radius: 8px;
  font-size: 16px;
  transition: all 0.3s ease;
}

.confirm-btn,
.reject-btn {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}

.confirm-btn:hover {
  background: #129057e8;
}

.reject-btn {
  background: none;
  color: #912018;
  border: 1px solid #fda29b;
}

.reject-btn:hover {
  background: #fef3f2;
}

.confirmed-btn,
.rejected-btn {
  padding: 2px 8px;
  border-radius: 16px;
  font-weight: 500;
}

.confirmed-btn {
  border: 1px solid #abefc6;
  color: #067647;
  background: #ecfdf3;
}

.rejected-btn {
  border: 1px solid #fecdca;
  color: #b42318;
  background: #fef3f2;
}
</style>

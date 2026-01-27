<script setup lang="ts">
import { computed, ref } from "vue";
import { TableColumn, SearchInput, Pagination, BreadCrumb } from "@/components";
import { RequestTableData } from "@data/RequestTableData";
import addIcon from "@assets/icons/add.svg";
import Drawer from "@/components/drawer/Drawer.vue";
import { RequestTableType } from "@/interface/RequestTableType";

const columns = [
  { title: "№", dataIndex: "id", key: "id", align: "center" },
  {
    title: "Rol turi",
    dataIndex: "organizationName",
    key: "organizationName",
  },

  { title: "Xodim", dataIndex: "IDNumber", key: "IDNumber" },
  {
    title: "Yaratilgan vaqti",
    dataIndex: "requirementCount",
    key: "requirementCount",
  },
  { title: "Holat", dataIndex: "actionState", key: "actionState", align: "center" },
  { title: "", dataIndex: "buttons", key: "actions", align: "center" },
];


const page = ref(1);
const pageSize = 12;
const isLoading = ref(false);
const currentTitle = ref("Rol qo’shish");
const currentText = ref("JShSHIR");
const TableData = ref<RequestTableType[]>([...RequestTableData]);

const paginatedData = computed(() => {
  const start = (page.value - 1) * pageSize;
  return TableData.value.slice(start, start + pageSize);
});

const handleEdit = (record: any) => {
  console.log("Tahrirlash uchun:", record);
};

const handleDelete = (id: number) => {
  TableData.value = TableData.value.filter((item) => item.id !== id);
};

const isDrawerOpen = ref(false);

const handleSuccess = () => {
  isDrawerOpen.value = false;
};


const handleApprove = (record: any) => {
  record.actionState.confirmed = true;
  record.actionState.cancelled = false;
};

const handleReject = (record: any) => {
  record.actionState.cancelled = true;
  record.actionState.confirmed = false;
};

</script>

<template>
  <div class="roles-page">
    <div class="add-container">
      <BreadCrumb title="Rollar" />
      <button class="add-button" @click="isDrawerOpen = true">
        <img :src="addIcon" alt="add icon" aria-label="add icon" />
        <span> Rol qo’shish</span>
      </button>
    </div>
    <h2 class="roles-title">Rollar</h2>
    <div class="roles-content">
      <TableColumn
        :data="paginatedData"
        :columns="columns"
        :loading="isLoading"
        @edit="handleEdit"
        @delete="handleDelete"
        @approve="handleApprove"
        @reject="handleReject"
        
      />
      <div class="pagination-footer">
        <Pagination
          :total="TableData.length"
          :page="page"
          :page-size="pageSize"
          @update:page="page = $event"
        />
      </div>
    </div>
  </div>
  <Drawer
    :is-open="isDrawerOpen"
    :width="560"
    :drawer-title="currentTitle"
    :drawer-text="currentText"
    @close="isDrawerOpen = false"
    @success="handleSuccess"
    class="custom-drawer"
  />
</template>

<style scoped>

.custom-drawer .ant-drawer-content-wrapper {
  width: 520px !important;
}

/* Tablet */
@media (max-width: 1024px) {
  .custom-drawer .ant-drawer-content-wrapper {
    width: 360px !important;
  }
}
.roles-content {
  border: 1px solid #e9eaeb;
  box-shadow: 0px 1px 2px 0px #0a0d120d;
  border-radius: 12px;
}

.add-container {
  display: flex;
  justify-content: space-between;
}

.roles-header {
  padding: 16px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.button-filter,
.add-button {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 10px 14px;
  border: 2px solid #d5d7da;
  border-radius: 8px;
  font-weight: 600;
}

.button-filter span{
  color: #414651;
}


.add-button {
  background: #17b26a;
  color: #fff;
  border: 2px solid #0a0d120d;
  font-size: 15px;
}

.roles-title {
  margin-bottom: 12px;
  font-size: 24px;
  font-weight: 600;
  color: #000;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 24px;
}

.pagination-footer {
  margin: 12px 24px 16px;
}
</style>

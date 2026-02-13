<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { TableColumn, Pagination, BreadCrumb } from "@/components";
import addIcon from "@assets/icons/add.svg";
import Drawer from "@/components/drawer/Drawer.vue";
import { UserRole, UserRoleResponse } from "@/interface/Role";
import { getUserRoleData } from "@/services/role.service";

const columns = [
  { title: "№", dataIndex: "id", key: "id", align: "center" },
  {
    title: "Rol turi",
    dataIndex: "role_name",
    key: "role_name",
  },

  { title: "Xodim", dataIndex: "full_name", key: "full_name" },
  {
    title: "Yaratilgan vaqti",
    dataIndex: "created_at",
    key: "created_at",
  },
  { title: "Holat", dataIndex: "status", key: "status", align: "center" },
  { title: "", dataIndex: "buttons", key: "actions", align: "center" },
];

const page = ref(1);
const pageSize = ref(10);
const totalCount = ref(0);
const isLoading = ref(false);
const search = ref("");
const currentTitle = ref("Rol qo’shish");
const currentText = ref("JShSHIR");
const userRole = ref<UserRole[]>([]);

const userRoleData = async (currentPage = 1) => {
  isLoading.value = true;
  try {
    const response: UserRoleResponse = await getUserRoleData(currentPage, pageSize.value);


    userRole.value = response.data;
    totalCount.value = response.total_count;
    pageSize.value = response.per_page;
    page.value = response.current_page;
  } catch (err) {
    console.error("Xatolik bor:", err);
    userRole.value = [];
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  userRoleData();
});

const filteredData = computed(() => {
  const searchData = search.value.toLowerCase();
  if (!search.value) return userRole.value;

  return userRole.value.filter(
    (item) =>
      item.role_name.toLowerCase().includes(searchData) ||
      item.full_name.includes(searchData) ||
      item.pinfl.includes(searchData)
  );
});

const paginatedData = computed(() => {
  return filteredData.value;
});

const handlePageChange = (newPage: number) => {
  page.value = newPage;
  userRoleData(newPage);
};
const handleEdit = (record: any) => {
  console.log("Tahrirlash uchun:", record);
};

const handleDelete = (id: number) => {
   userRole.value = userRole.value.filter((item) => item.id !== id);
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
          :total="filteredData.length"
          :page="page"
          :page-size="pageSize"
          @update:page="handlePageChange"
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

.button-filter span {
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

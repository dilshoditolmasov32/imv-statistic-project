<script setup lang="ts">
import * as XLSX from "xlsx";
import { computed, onMounted, ref } from "vue";
import { TableColumn, SearchInput, Pagination, BreadCrumb } from "@/components";
import excelIcon from "@assets/icons/excel.svg";
import filterIcon from "@assets/icons/filter.svg";
import addIcon from "@assets/icons/add.svg";
import Drawer from "@/components/drawer/Drawer.vue";
import { typeOrganization, OrganizationResponse } from "@/interface/Organizations";
import { getOrganizationsData } from "@/services/organization.service";

const columns = [
  { title: "№", dataIndex: "id", key: "id", align: "center" },
  { title: "Tashkilot nomi", dataIndex: "name", key: "name" },
  { title: "STIR", dataIndex: "tin", key: "tin" },
  { title: "Hudud", dataIndex: "region_name", key: "region_name", align: "center" },
  { title: "Vakolati", dataIndex: "vacant_position_count", key: "vacant_position_count", align: "center" },
  { title: "Amallar", dataIndex: "buttons", key: "actions", align: "center" },
];


const page = ref(1);
const pageSize = ref(10);
const totalCount = ref(0);
const isLoading = ref(false);
const search = ref("");
const organizations = ref<typeOrganization[]>([]);


const organizationData = async (currentPage = 1) => {
  isLoading.value = true;
  try {
    const response: OrganizationResponse = await getOrganizationsData(currentPage, pageSize.value);

    console.log(response)

    organizations.value = response.data;
    totalCount.value = response.total_count;
    pageSize.value = response.per_page;
    page.value = response.current_page;
  } catch (err) {
    console.error("Xatolik bor:", err);
    organizations.value = [];
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  organizationData();
});

const filteredData = computed(() => {
  const searchData = search.value.toLowerCase();
  if (!search.value) return organizations.value;

  return organizations.value.filter(
    (item) =>
      item.name.toLowerCase().includes(searchData) ||
      item.region_name.includes(searchData) ||
      item.tin.includes(searchData)
  );
});

const paginatedData = computed(() => {
  return filteredData.value;
});

const handlePageChange = (newPage: number) => {
  page.value = newPage;
  organizationData(newPage);
};

const handleApprove = (record: any) => {
  record.actionState.confirmed = true;
  record.actionState.cancelled = false;
};

const handleReject = (record: any) => {
  record.actionState.cancelled = true;
  record.actionState.confirmed = false;
};

const handleEdit = (record: any) => {
  console.log("Tahrirlash uchun:", record);
};

const handleDelete = (id: number) => {
  organizations.value = organizations.value.filter((item) => item.id !== id);
};

const isDrawerOpen = ref(false);

const handleSuccess = () => {
  isDrawerOpen.value = false;
};

const currentTitle = ref("Tashkilot qo’shish");
const currentText = ref("STIR");

const exportToExcel = () => {
  const worksheet = XLSX.utils.json_to_sheet(organizations.value);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Organizations");
  XLSX.writeFile(workbook, "organizations.xlsx");
};
</script>

<template>
  <div class="organization-page">
    <div class="add-container">
      <BreadCrumb title="Tashkilotlar" />
      <button class="add-button" @click="isDrawerOpen = true">
        <img :src="addIcon" alt="add icon" aria-label="add icon" />
        <span> Tashkilot qo’shish </span>
      </button>
    </div>
    <h2 class="organization-title">Tashkilotlar</h2>
    <div class="organization-content">
      <div class="organization-header">
        <div class="header-left">
          <SearchInput v-model="search" />

          <button class="button-filter">
            <img :src="filterIcon" alt="filter icon" />
            <span> Filtr </span>
          </button>
        </div>

        <div class="header-right">
          <button class="button-filter" @click="exportToExcel">
            <img :src="excelIcon" alt="excel icon" />
            <span> Yuklash </span>
          </button>
        </div>
      </div>
      <TableColumn
      :data="paginatedData"
        :columns="columns"
        :loading="isLoading"
        @edit="handleEdit"
        @delete="handleDelete"
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
  />
</template>

<style scoped>
.organization-content {
  border: 1px solid #e9eaeb;
  box-shadow: 0px 1px 2px 0px #0a0d120d;
  border-radius: 12px;
}

.add-container {
  display: flex;
  justify-content: space-between;
}

.organization-header {
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

.organization-title {
  margin-bottom: 12px;
  font-size: 22px;
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

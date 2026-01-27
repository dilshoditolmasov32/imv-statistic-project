<script setup lang="ts">
import * as XLSX from "xlsx";
import { computed, onMounted, ref } from "vue";
import { TableColumn, SearchInput, Pagination, BreadCrumb } from "@/components";
import { RequestTableData } from "@data/RequestTableData";
import excelIcon from "@assets/icons/excel.svg";
import filterIcon from "@assets/icons/filter.svg";
import addIcon from "@assets/icons/add.svg";
import Drawer from "@/components/drawer/Drawer.vue";
import { RequestTableType } from "@/interface/RequestTableType";

const columns = [
  { title: "№", dataIndex: "id", key: "id", align: "center" },
  {
    title: "Tashkilot nomi",
    dataIndex: "organizationName",
    key: "organizationName",
  },

  { title: "STIR", dataIndex: "IDNumber", key: "IDNumber" },
  {
    title: "Hudud",
    dataIndex: "requirementCount",
    key: "requirementCount",
    align: "center",
  },
  {
    title: "Vakolati",
    dataIndex: "directionCount",
    key: "directionCount",
    align: "center",
  },
  { title: "", dataIndex: "buttons", key: "actions", align: "center" },
];


const search=ref("")
const page = ref(1);
const pageSize = 12;
const tableData = ref<RequestTableType[]>([...RequestTableData]);
const isLoading = ref(false);
onMounted(() => {
  setTimeout(() => {
    isLoading.value = false;
  }, 1500);
});

const filteredData = computed(() => {
  if (!search.value) return tableData.value;

  return tableData.value.filter(item =>
    item.organizationName.toLowerCase().includes(search.value.toLowerCase())
  );
});

const paginatedData = computed(() => {
  const start = (page.value - 1) * page.value;
  const end = start + pageSize;
  return filteredData.value.slice(start, end);
});


const handleEdit = (record: any) => {
  console.log("Tahrirlash uchun:", record);
};

const handleDelete = (id: number) => {
  tableData.value = tableData.value.filter((item) => item.id !== id);
};

const isDrawerOpen = ref(false);

const handleSuccess = () => {
  isDrawerOpen.value = false;
};

const currentTitle = ref("Tashkilot qo’shish");
const currentText = ref("STIR");

const exportToExcel = () => {
  const worksheet = XLSX.utils.json_to_sheet(RequestTableData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Organizations");
  XLSX.writeFile(workbook, "users.xlsx");
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
          :total="tableData.length"
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

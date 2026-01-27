<script setup lang="ts">
import * as XLSX from "xlsx";
import { computed, onMounted, ref } from "vue";
import { TableColumn, SearchInput, Pagination, BreadCrumb } from "@/components";
import { RequestTableData } from "@data/RequestTableData";
import { RequestTableType } from "@/interface/RequestTableType";
import excelIcon from "@assets/icons/excel.svg";
import filterIcon from "@assets/icons/filter.svg";

const columns = [
  { title: "№", dataIndex: "id", key: "id", align: "center" },
  {
    title: "Tashkilot nomi",
    dataIndex: "organizationName",
    key: "organizationName",
  },

  { title: "Yo‘nalish shifri", dataIndex: "IDNumber", key: "IDNumber" },

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

const exportToExcel = () => {
  const worksheet = XLSX.utils.json_to_sheet(RequestTableData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Specials");
  XLSX.writeFile(workbook, "specials.xlsx");
};
</script>

<template>
  <div class="organization-page">
      <BreadCrumb title="Ta’lim yo‘nalishlari" />
  
    <h2 class="organization-title">Ta’lim yo‘nalishlari</h2>
    <div class="organization-content">
      <div class="organization-header">
        <div class="header-left">
          <SearchInput v-model="search" />

          <button class="button-filter" >
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

.add-button {
  background: #17b26a;
  color: #fff;
  border: 2px solid #0a0d120d;
  font-size: 15px;
}

.button-filter span{
  color: #414651;
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

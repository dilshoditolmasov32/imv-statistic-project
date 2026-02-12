<script setup lang="ts">
import * as XLSX from "xlsx";
import { computed, onMounted, ref } from "vue";
import { TableColumn, SearchInput, Pagination, BreadCrumb } from "@/components";
import { typeUniversities, UniversityResponse } from "@/interface/Universities";
import { getUniversityData } from "@/services/university.service";
import excelIcon from "@assets/icons/excel.svg";
import filterIcon from "@assets/icons/filter.svg";

const columns = [
  { title: "№", dataIndex: "id", key: "id", align: "center" },
  { title: "Yo‘nalish nomi", dataIndex: "name", key: "name" },
  { title: "turi", dataIndex: "description", key: "description", width: "200px" },
  { title: "Veb sayt", dataIndex: "website", key: "website", width: "180px" },
];

const page = ref(1);
const pageSize = ref(10); 
const totalCount = ref(0);
const isLoading = ref(false);
const search = ref("");
const universities = ref<typeUniversities[]>([]);

const universitiesData = async (currentPage = 1) => {
  isLoading.value = true;
  try {
    const response: UniversityResponse = await getUniversityData(
      currentPage,
      pageSize.value
    );

    universities.value = response.data;
    totalCount.value = response.total_count;
    pageSize.value = response.per_page;
    page.value = response.current_page;

  } catch (err) {
    console.error("Xatolik bor:", err);
    universities.value = [];
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  universitiesData();
});

const filteredData = computed(() => {
  if (!search.value) return universities.value;
  const s = search.value.toLowerCase();
  return universities.value.filter(
    (item) =>
      item.name?.toLowerCase().includes(s) || item.description?.toLowerCase().includes(s)
  );
});

const paginatedData = computed(() => {
  return filteredData.value;
});

const handlePageChange = (newPage: number) => {
  page.value = newPage;
  universitiesData(newPage);
};

const exportToExcel = () => {
  const worksheet = XLSX.utils.json_to_sheet(universities.value);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "University");
  XLSX.writeFile(workbook, "university.xlsx");
};

</script>

<template>
  <div class="organization-page">
    <BreadCrumb title="Universitetlar ro’yxati" />

    <h2 class="organization-title">Universitetlar ro’yxati</h2>
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
      <TableColumn :data="paginatedData" :columns="columns" :loading="isLoading" />
      <div class="pagination-footer">
        <Pagination
          :total="totalCount"
          :page="page"
          :page-size="pageSize"
          @update:page="handlePageChange"
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

.button-filter span {
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

<script setup lang="ts">
import { TableColumn, SearchInput, Pagination, BreadCrumb } from "@/components";
import { RequestTableType } from "@/interface/RequestTableType";
import { RequestTableData } from "@data/RequestTableData";
import { computed, onMounted, ref } from "vue";
const columns = [
  { title: "ID", dataIndex: "id", key: "id" },
  {
    title: "Tashkilot",
    dataIndex: "organizationName",
    key: "organizationName",
    width: "450px",
  },

  { title: "ID raqam", dataIndex: "IDNumber", key: "IDNumber" },
  {
    title: "Talablar",
    dataIndex: "requirementCount",
    key: "requirementCount",
    align: "center",
  },
  {
    title: "Yo‘nalishlar",
    dataIndex: "directionCount",
    key: "directionCount",
    align: "center",
  },
  { title: "Sana", dataIndex: "updateDate", key: "updateDate", align: "center" },
  { title: "Holat", dataIndex: "actionState", key: "actionState", align: "center" },
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
  tableData.value = tableData.value.filter((item) => item.id !== id);
};
</script>

<template>
  <div class="request-page">
    <BreadCrumb title="Arizalar" />
    <h2 class="request-title">Arizalar</h2>
    <div class="request-content">
      <div class="request-header">
        <SearchInput v-model="search" />

        <button class="button-filter">
          <svg
            width="17"
            height="12"
            viewBox="0 0 17 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.3335 5.83337H13.3335M0.833496 0.833374H15.8335M5.8335 10.8334H10.8335"
              stroke="#414651"
              stroke-width="1.66667"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <span> Filtr </span>
        </button>
      </div>
      <TableColumn
        :data="paginatedData"
        :columns="columns"
        :loading="isLoading"
        @approve="handleApprove"
        @reject="handleReject"
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
.request-content {
  border: 1px solid #e9eaeb;
  box-shadow: 0px 1px 2px 0px #0a0d120d;
  border-radius: 12px;
}

.request-header {
  padding: 16px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.button-filter {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 10px 14px;
  box-shadow: 0px 1px 2px 0px #0a0d120d;
  border: 2px solid #d5d7da;
  border-radius: 8px;
  font-weight: 600;
}

.request-title {
  margin-bottom: 12px;
  font-size: 22px;
  font-weight: 600;
  color: #000;
}

.pagination-footer {
  margin: 14px 24px 18px;
}
</style>

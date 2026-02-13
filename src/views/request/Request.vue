<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { TableColumn, SearchInput, Pagination, BreadCrumb } from "@/components";
import { RequestResponse, RequestTableType } from "@/interface/RequestTableType";
import { getRequestsData } from "@/services/request.service";

const columns = [
  { title: "ID", dataIndex: "id", key: "id", align: "center" },
  {
    title: "Tashkilot",
    dataIndex: "organizationName",
    key: "organizationName",
    width: "500px",
  },

  { title: "ID raqam", dataIndex: "IDNumber", key: "IDNumber", width: "150px" },
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
  {
    title: "Sana",
    dataIndex: "updateDate",
    key: "updateDate",
    align: "center",
    width: "200px",
  },
  {
    title: "Holat",
    dataIndex: "actionState",
    key: "actionState",
    align: "center",
    width: "250px",
  },
  { title: "", dataIndex: "buttons", key: "actions", align: "center" },
];

const page = ref(1);
const pageSize = ref(10);
const totalCount = ref(0);
const isLoading = ref(false);
const search = ref("");
const requests = ref<RequestTableType[]>([]);

const requestData = async (currentPage = 1) => {
  isLoading.value = true;
  try {
    const response: RequestResponse = await getRequestsData(currentPage, pageSize.value);

    requests.value = response.data;
    totalCount.value = response.total_count;
    pageSize.value = response.per_page;
    page.value = response.current_page;
  } catch (err) {
    console.error("Xatolik bor:", err);
    requests.value = [];
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  requestData();
});

const filteredData = computed(() => {
  const searchData = search.value.toLowerCase();
  if (!search.value) return requests.value;

  return requests.value.filter(
    (item) =>
      item.organizationName.toLowerCase().includes(searchData) ||
      item.IDNumber.toString().includes(searchData) ||
      item.id.toString().includes(searchData) ||
      item.webciteName.includes(searchData) ||
      item.updateDate.includes(searchData)
  );
});

const paginatedData = computed(() => {
  return filteredData.value;
});

const handlePageChange = (newPage: number) => {
  page.value = newPage;
  requestData(newPage);
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
  requests.value = requests.value.filter((item) => item.id !== id);
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
          :total="filteredData.length"
          :page="page"
          :page-size="pageSize"
          @update:page="handlePageChange"
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

.button-filter span {
  color: #414651;
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

<script setup lang="ts">
import { useRouter } from "vue-router";
import { TableColumn, SearchInput, Pagination, BreadCrumb } from "@/components";
import { RequestTableType } from "@/interface/RequestTableType";
import { RequestTableData } from "@data/RequestTableData";
import { computed, onMounted, ref } from "vue";
import addIcon from "@assets/icons/add.svg";
import Loading from "@/components/loading/Loading.vue";

const columns = [
  { title: "№", dataIndex: "id", key: "id", align: "center" },
  {
    title: "Ehtiyoj soni",
    dataIndex: "organizationName",
    key: "organizationName",
    align: "center",
  },

  { title: "Yo‘nalishlar soni", dataIndex: "IDNumber", key: "IDNumber" },
  {
    title: "Yuborilgan sana",
    dataIndex: "requirementCount",
    key: "requirementCount",
    align: "center",
  },

  { title: "Holat", dataIndex: "actionState", key: "actionState", align: "center" },
  { title: "", dataIndex: "buttons", key: "actions", align: "center" },
];

const router = useRouter();
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


const goCreate = () => {
  onMounted(() => {
    setTimeout(() => {
      isLoading.value = false;
    }, 1500);
  });

  router.push("/my-request/create");
};
const isCreatePage = computed(() => {
  return router.currentRoute.value.name === "CreateRequest";
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
  <div class="my-request-page">
    <Loading v-if="isLoading" />
    <template v-else>
      <div class="add-container">
        <BreadCrumb :title="isCreatePage ? 'Ariza yaratish' : 'Mening arizalarim'" />
        <button v-if="!isCreatePage" class="add-button" @click="goCreate">
          <img :src="addIcon" alt="add icon" aria-label="add icon" />
          <span> Ariza shakllantirish </span>
        </button>
      </div>

      <h2 class="my-request-title">
        {{ isCreatePage ? "Ariza yaratish" : "Arizalar" }}
      </h2>

      <div class="my-request-content" v-if="!isCreatePage">
        <div class="my-request-header">
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
        >
          <template #actionContent="{ record }">
            <div v-if="record.actionState.confirmed">
              <span class="confirmed-btn">Tasdiqlangan</span>
            </div>

            <div v-else-if="record.actionState.cancelled">
              <a-tooltip placement="topRight" color="#101828">
                <template #title>
                  <div style="padding: 4px">
                    <div style="font-weight: 600; margin-bottom: 4px">Sabab</div>
                    <div style="font-size: 12px; color: #d0d5dd">
                      {{
                        record.rejectReason ||
                        "Tooltips are used to describe or identify an element."
                      }}
                    </div>
                  </div>
                </template>
                <span
                  class="rejected-btn"
                  style="
                    display: inline-flex;
                    align-items: center;
                    gap: 4px;
                    cursor: help;
                  "
                >
                  Rad etilgan <info-circle-outlined />
                </span>
              </a-tooltip>
            </div>

            <div v-else>
              <span style="color: 'red'">Kutilmoqda</span>
            </div>
          </template>
        </TableColumn>
        <div class="pagination-footer">
          <Pagination
            :total="tableData.length"
            :page="page"
            :page-size="pageSize"
            @update:page="page = $event"
          />
        </div>
      </div>
      <router-view />
    </template>
  </div>
</template>

<style scoped>
.my-request-content {
  border: 1px solid #e9eaeb;
  box-shadow: 0px 1px 2px 0px #0a0d120d;
  border-radius: 12px;
}

.add-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

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

.my-request-header {
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

.my-request-title {
  margin-bottom: 12px;
  font-size: 22px;
  font-weight: 600;
  color: #000;
}

.button-filter span{
  color: #414651;
}


.pagination-footer {
  margin: 12px 24px 16px;
}
</style>

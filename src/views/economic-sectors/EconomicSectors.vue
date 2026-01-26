<script setup lang="ts">
import BreadCrumb from "@/components/breadcrumb/BreadCrumb.vue";
import {
  NumberOutlined,
  TeamOutlined,
  UserOutlined,
  FileTextOutlined,
} from "@ant-design/icons-vue";

const stats = [
  {
    title: "STIR",
    value: "20222222",
    icon: NumberOutlined,
  },
  {
    title: "Shtat birliklari soni",
    value: 550,
    icon: TeamOutlined,
  },
  {
    title: "Xodimlar soni",
    value: 488,
    icon: UserOutlined,
  },
  {
    title: "Vakant joylar soni",
    value: 12,
    icon: FileTextOutlined,
  },
];
</script>

<template>
  <div>
   <div class="dashboard-header">
      <BreadCrumb title="Asosiy" />
      <h2 class="dashboard-title">Asosiy</h2>
    </div>
  <a-card class="main-card">
    <div class="header">
      <h3>Muhammad al-Xorazmiy nomidagi Toshkent axborot texnologiyalari universiteti</h3>
      <span class="sub">ID: 00014567</span>
    </div>

    <a-row class="stats" :gutter="16">
      <a-col v-for="(item, index) in stats" :key="index" :xs="24" :sm="12" :md="6">
        <a-card class="stat-card" bordered>
          <div class="stat-content">
            <component :is="item.icon" class="icon" />
            <div>
              <p class="label">{{ item.title }}</p>
              <p class="value">{{ item.value }}</p>
            </div>
          </div>
        </a-card>
      </a-col>
    </a-row>
  </a-card>
  </div>

</template>

<style scoped>
:deep(.ant-card-body) {
  padding: 0 !important;
}

:deep(.ant-row stats css-dev-only-do-not-override-b92jn9) {
  margin: 0 !important;
}


.dashboard-header {
  margin-bottom: 12px;
}

.dashboard-title {
  font-size: 22px;
  font-weight: 600;
  color: #000;
}


.main-card {
  border-radius: 12px;
  border: 1px solid #e9eaeb;
  box-shadow: 0px 1px 2px 0px #0a0d120d;
  padding-left: 8px;
  padding-right: 8px;
}

.header {
  background: #ffffff;
  border-bottom: 1px solid #fff;
  padding: 20px 24px;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
}

.header h3 {
  margin-bottom: 4px;
  font-weight: 600;
}

.sub {
  font-size: 13px;
  color: #8c8c8c;
}

.stats {
  background: #f5f5f5;
  padding: 24px;
  border-radius: 0 0 12px 12px;
}

.stat-card {
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #e9eaeb;
  box-shadow: 0px 1px 2px 0px #0a0d120d;
  width: 100%;
}

.stat-content {
  display: flex;
  align-items: center;
  gap: 16px;
}

.icon {
  font-size: 20px;
  color: #414651;
  padding: 12px;
  border: 1px solid #e9eaeb;
  box-shadow: 0px 1px 2px 0px #0a0d120d;
  border-radius: 12px;
}

.label {
  font-size: 16px;
  color: #535862;
  margin: 0;
  font-weight: 600;
}

.value {
  font-size: 20px;
  font-weight: 600;
  color: #000;
  margin: 0;
}
</style>

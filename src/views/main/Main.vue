<script setup>
import { useDashboardData } from "@composables/useDashboardData";
import {
  Map,
  BreadCrumb,
  StatCard,
  RegionCard,
  TopBuyersCard,
  AdditionalStatCard,
  BottomInfoCard,
} from "@components";
import { regionsData } from "@/data/RegionsTooltipData";

const {
  statsCards,
  topBuyers,
  additionalStats,
  jobRequestCards,
  internshipCards,
} = useDashboardData();
</script>

<template>
  <div class="dashboard-page">
    <div class="dashboard-header">
      <BreadCrumb title="Asosiy" />
      <h2 class="dashboard-title">Asosiy</h2>
    </div>

    <div class="dashboard-content">
      <div class="dashboard-left">
        <div class="requirement-statistic">
          <h2 class="section-title">Ehtiyoj bo'yicha statistika</h2>
          <div class="stats-grid">
            <StatCard
              v-for="card in statsCards"
              :key="card.id"
              :title="card.title"
              :value="card.value"
              :change="card.change"
              :icon="card.icon"
              :color="card.color"
              :bg-color="card.bgColor"
            />
          </div>
        </div>

        <section class="order-cards">
          <TopBuyersCard
            :title="topBuyers.title"
            :value="topBuyers.value"
            :change="topBuyers.change"
            :label="topBuyers.label"
            :detail="topBuyers.detail"
          />
          <div class="additional-stats-grid">
            <AdditionalStatCard
              v-for="(stat, index) in additionalStats"
              :key="index"
              :title="stat.title"
              :value="stat.value"
              :change="stat.change"
              :is-positive="stat.isPositive"
            />
          </div>
        </section>
      </div>
      <div class="dashboard-right">
        <RegionCard :region-data="regionsData">
          <template #map="{ updateRegion, currentId }">
            <Map :current-id="currentId" @regionHover="updateRegion" />
          </template>
        </RegionCard>
      </div>
    </div>

    <section class="graduate-resources">
      <div class="workers-statistic">
        <h2 class="section-title">Bitiruvchi talabalar bo'yicha statistika</h2>
        <div class="bottom-cards-grid">
          <BottomInfoCard
            v-for="card in jobRequestCards"
            :key="card.id"
            :title="card.title"
            :description="card.description"
            :icon="card.icon"
            :color="card.color"
            :bg-color="card.bgColor"
          />
        </div>
      </div>

      <div class="bottom-cards">
        <h2 class="section-title">Mehnat resurslari bo'yicha statistika</h2>
        <div class="bottom-cards-grid">
          <BottomInfoCard
            v-for="card in internshipCards"
            :key="card.id"
            :title="card.title"
            :description="card.description"
            :icon="card.icon"
            :color="card.color"
            :bg-color="card.bgColor"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.dashboard-page {
  height: 100vh;
  background: #fff;
  margin-bottom: 32px;
}

.dashboard-header {
  margin-bottom: 12px;
}

.dashboard-title {
  font-size: 22px;
  font-weight: 600;
  color: #000;
}

.dashboard-content {
  display: flex;
  align-items: stretch;
  width: 100%;
  overflow-x: hidden;
  gap: 24px;
}

.dashboard-left {
  display: flex;
  flex-direction: column;
  gap: 24px;
  flex: 1;
  width: 100%;
  flex-shrink: 1;
  height: auto;
}

.requirement-statistic {
  border: 1px solid #e9eaeb;
  box-shadow: 0px 1px 2px 0px #0a0d120d;
  padding: 1.5rem;
  border-radius: 1rem;
}

.graduate-resources {
  display: flex;
  gap: 24px;
  align-items: center;
  margin-top: 24px;
}

.dashboard-right {
  width: 100%;
  flex: 1;
  top: 24px;
  flex-shrink: 0;
  height: auto;
}

.section-title {
  font-size: 20px;
  font-weight: 600;
  color: #111827;
  margin-bottom: 20px;
}

.order-cards {
  border: 1px solid #e9eaeb;
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0px 1px 2px 0px #0a0d1408;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.additional-stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  padding-top: 20px;
  border-top: 2px solid #ebebeb;
}

.bottom-cards,
.workers-statistic {
  box-shadow: 0px 1px 2px 0px #0a0d120d;
  border: 1px solid #e9eaeb;
  padding: 24px;
  flex: 1;
  border-radius: 1rem;
  margin-bottom: 32px;
}

.bottom-cards-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

@media screen and (max-width: 1800px) {
  .dashboard-content {
    display: flex;
    gap: 20px;
  }

  .dashboard-left {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .requirement-statistic {
    padding: 18px;
  }

  .graduate-resources {
    display: flex;
    gap: 24px;
    align-items: center;
    margin-top: 20px;
  }

  .order-cards {
    padding: 18px;
  }

  .bottom-cards-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }
}

@media screen and (max-width: 1500px) {
  .dashboard-content {
    display: flex;
    flex-direction: column;
    gap: 20px;

  }   

  .bottom-cards,
.workers-statistic {
  padding: 16px;
}

.section-title {
  font-size: 18px;
}


.bottom-cards-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 16px;
}

}
</style>

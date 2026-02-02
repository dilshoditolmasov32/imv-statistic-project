
<script setup>
import { ref, computed } from 'vue';

const formData = ref({
  educationCode: undefined,
  educationName: '',
  needType: undefined,
  projectNeed: undefined,
  modernizationNeed: undefined,
  otherDirection: undefined,
  naturalLeave: {
    year1: ''
  },
  comment: '',
  total: ''
});

const applications = ref([]);

const handleSubmit = () => {
  if (!formData.value.educationCode || !formData.value.educationName) {
    alert('Iltimos, majburiy maydonlarni to\'ldiring!');
    return;
  }

  const newApplication = {
    ...formData.value,
    createdDate: new Date().toLocaleDateString('uz-UZ'),
    id: Date.now()
  };

  applications.value.push(newApplication);

  // Reset form
  resetForm();

  // Show success message
  alert('Ariza muvaffaqiyatli yaratildi!');
};

// Reset form data
const resetForm = () => {
  formData.value = {
    educationCode: undefined,
    educationName: '',
    needType: undefined,
    projectNeed: undefined,
    modernizationNeed: undefined,
    otherDirection: undefined,
    naturalLeave: {
      year1: ''
    },
    comment: '',
    total: ''
  };
};
</script>

<template>
  <div class="create-application">
  <div class="application-form">
    <h2 class="form-title">
      Kelgusi 4-yilda (magistratura bo'yicha 2-yilda) oliy ma'lumotli kadrlarni bo'lgan ehtiyoj
    </h2>

    <div class="form-section">
      <label class="form-label">Ta'lim yo'nalish shifri</label>
      <a-select
        v-model:value="formData.educationCode"
        placeholder="Tanlang"
        class="form-select"
        :allowClear="true"
      >
        <a-select-option value="60310100">60310100</a-select-option>
        <a-select-option value="60310200">60310200</a-select-option>
        <a-select-option value="60310300">60310300</a-select-option>
      </a-select>
    </div>

    <div class="form-section">
      <label class="form-label">Ta'lim yo'nalish nomi</label>
      <a-input
        v-model:value="formData.educationName"
        placeholder="Shifrlari nomli axborot tizimini tanlang"
        class="form-input"
        :allowClear="true"
      />
    </div>

    <div class="form-section">
      <label class="form-label">Ehtiyoj hiylasi</label>
      <a-select
        v-model:value="formData.needType"
        placeholder="Tanlang"
        class="form-select"
        :allowClear="true"
      >
        <a-select-option value="type1">To'liq ehtiyoj</a-select-option>
        <a-select-option value="type2">Qisman ehtiyoj</a-select-option>
        <a-select-option value="type3">Kelajak ehtiyoj</a-select-option>
      </a-select>
    </div>

    <div class="form-section">
      <label class="form-label">Yangi loyihalarni amalga oshirish havolga ehtiyoj</label>
      <a-select
        v-model:value="formData.projectNeed"
        placeholder="Kiriting"
        class="form-select"
        :allowClear="true"
      >
        <a-select-option value="yes">Ha</a-select-option>
        <a-select-option value="no">Yo'q</a-select-option>
      </a-select>
    </div>

    <div class="form-section">
      <label class="form-label">Amalda mavjud qovontardan modernlashtirilish / rekonstruksiyaga alar havolga ehtiyoj</label>
      <a-select
        v-model:value="formData.modernizationNeed"
        placeholder="Kiriting"
        class="form-select"
        :allowClear="true"
      >
        <a-select-option value="yes">Ha</a-select-option>
        <a-select-option value="no">Yo'q</a-select-option>
      </a-select>
    </div>

    <div class="form-section">
      <label class="form-label">Boshqa yo'nalishda</label>
      <a-select
        v-model:value="formData.otherDirection"
        placeholder="Kiriting"
        class="form-select"
        :allowClear="true"
      >
        <a-select-option value="option1">Variant 1</a-select-option>
        <a-select-option value="option2">Variant 2</a-select-option>
      </a-select>
    </div>

    <div class="form-section">
      <label class="form-label">Tabiiy ketish</label>
      <div class="year-inputs">
        <a-input
          v-model:value="formData.naturalLeave.year1"
          placeholder="1/23"
          class="year-input"
          :allowClear="true"
        />
      </div>
    </div>

    <div class="form-section">
      <label class="form-label">Izoh</label>
      <a-textarea
        v-model:value="formData.comment"
        placeholder="Kiriting"
        class="form-textarea"
        :rows="4"
        :allowClear="true"
      />
    </div>

    <div class="form-section">
      <label class="form-label">+ Forma qo'shish</label>
      <a-button class="add-form-btn" disabled>
        +
      </a-button>
    </div>

    <div class="form-section">
      <label class="form-label">Jami</label>
      <a-input
        v-model:value="formData.total"
        placeholder="1/23"
        class="form-input"
        :allowClear="true"
      />
    </div>

    <div class="form-actions">
      <a-button type="primary" class="submit-btn" @click="handleSubmit">
        Arizani ko'rish
      </a-button>
    </div>

    <div v-if="applications.length > 0" class="applications-list">
      <h3 class="list-title">Mening arizalarim</h3>
      <div 
        v-for="(app, index) in applications" 
        :key="index" 
        class="application-card"
      >
        <div class="app-header">
          <span class="app-number">Ariza #{{ index + 1 }}</span>
          <span class="app-date">{{ app.createdDate }}</span>
        </div>
        <div class="app-content">
          <p><strong>Ta'lim yo'nalish:</strong> {{ app.educationName }}</p>
          <p><strong>Shifr:</strong> {{ app.educationCode }}</p>
          <p><strong>Jami:</strong> {{ app.total }}</p>
        </div>
      </div>
    </div>
  </div>
  </div>

</template>


<style scoped>
.create-application{
  border: 1px solid  #E9EAEB;
  box-shadow: 0px 1px 2px 0px #0A0D120D;
  border-radius: 12px;

}
.application-form {
  max-width: 960px;
  margin: 0 auto;
  padding: 24px 32px;
}

.form-title {
  font-size: 22px;
  font-weight: 600;
  color: #000;
  margin-bottom: 16px;
  margin-top: 24px;
  line-height: 1.5;
}

.form-section {
  margin-bottom: 16px;
}

.form-label {
  display: block;
  font-size: 16px;
  color: #414651;
  margin-bottom: 6px;
  font-weight: 500;
}

.form-select,
.form-input,
.form-textarea {
  width: 100%;
  border: 1px solid  #F5F5F5;
   box-shadow: 0px 1px 2px 0px #0A0D120D;
  border-radius: 8px;
  transition: all 0.3s;
  color: #717680;
}

/* .form-input{
  padding: 10px 14px;
} */

.form-select:hover,
.form-input:hover,
.form-textarea:hover {
 border: 1px solid  #E9EAEB;}

.form-select:focus,
.form-input:focus,
.form-textarea:focus {
  border-color: #E9EAEB;
  box-shadow: 0 0 0 2px rgba(64, 169, 255, 0.1);
}

:deep(.ant-select-focused .ant-select-selector) {
  border-color: #E9EAEB !important;
  box-shadow: 0 0 0 2px rgba(64, 169, 255, 0.1) !important;
    padding: 10px 14px !important;

}
:deep(.ant-select-selector) {
  padding: 10px 14px !important;
}



:deep(.ant-select-item-option-selected) {
  background-color: #FFF !important;
  color: #E9EAEB;
  font-weight: 500;
}

:deep(.ant-select-item-option-active) {
  background-color: #f5f5f5 !important;
}
:deep(.ant-input-affix-wrapper > input.ant-input) {
  padding: 0 !important;
  border: none !important;
  outline: none !important;
}

:deep(.ant-input) {
  border: none !important;
  box-shadow: none !important;
  color: #000;
}


:deep(.ant-input-textarea textarea) {
  padding: 10px 14px !important;
  border: none !important;
}

.year-inputs {
  display: flex;
  gap: 12px;
}

:deep(.ant-select-selector) {
  padding: 10px 14px !important;
  border: none !important;
  box-shadow: none !important;
  border-radius: 8px !important;
  display: flex;
  align-items: center;
  color: #717680;
}


.year-input {
  flex: 1;
}

.add-form-btn {
  width: 100%;
  height: 40px;
  border: 1px dashed #d9d9d9;
  background: #fafafa;
  color: #999;
  font-size: 20px;
  cursor: not-allowed;
}

.form-actions {
  margin-top: 32px;
  display: flex;
  justify-content: flex-end;
}

.submit-btn {
  background: #52c41a;
  border-color: #52c41a;
  height: 40px;
  padding: 0 32px;
  font-size: 14px;
  font-weight: 500;
  border-radius: 8px;
}

.submit-btn:hover {
  background: #73d13d;
  border-color: #73d13d;
}

.applications-list {
  margin-top: 48px;
  padding-top: 24px;
  border-top: 1px solid #e8e8e8;
}

.list-title {
  font-size: 20px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 16px;
}

.application-card {
  background: #f9f9f9;
  border: 1px solid #e8e8e8;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 12px;
  transition: all 0.3s;
}

.application-card:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  border-color: #d9d9d9;
}

.app-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid #e8e8e8;
}

.app-number {
  font-weight: 600;
  color: #1890ff;
  font-size: 14px;
}

.app-date {
  color: #8c8c8c;
  font-size: 13px;
}

.app-content p {
  margin: 8px 0;
  font-size: 14px;
  color: #333;
}

.app-content strong {
  font-weight: 600;
  margin-right: 8px;
}
/* Select elementlari uchun */
:deep(.ant-select-selector) {
  padding: 10px 14px !important;
  height: auto !important; /* Balandlikni paddingga qarab moslashishini ta'minlaydi */
  display: flex !important;
  align-items: center !important;
  border: 1px solid #F5F5F5 !important;
  border-radius: 8px !important;
  box-shadow: 0px 1px 2px 0px #0A0D120D !important;
}

/* Tanlangan qiymatning joylashuvi */
:deep(.ant-select-selection-search) {
  inset-inline-start: 14px !important;
}

:deep(.ant-select-selection-item),
:deep(.ant-select-selection-placeholder) {
  line-height: 1.5 !important; /* Matn markazda bo'lishi uchun */
  padding: 0 !important;
}

/* Input va Textarea uchun */
:deep(.ant-input),
:deep(.ant-input-affix-wrapper) {
  padding: 10px 14px !important;
  border-radius: 8px !important;
  border: 1px solid #F5F5F5 !important;
}

/* Textarea uchun maxsus */
:deep(textarea.ant-input) {
  padding: 10px 14px !important;
}
</style>
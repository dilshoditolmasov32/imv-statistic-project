import { defineStore } from "pinia";
import { ref } from "vue";
import { message } from 'ant-design-vue';

interface ToastOptions {
  status: 'success' | 'error' | 'warning';
  message?: string;
}

export const useCore = defineStore('core', () => {
  const lang = ref<string>(localStorage.getItem('lang') || 'uz');
  const toast = ref<any>(null);
  const loaderMain = ref<boolean>(false);
  const collapsed = ref<boolean>(false);
  const isShowBurger = ref<boolean>(false);
  const isError = ref<boolean>(false);
  const error = ref<any>(null);


  const setMainLoader = (load: boolean): void => {
    loaderMain.value = load;
  };


  const setToast = (obj: ToastOptions): void => {
    if (obj) {
      const msg = obj.message || (obj.status === 'error' ? 'Xatolik yuz berdi' : 'Muvaffaqiyatli bajarildi');
      
      switch (obj.status) {
        case 'error':
          message.error(msg);
          break;
        case 'success':
          message.success(msg);
          break;
        case 'warning':
          message.warning(msg);
          break;
      }
    }
  };

  return {
    lang,
    toast,
    loaderMain,
    collapsed,
    isShowBurger,
    isError,
    error,
    setMainLoader,
    setToast,
  }
});
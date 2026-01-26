import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index";
import Antd from "ant-design-vue";
import ElementPlus from "element-plus";
import PrimeVue from "primevue/config";
import Aura from "@primeuix/themes/aura";
import { createPinia } from "pinia";
import "element-plus/dist/index.css";
import "./style.css";
import { Breadcrumb } from "primevue";

const pinia = createPinia();
const app = createApp(App);
app.use(ElementPlus);
app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
});
app.use(router);
app.use(pinia);
app.use(Antd);
app.component(" Breadcrumb ", Breadcrumb);

app.mount("#app");

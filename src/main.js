import { createApp } from "vue";
import App from "./App.vue";
import router from "./router"; // <– add this line if not already included

// Global styles
import "./styles/theme.css";
import "./styles/base.css";
// import "./styles/App.css";

createApp(App).use(router).mount("#app");

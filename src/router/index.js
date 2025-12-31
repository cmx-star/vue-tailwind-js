import Vue from "vue";
import VueRouter from "vue-router";
import router from "./origin/index";

Vue.use(VueRouter);

export { resetRouter } from "./origin/index";
export default router;

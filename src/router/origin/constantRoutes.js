export const whiteRoutes = ["/login", "/404"];

export const constantRoutes = [
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/common/ViewLogin/ViewLogin.vue"),
    meta: { title: "Login", aside: 0 },
  },
  {
    path: "/404",
    name: "NotFound",
    component: () => import("@/views/common/View404/View404.vue"),
    meta: { title: "404", aside: 0 },
  },
  {
    path: "/",
    redirect: "/dashboard",
  },
];

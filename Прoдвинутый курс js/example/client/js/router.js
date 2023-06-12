import VueRouter from "vue-router";
import Catalog from "../pages/Catalog";

const Home = { template: "<div>Home</div>" };
const About = { template: "<div>About</div>" };

const routes = [
  { path: "/", component: Home },
  { path: "/about", component: About },
  { path: "/catalog", component: Catalog },
];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes,
});

export default router;

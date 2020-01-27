import Vue from "vue"
import VueRouter from "vue-router";
import BoxPage from "./pages/BoxPage";
import TextureMappingPage from "./pages/TextureMappingPage";

Vue.use(VueRouter)

const routes = [
    {path: "/box", component: BoxPage},
    {path: "/texture-map", component: TextureMappingPage}
]

const router = new VueRouter({
    routes,
    mode: "history"
})

export default router
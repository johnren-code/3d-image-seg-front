import Vue from 'vue'
import VueRouter from 'vue-router'
import ErrorPage from '../views/404'
import Home from "../views/Home";
import Segmentation from "../views/Segmentation";
import Login from "../views/Login";
import History from "../views/History";
import UserProj from "../views/UserProj"
import Projcreate from "../views/Projcreate"
import Newproj from "../views/Newproj"
import PersonalPage from "../views/PersonalPage";
import ShareEdit from "../views/ShareEdit";
import Technical from "../views/Technical"
import Patient from "../views/Patient"
import EditUserInfo from "../views/EditUserInfo";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
            title: '主页',
        },
    },
    {
        path: '/technical',
        name: 'technical',
        component: Technical,
        meta: {
            title: '技术要点与介绍'
        }
    },
    {
        path: '/home',
        name: 'Home',
        component: Home,
        meta: {
            title: '主页',
        },
    },
    {
        path: '/editUserInfo',
        name: 'EditUserInfo',
        component: EditUserInfo,
        meta: {
            title: '编辑个人信息',
        },
    },
    {
        path: '/shareEdit',
        name: 'ShareEdit',
        component: ShareEdit,
        meta: {
            title: '协同编辑测试',
        },
        children: [{
            path: ':id(\\d+)',
            component: ShareEdit,
            meta: {
                title: '编辑病例报告',
            }
        }]
    },
    {
        path: '/segmentation',
        name: 'Segmentation',
        component: Segmentation,
        meta: {
            title: '3D分割',
        },
        children: [{
            path: ':id(\\d+)',
            component: Segmentation,
            meta: {
                title: '病人分割案例',
            }
        }]
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: {
            title: '登录/注册',
        },
    },
    {
        path: '/personal',
        name: 'PersonalPage',
        component: PersonalPage,
        meta: {
            title: '个人界面测试',
        },
    },
    {
        path: '/patient',
        name: 'Patient',
        component: Patient,
        meta: {
            title: '病人界面',
        },
    },
    {
        path: '/error',
        name: 'Error',
        component: ErrorPage,
        meta: {
            title: '404 || Doob Business and Consulting Bootstrap5 Template',
        },
    },
    {
        path: '/History',
        name: 'History',
        // redict: '/History/:id',
        component: History,
        meta: {
            title: '历史记录',
        },
        children: [{
            path: ':id(\\d+)',
            component: UserProj,
            meta: {
                title: '用户项目',
            }
        }, {
            path: '/',
            component: Projcreate,
            meta: {
                title: '创建新项目',
            }
        }, {
            path: 'new',
            component: Newproj
        }]
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    document.title = to.meta.title;
    next();
    window.scrollTo(0, 0)
});

export default router

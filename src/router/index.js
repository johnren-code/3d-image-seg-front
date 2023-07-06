import Vue from 'vue'
import VueRouter from 'vue-router'
import ErrorPage from '../views/404'
import Home from "../views/Home";
import Segmentation from "../views/Segmentation";
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
            title: '协同编辑',
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
                title: '病人3D影像分割',
            }
        }]
    },
    {
        path: '/personal',
        name: 'PersonalPage',
        component: PersonalPage,
        meta: {
            title: '个人界面',
        },
    },
    {
        path: '/patient',
        name: 'Patient',
        component: Patient,
        meta: {
            title: '我的病例',
        },
    },
    {
        path: '/error',
        name: 'Error',
        component: ErrorPage,
        meta: {
            title: '404',
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
                title: '病人项目',
            }
        }, {
            path: '/',
            component: Projcreate,
            meta: {
                title: '创建新项目',
            }
        }, {
            path: 'new',
            component: Newproj,
            meta: {
                title: '创建新项目',
            }
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

import HomePage from "@/public/pages/home-page.component.vue";
import PageNotFound from "@/public/pages/page-not-found.component.vue";
import CheckinPageComponent from "@/registration/pages/checkin-page.component.vue";
import RatingPageComponent from "@/engagement/pages/rating-page.component.vue";
import {createRouter, createWebHistory} from "vue-router";
import EventPageComponent from "@/registration/pages/event-page.component.vue";
import AttendeePageComponent from "@/registration/pages/attendee-page.component.vue";
const routes = [
    {   path: '/home',name: 'home',component: HomePage,meta: {title: 'Home'}},
    {   path: '/registration/event-check-ins/new',name: 'check-in',component: CheckinPageComponent,meta: {title: 'Check-In'}},
    {   path: '/engagement/rating',name: 'rating',component: RatingPageComponent,meta: {title: 'Rating'}},
    {   path: '/registration/event',name: 'event',component: EventPageComponent,meta: {title: 'Event'}},
    {   path: '/registration/attendee',name: 'attendee',component: AttendeePageComponent,meta: {title: 'Attendee'}},
    {   path: '/',name: 'default',redirect: {name: 'home'}},
    {   path: '/:pathMatch(.*)*',name: 'not-found',component: PageNotFound, meta: {title: 'Page not found'}},
]
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: routes
});
router.beforeEach((to, from, next) => {
    console.log(`Navigating from ${from.name} to ${to.name}`);
    let baseTitle = 'Eventify';
    document.title = `${baseTitle} | ${to.meta['title']}`;
    next();
});
export default router;
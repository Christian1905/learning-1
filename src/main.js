/**
 * @summary  Entry point of the application and plugin setup.
 *           Initializes Vue, PrimeVue, Vue I18n, and registers global components.
 * @author   Mauricio Daniel Elera Rodríguez
 */

import {createApp} from 'vue'
import './style.css'
import i18n from "./i18n.js";
import {PrimeVue} from "@primevue/core";
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import Aura from '@primeuix/themes/aura';

import {
    Button,
    Card,
    Checkbox,
    Column,
    ConfirmationService,
    ConfirmDialog,
    DataTable,
    Dialog,
    DialogService,
    Drawer,
    FileUpload,
    FloatLabel,
    IconField,
    InputIcon,
    InputNumber,
    InputText,
    Menu,
    Rating,
    Row,
    Select,
    SelectButton,
    Tag,
    Textarea,
    Toast,
    ToastService,
    Toolbar
} from "primevue";
import router from "./router/index.js";
import App from "./App.vue";
import Vuelidate from '@vuelidate/core'
const app = createApp(App);
app.use(i18n)
    .use(PrimeVue, {theme: { preset: Aura }, ripple: true})
    .use(Vuelidate)
    .use(ConfirmationService)
    .use(DialogService)
    .use(ToastService)
    .component('pv-button',         Button)
    .component('pv-card',           Card)
    .component('pv-column',         Column)
    .component('pv-confirm-dialog', ConfirmDialog)
    .component('pv-checkbox',       Checkbox)
    .component('pv-data-table',     DataTable)
    .component('pv-dialog',         Dialog)
    .component('pv-select',         Select)
    .component('pv-select-button',  SelectButton)
    .component('pv-file-upload',    FileUpload)
    .component('pv-float-label',    FloatLabel)
    .component('pv-icon-field',     IconField)
    .component('pv-input-icon',     InputIcon)
    .component('pv-input-text',     InputText)
    .component('pv-input-number',   InputNumber)
    .component('pv-menu',           Menu)
    .component('pv-rating',         Rating)
    .component('pv-row',            Row)
    .component('pv-drawer',         Drawer)
    .component('pv-tag',            Tag)
    .component('pv-textarea',       Textarea)
    .component('pv-toolbar',        Toolbar)
    .component('pv-toast',          Toast)
    .use(router)
    .mount('#app')

import ProductModal from "./productsModal"

const { defineRule, Form, ErrorMessage, configure } = VeeValidate;
const { required, email, min, max } = VeeValidateRules;
const { localize, loadLocaleFormURL } = VeeValidateI18n;

defineRule("required", required);
defineRule("email", email);
defineRule("min", min);
defineRule("max", max);

loadLocaleFormURL("https://unpkg.com/@vee-validate/i18n@4.1.0/dist/locale/zh_TW.json");

configure({
    generateMessage: localize("zh_TW"),
});

const apiUrl = "https://vue3-course-api.hexschool.io/v2";
const apiPath = "hexvue";

Vue.createApp({
    data() {

    },
    components: {

    },
    methods: {

    },
    mounted() {

    },
}).component("ProductModal", ProductModal)
    .mount("#app");
    
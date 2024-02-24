import ProductModal from "./productsModal.js"

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
        return {
            loadingStatus: {
                loadingItem: '',
            },
            products: [],
            product: {},
            form: {
                user: {
                    name: '',
                    email: '',
                    tel: '',
                    address: '',
                },
                message: '',
            },
            cart: {},
        };
    },
    components: {
        VForm: Form,
        VField: Field,
        ErrorMessage: ErrorMessage,
    },
    methods: {
        getProducts() {
            const url = `${apiUrl}/api/${apiPath}/products`;
            axios.get(url).then ((res) => {
                this.products = res.data.products;
            }).catch((err) => {
                alert(err.response.data.message);
            }); 
        },
        getProduct(id) {
            const url = `${apiUrl}/api/${apiPath}/product/${id}`;
            this.loadingStatus.loadingItem = id;
            axios.get(url).then ((res) => {
                this.loadingStatus.loadingItem = '';
                this.product = res.data.product;
                this.$ref.userProductModal.openModal();
            }).catch((err) => {
                alert(err.response.data.message);
            });
        },
        addToCart(id, qty = 1) {
            const url = `${apiUrl}/api/${apiPath}/cart`;
            this.loadingStatus.loadingItem = id;
            const cart = {
                product_id: id,
                qty,
            };

            this.$ref.userProductModal.hideModal();
            axios.post(url, { data: cart }).then((res) => {
                alert(res.data.message);
                this.loadingStatus.loadingItem = '';
                this.getCart();
            }).catch((err) => {
                alert(err.response.data.message);
            });
        },
        updateCart(data) {
            this.loadingStatus.loadingItem = data.id;
            const url = `${apiUrl}/api/${apiPath}/cart/${data.id}`;
            const cart = {
                product_id: data.product_id,
                qty: data.qty,
            };

            axios.put(url, { data: cart }).then((res) => {
                alert(res.data.message);
                this.loadingStatus.loadingItem = '';
                this.getCart();
            }).catch((err) => {
                alert(err.response.data.message);
                this.loadingStatus.loadingItem = '';
            });
        },
        deleteAllCart() {
            const url = `${apiUrl}/api/${apiPath}/carts`;
            axios.delete(url).then((res) => {
                alert(res.data.messge);
                this.getCart();
            }).catch((err) => {
                alert(err.response.data.message);
            });
        },
        getCart() {
            const url = `${apiUrl}/api/${apiPath}/cart`;
            axios.get(url).then((res) => {
                this.cart = res.data.data;
            }).catch((err) => {
                alert(err.response.data.message);
            });
        },
        removeCartItem(id) {
            const url = `${apiUrl}/api/${apiPath}/cart/${id}`;
            this.loadingStatus.loadingItem = id;
            axios.delete(url).then((res) => {
                alert(res.data.message);
                this.loadingStatus.loadingItem = '';
                this.getCart();
            }).catch((err) => {
                alert(err.response.data.message);
            });
        },
        createOrder() {
            const url = `${apiUrl}/api/${apiPath}/order`;
            const order = this.form;

            axios.post(url, { data: order }).then((res) => {
                alert(res.data.message);
                this.$ref.form.resetForm();
                this.getCart();
            }).catch((err) => {
                alert(err.response.data.message);
            });
        },
    },
    mounted() {
        this.getProducts();
        this.getCart();
    },
}).component("ProductModal", ProductModal)
    .mount("#app");
    
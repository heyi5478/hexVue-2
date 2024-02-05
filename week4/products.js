import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

let productModal = null;
let delProductModal = null;



const app = createApp({
    data() {
        return {
            apiUrl: 'https://vue3-course-api.hexschool.io/v2',
            apiPath: 'hexvue',
            products: [],
            isNew: false,
            tempProduct: {
                imagesUrl: [],
            },
            pagination: {},
            isNew: false,
        }
    },
    mounted() {
        // 取出 Token
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)vueToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
        axios.defaults.headers.common.Authorization = token;
        this.checkAdmin()
    },
    methods: {
        checkAdmin() {
            const url = `${this.apiUrl}/api/user/check`;
            axios.post(url)
                .then(() => {
                    this.getdata();
                })
                .catch((err) => {
                    alert(err.respone.data.message);
                    window.location = "login.html";
                })
        },
        getdata(page = 1) {
            const url = `${this.apiUrl}/api/${this.apiPath}/admin/products?pages=${page}`;

            axios.get(url)
            .then((res) => {
                const { products, pagination } = res.data;
                this.products = products;
                this.pagination = pagination;
            }).catch((err) => {
                alert(err.res.data.message);
                window.location = "login.html";
            })
        },
        openModal(isNew, item) {
            if (isNew === "new") {
                this.tempProduct = {
                    imagesUrl: [],
                };
                this.isNew = true;
                productModal.show();
            } else if (isNew === "edit") {
                this.tempProduct = {...item};
                this.isNew = false;
                productModal.show(); 
            } else if (isNew === "delete") {
                this.tempProduct = {...item};
                delProductModal.show();
            }
        },
    }
});

// 分頁元件
app.component("pagination", {
    template: "#pagination",
    props: ["pages"],
    methods: {
        emitPages(item) {
            this.$emit("emit-pages", item);
        },
    },
});

// 產品新增/編輯元件
app.component("productModal", {
    template: "#productModal",
    props: ['product', 'isNew'],
    data() {
        return {
            apiUrl: 'https://vue3-course-api.hexschool.io/v2',
            apiPath: 'hexvue',
        };
    },
    mounted() {
        productModal = new bootstrap.Modal(document.getElementById("productModal"),{
            keyboard: false,
            backdrop: "static"
        });
    },
    methods: {
        updateProduct() {
            let url = `${this.apiUrl}/api/${this.apiPath}/admin/product`;
            let http = "post";

            if (!this.isNew) {
                url = `${this.apiUrl}/api/${this.apiPath}/admin/product/${this.product.id}`;
                http = 'put';
            }

            axios[http](url, { data: this.product }).then((res) => {
                alert(res.data.message);
                this.hideModal();
                this.$emit("update");
            }).catch((err) => {
                alert(err.res.data.message);
            }); 
        },
        createImage() {
            this.product.imagesUrl = [];
            this.product.imagesUrl.push("");
        },
        openModal() {
            productModal.show();
        },
        hideModal() {
            productModal.hide();
        },
    },
})

// 產品刪除元件
app.component("delProductModal", {
    template: "#delProductModal",
    props: ["item"],
    data() {
        return {
            apiUrl: 'https://vue3-course-api.hexschool.io/v2',
            apiPath: 'hexvue',
        };
    },
    mounted() {
        delProductModal = new bootstrap.Modal(document.getElementById("delProductModal"),{
            keyboard: false,
            backdrop: "static"
        });
    },
    methods: {
        delProduct() {
            const url = `${this.apiUrl}/api/${this.apiPath}/admin/product/${this.item.id}`;

            axios.delete(url).then((res) => {
                this.hideModal();
                this.$emit("update");
            }).catch((err) => {
                alert(err.res.data.message)
            });
        },
        openModal() {
            delProductModal.show();
        },
        hideModal() {
            delProductModal.hide();
        },
    },
});

app.mount("#app");


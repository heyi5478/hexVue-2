import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

let productModal = null;
let delProductModal = null;

// 產品資料格式

createApp({
    data() {
        return {
            apiUrl: 'https://vue3-course-api.hexschool.io/v2',
            apiPath: 'hexvue',
            products: [],
            isNew: false,
            tempProduct: {
                imagesUrl: [],
            },
        }
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

        getdata() {
            const url = `${this.apiUrl}/api/${this.apiPath}/admin/products/all`;
            axios.get(url)
                .then((res) => {
                    this.products = res.data.products;
                    console.log(this.products)
                })
                .catch((err) => {
                    alert(err.res.data.message);
                })
        },

        updateProduct() {
            let url = `${this.apiUrl}/api/${this.apiPath}/admin/product`;
            let http = "post";

            if (!this.isNew) {
                url = `${this.apiUrl}/api/${this.apiPath}/admin/product/${this.tempProduct.id}`;
                http = 'put';
            }

            axios[http](url, {data: this.tempProduct}).then((res) => {
                alert(res.data.message);
                productModal.hide();
                this.getdata();
            }).catch((err) => {
                alert(err.res.data.message);
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

        delProduct() {
            const url = `${this.apiUrl}/api/${this.apiPath}/admin/product/${this.tempProduct.id}`;

            axios.delete(url).then((res) => {
                alert(res.data.message);
                delProductModal.hide();
                this.getdata();
            }).catch((err) => {
                alert(err.res.data.message)
            })
        },

        createImage() {
            this.tempProduct.imagesUrl = [];
            this.tempProduct.imagesUrl.push("");
        },
    },
    mounted() {
        productModal = new bootstrap.Modal(document.getElementById("productModal"), {
            keyboard: false
        });

        delProductModal = new bootstrap.Modal(document.getElementById("delProductModal"), {
            keyboard: false
        });
        // 取出 Token
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)vueToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
        axios.defaults.headers.common.Authorization = token;

        this.checkAdmin()
    }

}).mount("#app");


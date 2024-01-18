import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';


// 產品資料格式

createApp({
    data() {
        return {
            apiUrl: 'https://vue3-course-api.hexschool.io/v2',
            apiPath: 'hexvue',
            products: [],
            tempProduct: {},
        }
    },
    methods: {
        checkAdmin() {
            const url = `${this.apiUrl}/api/user/check`;
            axios.post(url)
                .then(() => {
                    this.getdata();
                })
                .catch(() => {
                    alert(err.respone.data.message);
                    window.location = "login.html";
                })
        },

        getdata() {
            const url = `${this.apiUrl}/api/${this.apiPath}/admin/products`;
            axios.get(url)
                .then((response) => {
                    this.products = response.data.products;
                })
                .catch((err) => {
                    alert(err.respone.data.message);
                })
        },

        openProduct(item) {
            this.tempProduct = item;
        }
    },
    mounted() {
        // 取出 Token
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)vueToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
        axios.defaults.headers.common.Authorization = token;

        this.checkAdmin()
    }

}).mount("#app");


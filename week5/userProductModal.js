export default {
    template: "#userProductModal",
    props: {
        product: {
            type: Object,
            default() {
                return {

                }
            }
        }
    },
    data() {
        return {
            status: {},
            modal: '',
            qty: 1,
        };
    },
    mount() {
        this.modal = new bootstrap.Modal(this.$refs.modal, {
            keyboard: false,
            backdrop: "static",
        });
    },
    methods: {
        openModal() {
            this.modal.show();
        },
        hideModal() {
            this.modal.hide();
        },
    },
}
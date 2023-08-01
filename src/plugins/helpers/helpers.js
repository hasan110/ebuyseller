const Helper = {};

import { mapState, mapActions } from 'vuex'

Helper.install = function(Vue, options) {


    Vue.mixin({
        data: function() {
            return {
                // ImageUrl: 'http://localhost:8000/uploads/',
                // StaticImageUrl: 'http://localhost:8080/',
                ImageUrl: 'https://dl.polexofficial.com/uploads/',
                StaticImageUrl: 'https://seller.e-buy-shop.com/',
                // socketUrl: 'http://localhost:3000',
                // socketUrl: 'https://node.arzine.org'
            }
        },
        computed: {
            ...mapState([
                'USER',
                'LOADING',
                'SETTING',
                'SELLER_GLOBAL_DATA',
            ])
        },
        methods: {
            ...mapActions([
                'SAVE_SETTING',
                'SAVE_SELLER_GLOBAL_DATA',
                'AUTH_USER',
                'SHOW_LOADING',
            ]),
            InsertJustNumber(e) {
                const isNumeric = /^[-+]?(\d+|\d+\.\d*|\d*\.\d+)$/;
                const value = e.target.value;
                if (!isNumeric.test(value)) {
                    e.target.value = ''
                }
            },
            formatPrice(value) {
                // let val = (value/1).replace('.', '')
                // return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "،")
                if (value) {
                    const number = parseInt(value)
                    const val = Number((number).toFixed(1)).toLocaleString()
                    return val
                } else {
                    return value
                }
            },
            just_float(evt) {
                evt = (evt) ? evt : window.event;
                var charCode = (evt.which) ? evt.which : evt.keyCode;
                if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
                    evt.preventDefault();
                } else {
                    return true;
                }
            },
            just_latin(evt) {
                var p = /^[\u0600-\u06FF\s]+$/;
                if (p.test(evt.key)) {
                    evt.preventDefault();
                }
            },
            dont_allow_number(evt) {
                var p = /[^0-9]/g;
                if (!p.test(evt.key)) {
                    evt.preventDefault();
                }
            },
            allow_phone_number(evt) {
                var p = /[^0-9]/g;
                if (p.test(evt.key)) {
                    evt.preventDefault();
                }
                if (evt.target.value.length >= 11) {
                    evt.preventDefault();
                }
            },
            applyScrollingEffect()
            {
                // drag scrolling effect
                let sliders = document.querySelectorAll('.draggable');
                let isDown = false;
                let startX;
                let scrollLeft;
                sliders = [...sliders];
                sliders.forEach ( slider => {
                
                slider.addEventListener('mousedown', (e) => {
                isDown = true;
                startX = e.pageX - slider.offsetLeft;
                scrollLeft = slider.scrollLeft;
                });
                slider.addEventListener('mouseleave', () => {
                isDown = false;
                });
                slider.addEventListener('mouseup', () => {
                isDown = false;
                });
                slider.addEventListener('mousemove', (e) => {
                if(!isDown) return;
                e.preventDefault();
                const x = e.pageX - slider.offsetLeft;
                const walk = (x - startX); //scroll-fast
                slider.scrollLeft = scrollLeft - walk;
                e.preventDefault();
                });
                })
            }
        },
        mounted(){

        }
    });

};

export { Helper as default };
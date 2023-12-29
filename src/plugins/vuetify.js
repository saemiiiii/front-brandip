import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    display: {
        mobileBreakpoint: 'sm',
        thresholds: {
            xs: 0,
            sm: 340,
            md: 540,
            lg: 800,
            xl: 1280,
        },
    },
    theme: {
        themes: {
            light: {
                // primary: '#FF156D',
                primary: '#EF3426',
                secondary: '#FF1A77',
                accent: '#8c9eff',
                error: '#b71c1c',
                my_color: '#ffffff',
            },
        },
    },
});

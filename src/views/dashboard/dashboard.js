import BackToTop from 'vue-backtotop';
import navMenuItems from '@/layouts/components/vertical-nav-menu/navMenuItems.js';
import TheNavbarVertical from '@/layouts/components/navbar/TheNavbarVertical.vue';
import TheFooter from '@/layouts/components/TheFooter.vue';
import {
  themeConfig
} from '@/../themeConfig.js';
import VNavMenu from '@/layouts/components/vertical-nav-menu/VerticalNavMenu.vue';

export default {
  components: {
    BackToTop,
    TheFooter,
    TheNavbarVertical,
    VNavMenu
  },
  data () {
    return {
      footerType: themeConfig.footerType || 'static',
      hideScrollToTop: themeConfig.hideScrollToTop,
      isNavbarDark: false,
      navbarColor: themeConfig.navbarColor || '#fff',
      navbarType: themeConfig.navbarType || 'floating',
      navMenuItems,
      routerTransition: themeConfig.routerTransition || 'none',
      routeTitle: this.$route.meta.pageTitle
    };
  },
  watch: {
    '$route' () {
      this.routeTitle = this.$route.meta.pageTitle;
    },
    isThemeDark (val) {
      const color = this.navbarColor === '#fff' && val ? '#10163a' : '#fff';
      this.updateNavbarColor(color);
    },
    '$store.state.mainLayoutType' (val) {
      this.setNavMenuVisibility(val);
    }
  },
  computed: {
    bodyOverlay () {
      return this.$store.state.layout.bodyOverlay;
    },
    contentAreaClass () {
      if (this.mainLayoutType === 'vertical') {
        if (this.verticalNavMenuWidth === 'default') return 'content-area-reduced';
        else if (this.verticalNavMenuWidth === 'reduced') return 'content-area-lg';
        else return 'content-area-full';
      } else return 'content-area-full';
    },
    footerClasses () {
      return {
        'footer-hidden': this.footerType === 'hidden',
        'footer-sticky': this.footerType === 'sticky',
        'footer-static': this.footerType === 'static'
      };
    },
    isAppPage () {
      return this.$route.meta.no_scroll;
    },
    isThemeDark () {
      return this.$store.state.layout.theme === 'dark';
    },
    layoutTypeClass () {
      return `main-${this.mainLayoutType}`;
    },
    mainLayoutType () {
      return this.$store.state.layout.mainLayoutType;
    },
    navbarClasses () {
      return {
        'navbar-hidden': this.navbarType === 'hidden',
        'navbar-sticky': this.navbarType === 'sticky',
        'navbar-static': this.navbarType === 'static',
        'navbar-floating': this.navbarType === 'floating'
      };
    },
    verticalNavMenuWidth () {
      return this.$store.state.layout.verticalNavMenuWidth;
    },
    windowWidth () {
      return this.$store.state.layout.windowWidth;
    }
  },
  methods: {
    changeRouteTitle (title) {
      this.routeTitle = title;
    },
    updateNavbarColor (val) {
      this.navbarColor = val;
      if (val === '#fff') this.isNavbarDark = false;
      else this.isNavbarDark = true;
    },
    setNavMenuVisibility (layoutType) {
      if ((layoutType === 'horizontal' && this.windowWidth >= 1200) || (layoutType === 'vertical' && this.windowWidth < 1200)) {
        this.$store.commit('layout/TOGGLE_IS_VERTICAL_NAV_MENU_ACTIVE', false);
        this.$store.dispatch('layout/updateVerticalNavMenuWidth', 'no-nav-menu');
      } else {
        this.$store.commit('layout/TOGGLE_IS_VERTICAL_NAV_MENU_ACTIVE', true);
      }
    }
  },
  created () {
    const color = this.navbarColor === '#fff' && this.isThemeDark ? '#10163a' : this.navbarColor;
    this.updateNavbarColor(color);
    this.setNavMenuVisibility(this.$store.state.layout.mainLayoutType);
  }
};

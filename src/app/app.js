export default {
  data () {
    return {
      vueAppClasses: []
    };
  },
  watch: {
    '$store.state.theme' (val) {
      this.toggleClassInBody(val);
    },
    '$vs.rtl' (val) {
      document.documentElement.setAttribute('dir', val ? 'rtl' : 'ltr');
    }
  },
  methods: {
    setAppClasses (classesStr) {
      this.vueAppClasses.push(classesStr);
    },
    handleWindowResize () {
      this.$store.commit('layout/UPDATE_WINDOW_WIDTH', window.innerWidth);
      // Set --vh property
      document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
    },
    handleScroll () {
      this.$store.commit('layout/UPDATE_WINDOW_SCROLL_Y', window.scrollY);
    }
  },
  mounted () {
    this.$store.commit('layout/UPDATE_WINDOW_WIDTH', window.innerWidth);
    const vh = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  },
  async created () {
    const dir = this.$vs.rtl ? 'rtl' : 'ltr';
    document.documentElement.setAttribute('dir', dir);
    window.addEventListener('resize', this.handleWindowResize);
    window.addEventListener('scroll', this.handleScroll);
  },
  destroyed () {
    window.removeEventListener('resize', this.handleWindowResize);
    window.removeEventListener('scroll', this.handleScroll);
  }
};

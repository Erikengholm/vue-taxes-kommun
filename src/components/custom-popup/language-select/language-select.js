import InextRadio from '@/layouts/components/radio/radio.vue';
import i18n from '@/i18n/i18n';

export default {
  name: 'inext-language-select',
  components: {
    InextRadio
  },
  data () {
    return {
      alreadySelectedLanguage: '',
      xActivePopup: false,
      selectedValue:''
    };
  },
  props: {
    activePopup: Boolean,
    countryList: Array
  },
  watch: {
    activePopup (val) {
      this.xActivePopup = val;
    },
    xActivePopup (val) {
      this.$emit('popupEvent', val);
    }
  },
  mounted () {
    this.alreadySelectedLanguage = i18n.locale;
  },
  methods: {
    selectedLanguage (locale) {
      if (locale) {
        i18n.locale = locale;
        const selectedCountry = this.countryList.find((item) => item.value === locale);
        localStorage.setItem('inext-language', JSON.stringify(selectedCountry));
        this.$emit('selectedCountry', selectedCountry);
      }
    }
  }
};

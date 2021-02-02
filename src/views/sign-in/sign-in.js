import InextInputText from '@/layouts/components/input-text/input-text.vue';
import InextInputEmail from '@/layouts/components/input-email/input-email.vue';
import VButton from '@/layouts/components/button/button.vue';
import AuthService from '@/providers/services/auth/auth';
import InextLanguageSelect from '@/components/custom-popup/language-select/language-select.vue';

export default {
  components: {
    InextInputText,
    InextInputEmail,
    VButton,
    InextLanguageSelect
  },
  data () {
    return {
      form: {
        email: '',
        password: ''
      },
      isSubmitted: false,
      activeModal: false,
      countryList: [],
      country: {}
    };
  },
  provide () {
    return {
      formValidator: this.$validator
    };
  },
  mounted () {
    this.countryList = [
      {
        label: 'United States',
        value: 'en'
      }, {
        label: 'Sweden',
        value: 'sw'
      }
    ];
  },
  methods: {
    submitLoginForm () {
      this.isSubmitted = true;
      this.$validator.validateAll().then((isValid) => {
        if (isValid) {
          this.$vs.loading();
          const formEntries = JSON.parse(JSON.stringify(this.form));
          AuthService.userSignIn(formEntries).catch((error) => {
            const errorMessage = error.response.data.message || 'something went wrong';
            this.$vs.notify({
              title: 'Login Attempt',
              text: errorMessage,
              iconPack: 'feather',
              icon: 'icon-alert-circle',
              color: 'danger'
            });
          }).finally(() => {
            this.$vs.loading.close();
          });
        }
      });
    },
    redirectToSignup () {
      this.$router.push('sign-up');
    },
    redirectToForgotPassword () {
      this.$router.push('forgot-password');
    },
    redirectToEmailVerify () {
      this.$router.push('resend-token');
    },
    popupEvent (event) {
      this.activeModal = event;
    },
    selectedCountry (event) {
      this.country = event;
    }
  }
};

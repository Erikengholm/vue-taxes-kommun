import InextInputText from '@/layouts/components/input-text/input-text.vue';
import InextInputEmail from '@/layouts/components/input-email/input-email.vue';
import VButton from '@/layouts/components/button/button.vue';
import AuthService from '@/providers/services/auth/auth';

export default {
  components: {
    InextInputText,
    InextInputEmail,
    VButton
  },
  data () {
    return {
      form: {
        token: ''
      },
      isSubmitted: false
    };
  },
  provide () {
    return {
      formValidator: this.$validator
    };
  },
  methods: {
    submitTokenForm () {
      this.isSubmitted = true;
      this.$validator.validateAll().then((isValid) => {
        if (isValid) {
          this.$vs.loading();
          const formEntries = JSON.parse(JSON.stringify(this.form));
          const email = this.$route.query.email;
          AuthService.tokenVerify({
            email,
            code: formEntries.token
          }).catch((error) => {
            const errorMessage = error.response.data.data || 'something went wrong';
            this.$vs.notify({
              title: 'Token',
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
    resendToken () {
      this.$router.push('resend-token');
    },
    redirectToSignup () {
      this.$router.push('sign-up');
    }
  }
};

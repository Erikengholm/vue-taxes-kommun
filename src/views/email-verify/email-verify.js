import InextInputEmail from '@/layouts/components/input-email/input-email.vue';
import VButton from '@/layouts/components/button/button.vue';
import AuthService from '@/providers/services/auth/auth';

export default {
  components: {
    InextInputEmail,
    VButton
  },
  data () {
    return {
      form: {
        email: ''
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
    submitForm () {
      this.isSubmitted = true;
      this.$validator.validateAll().then((isValid) => {
        if (isValid) {
          this.$vs.loading();
          const formEntries = JSON.parse(JSON.stringify(this.form));
          AuthService.emailVerifyResend({
            email: formEntries.email
          }).then(() => {
            this.$router.push({
              path: 'token-verify',
              query: {
                email: formEntries.email
              }
            });
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
    redirectToSignIn () {
      this.$router.push('sign-in');
    }
  }
};

import InextInputEmail from '@/layouts/components/input-email/input-email.vue';
import VButton from '@/layouts/components/button/button.vue';

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
          // const formEntries = JSON.parse(JSON.stringify(this.form));
        }
      });
    },
    redirectToSignup () {
      this.$router.push('sign-in');
    }
  }
};

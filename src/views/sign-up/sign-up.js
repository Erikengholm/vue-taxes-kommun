import InextInputText from '@/layouts/components/input-text/input-text.vue';
import InextInputEmail from '@/layouts/components/input-email/input-email.vue';
import InextSelect from '@/layouts/components/select/select.vue';
import InextRadio from '@/layouts/components/radio/radio.vue';
import InextCheckbox from '@/layouts/components/checkbox/checkbox.vue';
import AuthService from '@/providers/services/auth/auth';
import LookupService from '@/providers/services/lookup/lookup.service';
import {
  LOOKUP_SETTINGS
} from '@/constants/helper-constants';

export default {
  components: {
    InextInputText,
    InextInputEmail,
    InextSelect,
    InextRadio,
    InextCheckbox
  },
  data () {
    return {
      form: {
        email: '',
        password: '',
        country: '',
        language: '',
        company: ''
      },
      privacyPolicy: '',
      countryList: [],
      languageList: [],
      companyList: [],
      isSubmitted: false,
      isPrivacyPolicyAccept: false
    };
  },
  mounted () {
    this.$vs.loading();
    LookupService.getLookupSettings().then((response) => {
      response.forEach((item) => {
        switch (item.key) {
        case LOOKUP_SETTINGS.TAXATION_COUNTRY: {
          this.countryList = item.value;
          break;
        }
        case LOOKUP_SETTINGS.LANGUAGE: {
          this.languageList = item.value;
          break;
        }
        case LOOKUP_SETTINGS.USER_ORGANISATION_TYPE: {
          this.companyList = item.value;
          break;
        }
        }
      });
      this.$vs.loading.close();
    });
  },
  methods: {
    redirectToSignIn () {
      this.$router.push('sign-in');
    },
    isPrivacyPolicyChecked (event) {
      this.isPrivacyPolicyAccept = event;
    },
    submitSignupForm () {
      this.isSubmitted = true;
      this.$validator.validateAll().then((isValid) => {
        if (isValid) {
          if (!this.isPrivacyPolicyAccept) {
            this.$vs.notify({
              title: 'Privacy Policy',
              text: 'Please accept privacy policy',
              iconPack: 'feather',
              icon: 'icon-alert-circle',
              color: 'warning'
            });
            return;
          }
          this.$vs.loading();
          const formEntries = JSON.parse(JSON.stringify(this.form));
          console.log(formEntries, 'formEntries');
          const params = {
            email: formEntries.email,
            password: formEntries.password,
            tax_country: '1',
            language: '1',
            user_org_type: '1',
            scope: '1'
          };
          AuthService.userSignUp(params).then(() => {
            this.$router.push({
              path: 'token-verify',
              query: {
                email: formEntries.email
              }
            });
          }).catch((error) => {
            const errorMessage = error.response.data.message || 'something went wrong';
            this.$vs.notify({
              title: 'Signup Attempt',
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
    }
  },
  provide () {
    return {
      formValidator: this.$validator
    };
  }
};

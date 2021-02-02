import InextInputText from '@/layouts/components/input-text/input-text.vue';
import VButton from '@/layouts/components/button/button.vue';
import InextLanguageSelect from '@/components/custom-popup/language-select/language-select.vue';
import axios from 'axios';

export default {
  components: {
    InextInputText,
    VButton,
    InextLanguageSelect
  },
  data () {
    return {
      activeModal: false,
      countryList: [],
      country: {},
      wallet: 0,
      inputKommun: '',
      KommunsList: [],
      Kommun: { name: '', Kommunskatt: 0, LandstingSkatt: 0 },
      show: true
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
        value: 'en'
      },
      {
        value: 'sw'
      }
    ];
    this.ApiList();
  },
  methods: {
    ApiList () {
      const numbers = new Date();
      let offset = 0;
      do {
        axios
          .get(
            `https://skatteverket.entryscape.net/rowstore/dataset/c67b320b-ffee-4876-b073-dd9236cd2a99/json?år=${numbers.getFullYear()}&_limit=500&_offset=${offset}`
          )
          .then((response) => this.StringToJson(response))
          .then((offset += 500));
      } while (offset !== 2500);
    },
    inextCharge (reaming) {
      let numb = this.wallet * 0.9801;
      if (!reaming) {
        numb = this.wallet - numb;
      }
      return this.FixDecimalPoints(numb);
    },
    SaleryOrIncomeTaxesCharges () {
      let numb = this.afterSalery(true);
      numb *= this.saleryTaxes();
      return this.FixDecimalPoints(numb);
    },

    EmployersContributetionTaxesCharges () {
      let numb = this.afterSalery(true);
      numb *= this.employersContrebutionTaxes();
      return this.FixDecimalPoints(numb);
    },

    afterSalery (returne) {
      let numb = this.inextCharge(true) / 1.314208333333333;
      if (!returne) {
        numb = this.wallet - numb;
      }
      return this.FixDecimalPoints(numb);
    },
    kommunTaxes () {
      return `Kommunens namn är ${this.Kommun.name} kommunala skatten är ${this.Kommun.Kommunskatt}% och landstings skatten är ${this.Kommun.LandstingSkatt}%`;
    },
    FixDecimalPoints (numb) {
      numb = +numb.toFixed(2);
      return numb;
    },

    WhatsLeft () {
      const numb =
        this.inextCharge(true) -
        this.EmployersContributetionTaxesCharges() -
        this.SaleryOrIncomeTaxesCharges();
      return this.FixDecimalPoints(numb);
    },

    employersContrebutionTaxes () {
      switch (this.country.value) {
      case 'sw':
        return 0.3;
      default:
        return 0.4;
      }
    },
    saleryTaxes () {
      switch (this.country.value) {
      case 'sw':
        return (
          (Number(this.Kommun.Kommunskatt) +
              Number(this.Kommun.LandstingSkatt)) /
            100
        );
      case 'dk':
        return 0.22;
      case 'no':
        return 0.27;
      case 'en':
        return 0;
      default:
        return 0;
      }
    },
    popupEvent (event) {
      this.activeModal = event;
    },
    selectedCountry (event) {
      this.country = event;
    },
    fillup (text) {
      this.$refs.KommunInputRef.updateValue(text);
    },
    search () {
      let kunst = [];
      if (this.inputKommun.length < 1) {
        return [];
      } else {
        this.KommunsList.filter((kom) => {
          if (
            kom.name.toLowerCase().startsWith(this.inputKommun.toLowerCase())
          ) {
            kunst.push(kom);
          }
        });
      }
      if (kunst.length === 1) {
        if (kunst[0].name.toLowerCase() === this.inputKommun.toLowerCase()) {
          this.Kommun = kunst[0];
          kunst = [];
          this.show = false;
        } else {
          this.show = true;
          console.log(`lol ${  this.show}`);

        }
      } 
      return kunst;
    },
    StringToJson (json) {
      let name = '';
      json.data.results.forEach((element) => {
        if (element['kommun'].toString() !== name) {
          name = element['kommun'];
          this.KommunsList.push({
            name: element['kommun'],
            Kommunskatt: element['kommunal-skatt'],
            LandstingSkatt: element['landstings-skatt']
          });
        }
      });
    }
  }
};

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
      Kommun: []
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
    const numbers = new Date();
    let offset = 0;
    do {
      axios
        .get('https://skatteverket.entryscape.net/rowstore/dataset/c67b320b-ffee-4876-b073-dd9236cd2a99/json?år=' +
            numbers.getFullYear() +
            '&_limit=500&_offset=' +
            offset
        )
        .then((response) => this.StringToJson(response))
        .then((offset += 500));
    } while (offset !== 2500);
  },
  methods: {
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
      numb *= this.incomeTax();
      return this.FixDecimalPoints(numb);
    },

    afterSalery (returne) {
      let numb = this.inextCharge(true) / 1.314208333333333;
      if (!returne) {
        numb = this.wallet - numb; 
      }
      return this.FixDecimalPoints(numb);
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

    incomeTax () {
      switch (this.country.value) {
      case 'sw':
        return 0.30;
      default :
        return 0.40;
      }
    },
    saleryTaxes () {
      switch (this.country.value) {
      case 'sw':
        return 0.314208333333333;
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
        fillup(text) {
       this.inputKommun = text
    },
    search() {
      var kunst =[]
      if (this.inputKommun.length < 1) {
        return [];
      }
      else{ 
        
        this.KommunsList.filter((kom) => {
          if(kom.name.toLowerCase().startsWith(this.inputKommun.toLowerCase())){
            kunst.push(kom)
          }
        }
      );
      }
      if(kunst.length === 1){
        if(kunst[0].name.toLowerCase() === this.inputKommun.toLowerCase()){
          Kommun = kunst[0]
          kunst = []
        }
      }
      return kunst
    },
    StringToJson(json) {
      let name = "";
      json.data.results.forEach((element) => {
        if (element["kommun"].toString() !== name) {
          name = element["kommun"];
          this.KommunsList.push({
            name: element["kommun"],
            Kommunskatt: element["kommunal-skatt"],
            LandstingSkatt: element["landstings-skatt"],
          });
        }
      });
    },
  }
};

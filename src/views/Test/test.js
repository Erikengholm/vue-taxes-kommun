import InextInputText from '@/layouts/components/input-text/input-text.vue';
import VButton from '@/layouts/components/button/button.vue';
import InextLanguageSelect from '@/components/custom-popup/language-select/language-select.vue';
import InextCheckbox from '@/layouts/components/checkbox/checkbox.vue';
import UKJavascript from './UK';
import axios from 'axios';
import DEJavascript from './Denmark';

export default {
  components: {
    InextInputText,
    VButton,
    InextLanguageSelect,
    InextCheckbox
  },
  data () {
    return {
      Taxdeduction: 0,
      activeModal: false,
      countryList: [],
      country: {},
      wallet: 0,
      inputKommun: '',
      KommunsList: [],
      Kommun: { name: '', Kommunskatt: 0, LandstingSkatt: 0 },
      show: true,
      name: '',
      age: 0,
      TaxesList: UKJavascript.methods.getList(),
      date: new Date(),
      pension: false,
      ScottishIncomeTax: false,
      churce: false
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
        value: 'dk'
      },
      {
        value: 'sw'
      }
    ];
    this.ApiList();
  },
  methods: {
    getTaxes () {
      
      switch (this.country.value) {
      case 'en' :
        this.TaxesList = UKJavascript.methods.returnTaxes(this.wallet, this.ScottishIncomeTax, this.age);           
        break;   
      case 'dk' : 
        this.TaxesList = DEJavascript.methods.CalculateDanish(this.churce, this.wallet);
        break;
      default :
        UKJavascript.methods.getList();
        break ;

      }
    },
    isPensionChecked (event) {
      this.ScottishIncomeTax = event;
    },
    isChurceChecked (event) {
      this.churce = event;
    },
    isScottishChecked (event) {
      this.age = event;
    },
    ApiList () {
      let offset = 0;
      do {
        axios
          .get(
            `https://skatteverket.entryscape.net/rowstore/dataset/c67b320b-ffee-4876-b073-dd9236cd2a99/json?år=${this.date.getFullYear()}&_limit=500&_offset=${offset}`
          )
          .then((response) => this.StringToJson(response))
          .then((offset += 500));
      } while (offset !== 1500);
    },
    inextCharge (reaming) {
      let numb = this.wallet * 0.9801;
      if (!reaming) {
        numb = this.wallet - numb;
      }
      return this.FixDecimalPoints(numb);
    },
    SaleryOrIncomeTaxesCharges () {
      /* inkomskatt fungerar genom att dra bort din inkomst via kolumen fixa efter 20000 så ökar från med två hundra */
      const numb = this.EmployerTaxes(true);
      if (numb < 1600) {
        return 0;
      } else {
        return this.Taxdeduction; 
      }
    },
    async getTaxDeduction () {
      //console.log(`${this.SaleryBeforeTax() } this is you salery before tax`);
      let salery = Math.ceil(this.SaleryBeforeTax() / 100) * 100;
      if (salery > 20000) {
        const EvenOrOdd = salery.toString();
        const a = EvenOrOdd.charAt(EvenOrOdd.length - 3);
        if (Number(a) % 2 !== 0) {
          salery += 100;
        }
      }
      // eslint-disable-next-line init-declarations
      let test2;
      if (salery > 1600 && salery < 80000) {
        test2 = await axios
          .get(
            `https://skatteverket.entryscape.net/rowstore/dataset/88320397-5c32-4c16-ae79-d36d95b17b95?tabellnr=${Math.round(Number(this.Kommun.Kommunskatt) + Number(this.Kommun.LandstingSkatt) + Number(this.Kommun.begravningsAvgift))}&%C3%A5r=${this.date.getFullYear()}&inkomst%20t.o.m.=${salery}&_limit=500&_offset=0`
          ); 
      } else {
        test2 = await axios
          .get(
            `https://skatteverket.entryscape.net/rowstore/dataset/88320397-5c32-4c16-ae79-d36d95b17b95?tabellnr=${Math.round(Number(this.Kommun.Kommunskatt) + Number(this.Kommun.LandstingSkatt) + Number(this.Kommun.begravningsAvgift))}&%C3%A5r=${this.date.getFullYear()}&_limit=500&_offset=485`
          ).then((response) => this.TaxdeductionAboveThreashold(response, salery)); 
      }
      if (salery > 1600 && salery < 80000) {
        this.Taxdeduction = (await test2).data.results[0][this.TaxColumn()];
      } else {
        this.Taxdeduction = 0;
      }
      
    },
    TaxdeductionAboveThreashold (response, salery) {
      response.data.results.forEach((element) => { 
        if (salery > element['inkomst fr.o.m.'] && (salery < element['inkomst t.o.m.'] || element['inkomst t.o.m.'] === '')) {
          this.Taxdeduction = Math.floor(Math.floor(this.SaleryBeforeTax()) * (Number(element[this.TaxColumn()] / 100)));
        } 
      });
            
    },
    TaxColumn () {
      if ((Number(this.date.getFullYear()) - this.age) > 65) return 'kolumn 3';
      else return 'kolumn 1';
    },
    EmployersContributetionTaxesCharges () {
      let numb = this.EmployerTaxes(true);
      numb *= this.employersContrebutionTaxes();
      return this.FixDecimalPoints(numb);
    },

    EmployerTaxes (returne) {
      let numb = this.inextCharge(true);
      numb /= 1.314208333333333;
      if ((Number(this.date.getFullYear()) - this.age) < 65) {
        numb = numb * 0.3142;
      } else if ((Number(this.date.getFullYear()) - this.age) < 84) {
        numb = numb * 0.1021;
      } else {
        numb = 0;
      }
      if (!returne) {
        numb = this.wallet - numb;
      }
      //console.log(`second employer taxe 0.3142 = ${numb}`);
      return this.FixDecimalPoints(numb);
    },
    kommunTaxes () {
      return `Kommunens namn är ${this.Kommun.name} och din skatte tabell är ${Math.round(Number(this.Kommun.Kommunskatt) + Number(this.Kommun.LandstingSkatt) + Number(this.Kommun.begravningsAvgift))}`;
    },
    FixDecimalPoints (numb) {
      numb = +numb.toFixed(2);
      return numb;
    },

    SaleryBeforeTax () {
      const numb = this.wallet -
        this.inextCharge(false) -
        this.EmployerTaxes(true) ;
      return this.FixDecimalPoints(numb);
    },
    SaleryAfterTax () {
      const numb = this.wallet -
        this.inextCharge(false) -
        this.EmployerTaxes(true) - 
        this.Taxdeduction;
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
      switch (this.country.value) {
      case 'sw':
        return this.searchSwedish();
      case 'dk':
        return DEJavascript.methods.DansihSearch(this.inputKommun);
      }
    },
    searchSwedish () {
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
        }
      } 
      return kunst;
    },
    StringToJson (json) {
      json.data.results.forEach((element) => {
        if (element['kommun'].toString() !== this.name) {
          this.name = element['kommun'];
          this.KommunsList.push({
            name: element['kommun'],
            Kommunskatt: element['kommunal-skatt'],
            LandstingSkatt: element['landstings-skatt'],
            begravningsAvgift: element['begravnings-avgift']
          });
        }
      });
    },
    buttonDisable () {
      switch (this.country.value) {
      case 'sw':
        if (this.wallet <= 0 || Number(this.Kommun.Kommunskatt) === 0 || this.age <= 0) return true;
        else return false;
      case 'dk':
        if (this.wallet <= 0 || Number(DEJavascript.methods.CheckMuncipilirate) === 0) return true;
        else return false;
      }
    
    }
  }
};

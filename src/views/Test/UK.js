// You need a specific loader for CSS files like https://github.com/webpack/css-loader
export default {
  name: 'app',
  data () {
    return {
      countryList: [],
      country: {},
      taxes: 0,
      income: 0,
      ScottishIncomeTax: true,
      AgeAbovePension: false,
      picked: ''
    };
  },
  methods: {
    returnTaxes (money, scottish, age) {
      this.income = money;
      this.ScottishIncomeTax = scottish;
      this.AgeAbovePension = age;  
      return this.uktaxes();
    },
    uktaxes () {
      /* C8 = inkomst
          c9 = utgifter // higher tax bracets calculat trhougth (taxableincome - 37500) * 0.4 then + 7500
          c13 = tax allowence
      */
      const taxes = [];
      const inextCharge = this.income * 0.0199;

      taxes.push({
        text: 'WalletInext',
        money: Math.round(inextCharge * 100) / 100
      });
      
      const profits = Math.floor(this.income) - inextCharge;
      taxes.push({
        text: 'totale amount of profits ',
        money: Math.round(profits * 100) / 100
      });
      let taxableIncome = profits - this.taxallowence();
      if (taxableIncome < 0) {
        taxableIncome = 0;
      }
      console.log(`${this.income  }= wallet | profits =${ inextCharge} || after inextcharge = ${this.income - inextCharge}`);
      taxes.push({
        text: 'how much are taxable ',
        money: Math.round(taxableIncome * 100) / 100
      });
      console.log(`${taxableIncome }= taxincome | profits =${ profits}`);
      taxes.push({
        text: 'Your Monthly income tax ',
        money: this.FixDecimalPoints(this.incomeTaxUk(taxableIncome, profits))
      });
      taxes.push({
        text: 'You insurance rate',
        money: this.FixDecimalPoints(this.insuranceRateUk(profits))
      });
      taxes.push({
        text: 'HowMuchIsLeft',
        money: this.FixDecimalPoints(profits - this.FixDecimalPoints(this.incomeTaxUk(taxableIncome, profits) + this.insuranceRateUk(profits)))
      });
      return taxes;
    },
    taxallowence () {
      return 1042.42;
    },
    insuranceRateUk (profits) {
      if (this.AgeAbovePension) {
        return 0;
      } else {
        if (profits < 791) return profits * 0;
        if (profits > 791 && 4167 > profits) return ((profits - 791) * 0.12) - 0.08;
        else return ((profits - 4167) * 0.02) + 405.01;
      }
    },
    incomeTaxUk (taxIncome, profits) {
      if (this.ScottishIncomeTax) {
        if (profits < this.taxallowence()) return 0;
        else if (profits > this.taxallowence() && profits < this.taxallowence() + 173) {
          return taxIncome * 0.19;
        } else if (profits < this.taxallowence() + 1054.83333333) return ((taxIncome - 173) * 0.2) + 32.87;
        else if (profits < this.taxallowence() + 2576.83) {
          return ((taxIncome - 1054) * 0.21) + 32.87 + 176.2;
        } else if (profits < this.taxallowence() + 11457.58) {
          return ((taxIncome - 173 - 881 - 1522.58333333) * 0.41) + 32.87 + 176.2 + 319.705;
        } else return ((taxIncome - 173 - 881 - 1522.58333333 - 8880.75) * 0.46) + 4169.88;
      } else if (profits < this.taxallowence()) return 0;
      else if (profits < this.taxallowence() + 3125) return taxIncome * 0.2;
      else if (profits < this.taxallowence() + 12500) return ((taxIncome - 3125) * 0.4) + 625.15;
      else if (12500 < profits) return ((taxIncome - 12500) * 0.45) + 625.15 + 3802.12;
    },
    FixDecimalPoints (numb) {
      numb = +numb.toFixed(2);
      return numb;
    },
    getList () {
      const list = [];
      list.push({
        text: 'WalletInext',
        money: 0
      });
      list.push({
        text: 'totale amount of profits ',
        money: 0
      });
      list.push({
        text: 'how much are taxable ',
        money: 0
      });
      list.push({
        text: 'WalletTaxes',
        money: 0
      });
      list.push({
        text: 'You insurance rate',
        money: 0
      });
      list.push({
        text: 'WalletSallery',
        money: 0
      });
      return list;
    }
  }
};
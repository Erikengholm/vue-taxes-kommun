import DanishJSON from '../../assets/JSON/Denmark2021Tax.json';

export default {
  name: 'app',
  data () {
    return {
      churce: false,
      income: 0,
      DanishTaxes: 0,
      DansihKommun: {}
    };
  },
  methods: {
    CheckMuncipilirate () {
      return this.DansihKommun.MunicipalTaxRate;
      
    },
    CalculateDanish (churce, income) {
      this.churce = churce;
      return this.GetDanishTaxCaulation(income);
    },
    GetLarbourCost () {
      return this.DanishTaxes * 0.08;
    },
    ChurchTax () {
      if (this.churce) {
        return this.DanishTaxes * (this.DansihKommun.ChurchTaxRate / 100);
        
      } else return 0;
    },
    DanishtaxableIncome () {
      return this.DanishTaxes -
            this.ChurchTax() -
            this.GetLarbourCost() -
            this.GetDanishTaxAllowence() -
            this.jobAllowence();
      
    },
    GetDanishTaxAllowence () {
      if (this.DanishTaxes * 12 * 0.106 < 40600) return this.DanishTaxes * 0.106;
      else return 3383.33333;
    },
    jobAllowence () {
      if (this.DanishTaxes * 12 > 195800) {
        if (this.DanishTaxes * 12 * 0.045 < 2600) return 216.666667;
        else {
          return this.DanishTaxes * 0.045;
        }
      } else return 0;
    },
    DanishNationalIncomeTaxRatesBottom () {
      if (this.DanishtaxableIncome() < 45399.9167) return this.DanishtaxableIncome() * 0.1211;
      else return (45399.9167 - this.jobAllowence() - this.GetDanishTaxAllowence()) * 0.1211
      ;
    },
    DanishNationalIncomeTaxRatesTop () {
      if (this.DanishtaxableIncome() < 45400) {
        return 0;
      } else return (this.DanishtaxableIncome() - 45400) * 0.15;
    },
    DanishMunicipalTax () {
      if (this.DansihKommun.MunicipalTaxRate) {
        return this.DanishtaxableIncome() * (this.DansihKommun.MunicipalTaxRate / 100);
        
      } else return 0;
    },
  
    GetSalery () {
      return (
        this.DanishTaxes -
          this.GetLarbourCost() -
          this.DanishNationalIncomeTaxRatesBottom() -
          this.DanishNationalIncomeTaxRatesTop() -
          this.DanishMunicipalTax() -
          this.ChurchTax()
      );
    },
    GetTaxCeilingtaxse () {
      return (
        this.DanishTaxes -
          this.DanishNationalIncomeTaxRatesTop() -
          this.DanishNationalIncomeTaxRatesBottom() -
          this.DanishMunicipalTax()
      );
    },
    DanishTaxCeiling () {
      if (this.GetTaxCeilingtaxse() / this.DanishTaxes < 0.5206) {
        return false;
      } else {
        return true;
      }
    },
    FixDecimalPoints (numb) {
      numb = +numb.toFixed(2);
      return numb;
    },
    DansihSearch (info) {
      let kunst = [];
      if (info.length < 1) {
        return [];
      } else {
        DanishJSON.filter((kom) => {
          if (kom.name.toLowerCase().startsWith(info.toLowerCase())) {
            kunst.push(kom);
          }
        });
      }
      if (kunst.length === 1) {
        if (kunst[0].name.toLowerCase() === info.toLowerCase()) {
          this.DansihKommun = kunst[0];
          kunst = [];
        }
      }
      return kunst;
    },
    DanishMunicipalTaxRates () {
      return this.DanishtaxableIncome() * (this.DansihKommun.MunicipalTaxRate / 100);
    },
    GetDanishTaxCaulation (income) {
      this.DanishTaxes = income * 0.9801;
  
      const Calculation = [];
      Calculation.push({
        text: 'WalletInext',
        money: this.FixDecimalPoints(income * 0.0199)
      });
      Calculation.push({
        text: `your larbour cost is ${  this.DanishTaxes  }* 8 % = `,
        money: this.FixDecimalPoints(this.GetLarbourCost())
      });
      if (this.churce) {
        Calculation.push({
          text: `your Churc tax is ${  this.DanishTaxes  } * ${  this.DansihKommun.ChurchTaxRate  } = `,
          money: this.FixDecimalPoints(this.ChurchTax())
        });
      }
      Calculation.push({
        text:
            `your employment allowence is ${ 
              this.FixDecimalPoints(this.GetDanishTaxAllowence()) 
            } and  your work allowence is ${ 
              this.FixDecimalPoints(this.jobAllowence())
            } your allowence combined is`,
        money: this.FixDecimalPoints(this.GetDanishTaxAllowence() + this.jobAllowence())
      });
      Calculation.push({
        text:
            `your taxable income is ${ 
              this.FixDecimalPoints(this.DanishTaxes) 
            } - ${ 
              this.FixDecimalPoints(this.GetLarbourCost()) 
            } - ${ 
              this.FixDecimalPoints(this.ChurchTax()) 
            } - ${ 
              this.FixDecimalPoints(this.GetDanishTaxAllowence()) 
            } = `,
        money: this.FixDecimalPoints(this.DanishtaxableIncome())
      });
      Calculation.push({
        text:
            `your Bottom Income tax rate is 12.11% *${  this.FixDecimalPoints(this.DanishtaxableIncome())  } = `,
        money: this.FixDecimalPoints(this.DanishNationalIncomeTaxRatesBottom())
      });
      Calculation.push({
        text:
            `your top Income tax rate is 15% *${ 
              this.FixDecimalPoints(this.DanishtaxableIncome()) 
            } if you earn over 45400 per month`,
        money: this.FixDecimalPoints(this.DanishNationalIncomeTaxRatesTop())
      });
      Calculation.push({
        text:
            `your Municipal tax rate is ${ 
              this.DansihKommun.MunicipalTaxRate 
            }% *${ 
              this.FixDecimalPoints(this.DanishtaxableIncome()) 
            } = `,
        money: this.FixDecimalPoints(this.DanishMunicipalTaxRates())
      });
      if (this.DanishTaxCeiling()) {
        Calculation.push({
          text: 'your salery is ',
          money: this.FixDecimalPoints(this.GetSalery())
        });
      } else {
        Calculation.push({
          text:
              'you hitt a tax ceiling in denmark you cant be taxed above 52.06 % (not including labour and churce tax) \n of your wage ypur salery then becomes ',
          money: this.FixDecimalPoints((this.DanishTaxes * 0.4794) - this.GetLarbourCost() - this.ChurchTax())
        });
      }
      return Calculation;

    }
  }
};
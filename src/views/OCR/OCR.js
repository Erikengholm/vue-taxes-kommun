import InextInputText from '@/layouts/components/input-text/input-text.vue';
import VButton from '@/layouts/components/button/button.vue';
import InextLanguageSelect from '@/components/custom-popup/language-select/language-select.vue';
import Luhn from 'luhn-js';

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
      OCR: '',
      kund: '2',
      OCRInput: '',
      picked: 'Auto'
    };
  },
  beforeMount () {
    this.setOCR();
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
    async AutoGenerateOCR () {
      do {
        /*OCR koden består av Datum(månad och dag i siffer form) Kund-id tre slumpmässiga siffror mellan
        0-9 Kod längd och en Luhn Algoritm siffra
        ||
        OCR code consists of Date(month and day in numerical form) Customer ID three random digits between 
        0-9 Code length and a Luhn Algorithm number
        */
        const Today = new Date();
        this.OCR =
          (Today.getUTCMonth() + 1).toString() +
          Today.getUTCDate().toString() +
          this.kund + //Placeholder för kundnummer || for Costumer id
          this.getRandomNumber() +
          this.getRandomNumber() +
          this.getRandomNumber();
        this.OCR += ((this.OCR.length + 2) % 10).toString();
        //Luhn är en importerad Component som genererar Luhn siffran från strängar
        // Luhn is an imported Component that generates the Luhn figure from a string value
        this.OCR = Luhn.generate(this.OCR.toString());
        /*unique kommer nu tjecka av med en firebase database och se till att OCR
        är unik eller starta om do-while processen ok ge kunden en ny OCR kod
        ||
        unique will now check with a firebase database and make sure that 
        OCR is unique or restart the do-while process and give the customer a new OCR code
        */
      } while (await this.unique());
    },
    async setOCR () {
      if (this.picked === 'Auto') {
        //min kod  || mine code 
        this.AutoGenerateOCR();
      } else if (this.picked === 'Manual') {
        //Pontus kod med mina små modifkationer || Pontus code with mine small modifcations
        this.generateManualeOCR();
      }
    },
    async unique () {
      /* denna kod är när vi kopplat programmet med en databas || this code is for when we connected the program with a database
      const snapshot = await OCRCollection.get();
      snapshot.forEach((doc) => {
        if (doc.data().OCRNumber === this.OCR) {
          return true;
        }
      });*/
      return false;
    },
    getRandomNumber () {
      const OCRString = '1234567890X';
      const charecter = OCRString.charAt(Math.floor(Math.random() * Math.floor(OCRString.length)));
      if (charecter === 'X') return '';
      else return charecter;
    },
    generateManualeOCR () {
      // här hämtas texten från input via v-model || here the text is brought from input by v-model
      let invoiceNumber = this.OCRInput;
      // längden sätts och lägger till två för att räkna med både längd siffran och check siffran || the length is set and adds two to count on both the length of the figure and the check figure
      invoiceNumber += (invoiceNumber.length + 2) % 10;

      let oneOrTwo = true;
      let sum = 0;
      //här räknas Luhns check siffran ut || here the luhns figure is counted
      for (let i = invoiceNumber.length - 1; i >= 0; i--) {
        const num = invoiceNumber.charAt(i);
        if (oneOrTwo) {
          let number = num * 2;
          if (number >= 10) {
            const n = number % 10;
            const summa = (number - n) / 10;
            number = n + summa;
          }
          sum += number;
          oneOrTwo = false;
        } else {
          const number = num * 1;
          sum += number;
          oneOrTwo = true;
        }
      }
      let checkingNumber = 0;
      while (sum % 10 !== 0) {
        checkingNumber++;
        sum++;
      }
      // check siffran lägs till efter uträkning || luhns figure is added after count
      invoiceNumber += checkingNumber;
      this.OCR = invoiceNumber;
    },
    popupEvent (event) {
      this.activeModal = event;
    },
    selectedCountry (event) {
      this.country = event;
    }
    
  }
};
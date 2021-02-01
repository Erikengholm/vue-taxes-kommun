<!-- 
Mål 

1 koppla in https://skatteverket.entryscape.net/rowstore/dataset/c67b320b-ffee-4876-b073-dd9236cd2a99

2 gör en funktion som låter en skriva in kummon och autokomplettar 

3 ta skatte värdet från json och sätt in i funktion kolla om du kan hitta en version som auto uppdaterar || social avgift är konstant 31.42%
!-->
<template>
  <div id="app">
    <input type="number" v-model="taxes" />
    <input type="text" v-model="info" />
    <p v-text="Kommuner[taxes]"></p>
   <div v-for="item in search()" v-bind:key="item.index" @click="fillup(item.name)">{{ item.name }} </div>

  </div>
</template>

<script>
import axios from "axios";
import Autocomplete from "@trevoreyre/autocomplete-vue";

// You need a specific loader for CSS files like https://github.com/webpack/css-loader
export default {
  components: {
    Autocomplete,
  },
  name: "app",
  data() {
    return {
      taxes: 0,
      offset: 0,
      info: "",
      Kommun: [],
      Kommuner: [{ name: "", Kommunskatt: 0, LandstingSkatt: 0 }],
    };
  },
  mounted() {
    const numbers = new Date();
    let offset = 0;
    do {
      axios
        .get(
          "https://skatteverket.entryscape.net/rowstore/dataset/c67b320b-ffee-4876-b073-dd9236cd2a99/json?år=" +
            numbers.getFullYear() +
            "&_limit=500&_offset=" +
            offset
        )
        .then((response) => this.StringToJson(response))
        .then((offset += 500));
    } while (offset != 2500);
  },
  methods: {
    returnTaxes() {
      this.taxes /= 1.3142;
      return this.taxes;
    },
    fillup(text){
      this.info = text
    },
    search() {
      var kunst =[]
      if (this.info.length < 1) {
        return [];
      }
      else{ 
        
        this.Kommuner.filter((kom) => {
          if(kom.name.toLowerCase().startsWith(this.info.toLowerCase())){
            kunst.push(kom)
          }
        }
      );
      }
      console.log(kunst.length)
      if(kunst.length === 1){
        if(kunst[0].name.toLowerCase() === this.info.toLowerCase()){
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
          this.Kommuner.push({
            name: element["kommun"],
            Kommunskatt: element["kommunal-skatt"],
            LandstingSkatt: element["landstings-skatt"],
          });
        }
      });
    },
  },
};
</script>

<style lang="scss">
</style>
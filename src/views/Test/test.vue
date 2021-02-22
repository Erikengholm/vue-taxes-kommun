<template>
  <div class="taxes-page app-bg-color">
    <div class="taxes-form-container">
      <div class="inext-logo"></div>
      <div class="taxes-form-wrapper">
        <vs-row class="row-welcome-text" justify="center">
          <vs-col
            justify="center"
            v-if="countryList.empty"
            w="12"
            align="center"
          ></vs-col>
          <vs-col justify="center" v-else w="12" align="center">{{
            $t("welcome")
          }}</vs-col>
        </vs-row>
        <div class="row-password">
          <div v-show="country.value == 'sw' || 'dk'">
            <inext-input-text
              v-model="inputKommun"
              :inputType="'text'"
              :name="'Kommun'"
              :label="'Kommun'"
              :placeholder="'Kommun'"
              ref="KommunInputRef"
            ></inext-input-text>
            <div>
              <ul
                class="OptionsList"
                :style="{ visibility: show ? 'visible' : 'hidden' }"
              >
                <li
                  v-for="item in search()"
                  v-bind:key="item.index"
                  v-on:click="fillup(item.name)"
                >
                  {{ item.name }}
                </li>
              </ul>
            </div>
            
          </div>
         
          <inext-input-text
            v-model="wallet"
            :inputType="'number'"
            :name="'wallet'"
            :label="'wallet'"
          ></inext-input-text>
           <div  v-show="country.value == 'dk'">
              <inext-checkbox @isCheckBoxChecked="isChurceChecked($event)" :labels="'do you pay churce taxes'"/>
          </div>
          <div v-show="country.value == 'en'">
            <br>
            <inext-checkbox @isCheckBoxChecked="isPensionChecked($event)" :labels="'are you over state pension age'">do you pay scottish taxes</inext-checkbox>
            <br>
            <inext-checkbox @isCheckBoxChecked="isScottishChecked($event)" :labels="'do you pay scottish taxes'"> </inext-checkbox>
          </div>
        </div>
        <div class="row-privacy-policy" v-show="country.value == 'sw'">
          <inext-input-text
            v-model="age"
            :inputType="'number'"
            :name="'age'"
            :label="'age'"
          ></inext-input-text>
          <span class="col-privacy-policy">skriv in födelse året</span>
        </div>
      </div>
      <div v-show="country.value == 'sw'" class="footer-section">

        <vs-row class="taxes-section">
          <vs-col>
            <strong
              >taxes <span>{{ kommunTaxes() }}</span></strong
            >
          </vs-col>
        </vs-row>
        <vs-row class="taxes-section">
          <vs-col>
            <strong
              >{{ $t("WalletInput") }}: <span v-text="wallet"></span
            ></strong>
          </vs-col>
        </vs-row>
        <vs-row class="taxes-section">
          <vs-col>
            <strong
              >{{ $t("WalletInext") }}:
              <span>{{ inextCharge(false) }}</span></strong
            >
          </vs-col>
        </vs-row>
        <vs-row class="taxes-section">
          <vs-col>
            <strong
              >{{ $t("WalletTaxes") }}:
              <span v-text="Taxdeduction"></span></strong
            >
          </vs-col>
        </vs-row>
        <vs-row class="taxes-section">
          <vs-col>
            <strong
              >{{ $t("WalletEmployersContributetion") }}:
              <span>{{ EmployerTaxes(true) }}</span></strong
            >
          </vs-col>
        </vs-row>
        <vs-row class="taxes-section">
          <vs-col>
            <strong
              >{{ $t("HowMuchIsLeft") }}: <span>{{ SaleryAfterTax () }}</span></strong
            >
          </vs-col>
        </vs-row>
      </div>
      <div v-show="country.value !== 'sw'" style="
    margin: 10px 0;
" class="footer-section" v-for="item in TaxesList" v-bind:key="item.index" >
          <vs-row class="taxes-section" >
          <vs-col>
            <strong
              >{{$t(item.text)}} <span>{{item.money}}</span></strong
            >
          </vs-col>
        </vs-row>
      </div>
      <div style="
    margin: 0px 0;
" class="footer-section endFooter">
        <vs-row class="taxes-section">
          <vs-col>
            <strong
              >{{ $t("youUseInext") }} {{ country.label }}
              <span @click="activeModal = !activeModal">{{
                $t("anotherCountry")
              }}</span></strong
            >
          </vs-col>
        </vs-row>
        <vs-row>
          <inext-language-select
            :countryList="countryList"
            :activePopup="activeModal"
            @popupEvent="popupEvent($event)"
            @selectedCountry="selectedCountry($event)"
          ></inext-language-select>
        </vs-row>
                <vs-button type="filled" :disabled="buttonDisable()" @click.prevent="getTaxes()">calculate</vs-button>
        
      </div>
    </div>
  </div>
</template>
<script lang="js" src="./test.js"></script>
<style lang="scss" src="./test.scss"></style>

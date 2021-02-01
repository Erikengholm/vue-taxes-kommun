<template>
  <div class="taxes-page app-bg-color">
    <div class="taxes-form-container">
      <div class="inext-logo"></div>
      <div class="taxes-form-wrapper">
        <vs-row class="row-welcome-text" justify="center">
          <vs-col justify="center" v-if="countryList.empty" w="12" align="center"></vs-col>
          <vs-col justify="center" v-else w="12" align="center">{{
            $t("welcome")
          }}</vs-col>
        </vs-row>
        <div class="row-password">
        <div>
        <inext-input-text
            v-model="inputKommun"
            :inputType="'text'"
            :name="'Kommun'"
            :label="'Kommun'"
          ></inext-input-text>
          <div>
           <ul class="OptionsList">
              <li v-for="item in search()" :key="item.name">
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
        </div>
        <div class="row-submit-btn">
          <vs-button type="filled" @click.prevent="incomeTax()">Submit</vs-button>
        </div>
      </div>
      <div class="footer-section">
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
              >{{ $t("WalletInext") }}: <span>{{inextCharge(false)}}</span
            ></strong>
          </vs-col>
        </vs-row>
        <vs-row class="taxes-section">
          <vs-col>
            <strong
              >{{ $t("WalletTaxes") }}: <span>{{SaleryOrIncomeTaxesCharges ()}}</span
            ></strong>
          </vs-col>
        </vs-row>
        <vs-row class="taxes-section">
          <vs-col>
            <strong
              >{{ $t("WalletSallery") }}: <span>{{afterSalery (false)}}</span
            ></strong>
          </vs-col>
        </vs-row>
        <vs-row class="taxes-section">
          <vs-col>
            <strong
              >{{ $t("HowMuchIsLeft") }}: <span>{{WhatsLeft ()}}</span
            ></strong>
          </vs-col>
        </vs-row>
        <vs-row class="taxes-section">
          <vs-col>
            <strong
              >{{ $t("youUseInext") }} {{ country.label }}
              <span @click="activeModal = !activeModal">{{
                $t("anotherCountry")
              }}</span></strong
            >
          </vs-col>
          <inext-language-select
            :countryList="countryList"
            :activePopup="activeModal"
            @popupEvent="popupEvent($event)"
            @selectedCountry="selectedCountry($event)"
          ></inext-language-select>
        </vs-row>
      </div>
    </div>
  </div>
</template>
<script lang="js" src="./test.js"></script>
<style lang="scss" src="./test.scss"></style>

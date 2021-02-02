<template>
  <div class="OCR-page app-bg-color">
    <div class="OCR-form-container">
      <div class="inext-logo"></div>
      <div class="OCR-form-wrapper">
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
        <div class="row-OCR-input">
          <inext-input-text
            v-model="OCRInput"
            :inputType="'number'"
            :name="'OCR'"
            :label="'OCR'"
            maxlength="18"
          ></inext-input-text>
        </div>
        <div class="row-submit-btn">
          <vs-button type="filled" @click.prevent="setOCR()">Submit</vs-button>
        </div>
        <div class="OCR-RadioBtn">
          <div id="Auto">
            <input type="radio" value="Auto" v-model="picked" />
            <label for="Auto">Auto Generat OCR</label>
          </div>
          <div>
            <input type="radio" id="Manual" value="Manual" v-model="picked" />
            <label for="Manual">Manual Generate OCR</label>
          </div>
        </div>
      </div>
      <div class="footer-section">
        <vs-row class="OCR-section">
          <vs-col>
            <p v-text="OCR"></p>
          </vs-col>
        </vs-row>
        <vs-row class="OCR-section">
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
<script lang="js" src="./OCR.js"></script>
<style lang="scss" src="./OCR.scss"></style>

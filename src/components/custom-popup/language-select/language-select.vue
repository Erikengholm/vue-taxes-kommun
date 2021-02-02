<template>
<div class="language-wrapper-wrapper">
  <vs-popup title="Countries" :active.sync="xActivePopup">
    <inext-radio v-if="alreadySelectedLanguage" :defaultValue="alreadySelectedLanguage" :radioList="countryList" @input="selectedLanguage($event)"></inext-radio>
  </vs-popup>
</div>
</template>
<style lang="scss" src="./language-select.scss"></style>
<script lang="js" src="./language-select.js"></script>

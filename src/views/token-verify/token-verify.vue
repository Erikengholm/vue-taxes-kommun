<template>
<div class="token-page app-bg-color">
  <div class="token-form-container">
    <div class="inext-logo"></div>
    <div class="token-form-wrapper">
      <vs-row class="row-welcome-text" justify="center">
        <vs-col justify="center" w="12" align="center">{{ $t('enterToken') }}</vs-col>
      </vs-row>
      <form class="token-form">
        <div class="resend-token-form">
          <inext-input-text v-model="form.token" :inputType="'number'" :name="'token'" :label="'Token'" :placeholder="'Token'" :isSubmitted="isSubmitted"></inext-input-text>
        </div>
        <div class="row-submit-btn resend-token">
          <vs-button type="filled" @click.prevent="resendToken">{{ $t('Resend Token') }}</vs-button>
        </div>
        <div class="row-submit-btn">
          <vs-button type="filled" @click.prevent="submitTokenForm">{{ $t('Submit') }}</vs-button>
        </div>
      </form>
    </div>
    <div class="footer-section">
      <vs-row class="login-section">
        <vs-col>
          <strong @click="redirectToSignup">{{ $t('doYouHaveAccount') }} <span>{{ $t('createAnAccount') }}</span></strong>
        </vs-col>
      </vs-row>
    </div>
  </div>
</div>
</template>
<style lang="scss" src="./token-verify.scss"></style>
<script lang="js" src="./token-verify.js"></script>

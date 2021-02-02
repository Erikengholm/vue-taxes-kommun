<template>
<div class="email-verify-page app-bg-color">
  <div class="email-verify-form-container">
    <div class="inext-logo"></div>
    <div class="email-verify-form-wrapper">
      <vs-row class="row-welcome-text" justify="center">
        <vs-col justify="center" w="12" align="center">{{ $t('enterEmail') }}</vs-col>
      </vs-row>
      <form class="email-form">
        <div class="email-verify-form">
          <inext-input-email v-model="form.email" :inputType="'text'" :name="'email'" :label="'Email'" :placeholder="'Email'" :isSubmitted="isSubmitted"></inext-input-email>
        </div>
        <div class="row-submit-btn">
          <vs-button type="filled" @click.prevent="submitForm">{{ $t('Submit') }}</vs-button>
        </div>
      </form>
    </div>
    <div class="footer-section">
      <vs-row class="login-section">
        <vs-col>
          <strong @click="redirectToSignIn">{{ $t('doYouHaveAccount') }} <span>{{ $t('login') }}</span></strong>
        </vs-col>
      </vs-row>
    </div>
  </div>
</div>
</template>
<style lang="scss" src="./email-verify.scss"></style>
<script lang="js" src="./email-verify.js"></script>

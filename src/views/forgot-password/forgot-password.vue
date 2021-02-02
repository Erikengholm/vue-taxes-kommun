<template>
<div class="forgot-password-page app-bg-color">
  <div class="forgot-password-form-container">
    <div class="inext-logo"></div>
    <div class="forgot-password-form-wrapper">
      <vs-row class="row-welcome-text" justify="center">
        <vs-col justify="center" w="12" align="center">{{ $t('forgotYourPwd') }}</vs-col>
      </vs-row>
      <form class="forgot-form">
        <div class="forgot-password-form">
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
          <strong @click="redirectToSignup">{{ $t('doYouHaveAccount') }} <span>{{ $t('login') }}</span></strong>
        </vs-col>
      </vs-row>
    </div>
  </div>
</div>
</template>
<style lang="scss" src="./forgot-password.scss"></style>
<script lang="js" src="./forgot-password.js"></script>

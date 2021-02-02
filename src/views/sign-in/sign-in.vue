<template>
<div class="login-page app-bg-color">
  <div class="login-form-container">
    <div class="inext-logo"></div>
    <div class="login-form-wrapper">
      <vs-row class="row-welcome-text" justify="center">
        <vs-col justify="center" w="12" align="center">{{ $t('welcome') }}</vs-col>
      </vs-row>
      <vs-row class="row-bank-select">
        <vs-button>
          <i class="bank-icon"></i>
          <span>{{$t('loginWithBankId')}}</span>
        </vs-button>
      </vs-row>
      <vs-row align="center" class="row-or">
        <vs-col align="center">
          <span class="or-text">&#45;&#45;&#45;&#45; {{ $t('or') }} &#45;&#45;&#45;&#45;</span>
        </vs-col>
      </vs-row>
      <form class="login-form">
        <div class="row-email">
          <inext-input-email v-model="form.email" :isSubmitted="isSubmitted" :name="'email'" :label="'Email'" :placeholder="'Email'"></inext-input-email>
        </div>
        <div class="row-password">
          <inext-input-text v-model="form.password" :isSubmitted="isSubmitted" :inputType="'password'" :name="'password'" :label="'Password'" :placeholder="'Password'"></inext-input-text>
        </div>
        <div class="row-forgot-password">
          <label @click="redirectToEmailVerify">{{ $t('resendToken') }}?</label>
          <label @click="redirectToForgotPassword">{{ $t('forgotYourPwd') }}</label>
        </div>
        <div class="row-submit-btn">
          <vs-button type="filled" @click.prevent="submitLoginForm">{{ $t('login') }}</vs-button>
        </div>
      </form>
    </div>
    <div class="footer-section">
      <vs-row class="login-section">
        <vs-col>
          <strong>{{ $t('doYouHaveAccount') }} <span @click="redirectToSignup">{{ $t('createAnAccount') }}</span></strong>
        </vs-col>
      </vs-row>
      <vs-row class="login-section">
        <vs-col>
          <strong>{{ $t('youUseInext') }} {{country.label }} <span @click="activeModal=!activeModal">{{ $t('anotherCountry') }}</span></strong>
        </vs-col>
        <inext-language-select :countryList="countryList" :activePopup="activeModal" @popupEvent="popupEvent($event)" @selectedCountry="selectedCountry($event)"></inext-language-select>
      </vs-row>
    </div>
  </div>
</div>
</template>
<style lang="scss" src="./sign-in.scss"></style>
<script lang="js" src="./sign-in.js"></script>

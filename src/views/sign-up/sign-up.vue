<template>
  <div class="signup-page app-bg-color">
    <div class="signup-form-container">
      <div class="inext-logo"></div>
      <vs-row class="row-welcome-text" justify="center">
        <vs-col justify="center" w="12" align="center">{{$t('welcome')}}</vs-col>
      </vs-row>
      <vs-row class="row-bank-select">
        <vs-button>
            <i class="bank-icon"></i>
            <span>{{ $t('signupWithBankId') }}</span>
        </vs-button>
      </vs-row>
      <vs-row align="center" class="row-hr">
        <vs-col align="center">
          <span class="or-text">&#45;&#45;&#45;&#45; {{ $t('or') }} &#45;&#45;&#45;&#45;</span>
        </vs-col>
      </vs-row>
      <form class="signup-form">
        <div class="row-email">
          <inext-input-email v-model="form.email" :name="'email'" :label="'Email'" :placeholder="'Email'" :isSubmitted="isSubmitted"></inext-input-email>
        </div>
        <div class="row-password">
          <inext-input-text v-model="form.password" :inputType="'password'" :name="'password'" :label="'Password'" :placeholder="'Password'" :isSubmitted="isSubmitted"></inext-input-text>
        </div>
        <div class="row-taxation">
          <label>Taxation Country</label>
          <inext-select v-model="form.country" :selectOptions="countryList" :selectName="'country'" :isSubmitted="isSubmitted"></inext-select>
        </div>
        <div class="row-language">
          <label>Language</label>
          <inext-select v-model="form.language" :selectOptions="languageList" :selectName="'language'" :isSubmitted="isSubmitted"></inext-select>
        </div>
        <div class="row-company">
          <inext-radio v-if="companyList && companyList.length" :defaultValue="companyList[0].value" v-model="form.company" :radioList="companyList"></inext-radio>
        </div>
        <div class="row-privacy-policy">
          <inext-checkbox @isCheckBoxChecked="isPrivacyPolicyChecked($event)"></inext-checkbox>
          <span class="col-privacy-policy">we need your consent to be able to provide you with information based on your profile. Read more in our <strong>Privacy Policy</strong></span>
        </div>
        <div class="row-submit-btn">
          <vs-button type="filled" @click.prevent="submitSignupForm">{{ $t('signup') }}</vs-button>
        </div>
      </form>
      <div class="footer-section">
        <vs-row class="terms-and-conditions-section">
          <vs-col>As user of the iNext Freelancers service I hereby declares that I am over 18 years old and approve the
            <strong>Temporary Worker Agreement and General Terms and Conditions</strong>
          </vs-col>
        </vs-row>
        <vs-row class="login-section">
          <vs-col>
            <strong>{{ $t('doYouHaveAccount')}} <span @click="redirectToSignIn"> {{ $t('login') }}</span></strong>
          </vs-col>
        </vs-row>
      </div>
    </div>
  </div>
  </template>
<style lang="scss" src="./sign-up.scss"></style>
<script lang="js" src="./sign-up.js"></script>

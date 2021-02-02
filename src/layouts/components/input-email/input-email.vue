<template>
<div class="input-email-wrapper">
  <div class="input-text-wrapper">
    <vs-input size="large" v-validate="'required|email'" :placeholder="placeholder" :name="name" v-model="value" class="mt-5" @keyup="updateValue($event.target.value)" />
    <span class="text-danger text-sm" v-show="isSubmitted && errors.has(name)">{{ errors.first(name) }}</span>
  </div>
</div>
</template>
<style lang="scss" src="./input-email.scss"></style>
<script lang="js" src="./input-email.js"></script>

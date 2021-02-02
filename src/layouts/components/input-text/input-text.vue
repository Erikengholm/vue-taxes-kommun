<template>
<div class="input-text-wrapper">
  <vs-input size="large" :type="inputType" v-validate="'required'" :placeholder="placeholder" :name="name" v-model="value" class="mt-5"  @keyup="updateValue($event.target.value)" />
  <span class="text-danger text-sm" v-show="isSubmitted && errors.has(name)">{{ errors.first(name) }}</span>
</div>
</template>
<style lang="scss" src="./input-text.scss"></style>
<script lang="js" src="./input-text.js"></script>

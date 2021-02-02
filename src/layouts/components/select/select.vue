<template>
<div class="select-wrapper">
  <v-select v-model="value" :options="selectOptions" :dir="$vs.rtl ? 'rtl' : 'ltr'" v-validate="'required'" :name="selectName" @input="onSelectChange($event)"/>
  <span class="text-danger text-sm" v-show="isSubmitted && errors.has(selectName)">{{ errors.first(selectName) }}</span>
</div>
</template>
<style lang="scss" src="./select.scss"></style>
<script lang="js" src="./select.js"></script>

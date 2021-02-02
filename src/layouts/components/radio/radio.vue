<template>
<div class="radio-wrapper">
  <ul class="radio-list">
    <li v-for="option in radioList" :key="option.value" >
      <vs-radio v-model="value" :vs-value="option.value" @input="selectRadioValue($event)">{{ValueToLabel(option.value)}}</vs-radio>
    </li>
  </ul>
</div>
</template>
<style lang="scss" src="./radio.scss"></style>
<script lang="js" src="./radio.js"></script>

<template>
<div class="checkbox-wrapper">
  <vs-checkbox @change="checkboxChanged($event)"></vs-checkbox>
  <label v-text="labels" ></label>
</div>
</template>
<style lang="scss" src="./checkbox.scss"></style>
<script lang="js" src="./checkbox.js"></script>

<template>
<div id="app" :class="vueAppClasses">
  <router-view @setAppClasses="setAppClasses" />
</div>
</template>
<style lang="scss" src="./app.scss"></style>
<script lang="js" src="./app.js"></script>

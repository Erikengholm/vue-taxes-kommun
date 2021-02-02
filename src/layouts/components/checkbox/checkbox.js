export default {
  name: 'inext-checkbox',
  methods: {
    checkboxChanged (event) {
      console.log(event, 'eventt');
      this.$emit('isCheckBoxChecked', event.target.checked);
    }
  }
};

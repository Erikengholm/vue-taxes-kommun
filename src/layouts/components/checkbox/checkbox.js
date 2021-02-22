export default {
  name: 'inext-checkbox',
  props: {
    labels: String
  },
  methods: {
    checkboxChanged (event) {
      console.log(event, 'eventt');
      this.$emit('isCheckBoxChecked', event.target.checked);
    }
  }
};

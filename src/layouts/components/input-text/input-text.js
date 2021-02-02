export default {
  name: 'inext-input-text',
  inject: ['formValidator'],
  data () {
    return {
      xvalue: ''
    };
  },
  created () {
    this.$validator = this.formValidator;
  },
  props: {
    inputType: String,
    label: String,
    name: String,
    placeholder: String,
    isSubmitted: Boolean
  },
  computed: {
    value: {
      get () {
        return this.xvalue;
      },
      set (value) {
        return value;
      }
    }
  },
  methods: {
    updateValue (value) {
      this.xvalue = value;
      this.$emit('input', value);
    }
  }
};

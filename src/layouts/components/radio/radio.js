export default {
  name: 'inext-radio',
  inject: ['formValidator'],
  data () {
    return {
      xvalue: 1
    };
  },
  created () {
    this.$validator = this.formValidator;
  },
  props: {
    radioList: Array,
    defaultValue: String
  },
  mounted () {
    this.selectRadioValue(this.defaultValue);
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
    selectRadioValue (value) {
      this.xvalue = value;
      this.$emit('input', value);
    },
    ValueToLabel (value) {
      switch (value) {
      case 'en':
        return 'USA';
      case 'sw':
        return 'Sweden';
      }

    }
  }
};

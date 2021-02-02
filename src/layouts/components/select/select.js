import VSelect from 'vue-select';

export default {
  name: 'inext-select',
  components: {
    VSelect
  },
  inject: ['formValidator'],
  created () {
    this.$validator = this.formValidator;
  },
  data () {
    return {
      xvalue: ''
    };
  },
  props: {
    selectOptions: '',
    selectName: String,
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
    onSelectChange (value) {
      this.xvalue = value.label;
      this.$emit('input', value.value);
    }
  }
};

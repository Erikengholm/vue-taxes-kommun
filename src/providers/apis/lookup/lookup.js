import Api from '@/providers/http';
import {
  LOOKUP_SETTINGS
} from '@/constants/helper-constants';

export default {
  /**
   * @function getLookupSettings
   * This Method is used to get lookup settings
   */
  getLookupSettings () {
    console.log(LOOKUP_SETTINGS);
    return Api().get('lookup/settings').then((response) => {
      return this.normalizeLookupSettings(response.data.data);
    });
  },

  /**
   * @function normalizeLookupSettings
   * This method is used to normalize the lookup settings
   */
  normalizeLookupSettings (payload) {
    const lookupSettingsArray = [];
    payload.forEach((item) => {
      const lookupSettings = {
        key: item.key,
        value: this.normalizeLookupValues(item)
      };
      lookupSettingsArray.push(lookupSettings);
    });
    return lookupSettingsArray;
  },

  /**
   * @function normalizeLookupValues
   * This method is used to normalize the lookup values
   */
  normalizeLookupValues (payload) {
    const lookupValues = [];
    payload.value.forEach((item) => {
      switch (payload.key) {
      case LOOKUP_SETTINGS.TAXATION_COUNTRY: {
        lookupValues.push({
          label: item.countryName,
          value: item.id
        });
        break;
      }
      case LOOKUP_SETTINGS.USER_ORGANISATION_TYPE: {
        lookupValues.push({
          label: item.name,
          value: item.id
        });
        break;
      }
      case LOOKUP_SETTINGS.LANGUAGE: {
        lookupValues.push({
          label: item.countryName,
          value: item.id
        });
        break;
      }
      }
    });
    return lookupValues;
  }
};

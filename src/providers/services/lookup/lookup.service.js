import LookupProvider from '@/providers/apis/lookup/lookup';
import store from '@/store';
import {
  STORE_KEY
} from '@/constants/store-constants';

export default {
  /**
   * @function getLookupSettings
   * This Method is used to get lookup settings
   */
  getLookupSettings () {
    return new Promise((resolve) => {
      const lookupSettingsFromStore = store.state.layout.lookupSettings;
      if (!lookupSettingsFromStore.length) {
        return LookupProvider.getLookupSettings().then((response) => {
          store.dispatch(STORE_KEY.LOOKUP_SETTINGS, response);
          resolve(response);
        });
      } else {
        resolve(lookupSettingsFromStore);
      }
    });
  }
};

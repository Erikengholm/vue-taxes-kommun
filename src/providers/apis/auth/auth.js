import Api from '@/providers/http';

export default {

  /**
   * @function getUser
   * This Method is used to get the user details
   */
  getUser () {
    return Api().get('user/sign-in');
  },

  /**
   * @function userSignIn
   * This Method is used to signin
   */
  userSignIn (params) {
    return Api().post('user/sign-in', params).then((response) => {
      return response.data;
    });
  },

  /**
   * @function userSignout
   * This Method is used to signout
   */
  userSignout () {
    return Api().post('user/sign-out');
  },

  /**
   * @function userSignUp
   * This Method is used to signup
   */
  userSignUp (params) {
    return Api().post('user/sign-up', params);
  },

  /**
   * @function tokenVerify
   * This Method is used to verify token
   */
  tokenVerify (params) {
    return Api().post('user/verify', params);
  },

  /**
   * @function emailVerifyResend
   * This Method is used to email verify resend
   */
  emailVerifyResend (params) {
    return Api().post('user/resend-code', params);
  }
};

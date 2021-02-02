import AuthService from '@/providers/apis/auth/auth';
import SessionService from '@/providers/services/session/session';
import router from '@/router';

export default {
  /**
   * @function userSignIn
   * This Method is used to signin
   */
  userSignIn (params) {
    return AuthService.userSignIn(params).then((res) => {
      const session = res.data;
      if (session) {
        SessionService.setSession(session);
        router.push('/dashboard');
      }
    });
  },

  /**
   * @function userSignUp
   * This Method is used to signup
   */
  userSignUp (params) {
    return AuthService.userSignUp(params);
  },

  /**
   * @function userSignout
   * This Method is used to signout
   */
  userSignout () {
    return AuthService.userSignout();
  },

  /**
   * @function tokenVerify
   * This Method is used to verify token
   */
  tokenVerify (params) {
    return AuthService.tokenVerify(params).then((res) => {
      const session = res.data;
      if (session) {
        SessionService.setSession(session);
        router.push('/dashboard');
      }
    });
  },

  /**
   * @function emailVerifyResend
   * This Method is used to email verify resend
   */
  emailVerifyResend (params) {
    return AuthService.emailVerifyResend(params);
  }
};

<template>
<div class="the-navbar__user-meta flex items-center" v-if="activeUserInfo.email">

  <div class="text-right leading-tight hidden sm:block">
    <p class="font-semibold">{{ activeUserInfo.email }}</p>
  </div>

  <vs-dropdown vs-custom-content vs-trigger-click class="cursor-pointer">

    <div class="con-img ml-3">
      <img key="onlineImg" src="@/assets/images/profile/profile.png" alt="user-img" width="40" height="40" class="rounded-full shadow-md cursor-pointer block" />
    </div>

    <vs-dropdown-menu class="vx-navbar-dropdown">
      <ul style="min-width: 9rem">

        <li class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white">
          <feather-icon icon="UserIcon" svgClasses="w-4 h-4" />
          <span class="ml-2">Profile</span>
        </li>
        <vs-divider class="m-1" />
        <li class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white" @click="logout">
          <feather-icon icon="LogOutIcon" svgClasses="w-4 h-4" />
          <span class="ml-2">Logout</span>
        </li>
      </ul>
    </vs-dropdown-menu>
  </vs-dropdown>
</div>
</template>

<script>

export default {
  computed: {
    activeUserInfo () {
      const sessionData = localStorage.getItem('inext_user_session');
      const parseSessionData = JSON.parse(sessionData);
      return parseSessionData.idToken.payload;
    }
  },
  methods: {
    logout () {
      // AuthService.userSignout().then(() => {
      localStorage.removeItem('inext_user_session');
      this.$router.push('/sign-in');
      // });
    }
  }
};
</script>

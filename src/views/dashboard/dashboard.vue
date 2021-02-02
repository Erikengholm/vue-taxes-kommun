<template>
<div class="layout--main" :class="[layoutTypeClass, navbarClasses, footerClasses, {'no-scroll': isAppPage}]">
  <v-nav-menu :navMenuItems="navMenuItems" title="Vuexy" parent=".layout--main" />
  <div id="content-area" :class="[contentAreaClass, {'show-overlay': bodyOverlay}]">
    <div id="content-overlay" />
    <!-- Navbar -->
    <template>
      <the-navbar-vertical :navbarColor="navbarColor" :class="[
          {'text-white' : isNavbarDark  && !isThemeDark},
          {'text-base'  : !isNavbarDark && isThemeDark}
        ]" />
    </template>
    <!-- /Navbar -->
    <div class="content-wrapper">
      <div class="router-view">
        <div class="router-content">
          <transition :name="routerTransition">
            <div v-if="$route.meta.breadcrumb || $route.meta.pageTitle" class="router-header flex flex-wrap items-center mb-6">
              <div class="content-area__heading" :class="{'pr-4 border-0 md:border-r border-solid border-grey-light' : $route.meta.breadcrumb}">
                <h2 class="mb-1">{{ routeTitle }}</h2>
              </div>
              <!-- BREADCRUMB -->
              <vx-breadcrumb class="ml-4 md:block hidden" v-if="$route.meta.breadcrumb" :route="$route" :isRTL="$vs.rtl" />
              <!-- DROPDOWN -->
              <vs-dropdown vs-trigger-click class="ml-auto md:block hidden cursor-pointer">
                <vs-button radius icon="icon-settings" icon-pack="feather" />
                <vs-dropdown-menu class="w-32">
                  <vs-dropdown-item>
                    <div @click="$router.push('/pages/profile').catch(() => {})" class="flex items-center">
                      <feather-icon icon="UserIcon" class="inline-block mr-2" svgClasses="w-4 h-4" />
                      <span>Profile</span>
                    </div>
                  </vs-dropdown-item>
                  <vs-dropdown-item>
                    <div @click="$router.push('/apps/todo').catch(() => {})" class="flex items-center">
                      <feather-icon icon="CheckSquareIcon" class="inline-block mr-2" svgClasses="w-4 h-4" />
                      <span>Tasks</span>
                    </div>
                  </vs-dropdown-item>
                  <vs-dropdown-item>
                    <div @click="$router.push('/apps/email').catch(() => {})" class="flex items-center">
                      <feather-icon icon="MailIcon" class="inline-block mr-2" svgClasses="w-4 h-4" />
                      <span>Inbox</span>
                    </div>
                  </vs-dropdown-item>
                </vs-dropdown-menu>
              </vs-dropdown>
            </div>
          </transition>

          <div class="content-area__content">
            <back-to-top bottom="5%" :right="$vs.rtl ? 'calc(100% - 2.2rem - 38px)' : '30px'" visibleoffset="500" v-if="!hideScrollToTop">
              <vs-button icon-pack="feather" icon="icon-arrow-up" class="shadow-lg btn-back-to-top" />
            </back-to-top>
            <transition :name="routerTransition" mode="out-in">
              <router-view @changeRouteTitle="changeRouteTitle" @setAppClasses="(classesStr) => $emit('setAppClasses', classesStr)" />
            </transition>
          </div>
        </div>
      </div>
    </div>
    <the-footer />
  </div>
</div>
</template>
<style lang="scss" src="./dashboard.scss"></style>
<script lang="js" src="./dashboard.js"></script>

export default defineNuxtRouteMiddleware((to, from) => {
    if (useCookie("has_access").value) {
        return;
    }
    else if (from.fullPath === to.fullPath) {
        return navigateTo("/");
    }
    else return abortNavigation();
  })
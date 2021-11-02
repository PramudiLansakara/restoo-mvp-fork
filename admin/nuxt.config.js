import colors from "vuetify/es5/util/colors";
import i18n from "./config/i18n";

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  target: 'static',
  ssr:false,

  head: {
    titleTemplate: "%s - Mezomia",
    title: "Damas Lounge Admin",
    htmlAttrs: {
      lang: "en"
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },

  router: {
    base: '/admin/'
  },

  // ssr:false,

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ["~/plugins/axios", "~/plugins/filters", {
    src: '~/plugins/socket-io.js',
    ssr: false,                    // <-- this line is required
  },],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    "@nuxtjs/vuetify"
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ["@nuxtjs/axios", "vuetify-dialog/nuxt", "@nuxtjs/i18n"],

  i18n: {
    defaultLocale: "de",
    vueI18n: i18n
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    treeShake: true,
    customVariables: ["~/assets/variables.scss"],
    defaultAssets: {
      font: {
        family: "Lato"
      }
    },
    theme: {
      options: { customProperties: true },
      themes: {
        light: {
          primary: {
            base: "#293041",
            darken1: "#2C406E",
            lighten1: "#2F4CDD"
          },
          secondary: "#7D8FAB",
          danger: "#FF6D4D",
          warning: "#FFA902"
          // success: "#84CA93"
        }
      }
    }
  },

  /*
   ** Module Configs
   */
  axios: {
    baseURL: process.env.API_BASE_URL || "http://localhost:3001/api/"
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  publicRuntimeConfig: {
    socketHost: process.env.SOCKET_HOST || 'http://localhost:3001'
  },
};

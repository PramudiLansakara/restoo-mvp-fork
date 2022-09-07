// const cookieparser = process.server ? require("cookieparser") : undefined;

// export const state = () => ({});

// export const getters = {};

// export const mutations = {};

// export const actions = {
//   async nuxtServerInit({ commit }, { req }) {

//     let authToken = null;

//     if (req.headers.cookie) {
//       console.log(req.headers.cookie);
//       const parsed = cookieparser.parse(req.headers.cookie);
//       try {
//         ({ authToken } = parsed);
//       } catch (err) {
//         // No valid cookie found
//         console.error("no cookie");
//         // throw error;
//       }

//       if (authToken && authToken !== null && authToken !== false) {
//         try {
//           commit("auth/SET_AUTH_TOKEN", authToken);
//           commit("auth/SET_HEADERS", authToken);
//         } catch (error) {
//           commit("auth/SET_USER", null);
//           commit("auth/SET_AUTH_TOKEN", null);
//           console.error(error);
//         }
//       }
//     }
//   }
// };

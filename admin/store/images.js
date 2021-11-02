export const state = () => ({});

export const getters = {};

export const mutations = {};

export const actions = {
    async uploadImage(_, image) {
        try {
            console.log(image);
            let config = {
                headers: {
                    'Content-Type': undefined,
                }
            }
            const response = await this.$axios.$post("images/upload", image, config);
            return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
};

export const state = () => ({
  isSliderOpen: false,
  city: ""
});

export const mutations = {
  toggleSlider(state) {
    state.isSliderOpen = !state.isSliderOpen;
  },
  cityChange(state, payload) {
    state.city = payload;
  }
};

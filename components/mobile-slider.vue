<template>
  <nav class="flex flex-col px-1 absolute top-0 h-screen w-full" style="background: #F5F5F5;">
    <div class="relative  mt-2 text-gray-500">
      <input v-model="q" class="w-full h-12 rounded-lg px-16 focus:outline-none" style="box-shadow: 0 1px 2px rgba(0,0,0,0.2);" type="text" placeholder="Find a place" />

      <div v-if="q">
        <div @click="q = ''" class="absolute h-8 w-8 flex justify-center items-center" style="top: 50%; transform: translateY(-50%); right: 1rem;">
          <!-- prettier-ignore -->
          <svg class="fill-current w-4" x="0px" y="0px" viewBox="0 0 409.806 409.806"><g><g><path d="M228.929,205.01L404.596,29.343c6.78-6.548,6.968-17.352,0.42-24.132c-6.548-6.78-17.352-6.968-24.132-0.42 c-0.142,0.137-0.282,0.277-0.42,0.42L204.796,180.878L29.129,5.21c-6.78-6.548-17.584-6.36-24.132,0.42 c-6.388,6.614-6.388,17.099,0,23.713L180.664,205.01L4.997,380.677c-6.663,6.664-6.663,17.468,0,24.132 c6.664,6.662,17.468,6.662,24.132,0l175.667-175.667l175.667,175.667c6.78,6.548,17.584,6.36,24.132-0.42 c6.387-6.614,6.387-17.099,0-23.712L228.929,205.01z"/></g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>
        </div>
      </div>
      <div v-else>
        <div class="absolute h-8 w-8 flex justify-center items-center" style="top: 50%; transform: translateY(-50%); right: 1rem;">
          <!-- prettier-ignore -->
          <svg class="fill-current w-5" x="0px" y="0px" viewBox="0 0 192.904 192.904"><path d="M190.707,180.101l-47.078-47.077c11.702-14.072,18.752-32.142,18.752-51.831C162.381,36.423,125.959,0,81.191,0 C36.422,0,0,36.423,0,81.193c0,44.767,36.422,81.187,81.191,81.187c19.688,0,37.759-7.049,51.831-18.751l47.079,47.078 c1.464,1.465,3.384,2.197,5.303,2.197c1.919,0,3.839-0.732,5.304-2.197C193.637,187.778,193.637,183.03,190.707,180.101z M15,81.193 C15,44.694,44.693,15,81.191,15c36.497,0,66.189,29.694,66.189,66.193c0,36.496-29.692,66.187-66.189,66.187 C44.693,147.38,15,117.689,15,81.193z"/><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>
        </div>
      </div>
      <div @click="$store.commit('toggleSlider')" class="absolute h-8 w-8 flex justify-center items-center" style="top: 50%; transform: translateY(-50%); left: 1rem;">
        <!-- prettier-ignore -->
        <svg class="fill-current w-5" x="0px" y="0px" viewBox="0 0 341.333 341.333"><g><g><polygon points="341.333,149.333 81.707,149.333 200.853,30.187 170.667,0 0,170.667 170.667,341.333 200.853,311.147 81.707,192 341.333,192"/></g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>
      </div>
    </div>

    <div class="rounded-lg" style="box-shadow: 0 1px 2px rgba(0,0,0,0.2);">
      <div v-for="matchingCity in matchingCities" @click="cityChange(matchingCity.name)" :key="matchingCity.lat" class="flex items-center w-full bg-white px-5 py-4">
        <!-- prettier-ignore -->
        <svg class="fill-current text-gray-500 w-5 mr-4" x="0px" y="0px" viewBox="0 0 425.963 425.963"><g><path d="M213.285,0h-0.608C139.114,0,79.268,59.826,79.268,133.361c0,48.202,21.952,111.817,65.246,189.081 c32.098,57.281,64.646,101.152,64.972,101.588c0.906,1.217,2.334,1.934,3.847,1.934c0.043,0,0.087,0,0.13-0.002 c1.561-0.043,3.002-0.842,3.868-2.143c0.321-0.486,32.637-49.287,64.517-108.976c43.03-80.563,64.848-141.624,64.848-181.482 C346.693,59.825,286.846,0,213.285,0z M274.865,136.62c0,34.124-27.761,61.884-61.885,61.884 c-34.123,0-61.884-27.761-61.884-61.884s27.761-61.884,61.884-61.884C247.104,74.736,274.865,102.497,274.865,136.62z"/></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>
        <p class="text-sm text-gray-700">{{ matchingCity.name }}</p>
      </div>
    </div>
  </nav>
</template>

<script>
import cities from "@/content/cities.json";

export default {
  data() {
    return {
      cities,
      q: ""
    };
  },
  computed: {
    matchingCities() {
      if (this.q) return this.cities.filter(x => x.name.toLowerCase().includes(this.q.toLowerCase())).slice(0, 10);
      else return null;
    }
  },
  methods: {
    cityChange(city) {
      this.$store.commit("cityChange", city);
      this.$store.commit("toggleSlider");
    }
  }
};
</script>

<style></style>

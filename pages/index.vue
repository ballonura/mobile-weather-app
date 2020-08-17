<template>
  <div class="bg-black poppins overflow-x-hidden">
    <div class="flex flex-col max-h-screen h-screen">
      <header class="container flex items-center justify-between px-8" style="flex-basis: 100px;">
        <div class="flex flex-col text-gray-opacity">
          <p class="mb-1">Today</p>
          <p>Mon, 10 Aug</p>
        </div>
        <div @click="$store.commit('toggleSlider')" class="flex text-gray-opacity items-center">
          <!-- prettier-ignore -->
          <svg class="fill-current w-4 mr-4" viewBox="0 0 14 20"><path fill-rule="evenodd" clip-rule="evenodd" d="M7 0C3.13 0 0 3.13 0 7C0 11.2076 4.49633 17.0211 6.28176 19.1637C6.66099 19.6188 7.339 19.6188 7.71824 19.1637C9.50367 17.0211 14 11.2076 14 7C14 3.13 10.87 0 7 0ZM4.5 7C4.5 5.61929 5.61929 4.5 7 4.5C7.89316 4.5 8.71848 4.9765 9.16506 5.75C9.61165 6.5235 9.61165 7.4765 9.16506 8.25C8.71848 9.0235 7.89316 9.5 7 9.5C5.61929 9.5 4.5 8.38071 4.5 7Z" fill="white" fill-opacity="0.8"/></svg>
          <p>{{ city }}</p>
        </div>
      </header>
      <section class="relative background-day" style="flex-basis: 350px;">
        <div class="container">
          <div class="px-8 flex flex-col font-medium">
            <p class="text-white" style="font-size: 96px;">{{ currentTemp }}</p>
            <p class="text-gray-opacity text-2xl capitalize" style="max-width: 7rem;">{{ currentDescription }}</p>
          </div>
        </div>
        <img class="absolute bottom-0" style="left: 12rem;" src="@/assets/images/day-background.png" />
      </section>
      <section class="container flex-1 flex flex-col px-8">
        <div class="flex items-center justify-center text-gray-opacity mt-8">
          <div v-for="n in 3" :key="n" @click="activeHour = n" class="w-1/3 flex flex-col items-center justify-center" :class="{ 'opacity-50': activeHour !== n }">
            <!-- prettier-ignore -->
            <svg class="w-10 fill-current" viewBox="0 0 36 34"><circle cx="15" cy="15" r="15" fill="#F53443"/><path d="M24 14C21.1112 14 18.5923 15.64 17.3428 18.04C14.344 18.36 12.005 20.91 12.005 24C12.005 27.31 14.6939 30 18.0025 30H30.9971C33.7559 30 35.995 27.76 35.995 25C35.995 22.36 33.9459 20.22 31.3569 20.04C30.6672 16.59 27.6385 14 24 14Z" fill="white"/></svg>
            <p class="text-xs text-gray-opacity">1{{ n - 1 }}am</p>
            <p class="font-semibold text-2xl">28°C</p>
          </div>
        </div>
        <div class="container relative flex flex-wrap background-panel h-full mt-10 py-10" style="border-radius: 30px;">
          <div v-for="n in 4" :key="n" class="w-1/2 flex flex-col items-center justify-center font-medium">
            <p class="text-5xl text-white">6<span class="text-base">km/h</span></p>
            <p class="text-gray-opacity-darker text-base">Wind</p>
          </div>
          <div class=" absolute arrow-up"></div>
        </div>
      </section>
    </div>

    <transition name="fade">
      <mobile-slider v-if="isSliderOpen"></mobile-slider>
    </transition>
  </div>
</template>

<script>
import mobileSlider from "@/components/mobile-slider";

export default {
  components: {
    mobileSlider
  },
  data() {
    return {
      activeHour: 2,
      currentTemp: "N/A",
      currentDescription: "N/A",
      openWeatherApiKey: "fd04924913e021e33cef6bd395238678",
      openWeatherEndpoint: "https://api.openweathermap.org/data/2.5/weather?q="
    };
  },
  methods: {
    async getCityWeather(city) {
      try {
        const {
          data: {
            main: { temp },
            weather
          }
        } = await this.$axios.get(`${this.openWeatherEndpoint}${this.$store.state.city}&units=metric&appid=${this.openWeatherApiKey}`);

        this.currentDescription = weather[0].description;
        this.currentTemp = temp + "°";
      } catch (error) {
        this.currentTemp = "N/A";
      }
    }
  },
  computed: {
    isSliderOpen() {
      return this.$store.state.isSliderOpen;
    },
    city() {
      return this.$store.state.city || "Choose City";
    }
  },
  watch: {
    "$store.state.city": async function() {
      await this.getCityWeather(this.$store.state.city);
    }
  }
};
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  max-height: 100%;
  transition: max-height 0.25s;
}

.fade-enter,
.fade-leave-to {
  max-height: 0;
}

.arrow-up {
  width: 0;
  height: 0;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
  border-bottom: 20px solid #191919;

  top: -20px;
  left: 50%;
  transform: translateX(-50%);
}

.text-gray-opacity {
  color: rgba(255, 255, 255, 0.8);
}

.text-gray-opacity-darker {
  color: rgba(255, 255, 255, 0.54);
}

.poppins {
  font-family: "Poppins";
}

.background {
  &-day {
    background: linear-gradient(180deg, rgba(245, 52, 66, 0) 0%, rgba(245, 52, 66, 0.25) 100%);
  }

  &-night {
    background: linear-gradient(180deg, rgba(100, 77, 150, 0) 0%, rgba(84, 51, 156, 0.25) 100%);
  }

  &-panel {
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 100%);
  }
}
</style>

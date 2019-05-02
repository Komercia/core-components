<template>
  <div class="content2">
    <template v-for="brand in setting.data.brands">
      <router-link
        v-if="brand.redirect_to.type == 1"
        :class="setting.data.effect"
        :to="`/productos/${brand.redirect_to.value}`"
      >
        <image-cloudinary
          :src="brand.source"
          :title="brand.title"
          :alt="brand.title"
          :width="setting.data.width"
          :style="`margin: 0 ${setting.data.spaces}px`"
          :class="setting.data.effect"
        />
        <button class="text g-btn">{{ brand.title || 'Sin titulo' }}</button>
      </router-link>
      <router-link
        v-else-if="brand.redirect_to.type == 2"
        :class="setting.data.effect"
        :to="`/productos?category=${brand.redirect_to.value}`"
      >
        <image-cloudinary
          :src="brand.source"
          :title="brand.title"
          :alt="brand.title"
          :width="setting.data.width"
          :style="`margin: 0 ${setting.data.spaces}px`"
          :class="setting.data.effect"
        />
        <button class="text g-btn">{{ brand.title || 'Sin titulo' }}</button>
      </router-link>
      <router-link
        v-else-if="brand.redirect_to.type == 3"
        :class="setting.data.effect"
        :to="`/productos?search=${brand.redirect_to.value}`"
      >
        <image-cloudinary
          :src="brand.source"
          :title="brand.title"
          :alt="brand.title"
          :width="setting.data.width"
          :style="`margin: 0 ${setting.data.spaces}px`"
          :class="setting.data.effect"
        />
        <button class="text g-btn">{{ brand.title || 'Sin titulo' }}</button>
      </router-link>
      <router-link
        v-else-if="brand.redirect_to.type == 4"
        :class="setting.data.effect"
        :to="brand.redirect_to.value"
      >
        <image-cloudinary
          :src="brand.source"
          :title="brand.title"
          :alt="brand.title"
          :width="setting.data.width"
          :style="`margin: 0 ${setting.data.spaces}px`"
          :class="setting.data.effect"
        />
        <button class="text g-btn">{{ brand.title || 'Sin titulo' }}</button>
      </router-link>
      <a
        v-else-if="brand.redirect_to.type == 5"
        :class="setting.data.effect"
        :href="brand.redirect_to.value"
        target="_blank"
      >
        <image-cloudinary
          :src="brand.source"
          :title="brand.title"
          :alt="brand.title"
          :width="setting.data.width"
          :style="`margin: 0 ${setting.data.spaces}px`"
          :class="setting.data.effect"
        />
        <button class="text g-btn">{{ brand.title || 'Sin titulo' }}</button>
      </a>
      <a v-else href="#" :class="setting.data.effect">
        <image-cloudinary
          :src="brand.source"
          :title="brand.title"
          :alt="brand.title"
          :width="setting.data.width"
          :style="`margin: 0 ${setting.data.spaces}px`"
          :class="setting.data.effect"
        />
        <button class="text g-btn">{{ brand.title || 'Sin titulo' }}</button>
      </a>
    </template>
  </div>
</template>

<script>
export default {
  name: "koContent2",
  props: {
    setting: {
      type: Object,
      default: function() {
        return {
          data: [
            {
              title: "Airbnb",
              source:
                "http://cdn.ycombinator.com/images/startups/airbnb-9bd66443.png",
              redirect_to: {
                type: "",
                value: "https://www.airbnb.com"
              }
            },
            {
              title: "Twitch",
              source:
                "http://cdn.ycombinator.com/images/startups/twitch-55c54fd1.png",
              redirect_to: {
                type: "",
                value: "https://www.twitch.tv/"
              }
            },
            {
              title: "Docker",
              source:
                "http://cdn.ycombinator.com/images/startups/docker-26f971a2.png",
              redirect_to: {
                type: "",
                value: "https://www.docker.com/"
              }
            },
            {
              title: "Front",
              source:
                "http://cdn.ycombinator.com/images/startups/front-6e279fe5.png",
              redirect_to: {
                type: "",
                value: "https://frontapp.com/"
              }
            },
            {
              title: "Reddit",
              source:
                "http://cdn.ycombinator.com/images/startups/reddit-fffebd4f.png",
              redirect_to: {
                type: "",
                value: "https://www.reddit.com/"
              }
            },
            {
              title: "Machinezone",
              source:
                "http://cdn.ycombinator.com/images/startups/machinezone-12a782de.png",
              redirect_to: {
                type: "",
                value: "https://www.mz.com/"
              }
            },
            {
              title: "Heroku",
              source:
                "http://cdn.ycombinator.com/images/startups/heroku-e5df5af0.png",
              redirect_to: {
                type: "",
                value: ""
              }
            }
          ]
        };
      }
    }
  }
};
</script>

<style scoped>
.content2 {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  max-width: 1366px;
  width: 100%;
  justify-content: center;
  margin: 0 auto 60px;
}
.content2 a {
  cursor: pointer;
}
.content2 img {
  overflow: hidden;
}
.content2 .text {
  display: none;
}
/* ESCALA DE GRISES */
img.effect_grayscale {
  filter: grayscale(1);
  opacity: 0.5;
  transition: 0.2s;
}
img.effect_grayscale:hover {
  filter: grayscale(0);
  opacity: 1;
}
/* BLUR */
img.effect_blur {
  position: relative;
  transition: 0.3s;
}
a.effect_blur {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  padding: 20px 0;
}
a.effect_blur .text {
  content: attr(data-title);
  position: absolute;
  top: -50%;
  display: block;
  transition: 0.3s;
}
a.effect_blur:hover .text {
  top: calc(50% - 17px);
}
a.effect_blur:hover img.effect_blur {
  filter: blur(15px);
}
/* TAMAÑO */
img.effect_size {
  transition: 0.3s;
}
img.effect_size:hover {
  transform: scale(0.8);
}
/* ONLY TEXT */
a.effect_text {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;
}
a.effect_text .text {
  content: attr(data-title);
  position: absolute;
  top: 110%;
  display: block;
  opacity: 0;
  transition: 0.3s;
}
a.effect_text:hover .text {
  top: 100%;
  opacity: 1;
}
</style>

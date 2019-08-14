<template>
  <figure
    class="zoom"
    :style="setBackground(photo)"
    v-on:mousemove="zoom"
  >
    <image-cloudinary
      :src="photo"
      class="photo_main"
      :width="900"
    />
  </figure>
</template>

<script>
export default {
  props: ["photo"],
  methods: {
    zoom(e) {
      const zoomer = e.currentTarget;
      let offsetX, offsetY;
      if (e.offsetY) {
        e.offsetY ? (offsetY = e.offsetY) : (offsetX = e.touches[0].pageY);
      }
      if (e.offsetX) {
        e.offsetX ? (offsetX = e.offsetX) : (offsetX = e.touches[0].pageX);
      }
      const x = (offsetX / zoomer.offsetWidth) * 100;
      const y = (offsetY / zoomer.offsetHeight) * 100;
      zoomer.style.backgroundPosition = `${x}% ${y}%`;
    },
	// 	ImageCloudinary(src, { width, height }) {
	// 		if (src.includes("https://res.cloudinary.com/komercia-store/image/upload")) {
	// 			let urlFirst = "https://res.cloudinary.com/komercia-store/image/upload/";
	// 			let urlLast = src.replace(
	// 				"https://res.cloudinary.com/komercia-store/image/upload",
	// 				""
	// 			);
	// 			let w = "";
	// 			let h = "";
	// 			if (width) {
	// 				w = `,w_${width}`;
	// 			}
	// 			if (height) {
	// 				h = `,h_${height}`;
	// 			}
	// 			return `${urlFirst}q_auto,c_scale,f_auto${w}${h}${urlLast}`;
	// 		} else if (src.includes("https://res.cloudinary.com/komercia/image/upload")) {
	// 			let urlFirst = "https://res.cloudinary.com/komercia/image/upload/";
	// 			let urlLast = src.replace(
	// 				"https://res.cloudinary.com/komercia/image/upload",
	// 				""
	// 			);
	// 			let w = "";
	// 			let h = "";
	// 			if (width) {
	// 				w = `,w_${width}`;
	// 			}
	// 			if (height) {
	// 				h = `,h_${height}`;
	// 			}
	// 			return `${urlFirst}q_auto,c_scale,f_auto${w}${h}${urlLast}`;
	// 		} else {
	// 			return src;
	// 		}
	// },
    setBackground(p) {
      return `background-image: url('${this.ImageCloudinary(p, {
        width: 900
      })}')`;
    }
  }
};
</script>

<style scoped>
figure.zoom {
  max-width: 100%;
  max-height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-position: 50% 50%;
  background-repeat: no-repeat;
  position: relative;
  overflow: hidden;
  cursor: zoom-in;
  margin-bottom: 10px;
}
figure.zoom img {
  max-width: 100%;
  max-height: 576px;
  background-color: #fff;
  transition: opacity 0.3s;
}
.photo_main {
  object-fit: contain;
}
figure.zoom img:hover {
  opacity: 0;
}
</style>

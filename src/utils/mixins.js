export const imagenMixin = {
  methods: {
		ImageCloudinary(src, { width, height }) {
			if (src.includes("https://res.cloudinary.com/komercia-store/image/upload")) {
				let urlFirst = "https://res.cloudinary.com/komercia-store/image/upload/";
				let urlLast = src.replace(
					"https://res.cloudinary.com/komercia-store/image/upload",
					""
				);
				let w = "";
				let h = "";
				if (width) {
					w = `,w_${width}`;
				}
				if (height) {
					h = `,h_${height}`;
				}
				return `${urlFirst}q_auto,c_scale,f_auto${w}${h}${urlLast}`;
			} else if (src.includes("https://res.cloudinary.com/komercia/image/upload")) {
				let urlFirst = "https://res.cloudinary.com/komercia/image/upload/";
				let urlLast = src.replace(
					"https://res.cloudinary.com/komercia/image/upload",
					""
				);
				let w = "";
				let h = "";
				if (width) {
					w = `,w_${width}`;
				}
				if (height) {
					h = `,h_${height}`;
				}
				return `${urlFirst}q_auto,c_scale,f_auto${w}${h}${urlLast}`;
			} else {
				return src;
			}
		}
	}
}
export default {
  imagenMixin
}
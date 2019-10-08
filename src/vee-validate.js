import { extend, localize } from "vee-validate";
import { min, required, email, numeric } from "vee-validate/dist/rules";
import es from "vee-validate/dist/locale/es.json";

extend("required", required);
extend("min", min);
extend("email", email);
extend("num", numeric);


localize("es", es);
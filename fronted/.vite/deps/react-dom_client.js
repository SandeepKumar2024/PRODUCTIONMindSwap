import {
  require_react_dom
<<<<<<< HEAD:Client/node_modules/.vite/deps/react-dom_client.js
} from "./chunk-HJT4S7B2.js";
import "./chunk-T5VS5SRF.js";
import "./chunk-4FXYAZTG.js";
import {
  __commonJS
} from "./chunk-PQS2SGCL.js";
=======
} from "./chunk-ZCA6YR3N.js";
import "./chunk-63TMRDQ4.js";
import {
  __commonJS
} from "./chunk-USJHI7ER.js";
>>>>>>> 7cbda6d7887daeb62b63ddf27f62fc757edc4dff:Client/.vite/deps/react-dom_client.js

// node_modules/react-dom/client.js
var require_client = __commonJS({
  "node_modules/react-dom/client.js"(exports) {
    var m = require_react_dom();
    if (false) {
      exports.createRoot = m.createRoot;
      exports.hydrateRoot = m.hydrateRoot;
    } else {
      i = m.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
      exports.createRoot = function(c, o) {
        i.usingClientEntryPoint = true;
        try {
          return m.createRoot(c, o);
        } finally {
          i.usingClientEntryPoint = false;
        }
      };
      exports.hydrateRoot = function(c, h, o) {
        i.usingClientEntryPoint = true;
        try {
          return m.hydrateRoot(c, h, o);
        } finally {
          i.usingClientEntryPoint = false;
        }
      };
    }
    var i;
  }
});
export default require_client();
//# sourceMappingURL=react-dom_client.js.map

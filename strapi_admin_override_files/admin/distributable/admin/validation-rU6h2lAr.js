'use strict';

const yup = require('yup');
const index = require('./index-UB9JNjeZ.js');

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  const n = Object.create(null, { [Symbol.toStringTag]: { value: 'Module' } });
  if (e) {
    for (const k in e) {
      if (k !== 'default') {
        const d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: () => e[k]
        });
      }
    }
  }
  n.default = e;
  return Object.freeze(n);
}

const yup__namespace = /*#__PURE__*/_interopNamespace(yup);

const COMMON_USER_SCHEMA = {
  firstname: yup__namespace.string().trim().required({
    id: index.errorsTrads.required.id,
    defaultMessage: "This field is required"
  }),
  lastname: yup__namespace.string(),
  email: yup__namespace.string().email(index.errorsTrads.email).lowercase().required({
    id: index.errorsTrads.required.id,
    defaultMessage: "This field is required"
  }),
  username: yup__namespace.string().transform((value) => value === "" ? void 0 : value).nullable(),
  password: yup__namespace.string().transform((value) => value === "" || value === null ? void 0 : value).nullable().min(8, {
    ...index.errorsTrads.minLength,
    values: { min: 8 }
  }).matches(/[a-z]/, {
    id: "components.Input.error.contain.lowercase",
    defaultMessage: "Password must contain at least one lowercase character"
  }).matches(/[A-Z]/, {
    id: "components.Input.error.contain.uppercase",
    defaultMessage: "Password must contain at least one uppercase character"
  }).matches(/\d/, {
    id: "components.Input.error.contain.number",
    defaultMessage: "Password must contain at least one number"
  }),
  confirmPassword: yup__namespace.string().transform((value) => value === "" ? null : value).nullable().min(8, {
    ...index.errorsTrads.minLength,
    values: { min: 8 }
  }).oneOf([yup__namespace.ref("password"), null], {
    id: "components.Input.error.password.noMatch",
    defaultMessage: "Passwords must match"
  }).when("password", (password, passSchema) => {
    return password ? passSchema.required({
      id: index.errorsTrads.required.id,
      defaultMessage: "This field is required"
    }).nullable() : passSchema;
  })
};

exports.COMMON_USER_SCHEMA = COMMON_USER_SCHEMA;
//# sourceMappingURL=validation-rU6h2lAr.js.map

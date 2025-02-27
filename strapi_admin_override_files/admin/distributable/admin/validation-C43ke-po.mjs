import * as yup from 'yup';
import { e as errorsTrads } from './index-CyEyTBzg.mjs';

const COMMON_USER_SCHEMA = {
  firstname: yup.string().trim().required({
    id: errorsTrads.required.id,
    defaultMessage: "This field is required"
  }),
  lastname: yup.string(),
  email: yup.string().email(errorsTrads.email).lowercase().required({
    id: errorsTrads.required.id,
    defaultMessage: "This field is required"
  }),
  username: yup.string().transform((value) => value === "" ? void 0 : value).nullable(),
  password: yup.string().transform((value) => value === "" || value === null ? void 0 : value).nullable().min(8, {
    ...errorsTrads.minLength,
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
  confirmPassword: yup.string().transform((value) => value === "" ? null : value).nullable().min(8, {
    ...errorsTrads.minLength,
    values: { min: 8 }
  }).oneOf([yup.ref("password"), null], {
    id: "components.Input.error.password.noMatch",
    defaultMessage: "Passwords must match"
  }).when("password", (password, passSchema) => {
    return password ? passSchema.required({
      id: errorsTrads.required.id,
      defaultMessage: "This field is required"
    }).nullable() : passSchema;
  })
};

export { COMMON_USER_SCHEMA as C };
//# sourceMappingURL=validation-C43ke-po.mjs.map

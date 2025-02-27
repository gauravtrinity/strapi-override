'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const jsxRuntime = require('react/jsx-runtime');
const React = require('react');
const designSystem = require('@strapi/design-system');
const icons = require('@strapi/icons');
const pick = require('lodash/pick');
const reactIntl = require('react-intl');
const reactRouterDom = require('react-router-dom');
const yup = require('yup');
const index = require('./index-UB9JNjeZ.js');
const Theme = require('./Theme-DaGRg2qU.js');
const useEnterprise = require('./useEnterprise-ijNnK53J.js');
const selectors = require('./selectors-BKYO5J5S.js');
const admin = require('./admin-DRnq5SAg.js');
const users = require('./users-DaPfjlwf.js');
const SelectRoles = require('./SelectRoles-BdEwXyKD.js');
const validation = require('./validation-rU6h2lAr.js');

const _interopDefault = e => e && e.__esModule ? e : { default: e };

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

const React__namespace = /*#__PURE__*/_interopNamespace(React);
const pick__default = /*#__PURE__*/_interopDefault(pick);
const yup__namespace = /*#__PURE__*/_interopNamespace(yup);

const EDIT_VALIDATION_SCHEMA = yup__namespace.object().shape({
  ...validation.COMMON_USER_SCHEMA,
  isActive: yup__namespace.bool(),
  roles: yup__namespace.array().min(1, {
    id: index.errorsTrads.required.id,
    defaultMessage: "This field is required"
  }).required({
    id: index.errorsTrads.required.id,
    defaultMessage: "This field is required"
  })
});
const fieldsToPick = ["email", "firstname", "lastname", "username", "isActive", "roles"];
const EditPage = () => {
  const { formatMessage } = reactIntl.useIntl();
  const match = reactRouterDom.useMatch("/settings/users/:id");
  const id = match?.params?.id ?? "";
  const navigate = reactRouterDom.useNavigate();
  const { toggleNotification } = Theme.useNotification();
  const MagicLink = useEnterprise.useEnterprise(
    SelectRoles.MagicLinkCE,
    async () => (await Promise.resolve().then(() => require('./MagicLinkEE-CcY0596w.js'))).MagicLinkEE
  );
  const {
    _unstableFormatAPIError: formatAPIError,
    _unstableFormatValidationErrors: formatValidationErrors
  } = Theme.useAPIErrorHandler();
  const permissions = Theme.useTypedSelector(selectors.selectAdminPermissions);
  const {
    isLoading: isLoadingRBAC,
    allowedActions: { canUpdate }
  } = Theme.useRBAC({
    read: permissions.settings?.users.read ?? [],
    update: permissions.settings?.users.update ?? []
  });
  const [updateUser] = index.useUpdateUserMutation();
  const {
    data,
    error,
    isLoading: isLoadingAdminUsers
  } = index.useAdminUsers(
    { id },
    {
      refetchOnMountOrArgChange: true
    }
  );
  const [user] = data?.users ?? [];
  React__namespace.useEffect(() => {
    if (error) {
      if (error.name === "UnauthorizedError") {
        toggleNotification({
          type: "info",
          message: formatMessage({
            id: "notification.permission.not-allowed-read",
            defaultMessage: "You are not allowed to see this document"
          })
        });
        navigate("/");
      } else {
        toggleNotification({
          type: "danger",
          message: formatAPIError(error)
        });
      }
    }
  }, [error, formatAPIError, formatMessage, navigate, toggleNotification]);
  const isLoading = isLoadingAdminUsers || !MagicLink || isLoadingRBAC;
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntime.jsx(Theme.Page.Loading, {});
  }
  const initialData = {
    ...pick__default.default(user, fieldsToPick),
    roles: user.roles.map(({ id: id2 }) => id2),
    password: "",
    confirmPassword: ""
  };
  const handleSubmit = async (body, actions) => {
    const { confirmPassword: _confirmPassword, ...bodyRest } = body;
    const res = await updateUser({
      id,
      ...bodyRest
    });
    if ("error" in res && admin.isBaseQueryError(res.error)) {
      if (res.error.name === "ValidationError") {
        actions.setErrors(formatValidationErrors(res.error));
      }
      toggleNotification({
        type: "danger",
        message: formatAPIError(res.error)
      });
    } else {
      toggleNotification({
        type: "success",
        message: formatMessage({ id: "notification.success.saved", defaultMessage: "Saved" })
      });
      actions.setValues({
        ...pick__default.default(body, fieldsToPick),
        password: "",
        confirmPassword: ""
      });
    }
  };
  return /* @__PURE__ */ jsxRuntime.jsxs(Theme.Page.Main, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(Theme.Page.Title, { children: formatMessage(
      { id: "Settings.PageTitle", defaultMessage: "Settings - {name}" },
      {
        name: "Users"
      }
    ) }),
    /* @__PURE__ */ jsxRuntime.jsx(
      index.Form,
      {
        method: "PUT",
        onSubmit: handleSubmit,
        initialValues: initialData,
        validationSchema: EDIT_VALIDATION_SCHEMA,
        children: ({ isSubmitting, modified }) => {
          return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
            /* @__PURE__ */ jsxRuntime.jsx(
              index.Layouts.Header,
              {
                primaryAction: /* @__PURE__ */ jsxRuntime.jsx(
                  designSystem.Button,
                  {
                    disabled: isSubmitting || !canUpdate || !modified,
                    startIcon: /* @__PURE__ */ jsxRuntime.jsx(icons.Check, {}),
                    loading: isSubmitting,
                    type: "submit",
                    children: formatMessage({ id: "global.save", defaultMessage: "Save" })
                  }
                ),
                title: formatMessage(
                  {
                    id: "app.containers.Users.EditPage.header.label",
                    defaultMessage: "Edit {name}"
                  },
                  {
                    // @ts-expect-error – issues with the Entity ID type, still.
                    name: users.getDisplayName(initialData)
                  }
                ),
                navigationAction: /* @__PURE__ */ jsxRuntime.jsx(index.BackButton, { fallback: "../users" })
              }
            ),
            /* @__PURE__ */ jsxRuntime.jsxs(index.Layouts.Content, { children: [
              user?.registrationToken && /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { paddingBottom: 6, children: /* @__PURE__ */ jsxRuntime.jsx(MagicLink, { registrationToken: user.registrationToken }) }),
              /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "column", alignItems: "stretch", gap: 7, children: [
                /* @__PURE__ */ jsxRuntime.jsx(
                  designSystem.Box,
                  {
                    background: "neutral0",
                    hasRadius: true,
                    shadow: "filterShadow",
                    paddingTop: 6,
                    paddingBottom: 6,
                    paddingLeft: 7,
                    paddingRight: 7,
                    children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "column", alignItems: "stretch", gap: 4, children: [
                      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "delta", tag: "h2", children: formatMessage({
                        id: "app.components.Users.ModalCreateBody.block-title.details",
                        defaultMessage: "Details"
                      }) }),
                      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Grid.Root, { gap: 5, children: LAYOUT.map(
                        (row) => row.map(({ size, label, ...field }) => {
                          return /* @__PURE__ */ jsxRuntime.jsx(
                            designSystem.Grid.Item,
                            {
                              col: size,
                              direction: "column",
                              alignItems: "stretch",
                              children: /* @__PURE__ */ jsxRuntime.jsx(
                                index.MemoizedInputRenderer,
                                {
                                  ...field,
                                  disabled: !canUpdate,
                                  label: formatMessage(label),
                                  placeholder: "placeholder" in field ? formatMessage(field.placeholder) : void 0
                                }
                              )
                            },
                            field.name
                          );
                        })
                      ) })
                    ] })
                  }
                ),
                /* @__PURE__ */ jsxRuntime.jsx(
                  designSystem.Box,
                  {
                    background: "neutral0",
                    hasRadius: true,
                    shadow: "filterShadow",
                    paddingTop: 6,
                    paddingBottom: 6,
                    paddingLeft: 7,
                    paddingRight: 7,
                    children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "column", alignItems: "stretch", gap: 4, children: [
                      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "delta", tag: "h2", children: formatMessage({
                        id: "global.roles",
                        defaultMessage: "User's role"
                      }) }),
                      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Grid.Root, { gap: 5, children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Grid.Item, { col: 6, xs: 12, direction: "column", alignItems: "stretch", children: /* @__PURE__ */ jsxRuntime.jsx(SelectRoles.SelectRoles, { disabled: !canUpdate }) }) })
                    ] })
                  }
                )
              ] })
            ] })
          ] });
        }
      }
    )
  ] });
};
const LAYOUT = [
  [
    {
      label: {
        id: "Auth.form.firstname.label",
        defaultMessage: "First name"
      },
      name: "firstname",
      placeholder: {
        id: "Auth.form.firstname.placeholder",
        defaultMessage: "e.g. Kai"
      },
      type: "string",
      size: 6,
      required: true
    },
    {
      label: {
        id: "Auth.form.lastname.label",
        defaultMessage: "Last name"
      },
      name: "lastname",
      placeholder: {
        id: "Auth.form.lastname.placeholder",
        defaultMessage: "e.g. Doe"
      },
      type: "string",
      size: 6
    }
  ],
  [
    {
      label: {
        id: "Auth.form.email.label",
        defaultMessage: "Email"
      },
      name: "email",
      placeholder: {
        id: "Auth.form.email.placeholder",
        defaultMessage: "e.g. kai.doe@strapi.io"
      },
      type: "email",
      size: 6,
      required: true
    },
    {
      label: {
        id: "Auth.form.username.label",
        defaultMessage: "Username"
      },
      name: "username",
      placeholder: {
        id: "Auth.form.username.placeholder",
        defaultMessage: "e.g. Kai_Doe"
      },
      type: "string",
      size: 6
    }
  ],
  [
    {
      autoComplete: "new-password",
      label: {
        id: "global.password",
        defaultMessage: "Password"
      },
      name: "password",
      type: "password",
      size: 6
    },
    {
      autoComplete: "new-password",
      label: {
        id: "Auth.form.confirmPassword.label",
        defaultMessage: "Password confirmation"
      },
      name: "confirmPassword",
      type: "password",
      size: 6
    }
  ],
  [
    {
      label: {
        id: "Auth.form.active.label",
        defaultMessage: "Active"
      },
      name: "isActive",
      type: "boolean",
      size: 6
    }
  ]
];
const ProtectedEditPage = () => {
  const permissions = Theme.useTypedSelector((state) => state.admin_app.permissions.settings?.users.read);
  return /* @__PURE__ */ jsxRuntime.jsx(Theme.Page.Protect, { permissions, children: /* @__PURE__ */ jsxRuntime.jsx(EditPage, {}) });
};

exports.EditPage = EditPage;
exports.ProtectedEditPage = ProtectedEditPage;
//# sourceMappingURL=EditPage-BfQPP6jb.js.map

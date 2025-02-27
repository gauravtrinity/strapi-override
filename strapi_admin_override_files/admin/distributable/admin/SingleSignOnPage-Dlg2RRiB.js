'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const jsxRuntime = require('react/jsx-runtime');
const designSystem = require('@strapi/design-system');
const icons = require('@strapi/icons');
const reactIntl = require('react-intl');
const yup = require('yup');
const index = require('./index-UB9JNjeZ.js');
const Theme = require('./Theme-DaGRg2qU.js');
const useAdminRoles = require('./useAdminRoles-yQ7wdRBn.js');
const admin = require('./admin-DRnq5SAg.js');

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

const SCHEMA = yup__namespace.object().shape({
  autoRegister: yup__namespace.bool().required(index.errorsTrads.required),
  defaultRole: yup__namespace.mixed().when("autoRegister", (value, initSchema) => {
    return value ? initSchema.required(index.errorsTrads.required) : initSchema.nullable();
  }),
  ssoLockedRoles: yup__namespace.array().nullable().of(
    yup__namespace.mixed().when("ssoLockedRoles", (value, initSchema) => {
      return value ? initSchema.required(index.errorsTrads.required) : initSchema.nullable();
    })
  )
});
const SingleSignOnPage = () => {
  const { formatMessage } = reactIntl.useIntl();
  const permissions = Theme.useTypedSelector((state) => state.admin_app.permissions);
  const { toggleNotification } = Theme.useNotification();
  const {
    _unstableFormatAPIError: formatAPIError,
    _unstableFormatValidationErrors: formatValidationErrors
  } = Theme.useAPIErrorHandler();
  const { isLoading: isLoadingProviderOptions, data } = Theme.useGetProviderOptionsQuery();
  const [updateProviderOptions, { isLoading: isSubmittingForm }] = Theme.useUpdateProviderOptionsMutation();
  const {
    isLoading: isLoadingPermissions,
    allowedActions: { canUpdate, canRead: canReadRoles }
  } = Theme.useRBAC({
    ...permissions.settings?.sso,
    readRoles: permissions.settings?.roles.read ?? []
  });
  const { roles, isLoading: isLoadingRoles } = useAdminRoles.useAdminRoles(void 0, {
    skip: !canReadRoles
  });
  const handleSubmit = async (body, helpers) => {
    try {
      const res = await updateProviderOptions(body);
      if ("error" in res) {
        if (admin.isBaseQueryError(res.error) && res.error.name === "ValidationError") {
          helpers.setErrors(formatValidationErrors(res.error));
        } else {
          toggleNotification({
            type: "danger",
            message: formatAPIError(res.error)
          });
        }
        return;
      }
      toggleNotification({
        type: "success",
        message: formatMessage({ id: "notification.success.saved" })
      });
    } catch (err) {
      toggleNotification({
        type: "danger",
        message: formatMessage({
          id: "notification.error",
          defaultMessage: "An error occurred, please try again."
        })
      });
    }
  };
  const isLoadingData = isLoadingRoles || isLoadingPermissions || isLoadingProviderOptions;
  return /* @__PURE__ */ jsxRuntime.jsxs(index.Layouts.Root, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(Theme.Page.Title, { children: formatMessage(
      { id: "Settings.PageTitle", defaultMessage: "Settings - {name}" },
      {
        name: "SSO"
      }
    ) }),
    /* @__PURE__ */ jsxRuntime.jsx(Theme.Page.Main, { "aria-busy": isSubmittingForm || isLoadingData, tabIndex: -1, children: /* @__PURE__ */ jsxRuntime.jsx(
      index.Form,
      {
        method: "PUT",
        onSubmit: handleSubmit,
        validationSchema: SCHEMA,
        disabled: !canUpdate,
        initialValues: data || {
          autoRegister: false,
          defaultRole: null,
          ssoLockedRoles: null
        },
        children: ({ modified, isSubmitting }) => /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
          /* @__PURE__ */ jsxRuntime.jsx(
            index.Layouts.Header,
            {
              primaryAction: /* @__PURE__ */ jsxRuntime.jsx(
                designSystem.Button,
                {
                  disabled: !modified,
                  loading: isSubmitting,
                  startIcon: /* @__PURE__ */ jsxRuntime.jsx(icons.Check, {}),
                  type: "submit",
                  children: formatMessage({
                    id: "global.save",
                    defaultMessage: "Save"
                  })
                }
              ),
              title: formatMessage({
                id: "Settings.sso.title",
                defaultMessage: "Single Sign-On"
              }),
              subtitle: formatMessage({
                id: "Settings.sso.description",
                defaultMessage: "Configure the settings for the Single Sign-On feature."
              })
            }
          ),
          /* @__PURE__ */ jsxRuntime.jsx(index.Layouts.Content, { children: isSubmitting || isLoadingData ? /* @__PURE__ */ jsxRuntime.jsx(Theme.Page.Loading, {}) : /* @__PURE__ */ jsxRuntime.jsxs(
            designSystem.Flex,
            {
              direction: "column",
              alignItems: "stretch",
              gap: 4,
              background: "neutral0",
              padding: 6,
              shadow: "filterShadow",
              hasRadius: true,
              children: [
                /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "delta", tag: "h2", children: formatMessage({
                  id: "global.settings",
                  defaultMessage: "Settings"
                }) }),
                /* @__PURE__ */ jsxRuntime.jsx(designSystem.Grid.Root, { gap: 4, children: [
                  {
                    hint: formatMessage({
                      id: "Settings.sso.form.registration.description",
                      defaultMessage: "Create new user on SSO login if no account exists"
                    }),
                    label: formatMessage({
                      id: "Settings.sso.form.registration.label",
                      defaultMessage: "Auto-registration"
                    }),
                    name: "autoRegister",
                    size: 6,
                    type: "boolean"
                  },
                  {
                    hint: formatMessage({
                      id: "Settings.sso.form.defaultRole.description",
                      defaultMessage: "It will attach the new authenticated user to the selected role"
                    }),
                    label: formatMessage({
                      id: "Settings.sso.form.defaultRole.label",
                      defaultMessage: "Default role"
                    }),
                    name: "defaultRole",
                    options: roles.map(({ id, name }) => ({
                      label: name,
                      value: id.toString()
                    })),
                    placeholder: formatMessage({
                      id: "components.InputSelect.option.placeholder",
                      defaultMessage: "Choose here"
                    }),
                    size: 6,
                    type: "enumeration"
                  },
                  {
                    hint: formatMessage({
                      id: "Settings.sso.form.localAuthenticationLock.description",
                      defaultMessage: "Select the roles for which you want to disable the local authentication"
                    }),
                    label: formatMessage({
                      id: "Settings.sso.form.localAuthenticationLock.label",
                      defaultMessage: "Local authentication lock-out"
                    }),
                    name: "ssoLockedRoles",
                    options: roles.map(({ id, name }) => ({
                      label: name,
                      value: id.toString()
                    })),
                    placeholder: formatMessage({
                      id: "components.InputSelect.option.placeholder",
                      defaultMessage: "Choose here"
                    }),
                    size: 6,
                    type: "multi"
                  }
                ].map(({ size, ...field }) => /* @__PURE__ */ jsxRuntime.jsx(
                  designSystem.Grid.Item,
                  {
                    col: size,
                    direction: "column",
                    alignItems: "stretch",
                    children: /* @__PURE__ */ jsxRuntime.jsx(FormInputRenderer, { ...field })
                  },
                  field.name
                )) })
              ]
            }
          ) })
        ] })
      }
    ) })
  ] });
};
const FormInputRenderer = (props) => {
  switch (props.type) {
    case "multi":
      return /* @__PURE__ */ jsxRuntime.jsx(MultiSelectInput, { ...props });
    default:
      return /* @__PURE__ */ jsxRuntime.jsx(index.MemoizedInputRenderer, { ...props });
  }
};
const MultiSelectInput = ({ hint, label, name, options, ...props }) => {
  const field = index.useField(name);
  return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Field.Root, { name, hint, error: field.error, children: [
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Label, { children: label }),
    /* @__PURE__ */ jsxRuntime.jsx(
      designSystem.MultiSelect,
      {
        onChange: (value) => field.onChange("ssoLockedRoles", value),
        onClear: () => field.onChange("ssoLockedRoles", []),
        value: field.value ?? [],
        withTags: true,
        ...props,
        children: options.map(({ label: label2, value }) => /* @__PURE__ */ jsxRuntime.jsx(designSystem.MultiSelectOption, { value, children: label2 }, value))
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Hint, {}),
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Error, {})
  ] });
};
const ProtectedSSO = () => {
  const permissions = Theme.useTypedSelector((state) => state.admin_app.permissions.settings?.sso?.main);
  return /* @__PURE__ */ jsxRuntime.jsx(Theme.Page.Protect, { permissions, children: /* @__PURE__ */ jsxRuntime.jsx(SingleSignOnPage, {}) });
};

exports.ProtectedSSO = ProtectedSSO;
exports.SingleSignOnPage = SingleSignOnPage;
//# sourceMappingURL=SingleSignOnPage-Dlg2RRiB.js.map

'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const jsxRuntime = require('react/jsx-runtime');
const React = require('react');
const designSystem = require('@strapi/design-system');
const icons = require('@strapi/icons');
const upperFirst = require('lodash/upperFirst');
const reactIntl = require('react-intl');
const yup = require('yup');
const index = require('./index-UB9JNjeZ.js');
const Theme = require('./Theme-DaGRg2qU.js');
const admin = require('./admin-DRnq5SAg.js');
const users = require('./users-DaPfjlwf.js');
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
const upperFirst__default = /*#__PURE__*/_interopDefault(upperFirst);
const yup__namespace = /*#__PURE__*/_interopNamespace(yup);

const PROFILE_VALIDTION_SCHEMA = yup__namespace.object().shape({
  ...validation.COMMON_USER_SCHEMA,
  currentPassword: yup__namespace.string().when(["password", "confirmPassword"], (password, confirmPassword, passSchema) => {
    return password || confirmPassword ? passSchema.required({
      id: index.errorsTrads.required.id,
      defaultMessage: "This field is required"
    }).nullable() : passSchema;
  }),
  preferedLanguage: yup__namespace.string().nullable()
});
const ProfilePage = () => {
  const localeNames = Theme.useTypedSelector((state) => state.admin_app.language.localeNames);
  const { formatMessage } = reactIntl.useIntl();
  const { trackUsage } = Theme.useTracking();
  const { toggleNotification } = Theme.useNotification();
  const { notifyStatus } = designSystem.useNotifyAT();
  const currentTheme = Theme.useTypedSelector((state) => state.admin_app.theme.currentTheme);
  const dispatch = Theme.useTypedDispatch();
  const {
    _unstableFormatValidationErrors: formatValidationErrors,
    _unstableFormatAPIError: formatApiError
  } = Theme.useAPIErrorHandler();
  const user = Theme.useAuth("ProfilePage", (state) => state.user);
  React__namespace.useEffect(() => {
    if (user) {
      notifyStatus(
        formatMessage({
          id: "Settings.profile.form.notify.data.loaded",
          defaultMessage: "Your profile data has been loaded"
        })
      );
    } else {
      toggleNotification({
        type: "danger",
        message: formatMessage({ id: "notification.error", defaultMessage: "An error occured" })
      });
    }
  }, [formatMessage, notifyStatus, toggleNotification, user]);
  const [updateMe, { isLoading: isSubmittingForm }] = Theme.useUpdateMeMutation();
  const {
    isLoading,
    data: dataSSO,
    error
  } = Theme.useIsSSOLockedQuery(void 0, {
    skip: !(window.strapi.isEE && window.strapi.features.isEnabled("sso"))
  });
  React__namespace.useEffect(() => {
    if (error) {
      toggleNotification({
        type: "danger",
        message: formatMessage({ id: "Settings.permissions.users.sso.provider.error" })
      });
    }
  }, [error, formatMessage, toggleNotification]);
  const handleSubmit = async (body, { setErrors }) => {
    const { confirmPassword: _confirmPassword, currentTheme: currentTheme2, ...bodyRest } = body;
    let dataToSend = bodyRest;
    if (dataToSend.password === "") {
      const {
        password: _password,
        currentPassword: _currentPassword,
        ...passwordRequestBodyRest
      } = dataToSend;
      dataToSend = passwordRequestBodyRest;
    }
    const res = await updateMe(dataToSend);
    if ("data" in res) {
      dispatch(Theme.setAppTheme(currentTheme2));
      trackUsage("didChangeMode", { newMode: currentTheme2 });
      toggleNotification({
        type: "success",
        message: formatMessage({ id: "notification.success.saved", defaultMessage: "Saved" })
      });
    }
    if ("error" in res) {
      if (admin.isBaseQueryError(res.error) && res.error.name === "ValidationError") {
        setErrors(formatValidationErrors(res.error));
      } else if (admin.isBaseQueryError(res.error)) {
        toggleNotification({
          type: "danger",
          message: formatApiError(res.error)
        });
      } else {
        toggleNotification({
          type: "danger",
          message: formatMessage({ id: "notification.error", defaultMessage: "An error occured" })
        });
      }
    }
  };
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntime.jsx(Theme.Page.Loading, {});
  }
  const hasLockedRole = dataSSO?.isSSOLocked ?? false;
  const { email, firstname, lastname, username, preferedLanguage } = user ?? {};
  const initialData = {
    email: email ?? "",
    firstname: firstname ?? "",
    lastname: lastname ?? "",
    username: username ?? "",
    preferedLanguage,
    currentTheme,
    confirmPassword: "",
    password: ""
  };
  return /* @__PURE__ */ jsxRuntime.jsxs(Theme.Page.Main, { "aria-busy": isSubmittingForm, children: [
    /* @__PURE__ */ jsxRuntime.jsx(Theme.Page.Title, { children: formatMessage({
      id: "Settings.profile.form.section.head.title",
      defaultMessage: "User profile"
    }) }),
    /* @__PURE__ */ jsxRuntime.jsx(
      index.Form,
      {
        method: "PUT",
        onSubmit: handleSubmit,
        initialValues: initialData,
        validationSchema: PROFILE_VALIDTION_SCHEMA,
        children: ({ isSubmitting, modified }) => /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
          /* @__PURE__ */ jsxRuntime.jsx(
            index.Layouts.Header,
            {
              title: users.getDisplayName(user),
              primaryAction: /* @__PURE__ */ jsxRuntime.jsx(
                designSystem.Button,
                {
                  startIcon: /* @__PURE__ */ jsxRuntime.jsx(icons.Check, {}),
                  loading: isSubmitting,
                  type: "submit",
                  disabled: !modified,
                  children: formatMessage({ id: "global.save", defaultMessage: "Save" })
                }
              )
            }
          ),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { paddingBottom: 10, children: /* @__PURE__ */ jsxRuntime.jsx(index.Layouts.Content, { children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "column", alignItems: "stretch", gap: 6, children: [
            /* @__PURE__ */ jsxRuntime.jsx(UserInfoSection, {}),
            !hasLockedRole && /* @__PURE__ */ jsxRuntime.jsx(PasswordSection, {}),
            /* @__PURE__ */ jsxRuntime.jsx(PreferencesSection, { localeNames })
          ] }) }) })
        ] })
      }
    )
  ] });
};
const PasswordSection = () => {
  const { formatMessage } = reactIntl.useIntl();
  return /* @__PURE__ */ jsxRuntime.jsx(
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
          id: "global.change-password",
          defaultMessage: "Change password"
        }) }),
        [
          [
            {
              label: formatMessage({
                id: "Auth.form.currentPassword.label",
                defaultMessage: "Current Password"
              }),
              name: "currentPassword",
              size: 6,
              type: "password"
            }
          ],
          [
            {
              autoComplete: "new-password",
              label: formatMessage({
                id: "global.password",
                defaultMessage: "Password"
              }),
              name: "password",
              size: 6,
              type: "password"
            },
            {
              autoComplete: "new-password",
              label: formatMessage({
                id: "Auth.form.confirmPassword.label",
                defaultMessage: "Confirm Password"
              }),
              name: "confirmPassword",
              size: 6,
              type: "password"
            }
          ]
        ].map((row, index$1) => /* @__PURE__ */ jsxRuntime.jsx(designSystem.Grid.Root, { gap: 5, children: row.map(({ size, ...field }) => /* @__PURE__ */ jsxRuntime.jsx(designSystem.Grid.Item, { col: size, direction: "column", alignItems: "stretch", children: /* @__PURE__ */ jsxRuntime.jsx(index.MemoizedInputRenderer, { ...field }) }, field.name)) }, index$1))
      ] })
    }
  );
};
const PreferencesSection = ({ localeNames }) => {
  const { formatMessage } = reactIntl.useIntl();
  const themesToDisplay = Theme.useTypedSelector((state) => state.admin_app.theme.availableThemes);
  return /* @__PURE__ */ jsxRuntime.jsx(
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
        /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "column", alignItems: "stretch", gap: 1, children: [
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "delta", tag: "h2", children: formatMessage({
            id: "Settings.profile.form.section.experience.title",
            defaultMessage: "Experience"
          }) }),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { children: formatMessage(
            {
              id: "Settings.profile.form.section.experience.interfaceLanguageHelp",
              defaultMessage: "Preference changes will apply only to you. More information is available {here}."
            },
            {
              here: /* @__PURE__ */ jsxRuntime.jsx(
                designSystem.Box,
                {
                  tag: "a",
                  color: "primary600",
                  target: "_blank",
                  rel: "noopener noreferrer",
                  href: "https://docs.strapi.io/developer-docs/latest/development/admin-customization.html#locales",
                  children: formatMessage({
                    id: "Settings.profile.form.section.experience.here",
                    defaultMessage: "here"
                  })
                }
              )
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Grid.Root, { gap: 5, children: [
          {
            hint: formatMessage({
              id: "Settings.profile.form.section.experience.interfaceLanguage.hint",
              defaultMessage: "This will only display your own interface in the chosen language."
            }),
            label: formatMessage({
              id: "Settings.profile.form.section.experience.interfaceLanguage",
              defaultMessage: "Interface language"
            }),
            name: "preferedLanguage",
            options: Object.entries(localeNames).map(([value, label]) => ({
              label,
              value
            })),
            placeholder: formatMessage({
              id: "global.select",
              defaultMessage: "Select"
            }),
            size: 6,
            type: "enumeration"
          },
          {
            hint: formatMessage({
              id: "Settings.profile.form.section.experience.mode.hint",
              defaultMessage: "Displays your interface in the chosen mode."
            }),
            label: formatMessage({
              id: "Settings.profile.form.section.experience.mode.label",
              defaultMessage: "Interface mode"
            }),
            name: "currentTheme",
            options: [
              {
                label: formatMessage({
                  id: "Settings.profile.form.section.experience.mode.option-system-label",
                  defaultMessage: "Use system settings"
                }),
                value: "system"
              },
              ...themesToDisplay.map((theme) => ({
                label: formatMessage(
                  {
                    id: "Settings.profile.form.section.experience.mode.option-label",
                    defaultMessage: "{name} mode"
                  },
                  {
                    name: formatMessage({
                      id: theme,
                      defaultMessage: upperFirst__default.default(theme)
                    })
                  }
                ),
                value: theme
              }))
            ],
            placeholder: formatMessage({
              id: "components.Select.placeholder",
              defaultMessage: "Select"
            }),
            size: 6,
            type: "enumeration"
          }
        ].map(({ size, ...field }) => /* @__PURE__ */ jsxRuntime.jsx(designSystem.Grid.Item, { col: size, direction: "column", alignItems: "stretch", children: /* @__PURE__ */ jsxRuntime.jsx(index.MemoizedInputRenderer, { ...field }) }, field.name)) })
      ] })
    }
  );
};
const UserInfoSection = () => {
  const { formatMessage } = reactIntl.useIntl();
  return /* @__PURE__ */ jsxRuntime.jsx(
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
          id: "global.profile",
          defaultMessage: "Profile"
        }) }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Grid.Root, { gap: 5, children: [
          {
            label: formatMessage({
              id: "Auth.form.firstname.label",
              defaultMessage: "First name"
            }),
            name: "firstname",
            required: true,
            size: 6,
            type: "string"
          },
          {
            label: formatMessage({
              id: "Auth.form.lastname.label",
              defaultMessage: "Last name"
            }),
            name: "lastname",
            size: 6,
            type: "string"
          },
          {
            label: formatMessage({
              id: "Auth.form.email.label",
              defaultMessage: "Email"
            }),
            name: "email",
            required: true,
            size: 6,
            type: "email"
          },
          {
            label: formatMessage({
              id: "Auth.form.username.label",
              defaultMessage: "Username"
            }),
            name: "username",
            size: 6,
            type: "string"
          }
        ].map(({ size, ...field }) => /* @__PURE__ */ jsxRuntime.jsx(designSystem.Grid.Item, { col: size, direction: "column", alignItems: "stretch", children: /* @__PURE__ */ jsxRuntime.jsx(index.MemoizedInputRenderer, { ...field }) }, field.name)) })
      ] })
    }
  );
};

exports.ProfilePage = ProfilePage;
//# sourceMappingURL=ProfilePage-D4CKD_Wj.js.map

'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const jsxRuntime = require('react/jsx-runtime');
const React = require('react');
const designSystem = require('@strapi/design-system');
const icons = require('@strapi/icons');
const formik = require('formik');
const reactIntl = require('react-intl');
const reactRouterDom = require('react-router-dom');
const yup = require('yup');
const index = require('./index-UB9JNjeZ.js');
const Theme = require('./Theme-DaGRg2qU.js');
const useAdminRoles = require('./useAdminRoles-yQ7wdRBn.js');
const admin = require('./admin-DRnq5SAg.js');
const Permissions = require('./Permissions-CiEhUevV.js');

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
const yup__namespace = /*#__PURE__*/_interopNamespace(yup);

const RoleForm = ({ disabled, role, values, errors, onChange, onBlur }) => {
  const { formatMessage } = reactIntl.useIntl();
  return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { background: "neutral0", padding: 6, shadow: "filterShadow", hasRadius: true, children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "column", alignItems: "stretch", gap: 4, children: [
    /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { justifyContent: "space-between", children: [
      /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Box, { children: [
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { fontWeight: "bold", children: role ? role.name : formatMessage({
          id: "global.details",
          defaultMessage: "Details"
        }) }) }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { textColor: "neutral500", variant: "pi", children: role ? role.description : formatMessage({
          id: "Settings.roles.form.description",
          defaultMessage: "Name and description of the role"
        }) }) })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { disabled: true, variant: "secondary", children: formatMessage(
        {
          id: "Settings.roles.form.button.users-with-role",
          defaultMessage: "{number, plural, =0 {# users} one {# user} other {# users}} with this role"
        },
        { number: role.usersCount }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Grid.Root, { gap: 4, children: [
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Grid.Item, { col: 6, direction: "column", alignItems: "stretch", children: /* @__PURE__ */ jsxRuntime.jsxs(
        designSystem.Field.Root,
        {
          name: "name",
          error: errors.name && formatMessage({ id: errors.name }),
          required: true,
          children: [
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Label, { children: formatMessage({
              id: "global.name",
              defaultMessage: "Name"
            }) }),
            /* @__PURE__ */ jsxRuntime.jsx(
              designSystem.TextInput,
              {
                disabled,
                onChange,
                onBlur,
                value: values.name || ""
              }
            ),
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Error, {})
          ]
        }
      ) }),
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Grid.Item, { col: 6, direction: "column", alignItems: "stretch", children: /* @__PURE__ */ jsxRuntime.jsxs(
        designSystem.Field.Root,
        {
          name: "description",
          error: errors.description && formatMessage({ id: errors.description }),
          children: [
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Label, { children: formatMessage({
              id: "global.description",
              defaultMessage: "Description"
            }) }),
            /* @__PURE__ */ jsxRuntime.jsx(
              designSystem.Textarea,
              {
                disabled,
                onChange,
                onBlur,
                value: values.description
              }
            ),
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Error, {})
          ]
        }
      ) })
    ] })
  ] }) });
};

const EDIT_ROLE_SCHEMA = yup__namespace.object().shape({
  name: yup__namespace.string().required(index.errorsTrads.required.id),
  description: yup__namespace.string().optional()
});
const EditPage = () => {
  const { toggleNotification } = Theme.useNotification();
  const { formatMessage } = reactIntl.useIntl();
  const match = reactRouterDom.useMatch("/settings/roles/:id");
  const id = match?.params.id;
  const permissionsRef = React__namespace.useRef(null);
  const { trackUsage } = Theme.useTracking();
  const {
    _unstableFormatAPIError: formatAPIError,
    _unstableFormatValidationErrors: formatValidationErrors
  } = Theme.useAPIErrorHandler();
  const { isLoading: isLoadingPermissionsLayout, data: permissionsLayout } = index.useGetRolePermissionLayoutQuery({
    /**
     * Role here is a query param so if there's no role we pass an empty string
     * which returns us a default layout.
     */
    role: id ?? ""
  });
  const {
    roles,
    isLoading: isRoleLoading,
    refetch: refetchRole
  } = useAdminRoles.useAdminRoles(
    { id },
    {
      refetchOnMountOrArgChange: true
    }
  );
  const role = roles[0] ?? {};
  const { data: permissions, isLoading: isLoadingPermissions } = index.useGetRolePermissionsQuery(
    {
      id
    },
    {
      skip: !id,
      refetchOnMountOrArgChange: true
    }
  );
  const [updateRole] = index.useUpdateRoleMutation();
  const [updateRolePermissions] = index.useUpdateRolePermissionsMutation();
  if (!id) {
    return /* @__PURE__ */ jsxRuntime.jsx(reactRouterDom.Navigate, { to: "/settings/roles" });
  }
  const handleEditRoleSubmit = async (data, formik) => {
    try {
      const { permissionsToSend, didUpdateConditions } = permissionsRef.current?.getPermissions() ?? {};
      const res = await updateRole({
        id,
        ...data
      });
      if ("error" in res) {
        if (admin.isBaseQueryError(res.error) && res.error.name === "ValidationError") {
          formik.setErrors(formatValidationErrors(res.error));
        } else {
          toggleNotification({
            type: "danger",
            message: formatAPIError(res.error)
          });
        }
        return;
      }
      if (role.code !== "strapi-super-admin" && permissionsToSend) {
        const updateRes = await updateRolePermissions({
          id: res.data.id,
          permissions: permissionsToSend
        });
        if ("error" in updateRes) {
          if (admin.isBaseQueryError(updateRes.error) && updateRes.error.name === "ValidationError") {
            formik.setErrors(formatValidationErrors(updateRes.error));
          } else {
            toggleNotification({
              type: "danger",
              message: formatAPIError(updateRes.error)
            });
          }
          return;
        }
        if (didUpdateConditions) {
          trackUsage("didUpdateConditions");
        }
      }
      permissionsRef.current?.setFormAfterSubmit();
      await refetchRole();
      toggleNotification({
        type: "success",
        message: formatMessage({ id: "notification.success.saved" })
      });
    } catch (error) {
      toggleNotification({
        type: "danger",
        message: formatMessage({ id: "notification.error", defaultMessage: "An error occurred" })
      });
    }
  };
  const isFormDisabled = !isRoleLoading && role.code === "strapi-super-admin";
  if (isLoadingPermissionsLayout || isRoleLoading || isLoadingPermissions || !permissionsLayout) {
    return /* @__PURE__ */ jsxRuntime.jsx(Theme.Page.Loading, {});
  }
  return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Main, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(Theme.Page.Title, { children: formatMessage(
      { id: "Settings.PageTitle", defaultMessage: "Settings - {name}" },
      {
        name: "Roles"
      }
    ) }),
    /* @__PURE__ */ jsxRuntime.jsx(
      formik.Formik,
      {
        enableReinitialize: true,
        initialValues: {
          name: role.name ?? "",
          description: role.description ?? ""
        },
        onSubmit: handleEditRoleSubmit,
        validationSchema: EDIT_ROLE_SCHEMA,
        validateOnChange: false,
        children: ({ handleSubmit, values, errors, handleChange, handleBlur, isSubmitting }) => /* @__PURE__ */ jsxRuntime.jsxs("form", { onSubmit: handleSubmit, children: [
          /* @__PURE__ */ jsxRuntime.jsx(
            index.Layouts.Header,
            {
              primaryAction: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Flex, { gap: 2, children: /* @__PURE__ */ jsxRuntime.jsx(
                designSystem.Button,
                {
                  type: "submit",
                  startIcon: /* @__PURE__ */ jsxRuntime.jsx(icons.Check, {}),
                  disabled: role.code === "strapi-super-admin",
                  loading: isSubmitting,
                  children: formatMessage({
                    id: "global.save",
                    defaultMessage: "Save"
                  })
                }
              ) }),
              title: formatMessage({
                id: "Settings.roles.edit.title",
                defaultMessage: "Edit a role"
              }),
              subtitle: formatMessage({
                id: "Settings.roles.create.description",
                defaultMessage: "Define the rights given to the role"
              }),
              navigationAction: /* @__PURE__ */ jsxRuntime.jsx(index.BackButton, { fallback: "../roles" })
            }
          ),
          /* @__PURE__ */ jsxRuntime.jsx(index.Layouts.Content, { children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "column", alignItems: "stretch", gap: 6, children: [
            /* @__PURE__ */ jsxRuntime.jsx(
              RoleForm,
              {
                disabled: isFormDisabled,
                errors,
                values,
                onChange: handleChange,
                onBlur: handleBlur,
                role
              }
            ),
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { shadow: "filterShadow", hasRadius: true, children: /* @__PURE__ */ jsxRuntime.jsx(
              Permissions.Permissions,
              {
                isFormDisabled,
                permissions,
                ref: permissionsRef,
                layout: permissionsLayout
              }
            ) })
          ] }) })
        ] })
      }
    )
  ] });
};
const ProtectedEditPage = () => {
  const permissions = Theme.useTypedSelector(
    (state) => state.admin_app.permissions.settings?.roles.update
  );
  return /* @__PURE__ */ jsxRuntime.jsx(Theme.Page.Protect, { permissions, children: /* @__PURE__ */ jsxRuntime.jsx(EditPage, {}) });
};

exports.EditPage = EditPage;
exports.ProtectedEditPage = ProtectedEditPage;
//# sourceMappingURL=EditPage-C8KXTy6N.js.map

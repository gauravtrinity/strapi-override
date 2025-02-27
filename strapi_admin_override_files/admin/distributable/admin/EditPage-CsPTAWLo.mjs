import { jsx, jsxs } from 'react/jsx-runtime';
import * as React from 'react';
import { Box, Flex, Typography, Button, Grid, Field, TextInput, Textarea, Main } from '@strapi/design-system';
import { Check } from '@strapi/icons';
import { Formik } from 'formik';
import { useIntl } from 'react-intl';
import { useMatch, Navigate } from 'react-router-dom';
import * as yup from 'yup';
import { e as errorsTrads, d as useGetRolePermissionLayoutQuery, f as useGetRolePermissionsQuery, o as useUpdateRoleMutation, h as useUpdateRolePermissionsMutation, b as Layouts, B as BackButton } from './index-CyEyTBzg.mjs';
import { b as useTypedSelector, P as Page, u as useNotification, c as useTracking, e as useAPIErrorHandler } from './Theme-6doxg5FV.mjs';
import { u as useAdminRoles } from './useAdminRoles-BKTaRDwU.mjs';
import { i as isBaseQueryError } from './admin-DOzK8yjX.mjs';
import { P as Permissions } from './Permissions-B_EkOPyz.mjs';

const RoleForm = ({ disabled, role, values, errors, onChange, onBlur }) => {
  const { formatMessage } = useIntl();
  return /* @__PURE__ */ jsx(Box, { background: "neutral0", padding: 6, shadow: "filterShadow", hasRadius: true, children: /* @__PURE__ */ jsxs(Flex, { direction: "column", alignItems: "stretch", gap: 4, children: [
    /* @__PURE__ */ jsxs(Flex, { justifyContent: "space-between", children: [
      /* @__PURE__ */ jsxs(Box, { children: [
        /* @__PURE__ */ jsx(Box, { children: /* @__PURE__ */ jsx(Typography, { fontWeight: "bold", children: role ? role.name : formatMessage({
          id: "global.details",
          defaultMessage: "Details"
        }) }) }),
        /* @__PURE__ */ jsx(Box, { children: /* @__PURE__ */ jsx(Typography, { textColor: "neutral500", variant: "pi", children: role ? role.description : formatMessage({
          id: "Settings.roles.form.description",
          defaultMessage: "Name and description of the role"
        }) }) })
      ] }),
      /* @__PURE__ */ jsx(Button, { disabled: true, variant: "secondary", children: formatMessage(
        {
          id: "Settings.roles.form.button.users-with-role",
          defaultMessage: "{number, plural, =0 {# users} one {# user} other {# users}} with this role"
        },
        { number: role.usersCount }
      ) })
    ] }),
    /* @__PURE__ */ jsxs(Grid.Root, { gap: 4, children: [
      /* @__PURE__ */ jsx(Grid.Item, { col: 6, direction: "column", alignItems: "stretch", children: /* @__PURE__ */ jsxs(
        Field.Root,
        {
          name: "name",
          error: errors.name && formatMessage({ id: errors.name }),
          required: true,
          children: [
            /* @__PURE__ */ jsx(Field.Label, { children: formatMessage({
              id: "global.name",
              defaultMessage: "Name"
            }) }),
            /* @__PURE__ */ jsx(
              TextInput,
              {
                disabled,
                onChange,
                onBlur,
                value: values.name || ""
              }
            ),
            /* @__PURE__ */ jsx(Field.Error, {})
          ]
        }
      ) }),
      /* @__PURE__ */ jsx(Grid.Item, { col: 6, direction: "column", alignItems: "stretch", children: /* @__PURE__ */ jsxs(
        Field.Root,
        {
          name: "description",
          error: errors.description && formatMessage({ id: errors.description }),
          children: [
            /* @__PURE__ */ jsx(Field.Label, { children: formatMessage({
              id: "global.description",
              defaultMessage: "Description"
            }) }),
            /* @__PURE__ */ jsx(
              Textarea,
              {
                disabled,
                onChange,
                onBlur,
                value: values.description
              }
            ),
            /* @__PURE__ */ jsx(Field.Error, {})
          ]
        }
      ) })
    ] })
  ] }) });
};

const EDIT_ROLE_SCHEMA = yup.object().shape({
  name: yup.string().required(errorsTrads.required.id),
  description: yup.string().optional()
});
const EditPage = () => {
  const { toggleNotification } = useNotification();
  const { formatMessage } = useIntl();
  const match = useMatch("/settings/roles/:id");
  const id = match?.params.id;
  const permissionsRef = React.useRef(null);
  const { trackUsage } = useTracking();
  const {
    _unstableFormatAPIError: formatAPIError,
    _unstableFormatValidationErrors: formatValidationErrors
  } = useAPIErrorHandler();
  const { isLoading: isLoadingPermissionsLayout, data: permissionsLayout } = useGetRolePermissionLayoutQuery({
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
  } = useAdminRoles(
    { id },
    {
      refetchOnMountOrArgChange: true
    }
  );
  const role = roles[0] ?? {};
  const { data: permissions, isLoading: isLoadingPermissions } = useGetRolePermissionsQuery(
    {
      id
    },
    {
      skip: !id,
      refetchOnMountOrArgChange: true
    }
  );
  const [updateRole] = useUpdateRoleMutation();
  const [updateRolePermissions] = useUpdateRolePermissionsMutation();
  if (!id) {
    return /* @__PURE__ */ jsx(Navigate, { to: "/settings/roles" });
  }
  const handleEditRoleSubmit = async (data, formik) => {
    try {
      const { permissionsToSend, didUpdateConditions } = permissionsRef.current?.getPermissions() ?? {};
      const res = await updateRole({
        id,
        ...data
      });
      if ("error" in res) {
        if (isBaseQueryError(res.error) && res.error.name === "ValidationError") {
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
          if (isBaseQueryError(updateRes.error) && updateRes.error.name === "ValidationError") {
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
    return /* @__PURE__ */ jsx(Page.Loading, {});
  }
  return /* @__PURE__ */ jsxs(Main, { children: [
    /* @__PURE__ */ jsx(Page.Title, { children: formatMessage(
      { id: "Settings.PageTitle", defaultMessage: "Settings - {name}" },
      {
        name: "Roles"
      }
    ) }),
    /* @__PURE__ */ jsx(
      Formik,
      {
        enableReinitialize: true,
        initialValues: {
          name: role.name ?? "",
          description: role.description ?? ""
        },
        onSubmit: handleEditRoleSubmit,
        validationSchema: EDIT_ROLE_SCHEMA,
        validateOnChange: false,
        children: ({ handleSubmit, values, errors, handleChange, handleBlur, isSubmitting }) => /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, children: [
          /* @__PURE__ */ jsx(
            Layouts.Header,
            {
              primaryAction: /* @__PURE__ */ jsx(Flex, { gap: 2, children: /* @__PURE__ */ jsx(
                Button,
                {
                  type: "submit",
                  startIcon: /* @__PURE__ */ jsx(Check, {}),
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
              navigationAction: /* @__PURE__ */ jsx(BackButton, { fallback: "../roles" })
            }
          ),
          /* @__PURE__ */ jsx(Layouts.Content, { children: /* @__PURE__ */ jsxs(Flex, { direction: "column", alignItems: "stretch", gap: 6, children: [
            /* @__PURE__ */ jsx(
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
            /* @__PURE__ */ jsx(Box, { shadow: "filterShadow", hasRadius: true, children: /* @__PURE__ */ jsx(
              Permissions,
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
  const permissions = useTypedSelector(
    (state) => state.admin_app.permissions.settings?.roles.update
  );
  return /* @__PURE__ */ jsx(Page.Protect, { permissions, children: /* @__PURE__ */ jsx(EditPage, {}) });
};

export { EditPage, ProtectedEditPage };
//# sourceMappingURL=EditPage-CsPTAWLo.mjs.map

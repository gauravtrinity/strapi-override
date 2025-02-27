import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import * as React from 'react';
import { Button, Modal, Breadcrumbs, Crumb, Flex, Box, Typography, Grid, IconButton, Dialog, Status } from '@strapi/design-system';
import { Mail, Pencil, Trash } from '@strapi/icons';
import * as qs from 'qs';
import { useIntl } from 'react-intl';
import { useNavigate, useLocation, NavLink } from 'react-router-dom';
import { e as errorsTrads, q as useCreateUserMutation, F as Form, M as MemoizedInputRenderer, j as useAdminUsers, r as useDeleteManyUsersMutation, b as Layouts, S as SearchInput, s as Filters, T as Table, P as Pagination, C as ConfirmDialog } from './index-CyEyTBzg.mjs';
import { u as useNotification, e as useAPIErrorHandler, b as useTypedSelector, P as Page, j as useRBAC } from './Theme-6doxg5FV.mjs';
import { u as useEnterprise } from './useEnterprise-BGzVPL4w.mjs';
import { g as getDisplayName } from './users-8N93LH7R.mjs';
import * as yup from 'yup';
import { i as isBaseQueryError } from './admin-DOzK8yjX.mjs';
import { M as MagicLinkCE, S as SelectRoles } from './SelectRoles-CVKwZ747.mjs';

const CreateActionCE = React.forwardRef((props, ref) => {
  const { formatMessage } = useIntl();
  return /* @__PURE__ */ jsx(Button, { ref, startIcon: /* @__PURE__ */ jsx(Mail, {}), size: "S", ...props, children: formatMessage({
    id: "Settings.permissions.users.create",
    defaultMessage: "Invite new user"
  }) });
});

const ModalForm = ({ onToggle }) => {
  const [currentStep, setStep] = React.useState("create");
  const [registrationToken, setRegistrationToken] = React.useState("");
  const { formatMessage } = useIntl();
  const { toggleNotification } = useNotification();
  const {
    _unstableFormatAPIError: formatAPIError,
    _unstableFormatValidationErrors: formatValidationErrors
  } = useAPIErrorHandler();
  const roleLayout = useEnterprise(
    ROLE_LAYOUT,
    async () => (await import('./ModalForm-B9SUkQ1l.mjs')).ROLE_LAYOUT,
    {
      combine(ceRoles, eeRoles) {
        return [...ceRoles, ...eeRoles];
      },
      defaultValue: []
    }
  );
  const initialValues = useEnterprise(
    FORM_INITIAL_VALUES,
    async () => (await import('./ModalForm-B9SUkQ1l.mjs')).FORM_INITIAL_VALUES,
    {
      combine(ceValues, eeValues) {
        return {
          ...ceValues,
          ...eeValues
        };
      },
      defaultValue: FORM_INITIAL_VALUES
    }
  );
  const MagicLink = useEnterprise(
    MagicLinkCE,
    async () => (await import('./MagicLinkEE-C0pFTJbL.mjs')).MagicLinkEE
  );
  const [createUser] = useCreateUserMutation();
  const headerTitle = formatMessage({
    id: "Settings.permissions.users.create",
    defaultMessage: "Invite new user"
  });
  const handleSubmit = async (body, { setErrors }) => {
    const res = await createUser({
      ...body,
      roles: body.roles ?? []
    });
    if ("data" in res) {
      if (res.data.registrationToken) {
        setRegistrationToken(res.data.registrationToken);
      }
      goNext();
    } else {
      toggleNotification({
        type: "danger",
        message: formatAPIError(res.error)
      });
      if (isBaseQueryError(res.error) && res.error.name === "ValidationError") {
        setErrors(formatValidationErrors(res.error));
      }
    }
  };
  const goNext = () => {
    if (next) {
      setStep(next);
    } else {
      onToggle();
    }
  };
  const { buttonSubmitLabel, isDisabled, next } = STEPPER[currentStep];
  if (!MagicLink) {
    return null;
  }
  return /* @__PURE__ */ jsx(Modal.Root, { defaultOpen: true, onOpenChange: onToggle, children: /* @__PURE__ */ jsxs(Modal.Content, { children: [
    /* @__PURE__ */ jsx(Modal.Header, { children: /* @__PURE__ */ jsx(Breadcrumbs, { label: headerTitle, children: /* @__PURE__ */ jsx(Crumb, { isCurrent: true, children: headerTitle }) }) }),
    /* @__PURE__ */ jsx(
      Form,
      {
        method: currentStep === "create" ? "POST" : "PUT",
        initialValues: initialValues ?? {},
        onSubmit: handleSubmit,
        validationSchema: FORM_SCHEMA,
        children: ({ isSubmitting }) => {
          return /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(Modal.Body, { children: /* @__PURE__ */ jsxs(Flex, { direction: "column", alignItems: "stretch", gap: 6, children: [
              currentStep !== "create" && /* @__PURE__ */ jsx(MagicLink, { registrationToken }),
              /* @__PURE__ */ jsxs(Box, { children: [
                /* @__PURE__ */ jsx(Typography, { variant: "beta", tag: "h2", children: formatMessage({
                  id: "app.components.Users.ModalCreateBody.block-title.details",
                  defaultMessage: "User details"
                }) }),
                /* @__PURE__ */ jsx(Box, { paddingTop: 4, children: /* @__PURE__ */ jsx(Flex, { direction: "column", alignItems: "stretch", gap: 1, children: /* @__PURE__ */ jsx(Grid.Root, { gap: 5, children: FORM_LAYOUT.map((row) => {
                  return row.map(({ size, ...field }) => {
                    return /* @__PURE__ */ jsx(
                      Grid.Item,
                      {
                        col: size,
                        direction: "column",
                        alignItems: "stretch",
                        children: /* @__PURE__ */ jsx(
                          MemoizedInputRenderer,
                          {
                            ...field,
                            disabled: isDisabled,
                            label: formatMessage(field.label),
                            placeholder: formatMessage(field.placeholder)
                          }
                        )
                      },
                      field.name
                    );
                  });
                }) }) }) })
              ] }),
              /* @__PURE__ */ jsxs(Box, { children: [
                /* @__PURE__ */ jsx(Typography, { variant: "beta", tag: "h2", children: formatMessage({
                  id: "global.roles",
                  defaultMessage: "User's role"
                }) }),
                /* @__PURE__ */ jsx(Box, { paddingTop: 4, children: /* @__PURE__ */ jsxs(Grid.Root, { gap: 5, children: [
                  /* @__PURE__ */ jsx(Grid.Item, { col: 6, xs: 12, direction: "column", alignItems: "stretch", children: /* @__PURE__ */ jsx(SelectRoles, { disabled: isDisabled }) }),
                  roleLayout.map((row) => {
                    return row.map(({ size, ...field }) => {
                      return /* @__PURE__ */ jsx(
                        Grid.Item,
                        {
                          col: size,
                          direction: "column",
                          alignItems: "stretch",
                          children: /* @__PURE__ */ jsx(
                            MemoizedInputRenderer,
                            {
                              ...field,
                              disabled: isDisabled,
                              label: formatMessage(field.label),
                              placeholder: field.placeholder ? formatMessage(field.placeholder) : void 0,
                              hint: field.hint ? formatMessage(field.hint) : void 0
                            }
                          )
                        },
                        field.name
                      );
                    });
                  })
                ] }) })
              ] })
            ] }) }),
            /* @__PURE__ */ jsxs(Modal.Footer, { children: [
              /* @__PURE__ */ jsx(Button, { variant: "tertiary", onClick: onToggle, type: "button", children: formatMessage({
                id: "app.components.Button.cancel",
                defaultMessage: "Cancel"
              }) }),
              currentStep === "create" ? /* @__PURE__ */ jsx(Button, { type: "submit", loading: isSubmitting, children: formatMessage(buttonSubmitLabel) }) : /* @__PURE__ */ jsx(Button, { type: "button", loading: isSubmitting, onClick: onToggle, children: formatMessage(buttonSubmitLabel) })
            ] })
          ] });
        }
      }
    )
  ] }) });
};
const FORM_INITIAL_VALUES = {
  firstname: "",
  lastname: "",
  email: "",
  roles: []
};
const ROLE_LAYOUT = [];
const FORM_LAYOUT = [
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
    }
  ]
];
const FORM_SCHEMA = yup.object().shape({
  firstname: yup.string().trim().required({
    id: errorsTrads.required.id,
    defaultMessage: "This field is required"
  }).nullable(),
  lastname: yup.string(),
  email: yup.string().email(errorsTrads.email).required({
    id: errorsTrads.required.id,
    defaultMessage: "This field is required"
  }).nullable(),
  roles: yup.array().min(1, {
    id: errorsTrads.required.id,
    defaultMessage: "This field is required"
  }).required({
    id: errorsTrads.required.id,
    defaultMessage: "This field is required"
  })
});
const STEPPER = {
  create: {
    buttonSubmitLabel: {
      id: "app.containers.Users.ModalForm.footer.button-success",
      defaultMessage: "Invite user"
    },
    isDisabled: false,
    next: "magic-link"
  },
  "magic-link": {
    buttonSubmitLabel: { id: "global.finish", defaultMessage: "Finish" },
    isDisabled: true,
    next: null
  }
};

const ListPageCE = () => {
  const { _unstableFormatAPIError: formatAPIError } = useAPIErrorHandler();
  const [isModalOpened, setIsModalOpen] = React.useState(false);
  const permissions = useTypedSelector((state) => state.admin_app.permissions);
  const {
    allowedActions: { canCreate, canDelete, canRead }
  } = useRBAC(permissions.settings?.users);
  const navigate = useNavigate();
  const { toggleNotification } = useNotification();
  const { formatMessage } = useIntl();
  const { search } = useLocation();
  const [showDeleteConfirmation, setShowDeleteConfirmation] = React.useState(false);
  const [idsToDelete, setIdsToDelete] = React.useState([]);
  const { data, isError, isLoading } = useAdminUsers(qs.parse(search, { ignoreQueryPrefix: true }));
  const { pagination, users = [] } = data ?? {};
  const CreateAction = useEnterprise(
    CreateActionCE,
    async () => (await import('./CreateActionEE-JUvyeAny.mjs')).CreateActionEE
  );
  const headers = TABLE_HEADERS.map((header) => ({
    ...header,
    label: formatMessage(header.label)
  }));
  const title = formatMessage({
    id: "global.users",
    defaultMessage: "Users"
  });
  const handleToggle = () => {
    setIsModalOpen((prev) => !prev);
  };
  const [deleteAll] = useDeleteManyUsersMutation();
  const handleDeleteAll = async (ids) => {
    try {
      const res = await deleteAll({ ids });
      if ("error" in res) {
        toggleNotification({
          type: "danger",
          message: formatAPIError(res.error)
        });
      }
    } catch (err) {
      toggleNotification({
        type: "danger",
        message: formatMessage({
          id: "global.error",
          defaultMessage: "An error occurred"
        })
      });
    }
  };
  const handleRowClick = (id) => () => {
    if (canRead) {
      navigate(id.toString());
    }
  };
  const handleDeleteClick = (id) => async () => {
    setIdsToDelete([id]);
    setShowDeleteConfirmation(true);
  };
  const confirmDelete = async () => {
    await handleDeleteAll(idsToDelete);
    setShowDeleteConfirmation(false);
  };
  if (!CreateAction) {
    return null;
  }
  if (isError) {
    return /* @__PURE__ */ jsx(Page.Error, {});
  }
  return /* @__PURE__ */ jsxs(Page.Main, { "aria-busy": isLoading, children: [
    /* @__PURE__ */ jsx(Page.Title, { children: formatMessage(
      { id: "Settings.PageTitle", defaultMessage: "Settings - {name}" },
      {
        name: "Users"
      }
    ) }),
    /* @__PURE__ */ jsx(
      Layouts.Header,
      {
        primaryAction: canCreate && /* @__PURE__ */ jsx(CreateAction, { onClick: handleToggle }),
        title,
        subtitle: formatMessage({
          id: "Settings.permissions.users.listview.header.subtitle",
          defaultMessage: "All the users who have access to the admin panel"
        })
      }
    ),
    /* @__PURE__ */ jsx(
      Layouts.Action,
      {
        startActions: /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(
            SearchInput,
            {
              label: formatMessage(
                { id: "app.component.search.label", defaultMessage: "Search for {target}" },
                { target: title }
              )
            }
          ),
          /* @__PURE__ */ jsxs(Filters.Root, { options: FILTERS, children: [
            /* @__PURE__ */ jsx(Filters.Trigger, {}),
            /* @__PURE__ */ jsx(Filters.Popover, {}),
            /* @__PURE__ */ jsx(Filters.List, {})
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxs(Layouts.Content, { children: [
      /* @__PURE__ */ jsxs(Table.Root, { rows: users, headers, children: [
        /* @__PURE__ */ jsx(Table.ActionBar, {}),
        /* @__PURE__ */ jsxs(Table.Content, { children: [
          /* @__PURE__ */ jsxs(Table.Head, { children: [
            canDelete ? /* @__PURE__ */ jsx(Table.HeaderCheckboxCell, {}) : null,
            headers.map((header) => /* @__PURE__ */ jsx(Table.HeaderCell, { ...header }, header.name))
          ] }),
          /* @__PURE__ */ jsx(Table.Empty, {}),
          /* @__PURE__ */ jsx(Table.Loading, {}),
          /* @__PURE__ */ jsx(Table.Body, { children: users.map((user) => /* @__PURE__ */ jsxs(
            Table.Row,
            {
              onClick: handleRowClick(user.id),
              cursor: canRead ? "pointer" : "default",
              children: [
                canDelete ? /* @__PURE__ */ jsx(Table.CheckboxCell, { id: user.id }) : null,
                headers.map(({ cellFormatter, name, ...rest }) => {
                  return /* @__PURE__ */ jsx(Table.Cell, { children: typeof cellFormatter === "function" ? cellFormatter(user, { name, ...rest }) : (
                    // @ts-expect-error – name === "roles" has the data value of `AdminRole[]` but the header has a cellFormatter value so this shouldn't be called.
                    /* @__PURE__ */ jsx(Typography, { textColor: "neutral800", children: user[name] || "-" })
                  ) }, name);
                }),
                canRead || canDelete ? /* @__PURE__ */ jsx(Table.Cell, { onClick: (e) => e.stopPropagation(), children: /* @__PURE__ */ jsxs(Flex, { justifyContent: "end", children: [
                  canRead ? /* @__PURE__ */ jsx(
                    IconButton,
                    {
                      tag: NavLink,
                      to: user.id.toString(),
                      label: formatMessage(
                        { id: "app.component.table.edit", defaultMessage: "Edit {target}" },
                        { target: getDisplayName(user) }
                      ),
                      variant: "ghost",
                      children: /* @__PURE__ */ jsx(Pencil, {})
                    }
                  ) : null,
                  canDelete ? /* @__PURE__ */ jsx(
                    IconButton,
                    {
                      onClick: handleDeleteClick(user.id),
                      label: formatMessage(
                        { id: "global.delete-target", defaultMessage: "Delete {target}" },
                        { target: getDisplayName(user) }
                      ),
                      variant: "ghost",
                      children: /* @__PURE__ */ jsx(Trash, {})
                    }
                  ) : null
                ] }) }) : null
              ]
            },
            user.id
          )) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(Pagination.Root, { ...pagination, children: [
        /* @__PURE__ */ jsx(Pagination.PageSize, {}),
        /* @__PURE__ */ jsx(Pagination.Links, {})
      ] })
    ] }),
    isModalOpened && /* @__PURE__ */ jsx(ModalForm, { onToggle: handleToggle }),
    /* @__PURE__ */ jsx(Dialog.Root, { open: showDeleteConfirmation, onOpenChange: setShowDeleteConfirmation, children: /* @__PURE__ */ jsx(ConfirmDialog, { onConfirm: confirmDelete }) })
  ] });
};
const TABLE_HEADERS = [
  {
    name: "firstname",
    label: {
      id: "Settings.permissions.users.firstname",
      defaultMessage: "Firstname"
    },
    sortable: true
  },
  {
    name: "lastname",
    label: {
      id: "Settings.permissions.users.lastname",
      defaultMessage: "Lastname"
    },
    sortable: true
  },
  {
    name: "email",
    label: { id: "Settings.permissions.users.email", defaultMessage: "Email" },
    sortable: true
  },
  {
    name: "roles",
    label: {
      id: "Settings.permissions.users.roles",
      defaultMessage: "Roles"
    },
    sortable: false,
    cellFormatter({ roles }) {
      return /* @__PURE__ */ jsx(Typography, { textColor: "neutral800", children: roles.map((role) => role.name).join(",\n") });
    }
  },
  {
    name: "username",
    label: {
      id: "Settings.permissions.users.username",
      defaultMessage: "Username"
    },
    sortable: true
  },
  {
    name: "isActive",
    label: {
      id: "Settings.permissions.users.user-status",
      defaultMessage: "User status"
    },
    sortable: false,
    cellFormatter({ isActive }) {
      return /* @__PURE__ */ jsx(Flex, { children: /* @__PURE__ */ jsx(
        Status,
        {
          size: "S",
          borderWidth: 0,
          background: "transparent",
          color: "neutral800",
          variant: isActive ? "success" : "danger",
          children: /* @__PURE__ */ jsx(Typography, { children: isActive ? "Active" : "Inactive" })
        }
      ) });
    }
  }
];
const FILTERS = [
  {
    name: "firstname",
    label: "Firstname",
    type: "string"
  },
  {
    name: "lastname",
    label: "Lastname",
    type: "string"
  },
  {
    name: "email",
    label: "Email",
    type: "email"
  },
  {
    name: "username",
    label: "Username",
    type: "string"
  },
  {
    name: "isActive",
    label: "Active user",
    type: "boolean"
  }
];
const ListPage = () => {
  const UsersListPage = useEnterprise(
    ListPageCE,
    async () => (
      // eslint-disable-next-line import/no-cycle
      (await import('./ListPage-CIqkrLQV.mjs')).UserListPageEE
    )
  );
  if (!UsersListPage) {
    return null;
  }
  return /* @__PURE__ */ jsx(UsersListPage, {});
};
const ProtectedListPage = () => {
  const permissions = useTypedSelector((state) => state.admin_app.permissions.settings?.users.read);
  return /* @__PURE__ */ jsx(Page.Protect, { permissions, children: /* @__PURE__ */ jsx(ListPage, {}) });
};

export { ListPage, ListPageCE, ProtectedListPage };
//# sourceMappingURL=ListPage-D98Y1pwO.mjs.map

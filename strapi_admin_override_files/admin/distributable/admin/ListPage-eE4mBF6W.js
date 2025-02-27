'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const jsxRuntime = require('react/jsx-runtime');
const React = require('react');
const designSystem = require('@strapi/design-system');
const icons = require('@strapi/icons');
const qs = require('qs');
const reactIntl = require('react-intl');
const reactRouterDom = require('react-router-dom');
const index = require('./index-UB9JNjeZ.js');
const Theme = require('./Theme-DaGRg2qU.js');
const useEnterprise = require('./useEnterprise-ijNnK53J.js');
const users = require('./users-DaPfjlwf.js');
const yup = require('yup');
const admin = require('./admin-DRnq5SAg.js');
const SelectRoles = require('./SelectRoles-BdEwXyKD.js');

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
const qs__namespace = /*#__PURE__*/_interopNamespace(qs);
const yup__namespace = /*#__PURE__*/_interopNamespace(yup);

const CreateActionCE = React__namespace.forwardRef((props, ref) => {
  const { formatMessage } = reactIntl.useIntl();
  return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { ref, startIcon: /* @__PURE__ */ jsxRuntime.jsx(icons.Mail, {}), size: "S", ...props, children: formatMessage({
    id: "Settings.permissions.users.create",
    defaultMessage: "Invite new user"
  }) });
});

const ModalForm = ({ onToggle }) => {
  const [currentStep, setStep] = React__namespace.useState("create");
  const [registrationToken, setRegistrationToken] = React__namespace.useState("");
  const { formatMessage } = reactIntl.useIntl();
  const { toggleNotification } = Theme.useNotification();
  const {
    _unstableFormatAPIError: formatAPIError,
    _unstableFormatValidationErrors: formatValidationErrors
  } = Theme.useAPIErrorHandler();
  const roleLayout = useEnterprise.useEnterprise(
    ROLE_LAYOUT,
    async () => (await Promise.resolve().then(() => require('./ModalForm-DukjfMMw.js'))).ROLE_LAYOUT,
    {
      combine(ceRoles, eeRoles) {
        return [...ceRoles, ...eeRoles];
      },
      defaultValue: []
    }
  );
  const initialValues = useEnterprise.useEnterprise(
    FORM_INITIAL_VALUES,
    async () => (await Promise.resolve().then(() => require('./ModalForm-DukjfMMw.js'))).FORM_INITIAL_VALUES,
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
  const MagicLink = useEnterprise.useEnterprise(
    SelectRoles.MagicLinkCE,
    async () => (await Promise.resolve().then(() => require('./MagicLinkEE-CcY0596w.js'))).MagicLinkEE
  );
  const [createUser] = index.useCreateUserMutation();
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
      if (admin.isBaseQueryError(res.error) && res.error.name === "ValidationError") {
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
  return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Root, { defaultOpen: true, onOpenChange: onToggle, children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Modal.Content, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Header, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Breadcrumbs, { label: headerTitle, children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Crumb, { isCurrent: true, children: headerTitle }) }) }),
    /* @__PURE__ */ jsxRuntime.jsx(
      index.Form,
      {
        method: currentStep === "create" ? "POST" : "PUT",
        initialValues: initialValues ?? {},
        onSubmit: handleSubmit,
        validationSchema: FORM_SCHEMA,
        children: ({ isSubmitting }) => {
          return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Body, { children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "column", alignItems: "stretch", gap: 6, children: [
              currentStep !== "create" && /* @__PURE__ */ jsxRuntime.jsx(MagicLink, { registrationToken }),
              /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Box, { children: [
                /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "beta", tag: "h2", children: formatMessage({
                  id: "app.components.Users.ModalCreateBody.block-title.details",
                  defaultMessage: "User details"
                }) }),
                /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { paddingTop: 4, children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Flex, { direction: "column", alignItems: "stretch", gap: 1, children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Grid.Root, { gap: 5, children: FORM_LAYOUT.map((row) => {
                  return row.map(({ size, ...field }) => {
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
              /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Box, { children: [
                /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "beta", tag: "h2", children: formatMessage({
                  id: "global.roles",
                  defaultMessage: "User's role"
                }) }),
                /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { paddingTop: 4, children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Grid.Root, { gap: 5, children: [
                  /* @__PURE__ */ jsxRuntime.jsx(designSystem.Grid.Item, { col: 6, xs: 12, direction: "column", alignItems: "stretch", children: /* @__PURE__ */ jsxRuntime.jsx(SelectRoles.SelectRoles, { disabled: isDisabled }) }),
                  roleLayout.map((row) => {
                    return row.map(({ size, ...field }) => {
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
            /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Modal.Footer, { children: [
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { variant: "tertiary", onClick: onToggle, type: "button", children: formatMessage({
                id: "app.components.Button.cancel",
                defaultMessage: "Cancel"
              }) }),
              currentStep === "create" ? /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { type: "submit", loading: isSubmitting, children: formatMessage(buttonSubmitLabel) }) : /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { type: "button", loading: isSubmitting, onClick: onToggle, children: formatMessage(buttonSubmitLabel) })
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
const FORM_SCHEMA = yup__namespace.object().shape({
  firstname: yup__namespace.string().trim().required({
    id: index.errorsTrads.required.id,
    defaultMessage: "This field is required"
  }).nullable(),
  lastname: yup__namespace.string(),
  email: yup__namespace.string().email(index.errorsTrads.email).required({
    id: index.errorsTrads.required.id,
    defaultMessage: "This field is required"
  }).nullable(),
  roles: yup__namespace.array().min(1, {
    id: index.errorsTrads.required.id,
    defaultMessage: "This field is required"
  }).required({
    id: index.errorsTrads.required.id,
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
  const { _unstableFormatAPIError: formatAPIError } = Theme.useAPIErrorHandler();
  const [isModalOpened, setIsModalOpen] = React__namespace.useState(false);
  const permissions = Theme.useTypedSelector((state) => state.admin_app.permissions);
  const {
    allowedActions: { canCreate, canDelete, canRead }
  } = Theme.useRBAC(permissions.settings?.users);
  const navigate = reactRouterDom.useNavigate();
  const { toggleNotification } = Theme.useNotification();
  const { formatMessage } = reactIntl.useIntl();
  const { search } = reactRouterDom.useLocation();
  const [showDeleteConfirmation, setShowDeleteConfirmation] = React__namespace.useState(false);
  const [idsToDelete, setIdsToDelete] = React__namespace.useState([]);
  const { data, isError, isLoading } = index.useAdminUsers(qs__namespace.parse(search, { ignoreQueryPrefix: true }));
  const { pagination, users: users$1 = [] } = data ?? {};
  const CreateAction = useEnterprise.useEnterprise(
    CreateActionCE,
    async () => (await Promise.resolve().then(() => require('./CreateActionEE-CRTFGenF.js'))).CreateActionEE
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
  const [deleteAll] = index.useDeleteManyUsersMutation();
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
    return /* @__PURE__ */ jsxRuntime.jsx(Theme.Page.Error, {});
  }
  return /* @__PURE__ */ jsxRuntime.jsxs(Theme.Page.Main, { "aria-busy": isLoading, children: [
    /* @__PURE__ */ jsxRuntime.jsx(Theme.Page.Title, { children: formatMessage(
      { id: "Settings.PageTitle", defaultMessage: "Settings - {name}" },
      {
        name: "Users"
      }
    ) }),
    /* @__PURE__ */ jsxRuntime.jsx(
      index.Layouts.Header,
      {
        primaryAction: canCreate && /* @__PURE__ */ jsxRuntime.jsx(CreateAction, { onClick: handleToggle }),
        title,
        subtitle: formatMessage({
          id: "Settings.permissions.users.listview.header.subtitle",
          defaultMessage: "All the users who have access to the admin panel"
        })
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx(
      index.Layouts.Action,
      {
        startActions: /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
          /* @__PURE__ */ jsxRuntime.jsx(
            index.SearchInput,
            {
              label: formatMessage(
                { id: "app.component.search.label", defaultMessage: "Search for {target}" },
                { target: title }
              )
            }
          ),
          /* @__PURE__ */ jsxRuntime.jsxs(index.Filters.Root, { options: FILTERS, children: [
            /* @__PURE__ */ jsxRuntime.jsx(index.Filters.Trigger, {}),
            /* @__PURE__ */ jsxRuntime.jsx(index.Filters.Popover, {}),
            /* @__PURE__ */ jsxRuntime.jsx(index.Filters.List, {})
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsxs(index.Layouts.Content, { children: [
      /* @__PURE__ */ jsxRuntime.jsxs(index.Table.Root, { rows: users$1, headers, children: [
        /* @__PURE__ */ jsxRuntime.jsx(index.Table.ActionBar, {}),
        /* @__PURE__ */ jsxRuntime.jsxs(index.Table.Content, { children: [
          /* @__PURE__ */ jsxRuntime.jsxs(index.Table.Head, { children: [
            canDelete ? /* @__PURE__ */ jsxRuntime.jsx(index.Table.HeaderCheckboxCell, {}) : null,
            headers.map((header) => /* @__PURE__ */ jsxRuntime.jsx(index.Table.HeaderCell, { ...header }, header.name))
          ] }),
          /* @__PURE__ */ jsxRuntime.jsx(index.Table.Empty, {}),
          /* @__PURE__ */ jsxRuntime.jsx(index.Table.Loading, {}),
          /* @__PURE__ */ jsxRuntime.jsx(index.Table.Body, { children: users$1.map((user) => /* @__PURE__ */ jsxRuntime.jsxs(
            index.Table.Row,
            {
              onClick: handleRowClick(user.id),
              cursor: canRead ? "pointer" : "default",
              children: [
                canDelete ? /* @__PURE__ */ jsxRuntime.jsx(index.Table.CheckboxCell, { id: user.id }) : null,
                headers.map(({ cellFormatter, name, ...rest }) => {
                  return /* @__PURE__ */ jsxRuntime.jsx(index.Table.Cell, { children: typeof cellFormatter === "function" ? cellFormatter(user, { name, ...rest }) : (
                    // @ts-expect-error – name === "roles" has the data value of `AdminRole[]` but the header has a cellFormatter value so this shouldn't be called.
                    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { textColor: "neutral800", children: user[name] || "-" })
                  ) }, name);
                }),
                canRead || canDelete ? /* @__PURE__ */ jsxRuntime.jsx(index.Table.Cell, { onClick: (e) => e.stopPropagation(), children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { justifyContent: "end", children: [
                  canRead ? /* @__PURE__ */ jsxRuntime.jsx(
                    designSystem.IconButton,
                    {
                      tag: reactRouterDom.NavLink,
                      to: user.id.toString(),
                      label: formatMessage(
                        { id: "app.component.table.edit", defaultMessage: "Edit {target}" },
                        { target: users.getDisplayName(user) }
                      ),
                      variant: "ghost",
                      children: /* @__PURE__ */ jsxRuntime.jsx(icons.Pencil, {})
                    }
                  ) : null,
                  canDelete ? /* @__PURE__ */ jsxRuntime.jsx(
                    designSystem.IconButton,
                    {
                      onClick: handleDeleteClick(user.id),
                      label: formatMessage(
                        { id: "global.delete-target", defaultMessage: "Delete {target}" },
                        { target: users.getDisplayName(user) }
                      ),
                      variant: "ghost",
                      children: /* @__PURE__ */ jsxRuntime.jsx(icons.Trash, {})
                    }
                  ) : null
                ] }) }) : null
              ]
            },
            user.id
          )) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs(index.Pagination.Root, { ...pagination, children: [
        /* @__PURE__ */ jsxRuntime.jsx(index.Pagination.PageSize, {}),
        /* @__PURE__ */ jsxRuntime.jsx(index.Pagination.Links, {})
      ] })
    ] }),
    isModalOpened && /* @__PURE__ */ jsxRuntime.jsx(ModalForm, { onToggle: handleToggle }),
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Dialog.Root, { open: showDeleteConfirmation, onOpenChange: setShowDeleteConfirmation, children: /* @__PURE__ */ jsxRuntime.jsx(index.ConfirmDialog, { onConfirm: confirmDelete }) })
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
      return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { textColor: "neutral800", children: roles.map((role) => role.name).join(",\n") });
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
      return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Flex, { children: /* @__PURE__ */ jsxRuntime.jsx(
        designSystem.Status,
        {
          size: "S",
          borderWidth: 0,
          background: "transparent",
          color: "neutral800",
          variant: isActive ? "success" : "danger",
          children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { children: isActive ? "Active" : "Inactive" })
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
  const UsersListPage = useEnterprise.useEnterprise(
    ListPageCE,
    async () => (
      // eslint-disable-next-line import/no-cycle
      (await Promise.resolve().then(() => require('./ListPage-BSTROGyL.js'))).UserListPageEE
    )
  );
  if (!UsersListPage) {
    return null;
  }
  return /* @__PURE__ */ jsxRuntime.jsx(UsersListPage, {});
};
const ProtectedListPage = () => {
  const permissions = Theme.useTypedSelector((state) => state.admin_app.permissions.settings?.users.read);
  return /* @__PURE__ */ jsxRuntime.jsx(Theme.Page.Protect, { permissions, children: /* @__PURE__ */ jsxRuntime.jsx(ListPage, {}) });
};

exports.ListPage = ListPage;
exports.ListPageCE = ListPageCE;
exports.ProtectedListPage = ProtectedListPage;
//# sourceMappingURL=ListPage-eE4mBF6W.js.map

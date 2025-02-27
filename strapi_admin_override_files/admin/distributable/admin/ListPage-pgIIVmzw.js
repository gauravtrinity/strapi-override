'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const jsxRuntime = require('react/jsx-runtime');
const React = require('react');
const designSystem = require('@strapi/design-system');
const icons = require('@strapi/icons');
const immer = require('immer');
const reactIntl = require('react-intl');
const reactRouterDom = require('react-router-dom');
const index = require('./index-UB9JNjeZ.js');
const Theme = require('./Theme-DaGRg2qU.js');
const useAdminRoles = require('./useAdminRoles-yQ7wdRBn.js');
const selectors = require('./selectors-BKYO5J5S.js');
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

const React__namespace = /*#__PURE__*/_interopNamespace(React);

const RoleRow = ({
  id,
  name,
  description,
  usersCount,
  icons,
  rowIndex,
  canUpdate,
  cursor
}) => {
  const { formatMessage } = reactIntl.useIntl();
  const [, editObject] = icons;
  const usersCountText = formatMessage(
    {
      id: `Roles.RoleRow.user-count`,
      defaultMessage: "{number, plural, =0 {#  user} one {#  user} other {# users}}"
    },
    { number: usersCount }
  );
  return /* @__PURE__ */ jsxRuntime.jsxs(
    designSystem.Tr,
    {
      cursor,
      "aria-rowindex": rowIndex,
      onClick: canUpdate ? editObject.onClick : void 0,
      children: [
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Td, { maxWidth: `13rem`, children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { ellipsis: true, textColor: "neutral800", children: name }) }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Td, { maxWidth: `25rem`, children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { ellipsis: true, textColor: "neutral800", children: description }) }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Td, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { textColor: "neutral800", children: usersCountText }) }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Td, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Flex, { justifyContent: "flex-end", onClick: (e) => e.stopPropagation(), children: icons.map((icon, i) => {
          if (icon) {
            return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { paddingLeft: i === 0 ? 0 : 1, children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.IconButton, { ...icon, variant: "ghost" }) }, icon.label);
          }
          return null;
        }) }) })
      ]
    },
    id
  );
};

const ListPage = () => {
  const { formatMessage } = reactIntl.useIntl();
  const permissions = Theme.useTypedSelector(selectors.selectAdminPermissions);
  const { formatAPIError } = Theme.useAPIErrorHandler();
  const { toggleNotification } = Theme.useNotification();
  const [isWarningDeleteAllOpened, setIsWarningDeleteAllOpenend] = React__namespace.useState(false);
  const [{ query }] = Theme.useQueryParams();
  const {
    isLoading: isLoadingForPermissions,
    allowedActions: { canCreate, canDelete, canRead, canUpdate }
  } = Theme.useRBAC(permissions.settings?.roles);
  const { roles, refetch: refetchRoles } = useAdminRoles.useAdminRoles(
    { filters: query?._q ? { name: { $containsi: query._q } } : void 0 },
    {
      refetchOnMountOrArgChange: true,
      skip: isLoadingForPermissions || !canRead
    }
  );
  const navigate = reactRouterDom.useNavigate();
  const [{ roleToDelete }, dispatch] = React__namespace.useReducer(reducer, initialState);
  const { post } = index.useFetchClient();
  const handleDeleteData = async () => {
    try {
      dispatch({
        type: "ON_REMOVE_ROLES"
      });
      await post("/admin/roles/batch-delete", {
        ids: [roleToDelete]
      });
      await refetchRoles();
      dispatch({
        type: "RESET_DATA_TO_DELETE"
      });
    } catch (error) {
      if (admin.isFetchError(error)) {
        toggleNotification({
          type: "danger",
          message: formatAPIError(error)
        });
      }
    }
  };
  const handleNewRoleClick = () => navigate("new");
  const handleToggleModal = () => setIsWarningDeleteAllOpenend((prev) => !prev);
  const handleClickDelete = (role) => (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (role.usersCount) {
      toggleNotification({
        type: "info",
        message: formatMessage({ id: "Roles.ListPage.notification.delete-not-allowed" })
      });
    } else {
      dispatch({
        type: "SET_ROLE_TO_DELETE",
        id: role.id
      });
      handleToggleModal();
    }
  };
  const handleClickDuplicate = (role) => (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`duplicate/${role.id}`);
  };
  const rowCount = roles.length + 1;
  const colCount = 6;
  if (isLoadingForPermissions) {
    return /* @__PURE__ */ jsxRuntime.jsx(Theme.Page.Loading, {});
  }
  return /* @__PURE__ */ jsxRuntime.jsxs(Theme.Page.Main, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(Theme.Page.Title, { children: formatMessage(
      { id: "Settings.PageTitle", defaultMessage: "Settings - {name}" },
      {
        name: "Roles"
      }
    ) }),
    /* @__PURE__ */ jsxRuntime.jsx(
      index.Layouts.Header,
      {
        primaryAction: canCreate ? /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { onClick: handleNewRoleClick, startIcon: /* @__PURE__ */ jsxRuntime.jsx(icons.Plus, {}), size: "S", children: formatMessage({
          id: "Settings.roles.list.button.add",
          defaultMessage: "Add new role"
        }) }) : null,
        title: formatMessage({
          id: "global.roles",
          defaultMessage: "roles"
        }),
        subtitle: formatMessage({
          id: "Settings.roles.list.description",
          defaultMessage: "List of roles"
        })
      }
    ),
    canRead && /* @__PURE__ */ jsxRuntime.jsx(
      index.Layouts.Action,
      {
        startActions: /* @__PURE__ */ jsxRuntime.jsx(
          index.SearchInput,
          {
            label: formatMessage(
              { id: "app.component.search.label", defaultMessage: "Search for {target}" },
              {
                target: formatMessage({
                  id: "global.roles",
                  defaultMessage: "roles"
                })
              }
            )
          }
        )
      }
    ),
    canRead && /* @__PURE__ */ jsxRuntime.jsx(index.Layouts.Content, { children: /* @__PURE__ */ jsxRuntime.jsxs(
      designSystem.Table,
      {
        colCount,
        rowCount,
        footer: canCreate ? /* @__PURE__ */ jsxRuntime.jsx(designSystem.TFooter, { cursor: "pointer", onClick: handleNewRoleClick, icon: /* @__PURE__ */ jsxRuntime.jsx(icons.Plus, {}), children: formatMessage({
          id: "Settings.roles.list.button.add",
          defaultMessage: "Add new role"
        }) }) : null,
        children: [
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Thead, { children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Tr, { "aria-rowindex": 1, children: [
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.Th, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "sigma", textColor: "neutral600", children: formatMessage({
              id: "global.name",
              defaultMessage: "Name"
            }) }) }),
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.Th, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "sigma", textColor: "neutral600", children: formatMessage({
              id: "global.description",
              defaultMessage: "Description"
            }) }) }),
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.Th, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "sigma", textColor: "neutral600", children: formatMessage({
              id: "global.users",
              defaultMessage: "Users"
            }) }) }),
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.Th, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.VisuallyHidden, { children: formatMessage({
              id: "global.actions",
              defaultMessage: "Actions"
            }) }) })
          ] }) }),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Tbody, { children: roles?.map((role, index) => /* @__PURE__ */ jsxRuntime.jsx(
            RoleRow,
            {
              cursor: "pointer",
              id: role.id,
              name: role.name,
              description: role.description,
              usersCount: role.usersCount,
              icons: [
                canCreate && {
                  onClick: handleClickDuplicate(role),
                  label: formatMessage({
                    id: "app.utils.duplicate",
                    defaultMessage: "Duplicate"
                  }),
                  children: /* @__PURE__ */ jsxRuntime.jsx(icons.Duplicate, {})
                },
                canUpdate && {
                  onClick: () => navigate(role.id.toString()),
                  label: formatMessage({ id: "app.utils.edit", defaultMessage: "Edit" }),
                  children: /* @__PURE__ */ jsxRuntime.jsx(icons.Pencil, {})
                },
                canDelete && {
                  onClick: handleClickDelete(role),
                  label: formatMessage({ id: "global.delete", defaultMessage: "Delete" }),
                  children: /* @__PURE__ */ jsxRuntime.jsx(icons.Trash, {})
                }
              ].filter(Boolean),
              rowIndex: index + 2,
              canUpdate
            },
            role.id
          )) })
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Dialog.Root, { open: isWarningDeleteAllOpened, onOpenChange: handleToggleModal, children: /* @__PURE__ */ jsxRuntime.jsx(index.ConfirmDialog, { onConfirm: handleDeleteData }) })
  ] });
};
const initialState = {
  roleToDelete: null,
  showModalConfirmButtonLoading: false,
  shouldRefetchData: false
};
const reducer = (state, action) => immer.produce(state, (draftState) => {
  switch (action.type) {
    case "ON_REMOVE_ROLES": {
      draftState.showModalConfirmButtonLoading = true;
      break;
    }
    case "ON_REMOVE_ROLES_SUCCEEDED": {
      draftState.shouldRefetchData = true;
      draftState.roleToDelete = null;
      break;
    }
    case "RESET_DATA_TO_DELETE": {
      draftState.shouldRefetchData = false;
      draftState.roleToDelete = null;
      draftState.showModalConfirmButtonLoading = false;
      break;
    }
    case "SET_ROLE_TO_DELETE": {
      draftState.roleToDelete = action.id;
      break;
    }
    default:
      return draftState;
  }
});
const ProtectedListPage = () => {
  const permissions = Theme.useTypedSelector((state) => state.admin_app.permissions.settings?.roles.read);
  return /* @__PURE__ */ jsxRuntime.jsx(Theme.Page.Protect, { permissions, children: /* @__PURE__ */ jsxRuntime.jsx(ListPage, {}) });
};

exports.ListPage = ListPage;
exports.ProtectedListPage = ProtectedListPage;
//# sourceMappingURL=ListPage-pgIIVmzw.js.map

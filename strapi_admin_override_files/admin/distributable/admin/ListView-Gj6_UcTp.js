'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const jsxRuntime = require('react/jsx-runtime');
const React = require('react');
const designSystem = require('@strapi/design-system');
const icons = require('@strapi/icons');
const symbols = require('@strapi/icons/symbols');
const qs = require('qs');
const reactIntl = require('react-intl');
const reactRouterDom = require('react-router-dom');
const Theme = require('./Theme-DaGRg2qU.js');
const index = require('./index-UB9JNjeZ.js');
const useOnce = require('./useOnce-C7EQufL3.js');
const apiTokens = require('./apiTokens-rbJHW5Y2.js');
const constants = require('./constants-DF68OPrs.js');
const Table = require('./Table-CX3reD9w.js');

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

const TABLE_HEADERS = [
  {
    name: "name",
    label: {
      id: "Settings.apiTokens.ListView.headers.name",
      defaultMessage: "Name"
    },
    sortable: true
  },
  {
    name: "description",
    label: {
      id: "Settings.apiTokens.ListView.headers.description",
      defaultMessage: "Description"
    },
    sortable: false
  },
  {
    name: "createdAt",
    label: {
      id: "Settings.apiTokens.ListView.headers.createdAt",
      defaultMessage: "Created at"
    },
    sortable: false
  },
  {
    name: "lastUsedAt",
    label: {
      id: "Settings.apiTokens.ListView.headers.lastUsedAt",
      defaultMessage: "Last used"
    },
    sortable: false
  }
];
const ListView = () => {
  const { formatMessage } = reactIntl.useIntl();
  const { toggleNotification } = Theme.useNotification();
  const permissions = Theme.useTypedSelector(
    (state) => state.admin_app.permissions.settings?.["api-tokens"]
  );
  const {
    allowedActions: { canRead, canCreate, canDelete, canUpdate }
  } = Theme.useRBAC(permissions);
  const navigate = reactRouterDom.useNavigate();
  const { trackUsage } = Theme.useTracking();
  const startSection = Theme.useGuidedTour("ListView", (state) => state.startSection);
  const { _unstableFormatAPIError: formatAPIError } = Theme.useAPIErrorHandler();
  React__namespace.useEffect(() => {
    startSection("apiTokens");
  }, [startSection]);
  React__namespace.useEffect(() => {
    navigate({ search: qs__namespace.stringify({ sort: "name:ASC" }, { encode: false }) });
  }, [navigate]);
  const headers = TABLE_HEADERS.map((header) => ({
    ...header,
    label: formatMessage(header.label)
  }));
  useOnce.useOnce(() => {
    trackUsage("willAccessTokenList", {
      tokenType: constants.API_TOKEN_TYPE
    });
  });
  const { data: apiTokens$1 = [], isLoading, error } = apiTokens.useGetAPITokensQuery();
  React__namespace.useEffect(() => {
    if (error) {
      toggleNotification({
        type: "danger",
        message: formatAPIError(error)
      });
    }
  }, [error, formatAPIError, toggleNotification]);
  React__namespace.useEffect(() => {
    trackUsage("didAccessTokenList", { number: apiTokens$1.length, tokenType: constants.API_TOKEN_TYPE });
  }, [apiTokens$1, trackUsage]);
  const [deleteToken] = apiTokens.useDeleteAPITokenMutation();
  const handleDelete = async (id) => {
    try {
      const res = await deleteToken(id);
      if ("error" in res) {
        toggleNotification({
          type: "danger",
          message: formatAPIError(res.error)
        });
        return;
      }
      trackUsage("didDeleteToken");
    } catch {
      toggleNotification({
        type: "danger",
        message: formatMessage({
          id: "notification.error",
          defaultMessage: "Something went wrong"
        })
      });
    }
  };
  return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(Theme.Page.Title, { children: formatMessage(
      { id: "Settings.PageTitle", defaultMessage: "Settings - {name}" },
      { name: "API Tokens" }
    ) }),
    /* @__PURE__ */ jsxRuntime.jsx(
      index.Layouts.Header,
      {
        title: formatMessage({ id: "Settings.apiTokens.title", defaultMessage: "API Tokens" }),
        subtitle: formatMessage({
          id: "Settings.apiTokens.description",
          defaultMessage: "List of generated tokens to consume the API"
        }),
        primaryAction: canCreate && /* @__PURE__ */ jsxRuntime.jsx(
          designSystem.LinkButton,
          {
            tag: reactRouterDom.Link,
            "data-testid": "create-api-token-button",
            startIcon: /* @__PURE__ */ jsxRuntime.jsx(icons.Plus, {}),
            size: "S",
            onClick: () => trackUsage("willAddTokenFromList", {
              tokenType: constants.API_TOKEN_TYPE
            }),
            to: "/settings/api-tokens/create",
            children: formatMessage({
              id: "Settings.apiTokens.create",
              defaultMessage: "Create new API Token"
            })
          }
        )
      }
    ),
    !canRead ? /* @__PURE__ */ jsxRuntime.jsx(Theme.Page.NoPermissions, {}) : /* @__PURE__ */ jsxRuntime.jsx(Theme.Page.Main, { "aria-busy": isLoading, children: /* @__PURE__ */ jsxRuntime.jsxs(index.Layouts.Content, { children: [
      apiTokens$1.length > 0 && /* @__PURE__ */ jsxRuntime.jsx(
        Table.Table,
        {
          permissions: { canRead, canDelete, canUpdate },
          headers,
          isLoading,
          onConfirmDelete: handleDelete,
          tokens: apiTokens$1,
          tokenType: constants.API_TOKEN_TYPE
        }
      ),
      canCreate && apiTokens$1.length === 0 ? /* @__PURE__ */ jsxRuntime.jsx(
        designSystem.EmptyStateLayout,
        {
          icon: /* @__PURE__ */ jsxRuntime.jsx(symbols.EmptyDocuments, { width: "16rem" }),
          content: formatMessage({
            id: "Settings.apiTokens.addFirstToken",
            defaultMessage: "Add your first API Token"
          }),
          action: /* @__PURE__ */ jsxRuntime.jsx(
            designSystem.LinkButton,
            {
              tag: reactRouterDom.Link,
              variant: "secondary",
              startIcon: /* @__PURE__ */ jsxRuntime.jsx(icons.Plus, {}),
              to: "/settings/api-tokens/create",
              children: formatMessage({
                id: "Settings.apiTokens.addNewToken",
                defaultMessage: "Add new API Token"
              })
            }
          )
        }
      ) : null,
      !canCreate && apiTokens$1.length === 0 ? /* @__PURE__ */ jsxRuntime.jsx(
        designSystem.EmptyStateLayout,
        {
          icon: /* @__PURE__ */ jsxRuntime.jsx(symbols.EmptyDocuments, { width: "16rem" }),
          content: formatMessage({
            id: "Settings.apiTokens.emptyStateLayout",
            defaultMessage: "You don’t have any content yet..."
          })
        }
      ) : null
    ] }) })
  ] });
};
const ProtectedListView = () => {
  const permissions = Theme.useTypedSelector(
    (state) => state.admin_app.permissions.settings?.["api-tokens"].main
  );
  return /* @__PURE__ */ jsxRuntime.jsx(Theme.Page.Protect, { permissions, children: /* @__PURE__ */ jsxRuntime.jsx(ListView, {}) });
};

exports.ListView = ListView;
exports.ProtectedListView = ProtectedListView;
//# sourceMappingURL=ListView-Gj6_UcTp.js.map

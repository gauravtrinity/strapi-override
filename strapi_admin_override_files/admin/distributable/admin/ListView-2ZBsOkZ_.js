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
const index = require('./index-UB9JNjeZ.js');
const Theme = require('./Theme-DaGRg2qU.js');
const useOnce = require('./useOnce-C7EQufL3.js');
const transferTokens = require('./transferTokens-AcbwoJPr.js');
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

const tableHeaders = [
  {
    name: "name",
    label: {
      id: "Settings.tokens.ListView.headers.name",
      defaultMessage: "Name"
    },
    sortable: true
  },
  {
    name: "description",
    label: {
      id: "Settings.tokens.ListView.headers.description",
      defaultMessage: "Description"
    },
    sortable: false
  },
  {
    name: "createdAt",
    label: {
      id: "Settings.tokens.ListView.headers.createdAt",
      defaultMessage: "Created at"
    },
    sortable: false
  },
  {
    name: "lastUsedAt",
    label: {
      id: "Settings.tokens.ListView.headers.lastUsedAt",
      defaultMessage: "Last used"
    },
    sortable: false
  }
];
const ListView = () => {
  const { formatMessage } = reactIntl.useIntl();
  const { toggleNotification } = Theme.useNotification();
  const permissions = Theme.useTypedSelector(
    (state) => state.admin_app.permissions.settings?.["transfer-tokens"]
  );
  const {
    isLoading: isLoadingRBAC,
    allowedActions: { canCreate, canDelete, canUpdate, canRead }
  } = Theme.useRBAC(permissions);
  const navigate = reactRouterDom.useNavigate();
  const { trackUsage } = Theme.useTracking();
  const { _unstableFormatAPIError: formatAPIError } = Theme.useAPIErrorHandler();
  React__namespace.useEffect(() => {
    navigate({ search: qs__namespace.stringify({ sort: "name:ASC" }, { encode: false }) });
  }, [navigate]);
  useOnce.useOnce(() => {
    trackUsage("willAccessTokenList", {
      tokenType: constants.TRANSFER_TOKEN_TYPE
    });
  });
  const headers = tableHeaders.map((header) => ({
    ...header,
    label: formatMessage(header.label)
  }));
  const {
    data: transferTokens$1 = [],
    isLoading: isLoadingTokens,
    error
  } = transferTokens.useGetTransferTokensQuery(void 0, {
    skip: !canRead
  });
  React__namespace.useEffect(() => {
    if (transferTokens$1) {
      trackUsage("didAccessTokenList", {
        number: transferTokens$1.length,
        tokenType: constants.TRANSFER_TOKEN_TYPE
      });
    }
  }, [trackUsage, transferTokens$1]);
  React__namespace.useEffect(() => {
    if (error) {
      toggleNotification({
        type: "danger",
        message: formatAPIError(error)
      });
    }
  }, [error, formatAPIError, toggleNotification]);
  const [deleteToken] = transferTokens.useDeleteTransferTokenMutation();
  const handleDelete = async (id) => {
    try {
      const res = await deleteToken(id);
      if ("error" in res) {
        toggleNotification({
          type: "danger",
          message: formatAPIError(res.error)
        });
      }
    } catch {
      toggleNotification({
        type: "danger",
        message: formatMessage({ id: "notification.error", defaultMessage: "An error occured" })
      });
    }
  };
  const isLoading = isLoadingTokens || isLoadingRBAC;
  return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(Theme.Page.Title, { children: formatMessage(
      { id: "Settings.PageTitle", defaultMessage: "Settings - {name}" },
      {
        name: "Transfer Tokens"
      }
    ) }),
    /* @__PURE__ */ jsxRuntime.jsx(
      index.Layouts.Header,
      {
        title: formatMessage({
          id: "Settings.transferTokens.title",
          defaultMessage: "Transfer Tokens"
        }),
        subtitle: formatMessage({
          id: "Settings.transferTokens.description",
          defaultMessage: '"List of generated transfer tokens"'
          // TODO change this message
        }),
        primaryAction: canCreate ? /* @__PURE__ */ jsxRuntime.jsx(
          designSystem.LinkButton,
          {
            role: "button",
            tag: reactRouterDom.Link,
            "data-testid": "create-transfer-token-button",
            startIcon: /* @__PURE__ */ jsxRuntime.jsx(icons.Plus, {}),
            size: "S",
            onClick: () => trackUsage("willAddTokenFromList", {
              tokenType: constants.TRANSFER_TOKEN_TYPE
            }),
            to: "/settings/transfer-tokens/create",
            children: formatMessage({
              id: "Settings.transferTokens.create",
              defaultMessage: "Create new Transfer Token"
            })
          }
        ) : void 0
      }
    ),
    !canRead ? /* @__PURE__ */ jsxRuntime.jsx(Theme.Page.NoPermissions, {}) : /* @__PURE__ */ jsxRuntime.jsx(Theme.Page.Main, { "aria-busy": isLoading, children: /* @__PURE__ */ jsxRuntime.jsxs(index.Layouts.Content, { children: [
      transferTokens$1.length > 0 && /* @__PURE__ */ jsxRuntime.jsx(
        Table.Table,
        {
          permissions: { canRead, canDelete, canUpdate },
          headers,
          isLoading,
          onConfirmDelete: handleDelete,
          tokens: transferTokens$1,
          tokenType: constants.TRANSFER_TOKEN_TYPE
        }
      ),
      canCreate && transferTokens$1.length === 0 ? /* @__PURE__ */ jsxRuntime.jsx(
        designSystem.EmptyStateLayout,
        {
          action: /* @__PURE__ */ jsxRuntime.jsx(
            designSystem.LinkButton,
            {
              tag: reactRouterDom.Link,
              variant: "secondary",
              startIcon: /* @__PURE__ */ jsxRuntime.jsx(icons.Plus, {}),
              to: "/settings/transfer-tokens/create",
              children: formatMessage({
                id: "Settings.transferTokens.addNewToken",
                defaultMessage: "Add new Transfer Token"
              })
            }
          ),
          icon: /* @__PURE__ */ jsxRuntime.jsx(symbols.EmptyDocuments, { width: "16rem" }),
          content: formatMessage({
            id: "Settings.transferTokens.addFirstToken",
            defaultMessage: "Add your first Transfer Token"
          })
        }
      ) : null,
      !canCreate && transferTokens$1.length === 0 ? /* @__PURE__ */ jsxRuntime.jsx(
        designSystem.EmptyStateLayout,
        {
          icon: /* @__PURE__ */ jsxRuntime.jsx(symbols.EmptyDocuments, { width: "16rem" }),
          content: formatMessage({
            id: "Settings.transferTokens.emptyStateLayout",
            defaultMessage: "You don’t have any content yet..."
          })
        }
      ) : null
    ] }) })
  ] });
};
const ProtectedListView = () => {
  const permissions = Theme.useTypedSelector(
    (state) => state.admin_app.permissions.settings?.["transfer-tokens"].main
  );
  return /* @__PURE__ */ jsxRuntime.jsx(Theme.Page.Protect, { permissions, children: /* @__PURE__ */ jsxRuntime.jsx(ListView, {}) });
};

exports.ListView = ListView;
exports.ProtectedListView = ProtectedListView;
//# sourceMappingURL=ListView-2ZBsOkZ_.js.map

'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const jsxRuntime = require('react/jsx-runtime');
const React = require('react');
const designSystem = require('@strapi/design-system');
const icons = require('@strapi/icons');
const symbols = require('@strapi/icons/symbols');
const reactIntl = require('react-intl');
const reactRouterDom = require('react-router-dom');
const index = require('./index-UB9JNjeZ.js');
const Theme = require('./Theme-DaGRg2qU.js');
const useWebhooks = require('./useWebhooks-oYy_qRlY.js');

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

const ListPage = () => {
  const [showModal, setShowModal] = React__namespace.useState(false);
  const [webhooksToDelete, setWebhooksToDelete] = React__namespace.useState([]);
  const permissions = Theme.useTypedSelector((state) => state.admin_app.permissions.settings?.webhooks);
  const { formatMessage } = reactIntl.useIntl();
  const { _unstableFormatAPIError: formatAPIError } = Theme.useAPIErrorHandler();
  const { toggleNotification } = Theme.useNotification();
  const navigate = reactRouterDom.useNavigate();
  const {
    isLoading: isRBACLoading,
    allowedActions: { canCreate, canUpdate, canDelete }
  } = Theme.useRBAC(permissions);
  const { notifyStatus } = designSystem.useNotifyAT();
  const {
    isLoading: isWebhooksLoading,
    webhooks,
    error: webhooksError,
    updateWebhook,
    deleteManyWebhooks
  } = useWebhooks.useWebhooks();
  React__namespace.useEffect(() => {
    if (webhooksError) {
      toggleNotification({
        type: "danger",
        message: formatAPIError(webhooksError)
      });
      return;
    }
    if (webhooks) {
      notifyStatus(
        formatMessage({
          id: "Settings.webhooks.list.loading.success",
          defaultMessage: "Webhooks have been loaded"
        })
      );
    }
  }, [webhooks, webhooksError, toggleNotification, formatMessage, notifyStatus, formatAPIError]);
  const enableWebhook = async (body) => {
    try {
      const res = await updateWebhook(body);
      if ("error" in res) {
        toggleNotification({
          type: "danger",
          message: formatAPIError(res.error)
        });
      }
    } catch {
      toggleNotification({
        type: "danger",
        message: formatMessage({
          id: "notification.error",
          defaultMessage: "An error occurred"
        })
      });
    }
  };
  const deleteWebhook = async (id) => {
    try {
      const res = await deleteManyWebhooks({
        ids: [id]
      });
      if ("error" in res) {
        toggleNotification({
          type: "danger",
          message: formatAPIError(res.error)
        });
        return;
      }
      setWebhooksToDelete((prev) => prev.filter((webhookId) => webhookId !== id));
    } catch {
      toggleNotification({
        type: "danger",
        message: formatMessage({
          id: "notification.error",
          defaultMessage: "An error occurred"
        })
      });
    }
  };
  const confirmBulkDelete = async () => {
    try {
      const res = await deleteManyWebhooks({
        ids: webhooksToDelete
      });
      if ("error" in res) {
        toggleNotification({
          type: "danger",
          message: formatAPIError(res.error)
        });
        return;
      }
      setWebhooksToDelete([]);
    } catch {
      toggleNotification({
        type: "danger",
        message: formatMessage({
          id: "notification.error",
          defaultMessage: "An error occurred"
        })
      });
    } finally {
      setShowModal(false);
    }
  };
  const selectAllCheckbox = (selected) => selected ? setWebhooksToDelete(webhooks?.map((webhook) => webhook.id) ?? []) : setWebhooksToDelete([]);
  const selectOneCheckbox = (selected, id) => selected ? setWebhooksToDelete((prev) => [...prev, id]) : setWebhooksToDelete((prev) => prev.filter((webhookId) => webhookId !== id));
  const isLoading = isRBACLoading || isWebhooksLoading;
  const numberOfWebhooks = webhooks?.length ?? 0;
  const webhooksToDeleteLength = webhooksToDelete.length;
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntime.jsx(Theme.Page.Loading, {});
  }
  return /* @__PURE__ */ jsxRuntime.jsxs(index.Layouts.Root, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(Theme.Page.Title, { children: formatMessage(
      { id: "Settings.PageTitle", defaultMessage: "Settings - {name}" },
      {
        name: "Webhooks"
      }
    ) }),
    /* @__PURE__ */ jsxRuntime.jsxs(Theme.Page.Main, { "aria-busy": isLoading, children: [
      /* @__PURE__ */ jsxRuntime.jsx(
        index.Layouts.Header,
        {
          title: formatMessage({ id: "Settings.webhooks.title", defaultMessage: "Webhooks" }),
          subtitle: formatMessage({
            id: "Settings.webhooks.list.description",
            defaultMessage: "Get POST changes notifications"
          }),
          primaryAction: canCreate && !isLoading && /* @__PURE__ */ jsxRuntime.jsx(designSystem.LinkButton, { tag: reactRouterDom.NavLink, startIcon: /* @__PURE__ */ jsxRuntime.jsx(icons.Plus, {}), variant: "default", to: "create", size: "S", children: formatMessage({
            id: "Settings.webhooks.list.button.add",
            defaultMessage: "Create new webhook"
          }) })
        }
      ),
      webhooksToDeleteLength > 0 && canDelete && /* @__PURE__ */ jsxRuntime.jsx(
        index.Layouts.Action,
        {
          startActions: /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "epsilon", textColor: "neutral600", children: formatMessage(
              {
                id: "Settings.webhooks.to.delete",
                defaultMessage: "{webhooksToDeleteLength, plural, one {# webhook} other {# webhooks}} selected"
              },
              { webhooksToDeleteLength }
            ) }),
            /* @__PURE__ */ jsxRuntime.jsx(
              designSystem.Button,
              {
                onClick: () => setShowModal(true),
                startIcon: /* @__PURE__ */ jsxRuntime.jsx(icons.Trash, {}),
                size: "L",
                variant: "danger-light",
                children: formatMessage({
                  id: "global.delete",
                  defaultMessage: "Delete"
                })
              }
            )
          ] })
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsx(index.Layouts.Content, { children: numberOfWebhooks > 0 ? /* @__PURE__ */ jsxRuntime.jsxs(
        designSystem.Table,
        {
          colCount: 5,
          rowCount: numberOfWebhooks + 1,
          footer: /* @__PURE__ */ jsxRuntime.jsx(
            designSystem.TFooter,
            {
              onClick: () => {
                if (canCreate) {
                  navigate("create");
                }
              },
              icon: /* @__PURE__ */ jsxRuntime.jsx(icons.Plus, {}),
              children: formatMessage({
                id: "Settings.webhooks.list.button.add",
                defaultMessage: "Create new webhook"
              })
            }
          ),
          children: [
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.Thead, { children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Tr, { children: [
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.Th, { children: /* @__PURE__ */ jsxRuntime.jsx(
                designSystem.Checkbox,
                {
                  "aria-label": formatMessage({
                    id: "global.select-all-entries",
                    defaultMessage: "Select all entries"
                  }),
                  checked: webhooksToDeleteLength > 0 && webhooksToDeleteLength < numberOfWebhooks ? "indeterminate" : webhooksToDeleteLength === numberOfWebhooks,
                  onCheckedChange: selectAllCheckbox
                }
              ) }),
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.Th, { width: "20%", children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "sigma", textColor: "neutral600", children: formatMessage({
                id: "global.name",
                defaultMessage: "Name"
              }) }) }),
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.Th, { width: "60%", children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "sigma", textColor: "neutral600", children: formatMessage({
                id: "Settings.webhooks.form.url",
                defaultMessage: "URL"
              }) }) }),
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.Th, { width: "20%", children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "sigma", textColor: "neutral600", children: formatMessage({
                id: "Settings.webhooks.list.th.status",
                defaultMessage: "Status"
              }) }) }),
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.Th, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.VisuallyHidden, { children: formatMessage({
                id: "Settings.webhooks.list.th.actions",
                defaultMessage: "Actions"
              }) }) })
            ] }) }),
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.Tbody, { children: webhooks?.map((webhook) => /* @__PURE__ */ jsxRuntime.jsxs(
              designSystem.Tr,
              {
                onClick: () => {
                  if (canUpdate) {
                    navigate(webhook.id);
                  }
                },
                style: { cursor: canUpdate ? "pointer" : "default" },
                children: [
                  /* @__PURE__ */ jsxRuntime.jsx(designSystem.Td, { onClick: (e) => e.stopPropagation(), children: /* @__PURE__ */ jsxRuntime.jsx(
                    designSystem.Checkbox,
                    {
                      "aria-label": `${formatMessage({
                        id: "global.select",
                        defaultMessage: "Select"
                      })} ${webhook.name}`,
                      checked: webhooksToDelete?.includes(webhook.id),
                      onCheckedChange: (selected) => selectOneCheckbox(!!selected, webhook.id),
                      name: "select"
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntime.jsx(designSystem.Td, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { fontWeight: "semiBold", textColor: "neutral800", children: webhook.name }) }),
                  /* @__PURE__ */ jsxRuntime.jsx(designSystem.Td, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { textColor: "neutral800", children: webhook.url }) }),
                  /* @__PURE__ */ jsxRuntime.jsx(designSystem.Td, { onClick: (e) => e.stopPropagation(), children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Flex, { children: /* @__PURE__ */ jsxRuntime.jsx(
                    designSystem.Switch,
                    {
                      onLabel: formatMessage({
                        id: "global.enabled",
                        defaultMessage: "Enabled"
                      }),
                      offLabel: formatMessage({
                        id: "global.disabled",
                        defaultMessage: "Disabled"
                      }),
                      "aria-label": `${webhook.name} ${formatMessage({
                        id: "Settings.webhooks.list.th.status",
                        defaultMessage: "Status"
                      })}`,
                      checked: webhook.isEnabled,
                      onCheckedChange: (enabled) => {
                        enableWebhook({
                          ...webhook,
                          isEnabled: enabled
                        });
                      },
                      visibleLabels: true
                    }
                  ) }) }),
                  /* @__PURE__ */ jsxRuntime.jsx(designSystem.Td, { children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { gap: 1, children: [
                    canUpdate && /* @__PURE__ */ jsxRuntime.jsx(
                      designSystem.IconButton,
                      {
                        label: formatMessage({
                          id: "Settings.webhooks.events.update",
                          defaultMessage: "Update"
                        }),
                        variant: "ghost",
                        children: /* @__PURE__ */ jsxRuntime.jsx(icons.Pencil, {})
                      }
                    ),
                    canDelete && /* @__PURE__ */ jsxRuntime.jsx(
                      DeleteActionButton,
                      {
                        onDelete: () => {
                          deleteWebhook(webhook.id);
                        }
                      }
                    )
                  ] }) })
                ]
              },
              webhook.id
            )) })
          ]
        }
      ) : /* @__PURE__ */ jsxRuntime.jsx(
        designSystem.EmptyStateLayout,
        {
          icon: /* @__PURE__ */ jsxRuntime.jsx(symbols.EmptyDocuments, { width: "160px" }),
          content: formatMessage({
            id: "Settings.webhooks.list.empty.description",
            defaultMessage: "No webhooks found"
          }),
          action: canCreate ? /* @__PURE__ */ jsxRuntime.jsx(designSystem.LinkButton, { variant: "secondary", startIcon: /* @__PURE__ */ jsxRuntime.jsx(icons.Plus, {}), tag: reactRouterDom.NavLink, to: "create", children: formatMessage({
            id: "Settings.webhooks.list.button.add",
            defaultMessage: "Create new webhook"
          }) }) : null
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Dialog.Root, { open: showModal, onOpenChange: setShowModal, children: /* @__PURE__ */ jsxRuntime.jsx(index.ConfirmDialog, { onConfirm: confirmBulkDelete }) })
  ] });
};
const DeleteActionButton = ({ onDelete }) => {
  const [showModal, setShowModal] = React__namespace.useState(false);
  const { formatMessage } = reactIntl.useIntl();
  return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(
      designSystem.IconButton,
      {
        onClick: (e) => {
          e.stopPropagation();
          setShowModal(true);
        },
        label: formatMessage({
          id: "Settings.webhooks.events.delete",
          defaultMessage: "Delete webhook"
        }),
        variant: "ghost",
        children: /* @__PURE__ */ jsxRuntime.jsx(icons.Trash, {})
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Dialog.Root, { open: showModal, onOpenChange: setShowModal, children: /* @__PURE__ */ jsxRuntime.jsx(
      index.ConfirmDialog,
      {
        onConfirm: (e) => {
          e?.stopPropagation();
          onDelete();
        }
      }
    ) })
  ] });
};
const ProtectedListPage = () => {
  const permissions = Theme.useTypedSelector(
    (state) => state.admin_app.permissions.settings?.webhooks.main
  );
  return /* @__PURE__ */ jsxRuntime.jsx(Theme.Page.Protect, { permissions, children: /* @__PURE__ */ jsxRuntime.jsx(ListPage, {}) });
};

exports.ListPage = ListPage;
exports.ProtectedListPage = ProtectedListPage;
//# sourceMappingURL=ListPage-W5czWR6K.js.map

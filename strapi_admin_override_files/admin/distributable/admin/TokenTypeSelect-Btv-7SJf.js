'use strict';

const jsxRuntime = require('react/jsx-runtime');
const React = require('react');
const designSystem = require('@strapi/design-system');
const icons = require('@strapi/icons');
const reactIntl = require('react-intl');
const index = require('./index-UB9JNjeZ.js');
const Theme = require('./Theme-DaGRg2qU.js');
const transferTokens = require('./transferTokens-AcbwoJPr.js');
const dateFns = require('date-fns');
const locales = require('date-fns/locale');

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
const locales__namespace = /*#__PURE__*/_interopNamespace(locales);

const Regenerate = ({ onRegenerate, url }) => {
  const { formatMessage } = reactIntl.useIntl();
  const [showConfirmDialog, setShowConfirmDialog] = React__namespace.useState(false);
  const [isLoadingConfirmation, setIsLoadingConfirmation] = React__namespace.useState(false);
  const { toggleNotification } = Theme.useNotification();
  const { _unstableFormatAPIError: formatAPIError } = Theme.useAPIErrorHandler();
  const [regenerateToken] = transferTokens.useRegenerateTokenMutation();
  const regenerateData = async () => {
    try {
      const res = await regenerateToken(url);
      if ("error" in res) {
        toggleNotification({
          type: "danger",
          message: formatAPIError(res.error)
        });
        return;
      }
      if (onRegenerate) {
        onRegenerate(res.data.accessKey);
      }
    } catch (error) {
      toggleNotification({
        type: "danger",
        message: formatMessage({
          id: "notification.error",
          defaultMessage: "Something went wrong"
        })
      });
    } finally {
      setIsLoadingConfirmation(false);
    }
  };
  const handleConfirmRegeneration = async () => {
    regenerateData();
    setShowConfirmDialog(false);
  };
  return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Dialog.Root, { open: showConfirmDialog, onOpenChange: setShowConfirmDialog, children: [
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Dialog.Trigger, { children: /* @__PURE__ */ jsxRuntime.jsx(
      designSystem.Button,
      {
        startIcon: /* @__PURE__ */ jsxRuntime.jsx(icons.ArrowClockwise, {}),
        type: "button",
        size: "S",
        variant: "tertiary",
        onClick: () => setShowConfirmDialog(true),
        name: "regenerate",
        children: formatMessage({
          id: "Settings.tokens.regenerate",
          defaultMessage: "Regenerate"
        })
      }
    ) }),
    /* @__PURE__ */ jsxRuntime.jsx(
      index.ConfirmDialog,
      {
        title: formatMessage({
          id: "Settings.tokens.RegenerateDialog.title",
          defaultMessage: "Regenerate token"
        }),
        endAction: /* @__PURE__ */ jsxRuntime.jsx(
          designSystem.Button,
          {
            startIcon: /* @__PURE__ */ jsxRuntime.jsx(icons.ArrowClockwise, {}),
            loading: isLoadingConfirmation,
            onClick: handleConfirmRegeneration,
            children: formatMessage({
              id: "Settings.tokens.Button.regenerate",
              defaultMessage: "Regenerate"
            })
          }
        ),
        children: formatMessage({
          id: "Settings.tokens.popUpWarning.message",
          defaultMessage: "Are you sure you want to regenerate this token?"
        })
      }
    )
  ] });
};
const FormHead = ({
  title,
  token,
  setToken,
  canEditInputs,
  canRegenerate,
  isSubmitting,
  regenerateUrl
}) => {
  const { formatMessage } = reactIntl.useIntl();
  const handleRegenerate = (newKey) => {
    setToken({
      ...token,
      accessKey: newKey
    });
  };
  return /* @__PURE__ */ jsxRuntime.jsx(
    index.Layouts.Header,
    {
      title: token?.name || formatMessage(title),
      primaryAction: canEditInputs ? /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { gap: 2, children: [
        canRegenerate && token?.id && /* @__PURE__ */ jsxRuntime.jsx(
          Regenerate,
          {
            onRegenerate: handleRegenerate,
            url: `${regenerateUrl}${token?.id ?? ""}`
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsx(
          designSystem.Button,
          {
            disabled: isSubmitting,
            loading: isSubmitting,
            startIcon: /* @__PURE__ */ jsxRuntime.jsx(icons.Check, {}),
            type: "submit",
            size: "S",
            children: formatMessage({
              id: "global.save",
              defaultMessage: "Save"
            })
          }
        )
      ] }) : canRegenerate && token?.id && /* @__PURE__ */ jsxRuntime.jsx(
        Regenerate,
        {
          onRegenerate: handleRegenerate,
          url: `${regenerateUrl}${token?.id ?? ""}`
        }
      ),
      navigationAction: /* @__PURE__ */ jsxRuntime.jsx(index.BackButton, {}),
      ellipsis: true
    }
  );
};

const TokenBox = ({ token, tokenType }) => {
  const { formatMessage } = reactIntl.useIntl();
  const { toggleNotification } = Theme.useNotification();
  const { trackUsage } = Theme.useTracking();
  const { copy } = index.useClipboard();
  const handleClick = (token2) => async () => {
    if (token2) {
      const didCopy = await copy(token2);
      if (didCopy) {
        trackUsage("didCopyTokenKey", {
          tokenType
        });
        toggleNotification({
          type: "success",
          message: formatMessage({ id: "Settings.tokens.notification.copied" })
        });
      }
    }
  };
  return /* @__PURE__ */ jsxRuntime.jsx(
    index.ContentBox,
    {
      endAction: token && /* @__PURE__ */ jsxRuntime.jsx("span", { style: { alignSelf: "start" }, children: /* @__PURE__ */ jsxRuntime.jsx(
        designSystem.IconButton,
        {
          label: formatMessage({
            id: "app.component.CopyToClipboard.label",
            defaultMessage: "Copy to clipboard"
          }),
          onClick: handleClick(token),
          variant: "ghost",
          type: "button",
          style: { padding: 0, height: "1.6rem" },
          children: /* @__PURE__ */ jsxRuntime.jsx(icons.Duplicate, {})
        }
      ) }),
      title: token || formatMessage({
        id: "Settings.tokens.copy.editTitle",
        defaultMessage: "This token isn’t accessible anymore."
      }),
      subtitle: token ? formatMessage({
        id: "Settings.tokens.copy.lastWarning",
        defaultMessage: "Make sure to copy this token, you won’t be able to see it again!"
      }) : formatMessage({
        id: "Settings.tokens.copy.editMessage",
        defaultMessage: "For security reasons, you can only see your token once."
      }),
      icon: /* @__PURE__ */ jsxRuntime.jsx(icons.Key, {}),
      iconBackground: "neutral100"
    }
  );
};

const getDateFnsLocaleName = (locale) => {
  if (Object.keys(locales__namespace).includes(locale)) {
    return locale;
  }
  return "enUS";
};

const getDateOfExpiration = (createdAt, duration, language = "en") => {
  if (duration && typeof duration === "number") {
    const durationInDays = duration / 24 / 60 / 60 / 1e3;
    return dateFns.format(dateFns.addDays(new Date(createdAt), durationInDays), "PPP", {
      locale: locales__namespace[getDateFnsLocaleName(language)]
    });
  }
  return "Unlimited";
};

const isErrorMessageMessageDescriptor = (message) => {
  return typeof message === "object" && message !== null && "id" in message;
};

const LifeSpanInput = ({
  token,
  error,
  value,
  onChange,
  isCreating
}) => {
  const { formatMessage } = reactIntl.useIntl();
  return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
    /* @__PURE__ */ jsxRuntime.jsxs(
      designSystem.Field.Root,
      {
        error: error ? formatMessage(
          isErrorMessageMessageDescriptor(error) ? error : { id: error, defaultMessage: error }
        ) : void 0,
        name: "lifespan",
        required: true,
        children: [
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Label, { children: formatMessage({
            id: "Settings.tokens.form.duration",
            defaultMessage: "Token duration"
          }) }),
          /* @__PURE__ */ jsxRuntime.jsxs(
            designSystem.SingleSelect,
            {
              value,
              onChange: (value2) => {
                onChange({ target: { name: "lifespan", value: value2 } });
              },
              disabled: !isCreating,
              placeholder: "Select",
              children: [
                /* @__PURE__ */ jsxRuntime.jsx(designSystem.SingleSelectOption, { value: "604800000", children: formatMessage({
                  id: "Settings.tokens.duration.7-days",
                  defaultMessage: "7 days"
                }) }),
                /* @__PURE__ */ jsxRuntime.jsx(designSystem.SingleSelectOption, { value: "2592000000", children: formatMessage({
                  id: "Settings.tokens.duration.30-days",
                  defaultMessage: "30 days"
                }) }),
                /* @__PURE__ */ jsxRuntime.jsx(designSystem.SingleSelectOption, { value: "7776000000", children: formatMessage({
                  id: "Settings.tokens.duration.90-days",
                  defaultMessage: "90 days"
                }) }),
                /* @__PURE__ */ jsxRuntime.jsx(designSystem.SingleSelectOption, { value: "0", children: formatMessage({
                  id: "Settings.tokens.duration.unlimited",
                  defaultMessage: "Unlimited"
                }) })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Error, {})
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "pi", textColor: "neutral600", children: !isCreating && `${formatMessage({
      id: "Settings.tokens.duration.expiration-date",
      defaultMessage: "Expiration date"
      // @ts-expect-error – TODO: fix this.
    })}: ${getDateOfExpiration(token?.createdAt, parseInt(value ?? "", 10))}` })
  ] });
};

const TokenDescription = ({
  error,
  value,
  onChange,
  canEditInputs
}) => {
  const { formatMessage } = reactIntl.useIntl();
  return /* @__PURE__ */ jsxRuntime.jsxs(
    designSystem.Field.Root,
    {
      name: "description",
      error: error ? formatMessage(
        isErrorMessageMessageDescriptor(error) ? error : {
          id: error,
          defaultMessage: error
        }
      ) : void 0,
      children: [
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Label, { children: formatMessage({
          id: "Settings.tokens.form.description",
          defaultMessage: "Description"
        }) }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Textarea, { onChange, disabled: !canEditInputs, value }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Error, {})
      ]
    }
  );
};

const TokenName = ({ error, value, onChange, canEditInputs }) => {
  const { formatMessage } = reactIntl.useIntl();
  return /* @__PURE__ */ jsxRuntime.jsxs(
    designSystem.Field.Root,
    {
      name: "name",
      error: error ? formatMessage(
        isErrorMessageMessageDescriptor(error) ? error : { id: error, defaultMessage: error }
      ) : void 0,
      required: true,
      children: [
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Label, { children: formatMessage({
          id: "Settings.tokens.form.name",
          defaultMessage: "Name"
        }) }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.TextInput, { onChange, value, disabled: !canEditInputs }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Error, {})
      ]
    }
  );
};

const TokenTypeSelect = ({
  name = "type",
  error,
  value,
  onChange,
  canEditInputs,
  options = [],
  label
}) => {
  const { formatMessage } = reactIntl.useIntl();
  return /* @__PURE__ */ jsxRuntime.jsxs(
    designSystem.Field.Root,
    {
      error: error ? formatMessage(
        isErrorMessageMessageDescriptor(error) ? error : { id: error, defaultMessage: error }
      ) : void 0,
      name,
      required: true,
      children: [
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Label, { children: formatMessage({
          id: label.id,
          defaultMessage: label.defaultMessage
        }) }),
        /* @__PURE__ */ jsxRuntime.jsx(
          designSystem.SingleSelect,
          {
            value,
            onChange,
            placeholder: "Select",
            disabled: !canEditInputs,
            children: options && options.map(({ value: value2, label: label2 }) => /* @__PURE__ */ jsxRuntime.jsx(designSystem.SingleSelectOption, { value: value2, children: formatMessage(label2) }, value2))
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Error, {})
      ]
    }
  );
};

exports.FormHead = FormHead;
exports.LifeSpanInput = LifeSpanInput;
exports.TokenBox = TokenBox;
exports.TokenDescription = TokenDescription;
exports.TokenName = TokenName;
exports.TokenTypeSelect = TokenTypeSelect;
//# sourceMappingURL=TokenTypeSelect-Btv-7SJf.js.map

import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import * as React from 'react';
import { Flex, Button, Dialog, IconButton, Field, SingleSelect, SingleSelectOption, Typography, Textarea, TextInput } from '@strapi/design-system';
import { Check, ArrowClockwise, Duplicate, Key } from '@strapi/icons';
import { useIntl } from 'react-intl';
import { b as Layouts, B as BackButton, C as ConfirmDialog, t as useClipboard, v as ContentBox } from './index-CyEyTBzg.mjs';
import { u as useNotification, e as useAPIErrorHandler, c as useTracking } from './Theme-6doxg5FV.mjs';
import { e as useRegenerateTokenMutation } from './transferTokens-AKclIHTx.mjs';
import { format, addDays } from 'date-fns';
import * as locales from 'date-fns/locale';

const Regenerate = ({ onRegenerate, url }) => {
  const { formatMessage } = useIntl();
  const [showConfirmDialog, setShowConfirmDialog] = React.useState(false);
  const [isLoadingConfirmation, setIsLoadingConfirmation] = React.useState(false);
  const { toggleNotification } = useNotification();
  const { _unstableFormatAPIError: formatAPIError } = useAPIErrorHandler();
  const [regenerateToken] = useRegenerateTokenMutation();
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
  return /* @__PURE__ */ jsxs(Dialog.Root, { open: showConfirmDialog, onOpenChange: setShowConfirmDialog, children: [
    /* @__PURE__ */ jsx(Dialog.Trigger, { children: /* @__PURE__ */ jsx(
      Button,
      {
        startIcon: /* @__PURE__ */ jsx(ArrowClockwise, {}),
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
    /* @__PURE__ */ jsx(
      ConfirmDialog,
      {
        title: formatMessage({
          id: "Settings.tokens.RegenerateDialog.title",
          defaultMessage: "Regenerate token"
        }),
        endAction: /* @__PURE__ */ jsx(
          Button,
          {
            startIcon: /* @__PURE__ */ jsx(ArrowClockwise, {}),
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
  const { formatMessage } = useIntl();
  const handleRegenerate = (newKey) => {
    setToken({
      ...token,
      accessKey: newKey
    });
  };
  return /* @__PURE__ */ jsx(
    Layouts.Header,
    {
      title: token?.name || formatMessage(title),
      primaryAction: canEditInputs ? /* @__PURE__ */ jsxs(Flex, { gap: 2, children: [
        canRegenerate && token?.id && /* @__PURE__ */ jsx(
          Regenerate,
          {
            onRegenerate: handleRegenerate,
            url: `${regenerateUrl}${token?.id ?? ""}`
          }
        ),
        /* @__PURE__ */ jsx(
          Button,
          {
            disabled: isSubmitting,
            loading: isSubmitting,
            startIcon: /* @__PURE__ */ jsx(Check, {}),
            type: "submit",
            size: "S",
            children: formatMessage({
              id: "global.save",
              defaultMessage: "Save"
            })
          }
        )
      ] }) : canRegenerate && token?.id && /* @__PURE__ */ jsx(
        Regenerate,
        {
          onRegenerate: handleRegenerate,
          url: `${regenerateUrl}${token?.id ?? ""}`
        }
      ),
      navigationAction: /* @__PURE__ */ jsx(BackButton, {}),
      ellipsis: true
    }
  );
};

const TokenBox = ({ token, tokenType }) => {
  const { formatMessage } = useIntl();
  const { toggleNotification } = useNotification();
  const { trackUsage } = useTracking();
  const { copy } = useClipboard();
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
  return /* @__PURE__ */ jsx(
    ContentBox,
    {
      endAction: token && /* @__PURE__ */ jsx("span", { style: { alignSelf: "start" }, children: /* @__PURE__ */ jsx(
        IconButton,
        {
          label: formatMessage({
            id: "app.component.CopyToClipboard.label",
            defaultMessage: "Copy to clipboard"
          }),
          onClick: handleClick(token),
          variant: "ghost",
          type: "button",
          style: { padding: 0, height: "1.6rem" },
          children: /* @__PURE__ */ jsx(Duplicate, {})
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
      icon: /* @__PURE__ */ jsx(Key, {}),
      iconBackground: "neutral100"
    }
  );
};

const getDateFnsLocaleName = (locale) => {
  if (Object.keys(locales).includes(locale)) {
    return locale;
  }
  return "enUS";
};

const getDateOfExpiration = (createdAt, duration, language = "en") => {
  if (duration && typeof duration === "number") {
    const durationInDays = duration / 24 / 60 / 60 / 1e3;
    return format(addDays(new Date(createdAt), durationInDays), "PPP", {
      locale: locales[getDateFnsLocaleName(language)]
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
  const { formatMessage } = useIntl();
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(
      Field.Root,
      {
        error: error ? formatMessage(
          isErrorMessageMessageDescriptor(error) ? error : { id: error, defaultMessage: error }
        ) : void 0,
        name: "lifespan",
        required: true,
        children: [
          /* @__PURE__ */ jsx(Field.Label, { children: formatMessage({
            id: "Settings.tokens.form.duration",
            defaultMessage: "Token duration"
          }) }),
          /* @__PURE__ */ jsxs(
            SingleSelect,
            {
              value,
              onChange: (value2) => {
                onChange({ target: { name: "lifespan", value: value2 } });
              },
              disabled: !isCreating,
              placeholder: "Select",
              children: [
                /* @__PURE__ */ jsx(SingleSelectOption, { value: "604800000", children: formatMessage({
                  id: "Settings.tokens.duration.7-days",
                  defaultMessage: "7 days"
                }) }),
                /* @__PURE__ */ jsx(SingleSelectOption, { value: "2592000000", children: formatMessage({
                  id: "Settings.tokens.duration.30-days",
                  defaultMessage: "30 days"
                }) }),
                /* @__PURE__ */ jsx(SingleSelectOption, { value: "7776000000", children: formatMessage({
                  id: "Settings.tokens.duration.90-days",
                  defaultMessage: "90 days"
                }) }),
                /* @__PURE__ */ jsx(SingleSelectOption, { value: "0", children: formatMessage({
                  id: "Settings.tokens.duration.unlimited",
                  defaultMessage: "Unlimited"
                }) })
              ]
            }
          ),
          /* @__PURE__ */ jsx(Field.Error, {})
        ]
      }
    ),
    /* @__PURE__ */ jsx(Typography, { variant: "pi", textColor: "neutral600", children: !isCreating && `${formatMessage({
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
  const { formatMessage } = useIntl();
  return /* @__PURE__ */ jsxs(
    Field.Root,
    {
      name: "description",
      error: error ? formatMessage(
        isErrorMessageMessageDescriptor(error) ? error : {
          id: error,
          defaultMessage: error
        }
      ) : void 0,
      children: [
        /* @__PURE__ */ jsx(Field.Label, { children: formatMessage({
          id: "Settings.tokens.form.description",
          defaultMessage: "Description"
        }) }),
        /* @__PURE__ */ jsx(Textarea, { onChange, disabled: !canEditInputs, value }),
        /* @__PURE__ */ jsx(Field.Error, {})
      ]
    }
  );
};

const TokenName = ({ error, value, onChange, canEditInputs }) => {
  const { formatMessage } = useIntl();
  return /* @__PURE__ */ jsxs(
    Field.Root,
    {
      name: "name",
      error: error ? formatMessage(
        isErrorMessageMessageDescriptor(error) ? error : { id: error, defaultMessage: error }
      ) : void 0,
      required: true,
      children: [
        /* @__PURE__ */ jsx(Field.Label, { children: formatMessage({
          id: "Settings.tokens.form.name",
          defaultMessage: "Name"
        }) }),
        /* @__PURE__ */ jsx(TextInput, { onChange, value, disabled: !canEditInputs }),
        /* @__PURE__ */ jsx(Field.Error, {})
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
  const { formatMessage } = useIntl();
  return /* @__PURE__ */ jsxs(
    Field.Root,
    {
      error: error ? formatMessage(
        isErrorMessageMessageDescriptor(error) ? error : { id: error, defaultMessage: error }
      ) : void 0,
      name,
      required: true,
      children: [
        /* @__PURE__ */ jsx(Field.Label, { children: formatMessage({
          id: label.id,
          defaultMessage: label.defaultMessage
        }) }),
        /* @__PURE__ */ jsx(
          SingleSelect,
          {
            value,
            onChange,
            placeholder: "Select",
            disabled: !canEditInputs,
            children: options && options.map(({ value: value2, label: label2 }) => /* @__PURE__ */ jsx(SingleSelectOption, { value: value2, children: formatMessage(label2) }, value2))
          }
        ),
        /* @__PURE__ */ jsx(Field.Error, {})
      ]
    }
  );
};

export { FormHead as F, LifeSpanInput as L, TokenBox as T, TokenName as a, TokenDescription as b, TokenTypeSelect as c };
//# sourceMappingURL=TokenTypeSelect-B3V4GKDs.mjs.map

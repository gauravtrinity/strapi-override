import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import * as React from 'react';
import { RawTable, Flex, Field, RawThead, RawTr, RawTh, VisuallyHidden, Typography, RawTbody, RawTd, Checkbox, TextButton, Box, Grid, IconButton, Combobox, ComboboxOption, Button, Main } from '@strapi/design-system';
import { useIntl } from 'react-intl';
import { useMatch, useNavigate } from 'react-router-dom';
import { b as useTypedSelector, P as Page, u as useNotification, e as useAPIErrorHandler } from './Theme-6doxg5FV.mjs';
import { s as selectAdminPermissions } from './selectors-DXYlWdPm.mjs';
import { i as isBaseQueryError } from './admin-DOzK8yjX.mjs';
import { Minus, Plus, Cross, Loader, Check, Play } from '@strapi/icons';
import * as yup from 'yup';
import { u as useField, w as useForm, x as MemoizedStringInput, F as Form, b as Layouts, B as BackButton, M as MemoizedInputRenderer } from './index-CyEyTBzg.mjs';
import { u as useEnterprise } from './useEnterprise-BGzVPL4w.mjs';
import { styled } from 'styled-components';
import { u as useWebhooks } from './useWebhooks-PMmtSF2F.mjs';

const EventsRoot = ({ children }) => {
  const { formatMessage } = useIntl();
  const label = formatMessage({
    id: "Settings.webhooks.form.events",
    defaultMessage: "Events"
  });
  return /* @__PURE__ */ jsxs(Flex, { direction: "column", alignItems: "stretch", gap: 1, children: [
    /* @__PURE__ */ jsx(Field.Label, { "aria-hidden": true, children: label }),
    /* @__PURE__ */ jsx(StyledTable, { "aria-label": label, children })
  ] });
};
const StyledTable = styled(RawTable)`
  tbody tr:nth-child(odd) {
    background: ${({ theme }) => theme.colors.neutral100};
  }

  thead th span {
    color: ${({ theme }) => theme.colors.neutral500};
  }

  td,
  th {
    padding-block-start: ${({ theme }) => theme.spaces[3]};
    padding-block-end: ${({ theme }) => theme.spaces[3]};
    width: 6%;
    vertical-align: middle;
  }

  tbody tr td:first-child {
    /**
     * Add padding to the start of the first column to avoid the checkbox appearing
     * too close to the edge of the table
     */
    padding-inline-start: ${({ theme }) => theme.spaces[2]};
  }
`;
const getCEHeaders = () => {
  const headers = [
    { id: "Settings.webhooks.events.create", defaultMessage: "Create" },
    { id: "Settings.webhooks.events.update", defaultMessage: "Update" },
    { id: "app.utils.delete", defaultMessage: "Delete" },
    { id: "app.utils.publish", defaultMessage: "Publish" },
    { id: "app.utils.unpublish", defaultMessage: "Unpublish" }
  ];
  return headers;
};
const EventsHeaders = ({ getHeaders = getCEHeaders }) => {
  const { formatMessage } = useIntl();
  const headers = getHeaders();
  return /* @__PURE__ */ jsx(RawThead, { children: /* @__PURE__ */ jsxs(RawTr, { children: [
    /* @__PURE__ */ jsx(RawTh, { children: /* @__PURE__ */ jsx(VisuallyHidden, { children: formatMessage({
      id: "Settings.webhooks.event.select",
      defaultMessage: "Select event"
    }) }) }),
    headers.map((header) => {
      if (["app.utils.publish", "app.utils.unpublish"].includes(header?.id ?? "")) {
        return /* @__PURE__ */ jsx(
          RawTh,
          {
            title: formatMessage({
              id: "Settings.webhooks.event.publish-tooltip",
              defaultMessage: "This event only exists for content with draft & publish enabled"
            }),
            children: /* @__PURE__ */ jsx(Typography, { variant: "sigma", textColor: "neutral600", children: formatMessage(header) })
          },
          header.id
        );
      }
      return /* @__PURE__ */ jsx(RawTh, { children: /* @__PURE__ */ jsx(Typography, { variant: "sigma", textColor: "neutral600", children: formatMessage(header) }) }, header.id);
    })
  ] }) });
};
const EventsBody = ({ providedEvents }) => {
  const events = providedEvents || getCEEvents();
  const { value = [], onChange } = useField("events");
  const inputName = "events";
  const inputValue = value;
  const disabledEvents = [];
  const formattedValue = inputValue.reduce((acc, curr) => {
    const key = curr.split(".")[0];
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(curr);
    return acc;
  }, {});
  const handleSelect = (name, value2) => {
    const set = new Set(inputValue);
    if (value2) {
      set.add(name);
    } else {
      set.delete(name);
    }
    onChange(inputName, Array.from(set));
  };
  const handleSelectAll = (name, value2) => {
    const set = new Set(inputValue);
    if (value2) {
      events[name].forEach((event) => {
        if (!disabledEvents.includes(event)) {
          set.add(event);
        }
      });
    } else {
      events[name].forEach((event) => set.delete(event));
    }
    onChange(inputName, Array.from(set));
  };
  return /* @__PURE__ */ jsx(RawTbody, { children: Object.entries(events).map(([event, value2]) => {
    return /* @__PURE__ */ jsx(
      EventsRow,
      {
        disabledEvents,
        name: event,
        events: value2,
        inputValue: formattedValue[event],
        handleSelect,
        handleSelectAll
      },
      event
    );
  }) });
};
const getCEEvents = () => {
  const entryEvents = [
    "entry.create",
    "entry.update",
    "entry.delete",
    "entry.publish",
    "entry.unpublish"
  ];
  return {
    entry: entryEvents,
    media: ["media.create", "media.update", "media.delete"]
  };
};
const EventsRow = ({
  disabledEvents = [],
  name,
  events = [],
  inputValue = [],
  handleSelect,
  handleSelectAll
}) => {
  const { formatMessage } = useIntl();
  const enabledCheckboxes = events.filter((event) => !disabledEvents.includes(event));
  const hasSomeCheckboxSelected = inputValue.length > 0;
  const areAllCheckboxesSelected = inputValue.length === enabledCheckboxes.length;
  const onChangeAll = () => {
    const valueToSet = !areAllCheckboxesSelected;
    handleSelectAll(name, valueToSet);
  };
  const targetColumns = 5;
  return /* @__PURE__ */ jsxs(RawTr, { children: [
    /* @__PURE__ */ jsx(RawTd, { children: /* @__PURE__ */ jsx(
      Checkbox,
      {
        "aria-label": formatMessage({
          id: "global.select-all-entries",
          defaultMessage: "Select all entries"
        }),
        name,
        checked: hasSomeCheckboxSelected && !areAllCheckboxesSelected ? "indeterminate" : areAllCheckboxesSelected,
        onCheckedChange: onChangeAll,
        children: removeHyphensAndTitleCase(name)
      }
    ) }),
    events.map((event) => {
      return /* @__PURE__ */ jsx(RawTd, { textAlign: "center", children: /* @__PURE__ */ jsx(Flex, { width: "100%", justifyContent: "center", children: /* @__PURE__ */ jsx(
        Checkbox,
        {
          disabled: disabledEvents.includes(event),
          "aria-label": event,
          name: event,
          checked: inputValue.includes(event),
          onCheckedChange: (value) => handleSelect(event, !!value)
        }
      ) }) }, event);
    }),
    events.length < targetColumns && /* @__PURE__ */ jsx(RawTd, { colSpan: targetColumns - events.length })
  ] });
};
const removeHyphensAndTitleCase = (str) => str.replace(/-/g, " ").split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(" ");
const Events = { Root: EventsRoot, Headers: EventsHeaders, Body: EventsBody, Row: EventsRow };

const EventTableCE = () => {
  return /* @__PURE__ */ jsxs(Events.Root, { children: [
    /* @__PURE__ */ jsx(Events.Headers, {}),
    /* @__PURE__ */ jsx(Events.Body, {})
  ] });
};

const AddHeaderButton = styled(TextButton)`
  cursor: pointer;
`;
const HeadersInput = () => {
  const { formatMessage } = useIntl();
  const addFieldRow = useForm("HeadersInput", (state) => state.addFieldRow);
  const removeFieldRow = useForm("HeadersInput", (state) => state.removeFieldRow);
  const setFieldValue = useForm("HeadersInput", (state) => state.onChange);
  const { value = [] } = useField("headers");
  const removeRow = (index) => {
    if (value.length === 1) {
      setFieldValue("headers", [{ key: "", value: "" }]);
    } else {
      removeFieldRow("headers", index);
    }
  };
  return /* @__PURE__ */ jsxs(Flex, { direction: "column", alignItems: "stretch", gap: 1, children: [
    /* @__PURE__ */ jsx(Field.Label, { children: formatMessage({
      id: "Settings.webhooks.form.headers",
      defaultMessage: "Headers"
    }) }),
    /* @__PURE__ */ jsxs(Box, { padding: 8, background: "neutral100", hasRadius: true, children: [
      value.map((val, index) => {
        return /* @__PURE__ */ jsxs(Grid.Root, { gap: 4, padding: 2, children: [
          /* @__PURE__ */ jsx(Grid.Item, { col: 6, direction: "column", alignItems: "stretch", children: /* @__PURE__ */ jsx(
            HeaderCombobox,
            {
              name: `headers.${index}.key`,
              "aria-label": `row ${index + 1} key`,
              label: formatMessage({
                id: "Settings.webhooks.key",
                defaultMessage: "Key"
              })
            }
          ) }),
          /* @__PURE__ */ jsx(Grid.Item, { col: 6, direction: "column", alignItems: "stretch", children: /* @__PURE__ */ jsxs(Flex, { alignItems: "flex-end", gap: 2, children: [
            /* @__PURE__ */ jsx(Box, { style: { flex: 1 }, children: /* @__PURE__ */ jsx(
              MemoizedStringInput,
              {
                name: `headers.${index}.value`,
                "aria-label": `row ${index + 1} value`,
                label: formatMessage({
                  id: "Settings.webhooks.value",
                  defaultMessage: "Value"
                }),
                type: "string"
              }
            ) }),
            /* @__PURE__ */ jsx(
              IconButton,
              {
                width: "4rem",
                height: "4rem",
                onClick: () => removeRow(index),
                color: "primary600",
                label: formatMessage(
                  {
                    id: "Settings.webhooks.headers.remove",
                    defaultMessage: "Remove header row {number}"
                  },
                  { number: index + 1 }
                ),
                type: "button",
                children: /* @__PURE__ */ jsx(Minus, { width: "0.8rem" })
              }
            )
          ] }) })
        ] }, `${index}-${JSON.stringify(val.key)}`);
      }),
      /* @__PURE__ */ jsx(Box, { paddingTop: 4, children: /* @__PURE__ */ jsx(
        AddHeaderButton,
        {
          type: "button",
          onClick: () => {
            addFieldRow("headers", { key: "", value: "" });
          },
          startIcon: /* @__PURE__ */ jsx(Plus, {}),
          children: formatMessage({
            id: "Settings.webhooks.create.header",
            defaultMessage: "Create new header"
          })
        }
      ) })
    ] })
  ] });
};
const HeaderCombobox = ({ name, label, ...restProps }) => {
  const [options, setOptions] = React.useState([...HTTP_HEADERS]);
  const { value: headers } = useField("headers");
  const field = useField(name);
  React.useEffect(() => {
    const headerOptions = HTTP_HEADERS.filter(
      (key) => !headers?.some((header) => header.key !== field.value && header.key === key)
    );
    setOptions(headerOptions);
  }, [headers, field.value]);
  const handleChange = (value) => {
    field.onChange(name, value);
  };
  const handleCreateOption = (value) => {
    setOptions((prev) => [...prev, value]);
    handleChange(value);
  };
  return /* @__PURE__ */ jsxs(Field.Root, { name, error: field.error, children: [
    /* @__PURE__ */ jsx(Field.Label, { children: label }),
    /* @__PURE__ */ jsx(
      Combobox,
      {
        ...restProps,
        onClear: () => handleChange(""),
        onChange: handleChange,
        onCreateOption: handleCreateOption,
        placeholder: "",
        creatable: true,
        value: field.value,
        children: options.map((key) => /* @__PURE__ */ jsx(ComboboxOption, { value: key, children: key }, key))
      }
    ),
    /* @__PURE__ */ jsx(Field.Error, {})
  ] });
};
const HTTP_HEADERS = [
  "A-IM",
  "Accept",
  "Accept-Charset",
  "Accept-Encoding",
  "Accept-Language",
  "Accept-Datetime",
  "Access-Control-Request-Method",
  "Access-Control-Request-Headers",
  "Authorization",
  "Cache-Control",
  "Connection",
  "Content-Length",
  "Content-Type",
  "Cookie",
  "Date",
  "Expect",
  "Forwarded",
  "From",
  "Host",
  "If-Match",
  "If-Modified-Since",
  "If-None-Match",
  "If-Range",
  "If-Unmodified-Since",
  "Max-Forwards",
  "Origin",
  "Pragma",
  "Proxy-Authorization",
  "Range",
  "Referer",
  "TE",
  "User-Agent",
  "Upgrade",
  "Via",
  "Warning"
];

const TriggerContainer = ({ isPending, onCancel, response }) => {
  const { statusCode, message } = response ?? {};
  const { formatMessage } = useIntl();
  return /* @__PURE__ */ jsx(Box, { background: "neutral0", padding: 5, shadow: "filterShadow", hasRadius: true, children: /* @__PURE__ */ jsxs(Grid.Root, { gap: 4, style: { alignItems: "center" }, children: [
    /* @__PURE__ */ jsx(Grid.Item, { col: 3, direction: "column", alignItems: "stretch", children: /* @__PURE__ */ jsx(Typography, { children: formatMessage({
      id: "Settings.webhooks.trigger.test",
      defaultMessage: "Test-trigger"
    }) }) }),
    /* @__PURE__ */ jsx(Grid.Item, { col: 3, direction: "column", alignItems: "stretch", children: /* @__PURE__ */ jsx(Status, { isPending, statusCode }) }),
    /* @__PURE__ */ jsx(Grid.Item, { col: 6, direction: "column", alignItems: "stretch", children: !isPending ? /* @__PURE__ */ jsx(Message, { statusCode, message }) : /* @__PURE__ */ jsx(Flex, { justifyContent: "flex-end", children: /* @__PURE__ */ jsx("button", { onClick: onCancel, type: "button", children: /* @__PURE__ */ jsxs(Flex, { gap: 2, alignItems: "center", children: [
      /* @__PURE__ */ jsx(Typography, { textColor: "neutral400", children: formatMessage({
        id: "Settings.webhooks.trigger.cancel",
        defaultMessage: "cancel"
      }) }),
      /* @__PURE__ */ jsx(Cross, { fill: "neutral400", height: "1.2rem", width: "1.2rem" })
    ] }) }) }) })
  ] }) });
};
const Status = ({ isPending, statusCode }) => {
  const { formatMessage } = useIntl();
  if (isPending || !statusCode) {
    return /* @__PURE__ */ jsxs(Flex, { gap: 2, alignItems: "center", children: [
      /* @__PURE__ */ jsx(Loader, { height: "1.2rem", width: "1.2rem" }),
      /* @__PURE__ */ jsx(Typography, { children: formatMessage({ id: "Settings.webhooks.trigger.pending", defaultMessage: "pending" }) })
    ] });
  }
  if (statusCode >= 200 && statusCode < 300) {
    return /* @__PURE__ */ jsxs(Flex, { gap: 2, alignItems: "center", children: [
      /* @__PURE__ */ jsx(Check, { fill: "success700", height: "1.2rem", width: "1.2rem" }),
      /* @__PURE__ */ jsx(Typography, { children: formatMessage({ id: "Settings.webhooks.trigger.success", defaultMessage: "success" }) })
    ] });
  }
  if (statusCode >= 300) {
    return /* @__PURE__ */ jsxs(Flex, { gap: 2, alignItems: "center", children: [
      /* @__PURE__ */ jsx(Cross, { fill: "danger700", height: "1.2rem", width: "1.2rem" }),
      /* @__PURE__ */ jsxs(Typography, { children: [
        formatMessage({ id: "Settings.error", defaultMessage: "error" }),
        " ",
        statusCode
      ] })
    ] });
  }
  return null;
};
const Message = ({ statusCode, message }) => {
  const { formatMessage } = useIntl();
  if (!statusCode) {
    return null;
  }
  if (statusCode >= 200 && statusCode < 300) {
    return /* @__PURE__ */ jsx(Flex, { justifyContent: "flex-end", children: /* @__PURE__ */ jsx(Typography, { textColor: "neutral600", ellipsis: true, children: formatMessage({
      id: "Settings.webhooks.trigger.success.label",
      defaultMessage: "Trigger succeeded"
    }) }) });
  }
  if (statusCode >= 300) {
    return /* @__PURE__ */ jsx(Flex, { justifyContent: "flex-end", children: /* @__PURE__ */ jsx(Flex, { maxWidth: `25rem`, justifyContent: "flex-end", title: message, children: /* @__PURE__ */ jsx(Typography, { ellipsis: true, textColor: "neutral600", children: message }) }) });
  }
  return null;
};

const WebhookForm = ({
  handleSubmit,
  triggerWebhook,
  isCreating,
  isTriggering,
  triggerResponse,
  data
}) => {
  const { formatMessage } = useIntl();
  const [showTriggerResponse, setShowTriggerResponse] = React.useState(false);
  const EventTable = useEnterprise(
    EventTableCE,
    async () => (await import('./EventsTable-BImurGm_.mjs')).EventsTableEE
  );
  const mapHeaders = (headers) => {
    if (!Object.keys(headers).length) {
      return [{ key: "", value: "" }];
    }
    return Object.entries(headers).map(([key, value]) => ({ key, value }));
  };
  if (!EventTable) {
    return null;
  }
  return /* @__PURE__ */ jsx(
    Form,
    {
      initialValues: {
        name: data?.name || "",
        url: data?.url || "",
        headers: mapHeaders(data?.headers || {}),
        events: data?.events || []
      },
      method: isCreating ? "POST" : "PUT",
      onSubmit: handleSubmit,
      validationSchema: makeWebhookValidationSchema({ formatMessage }),
      children: ({ isSubmitting, modified }) => /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(
          Layouts.Header,
          {
            primaryAction: /* @__PURE__ */ jsxs(Flex, { gap: 2, children: [
              /* @__PURE__ */ jsx(
                Button,
                {
                  onClick: () => {
                    triggerWebhook();
                    setShowTriggerResponse(true);
                  },
                  variant: "tertiary",
                  startIcon: /* @__PURE__ */ jsx(Play, {}),
                  disabled: isCreating || isTriggering,
                  children: formatMessage({
                    id: "Settings.webhooks.trigger",
                    defaultMessage: "Trigger"
                  })
                }
              ),
              /* @__PURE__ */ jsx(
                Button,
                {
                  startIcon: /* @__PURE__ */ jsx(Check, {}),
                  type: "submit",
                  disabled: !modified,
                  loading: isSubmitting,
                  children: formatMessage({
                    id: "global.save",
                    defaultMessage: "Save"
                  })
                }
              )
            ] }),
            title: isCreating ? formatMessage({
              id: "Settings.webhooks.create",
              defaultMessage: "Create a webhook"
            }) : data?.name,
            navigationAction: /* @__PURE__ */ jsx(BackButton, { fallback: "../webhooks" })
          }
        ),
        /* @__PURE__ */ jsx(Layouts.Content, { children: /* @__PURE__ */ jsxs(Flex, { direction: "column", alignItems: "stretch", gap: 4, children: [
          showTriggerResponse && /* @__PURE__ */ jsx(
            TriggerContainer,
            {
              isPending: isTriggering,
              response: triggerResponse,
              onCancel: () => setShowTriggerResponse(false)
            }
          ),
          /* @__PURE__ */ jsx(Box, { background: "neutral0", padding: 8, shadow: "filterShadow", hasRadius: true, children: /* @__PURE__ */ jsxs(Flex, { direction: "column", alignItems: "stretch", gap: 6, children: [
            /* @__PURE__ */ jsx(Grid.Root, { gap: 6, children: [
              {
                label: formatMessage({
                  id: "global.name",
                  defaultMessage: "Name"
                }),
                name: "name",
                required: true,
                size: 6,
                type: "string"
              },
              {
                label: formatMessage({
                  id: "Settings.roles.form.input.url",
                  defaultMessage: "Url"
                }),
                name: "url",
                required: true,
                size: 12,
                type: "string"
              }
            ].map(({ size, ...field }) => /* @__PURE__ */ jsx(
              Grid.Item,
              {
                col: size,
                direction: "column",
                alignItems: "stretch",
                children: /* @__PURE__ */ jsx(MemoizedInputRenderer, { ...field })
              },
              field.name
            )) }),
            /* @__PURE__ */ jsx(HeadersInput, {}),
            /* @__PURE__ */ jsx(EventTable, {})
          ] }) })
        ] }) })
      ] })
    }
  );
};
const NAME_REGEX = /(^$)|(^[A-Za-z][_0-9A-Za-z ]*$)/;
const URL_REGEX = /(^$)|((https?:\/\/.*)(d*)\/?(.*))/;
const makeWebhookValidationSchema = ({ formatMessage }) => yup.object().shape({
  name: yup.string().nullable().required(
    formatMessage({
      id: "Settings.webhooks.validation.name.required",
      defaultMessage: "Name is required"
    })
  ).matches(
    NAME_REGEX,
    formatMessage({
      id: "Settings.webhooks.validation.name.regex",
      defaultMessage: "The name must start with a letter and only contain letters, numbers, spaces and underscores"
    })
  ),
  url: yup.string().nullable().required(
    formatMessage({
      id: "Settings.webhooks.validation.url.required",
      defaultMessage: "Url is required"
    })
  ).matches(
    URL_REGEX,
    formatMessage({
      id: "Settings.webhooks.validation.url.regex",
      defaultMessage: "The value must be a valid Url"
    })
  ),
  headers: yup.lazy((array) => {
    const baseSchema = yup.array();
    if (array.length === 1) {
      const { key, value } = array[0];
      if (!key && !value) {
        return baseSchema;
      }
    }
    return baseSchema.of(
      yup.object().shape({
        key: yup.string().required(
          formatMessage({
            id: "Settings.webhooks.validation.key",
            defaultMessage: "Key is required"
          })
        ).nullable(),
        value: yup.string().required(
          formatMessage({
            id: "Settings.webhooks.validation.value",
            defaultMessage: "Value is required"
          })
        ).nullable()
      })
    );
  }),
  events: yup.array()
});

const cleanData = (data) => ({
  ...data,
  headers: data.headers.reduce((acc, { key, value }) => {
    if (key !== "") {
      acc[key] = value;
    }
    return acc;
  }, {})
});
const EditPage = () => {
  const { formatMessage } = useIntl();
  const match = useMatch("/settings/webhooks/:id");
  const id = match?.params.id;
  const isCreating = id === "create";
  const navigate = useNavigate();
  const { toggleNotification } = useNotification();
  const {
    _unstableFormatAPIError: formatAPIError,
    _unstableFormatValidationErrors: formatValidationErrors
  } = useAPIErrorHandler();
  const stableFormatAPIError = React.useCallback(formatAPIError, []);
  const [isTriggering, setIsTriggering] = React.useState(false);
  const [triggerResponse, setTriggerResponse] = React.useState();
  const { isLoading, webhooks, error, createWebhook, updateWebhook, triggerWebhook } = useWebhooks(
    { id },
    {
      skip: isCreating
    }
  );
  React.useEffect(() => {
    if (error) {
      toggleNotification({
        type: "danger",
        message: stableFormatAPIError(error)
      });
    }
  }, [error, toggleNotification, stableFormatAPIError]);
  const handleTriggerWebhook = async () => {
    try {
      setIsTriggering(true);
      const res = await triggerWebhook(id);
      if ("error" in res) {
        toggleNotification({
          type: "danger",
          message: formatAPIError(res.error)
        });
        return;
      }
      setTriggerResponse(res.data);
    } catch {
      toggleNotification({
        type: "danger",
        message: formatMessage({
          id: "notification.error",
          defaultMessage: "An error occurred"
        })
      });
    } finally {
      setIsTriggering(false);
    }
  };
  const handleSubmit = async (data, helpers) => {
    try {
      if (isCreating) {
        const res = await createWebhook(cleanData(data));
        if ("error" in res) {
          if (isBaseQueryError(res.error) && res.error.name === "ValidationError") {
            helpers.setErrors(formatValidationErrors(res.error));
          } else {
            toggleNotification({
              type: "danger",
              message: formatAPIError(res.error)
            });
          }
          return;
        }
        toggleNotification({
          type: "success",
          message: formatMessage({ id: "Settings.webhooks.created" })
        });
        navigate(`../webhooks/${res.data.id}`, { replace: true });
      } else {
        const res = await updateWebhook({ id, ...cleanData(data) });
        if ("error" in res) {
          if (isBaseQueryError(res.error) && res.error.name === "ValidationError") {
            helpers.setErrors(formatValidationErrors(res.error));
          } else {
            toggleNotification({
              type: "danger",
              message: formatAPIError(res.error)
            });
          }
          return;
        }
        toggleNotification({
          type: "success",
          message: formatMessage({ id: "notification.form.success.fields" })
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
  if (isLoading) {
    return /* @__PURE__ */ jsx(Page.Loading, {});
  }
  const [webhook] = webhooks ?? [];
  return /* @__PURE__ */ jsxs(Main, { children: [
    /* @__PURE__ */ jsx(Page.Title, { children: formatMessage(
      { id: "Settings.PageTitle", defaultMessage: "Settings - {name}" },
      {
        name: "Webhooks"
      }
    ) }),
    /* @__PURE__ */ jsx(
      WebhookForm,
      {
        data: webhook,
        handleSubmit,
        triggerWebhook: handleTriggerWebhook,
        isCreating,
        isTriggering,
        triggerResponse
      }
    )
  ] });
};
const ProtectedEditPage = () => {
  const permissions = useTypedSelector(selectAdminPermissions);
  return /* @__PURE__ */ jsx(Page.Protect, { permissions: permissions.settings?.webhooks.update, children: /* @__PURE__ */ jsx(EditPage, {}) });
};

const EditPage$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  EditPage,
  ProtectedEditPage
}, Symbol.toStringTag, { value: 'Module' }));

export { EditPage as E, Events as a, EditPage$1 as b };
//# sourceMappingURL=EditPage-DlKvCZKq.mjs.map

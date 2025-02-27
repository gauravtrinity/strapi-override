'use strict';

const jsxRuntime = require('react/jsx-runtime');
const reactIntl = require('react-intl');
const index = require('./index-UB9JNjeZ.js');
const designSystem = require('@strapi/design-system');
const icons = require('@strapi/icons');
const Theme = require('./Theme-DaGRg2qU.js');
const styledComponents = require('styled-components');
const useAdminRoles = require('./useAdminRoles-yQ7wdRBn.js');

const MagicLinkWrapper = ({ children, target }) => {
  const { toggleNotification } = Theme.useNotification();
  const { formatMessage } = reactIntl.useIntl();
  const { copy } = index.useClipboard();
  const copyLabel = formatMessage({
    id: "app.component.CopyToClipboard.label",
    defaultMessage: "Copy to clipboard"
  });
  const handleClick = async (e) => {
    e.preventDefault();
    const didCopy = await copy(target);
    if (didCopy) {
      toggleNotification({
        type: "info",
        message: formatMessage({ id: "notification.link-copied" })
      });
    }
  };
  return /* @__PURE__ */ jsxRuntime.jsx(
    index.ContentBox,
    {
      endAction: /* @__PURE__ */ jsxRuntime.jsx(designSystem.IconButton, { label: copyLabel, variant: "ghost", onClick: handleClick, children: /* @__PURE__ */ jsxRuntime.jsx(icons.Duplicate, {}) }),
      title: target,
      titleEllipsis: true,
      subtitle: children,
      icon: /* @__PURE__ */ jsxRuntime.jsx("span", { style: { fontSize: 32 }, children: "✉️" }),
      iconBackground: "neutral100"
    }
  );
};

const MagicLinkCE = ({ registrationToken }) => {
  const { formatMessage } = reactIntl.useIntl();
  const target = `${window.location.origin}${index.getBasename()}/auth/register?registrationToken=${registrationToken}`;
  return /* @__PURE__ */ jsxRuntime.jsx(MagicLinkWrapper, { target, children: formatMessage({
    id: "app.components.Users.MagicLink.connect",
    defaultMessage: "Copy and share this link to give access to this user"
  }) });
};

const SelectRoles = ({ disabled }) => {
  const { isLoading, roles } = useAdminRoles.useAdminRoles();
  const { formatMessage } = reactIntl.useIntl();
  const { value = [], onChange, error } = index.useField("roles");
  return /* @__PURE__ */ jsxRuntime.jsxs(
    designSystem.Field.Root,
    {
      error,
      hint: formatMessage({
        id: "app.components.Users.ModalCreateBody.block-title.roles.description",
        defaultMessage: "A user can have one or several roles"
      }),
      name: "roles",
      required: true,
      children: [
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Label, { children: formatMessage({
          id: "app.components.Users.ModalCreateBody.block-title.roles",
          defaultMessage: "User's roles"
        }) }),
        /* @__PURE__ */ jsxRuntime.jsx(
          designSystem.MultiSelect,
          {
            disabled,
            onChange: (v) => {
              onChange("roles", v);
            },
            placeholder: formatMessage({
              id: "app.components.Select.placeholder",
              defaultMessage: "Select"
            }),
            startIcon: isLoading ? /* @__PURE__ */ jsxRuntime.jsx(Loader, {}) : void 0,
            value: value.map((v) => v.toString()),
            withTags: true,
            children: roles.map((role) => {
              return /* @__PURE__ */ jsxRuntime.jsx(designSystem.MultiSelectOption, { value: role.id.toString(), children: formatMessage({
                id: `global.${role.code}`,
                defaultMessage: role.name
              }) }, role.id);
            })
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Error, {}),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Hint, {})
      ]
    }
  );
};
const rotation = styledComponents.keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
`;
const LoadingWrapper = styledComponents.styled.div`
  animation: ${rotation} 2s infinite linear;
`;
const Loader = () => /* @__PURE__ */ jsxRuntime.jsx(LoadingWrapper, { children: /* @__PURE__ */ jsxRuntime.jsx(icons.Loader, {}) });

exports.MagicLinkCE = MagicLinkCE;
exports.MagicLinkWrapper = MagicLinkWrapper;
exports.SelectRoles = SelectRoles;
//# sourceMappingURL=SelectRoles-BdEwXyKD.js.map

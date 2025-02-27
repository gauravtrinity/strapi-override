import { jsx, jsxs } from 'react/jsx-runtime';
import { useIntl } from 'react-intl';
import { t as useClipboard, v as ContentBox, l as getBasename, u as useField } from './index-CyEyTBzg.mjs';
import { IconButton, Field, MultiSelect, MultiSelectOption } from '@strapi/design-system';
import { Duplicate, Loader as Loader$1 } from '@strapi/icons';
import { u as useNotification } from './Theme-6doxg5FV.mjs';
import { keyframes, styled } from 'styled-components';
import { u as useAdminRoles } from './useAdminRoles-BKTaRDwU.mjs';

const MagicLinkWrapper = ({ children, target }) => {
  const { toggleNotification } = useNotification();
  const { formatMessage } = useIntl();
  const { copy } = useClipboard();
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
  return /* @__PURE__ */ jsx(
    ContentBox,
    {
      endAction: /* @__PURE__ */ jsx(IconButton, { label: copyLabel, variant: "ghost", onClick: handleClick, children: /* @__PURE__ */ jsx(Duplicate, {}) }),
      title: target,
      titleEllipsis: true,
      subtitle: children,
      icon: /* @__PURE__ */ jsx("span", { style: { fontSize: 32 }, children: "✉️" }),
      iconBackground: "neutral100"
    }
  );
};

const MagicLinkCE = ({ registrationToken }) => {
  const { formatMessage } = useIntl();
  const target = `${window.location.origin}${getBasename()}/auth/register?registrationToken=${registrationToken}`;
  return /* @__PURE__ */ jsx(MagicLinkWrapper, { target, children: formatMessage({
    id: "app.components.Users.MagicLink.connect",
    defaultMessage: "Copy and share this link to give access to this user"
  }) });
};

const SelectRoles = ({ disabled }) => {
  const { isLoading, roles } = useAdminRoles();
  const { formatMessage } = useIntl();
  const { value = [], onChange, error } = useField("roles");
  return /* @__PURE__ */ jsxs(
    Field.Root,
    {
      error,
      hint: formatMessage({
        id: "app.components.Users.ModalCreateBody.block-title.roles.description",
        defaultMessage: "A user can have one or several roles"
      }),
      name: "roles",
      required: true,
      children: [
        /* @__PURE__ */ jsx(Field.Label, { children: formatMessage({
          id: "app.components.Users.ModalCreateBody.block-title.roles",
          defaultMessage: "User's roles"
        }) }),
        /* @__PURE__ */ jsx(
          MultiSelect,
          {
            disabled,
            onChange: (v) => {
              onChange("roles", v);
            },
            placeholder: formatMessage({
              id: "app.components.Select.placeholder",
              defaultMessage: "Select"
            }),
            startIcon: isLoading ? /* @__PURE__ */ jsx(Loader, {}) : void 0,
            value: value.map((v) => v.toString()),
            withTags: true,
            children: roles.map((role) => {
              return /* @__PURE__ */ jsx(MultiSelectOption, { value: role.id.toString(), children: formatMessage({
                id: `global.${role.code}`,
                defaultMessage: role.name
              }) }, role.id);
            })
          }
        ),
        /* @__PURE__ */ jsx(Field.Error, {}),
        /* @__PURE__ */ jsx(Field.Hint, {})
      ]
    }
  );
};
const rotation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
`;
const LoadingWrapper = styled.div`
  animation: ${rotation} 2s infinite linear;
`;
const Loader = () => /* @__PURE__ */ jsx(LoadingWrapper, { children: /* @__PURE__ */ jsx(Loader$1, {}) });

export { MagicLinkCE as M, SelectRoles as S, MagicLinkWrapper as a };
//# sourceMappingURL=SelectRoles-CVKwZ747.mjs.map

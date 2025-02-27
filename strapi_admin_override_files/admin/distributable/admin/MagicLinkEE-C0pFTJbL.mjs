import { jsx } from 'react/jsx-runtime';
import { useIntl } from 'react-intl';
import { l as getBasename } from './index-CyEyTBzg.mjs';
import { a as MagicLinkWrapper } from './SelectRoles-CVKwZ747.mjs';

const MagicLinkEE = ({ registrationToken }) => {
  const { formatMessage } = useIntl();
  if (registrationToken) {
    return /* @__PURE__ */ jsx(
      MagicLinkWrapper,
      {
        target: `${window.location.origin}${getBasename()}/auth/register?registrationToken=${registrationToken}`,
        children: formatMessage({
          id: "app.components.Users.MagicLink.connect",
          defaultMessage: "Copy and share this link to give access to this user"
        })
      }
    );
  }
  return /* @__PURE__ */ jsx(MagicLinkWrapper, { target: `${window.location.origin}${getBasename()}/auth/login`, children: formatMessage({
    id: "app.components.Users.MagicLink.connect.sso",
    defaultMessage: "Send this link to the user, the first login can be made via a SSO provider."
  }) });
};

export { MagicLinkEE };
//# sourceMappingURL=MagicLinkEE-C0pFTJbL.mjs.map

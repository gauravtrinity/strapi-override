'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const jsxRuntime = require('react/jsx-runtime');
const reactIntl = require('react-intl');
const reactRouterDom = require('react-router-dom');
const index = require('./index-UB9JNjeZ.js');
const Theme = require('./Theme-DaGRg2qU.js');
const React = require('react');
const sortBy = require('lodash/sortBy');
const reactRedux = require('react-redux');
const selectors = require('./selectors-BKYO5J5S.js');
const useEnterprise = require('./useEnterprise-ijNnK53J.js');
const designSystem = require('@strapi/design-system');
const icons = require('@strapi/icons');
const styledComponents = require('styled-components');

const _interopDefault = e => e && e.__esModule ? e : { default: e };

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
const sortBy__default = /*#__PURE__*/_interopDefault(sortBy);

const formatLinks = (menu) => menu.map((menuSection) => {
  const formattedLinks = menuSection.links.map((link) => ({
    ...link,
    isDisplayed: false
  }));
  return { ...menuSection, links: formattedLinks };
});
const useSettingsMenu = () => {
  const [{ isLoading, menu }, setData] = React__namespace.useState({
    isLoading: true,
    menu: []
  });
  const checkUserHasPermission = Theme.useAuth(
    "useSettingsMenu",
    (state) => state.checkUserHasPermissions
  );
  const shouldUpdateStrapi = Theme.useAppInfo("useSettingsMenu", (state) => state.shouldUpdateStrapi);
  const settings = Theme.useStrapiApp("useSettingsMenu", (state) => state.settings);
  const permissions = reactRedux.useSelector(selectors.selectAdminPermissions);
  const ceLinks = React__namespace.useMemo(() => index.SETTINGS_LINKS_CE(), []);
  const { admin: adminLinks, global: globalLinks } = useEnterprise.useEnterprise(
    ceLinks,
    async () => (await Promise.resolve().then(() => require('./index-UB9JNjeZ.js')).then(n => n.constants)).SETTINGS_LINKS_EE(),
    {
      combine(ceLinks2, eeLinks) {
        return {
          admin: [...eeLinks.admin, ...ceLinks2.admin],
          global: [...ceLinks2.global, ...eeLinks.global]
        };
      },
      defaultValue: {
        admin: [],
        global: []
      }
    }
  );
  const addPermissions = React__namespace.useCallback(
    (link) => {
      if (!link.id) {
        throw new Error("The settings menu item must have an id attribute.");
      }
      return {
        ...link,
        permissions: permissions.settings?.[link.id]?.main ?? []
      };
    },
    [permissions.settings]
  );
  React__namespace.useEffect(() => {
    const getData = async () => {
      const buildMenuPermissions = (sections2) => Promise.all(
        sections2.reduce((acc, section, sectionIndex) => {
          const linksWithPermissions = section.links.map(async (link, linkIndex) => ({
            hasPermission: (await checkUserHasPermission(link.permissions)).length > 0,
            sectionIndex,
            linkIndex
          }));
          return [...acc, ...linksWithPermissions];
        }, [])
      );
      const menuPermissions = await buildMenuPermissions(sections);
      setData((prev) => {
        return {
          ...prev,
          isLoading: false,
          menu: sections.map((section, sectionIndex) => ({
            ...section,
            links: section.links.map((link, linkIndex) => {
              const permission = menuPermissions.find(
                (permission2) => permission2.sectionIndex === sectionIndex && permission2.linkIndex === linkIndex
              );
              return {
                ...link,
                isDisplayed: Boolean(permission?.hasPermission)
              };
            })
          }))
        };
      });
    };
    const { global, ...otherSections } = settings;
    const sections = formatLinks([
      {
        ...global,
        links: sortBy__default.default([...global.links, ...globalLinks.map(addPermissions)], (link) => link.id).map(
          (link) => ({
            ...link,
            hasNotification: link.id === "000-application-infos" && shouldUpdateStrapi
          })
        )
      },
      {
        id: "permissions",
        intlLabel: { id: "Settings.permissions", defaultMessage: "Administration Panel" },
        links: adminLinks.map(addPermissions)
      },
      ...Object.values(otherSections)
    ]);
    getData();
  }, [
    adminLinks,
    globalLinks,
    settings,
    shouldUpdateStrapi,
    addPermissions,
    checkUserHasPermission
  ]);
  return {
    isLoading,
    menu: menu.map((menuItem) => ({
      ...menuItem,
      links: menuItem.links.filter((link) => link.isDisplayed)
    }))
  };
};

const CustomIcon = styledComponents.styled(icons.Lightning)`
  right: 15px;
  position: absolute;
  bottom: 50%;
  transform: translateY(50%);

  path {
    fill: ${({ theme }) => theme.colors.warning500};
  }
`;
const Link = styledComponents.styled(designSystem.SubNavLink)`
  &.active ${CustomIcon} {
    right: 13px;
  }
`;
const SettingsNav = ({ menu }) => {
  const { formatMessage } = reactIntl.useIntl();
  const { trackUsage } = Theme.useTracking();
  const { pathname } = reactRouterDom.useLocation();
  const filteredMenu = menu.filter(
    (section) => !section.links.every((link) => link.isDisplayed === false)
  );
  const sections = filteredMenu.map((section) => {
    return {
      ...section,
      title: section.intlLabel,
      links: section.links.map((link) => {
        return {
          ...link,
          title: link.intlLabel,
          name: link.id
        };
      })
    };
  });
  const label = formatMessage({
    id: "global.settings",
    defaultMessage: "Settings"
  });
  const handleClickOnLink = (destination) => () => {
    trackUsage("willNavigate", { from: pathname, to: destination });
  };
  return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.SubNav, { "aria-label": label, children: [
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.SubNavHeader, { label }),
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.SubNavSections, { children: sections.map((section) => /* @__PURE__ */ jsxRuntime.jsx(designSystem.SubNavSection, { label: formatMessage(section.intlLabel), children: section.links.map((link) => {
      return /* @__PURE__ */ jsxRuntime.jsxs(
        Link,
        {
          tag: reactRouterDom.NavLink,
          withBullet: link.hasNotification,
          to: link.to,
          onClick: handleClickOnLink(link.to),
          position: "relative",
          children: [
            formatMessage(link.intlLabel),
            link?.licenseOnly && /* @__PURE__ */ jsxRuntime.jsx(CustomIcon, { width: "1.5rem", height: "1.5rem" })
          ]
        },
        link.id
      );
    }) }, section.id)) })
  ] });
};

const Layout = () => {
  const match = reactRouterDom.useMatch("/settings/:settingId/*");
  const { formatMessage } = reactIntl.useIntl();
  const { isLoading, menu } = useSettingsMenu();
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntime.jsx(Theme.Page.Loading, {});
  }
  if (!match?.params.settingId) {
    return /* @__PURE__ */ jsxRuntime.jsx(reactRouterDom.Navigate, { to: "application-infos" });
  }
  return /* @__PURE__ */ jsxRuntime.jsxs(index.Layouts.Root, { sideNav: /* @__PURE__ */ jsxRuntime.jsx(SettingsNav, { menu }), children: [
    /* @__PURE__ */ jsxRuntime.jsx(Theme.Page.Title, { children: formatMessage({
      id: "global.settings",
      defaultMessage: "Settings"
    }) }),
    /* @__PURE__ */ jsxRuntime.jsx(reactRouterDom.Outlet, {})
  ] });
};

exports.Layout = Layout;
//# sourceMappingURL=Layout-uo9_GnVH.js.map

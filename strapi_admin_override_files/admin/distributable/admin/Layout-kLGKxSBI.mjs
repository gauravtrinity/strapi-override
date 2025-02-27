import { jsxs, jsx } from 'react/jsx-runtime';
import { useIntl } from 'react-intl';
import { useLocation, NavLink, useMatch, Navigate, Outlet } from 'react-router-dom';
import { p as SETTINGS_LINKS_CE, b as Layouts } from './index-CyEyTBzg.mjs';
import { a as useAuth, p as useAppInfo, q as useStrapiApp, c as useTracking, P as Page } from './Theme-6doxg5FV.mjs';
import * as React from 'react';
import sortBy from 'lodash/sortBy';
import { useSelector } from 'react-redux';
import { s as selectAdminPermissions } from './selectors-DXYlWdPm.mjs';
import { u as useEnterprise } from './useEnterprise-BGzVPL4w.mjs';
import { SubNavLink, SubNav, SubNavHeader, SubNavSections, SubNavSection } from '@strapi/design-system';
import { Lightning } from '@strapi/icons';
import { styled } from 'styled-components';

const formatLinks = (menu) => menu.map((menuSection) => {
  const formattedLinks = menuSection.links.map((link) => ({
    ...link,
    isDisplayed: false
  }));
  return { ...menuSection, links: formattedLinks };
});
const useSettingsMenu = () => {
  const [{ isLoading, menu }, setData] = React.useState({
    isLoading: true,
    menu: []
  });
  const checkUserHasPermission = useAuth(
    "useSettingsMenu",
    (state) => state.checkUserHasPermissions
  );
  const shouldUpdateStrapi = useAppInfo("useSettingsMenu", (state) => state.shouldUpdateStrapi);
  const settings = useStrapiApp("useSettingsMenu", (state) => state.settings);
  const permissions = useSelector(selectAdminPermissions);
  const ceLinks = React.useMemo(() => SETTINGS_LINKS_CE(), []);
  const { admin: adminLinks, global: globalLinks } = useEnterprise(
    ceLinks,
    async () => (await import('./index-CyEyTBzg.mjs').then(n => n.K)).SETTINGS_LINKS_EE(),
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
  const addPermissions = React.useCallback(
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
  React.useEffect(() => {
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
        links: sortBy([...global.links, ...globalLinks.map(addPermissions)], (link) => link.id).map(
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

const CustomIcon = styled(Lightning)`
  right: 15px;
  position: absolute;
  bottom: 50%;
  transform: translateY(50%);

  path {
    fill: ${({ theme }) => theme.colors.warning500};
  }
`;
const Link = styled(SubNavLink)`
  &.active ${CustomIcon} {
    right: 13px;
  }
`;
const SettingsNav = ({ menu }) => {
  const { formatMessage } = useIntl();
  const { trackUsage } = useTracking();
  const { pathname } = useLocation();
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
  return /* @__PURE__ */ jsxs(SubNav, { "aria-label": label, children: [
    /* @__PURE__ */ jsx(SubNavHeader, { label }),
    /* @__PURE__ */ jsx(SubNavSections, { children: sections.map((section) => /* @__PURE__ */ jsx(SubNavSection, { label: formatMessage(section.intlLabel), children: section.links.map((link) => {
      return /* @__PURE__ */ jsxs(
        Link,
        {
          tag: NavLink,
          withBullet: link.hasNotification,
          to: link.to,
          onClick: handleClickOnLink(link.to),
          position: "relative",
          children: [
            formatMessage(link.intlLabel),
            link?.licenseOnly && /* @__PURE__ */ jsx(CustomIcon, { width: "1.5rem", height: "1.5rem" })
          ]
        },
        link.id
      );
    }) }, section.id)) })
  ] });
};

const Layout = () => {
  const match = useMatch("/settings/:settingId/*");
  const { formatMessage } = useIntl();
  const { isLoading, menu } = useSettingsMenu();
  if (isLoading) {
    return /* @__PURE__ */ jsx(Page.Loading, {});
  }
  if (!match?.params.settingId) {
    return /* @__PURE__ */ jsx(Navigate, { to: "application-infos" });
  }
  return /* @__PURE__ */ jsxs(Layouts.Root, { sideNav: /* @__PURE__ */ jsx(SettingsNav, { menu }), children: [
    /* @__PURE__ */ jsx(Page.Title, { children: formatMessage({
      id: "global.settings",
      defaultMessage: "Settings"
    }) }),
    /* @__PURE__ */ jsx(Outlet, {})
  ] });
};

export { Layout };
//# sourceMappingURL=Layout-kLGKxSBI.mjs.map

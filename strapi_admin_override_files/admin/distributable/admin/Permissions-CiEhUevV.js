'use strict';

const jsxRuntime = require('react/jsx-runtime');
const React = require('react');
const designSystem = require('@strapi/design-system');
const immer = require('immer');
const cloneDeep = require('lodash/cloneDeep');
const get = require('lodash/get');
const has = require('lodash/has');
const isEmpty = require('lodash/isEmpty');
const set = require('lodash/set');
const reactIntl = require('react-intl');
const Theme = require('./Theme-DaGRg2qU.js');
const reactContext = require('@radix-ui/react-context');
const isEqual = require('lodash/isEqual');
const isObject = require('lodash/isObject');
const transform = require('lodash/transform');
const merge = require('lodash/merge');
const groupBy = require('lodash/groupBy');
const omit = require('lodash/omit');
const icons = require('@strapi/icons');
const styledComponents = require('styled-components');
const upperFirst = require('lodash/upperFirst');

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
const cloneDeep__default = /*#__PURE__*/_interopDefault(cloneDeep);
const get__default = /*#__PURE__*/_interopDefault(get);
const has__default = /*#__PURE__*/_interopDefault(has);
const isEmpty__default = /*#__PURE__*/_interopDefault(isEmpty);
const set__default = /*#__PURE__*/_interopDefault(set);
const isEqual__default = /*#__PURE__*/_interopDefault(isEqual);
const isObject__default = /*#__PURE__*/_interopDefault(isObject);
const transform__default = /*#__PURE__*/_interopDefault(transform);
const merge__default = /*#__PURE__*/_interopDefault(merge);
const groupBy__default = /*#__PURE__*/_interopDefault(groupBy);
const omit__default = /*#__PURE__*/_interopDefault(omit);
const upperFirst__default = /*#__PURE__*/_interopDefault(upperFirst);

const [PermissionsDataManagerProvider, usePermissionsDataManagerContext] = reactContext.createContext("PermissionsDataManager");
const usePermissionsDataManager = () => usePermissionsDataManagerContext("usePermissionsDataManager");

function difference(object, base) {
  function changes(object2, base2) {
    return transform__default.default(object2, (result, value, key) => {
      if (!isEqual__default.default(value, base2[key])) {
        result[key] = isObject__default.default(value) && isObject__default.default(base2[key]) ? changes(value, base2[key]) : value;
      }
      return result;
    });
  }
  return changes(object, base);
}

const flattenDeep = (array) => {
  if (Array.isArray(array)) {
    return array.reduce(
      (acc, value) => {
        if (Array.isArray(value)) {
          acc.push(...flattenDeep(value));
        } else {
          acc.push(value);
        }
        return acc;
      },
      []
    );
  } else {
    return [];
  }
};

const createArrayOfValues = (obj) => {
  if (!Theme.isObject(obj)) {
    return [];
  }
  return flattenDeep(
    Object.values(obj).map((value) => {
      if (Theme.isObject(value)) {
        return createArrayOfValues(value);
      }
      return value;
    })
  );
};

const findMatchingPermission = (permissions, action, subject) => permissions.find((perm) => perm.action === action && perm.subject === subject);
const formatPermissionsForAPI = (modifiedData) => {
  const pluginsPermissions = formatSettingsPermissions(modifiedData.plugins);
  const settingsPermissions = formatSettingsPermissions(modifiedData.settings);
  const collectionTypesPermissions = formatContentTypesPermissions(modifiedData.collectionTypes);
  const singleTypesPermissions = formatContentTypesPermissions(modifiedData.singleTypes);
  return [
    ...pluginsPermissions,
    ...settingsPermissions,
    ...collectionTypesPermissions,
    ...singleTypesPermissions
  ];
};
const formatSettingsPermissions = (settingsPermissionsObject) => {
  return Object.values(settingsPermissionsObject).reduce((formAcc, form) => {
    const currentCategoryPermissions = Object.values(form).reduce(
      (childFormAcc, childForm) => {
        const permissions = Object.entries(childForm).reduce(
          (responsesAcc, [
            actionName,
            {
              conditions,
              properties: { enabled }
            }
          ]) => {
            if (!enabled) {
              return responsesAcc;
            }
            responsesAcc.push({
              action: actionName,
              subject: null,
              conditions: createConditionsArray(conditions),
              properties: {}
            });
            return responsesAcc;
          },
          []
        );
        return [...childFormAcc, ...permissions];
      },
      []
    );
    return [...formAcc, ...currentCategoryPermissions];
  }, []);
};
const formatContentTypesPermissions = (contentTypesPermissions) => {
  const permissions = Object.entries(contentTypesPermissions).reduce(
    (allPermissions, current) => {
      const [subject, currentSubjectActions] = current;
      const permissions2 = Object.entries(currentSubjectActions).reduce(
        (acc, current2) => {
          const [actionName, permissions3] = current2;
          const shouldCreatePermission = createArrayOfValues(permissions3).some((val) => val);
          if (!shouldCreatePermission) {
            return acc;
          }
          if (!permissions3?.properties?.enabled) {
            const createdPermissionsArray = Object.entries(permissions3.properties).reduce(
              (acc2, current3) => {
                const [propertyName, propertyValue] = current3;
                acc2.properties[propertyName] = createPropertyArray(propertyValue);
                return acc2;
              },
              {
                action: actionName,
                subject,
                conditions: createConditionsArray(permissions3.conditions),
                properties: {}
              }
            );
            return [...acc, createdPermissionsArray];
          }
          if (!permissions3.properties.enabled) {
            return acc;
          }
          acc.push({
            action: actionName,
            subject,
            properties: {},
            conditions: createConditionsArray(permissions3.conditions)
          });
          return acc;
        },
        []
      );
      return [...allPermissions, ...permissions2];
    },
    []
  );
  return permissions;
};
const createPropertyArray = (propertyValue, prefix = "") => {
  return Object.entries(propertyValue).reduce((acc, current) => {
    const [name, value] = current;
    if (Theme.isObject(value)) {
      return [...acc, ...createPropertyArray(value, `${prefix}${name}.`)];
    }
    if (value && !Theme.isObject(value)) {
      acc.push(`${prefix}${name}`);
    }
    return acc;
  }, []);
};
const createConditionsArray = (conditions) => Object.entries(conditions).filter(([, conditionValue]) => {
  return conditionValue;
}).map(([conditionName]) => conditionName);

const createDefaultConditionsForm$1 = (conditions, initialConditions = []) => conditions.reduce((acc, current) => {
  acc[current.id] = initialConditions.indexOf(current.id) !== -1;
  return acc;
}, {});
const createDefaultForm = (layout, conditions, initialPermissions = []) => {
  return layout.reduce((acc, { categoryId, childrenForm }) => {
    const childrenDefaultForm = childrenForm.reduce((acc2, current) => {
      acc2[current.subCategoryId] = current.actions.reduce((acc3, current2) => {
        const foundMatchingPermission = findMatchingPermission(
          initialPermissions,
          current2.action,
          null
        );
        acc3[current2.action] = {
          properties: {
            enabled: foundMatchingPermission !== void 0
          },
          conditions: createDefaultConditionsForm$1(
            conditions,
            foundMatchingPermission?.conditions ?? []
          )
        };
        return acc3;
      }, {});
      return acc2;
    }, {});
    acc[categoryId] = childrenDefaultForm;
    return acc;
  }, {});
};
const createDefaultPropertiesForm = (properties, subject, matchingPermission) => {
  const recursivelyCreatePropertyForm = ({ children = [] }, propertyValues, prefix = "") => {
    return children.reduce((acc, current) => {
      if (current.children) {
        return {
          ...acc,
          [current.value]: recursivelyCreatePropertyForm(
            current,
            propertyValues,
            `${prefix}${current.value}.`
          )
        };
      }
      const hasProperty = propertyValues.indexOf(`${prefix}${current.value}`) !== -1;
      acc[current.value] = hasProperty;
      return acc;
    }, {});
  };
  return properties.reduce(
    (acc, currentPropertyName) => {
      const foundProperty = subject.properties.find(({ value }) => value === currentPropertyName);
      if (foundProperty) {
        const matchingPermissionPropertyValues = matchingPermission?.properties[foundProperty.value] ?? [];
        const propertyForm = recursivelyCreatePropertyForm(
          foundProperty,
          matchingPermissionPropertyValues
        );
        acc.properties[currentPropertyName] = propertyForm;
      }
      return acc;
    },
    { properties: {} }
  );
};
const createDefaultCTForm = ({ subjects, actions = [] }, conditions, initialPermissions = []) => {
  return actions.reduce((defaultForm, action) => {
    const subjectLayouts = action.subjects.reduce((acc, current) => {
      const foundLayout = subjects.find(({ uid }) => uid === current) || null;
      if (foundLayout) {
        acc[current] = foundLayout;
      }
      return acc;
    }, {});
    if (isEmpty__default.default(subjectLayouts)) {
      return defaultForm;
    }
    const contentTypesActions = Object.keys(subjectLayouts).reduce((acc, currentCTUID) => {
      const { actionId, applyToProperties } = action;
      const currentSubjectLayout = subjectLayouts[currentCTUID];
      const properties = currentSubjectLayout.properties.map(({ value }) => value);
      const doesNothaveProperty = properties.every(
        (property) => (applyToProperties || []).indexOf(property) === -1
      );
      const matchingPermission = findMatchingPermission(initialPermissions, actionId, currentCTUID);
      const conditionsForm = createDefaultConditionsForm$1(
        conditions,
        matchingPermission?.conditions ?? []
      );
      if (!acc[currentCTUID]) {
        acc[currentCTUID] = {};
      }
      if (isEmpty__default.default(applyToProperties) || doesNothaveProperty) {
        acc[currentCTUID][actionId] = {
          properties: {
            enabled: matchingPermission !== void 0
          },
          conditions: conditionsForm
        };
        return acc;
      }
      const propertiesForm = createDefaultPropertiesForm(
        applyToProperties,
        subjectLayouts[currentCTUID],
        matchingPermission
      );
      acc[currentCTUID][actionId] = { ...propertiesForm, conditions: conditionsForm };
      return acc;
    }, {});
    return merge__default.default(defaultForm, contentTypesActions);
  }, {});
};

const formatLayout = (layout, groupByKey) => {
  return Object.entries(groupBy__default.default(layout, groupByKey)).map(([itemName, item]) => ({
    category: itemName,
    categoryId: itemName.split(" ").join("-"),
    childrenForm: Object.entries(groupBy__default.default(item, "subCategory")).map(
      ([subCategoryName, actions]) => ({
        subCategoryName,
        subCategoryId: subCategoryName.split(" ").join("-"),
        actions
      })
    )
  }));
};

const updateConditionsToFalse = (obj) => {
  return Object.keys(obj).reduce((acc, current) => {
    const currentValue = obj[current];
    if (Theme.isObject(currentValue) && !has__default.default(currentValue, "conditions")) {
      return { ...acc, [current]: updateConditionsToFalse(currentValue) };
    }
    if (Theme.isObject(currentValue) && has__default.default(currentValue, "conditions")) {
      const isActionEnabled = createArrayOfValues(omit__default.default(currentValue, "conditions")).some(
        (val) => val
      );
      if (!isActionEnabled) {
        const updatedConditions = Object.keys(currentValue.conditions).reduce((acc1, current2) => {
          acc1[current2] = false;
          return acc1;
        }, {});
        return { ...acc, [current]: { ...currentValue, conditions: updatedConditions } };
      }
    }
    acc[current] = currentValue;
    return acc;
  }, {});
};

const updateValues = (obj, valueToSet, isFieldUpdate = false) => {
  return Object.keys(obj).reduce((acc, current) => {
    const currentValue = obj[current];
    if (current === "conditions" && !isFieldUpdate) {
      acc[current] = currentValue;
      return acc;
    }
    if (Theme.isObject(currentValue)) {
      return { ...acc, [current]: updateValues(currentValue, valueToSet, current === "fields") };
    }
    acc[current] = valueToSet;
    return acc;
  }, {});
};

const cellWidth = `12rem`;
const firstRowWidth = `20rem`;
const rowHeight = `5.3rem`;

const removeConditionKeyFromData = (obj) => {
  if (!obj) {
    return null;
  }
  return Object.entries(obj).reduce((acc, [key, value]) => {
    if (key !== "conditions") {
      acc[key] = value;
    }
    return acc;
  }, {});
};

const getCheckboxState = (dataObj) => {
  const dataWithoutCondition = removeConditionKeyFromData(dataObj);
  const arrayOfValues = createArrayOfValues(dataWithoutCondition);
  if (!arrayOfValues.length) {
    return { hasAllActionsSelected: false, hasSomeActionsSelected: false };
  }
  const hasAllActionsSelected = arrayOfValues.every((val) => val);
  const hasSomeActionsSelected = arrayOfValues.some((val) => val) && !hasAllActionsSelected;
  return { hasAllActionsSelected, hasSomeActionsSelected };
};

const CollapseLabel = styledComponents.styled(designSystem.Flex)`
  padding-right: ${({ theme }) => theme.spaces[2]};
  overflow: hidden;
  flex: 1;
  ${({ $isCollapsable }) => $isCollapsable && "cursor: pointer;"}
`;

const HiddenAction = styledComponents.styled.div`
  width: ${cellWidth};
`;

const RequiredSign = () => /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { color: "danger700", paddingLeft: 1, children: "*" });

const RowLabelWithCheckbox = ({
  checkboxName = "",
  children,
  isActive = false,
  isCollapsable = false,
  isFormDisabled = false,
  label,
  onChange,
  onClick,
  someChecked = false,
  value
}) => {
  const { formatMessage } = reactIntl.useIntl();
  const collapseLabelProps = {
    title: label,
    alignItems: "center",
    $isCollapsable: isCollapsable
  };
  if (isCollapsable) {
    Object.assign(collapseLabelProps, {
      onClick,
      "aria-expanded": isActive,
      onKeyDown({ key }) {
        if (key === "Enter" || key === " ") {
          onClick();
        }
      },
      tabIndex: 0,
      role: "button"
    });
  }
  return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { alignItems: "center", paddingLeft: 6, width: firstRowWidth, shrink: 0, children: [
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { paddingRight: 2, children: /* @__PURE__ */ jsxRuntime.jsx(
      designSystem.Checkbox,
      {
        name: checkboxName,
        "aria-label": formatMessage(
          {
            id: `Settings.permissions.select-all-by-permission`,
            defaultMessage: "Select all {label} permissions"
          },
          { label }
        ),
        disabled: isFormDisabled,
        onCheckedChange: (value2) => onChange({
          target: {
            name: checkboxName,
            value: !!value2
          }
        }),
        checked: someChecked ? "indeterminate" : value
      }
    ) }),
    /* @__PURE__ */ jsxRuntime.jsxs(CollapseLabel, { ...collapseLabelProps, children: [
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { ellipsis: true, children: label }),
      children
    ] })
  ] });
};

const CollapsePropertyMatrix = ({
  availableActions = [],
  childrenForm = [],
  isFormDisabled,
  label,
  pathToData,
  propertyName
}) => {
  const propertyActions = React__namespace.useMemo(
    () => availableActions.map((action) => {
      const isActionRelatedToCurrentProperty = Array.isArray(action.applyToProperties) && action.applyToProperties.indexOf(propertyName) !== -1 && action.isDisplayed;
      return { label: action.label, actionId: action.actionId, isActionRelatedToCurrentProperty };
    }),
    [availableActions, propertyName]
  );
  return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { display: "inline-flex", direction: "column", alignItems: "stretch", minWidth: 0, children: [
    /* @__PURE__ */ jsxRuntime.jsx(Header, { label, headers: propertyActions }),
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { children: childrenForm.map(({ children: childrenForm2, label: label2, value, required }, i) => /* @__PURE__ */ jsxRuntime.jsx(
      ActionRow$1,
      {
        childrenForm: childrenForm2,
        label: label2,
        isFormDisabled,
        name: value,
        required,
        propertyActions,
        pathToData,
        propertyName,
        isOdd: i % 2 === 0
      },
      value
    )) })
  ] });
};
const ActionRow$1 = ({
  childrenForm = [],
  label,
  isFormDisabled = false,
  name,
  required = false,
  pathToData,
  propertyActions,
  propertyName,
  isOdd = false
}) => {
  const { formatMessage } = reactIntl.useIntl();
  const [rowToOpen, setRowToOpen] = React__namespace.useState(null);
  const {
    modifiedData,
    onChangeCollectionTypeLeftActionRowCheckbox,
    onChangeParentCheckbox,
    onChangeSimpleCheckbox
  } = usePermissionsDataManager();
  const isActive = rowToOpen === name;
  const recursiveChildren = React__namespace.useMemo(() => {
    if (!Array.isArray(childrenForm)) {
      return [];
    }
    return childrenForm;
  }, [childrenForm]);
  const isCollapsable = recursiveChildren.length > 0;
  const handleClick = React__namespace.useCallback(() => {
    if (isCollapsable) {
      setRowToOpen((prev) => {
        if (prev === name) {
          return null;
        }
        return name;
      });
    }
  }, [isCollapsable, name]);
  const handleChangeLeftRowCheckbox = ({
    target: { value }
  }) => {
    onChangeCollectionTypeLeftActionRowCheckbox(pathToData, propertyName, name, value);
  };
  const { hasAllActionsSelected, hasSomeActionsSelected } = React__namespace.useMemo(() => {
    return getRowLabelCheckboxState(propertyActions, modifiedData, pathToData, propertyName, name);
  }, [propertyActions, modifiedData, pathToData, propertyName, name]);
  return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(
      Wrapper$1,
      {
        alignItems: "center",
        $isCollapsable: isCollapsable,
        $isActive: isActive,
        background: isOdd ? "neutral100" : "neutral0",
        children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { children: [
          /* @__PURE__ */ jsxRuntime.jsxs(
            RowLabelWithCheckbox,
            {
              onChange: handleChangeLeftRowCheckbox,
              onClick: handleClick,
              isCollapsable,
              isFormDisabled,
              label,
              someChecked: hasSomeActionsSelected,
              value: hasAllActionsSelected,
              isActive,
              children: [
                required && /* @__PURE__ */ jsxRuntime.jsx(RequiredSign, {}),
                /* @__PURE__ */ jsxRuntime.jsx(CarretIcon, { $isActive: isActive })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Flex, { children: propertyActions.map(({ label: label2, isActionRelatedToCurrentProperty, actionId }) => {
            if (!isActionRelatedToCurrentProperty) {
              return /* @__PURE__ */ jsxRuntime.jsx(HiddenAction, {}, label2);
            }
            const checkboxName = [
              ...pathToData.split(".."),
              actionId,
              "properties",
              propertyName,
              name
            ];
            if (!isCollapsable) {
              const checkboxValue = get__default.default(modifiedData, checkboxName, false);
              return /* @__PURE__ */ jsxRuntime.jsx(
                designSystem.Flex,
                {
                  width: cellWidth,
                  position: "relative",
                  justifyContent: "center",
                  alignItems: "center",
                  children: /* @__PURE__ */ jsxRuntime.jsx(
                    designSystem.Checkbox,
                    {
                      disabled: isFormDisabled,
                      name: checkboxName.join(".."),
                      "aria-label": formatMessage(
                        {
                          id: `Settings.permissions.select-by-permission`,
                          defaultMessage: "Select {label} permission"
                        },
                        { label: `${name} ${label2}` }
                      ),
                      onCheckedChange: (value) => {
                        onChangeSimpleCheckbox({
                          target: {
                            name: checkboxName.join(".."),
                            value: !!value
                          }
                        });
                      },
                      checked: checkboxValue
                    }
                  )
                },
                actionId
              );
            }
            const data = get__default.default(modifiedData, checkboxName, {});
            const { hasAllActionsSelected: hasAllActionsSelected2, hasSomeActionsSelected: hasSomeActionsSelected2 } = getCheckboxState(data);
            return /* @__PURE__ */ jsxRuntime.jsx(
              designSystem.Flex,
              {
                width: cellWidth,
                position: "relative",
                justifyContent: "center",
                alignItems: "center",
                children: /* @__PURE__ */ jsxRuntime.jsx(
                  designSystem.Checkbox,
                  {
                    disabled: isFormDisabled,
                    name: checkboxName.join(".."),
                    onCheckedChange: (value) => {
                      onChangeParentCheckbox({
                        target: {
                          name: checkboxName.join(".."),
                          value: !!value
                        }
                      });
                    },
                    "aria-label": formatMessage(
                      {
                        id: `Settings.permissions.select-by-permission`,
                        defaultMessage: "Select {label} permission"
                      },
                      { label: `${name} ${label2}` }
                    ),
                    checked: hasSomeActionsSelected2 ? "indeterminate" : hasAllActionsSelected2
                  }
                )
              },
              label2
            );
          }) })
        ] })
      }
    ),
    isActive && /* @__PURE__ */ jsxRuntime.jsx(
      SubActionRow,
      {
        childrenForm: recursiveChildren,
        isFormDisabled,
        parentName: name,
        pathToDataFromActionRow: pathToData,
        propertyName,
        propertyActions,
        recursiveLevel: 0
      }
    )
  ] });
};
const getRowLabelCheckboxState = (propertyActions, modifiedData, pathToContentType, propertyToCheck, targetKey) => {
  const actionIds = propertyActions.reduce((acc, current) => {
    if (current.isActionRelatedToCurrentProperty) {
      acc.push(current.actionId);
    }
    return acc;
  }, []);
  const data = actionIds.reduce((acc, current) => {
    const mainData = get__default.default(
      modifiedData,
      [...pathToContentType.split(".."), current, "properties", propertyToCheck, targetKey],
      false
    );
    acc[current] = mainData;
    return acc;
  }, {});
  return getCheckboxState(data);
};
const Wrapper$1 = styledComponents.styled(designSystem.Flex)`
  height: ${rowHeight};
  flex: 1;

  &:hover {
    ${({ $isCollapsable, theme }) => $isCollapsable && activeStyle(theme)}
  }

  ${({ $isCollapsable }) => $isCollapsable && `
      ${CarretIcon} {
        display: flex;
      }
  `}
  ${({ $isActive, theme }) => $isActive && activeStyle(theme)};
`;
const CarretIcon = styledComponents.styled(icons.CaretDown)`
  display: none;

  svg {
    width: 1.4rem;
  }

  path {
    fill: ${({ theme }) => theme.colors.neutral200};
  }

  transform: rotate(${({ $isActive }) => $isActive ? "180" : "0"}deg);
  margin-left: ${({ theme }) => theme.spaces[2]};
`;
const SubActionRow = ({
  childrenForm = [],
  isFormDisabled,
  recursiveLevel,
  pathToDataFromActionRow,
  propertyActions,
  parentName,
  propertyName
}) => {
  const { formatMessage } = reactIntl.useIntl();
  const { modifiedData, onChangeParentCheckbox, onChangeSimpleCheckbox } = usePermissionsDataManager();
  const [rowToOpen, setRowToOpen] = React__namespace.useState(null);
  const handleClickToggleSubLevel = (name) => {
    setRowToOpen((prev) => {
      if (prev === name) {
        return null;
      }
      return name;
    });
  };
  const displayedRecursiveChildren = React__namespace.useMemo(() => {
    if (!rowToOpen) {
      return null;
    }
    return childrenForm.find(({ value }) => value === rowToOpen);
  }, [rowToOpen, childrenForm]);
  return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Box, { paddingLeft: `3.2rem`, children: [
    /* @__PURE__ */ jsxRuntime.jsx(TopTimeline, {}),
    childrenForm.map(({ label, value, required, children: subChildrenForm }, index) => {
      const isVisible = index + 1 < childrenForm.length;
      const isArrayType = Array.isArray(subChildrenForm);
      const isActive = rowToOpen === value;
      return /* @__PURE__ */ jsxRuntime.jsxs(LeftBorderTimeline, { $isVisible: isVisible, children: [
        /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { height: rowHeight, children: [
          /* @__PURE__ */ jsxRuntime.jsx(StyledBox, { children: /* @__PURE__ */ jsxRuntime.jsx(
            Svg,
            {
              width: "20",
              height: "23",
              viewBox: "0 0 20 23",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              $color: "primary200",
              children: /* @__PURE__ */ jsxRuntime.jsx(
                "path",
                {
                  fillRule: "evenodd",
                  clipRule: "evenodd",
                  d: "M7.02477 14.7513C8.65865 17.0594 11.6046 18.6059 17.5596 18.8856C18.6836 18.9384 19.5976 19.8435 19.5976 20.9688V20.9688C19.5976 22.0941 18.6841 23.0125 17.5599 22.9643C10.9409 22.6805 6.454 20.9387 3.75496 17.1258C0.937988 13.1464 0.486328 7.39309 0.486328 0.593262H4.50974C4.50974 7.54693 5.06394 11.9813 7.02477 14.7513Z",
                  fill: "#D9D8FF"
                }
              )
            }
          ) }),
          /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { style: { flex: 1 }, children: [
            /* @__PURE__ */ jsxRuntime.jsx(RowStyle, { $level: recursiveLevel, $isActive: isActive, $isCollapsable: isArrayType, children: /* @__PURE__ */ jsxRuntime.jsxs(
              CollapseLabel,
              {
                alignItems: "center",
                $isCollapsable: isArrayType,
                ...isArrayType && {
                  onClick: () => handleClickToggleSubLevel(value),
                  "aria-expanded": isActive,
                  onKeyDown: ({ key }) => (key === "Enter" || key === " ") && handleClickToggleSubLevel(value),
                  tabIndex: 0,
                  role: "button"
                },
                title: label,
                children: [
                  /* @__PURE__ */ jsxRuntime.jsx(RowLabel, { ellipsis: true, children: label }),
                  required && /* @__PURE__ */ jsxRuntime.jsx(RequiredSign, {}),
                  /* @__PURE__ */ jsxRuntime.jsx(CarretIcon, { $isActive: isActive })
                ]
              }
            ) }),
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.Flex, { style: { flex: 1 }, children: propertyActions.map(
              ({ actionId, label: propertyLabel, isActionRelatedToCurrentProperty }) => {
                if (!isActionRelatedToCurrentProperty) {
                  return /* @__PURE__ */ jsxRuntime.jsx(HiddenAction, {}, actionId);
                }
                const checkboxName = [
                  ...pathToDataFromActionRow.split(".."),
                  actionId,
                  "properties",
                  propertyName,
                  ...parentName.split(".."),
                  value
                ];
                const checkboxValue = get__default.default(modifiedData, checkboxName, false);
                if (!subChildrenForm) {
                  return /* @__PURE__ */ jsxRuntime.jsx(
                    designSystem.Flex,
                    {
                      position: "relative",
                      width: cellWidth,
                      justifyContent: "center",
                      alignItems: "center",
                      children: /* @__PURE__ */ jsxRuntime.jsx(
                        designSystem.Checkbox,
                        {
                          disabled: isFormDisabled,
                          name: checkboxName.join(".."),
                          "aria-label": formatMessage(
                            {
                              id: `Settings.permissions.select-by-permission`,
                              defaultMessage: "Select {label} permission"
                            },
                            { label: `${parentName} ${label} ${propertyLabel}` }
                          ),
                          onCheckedChange: (value2) => {
                            onChangeSimpleCheckbox({
                              target: {
                                name: checkboxName.join(".."),
                                value: !!value2
                              }
                            });
                          },
                          checked: checkboxValue
                        }
                      )
                    },
                    propertyLabel
                  );
                }
                const { hasAllActionsSelected, hasSomeActionsSelected } = getCheckboxState(checkboxValue);
                return /* @__PURE__ */ jsxRuntime.jsx(
                  designSystem.Flex,
                  {
                    position: "relative",
                    width: cellWidth,
                    justifyContent: "center",
                    alignItems: "center",
                    children: /* @__PURE__ */ jsxRuntime.jsx(
                      designSystem.Checkbox,
                      {
                        disabled: isFormDisabled,
                        name: checkboxName.join(".."),
                        "aria-label": formatMessage(
                          {
                            id: `Settings.permissions.select-by-permission`,
                            defaultMessage: "Select {label} permission"
                          },
                          { label: `${parentName} ${label} ${propertyLabel}` }
                        ),
                        onCheckedChange: (value2) => {
                          onChangeParentCheckbox({
                            target: {
                              name: checkboxName.join(".."),
                              value: !!value2
                            }
                          });
                        },
                        checked: hasSomeActionsSelected ? "indeterminate" : hasAllActionsSelected
                      },
                      propertyLabel
                    )
                  },
                  propertyLabel
                );
              }
            ) })
          ] })
        ] }),
        displayedRecursiveChildren && isActive && /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { paddingBottom: 2, children: /* @__PURE__ */ jsxRuntime.jsx(
          SubActionRow,
          {
            isFormDisabled,
            parentName: `${parentName}..${value}`,
            pathToDataFromActionRow,
            propertyActions,
            propertyName,
            recursiveLevel: recursiveLevel + 1,
            childrenForm: displayedRecursiveChildren.children
          }
        ) })
      ] }, value);
    })
  ] });
};
const LeftBorderTimeline = styledComponents.styled(designSystem.Box)`
  border-left: ${({ $isVisible, theme }) => $isVisible ? `4px solid ${theme.colors.primary200}` : "4px solid transparent"};
`;
const RowStyle = styledComponents.styled(designSystem.Flex)`
  padding-left: ${({ theme }) => theme.spaces[4]};
  width: ${({ $level }) => 145 - $level * 36}px;

  &:hover {
    ${({ $isCollapsable, theme }) => $isCollapsable && activeStyle(theme)}
  }

  ${({ $isCollapsable }) => $isCollapsable && `
      ${CarretIcon} {
        display: flex;
      }
  `}
  ${({ $isActive, theme }) => $isActive && activeStyle(theme)};
`;
const RowLabel = styledComponents.styled(designSystem.Typography)``;
const TopTimeline = styledComponents.styled.div`
  padding-top: ${({ theme }) => theme.spaces[2]};
  margin-top: ${({ theme }) => theme.spaces[2]};
  width: 0.4rem;
  background-color: ${({ theme }) => theme.colors.primary200};
  border-top-left-radius: 2px;
  border-top-right-radius: 2px;
`;
const StyledBox = styledComponents.styled(designSystem.Box)`
  transform: translate(-4px, -12px);

  &:before {
    content: '';
    width: 0.4rem;
    height: 1.2rem;
    background: ${({ theme }) => theme.colors.primary200};
    display: block;
  }
`;
const Svg = styledComponents.styled.svg`
  position: relative;
  flex-shrink: 0;
  transform: translate(-0.5px, -1px);

  * {
    fill: ${({ theme, $color }) => theme.colors[$color]};
  }
`;
const Header = ({ headers = [], label }) => {
  const { formatMessage } = reactIntl.useIntl();
  return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Flex, { width: firstRowWidth, height: rowHeight, shrink: 0, alignItems: "center", paddingLeft: 6, children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "sigma", textColor: "neutral500", children: formatMessage(
      {
        id: "Settings.roles.form.permission.property-label",
        defaultMessage: "{label} permissions"
      },
      { label }
    ) }) }),
    headers.map((header) => {
      if (!header.isActionRelatedToCurrentProperty) {
        return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Flex, { width: cellWidth, shrink: 0 }, header.label);
      }
      return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Flex, { width: cellWidth, shrink: 0, justifyContent: "center", children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "sigma", textColor: "neutral500", children: formatMessage({
        id: `Settings.roles.form.permissions.${header.label.toLowerCase()}`,
        defaultMessage: header.label
      }) }) }, header.label);
    })
  ] });
};
const activeStyle = (theme) => styledComponents.css`
  color: ${theme.colors.primary600};
  font-weight: ${theme.fontWeights.bold};

  ${CarretIcon} {
    path {
      fill: ${theme.colors.primary600};
    }
  }
`;

const ConditionsButtonImpl = React__namespace.forwardRef(
  ({ onClick, className, hasConditions = false, variant = "tertiary" }, ref) => {
    const { formatMessage } = reactIntl.useIntl();
    return /* @__PURE__ */ jsxRuntime.jsx(ButtonContainer, { $hasConditions: hasConditions, className, children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { variant, startIcon: /* @__PURE__ */ jsxRuntime.jsx(icons.Cog, {}), onClick, ref, type: "button", children: formatMessage({
      id: "global.settings",
      defaultMessage: "Settings"
    }) }) });
  }
);
const ButtonContainer = styledComponents.styled(designSystem.Box)`
  ${({ $hasConditions, theme }) => $hasConditions && `
    &:before {
      content: '';
      position: absolute;
      top: -3px;
      left: -10px;
      width: 6px;
      height: 6px;
      border-radius: 2rem;
      background: ${theme.colors.primary600};
    }
  `}
`;
const ConditionsButton = styledComponents.styled(ConditionsButtonImpl)``;

const ConditionsModal = ({
  actions = [],
  headerBreadCrumbs = [],
  isFormDisabled,
  onClose
}) => {
  const { formatMessage } = reactIntl.useIntl();
  const { availableConditions, modifiedData, onChangeConditions } = usePermissionsDataManager();
  const arrayOfOptionsGroupedByCategory = React__namespace.useMemo(() => {
    return Object.entries(groupBy__default.default(availableConditions, "category"));
  }, [availableConditions]);
  const actionsToDisplay = actions.filter(
    // @ts-expect-error – TODO: fix this type issue
    ({ isDisplayed, hasSomeActionsSelected, hasAllActionsSelected }) => isDisplayed && Boolean(hasSomeActionsSelected || hasAllActionsSelected)
  );
  const [state, setState] = React__namespace.useState(
    createDefaultConditionsForm(actionsToDisplay, modifiedData, arrayOfOptionsGroupedByCategory)
  );
  const handleChange = (name, values) => {
    setState(
      immer.produce((draft) => {
        if (!draft[name]) {
          draft[name] = {};
        }
        if (!draft[name].default) {
          draft[name].default = {};
        }
        draft[name].default = values;
      })
    );
  };
  const handleSubmit = () => {
    const conditionsWithoutCategory = Object.entries(state).reduce(
      (acc, current) => {
        const [key, value] = current;
        const merged = Object.values(value).reduce((acc1, current1) => {
          return { ...acc1, ...current1 };
        }, {});
        acc[key] = merged;
        return acc;
      },
      {}
    );
    onChangeConditions(conditionsWithoutCategory);
    onClose && onClose();
  };
  const onCloseModal = () => {
    setState(
      createDefaultConditionsForm(actionsToDisplay, modifiedData, arrayOfOptionsGroupedByCategory)
    );
    onClose && onClose();
  };
  return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Modal.Content, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Header, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Breadcrumbs, { id: "condition-modal-breadcrumbs", label: headerBreadCrumbs.join(", "), children: headerBreadCrumbs.map((label, index, arr) => /* @__PURE__ */ jsxRuntime.jsx(designSystem.Crumb, { isCurrent: index === arr.length - 1, children: upperFirst__default.default(
      formatMessage({
        id: label,
        defaultMessage: label
      })
    ) }, label)) }) }),
    /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Modal.Body, { children: [
      actionsToDisplay.length === 0 && /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { children: formatMessage({
        id: "Settings.permissions.conditions.no-actions",
        defaultMessage: "You first need to select actions (create, read, update, ...) before defining conditions on them."
      }) }),
      /* @__PURE__ */ jsxRuntime.jsx("ul", { children: actionsToDisplay.map(({ actionId, label, pathToConditionsObject }, index) => {
        const name = pathToConditionsObject.join("..");
        return /* @__PURE__ */ jsxRuntime.jsx(
          ActionRow,
          {
            arrayOfOptionsGroupedByCategory,
            label,
            isFormDisabled,
            isGrey: index % 2 === 0,
            name,
            onChange: handleChange,
            value: get__default.default(state, name, {})
          },
          actionId
        );
      }) })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Modal.Footer, { children: [
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { variant: "tertiary", onClick: () => onCloseModal(), children: formatMessage({ id: "app.components.Button.cancel", defaultMessage: "Cancel" }) }),
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { onClick: handleSubmit, children: formatMessage({
        id: "Settings.permissions.conditions.apply",
        defaultMessage: "Apply"
      }) })
    ] })
  ] });
};
const createDefaultConditionsForm = (actionsToDisplay, modifiedData, arrayOfOptionsGroupedByCategory) => {
  return actionsToDisplay.reduce((acc, current) => {
    const valueFromModifiedData = get__default.default(
      modifiedData,
      [...current.pathToConditionsObject, "conditions"],
      {}
    );
    const categoryDefaultForm = arrayOfOptionsGroupedByCategory.reduce((acc2, current2) => {
      const [categoryName, relatedConditions] = current2;
      const conditionsForm = relatedConditions.reduce((acc3, current3) => {
        acc3[current3.id] = get__default.default(valueFromModifiedData, current3.id, false);
        return acc3;
      }, {});
      acc2[categoryName] = conditionsForm;
      return acc2;
    }, {});
    acc[current.pathToConditionsObject.join("..")] = categoryDefaultForm;
    return acc;
  }, {});
};
const ActionRow = ({
  arrayOfOptionsGroupedByCategory,
  isFormDisabled = false,
  isGrey = false,
  label,
  name,
  onChange,
  value
}) => {
  const { formatMessage } = reactIntl.useIntl();
  const handleChange = (val) => {
    if (onChange) {
      onChange(name, getNewStateFromChangedValues(arrayOfOptionsGroupedByCategory, val));
    }
  };
  return /* @__PURE__ */ jsxRuntime.jsxs(
    designSystem.Flex,
    {
      tag: "li",
      background: isGrey ? "neutral100" : "neutral0",
      paddingBottom: 3,
      paddingTop: 3,
      justifyContent: "space-evenly",
      children: [
        /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { style: { width: 180 }, children: [
          /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Typography, { variant: "sigma", textColor: "neutral600", children: [
            formatMessage({
              id: "Settings.permissions.conditions.can",
              defaultMessage: "Can"
            }),
            " "
          ] }),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "sigma", title: label, textColor: "primary600", ellipsis: true, children: formatMessage({
            id: `Settings.roles.form.permissions.${label.toLowerCase()}`,
            defaultMessage: label
          }) }),
          /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Typography, { variant: "sigma", textColor: "neutral600", children: [
            " ",
            formatMessage({
              id: "Settings.permissions.conditions.when",
              defaultMessage: "When"
            })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { style: { maxWidth: 430, width: "100%" }, children: /* @__PURE__ */ jsxRuntime.jsx(
          designSystem.MultiSelectNested,
          {
            id: name,
            customizeContent: (values = []) => `${values.length} currently selected`,
            onChange: handleChange,
            value: getSelectedValues(value),
            options: getNestedOptions(arrayOfOptionsGroupedByCategory),
            disabled: isFormDisabled
          }
        ) })
      ]
    }
  );
};
const getSelectedValues = (rawValue) => Object.values(rawValue).map(
  (x) => Object.entries(x).filter(([, value]) => value).map(([key]) => key)
).flat();
const getNestedOptions = (options) => options.reduce((acc, [label, children]) => {
  acc.push({
    label: Theme.capitalise(label),
    children: children.map((child) => ({
      label: child.displayName,
      value: child.id
    }))
  });
  return acc;
}, []);
const getNewStateFromChangedValues = (options, changedValues) => options.map(([, values]) => values).flat().reduce(
  (acc, curr) => ({ [curr.id]: changedValues.includes(curr.id), ...acc }),
  {}
);

const ContentTypeCollapses = ({
  actions = [],
  isFormDisabled,
  pathToData,
  subjects = []
}) => {
  const [collapseToOpen, setCollapseToOpen] = React__namespace.useState(null);
  const handleClickToggleCollapse = (collapseName) => () => {
    const nextCollapseToOpen = collapseToOpen === collapseName ? null : collapseName;
    setCollapseToOpen(nextCollapseToOpen);
  };
  return /* @__PURE__ */ jsxRuntime.jsx(jsxRuntime.Fragment, { children: subjects.map(({ uid, label, properties }, index) => {
    const isActive = collapseToOpen === uid;
    const availableActions = actions.map((action) => ({
      ...action,
      isDisplayed: Array.isArray(action.subjects) && action.subjects.indexOf(uid) !== -1
    }));
    return /* @__PURE__ */ jsxRuntime.jsxs(
      designSystem.Flex,
      {
        direction: "column",
        display: "inline-flex",
        alignItems: "stretch",
        minWidth: "100%",
        borderColor: isActive ? "primary600" : void 0,
        children: [
          /* @__PURE__ */ jsxRuntime.jsx(
            Collapse,
            {
              availableActions,
              isActive,
              isGrey: index % 2 === 0,
              isFormDisabled,
              label,
              onClickToggle: handleClickToggleCollapse(uid),
              pathToData: [pathToData, uid].join("..")
            }
          ),
          isActive && properties.map(({ label: propertyLabel, value, children: childrenForm }) => {
            return /* @__PURE__ */ jsxRuntime.jsx(
              CollapsePropertyMatrix,
              {
                availableActions,
                childrenForm,
                isFormDisabled,
                label: propertyLabel,
                pathToData: [pathToData, uid].join(".."),
                propertyName: value
              },
              value
            );
          })
        ]
      },
      uid
    );
  }) });
};
const Collapse = ({
  availableActions = [],
  isActive = false,
  isGrey = false,
  isFormDisabled = false,
  label,
  onClickToggle,
  pathToData
}) => {
  const { formatMessage } = reactIntl.useIntl();
  const { modifiedData, onChangeParentCheckbox, onChangeSimpleCheckbox } = usePermissionsDataManager();
  const [isConditionModalOpen, setIsConditionModalOpen] = React__namespace.useState(false);
  const mainData = get__default.default(modifiedData, pathToData.split(".."), {});
  const dataWithoutCondition = React__namespace.useMemo(() => {
    return Object.keys(mainData).reduce((acc, current) => {
      acc[current] = omit__default.default(mainData[current], "conditions");
      return acc;
    }, {});
  }, [mainData]);
  const { hasAllActionsSelected, hasSomeActionsSelected } = getCheckboxState(dataWithoutCondition);
  const checkboxesActions = React__namespace.useMemo(() => {
    return generateCheckboxesActions(availableActions, modifiedData, pathToData);
  }, [availableActions, modifiedData, pathToData]);
  const doesConditionButtonHasConditions = checkboxesActions.some((action) => action.hasConditions);
  return /* @__PURE__ */ jsxRuntime.jsxs(BoxWrapper, { $isActive: isActive, children: [
    /* @__PURE__ */ jsxRuntime.jsxs(
      Wrapper,
      {
        height: rowHeight,
        flex: 1,
        alignItems: "center",
        background: isGrey ? "neutral100" : "neutral0",
        children: [
          /* @__PURE__ */ jsxRuntime.jsx(
            RowLabelWithCheckbox,
            {
              isCollapsable: true,
              isFormDisabled,
              label: Theme.capitalise(label),
              checkboxName: pathToData,
              onChange: onChangeParentCheckbox,
              onClick: onClickToggle,
              someChecked: hasSomeActionsSelected,
              value: hasAllActionsSelected,
              isActive,
              children: /* @__PURE__ */ jsxRuntime.jsx(Chevron, { paddingLeft: 2, children: isActive ? /* @__PURE__ */ jsxRuntime.jsx(icons.ChevronUp, {}) : /* @__PURE__ */ jsxRuntime.jsx(icons.ChevronDown, {}) })
            }
          ),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Flex, { style: { flex: 1 }, children: checkboxesActions.map(
            ({ actionId, hasSomeActionsSelected: hasSomeActionsSelected2, isDisplayed, ...restAction }) => {
              if (!isDisplayed) {
                return /* @__PURE__ */ jsxRuntime.jsx(HiddenAction, {}, actionId);
              }
              const {
                hasConditions,
                hasAllActionsSelected: hasAllActionsSelected2,
                isParentCheckbox,
                checkboxName,
                label: permissionLabel
              } = restAction;
              if (isParentCheckbox) {
                return /* @__PURE__ */ jsxRuntime.jsxs(Cell, { justifyContent: "center", alignItems: "center", children: [
                  hasConditions && /* @__PURE__ */ jsxRuntime.jsx(
                    designSystem.Box,
                    {
                      tag: "span",
                      position: "absolute",
                      top: "-6px",
                      left: "37px",
                      width: "6px",
                      height: "6px",
                      borderRadius: "20px",
                      background: "primary600"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntime.jsx(
                    designSystem.Checkbox,
                    {
                      disabled: isFormDisabled,
                      name: checkboxName,
                      "aria-label": formatMessage(
                        {
                          id: `Settings.permissions.select-by-permission`,
                          defaultMessage: "Select {label} permission"
                        },
                        { label: `${permissionLabel} ${label}` }
                      ),
                      onCheckedChange: (value) => {
                        onChangeParentCheckbox({
                          target: {
                            name: checkboxName,
                            value: !!value
                          }
                        });
                      },
                      checked: hasSomeActionsSelected2 ? "indeterminate" : hasAllActionsSelected2
                    }
                  )
                ] }, actionId);
              }
              return /* @__PURE__ */ jsxRuntime.jsxs(Cell, { justifyContent: "center", alignItems: "center", children: [
                hasConditions && /* @__PURE__ */ jsxRuntime.jsx(
                  designSystem.Box,
                  {
                    tag: "span",
                    position: "absolute",
                    top: "-6px",
                    left: "37px",
                    width: "6px",
                    height: "6px",
                    borderRadius: "20px",
                    background: "primary600"
                  }
                ),
                /* @__PURE__ */ jsxRuntime.jsx(
                  designSystem.Checkbox,
                  {
                    disabled: isFormDisabled,
                    name: checkboxName,
                    onCheckedChange: (value) => {
                      onChangeSimpleCheckbox({
                        target: {
                          name: checkboxName,
                          value: !!value
                        }
                      });
                    },
                    checked: hasConditions ? "indeterminate" : hasAllActionsSelected2
                  }
                )
              ] }, actionId);
            }
          ) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { bottom: "10px", right: "9px", position: "absolute", children: /* @__PURE__ */ jsxRuntime.jsxs(
      designSystem.Modal.Root,
      {
        open: isConditionModalOpen,
        onOpenChange: () => {
          setIsConditionModalOpen((prev) => !prev);
        },
        children: [
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Trigger, { children: /* @__PURE__ */ jsxRuntime.jsx(ConditionsButton, { hasConditions: doesConditionButtonHasConditions }) }),
          /* @__PURE__ */ jsxRuntime.jsx(
            ConditionsModal,
            {
              headerBreadCrumbs: [label, "Settings.permissions.conditions.conditions"],
              actions: checkboxesActions,
              isFormDisabled,
              onClose: () => {
                setIsConditionModalOpen(false);
              }
            }
          )
        ]
      }
    ) })
  ] });
};
const generateCheckboxesActions = (availableActions, modifiedData, pathToData) => {
  return availableActions.map(({ actionId, isDisplayed, applyToProperties, label }) => {
    if (!isDisplayed) {
      return { actionId, hasSomeActionsSelected: false, isDisplayed };
    }
    const baseCheckboxNameArray = [...pathToData.split(".."), actionId];
    const checkboxNameArray = isEmpty__default.default(applyToProperties) ? [...baseCheckboxNameArray, "properties", "enabled"] : baseCheckboxNameArray;
    const conditionsValue = get__default.default(modifiedData, [...baseCheckboxNameArray, "conditions"], null);
    const baseCheckboxAction = {
      actionId,
      checkboxName: checkboxNameArray.join(".."),
      hasConditions: createArrayOfValues(conditionsValue).some((val) => val),
      isDisplayed,
      label,
      pathToConditionsObject: baseCheckboxNameArray
    };
    if (isEmpty__default.default(applyToProperties)) {
      const value = get__default.default(modifiedData, checkboxNameArray, false);
      return {
        ...baseCheckboxAction,
        hasAllActionsSelected: value,
        hasSomeActionsSelected: value,
        isParentCheckbox: false
      };
    }
    const mainData = get__default.default(modifiedData, checkboxNameArray, null);
    const { hasAllActionsSelected, hasSomeActionsSelected } = getCheckboxState(mainData);
    return {
      ...baseCheckboxAction,
      hasAllActionsSelected,
      hasSomeActionsSelected,
      isParentCheckbox: true
    };
  });
};
const activeRowStyle = (theme, isActive) => `
  ${Wrapper} {
    background-color: ${theme.colors.primary100};
    color: ${theme.colors.primary600};
    border-radius: ${isActive ? "2px 2px 0 0" : "2px"};
    font-weight: ${theme.fontWeights.bold};
  }

  ${Chevron} {
    display: flex;
  }
  ${ConditionsButton} {
    display: block;
  }

  &:focus-within {
    ${() => activeRowStyle(theme, isActive)}
  }
`;
const Wrapper = styledComponents.styled(designSystem.Flex)`
  border: 1px solid transparent;
`;
const BoxWrapper = styledComponents.styled.div`
  display: inline-flex;
  min-width: 100%;
  position: relative;

  ${ConditionsButton} {
    display: none;
  }

  ${({ $isActive, theme }) => $isActive && activeRowStyle(theme, $isActive)}

  &:hover {
    ${({ theme, $isActive }) => activeRowStyle(theme, $isActive)}
  }
`;
const Cell = styledComponents.styled(designSystem.Flex)`
  width: ${cellWidth};
  position: relative;
`;
const Chevron = styledComponents.styled(designSystem.Box)`
  display: none;

  svg {
    width: 1.4rem;
  }

  path {
    fill: ${({ theme }) => theme.colors.primary600};
  }
`;

const GlobalActions = ({ actions = [], isFormDisabled, kind }) => {
  const { formatMessage } = reactIntl.useIntl();
  const { modifiedData, onChangeCollectionTypeGlobalActionCheckbox } = usePermissionsDataManager();
  const displayedActions = actions.filter(({ subjects }) => subjects && subjects.length);
  const checkboxesState = React__namespace.useMemo(() => {
    const actionsIds = displayedActions.map(({ actionId }) => actionId);
    const data = modifiedData[kind];
    const relatedActionsData = actionsIds.reduce(
      (acc, actionId) => {
        Object.keys(data).forEach((ctUid) => {
          const actionIdData = get__default.default(data, [ctUid, actionId]);
          const actionIdState = { [ctUid]: removeConditionKeyFromData(actionIdData) };
          if (!acc[actionId]) {
            acc[actionId] = actionIdState;
          } else {
            acc[actionId] = { ...acc[actionId], ...actionIdState };
          }
        });
        return acc;
      },
      {}
    );
    const checkboxesState2 = Object.keys(relatedActionsData).reduce((acc, current) => {
      acc[current] = getCheckboxState(relatedActionsData[current]);
      return acc;
    }, {});
    return checkboxesState2;
  }, [modifiedData, displayedActions, kind]);
  return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { paddingBottom: 4, paddingTop: 6, style: { paddingLeft: firstRowWidth }, children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Flex, { gap: 0, children: displayedActions.map(({ label, actionId }) => {
    return /* @__PURE__ */ jsxRuntime.jsxs(
      designSystem.Flex,
      {
        shrink: 0,
        width: cellWidth,
        direction: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 3,
        children: [
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "sigma", textColor: "neutral500", children: formatMessage({
            id: `Settings.roles.form.permissions.${label.toLowerCase()}`,
            defaultMessage: label
          }) }),
          /* @__PURE__ */ jsxRuntime.jsx(
            designSystem.Checkbox,
            {
              disabled: isFormDisabled,
              onCheckedChange: (value) => {
                onChangeCollectionTypeGlobalActionCheckbox(kind, actionId, !!value);
              },
              name: actionId,
              "aria-label": formatMessage(
                {
                  id: `Settings.permissions.select-all-by-permission`,
                  defaultMessage: "Select all {label} permissions"
                },
                {
                  label: formatMessage({
                    id: `Settings.roles.form.permissions.${label.toLowerCase()}`,
                    defaultMessage: label
                  })
                }
              ),
              checked: get__default.default(checkboxesState, [actionId, "hasSomeActionsSelected"], false) ? "indeterminate" : get__default.default(checkboxesState, [actionId, "hasAllActionsSelected"], false)
            }
          )
        ]
      },
      actionId
    );
  }) }) });
};

const ContentTypes = ({
  isFormDisabled,
  kind,
  layout: { actions, subjects }
}) => {
  const sortedSubjects = [...subjects].sort((a, b) => a.label.localeCompare(b.label));
  return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Box, { background: "neutral0", children: [
    /* @__PURE__ */ jsxRuntime.jsx(GlobalActions, { actions, kind, isFormDisabled }),
    /* @__PURE__ */ jsxRuntime.jsx(
      ContentTypeCollapses,
      {
        actions,
        isFormDisabled,
        pathToData: kind,
        subjects: sortedSubjects
      }
    )
  ] });
};

const PluginsAndSettingsPermissions = ({
  layout,
  ...restProps
}) => {
  return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { padding: 6, background: "neutral0", children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Accordion.Root, { size: "M", children: layout.map(({ category, categoryId, childrenForm }, index) => {
    return /* @__PURE__ */ jsxRuntime.jsx(
      Row,
      {
        childrenForm,
        variant: index % 2 === 1 ? "primary" : "secondary",
        name: category,
        pathToData: [restProps.kind, categoryId],
        ...restProps
      },
      category
    );
  }) }) });
};
const Row = ({
  childrenForm,
  kind,
  name,
  isFormDisabled = false,
  variant,
  pathToData
}) => {
  const { formatMessage } = reactIntl.useIntl();
  const categoryName = name.split("::").pop() ?? "";
  return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Accordion.Item, { value: name, children: [
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Accordion.Header, { variant, children: /* @__PURE__ */ jsxRuntime.jsx(
      designSystem.Accordion.Trigger,
      {
        caretPosition: "right",
        description: `${formatMessage(
          { id: "Settings.permissions.category", defaultMessage: categoryName },
          { category: categoryName }
        )} ${kind === "plugins" ? "plugin" : kind}`,
        children: Theme.capitalise(categoryName)
      }
    ) }),
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Accordion.Content, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { padding: 6, children: childrenForm.map(({ actions, subCategoryName, subCategoryId }) => /* @__PURE__ */ jsxRuntime.jsx(
      SubCategory,
      {
        actions,
        categoryName,
        isFormDisabled,
        subCategoryName,
        pathToData: [...pathToData, subCategoryId]
      },
      subCategoryName
    )) }) })
  ] });
};
const SubCategory = ({
  actions = [],
  categoryName,
  isFormDisabled,
  subCategoryName,
  pathToData
}) => {
  const { modifiedData, onChangeParentCheckbox, onChangeSimpleCheckbox } = usePermissionsDataManager();
  const [isConditionModalOpen, setIsConditionModalOpen] = React__namespace.useState(false);
  const { formatMessage } = reactIntl.useIntl();
  const mainData = get__default.default(modifiedData, pathToData, {});
  const dataWithoutCondition = React__namespace.useMemo(() => {
    return Object.keys(mainData).reduce((acc, current) => {
      acc[current] = removeConditionKeyFromData(mainData[current]);
      return acc;
    }, {});
  }, [mainData]);
  const { hasAllActionsSelected, hasSomeActionsSelected } = getCheckboxState(dataWithoutCondition);
  const formattedActions = React__namespace.useMemo(() => {
    return actions.map((action) => {
      const checkboxName = [...pathToData, action.action, "properties", "enabled"];
      const checkboxValue = get__default.default(modifiedData, checkboxName, false);
      const conditionValue = get__default.default(modifiedData, [...pathToData, action.action, "conditions"], {});
      const hasConditions = createArrayOfValues(conditionValue).some((val) => val);
      return {
        ...action,
        isDisplayed: checkboxValue,
        checkboxName: checkboxName.join(".."),
        hasSomeActionsSelected: checkboxValue,
        value: checkboxValue,
        hasConditions,
        label: action.displayName,
        actionId: action.action,
        pathToConditionsObject: [...pathToData, action.action]
      };
    });
  }, [actions, modifiedData, pathToData]);
  const datum = get__default.default(modifiedData, [...pathToData], {});
  const doesButtonHasCondition = createArrayOfValues(
    Object.entries(datum).reduce((acc, current) => {
      const [catName, { conditions }] = current;
      acc[catName] = conditions;
      return acc;
    }, {})
  ).some((val) => val);
  return /* @__PURE__ */ jsxRuntime.jsx(jsxRuntime.Fragment, { children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Box, { children: [
    /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { justifyContent: "space-between", alignItems: "center", children: [
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { paddingRight: 4, children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "sigma", textColor: "neutral600", children: subCategoryName }) }),
      /* @__PURE__ */ jsxRuntime.jsx(Border, { flex: 1 }),
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { paddingLeft: 4, children: /* @__PURE__ */ jsxRuntime.jsx(
        designSystem.Checkbox,
        {
          name: pathToData.join(".."),
          disabled: isFormDisabled,
          onCheckedChange: (value) => {
            onChangeParentCheckbox({
              target: {
                name: pathToData.join(".."),
                value: !!value
              }
            });
          },
          checked: hasSomeActionsSelected ? "indeterminate" : hasAllActionsSelected,
          children: formatMessage({ id: "app.utils.select-all", defaultMessage: "Select all" })
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { paddingTop: 6, paddingBottom: 6, children: [
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Grid.Root, { gap: 2, style: { flex: 1 }, children: formattedActions.map(({ checkboxName, value, action, displayName, hasConditions }) => {
        return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Grid.Item, { col: 3, direction: "column", alignItems: "start", children: /* @__PURE__ */ jsxRuntime.jsx(CheckboxWrapper, { $disabled: isFormDisabled, $hasConditions: hasConditions, children: /* @__PURE__ */ jsxRuntime.jsx(
          designSystem.Checkbox,
          {
            name: checkboxName,
            disabled: isFormDisabled,
            onCheckedChange: (value2) => {
              onChangeSimpleCheckbox({
                target: {
                  name: checkboxName,
                  value: !!value2
                }
              });
            },
            checked: value,
            children: displayName
          }
        ) }) }, action);
      }) }),
      /* @__PURE__ */ jsxRuntime.jsxs(
        designSystem.Modal.Root,
        {
          open: isConditionModalOpen,
          onOpenChange: () => {
            setIsConditionModalOpen((prev) => !prev);
          },
          children: [
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Trigger, { children: /* @__PURE__ */ jsxRuntime.jsx(ConditionsButton, { hasConditions: doesButtonHasCondition }) }),
            /* @__PURE__ */ jsxRuntime.jsx(
              ConditionsModal,
              {
                headerBreadCrumbs: [categoryName, subCategoryName],
                actions: formattedActions,
                isFormDisabled,
                onClose: () => {
                  setIsConditionModalOpen(false);
                }
              }
            )
          ]
        }
      )
    ] })
  ] }) });
};
const Border = styledComponents.styled(designSystem.Box)`
  align-self: center;
  border-top: 1px solid ${({ theme }) => theme.colors.neutral150};
`;
const CheckboxWrapper = styledComponents.styled.div`
  position: relative;
  word-break: keep-all;
  ${({ $hasConditions, $disabled, theme }) => $hasConditions && `
    &:before {
      content: '';
      position: absolute;
      top: -0.4rem;
      left: -0.8rem;
      width: 0.6rem;
      height: 0.6rem;
      border-radius: 2rem;
      background: ${$disabled ? theme.colors.neutral100 : theme.colors.primary600};
    }
  `}
`;

const TAB_LABELS = [
  {
    labelId: "app.components.LeftMenuLinkContainer.collectionTypes",
    defaultMessage: "Collection Types",
    id: "collectionTypes"
  },
  {
    labelId: "app.components.LeftMenuLinkContainer.singleTypes",
    id: "singleTypes",
    defaultMessage: "Single Types"
  },
  {
    labelId: "app.components.LeftMenuLinkContainer.plugins",
    defaultMessage: "Plugins",
    id: "plugins"
  },
  {
    labelId: "app.components.LeftMenuLinkContainer.settings",
    defaultMessage: "Settings",
    id: "settings"
  }
];
const Permissions = React__namespace.forwardRef(
  ({ layout, isFormDisabled, permissions = [] }, api) => {
    const [{ initialData, layouts, modifiedData }, dispatch] = React__namespace.useReducer(
      reducer,
      initialState,
      () => init(layout, permissions)
    );
    const { formatMessage } = reactIntl.useIntl();
    React__namespace.useImperativeHandle(api, () => {
      return {
        getPermissions() {
          const collectionTypesDiff = difference(
            initialData.collectionTypes,
            modifiedData.collectionTypes
          );
          const singleTypesDiff = difference(initialData.singleTypes, modifiedData.singleTypes);
          const contentTypesDiff = { ...collectionTypesDiff, ...singleTypesDiff };
          let didUpdateConditions;
          if (isEmpty__default.default(contentTypesDiff)) {
            didUpdateConditions = false;
          } else {
            didUpdateConditions = Object.values(contentTypesDiff).some((permission = {}) => {
              return Object.values(permission).some(
                (permissionValue) => has__default.default(permissionValue, "conditions")
              );
            });
          }
          return { permissionsToSend: formatPermissionsForAPI(modifiedData), didUpdateConditions };
        },
        resetForm() {
          dispatch({ type: "RESET_FORM" });
        },
        setFormAfterSubmit() {
          dispatch({ type: "SET_FORM_AFTER_SUBMIT" });
        }
      };
    });
    const handleChangeCollectionTypeLeftActionRowCheckbox = (pathToCollectionType, propertyName, rowName, value) => {
      dispatch({
        type: "ON_CHANGE_COLLECTION_TYPE_ROW_LEFT_CHECKBOX",
        pathToCollectionType,
        propertyName,
        rowName,
        value
      });
    };
    const handleChangeCollectionTypeGlobalActionCheckbox = (collectionTypeKind, actionId, value) => {
      dispatch({
        type: "ON_CHANGE_COLLECTION_TYPE_GLOBAL_ACTION_CHECKBOX",
        collectionTypeKind,
        actionId,
        value
      });
    };
    const handleChangeConditions = (conditions) => {
      dispatch({ type: "ON_CHANGE_CONDITIONS", conditions });
    };
    const handleChangeSimpleCheckbox = React__namespace.useCallback(({ target: { name, value } }) => {
      dispatch({
        type: "ON_CHANGE_SIMPLE_CHECKBOX",
        keys: name,
        value
      });
    }, []);
    const handleChangeParentCheckbox = React__namespace.useCallback(({ target: { name, value } }) => {
      dispatch({
        type: "ON_CHANGE_TOGGLE_PARENT_CHECKBOX",
        keys: name,
        value
      });
    }, []);
    return /* @__PURE__ */ jsxRuntime.jsx(
      PermissionsDataManagerProvider,
      {
        availableConditions: layout.conditions,
        modifiedData,
        onChangeConditions: handleChangeConditions,
        onChangeSimpleCheckbox: handleChangeSimpleCheckbox,
        onChangeParentCheckbox: handleChangeParentCheckbox,
        onChangeCollectionTypeLeftActionRowCheckbox: handleChangeCollectionTypeLeftActionRowCheckbox,
        onChangeCollectionTypeGlobalActionCheckbox: handleChangeCollectionTypeGlobalActionCheckbox,
        children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Tabs.Root, { defaultValue: TAB_LABELS[0].id, children: [
          /* @__PURE__ */ jsxRuntime.jsx(
            designSystem.Tabs.List,
            {
              "aria-label": formatMessage({
                id: "Settings.permissions.users.tabs.label",
                defaultMessage: "Tabs Permissions"
              }),
              children: TAB_LABELS.map((tabLabel) => /* @__PURE__ */ jsxRuntime.jsx(designSystem.Tabs.Trigger, { value: tabLabel.id, children: formatMessage({ id: tabLabel.labelId, defaultMessage: tabLabel.defaultMessage }) }, tabLabel.id))
            }
          ),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Tabs.Content, { value: TAB_LABELS[0].id, children: /* @__PURE__ */ jsxRuntime.jsx(
            ContentTypes,
            {
              layout: layouts.collectionTypes,
              kind: "collectionTypes",
              isFormDisabled
            }
          ) }),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Tabs.Content, { value: TAB_LABELS[1].id, children: /* @__PURE__ */ jsxRuntime.jsx(
            ContentTypes,
            {
              layout: layouts.singleTypes,
              kind: "singleTypes",
              isFormDisabled
            }
          ) }),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Tabs.Content, { value: TAB_LABELS[2].id, children: /* @__PURE__ */ jsxRuntime.jsx(
            PluginsAndSettingsPermissions,
            {
              layout: layouts.plugins,
              kind: "plugins",
              isFormDisabled
            }
          ) }),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Tabs.Content, { value: TAB_LABELS[3].id, children: /* @__PURE__ */ jsxRuntime.jsx(
            PluginsAndSettingsPermissions,
            {
              layout: layouts.settings,
              kind: "settings",
              isFormDisabled
            }
          ) })
        ] })
      }
    );
  }
);
const initialState = {
  initialData: {},
  modifiedData: {},
  layouts: {}
};
const reducer = (state, action) => immer.produce(state, (draftState) => {
  switch (action.type) {
    case "ON_CHANGE_COLLECTION_TYPE_GLOBAL_ACTION_CHECKBOX": {
      const { collectionTypeKind, actionId, value } = action;
      const pathToData = ["modifiedData", collectionTypeKind];
      Object.keys(get__default.default(state, pathToData)).forEach((collectionType) => {
        const collectionTypeActionData = get__default.default(
          state,
          [...pathToData, collectionType, actionId],
          void 0
        );
        if (collectionTypeActionData) {
          let updatedValues = updateValues(collectionTypeActionData, value);
          if (!value && updatedValues.conditions) {
            const updatedConditions = updateValues(updatedValues.conditions, false);
            updatedValues = { ...updatedValues, conditions: updatedConditions };
          }
          set__default.default(draftState, [...pathToData, collectionType, actionId], updatedValues);
        }
      });
      break;
    }
    case "ON_CHANGE_COLLECTION_TYPE_ROW_LEFT_CHECKBOX": {
      const { pathToCollectionType, propertyName, rowName, value } = action;
      let nextModifiedDataState = cloneDeep__default.default(state.modifiedData);
      const pathToModifiedDataCollectionType = pathToCollectionType.split("..");
      const objToUpdate = get__default.default(nextModifiedDataState, pathToModifiedDataCollectionType, {});
      Object.keys(objToUpdate).forEach((actionId) => {
        if (has__default.default(objToUpdate[actionId], `properties.${propertyName}`)) {
          const objValue = get__default.default(objToUpdate, [actionId, "properties", propertyName, rowName]);
          const pathToDataToSet = [
            ...pathToModifiedDataCollectionType,
            actionId,
            "properties",
            propertyName,
            rowName
          ];
          if (!Theme.isObject(objValue)) {
            set__default.default(nextModifiedDataState, pathToDataToSet, value);
          } else {
            const updatedValue = updateValues(objValue, value);
            set__default.default(nextModifiedDataState, pathToDataToSet, updatedValue);
          }
        }
      });
      if (!value) {
        nextModifiedDataState = updateConditionsToFalse(nextModifiedDataState);
      }
      set__default.default(draftState, "modifiedData", nextModifiedDataState);
      break;
    }
    case "ON_CHANGE_CONDITIONS": {
      Object.entries(action.conditions).forEach((array) => {
        const [stringPathToData, conditionsToUpdate] = array;
        set__default.default(
          draftState,
          ["modifiedData", ...stringPathToData.split(".."), "conditions"],
          conditionsToUpdate
        );
      });
      break;
    }
    case "ON_CHANGE_SIMPLE_CHECKBOX": {
      let nextModifiedDataState = cloneDeep__default.default(state.modifiedData);
      set__default.default(nextModifiedDataState, [...action.keys.split("..")], action.value);
      if (!action.value) {
        nextModifiedDataState = updateConditionsToFalse(nextModifiedDataState);
      }
      set__default.default(draftState, "modifiedData", nextModifiedDataState);
      break;
    }
    case "ON_CHANGE_TOGGLE_PARENT_CHECKBOX": {
      const { keys, value } = action;
      const pathToValue = [...keys.split("..")];
      let nextModifiedDataState = cloneDeep__default.default(state.modifiedData);
      const oldValues = get__default.default(nextModifiedDataState, pathToValue, {});
      const updatedValues = updateValues(oldValues, value);
      set__default.default(nextModifiedDataState, pathToValue, updatedValues);
      if (!value) {
        nextModifiedDataState = updateConditionsToFalse(nextModifiedDataState);
      }
      set__default.default(draftState, ["modifiedData"], nextModifiedDataState);
      break;
    }
    case "RESET_FORM": {
      draftState.modifiedData = state.initialData;
      break;
    }
    case "SET_FORM_AFTER_SUBMIT": {
      draftState.initialData = state.modifiedData;
      break;
    }
    default:
      return draftState;
  }
});
const init = (layout, permissions) => {
  const {
    conditions,
    sections: { collectionTypes, singleTypes, plugins, settings }
  } = layout;
  const layouts = {
    collectionTypes,
    singleTypes,
    plugins: formatLayout(plugins, "plugin"),
    settings: formatLayout(settings, "category")
  };
  const defaultForm = {
    collectionTypes: createDefaultCTForm(collectionTypes, conditions, permissions),
    singleTypes: createDefaultCTForm(singleTypes, conditions, permissions),
    plugins: createDefaultForm(layouts.plugins, conditions, permissions),
    settings: createDefaultForm(layouts.settings, conditions, permissions)
  };
  return {
    initialData: defaultForm,
    modifiedData: defaultForm,
    layouts
  };
};

exports.Permissions = Permissions;
//# sourceMappingURL=Permissions-CiEhUevV.js.map

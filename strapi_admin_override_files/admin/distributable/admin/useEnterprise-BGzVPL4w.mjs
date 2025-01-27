import * as React from 'react';
import { useCallbackRef } from '@strapi/design-system';

function isEnterprise() {
  return window.strapi.isEE;
}
const useEnterprise = (ceData, eeCallback, opts = {}) => {
  const { defaultValue = null, combine = (_ceData, eeData) => eeData, enabled = true } = opts;
  const eeCallbackRef = useCallbackRef(eeCallback);
  const combineCallbackRef = useCallbackRef(combine);
  const [{ data }, setData] = React.useState({
    data: isEnterprise() && enabled ? defaultValue : ceData
  });
  React.useEffect(() => {
    async function importEE() {
      const eeData = await eeCallbackRef();
      const combinedValue = combineCallbackRef(ceData, eeData);
      setData({ data: combinedValue ? combinedValue : eeData });
    }
    if (isEnterprise() && enabled) {
      importEE();
    }
  }, [ceData, eeCallbackRef, combineCallbackRef, enabled]);
  return data;
};

export { useEnterprise as u };
//# sourceMappingURL=useEnterprise-BGzVPL4w.mjs.map

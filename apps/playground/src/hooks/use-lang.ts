import { useToggle, useUpdateEffect } from "ahooks";

import i18next from "../i18n";
import { LANGS } from "@frontend-shared/libs";

export function useLang() {
  const reverseValue =
    i18next.resolvedLanguage === LANGS.zh ? LANGS.en : LANGS.zh;
  const [state, { toggle }] = useToggle(i18next.resolvedLanguage, reverseValue);

  useUpdateEffect(() => {
    i18next.changeLanguage(state);
  }, [state]);

  return {
    state,
    toggle,
  };
}

import { compact } from "lodash-es";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";

export function useExtendTranslation() {
  const { t, i18n } = useTranslation();

  const composedT = useCallback(
    (keyStr: string) => {
      const keys = compact(keyStr?.split(","));
      const zhRes = keys.reduce((res, item) => {
        return res + t(item);
      }, "");
      const enRes = keys
        .reduce((res, item) => {
          return `${res}${t(item)} `;
        }, "")
        .trim();
      return i18n.resolvedLanguage === "zh" ? zhRes : enRes;
    },
    [i18n.resolvedLanguage, t]
  );

  const closeText = (key: string) => {
    return i18n.resolvedLanguage === "zh" ? t(key) : ` ${key}`;
  };

  return { t, composedT, i18n, closeText };
}

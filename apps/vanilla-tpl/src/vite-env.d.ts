/// <reference types="vite/client" />

type ImportMetaEnv = {
  VITE_WECOM_CORP_ID: string;
  VITE_WECOM_AGENT_ID: string;
  VITE_API_BASE_URL: string;
  VITE_APP_BASE_SA: string;
  VITE_API_EC_URL: string;
};

type ImportMeta = {
  readonly env: ImportMetaEnv;
};

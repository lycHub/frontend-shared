import { createConsola, LogLevels } from "consola";
import { TypeWithNull } from "../types";

const searchParams = new URLSearchParams(location.search);
const searchLevel = searchParams.get("level");

function processLevel(value: TypeWithNull<string>) {
  const res = +(value || "");
  const defaultLevel = import.meta.env.PROD ? LogLevels.warn : LogLevels.debug;
  return Number.isNaN(res) || res <= 0 ? defaultLevel : res;
}

export const logger = createConsola({
  level: processLevel(searchLevel),
});

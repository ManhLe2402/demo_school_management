import type { config as base } from "./default.env";
import { config as production } from "./production.env";
import type { config as development } from "./development.env";

export type Objectype = Record<string, unknown>;
export type Default = typeof base;
export type ConfigEnv = Default & (typeof production & typeof development);

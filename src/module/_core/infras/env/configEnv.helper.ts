import { registerAs } from "@nestjs/config";
import { existsSync } from "fs";
import { resolve } from "path";
import type { ConfigEnv, Objectype } from "./configEnv.interface";

export type ConfigEnvType = typeof ConfigEnvHelper.envConfig;

export class ConfigEnvHelper {
    static appConfig: ConfigEnv | null = null;

    static getServiceName(): string {
        return this.envConfig.KEY;
    }

    static envConfig = registerAs("env", async (): Promise<ConfigEnv> => {
        const config = (await import("./default.env")).config;
        // const environment = (await import(`./${this.getEnvName()}.env`)).config;
        const enviroment = {};

        const mergeConfig = this.merge(config, enviroment) as ConfigEnv;

        ConfigEnvHelper.appConfig = mergeConfig;

        return mergeConfig;
    });

    static getEnvPath(): string {
        const envDir = `${global.__mainDir}/env`;
        const fallback: string = resolve(`${envDir}/default.env`);
        const filename: string = `${this.getEnvName()}.env`;
        let filePath: string = resolve(`${envDir}/${filename}`);

        if (!existsSync(filePath)) {
            filePath = fallback;
        }

        return filePath;
    }

    static getEnvName(): string {
        return process.env.NODE_ENV || "development";
    }

    // object deep merge
    static merge<T extends Objectype, U extends Objectype>(target: T, source: U): T & U {
        for (const key of Object.keys(source)) {
            const targetValue = target[key];
            const sourceValue = source[key];
            if (this.isObject(targetValue) && this.isObject(sourceValue)) {
                Object.assign(sourceValue, this.merge(targetValue, sourceValue));
            }
        }

        return { ...target, ...source };
    }

    static isObject<T>(value: T): value is T & Objectype {
        return value !== null && typeof value === "object" && !Array.isArray(value);
    }
}

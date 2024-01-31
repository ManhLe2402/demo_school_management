import { ConfigEnvHelper } from "../env/configEnv.helper";

export const toFilePath = (toFilePath: string) => {
  if (toFilePath) {
    if (toFilePath.startsWith("https")) return toFilePath;
    return `${ConfigEnvHelper.appConfig.publicFile}/${toFilePath}`;
  }
  return undefined;
};

export const toImagePathAggregate = (field: string) => {
  return {
    $concat: [ConfigEnvHelper.appConfig.publicFile, "/", field],
  };
};

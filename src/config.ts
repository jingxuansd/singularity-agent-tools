export type AppConfig = {
  singularityApiBaseUrl: string;
  singularityApiToken?: string;
};

export function loadConfig(): AppConfig {
  const singularityApiBaseUrl =
    process.env.SINGULARITY_API_BASE_URL ?? "http://localhost:3000";
  const singularityApiToken =
    process.env.SINGULARITY_API_TOKEN ?? process.env.SINGULARITY_API_KEY;

  return {
    singularityApiBaseUrl: singularityApiBaseUrl.replace(/\/$/, ""),
    singularityApiToken,
  };
}

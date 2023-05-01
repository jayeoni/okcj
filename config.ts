const { NEXT_PUBLIC_API_URL, NEXT_PUBLIC_ADMIN_API_URL } = process.env;

const CLIENT_ENVS: { [key: string]: string | undefined } = {
  NEXT_PUBLIC_API_URL,
  NEXT_PUBLIC_ADMIN_API_URL,
};

const getEnvironmentVariable = (environmentVariable: string): string => {
  const unValidatedEnvironmentVariable =
    process.env[environmentVariable] || CLIENT_ENVS[environmentVariable];

  if (!unValidatedEnvironmentVariable) {
    throw new Error(
      `Couldn't find environment variable: ${environmentVariable}`
    );
  } else {
    return unValidatedEnvironmentVariable;
  }
};

export const config = {
  apiUrl: getEnvironmentVariable('NEXT_PUBLIC_API_URL'),
  adminApiUrl: getEnvironmentVariable('NEXT_PUBLIC_ADMIN_API_URL'),
};

export const envs = {
  development: 'development',
  production: 'production',
  test: 'test',
}

const env = process.env.NODE_ENV || 'development'

if (!envs[env]) throw Error(`Unknown NODE_ENV ${env}`)

export const IS_DEV = env === envs.development
export const IS_PROD = env === envs.production
export const IS_TEST = env === envs.test

export default env

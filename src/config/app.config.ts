import { cleanEnv, str, url, port } from 'envalid';

interface BaseEnvironment {
  PORT: number;
  swaggerUsername: string;
  swaggerPassword: string;
  DATABASE_URL: string;
}

export type Environment = BaseEnvironment;

let env: Environment;

export default () => {
  if (!env) {
    env = cleanEnv<BaseEnvironment>(process.env, {
      PORT: port({
        default: 4000,
        desc: 'The TCP port that this server will listen to.',
      }),
      swaggerUsername: str({
        default: 'admin',
        desc: 'swagger username',
      }),
      swaggerPassword: str({
        default: 'admin',
        desc: 'swagger password',
      }),
      DATABASE_URL: url({
        default: 'postgresql://username:password@localhost:5432/database',
        desc: 'Full URL to connect to database server.',
        example: 'postgresql://username:password@localhost:5432/database',
      }),
    });
  }
  return env;
};

import { cleanEnv, str, port } from 'envalid';

interface BaseEnvironment {
  PORT: number;
  swaggerUsername: string;
  swaggerPassword: string;
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
    });
  }
  return env;
};

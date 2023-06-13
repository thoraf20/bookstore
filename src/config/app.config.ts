import { cleanEnv, port } from 'envalid';

interface BaseEnvironment {
  PORT: number;
}

export type Environment = BaseEnvironment;

let env: Environment;

export default () => {
  if (!env) {
    env = cleanEnv<BaseEnvironment>(process.env, {
      PORT: port({
        default: 3007,
        desc: 'The TCP port that this server will listen to.',
      }),
    });
  }
  return env;
};

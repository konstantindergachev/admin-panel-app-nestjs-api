interface ISignOptions {
  expiresIn: string;
}

interface IJwtConstants {
  secret: string;
  signOptions: ISignOptions;
}

export const jwtConfig: IJwtConstants = {
  secret: 'secretStr#ing',
  signOptions: { expiresIn: '1d' },
};

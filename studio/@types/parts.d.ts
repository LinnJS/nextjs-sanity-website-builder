declare module 'all:*' {
  const anyArray: any[];

  export default anyArray;
}

declare module 'config:*' {
  const pluginConfig: { [key: string]: any };

  export default pluginConfig;
}

declare module 'part:*';

declare module '*.css' {
  const cssModule: { [key: string]: string };

  export default cssModule;
}

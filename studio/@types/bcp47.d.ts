// declare type for module bcp47
declare module 'bcp47' {
  const bcp47: {
    parse(language: string): { [key: string]: string };
  };

  export default bcp47;
}

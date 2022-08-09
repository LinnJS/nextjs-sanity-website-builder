import { SanityCodegenConfig } from 'sanity-codegen';

const config: SanityCodegenConfig = {
  schemaPath: './schemas/schema.ts',
  outputPath: './@types/schema.ts',
};

export default config;

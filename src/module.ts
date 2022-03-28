import { resolve } from 'path'
import { fileURLToPath } from 'url'
import defu from 'defu'
import { defineNuxtModule, addPlugin } from '@nuxt/kit'

export interface ModuleOptions {
  /**
   * GRAPHQL API URL
   * @default process.env.GPRAHQL_URL
   * @type string
   */
  url?: string;
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-graphql-server',
    configKey: 'graphqlServer',
    compatibility: {
      nuxt: '^3.0.0'
    }
  },
  defaults: {
    url: process.env.GRAPHQL_URL
  },
  setup (options, nuxt) {
    if (!options.url) {
      throw new Error('Missing `GPRAHQL_URL` in `.env`')
    }

    nuxt.options.publicRuntimeConfig.graphql = defu(
      nuxt.options.publicRuntimeConfig.graphql,
      {
        url: options.url
      }
    )

    const runtimeDir = fileURLToPath(new URL('./runtime', import.meta.url))
    nuxt.options.build.transpile.push(runtimeDir)

    addPlugin(resolve(runtimeDir, 'plugin'))

    nuxt.hook('autoImports:dirs', (dirs) => {
      dirs.push(resolve(runtimeDir, 'composables'))
    })
  }
})

declare module '@nuxt/schema' {
  interface ConfigSchema {
    publicRuntimeConfig?: {
      graphql?: ModuleOptions;
    };
  }
}

import { defineNuxtConfig } from 'nuxt3'
import NuxtGraphql from '..'

export default defineNuxtConfig({
  modules: [NuxtGraphql],
  graphqlServer: {
    url: '/api/graphql'
  }
})

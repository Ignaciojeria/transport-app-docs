import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import mdx from "@astrojs/mdx";
import tailwind from "@astrojs/tailwind";
import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  base: "/transport-app-docs/",
  integrations: [starlight({
    title: 'Transport APP',
    social: {
      github: 'https://github.com/withastro/starlight'
    },
    sidebar: [{
      label: 'Comienza Aquí',
      items: [
      // Each item here is one entry in the navigation menu.
      {
        label: 'Crear Organización',
        link: '/guides/1-start-here/'
      }]
    }, {
      label: 'Gestionar Flotas',
      items: [
      // Each item here is one entry in the navigation menu.
      {
        label: 'Procesar Empresas',
        link: '/guides/2-carriers-processing/'
      }, {
        label: 'Procesar Vehiculos',
        link: '/guides/example2/'
      }, {
        label: 'Procesar Conductores',
        link: '/guides/example3/'
      }]
    }, {
      label: 'Reference',
      autogenerate: {
        directory: 'reference'
      }
    }]
  }), mdx(), tailwind(), svelte()]
});
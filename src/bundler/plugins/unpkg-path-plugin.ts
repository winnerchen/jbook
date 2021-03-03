import * as esbuild from 'esbuild-wasm';

const unpkgHost = 'https://unpkg.com';

export const unpkgPathPlugin = (inputCode: string) => {
  return {
    name: 'unpkg-path-plugin',
    setup(build: esbuild.PluginBuild) {
      // handle root entry file of 'index/js'
      build.onResolve(
        { filter: /(^index\.js)/ },
        async (args: esbuild.OnResolveArgs) => {
          return { path: 'index.js', namespace: 'a' };
        }
      );

      // handle relative paths in a module
      build.onResolve(
        { filter: /^\.+\// },
        async (args: esbuild.OnResolveArgs) => {
          return {
            namespace: 'a',
            path: new URL(args.path, `${unpkgHost}${args.resolveDir}/`).href,
          };
        }
      );

      // handle main file of a module
      build.onResolve({ filter: /.*/ }, async (args: esbuild.OnResolveArgs) => {
        return {
          namespace: 'a',
          path: `${unpkgHost}/${args.path}`,
        };
      });
    },
  };
};

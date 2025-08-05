### Nestjs documentation
- [docs](https://docs.nestjs.com/pipes)

### TypeORM documentation
- [docs](https://typeorm.io/docs/getting-started)
- [postgres](https://typeorm.io/docs/drivers/postgres/)
- [Migration](https://typeorm.io/docs/advanced-topics/migrations/)

### Nestjs, Typeorm, postgres project setup guide
    - [Medium article](https://medium.com/@gausmann.simon/nestjs-typeorm-and-postgresql-full-example-development-and-project-setup-working-with-database-c1a2b1b11b8f)

### "typeorm": "ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js -d src/ormdatasource.ts"
    - ts-node: A utility that lets you execute TypeScript files directly, without pre-compiling to JavaScript.
    - -r tsconfig-paths/register: -r tells Node to preload a module before running your script. tsconfig-paths/register reads the "paths" mappings in your tsconfig.json and rewrites import paths at runtime.This is critical if you’re using aliases (e.g. @app/…) in your NestJS project so that both your code and the TypeORM CLI resolve imports the same way.
    - ./node_modules/typeorm/cli.js: This is the entry point for the TypeORM command-line interface. Instead of installing TypeORM globally, it is pointing directly at the locally-installed CLI.
    - -d src/ormdatasource.ts: The -d (or --dataSource) flag tells the TypeORM CLI which DataSource definition to use.In modern TypeORM (v0.3+), we define database connection, entities, migrations, etc., in a DataSource object (often in a file like src/ormdatasource.ts).

### realworld documentations
 - [intro](https://realworld-docs.netlify.app/specifications/backend/introduction/)
 - 
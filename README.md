# oggram

Simplest Organogram API to store and manage people and teams.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Utility scripts 
```bash
npm run build           # Build and check sintaxes
npm run format          # Format using prettier
npm run lint            # Check lint recomendations
npm run create:resource # Create new resource using Nestjs CLI
npm run release         # Bump project version, create/update CHANGELOG.md with git commit messages history, create new local tag with current version
npm run release:alpha   # Same as release, but with sufix '-alpha.x'
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Contributing

Check commit message formats on Conventional Commits, it's enable in this project with `husky`.

You can bypass conventional commits using `--no-verify` on `clone, push` commands of `git`.


# Boom

tldr:
Boom is a Stacks wallet and asset manager. Boomboxes implement pooled stacking. Follow us on twitter: [https://twitter.com/boom_wallet](https://twitter.com/boom_wallet)

## Development

### Install dev dependencies for cloudflare page functions

```bash
npm install -g wrangler
```

### Install dependencies

```bash
yarn
```

### Required environment

In order to test image uploads to ipfs, you'll need a nft.storage account and api token.

You can get a free account at https://nft.storage/. Once you create your account, generate an API token and add it to a new file named `.dev.vars`, in the project root.

```
1. create a file in the project root called `.dev.vars`
2. add a key named 'NFT_STORAGE_TOKEN'

```

The file should look like this:

```
NFT_STORAGE_TOKEN=<your nft.storage api key>
```

## Start the page functions serverless dev api

```bash
wrangler pages dev --local ./src --compatibility-date=2022-11-30
```

### If you're debugging/developing the Nostr add-on, add the KV store to the wrangler command line

```bash
wrangler pages dev --local ./src --compatibility-date=2022-11-30 --kv=NOSTR
```

### If you're debugging/developing the nft cache, add the KV store to the wrangle command line

```bash
wrangler pages dev --local .src --compatibility-date=2022-11-30 --kv=TOKEN_URI
```

### Start the client app in development mode (hot-code reloading, error reporting, etc.)

```bash
quasar dev
```

### In the course of development, you may wanna clear the HMR cache. If so, stop the dev server and do the following:

```bash
quasar clean
```

### Lint the files

```bash
yarn run lint
```

### Build the app for production

```bash
yarn build -m pwa
```

### Customize the configuration

See [Configuring quasar.conf.js](https://quasar.dev/quasar-cli/quasar-conf-js).

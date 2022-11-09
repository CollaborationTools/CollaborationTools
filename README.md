<p style="text-align: center;"><img alt="logo" src="platform/framework/public/images/logo-256x256.png" width="256"></p>

# Collaboration Tools

Collaboration Tools is a decentralized application to support collaboration even in the smallest, just-forming teams. It reflects the current culture and could help it to evolve.

***The application is under development and does not have most basic features yet.***

## What is available now?

Nothing released yet, sorry.

## Why?

Do you agree that the way we collaborate usually has a significant impact on the value we deliver? Even if you don’t, there probably are ways of working that you prefer. And Collaboration Tools will aim at supporting that, so you could deliver the value you aim at. You decide which tools you use while our main goal is to increase your awareness of options you have... and not to convince you to use any specific tool.

By providing the tools for free we hope you could at some point just experiment with improving in areas like:
- understanding of self and others,
- sense-making,
- decision-making,
- execution,
- results validation.

And we hope that just doing that at scale is making the world a better place.

To increase the scalability, the Collaboration Tools app is almost fully decentralized, which means that you own the data, it is stored on devices of organisation members and shared directly between them using encrypted peer 2 peer communication.

## Contribution

To unblock main work currently the basics are needed, which means solving technical challenges like:
- peer 2 peer communication
- encryption
- data storage

This should result in features like:
- creating a space
- joining a space
- synchronisation of space users
- basic chat

Due to large scope any contributions are welcome. For coordination please join [our Discord](https://discord.gg/cT55KFmXgQ).

### Setup

Please mind that [Yarn 3](https://yarnpkg.com/getting-started/install) is used. Once it is ready install the dependencies with:

```bash
yarn install
```

### Development Server

Build and start the development server on http://localhost:3000

```bash
yarn dev
```

### E2E Testing

Open Cypress to manually select which E2E tests to run:

```bash
yarn test:dev
```

Running all E2E tests in headless browser (while the app is running at localhost:3000):

```bash
yarn test
```

### Production

Build the application for production (SSG):

```bash
yarn generate
```

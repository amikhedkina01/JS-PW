# JS-PW

[![Playwright tests](https://img.shields.io/badge/playwright-tests-brightgreen?logo=playwright)](https://playwright.dev)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D16-brightgreen)](https://nodejs.org/)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)

A small Playwright-based test project for web automation and end-to-end testing.

## Table of Contents

- [About](#about)
- [Prerequisites](#prerequisites)
- [Install](#install)
- [Run tests](#run-tests)
- [Open HTML report](#open-html-report)
- [Project structure](#project-structure)
- [Writing tests](#writing-tests)
- [Contributing](#contributing)
- [Troubleshooting](#troubleshooting)
- [License](#license)

## About

This repository contains Playwright tests and helpers for end-to-end testing. It is configured with `playwright.config.js` and includes tastefully structured test suites, utilities, and results directories.

## Prerequisites

- Node.js 16+ (LTS recommended)
- npm (or yarn/pnpm)
- Playwright browsers installed (see Install step)

## Install

Clone the repo and install dependencies:

```bash
git clone <your-repo-url>
cd JSonemoretime
npm install
# install browsers if not already present
npx playwright install
```

## Run tests

To run all tests:

```bash
npm test
```

Or directly with Playwright:

```bash
npx playwright test
```

## Open HTML report

To generate and open the HTML report for the last test run:

```bash
npx playwright show-report
```

## Project structure

```plaintext
.
├─ [package.json](http://_vscodecontentref_/8)
├─ [playwright.config.js](http://_vscodecontentref_/9)
├─ tests/                # Playwright test files
├─ pages/                # Page objects and helpers
├─ utils/                # Utility functions
├─ test-results/         # Raw test results
├─ playwright-report/    # HTML reports
└─ allure-results/       # Allure artifacts (optional)
```

## Writing tests

See the [Playwright documentation](https://playwright.dev/docs/intro) for guidance on writing tests.

## Contributing

Contributions are welcome! Please read the [contributing guidelines](./CONTRIBUTING.md) before getting started.

## Troubleshooting

For common issues and their solutions, check the [troubleshooting guide](./docs/troubleshooting.md).

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

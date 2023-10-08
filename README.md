# HartfordProjectFrontEnd
Frontend Website for CS 410 Software Development Project. This front end is a static site built using SSG Astro, this is used as the UI for a co-op project with The Hartford Insurance

## Setup Guide for Group
NPM will be used for all dependencies, please ensure you have Nodejs installed.

When cloning the project run ```npm install``` to install all dependencies.

Astro framework includes a development web server, similar to the web server included in PyCharm & other ide's but supports the page router & all astro features without building and deploying

To start a development server; in the home directory of your Astro project run ```npm run dev```.

This repo is configured with a GitHub action that automatically builds & pushes any change made in the main branch to AWS automatically, only push working builds to main.

## What is Astro & Documentation

Astro is an SSG, built using Nodejs. You can look at it as a page builder/designer similar to products like Wix or WordPress.
The major difference is that all design & config are done in code, allowing for large flexibility/usability.
This also allows Astro to be fully compatible with many npm libraries including React, Svelte, Bootstrap, Tailwind, dozens of component libraries, sitemap generators, & media optimizers
Astro as a framework will take all of your code & site layout and build it for you. It tries to limit any front-end js in order to improve performance by trying to run as much javascript as possible on the server.

Documentation for AstroJS can be found [here](https://docs.astro.build/en/concepts/why-astro/)

My Portfolio is built on Astro [marekgrabowski.net](https://marekgrabowski.net) it can be found at this public repo [here](https://github.com/marekgrabowski/marekgrabowski).

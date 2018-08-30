## The OpenSea Ship's Log

A page listing recent auctions and bids on OpenSea, with the ability to buy items on sale right from the page.

### Demo

Check out a live version of this example [here](https://ships-log.herokuapp.com).

![Ship's Log Screenshot](https://storage.googleapis.com/opensea-static/opensea-ships-log/screenshot.png "Ship's Log Screenshot")

### Instructions

To install dependencies:
```bash
npm install
```

To run the app on localhost:

```bash
npm start
```

To minify and create a production build:

```bash
npm run build
```

### Deploying to Heroku

```bash
heroku create -b https://github.com/heroku/heroku-buildpack-static.git
npm run build
git push heroku master
```

### Directory structure

`public` houses favicon and base index.html – there should be little reason to use this directory.

`src` contains the app's js entry point and a simple CSS file

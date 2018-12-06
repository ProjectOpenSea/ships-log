## The OpenSea Ship's Log

A page listing recent auctions and bids on OpenSea, with the ability to buy items on sale right from the page.

### Demo

Check out a live version of this example [here](https://ships-log.herokuapp.com).

![Ship's Log Screenshot](https://storage.googleapis.com/opensea-static/opensea-ships-log/screenshot.png "Ship's Log Screenshot")

### Instructions

Execute `nvm use`, if you have Node Version Manager, or install Node.js version 8.11 to make sure dependencies work.

Then, to install dependencies:
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

### The Code

This dapp is very simple. Here's the logic for fetching assets with orders:

```JavaScript
async fetchData() {
  const { orders, count } = await this.props.seaport.api.getOrders({
    side: this.state.side
    // Other possible query options, with more to come:
    // 'asset_contract_address'
    // 'maker'
    // 'taker'
    // 'owner'
    // 'token_id'
    // 'token_ids'
    // 'sale_kind'
  }, this.state.page)

  this.setState({ orders, total: count })
}
```

And here's the one-line call for buying an asset:
```JavaScript
await this.props.seaport.fulfillOrder({ order: this.props.order, accountAddress })
```

If you have any questions, drop us a note any time in [Discord](https://discord.gg/XjwWYgU) in the #developers channel!

### Deploying to Heroku

The create-react-app buildpack has issues finding dependencies during the build phase. To work around those, you can do `npm run eject` and deploy a node app, or you can deploy a pure, static site:

```bash
heroku create -b https://github.com/heroku/heroku-buildpack-static.git
npm run build
git push heroku master
```

### Directory structure

`public` houses favicon and base index.html – there should be little reason to use this directory.

`src` contains the app's js entry point and a simple CSS file

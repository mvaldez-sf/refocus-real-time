/**
 * Copyright (c) 2019, salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root or
 * https://opensource.org/licenses/BSD-3-Clause
 */

/**
 * index.js
 *
 * Set up socket.io and redis subscriber to receive events and emit to clients.
 */
const debug = require('debug')('refocus-real-time');
const conf = require('./conf/config');
const namespaceInit = require('./src/namespaceInit');
const socketInit = require('./src/socketInit');
const subscriberInit = require('./src/subscriberInit');

Object.entries(conf).forEach(([key, val]) => {
  if (val === undefined) throw new Error(`Config variable "${key}" is required.`);
});

const io = require('socket.io')(conf.port);
namespaceInit(io)
.then(() => socketInit(io))
.then(() => subscriberInit(io));
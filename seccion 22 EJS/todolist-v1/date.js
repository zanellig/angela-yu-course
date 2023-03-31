'use strict';

const today = new Date();
const options = { weekday: 'long', day: 'numeric', month: 'long' };
const day = today.toLocaleDateString('en-US', options);

exports.day = day;

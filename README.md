![](http://www.ldrly.com/assets/img/logo-orange-small.png)
Node-LDRLY
========

Welcome to the Node-LDRLY repository. This package allows you to easily integrate [LDRLY](http://www.ldrly.com) into your social/mobile game. LDRLY provides intelligent social comparison, leaderboards, and stat analysis for your games.

Mention something about how the package works here.... batching, etc!

Please note that this is a new product. To report any issues you encounter, you can submit them [here](https://github.com/LDRLY/node-ldrly/issues) or email us at [bugs@ldrly.com](mailto:bugs@ldrly.com).

## Getting Started

1. Install Node.js. 
2. Install this package by entering the following `npm install ldrly` into your application.
3. Copy this code to initialize LDRLY `ldrly.init({api_key:'key'});`. You need to have your secret API for this to work.

## Method Reference 

#### ldrly.postStat ({fbuid,stats}) ####
Use **postStat** everytime you want to update LDRLY on a certain stat for a user. You can send as many stats for a user on a single call.



- `fbuid` - The user's Facebook ID
- `third_party_fbuid` - The user's Third Party Facebook ID
- `stats` - An object that contains all the stats with name value pairs to update.
 
<pre>
ldrly.postStat({
  fbuid:'123456789',
  stats: {
    stat_name:'coins_earned',
    value:1,
    game_data: {
      level:'2'
    }
  }
});
</pre>

#### ldrly.identify({fbuid, third\_party\_fbuid, user_data}) ####
**identify** allows you to associate a fbuid or facebook thirdparty id with interesting traits about a user. By doing this, you are allowing LDRLY to have more information to use to create a deeper and more engaging experience while using LDRLY for your game.

- `fbuid` - The user's Facebook ID
- `third_party_fbuid` - The user's Third Party Facebook ID
- `user_data` - An object that contains all the updated user meta-data 

<pre>
ldrly.identify({
  fbuid: '123456789',
  third_party_fbuid: 'thpid',
  user_data: {
    level: 20,
    character_name: 'Johhny Cakes',
    class: 'Paladin'
  }
});
</pre>

## Example Code

<pre>
ldrly.init({api_key:'FDGHt4gs345yG'}); // Secret API Key
ldrly.on('error', console.log);

ldrly.on('flush', function () {
  console.log('You\'ve been flushed');
});

ldrly.postStat({
  fbuid:'123456789',
  stats: {
    stat_name:'coins_earned',
    value:1,
    game_data: {
      level:'2'
    }
  }
});

ldrly.postStat({
  fbuid:'123456789',
  stats: [{
    stat_name:'kills',
    value:20,
    game_data: {
      level:'2'
    }
  }]
});

ldrly.postStat([{
  fbuid:'123456789',
  stats: [{
    stat_name:'xp_earned',
    value:1,
    game_data: {
      level:'2'
    }
  },
  {
    stat_name:'missions_completed',
    value:7,
    game_data: {
      level:'2'
    }
  }]
}]);

//identifying in context of a game
ldrly.identify({
  fbuid: '123456789',
  third_party_fbuid: 'thpid',
  user_data: {
    level: 20,
    character_name: 'Johhny Cakes',
    class: 'Paladin'
  }
});

</pre>

## Bugs

Please note that this is a new product. To report any issues you encounter, you can submit them [here](https://github.com/LDRLY/node-ldrly/issues) or email us at [bugs@ldrly.com](mailto:bugs@ldrly.com).

## LICENSE

LDRLY for Node is free-to-use, proprietary software. Full license coming soon!

const names = [
  {
    "username": "coolcat123",
    "email": "coolcat123@example.com"
  },
  {
    "username": "skywalker88",
    "email": "skywalker88@example.com"
  },
  {
    "username": "starfish2000",
    "email": "starfish2000@example.com"
  },
  {
    "username": "rockyroad",
    "email": "rockyroad@example.com"
  },
  {
    "username": "moonlight7",
    "email": "moonlight7@example.com"
  },
  {
    "username": "rainbowdash",
    "email": "rainbowdash@example.com"
  },
  {
    "username": "oceanblue",
    "email": "oceanblue@example.com"
  },
  {
    "username": "sunshine42",
    "email": "sunshine42@example.com"
  },
  {
    "username": "mysteryman",
    "email": "mysteryman@example.com"
  },
  {
    "username": "forestwhisper",
    "email": "forestwhisper@example.com"
  }
];

const appDescriptions = [
  {
    "tweet": "Just saw the most amazing sunset today! #beautiful #nature"
  },
  {
    "tweet": "Excited for the new Star Wars movie! Who's with me? #StarWars #fanboy"
  },
  {
    "tweet": "Had a great day at the beach. Life is good! #beachday #relax"
  },
  {
    "tweet": "Just tried the best ice cream ever. Rocky road for the win! #yum #icecreamlover"
  },
  {
    "tweet": "Moonlight strolls are the best therapy. #peaceful #nightwalk"
  },
  {
    "tweet": "Rainbow after the rain. Always look for the silver lining. #inspiration #positivity"
  },
  {
    "tweet": "Surfing the waves and loving every moment. #surfing #oceanlife"
  },
  {
    "tweet": "Sunny days make me so happy! #sunshine #happyvibes"
  },
  {
    "tweet": "Sometimes, it's good to get lost in a book. #reading #escape"
  },
  {
    "tweet": "The forest is so calming. Nature truly heals. #naturelover #forest"
  }
];

// Get a random item given an array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Gets a random full name
const getRandomName = () =>
  `${getRandomArrItem(names)} ${getRandomArrItem(names)}`;

// Function to generate random assignments that we can add to student object.
const getRandomAssignments = (int) => {
  const results = [];
  for (let i = 0; i < int; i++) {
    results.push({
      assignmentName: getRandomArrItem(appDescriptions),
      score: Math.floor(Math.random() * (99 - 70 + 1) + 70),
    });
  }
  return results;
};

// Export the functions for use in seed.js
module.exports = { getRandomName, getRandomAssignments };

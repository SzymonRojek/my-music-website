
// function isTheMen(name) {
//   const men = [ 'Socrates', 'Platon', 'Arystoteles'];
  
//   for (let i = 0; i < men.length; i++) {
//     const man = men[i];
    
//     if(man.toLowerCase() === name.toLowerCase()) {
//       return true;
//     }
//   }

//   return false;
// }

// // console.log(isTheMen('Socrates'));


// // simplest way with higher order function

// function isTheMen(name) {
//   const men = [ 'Socrates', 'Platon', 'Arystoteles'];
  
//   return men.includes(name);
// }

// console.log(isTheMen('Socrates'));


// function checkTheCake(isNot, arr) {
  
// }

// console.log(checkTheCake('chocolate',['vanilla', 'chocolate']));


// Setup
let collection = {
  2548: {
    albumTitle: 'Slippery When Wet',
    artist: 'Bon Jovi',
    tracks: ['Let It Rock', 'You Give Love a Bad Name']
  },
  2468: {
    albumTitle: '1999',
    artist: 'Prince',
    tracks: ['1999', 'Little Red Corvette']
  },
  1245: {
    artist: 'Robert Palmer',
    // tracks: []
  },
  5439: {
    albumTitle: 'ABBA Gold'
  }
};

// Only change code below this line
function updateRecords(object, id, prop, value) {

  if(prop !== 'tracks' && value !== '') object[id][prop] = value; 
 
  if(prop === 'tracks' && !object[id].hasOwnProperty(prop)) object[id][prop] = [];
  
  if(prop === 'tracks' && value !== '') object[id][prop].push(value);

  if(value === '') delete object[id][prop];

  return  object;
}

// console.log(updateRecords(collection, 5439, 'artist', 'ABBA'));
// console.log(updateRecords(collection, 5439, "tracks", "Take a Chance on Me"));
// console.log(updateRecords(collection, 2548, "artist", ""));
// console.log(updateRecords(collection, 1245, "tracks", "Addicted to Love"));
// console.log(updateRecords(collection, 2468, "tracks", "Free"));
// console.log(updateRecords(collection, 2548, "tracks", ""));
// console.log(updateRecords(collection, 1245, "albumTitle", "Riptide"));

// console.log(collection);




var contacts = [
  {
      "firstName": "Akira",
      "lastName": "Laine",
      "number": "0543236543",
      "likes": ["Pizza", "Coding", "Brownie Points"]
  },
  {
      "firstName": "Harry",
      "lastName": "Potter",
      "number": "0994372684",
      "likes": ["Hogwarts", "Magic", "Hagrid"]
  },
  {
      "firstName": "Sherlock",
      "lastName": "Holmes",
      "number": "0487345643",
      "likes": ["Intriguing Cases", "Violin"]
  },
  {
      "firstName": "Kristian",
      "lastName": "Vos",
      "number": "unknown",
      "likes": ["JavaScript", "Gaming", "Foxes"]
  }
];

  function lookUpProfile(name, prop) {
    let score = [];
    let message;

    contacts.forEach( el => {
      if (el.firstName === name) {
        if(el.hasOwnProperty(prop)) {
          score.push(el[prop]);
          message = el.firstName;
        } else {
          message = 'No such property';
        }
      }
    });

    if(message === undefined) {
      message = 'No such name';
    }
    return { score, message };
  }
 
// console.log(lookUpProfile("Kristian", "lastName"));
// console.log(lookUpProfile("Harry", "likes"));
// console.log(lookUpProfile("Akira", "address"));
// console.log(lookUpProfile("Bob", "potato"));







function Point(x, y) {
  this.x = x;
  this.y = y;
}

Point.prototype.getCoordinates = function () {
  console.log(`X: ${this.x}, Y: ${this.y}`);
}
let p1 = new Point(2, 4);
let p2 = new Point(1, 3);

// p1.getCoordinates(); // 2, 4



function smoothScroll(tar, duration) {
  const target = document.querySelector(tar);
  const targetPosition = target.getBoundingClientRect().top;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  let startTime = null;

  function animation(currentTime) {
    if(startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const run = ease(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);
    if(timeElapsed < duration) requestAnimationFrame(animation);
  }

  function ease(t, b, c, d) {
    t /= d/2;
    if (t < 1) return c/2* t* t + b;
    t--;
    return -c/2 * (t * (t-2) - 1) + b;
  }

  requestAnimationFrame(animation);
}
 
let section1 = document.querySelector('.section1');
let section2 = document.querySelector('.section2');

section1.addEventListener('click', function() {
  smoothScroll('.section2', 1000);
});

section2.addEventListener('click', function() {
  smoothScroll('.section1', 3000);
});
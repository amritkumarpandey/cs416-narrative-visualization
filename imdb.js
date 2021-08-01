const movieData = [
  {
    name: 'Avengers: Endgame',
    contentRating: '12A',
    duration: 181, // in minutes
    starRating: 8.4, // out of 10
    votes: 747374,
    gross: 858 // USD million
  },
  {
    name: 'The Lion King',
    contentRating: 'PG',
    duration: 118,
    starRating: 6.9,
    votes: 198014,
    gross: 544
  },
  {
    name: 'Star Wars: The Rise of Skywalker',
    contentRating: '12A',
    duration: 141,
    starRating: 6.6,
    votes: 343828,
    gross: 515
  },
  {
    name: 'Frozen 2',
    contentRating: 'U',
    duration: 103,
    starRating: 6.9,
    votes: 120859,
    gross: 477
  },
  {
    name: 'Toy Story 4',
    contentRating: 'U',
    duration: 100,
    starRating: 7.8,
    votes: 187391,
    gross: 434
  },
  {
    name: 'Captain Marvel',
    contentRating: '12A',
    duration: 123,
    starRating: 6.9,
    votes: 420459,
    gross: 427
  },
  {
    name: 'Spider-Man: Far From Home',
    contentRating: '12A',
    duration: 129,
    starRating: 7.5,
    votes: 301963,
    gross: 391
  },
  {
    name: 'Aladdin',
    contentRating: 'PG',
    duration: 128,
    starRating: 7.0,
    votes: 213479,
    gross: 356
  },
  {
    name: 'Joker',
    contentRating: '15',
    duration: 122,
    starRating: 8.5,
    votes: 840556,
    gross: 335
  },
  {
    name: 'Jumanji: The Next Level',
    contentRating: '12A',
    duration: 123,
    starRating: 6.7,
    votes: 163288,
    gross: 317
  },
];

const divWidth = document.getElementById('movieList').clientWidth / 2 - 10;
const divHeight = (document.getElementById('movieList').clientHeight - 40) / 5;

movieData.forEach((movie) => {
  movie.color = `rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`;
});

for (let i = 0; i < movieData.length; i++) {
  d3.select('#movieList').append('div');

}

d3.selectAll('#movieList div').select(function (d, i, n) {
  /* For Testing purpose
   console.log(d); //date
   console.log(i); //index
   console.log(n); //node
   */
  d3.select(n[i])
    .style('width', divWidth + 'px')
    .style('height', divHeight + 'px')
    .style('line-height', divHeight + 'px')
    .attr('class', 'movieSelect');

  n[i].innerText = movieData[i].name;
})

//Add events
document.querySelector('#movieList').addEventListener('click', event => {
  const movie = event.target.innerText;
  console.log(movie);

  // select movie based on selection
  const movieObj = searchMovie(movie);
  //console.log(movieObj);
  d3.select('#moviePost')
    .html(
      `<h2>${(movieObj.name.toUpperCase())}</h2>
    <p> Content Rating: <span>${movieObj.contentRating}</span></p>
    <p> Duration (Minutes): <span>${movieObj.duration}</span></p>
    <p> Star Rating (Out of 10): <span>${movieObj.starRating}</span></p>
    <p> Total Votes: <span>${movieObj.votes}</span></p>
    <p> Gross Collection (USD Million): <span>${movieObj.gross}</span></p>
    `
    )
});

function searchMovie(movie) {
  for (let key in movieData) {
    if (movieData[key].name == movie) {
      return movieData[key];
    }
  }
}

// Add logic to generat d3 charts

document.querySelector('#choiceSubmit').addEventListener('submit', function (event) {
  event.preventDefault();

  const choiceMap = new Map();
  choiceMap.set('U', d3.select('#cbu').property('checked'));
  choiceMap.set('15', d3.select('#cb15').property('checked'));
  choiceMap.set('12A', d3.select('#cb12a').property('checked'));
  choiceMap.set('PG', d3.select('#cbpg').property('checked'));

  console.log(choiceMap);

  // Clear the previous feedback if a new selection is present
  if (Array.from(choiceMap.values()).includes(true)) {
    document.getElementById('feedback').innerText = '';
    // clear old selections
    d3.selectAll('#charts').selectAll('div').html(null);
    d3.selectAll('#charts').selectAll('svg').html(null);
    createSelection(choiceMap);
  }
  else {
    document.getElementById('feedback').innerText = 'Select atleast 1 checkbox.';
    // clear old selections
    d3.selectAll('#charts').selectAll('div').html(null);
    d3.selectAll('#charts').selectAll('svg').html(null);
  }
});

function createSelection(choiceMap) {
  const selectedMovies = [];
  for (let [key, value] of choiceMap) {
    console.log(key, value);
    if (value == true) {
      movieData.forEach(function (movie) {
        if (movie.contentRating === key) {
          selectedMovies.push(movie);
        }

      });
    }
  }

  //update the content
  updateContent(selectedMovies);
  updateLegend(selectedMovies);
  updateGross(selectedMovies);
  updateDuration(selectedMovies);
  updateVotes(selectedMovies);
}

function updateContent(selectedMovies) {
  let countU = 0, count15 = 0, count12A = 0, countPG = 0;
  const uniqueSet = new Set();

  movieData.forEach(function (movie) {
    uniqueSet.add(movie.contentRating);
  });

  for (let i = 0; i < uniqueSet.size; i++) {
    d3.select('#cont').append('div');
  }

  selectedMovies.forEach(function (movie) {
    if (movie.contentRating === 'U') {
      countU += 1;
    } else if (movie.contentRating === '15') {
      countU += 1;
    } else if (movie.contentRating === '12A') {
      countU += 1;
    } else if (movie.contentRating === 'PG') {
      countU += 1;
    }
  });

  d3.select('#cont div:nth-child(1)')
  .html(
  `<h2>${countU}</h2>
    <p>"U" rating movie(s) selected</p>
  `);
  d3.select('#cont div:nth-child(2)')
  .html(
  `<h2>${count15}</h2>
    <p>"15" rating movie(s) selected</p>
  `);
  d3.select('#cont div:nth-child(3)')
  .html(
  `<h2>${count12A}</h2>
    <p>"12A" rating movie(s) selected</p>
  `);
  d3.select('#cont div:nth-child(4)')
  .html(
  `<h2>${countPG}</h2>
    <p>"PG" rating movie(s) selected</p>
  `);
}

function updateLegend(selectedMovies){
  selectedMovies.forEach(function (movie){
    const holder = d3.select("#legend").append('div');
    
    holder.append('div')
    .style('width', '15px')
    .style('height', '15px')
    .style('background-color', `${movie.color}`);

    holder.append('p').text(`${movie.name}`);
  });
}


function updateGross(selectedMovies){
  selectedMovies.forEach(function (movie){
    d3.select('#gross').append('rect')
    .attr('width',`${movie.gross/2}`)
    .attr('height',20)
    .attr('x', '0')
    .attr('y', selectedMovies.indexOf(movie) * 25 +25)
    .style('fill',`${movie.color}`);

    d3.select('#gross')
    .append('text')
    .text(`${movie.gross}`)
    .attr('x',`${movie.gross/2 + 5}`)
    .attr('y',selectedMovies.indexOf(movie) * 25 + 40)
    .style('font-size',14)
    .style('fill', 'rgb(63,63,63)');
    
  });

  d3.select('#gross')
  .insert('text','rect')
  .text('Gross selections in USD Million.')
  .attr('x',0)
  .attr('y',15)
  .style('font-size',16)
  .style('font-weight','600')
  .style('fill', 'rgb(63,63,63)');

}


function updateDuration(selectedMovies){
  selectedMovies.forEach(function (movie){
    d3.select('#duration').append('rect')
    .attr('width',`${movie.duration}`)
    .attr('height',20)
    .attr('x', '0')
    .attr('y', selectedMovies.indexOf(movie) * 25 +25)
    .style('fill',`${movie.color}`);

    d3.select('#duration')
    .append('text')
    .text(`${movie.duration}`)
    .attr('x',`${movie.duration + 5}`)
    .attr('y',selectedMovies.indexOf(movie) * 25 + 40)
    .style('font-size','14')
    .style('fill', 'rgb(63,63,63)');
    
  });

  d3.select('#duration')
  .insert('text','rect')
  .text('Duration in Minutes')
  .attr('x',0)
  .attr('y',15)
  .style('font-size','16')
  .style('font-weight','600')
  .style('fill', 'rgb(63,63,63)');
}

function updateVotes(selectedMovies){
  let cxValue=0, xValue=0;

  selectedMovies.forEach(function (movie) {
    d3.select('#votes')
    .append('circle')
    .attr('r',`${movie.votes / 20000}`)
    .attr('cx',function(){
      cxValue = cxValue + (movie.votes / 20000) + 60;
      return cxValue;
    })
  .attr('cy','150')
  .style('fill', `${movie.color}`);;

  d3.select('#votes')
  .append('text')
  .text(`${movie.votes}`)
  .attr('text-anchor','middle')
  .attr('x',function(){
    xValue = xValue + (movie.votes / 20000) + 60;
    return xValue;
  })
.attr('y', `${150 - movie.votes / 20000 - 10}`)
.style('font-size','14')
.style('fill', 'rgb(63,63,63)');
  });

  d3.select('#votes')
  .insert('text','circle')
  .text('Number of Votes')
  .attr('x',0)
  .attr('y',15)
  .style('font-size',16)
  .style('font-weight','600')
  .style('fill', 'rgb(63,63,63)');

}
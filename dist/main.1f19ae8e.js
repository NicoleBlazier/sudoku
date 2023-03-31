// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"main.js":[function(require,module,exports) {
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
var CONSTANT = {
  UNASSIGNED: 0,
  GRID_SIZE: 9,
  BOX_SIZE: 3,
  NUMBERS: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  LEVEL_NAME: ['Easy', 'Medium', 'Hard', 'Very hard', 'Insane', 'Inhuman'],
  LEVEL: [29, 38, 47, 56, 65, 74]
};
document.querySelector('#toggle-dark').addEventListener('click', function () {
  document.body.classList.toggle('dark');
  var isDarkMode = document.body.classList.contains('dark');
  localStorage.setItem('darkmode', isDarkMode);
  // chang mobile status bar color
  document.querySelector('meta[name="theme-color"').setAttribute('content', isDarkMode ? '#1a1a2e' : '#fff');
});

// initial value

// screens
var start_screen = document.querySelector('#start-screen');
var game_screen = document.querySelector('#game-screen');
var pause_screen = document.querySelector('#pause-screen');
var result_screen = document.querySelector('#result-screen');
// ----------
var cells = document.querySelectorAll('.main-grid-cell');
var name_input = document.querySelector('#input-name');
var number_inputs = document.querySelectorAll('.number');
var player_name = document.querySelector('#player-name');
var game_level = document.querySelector('#game-level');
var game_time = document.querySelector('#game-time');
var result_time = document.querySelector('#result-time');
var level_index = 0;
var level = CONSTANT.LEVEL[level_index];
var timer = null;
var pause = false;
var seconds = 0;
var su = undefined;
var su_answer = undefined;
var selected_cell = -1;

// --------

var getGameInfo = function getGameInfo() {
  return JSON.parse(localStorage.getItem('game'));
};

// add space for each 9 cells
var initGameGrid = function initGameGrid() {
  var index = 0;
  for (var i = 0; i < Math.pow(CONSTANT.GRID_SIZE, 2); i++) {
    var row = Math.floor(i / CONSTANT.GRID_SIZE);
    var col = i % CONSTANT.GRID_SIZE;
    if (row === 2 || row === 5) cells[index].style.marginBottom = '10px';
    if (col === 2 || col === 5) cells[index].style.marginRight = '10px';
    index++;
  }
};
// ----------------

var setPlayerName = function setPlayerName(name) {
  return localStorage.setItem('player_name', name);
};
var getPlayerName = function getPlayerName() {
  return localStorage.getItem('player_name');
};
var showTime = function showTime(seconds) {
  return new Date(seconds * 1000).toISOString().substr(11, 8);
};
window.onload = function () {
  clearNewGameValues();
};
function clearNewGameValues() {
  document.getElementById('input-name').value = '';
  document.getElementById('input-name').value = '';
  document.getElementById('input-name').value = '';
}
var clearSudoku = function clearSudoku() {
  for (var i = 0; i < Math.pow(CONSTANT.GRID_SIZE, 2); i++) {
    cells[i].innerHTML = '';
    cells[i].classList.remove('filled');
    cells[i].classList.remove('selected');
  }
};
var initSudoku = function initSudoku() {
  // clear old sudoku
  clearSudoku();
  resetBg();
  // generate sudoku puzzle here
  su = sudokuGen(level);
  su_answer = _toConsumableArray(su.question);
  seconds = 0;
  saveGameInfo();

  // show sudoku to div
  for (var i = 0; i < Math.pow(CONSTANT.GRID_SIZE, 2); i++) {
    var row = Math.floor(i / CONSTANT.GRID_SIZE);
    var col = i % CONSTANT.GRID_SIZE;
    cells[i].setAttribute('data-value', su.question[row][col]);
    if (su.question[row][col] !== 0) {
      cells[i].classList.add('filled');
      cells[i].innerHTML = su.question[row][col];
    }
  }
};
var loadSudoku = function loadSudoku() {
  var game = getGameInfo();
  game_level.innerHTML = CONSTANT.LEVEL_NAME[game.level];
  su = game.su;
  su_answer = su.answer;
  seconds = game.seconds;
  game_time.innerHTML = showTime(seconds);
  level_index = game.level;

  // show sudoku to div
  for (var i = 0; i < Math.pow(CONSTANT.GRID_SIZE, 2); i++) {
    var row = Math.floor(i / CONSTANT.GRID_SIZE);
    var col = i % CONSTANT.GRID_SIZE;
    cells[i].setAttribute('data-value', su_answer[row][col]);
    cells[i].innerHTML = su_answer[row][col] !== 0 ? su_answer[row][col] : '';
    if (su.question[row][col] !== 0) {
      cells[i].classList.add('filled');
    }
  }
};
var hoverBg = function hoverBg(index) {
  var row = Math.floor(index / CONSTANT.GRID_SIZE);
  var col = index % CONSTANT.GRID_SIZE;
  var box_start_row = row - row % 3;
  var box_start_col = col - col % 3;
  for (var i = 0; i < CONSTANT.BOX_SIZE; i++) {
    for (var j = 0; j < CONSTANT.BOX_SIZE; j++) {
      var cell = cells[9 * (box_start_row + i) + (box_start_col + j)];
      cell.classList.add('hover');
    }
  }
  var step = 9;
  while (index - step >= 0) {
    cells[index - step].classList.add('hover');
    step += 9;
  }
  step = 9;
  while (index + step < 81) {
    cells[index + step].classList.add('hover');
    step += 9;
  }
  step = 1;
  while (index - step >= 9 * row) {
    cells[index - step].classList.add('hover');
    step += 1;
  }
  step = 1;
  while (index + step < 9 * row + 9) {
    cells[index + step].classList.add('hover');
    step += 1;
  }
};
var resetBg = function resetBg() {
  cells.forEach(function (e) {
    return e.classList.remove('hover');
  });
};
var checkErr = function checkErr(value) {
  var addErr = function addErr(cell) {
    if (parseInt(cell.getAttribute('data-value')) === value) {
      cell.classList.add('err');
      cell.classList.add('cell-err');
      setTimeout(function () {
        cell.classList.remove('cell-err');
      }, 500);
    }
  };
  var index = selected_cell;
  var row = Math.floor(index / CONSTANT.GRID_SIZE);
  var col = index % CONSTANT.GRID_SIZE;
  var box_start_row = row - row % 3;
  var box_start_col = col - col % 3;
  for (var i = 0; i < CONSTANT.BOX_SIZE; i++) {
    for (var j = 0; j < CONSTANT.BOX_SIZE; j++) {
      var cell = cells[9 * (box_start_row + i) + (box_start_col + j)];
      if (!cell.classList.contains('selected')) addErr(cell);
    }
  }
  var step = 9;
  while (index - step >= 0) {
    addErr(cells[index - step]);
    step += 9;
  }
  step = 9;
  while (index + step < 81) {
    addErr(cells[index + step]);
    step += 9;
  }
  step = 1;
  while (index - step >= 9 * row) {
    addErr(cells[index - step]);
    step += 1;
  }
  step = 1;
  while (index + step < 9 * row + 9) {
    addErr(cells[index + step]);
    step += 1;
  }
};
var removeErr = function removeErr() {
  return cells.forEach(function (e) {
    return e.classList.remove('err');
  });
};
var saveGameInfo = function saveGameInfo() {
  var game = {
    level: level_index,
    seconds: seconds,
    su: {
      original: su.original,
      question: su.question,
      answer: su_answer
    }
  };
  localStorage.setItem('game', JSON.stringify(game));
};
var removeGameInfo = function removeGameInfo() {
  localStorage.removeItem('game');
  document.querySelector('#btn-continue').style.display = 'none';
};
var isGameWin = function isGameWin() {
  return sudokuCheck(su_answer);
};
var showResult = function showResult() {
  clearInterval(timer);
  result_screen.classList.add('active');
  result_time.innerHTML = showTime(seconds);
  start();
  stop();
};
var initNumberInputEvent = function initNumberInputEvent() {
  number_inputs.forEach(function (e, index) {
    e.addEventListener('click', function () {
      if (!cells[selected_cell].classList.contains('filled')) {
        cells[selected_cell].innerHTML = index + 1;
        cells[selected_cell].setAttribute('data-value', index + 1);
        // add to answer
        var row = Math.floor(selected_cell / CONSTANT.GRID_SIZE);
        var col = selected_cell % CONSTANT.GRID_SIZE;
        su_answer[row][col] = index + 1;
        // save game
        saveGameInfo();
        // -----
        removeErr();
        checkErr(index + 1);
        cells[selected_cell].classList.add('zoom-in');
        setTimeout(function () {
          cells[selected_cell].classList.remove('zoom-in');
        }, 500);

        // check game win
        if (isGameWin()) {
          removeGameInfo();
          showResult();
        }
        // ----
      }
    });
  });
};

var initCellsEvent = function initCellsEvent() {
  cells.forEach(function (e, index) {
    e.addEventListener('click', function () {
      if (!e.classList.contains('filled')) {
        cells.forEach(function (e) {
          return e.classList.remove('selected');
        });
        selected_cell = index;
        e.classList.remove('err');
        e.classList.add('selected');
        resetBg();
        hoverBg(index);
      }
    });
  });
};
var startGame = function startGame() {
  start_screen.classList.remove('active');
  game_screen.classList.add('active');
  player_name.innerHTML = name_input.value.trim();
  setPlayerName(name_input.value.trim());
  game_level.innerHTML = CONSTANT.LEVEL_NAME[level_index];
  showTime(seconds);
  timer = setInterval(function () {
    if (!pause) {
      seconds = seconds + 1;
      game_time.innerHTML = showTime(seconds);
    }
  }, 1000);
};
var returnStartScreen = function returnStartScreen() {
  clearInterval(timer);
  pause = false;
  seconds = 0;
  start_screen.classList.add('active');
  game_screen.classList.remove('active');
  pause_screen.classList.remove('active');
  result_screen.classList.remove('active');
};

// add button event
document.querySelector('#btn-level').addEventListener('click', function (e) {
  level_index = level_index + 1 > CONSTANT.LEVEL.length - 1 ? 0 : level_index + 1;
  level = CONSTANT.LEVEL[level_index];
  e.target.innerHTML = CONSTANT.LEVEL_NAME[level_index];
});
document.querySelector('#btn-play').addEventListener('click', function () {
  if (name_input.value.trim().length > 0) {
    initSudoku();
    startGame();
  } else {
    name_input.classList.add('input-err');
    setTimeout(function () {
      name_input.classList.remove('input-err');
      name_input.focus();
    }, 500);
  }
});
document.querySelector('#btn-continue').addEventListener('click', function () {
  if (name_input.value.trim().length > 0) {
    loadSudoku();
    startGame();
  } else {
    name_input.classList.add('input-err');
    setTimeout(function () {
      name_input.classList.remove('input-err');
      name_input.focus();
    }, 500);
  }
});
document.querySelector('#btn-pause').addEventListener('click', function () {
  pause_screen.classList.add('active');
  pause = true;
});
document.querySelector('#btn-resume').addEventListener('click', function () {
  pause_screen.classList.remove('active');
  pause = false;
});
document.querySelector('#btn-new-game').addEventListener('click', function () {
  returnStartScreen();
  clearNewGameValues();
});
document.querySelector('#btn-new-game-2').addEventListener('click', function () {
  console.log('object');
  returnStartScreen();
});
document.querySelector('#btn-delete').addEventListener('click', function () {
  cells[selected_cell].innerHTML = '';
  cells[selected_cell].setAttribute('data-value', 0);
  var row = Math.floor(selected_cell / CONSTANT.GRID_SIZE);
  var col = selected_cell % CONSTANT.GRID_SIZE;
  su_answer[row][col] = 0;
  removeErr();
});
// -------------

var init = function init() {
  var darkmode = JSON.parse(localStorage.getItem('darkmode'));
  document.body.classList.add(darkmode ? 'dark' : 'light');
  document.querySelector('meta[name="theme-color"').setAttribute('content', darkmode ? '#1a1a2e' : '#fff');
  var game = getGameInfo();
  document.querySelector('#btn-continue').style.display = game ? 'grid' : 'none';
  initGameGrid();
  initCellsEvent();
  initNumberInputEvent();
  if (getPlayerName()) {
    name_input.value = getPlayerName();
  } else {
    name_input.focus();
  }
};
init();

// for starting the confetti

var start = function start() {
  setTimeout(function () {
    confetti.start();
  }, 1000); // 1000 is time that after 1 second start the confetti ( 1000 = 1 sec)
};

//  for stopping the confetti

var stop = function stop() {
  setTimeout(function () {
    confetti.stop();
  }, 5000); // 5000 is time that after 5 second stop the confetti ( 5000 = 5 sec)
};

///////// sudoku.js
var newGrid = function newGrid(size) {
  var arr = new Array(size);
  for (var i = 0; i < size; i++) {
    arr[i] = new Array(size);
  }
  for (var _i = 0; _i < Math.pow(size, 2); _i++) {
    arr[Math.floor(_i / size)][_i % size] = CONSTANT.UNASSIGNED;
  }
  return arr;
};

// check duplicate number in col
var isColSafe = function isColSafe(grid, col, value) {
  for (var row = 0; row < CONSTANT.GRID_SIZE; row++) {
    if (grid[row][col] === value) return false;
  }
  return true;
};

// check duplicate number in row
var isRowSafe = function isRowSafe(grid, row, value) {
  for (var col = 0; col < CONSTANT.GRID_SIZE; col++) {
    if (grid[row][col] === value) return false;
  }
  return true;
};

// check duplicate number in 3x3 box
var isBoxSafe = function isBoxSafe(grid, box_row, box_col, value) {
  for (var row = 0; row < CONSTANT.BOX_SIZE; row++) {
    for (var col = 0; col < CONSTANT.BOX_SIZE; col++) {
      if (grid[row + box_row][col + box_col] === value) return false;
    }
  }
  return true;
};

// check in row, col and 3x3 box
var isSafe = function isSafe(grid, row, col, value) {
  return isColSafe(grid, col, value) && isRowSafe(grid, row, value) && isBoxSafe(grid, row - row % 3, col - col % 3, value) && value !== CONSTANT.UNASSIGNED;
};

// find unassigned cell
var findUnassignedPos = function findUnassignedPos(grid, pos) {
  for (var row = 0; row < CONSTANT.GRID_SIZE; row++) {
    for (var col = 0; col < CONSTANT.GRID_SIZE; col++) {
      if (grid[row][col] === CONSTANT.UNASSIGNED) {
        pos.row = row;
        pos.col = col;
        return true;
      }
    }
  }
  return false;
};

// shuffle arr
var shuffleArray = function shuffleArray(arr) {
  var curr_index = arr.length;
  while (curr_index !== 0) {
    var rand_index = Math.floor(Math.random() * curr_index);
    curr_index -= 1;
    var temp = arr[curr_index];
    arr[curr_index] = arr[rand_index];
    arr[rand_index] = temp;
  }
  return arr;
};

// check puzzle is complete
var isFullGrid = function isFullGrid(grid) {
  return grid.every(function (row, i) {
    return row.every(function (value, j) {
      return value !== CONSTANT.UNASSIGNED;
    });
  });
};
var sudokuCreate = function sudokuCreate(grid) {
  var unassigned_pos = {
    row: -1,
    col: -1
  };
  if (!findUnassignedPos(grid, unassigned_pos)) return true;
  var number_list = shuffleArray(_toConsumableArray(CONSTANT.NUMBERS));
  var row = unassigned_pos.row;
  var col = unassigned_pos.col;
  number_list.forEach(function (num, i) {
    if (isSafe(grid, row, col, num)) {
      grid[row][col] = num;
      if (isFullGrid(grid)) {
        return true;
      } else {
        if (sudokuCreate(grid)) {
          return true;
        }
      }
      grid[row][col] = CONSTANT.UNASSIGNED;
    }
  });
  return isFullGrid(grid);
};
var sudokuCheck = function sudokuCheck(grid) {
  var unassigned_pos = {
    row: -1,
    col: -1
  };
  if (!findUnassignedPos(grid, unassigned_pos)) return true;
  grid.forEach(function (row, i) {
    row.forEach(function (num, j) {
      if (isSafe(grid, i, j, num)) {
        if (isFullGrid(grid)) {
          return true;
        } else {
          if (sudokuCreate(grid)) {
            return true;
          }
        }
      }
    });
  });
  return isFullGrid(grid);
};
var rand = function rand() {
  return Math.floor(Math.random() * CONSTANT.GRID_SIZE);
};
var removeCells = function removeCells(grid, level) {
  var res = _toConsumableArray(grid);
  var attemps = level;
  while (attemps > 0) {
    var row = rand();
    var col = rand();
    while (res[row][col] === 0) {
      row = rand();
      col = rand();
    }
    res[row][col] = CONSTANT.UNASSIGNED;
    attemps--;
  }
  return res;
};

// generate sudoku base on level
var sudokuGen = function sudokuGen(level) {
  var sudoku = newGrid(CONSTANT.GRID_SIZE);
  console.log('sudoku', sudoku);
  var check = sudokuCreate(sudoku);
  console.log('checks', check);
  if (check) {
    var question = removeCells(sudoku, level);
    return {
      original: sudoku,
      question: question
    };
  }
  return undefined;
};

// isConfettiPaused
var confetti = {
  maxCount: 150,
  //set max confetti count
  speed: 2,
  //set the particle animation speed
  frameInterval: 15,
  //the confetti animation frame interval in milliseconds
  alpha: 1.0,
  //the alpha opacity of the confetti (between 0 and 1, where 1 is opaque and 0 is invisible)
  gradient: false,
  //whether to use gradients for the confetti particles
  start: null,
  //call to start confetti animation (with optional timeout in milliseconds, and optional min and max random confetti count)
  stop: null,
  //call to stop adding confetti
  toggle: null,
  //call to start or stop the confetti animation depending on whether it's already running
  pause: null,
  //call to freeze confetti animation
  resume: null,
  //call to unfreeze confetti animation
  togglePause: null,
  //call to toggle whether the confetti animation is paused
  remove: null,
  //call to stop the confetti animation and remove all confetti immediately
  isPaused: null,
  //call and returns true or false depending on whether the confetti animation is paused
  isRunning: null //call and returns true or false depending on whether the animation is running
};

(function () {
  confetti.start = startConfetti;
  confetti.stop = stopConfetti;
  confetti.toggle = toggleConfetti;
  confetti.pause = pauseConfetti;
  confetti.resume = resumeConfetti;
  confetti.togglePause = toggleConfettiPause;
  confetti.isPaused = isConfettiPaused;
  confetti.remove = removeConfetti;
  confetti.isRunning = isConfettiRunning;
  var supportsAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame;
  var colors = ["rgba(30,144,255,", "rgba(107,142,35,", "rgba(255,215,0,", "rgba(255,192,203,", "rgba(106,90,205,", "rgba(173,216,230,", "rgba(238,130,238,", "rgba(152,251,152,", "rgba(70,130,180,", "rgba(244,164,96,", "rgba(210,105,30,", "rgba(220,20,60,"];
  var streamingConfetti = false;
  var animationTimer = null;
  var pause = false;
  var lastFrameTime = Date.now();
  var particles = [];
  var waveAngle = 0;
  var context = null;
  function resetParticle(particle, width, height) {
    particle.color = colors[Math.random() * colors.length | 0] + (confetti.alpha + ")");
    particle.color2 = colors[Math.random() * colors.length | 0] + (confetti.alpha + ")");
    particle.x = Math.random() * width;
    particle.y = Math.random() * height - height;
    particle.diameter = Math.random() * 10 + 5;
    particle.tilt = Math.random() * 10 - 10;
    particle.tiltAngleIncrement = Math.random() * 0.07 + 0.05;
    particle.tiltAngle = Math.random() * Math.PI;
    return particle;
  }
  function toggleConfettiPause() {
    if (pause) resumeConfetti();else pauseConfetti();
  }
  function isConfettiPaused() {
    return pause;
  }
  function pauseConfetti() {
    pause = true;
  }
  function resumeConfetti() {
    pause = false;
    runAnimation();
  }
  function runAnimation() {
    if (pause) return;else if (particles.length === 0) {
      context.clearRect(0, 0, window.innerWidth, window.innerHeight);
      animationTimer = null;
    } else {
      var now = Date.now();
      var delta = now - lastFrameTime;
      if (!supportsAnimationFrame || delta > confetti.frameInterval) {
        context.clearRect(0, 0, window.innerWidth, window.innerHeight);
        updateParticles();
        drawParticles(context);
        lastFrameTime = now - delta % confetti.frameInterval;
      }
      animationTimer = requestAnimationFrame(runAnimation);
    }
  }
  function startConfetti(timeout, min, max) {
    var width = window.innerWidth;
    var height = window.innerHeight;
    window.requestAnimationFrame = function () {
      return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
        return window.setTimeout(callback, confetti.frameInterval);
      };
    }();
    var canvas = document.getElementById("confetti-canvas");
    if (canvas === null) {
      canvas = document.createElement("canvas");
      canvas.setAttribute("id", "confetti-canvas");
      canvas.setAttribute("style", "display:block;z-index:999999;pointer-events:none;position:fixed;top:0");
      document.body.prepend(canvas);
      canvas.width = width;
      canvas.height = height;
      window.addEventListener("resize", function () {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }, true);
      context = canvas.getContext("2d");
    } else if (context === null) context = canvas.getContext("2d");
    var count = confetti.maxCount;
    if (min) {
      if (max) {
        if (min == max) count = particles.length + max;else {
          if (min > max) {
            var temp = min;
            min = max;
            max = temp;
          }
          count = particles.length + (Math.random() * (max - min) + min | 0);
        }
      } else count = particles.length + min;
    } else if (max) count = particles.length + max;
    while (particles.length < count) {
      particles.push(resetParticle({}, width, height));
    }
    streamingConfetti = true;
    pause = false;
    runAnimation();
    if (timeout) {
      window.setTimeout(stopConfetti, timeout);
    }
  }
  function stopConfetti() {
    streamingConfetti = false;
  }
  function removeConfetti() {
    stop();
    pause = false;
    particles = [];
  }
  function toggleConfetti() {
    if (streamingConfetti) stopConfetti();else startConfetti();
  }
  function isConfettiRunning() {
    return streamingConfetti;
  }
  function drawParticles(context) {
    var particle;
    var x, y, x2, y2;
    for (var i = 0; i < particles.length; i++) {
      particle = particles[i];
      context.beginPath();
      context.lineWidth = particle.diameter;
      x2 = particle.x + particle.tilt;
      x = x2 + particle.diameter / 2;
      y2 = particle.y + particle.tilt + particle.diameter / 2;
      if (confetti.gradient) {
        var gradient = context.createLinearGradient(x, particle.y, x2, y2);
        gradient.addColorStop("0", particle.color);
        gradient.addColorStop("1.0", particle.color2);
        context.strokeStyle = gradient;
      } else context.strokeStyle = particle.color;
      context.moveTo(x, particle.y);
      context.lineTo(x2, y2);
      context.stroke();
    }
  }
  function updateParticles() {
    var width = window.innerWidth;
    var height = window.innerHeight;
    var particle;
    waveAngle += 0.01;
    for (var i = 0; i < particles.length; i++) {
      particle = particles[i];
      if (!streamingConfetti && particle.y < -15) particle.y = height + 100;else {
        particle.tiltAngle += particle.tiltAngleIncrement;
        particle.x += Math.sin(waveAngle) - 0.5;
        particle.y += (Math.cos(waveAngle) + particle.diameter + confetti.speed) * 0.5;
        particle.tilt = Math.sin(particle.tiltAngle) * 15;
      }
      if (particle.x > width + 20 || particle.x < -20 || particle.y > height) {
        if (streamingConfetti && particles.length <= confetti.maxCount) resetParticle(particle, width, height);else {
          particles.splice(i, 1);
          i--;
        }
      }
    }
  }
})();
},{}],"../../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "60715" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["../../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","main.js"], null)
//# sourceMappingURL=/main.1f19ae8e.js.map
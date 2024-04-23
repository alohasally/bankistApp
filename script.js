'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'EunJe Kim',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];
// const mov = accounts.map(acc => {
//   return acc.movements;
// });

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

//UserName
const createUsername = accs => {
  accs.forEach(acc => {
    acc.userName = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsername(accounts);

const displayMovements = (acc, sorted) => {
  containerMovements.innerHTML = '';

  const movs = sorted
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;
  movs.forEach((mov, i) => {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `<div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
    <div class="movements__date">3 days ago</div>
    <div class="movements__value">${mov}€</div>
  </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcBalance = acc => {
  acc.balance = acc.movements.reduce((acc, cur) => acc + cur, 0);
  labelBalance.textContent = `${acc.balance}€`;
};

const displaySummary = acc => {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, cur) => acc + cur, 0);
  labelSumIn.textContent = `${incomes}€`;

  const outcomes = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, cur) => acc + cur, 0);
  labelSumOut.textContent = `${Math.abs(outcomes)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter(interest => interest >= 1)
    .reduce((acc, interest) => acc + interest, 0);
  labelSumInterest.textContent = `${interest}€`;
  console.log('interest', interest);
};

const UpdateUI = acc => {
  displayMovements(acc);
  calcBalance(acc);
  displaySummary(acc);
};

let currentUser;

const handleLogin = e => {
  e.preventDefault();
  currentUser = accounts.find(acc => acc.userName === inputLoginUsername.value);
  console.log('currentUser', currentUser);
  if (currentUser?.pin === Number(inputLoginPin.value)) {
    labelWelcome.textContent = `Wecome back, ${
      currentUser.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    //Update ui
    UpdateUI(currentUser);

    //Clear username & password
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();
  }
};
////Event Handlers
btnLogin.addEventListener('click', handleLogin);

let sorted = false;
const handleSorted = e => {
  e.preventDefault();
  displayMovements(currentUser, !sorted);
  sorted = !sorted;
};
////Event Handlers
btnSort.addEventListener('click', handleSorted);

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  //confirm sender !== receiver
  // money > 0 && money >= sender.money
  const receiver = accounts.find(acc => acc.userName === inputTransferTo.value);
  const transferAmout = Number(inputTransferAmount.value);
  if (
    currentUser.userName !== receiver.userName &&
    receiver &&
    transferAmout > 0 &&
    transferAmout >= currentUser.balance
  ) {
    // send money to receiver
    receiver.movements.push(transferAmout);
    // get rid of money from sender
    currentUser.movements.push(-transferAmout);
    // hide money value
    inputTransferAmount.value = inputTransferTo.value = '';
    // Update UI
    updateUI(currentUser);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  //amount money . some(currentuser.mov >= amount money* 0.1)
  // push money to currentUser
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  // currentUser === input.value && currentUser.pin === input.value
  // account.splice(1)
  // hide ui
});

///////Computing name
// const createUsername = accs => {
//   return accs.map(acc => {
//     const userName = acc.owner
//       .toLowerCase()
//       .split(' ')
//       .map(name => name[0])
//       .join('');
//     return userName;
//   });
// };

//////Filter Deposit, Withdrawal

// const deposit = accs => accs.map(acc => acc.movements.filter(mov => mov > 0));
// const withdrawal = accs =>
//   accs.map(acc => acc.movements.filter(mov => mov < 0));
// console.log('deposit', deposit(accounts));
// console.log('withdrawal', withdrawal(accounts));

// console.log('userName', createUsername1(accounts));

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

//Challenge
/////////////////////////////////////////////////
// const juliaDogs = [3, 5, 2, 12, 7];
// const kateDogs = [9, 16, 6, 8, 3];

// const calcDogsAge = (juliaDogs, kateDogs) => {
//   const juliaRealDogs = juliaDogs.slice(1, -2);
//   console.log('julia', juliaRealDogs);
//   const dogsArray = juliaRealDogs.concat(kateDogs);
//   console.log('dogsArray', dogsArray);
//   return dogsArray.map((dog, i) => {
//     const isAdult =
//       dog >= 3
//         ? `Dog number ${i + 1} is an adult, ${dog}years old`
//         : `Dog number ${i + 1} is still puppy`;
//     return isAdult;
//   });
// };
// console.log(calcDogsAge(juliaDogs, kateDogs));

// const calcDogtoAdultAge = dogAge => {
//   //calculate adult dog age
//   const averageAge = dogAge
//     .map(age => (age <= 2 ? age * 2 : age * 4 + 16))
//     .filter(age => age > 18)
//     .reduce((acc, age, i, arr) => (acc + age) / arr.length, 0);
//   console.log(adultAge);
//   //average dogs adult age
//   // const totalAge = adultAge.reduce((acc, age) => {
//   //   return acc + age;
//   // }, 0);
//   // console.log(totalAge);
//   // const averageAge = totalAge / adultAge.length;

//   return averageAge;
// };
// const data = [5, 2, 4, 1, 15, 8, 3];
// const data2 = [4, 3, 2, 13, 23, 3, 12];
// const averageAge1 = calcDogtoAdultAge(data);
// const averageAge2 = calcDogtoAdultAge(data2);
// console.log(calcDogtoAdultAge(averageAge1, averageAge2));

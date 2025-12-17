require('dotenv').config();
const mongoose = require('mongoose');
const Question = require('../models/Question');

const questions = [
  // EASY QUESTIONS (10)
  {
    difficulty: 'easy',
    title: 'Check if a number is even',
    description: 'Write pseudocode to check whether a given number is even or odd',
    answers: [
      ['START', 'READ n', 'IF n % 2 == 0 THEN', 'PRINT Even', 'ELSE', 'PRINT Odd', 'END'],
      ['START', 'INPUT n', 'IF n MOD 2 = 0 THEN', 'OUTPUT Even', 'ELSE', 'OUTPUT Odd', 'END']
    ]
  },
  {
    difficulty: 'easy',
    title: 'Find maximum of two numbers',
    description: 'Write pseudocode to find the maximum of two numbers',
    answers: [
      ['START', 'READ a, b', 'IF a > b THEN', 'PRINT a', 'ELSE', 'PRINT b', 'END'],
      ['START', 'INPUT a, b', 'SET max = a', 'IF b > max THEN', 'SET max = b', 'OUTPUT max', 'END']
    ]
  },
  {
    difficulty: 'easy',
    title: 'Sum of first N natural numbers',
    description: 'Write pseudocode to calculate the sum of first N natural numbers',
    answers: [
      ['START', 'READ n', 'SET sum = 0', 'FOR i FROM 1 TO n', 'SET sum = sum + i', 'PRINT sum', 'END'],
      ['START', 'INPUT n', 'SET sum = n * (n + 1) / 2', 'OUTPUT sum', 'END']
    ]
  },
  {
    difficulty: 'easy',
    title: 'Check if a number is positive',
    description: 'Write pseudocode to check if a number is positive, negative, or zero',
    answers: [
      ['START', 'READ n', 'IF n > 0 THEN', 'PRINT Positive', 'ELSE IF n < 0 THEN', 'PRINT Negative', 'ELSE', 'PRINT Zero', 'END'],
      ['START', 'INPUT n', 'IF n == 0 THEN', 'OUTPUT Zero', 'ELSE IF n > 0 THEN', 'OUTPUT Positive', 'ELSE', 'OUTPUT Negative', 'END']
    ]
  },
  {
    difficulty: 'easy',
    title: 'Calculate area of rectangle',
    description: 'Write pseudocode to calculate the area of a rectangle',
    answers: [
      ['START', 'READ length, width', 'SET area = length * width', 'PRINT area', 'END'],
      ['START', 'INPUT l, w', 'SET area = l * w', 'OUTPUT area', 'END']
    ]
  },
  {
    difficulty: 'easy',
    title: 'Find minimum of two numbers',
    description: 'Write pseudocode to find the minimum of two numbers',
    answers: [
      ['START', 'READ a, b', 'IF a < b THEN', 'PRINT a', 'ELSE', 'PRINT b', 'END'],
      ['START', 'INPUT a, b', 'SET min = a', 'IF b < min THEN', 'SET min = b', 'OUTPUT min', 'END']
    ]
  },
  {
    difficulty: 'easy',
    title: 'Calculate simple interest',
    description: 'Write pseudocode to calculate simple interest',
    answers: [
      ['START', 'READ principal, rate, time', 'SET interest = principal * rate * time / 100', 'PRINT interest', 'END'],
      ['START', 'INPUT p, r, t', 'SET si = (p * r * t) / 100', 'OUTPUT si', 'END']
    ]
  },
  {
    difficulty: 'easy',
    title: 'Swap two numbers',
    description: 'Write pseudocode to swap two numbers using a temporary variable',
    answers: [
      ['START', 'READ a, b', 'SET temp = a', 'SET a = b', 'SET b = temp', 'PRINT a, b', 'END'],
      ['START', 'INPUT x, y', 'SET t = x', 'SET x = y', 'SET y = t', 'OUTPUT x, y', 'END']
    ]
  },
  {
    difficulty: 'easy',
    title: 'Calculate average of three numbers',
    description: 'Write pseudocode to calculate the average of three numbers',
    answers: [
      ['START', 'READ a, b, c', 'SET sum = a + b + c', 'SET average = sum / 3', 'PRINT average', 'END'],
      ['START', 'INPUT x, y, z', 'SET avg = (x + y + z) / 3', 'OUTPUT avg', 'END']
    ]
  },
  {
    difficulty: 'easy',
    title: 'Convert Celsius to Fahrenheit',
    description: 'Write pseudocode to convert temperature from Celsius to Fahrenheit',
    answers: [
      ['START', 'READ celsius', 'SET fahrenheit = (celsius * 9/5) + 32', 'PRINT fahrenheit', 'END'],
      ['START', 'INPUT c', 'SET f = c * 1.8 + 32', 'OUTPUT f', 'END']
    ]
  },

  // MEDIUM QUESTIONS (10)
  {
    difficulty: 'medium',
    title: 'Check if a number is prime',
    description: 'Write pseudocode to check whether a number is prime',
    answers: [
      ['START', 'READ n', 'IF n <= 1 THEN', 'PRINT Not Prime', 'STOP', 'FOR i FROM 2 TO n-1', 'IF n % i == 0 THEN', 'PRINT Not Prime', 'STOP', 'PRINT Prime', 'END'],
      ['START', 'INPUT n', 'SET isPrime = true', 'IF n <= 1 THEN', 'SET isPrime = false', 'FOR i FROM 2 TO sqrt(n)', 'IF n MOD i == 0 THEN', 'SET isPrime = false', 'IF isPrime == true THEN', 'OUTPUT Prime', 'ELSE', 'OUTPUT Not Prime', 'END']
    ]
  },
  {
    difficulty: 'medium',
    title: 'Find factorial of a number',
    description: 'Write pseudocode to find the factorial of a number using iteration',
    answers: [
      ['START', 'READ n', 'SET factorial = 1', 'FOR i FROM 1 TO n', 'SET factorial = factorial * i', 'PRINT factorial', 'END'],
      ['START', 'INPUT n', 'SET result = 1', 'SET counter = n', 'WHILE counter > 0', 'SET result = result * counter', 'SET counter = counter - 1', 'OUTPUT result', 'END']
    ]
  },
  {
    difficulty: 'medium',
    title: 'Reverse a number',
    description: 'Write pseudocode to reverse the digits of a number',
    answers: [
      ['START', 'READ n', 'SET reversed = 0', 'WHILE n > 0', 'SET digit = n % 10', 'SET reversed = reversed * 10 + digit', 'SET n = n / 10', 'PRINT reversed', 'END'],
      ['START', 'INPUT n', 'SET result = 0', 'WHILE n != 0', 'SET remainder = n MOD 10', 'SET result = result * 10 + remainder', 'SET n = n DIV 10', 'OUTPUT result', 'END']
    ]
  },
  {
    difficulty: 'medium',
    title: 'Check palindrome number',
    description: 'Write pseudocode to check if a number is a palindrome',
    answers: [
      ['START', 'READ n', 'SET original = n', 'SET reversed = 0', 'WHILE n > 0', 'SET digit = n % 10', 'SET reversed = reversed * 10 + digit', 'SET n = n / 10', 'IF original == reversed THEN', 'PRINT Palindrome', 'ELSE', 'PRINT Not Palindrome', 'END'],
      ['START', 'INPUT num', 'SET temp = num', 'SET rev = 0', 'WHILE temp != 0', 'SET rem = temp MOD 10', 'SET rev = rev * 10 + rem', 'SET temp = temp DIV 10', 'IF num == rev THEN', 'OUTPUT Yes', 'ELSE', 'OUTPUT No', 'END']
    ]
  },
  {
    difficulty: 'medium',
    title: 'Find sum of digits',
    description: 'Write pseudocode to find the sum of digits of a number',
    answers: [
      ['START', 'READ n', 'SET sum = 0', 'WHILE n > 0', 'SET digit = n % 10', 'SET sum = sum + digit', 'SET n = n / 10', 'PRINT sum', 'END'],
      ['START', 'INPUT num', 'SET total = 0', 'WHILE num != 0', 'SET total = total + (num MOD 10)', 'SET num = num DIV 10', 'OUTPUT total', 'END']
    ]
  },
  {
    difficulty: 'medium',
    title: 'Count digits in a number',
    description: 'Write pseudocode to count the number of digits in a number',
    answers: [
      ['START', 'READ n', 'SET count = 0', 'WHILE n > 0', 'SET count = count + 1', 'SET n = n / 10', 'PRINT count', 'END'],
      ['START', 'INPUT num', 'SET digits = 0', 'WHILE num != 0', 'SET digits = digits + 1', 'SET num = num DIV 10', 'OUTPUT digits', 'END']
    ]
  },
  {
    difficulty: 'medium',
    title: 'Fibonacci series up to N terms',
    description: 'Write pseudocode to print the Fibonacci series up to N terms',
    answers: [
      ['START', 'READ n', 'SET a = 0', 'SET b = 1', 'PRINT a, b', 'FOR i FROM 3 TO n', 'SET c = a + b', 'PRINT c', 'SET a = b', 'SET b = c', 'END'],
      ['START', 'INPUT n', 'SET first = 0', 'SET second = 1', 'OUTPUT first, second', 'FOR i FROM 1 TO n-2', 'SET next = first + second', 'OUTPUT next', 'SET first = second', 'SET second = next', 'END']
    ]
  },
  {
    difficulty: 'medium',
    title: 'Find power of a number',
    description: 'Write pseudocode to calculate base raised to power exponent',
    answers: [
      ['START', 'READ base, exponent', 'SET result = 1', 'FOR i FROM 1 TO exponent', 'SET result = result * base', 'PRINT result', 'END'],
      ['START', 'INPUT b, e', 'SET power = 1', 'WHILE e > 0', 'SET power = power * b', 'SET e = e - 1', 'OUTPUT power', 'END']
    ]
  },
  {
    difficulty: 'medium',
    title: 'Check Armstrong number',
    description: 'Write pseudocode to check if a 3-digit number is an Armstrong number',
    answers: [
      ['START', 'READ n', 'SET original = n', 'SET sum = 0', 'WHILE n > 0', 'SET digit = n % 10', 'SET sum = sum + (digit * digit * digit)', 'SET n = n / 10', 'IF original == sum THEN', 'PRINT Armstrong', 'ELSE', 'PRINT Not Armstrong', 'END'],
      ['START', 'INPUT num', 'SET temp = num', 'SET total = 0', 'WHILE temp != 0', 'SET d = temp MOD 10', 'SET total = total + d * d * d', 'SET temp = temp DIV 10', 'IF num == total THEN', 'OUTPUT Yes', 'ELSE', 'OUTPUT No', 'END']
    ]
  },
  {
    difficulty: 'medium',
    title: 'Find LCM of two numbers',
    description: 'Write pseudocode to find the least common multiple of two numbers',
    answers: [
      ['START', 'READ a, b', 'SET max = a', 'IF b > a THEN', 'SET max = b', 'SET lcm = max', 'WHILE true', 'IF lcm % a == 0 AND lcm % b == 0 THEN', 'PRINT lcm', 'STOP', 'SET lcm = lcm + max', 'END'],
      ['START', 'INPUT num1, num2', 'SET larger = num1', 'IF num2 > num1 THEN', 'SET larger = num2', 'SET multiple = larger', 'WHILE multiple % num1 != 0 OR multiple % num2 != 0', 'SET multiple = multiple + larger', 'OUTPUT multiple', 'END']
    ]
  },

  // HARD QUESTIONS (10)
  {
    difficulty: 'hard',
    title: 'Binary search algorithm',
    description: 'Write pseudocode for binary search on a sorted array',
    answers: [
      ['START', 'READ array, target', 'SET left = 0', 'SET right = length(array) - 1', 'WHILE left <= right', 'SET mid = (left + right) / 2', 'IF array[mid] == target THEN', 'PRINT mid', 'STOP', 'IF array[mid] < target THEN', 'SET left = mid + 1', 'ELSE', 'SET right = mid - 1', 'PRINT Not Found', 'END'],
      ['START', 'INPUT arr, key', 'SET low = 0', 'SET high = size(arr) - 1', 'WHILE low <= high', 'SET middle = low + (high - low) / 2', 'IF arr[middle] == key THEN', 'RETURN middle', 'IF arr[middle] > key THEN', 'SET high = middle - 1', 'ELSE', 'SET low = middle + 1', 'RETURN -1', 'END']
    ]
  },
  {
    difficulty: 'hard',
    title: 'Bubble sort algorithm',
    description: 'Write pseudocode to implement bubble sort',
    answers: [
      ['START', 'READ array', 'SET n = length(array)', 'FOR i FROM 0 TO n-1', 'FOR j FROM 0 TO n-i-1', 'IF array[j] > array[j+1] THEN', 'SWAP array[j] and array[j+1]', 'PRINT array', 'END'],
      ['START', 'INPUT arr', 'SET size = length(arr)', 'FOR i FROM 0 TO size-2', 'SET swapped = false', 'FOR j FROM 0 TO size-i-2', 'IF arr[j] > arr[j+1] THEN', 'SWAP arr[j], arr[j+1]', 'SET swapped = true', 'IF swapped == false THEN', 'BREAK', 'OUTPUT arr', 'END']
    ]
  },
  {
    difficulty: 'hard',
    title: 'Find GCD using Euclidean algorithm',
    description: 'Write pseudocode to find the greatest common divisor of two numbers',
    answers: [
      ['START', 'READ a, b', 'WHILE b != 0', 'SET temp = b', 'SET b = a % b', 'SET a = temp', 'PRINT a', 'END'],
      ['START', 'INPUT num1, num2', 'WHILE num2 != 0', 'SET remainder = num1 MOD num2', 'SET num1 = num2', 'SET num2 = remainder', 'OUTPUT num1', 'END']
    ]
  },
  {
    difficulty: 'hard',
    title: 'Selection sort algorithm',
    description: 'Write pseudocode to implement selection sort',
    answers: [
      ['START', 'READ array', 'SET n = length(array)', 'FOR i FROM 0 TO n-2', 'SET minIndex = i', 'FOR j FROM i+1 TO n-1', 'IF array[j] < array[minIndex] THEN', 'SET minIndex = j', 'SWAP array[i] and array[minIndex]', 'PRINT array', 'END'],
      ['START', 'INPUT arr', 'SET size = length(arr)', 'FOR i FROM 0 TO size-2', 'SET min = i', 'FOR j FROM i+1 TO size-1', 'IF arr[j] < arr[min] THEN', 'SET min = j', 'IF min != i THEN', 'SWAP arr[i], arr[min]', 'OUTPUT arr', 'END']
    ]
  },
  {
    difficulty: 'hard',
    title: 'Insertion sort algorithm',
    description: 'Write pseudocode to implement insertion sort',
    answers: [
      ['START', 'READ array', 'SET n = length(array)', 'FOR i FROM 1 TO n-1', 'SET key = array[i]', 'SET j = i - 1', 'WHILE j >= 0 AND array[j] > key', 'SET array[j+1] = array[j]', 'SET j = j - 1', 'SET array[j+1] = key', 'PRINT array', 'END'],
      ['START', 'INPUT arr', 'FOR i FROM 1 TO length(arr)-1', 'SET current = arr[i]', 'SET pos = i - 1', 'WHILE pos >= 0 AND arr[pos] > current', 'SET arr[pos+1] = arr[pos]', 'SET pos = pos - 1', 'SET arr[pos+1] = current', 'OUTPUT arr', 'END']
    ]
  },
  {
    difficulty: 'hard',
    title: 'Linear search in array',
    description: 'Write pseudocode to search for an element in an array using linear search',
    answers: [
      ['START', 'READ array, target', 'SET n = length(array)', 'FOR i FROM 0 TO n-1', 'IF array[i] == target THEN', 'PRINT i', 'STOP', 'PRINT Not Found', 'END'],
      ['START', 'INPUT arr, key', 'FOR index FROM 0 TO size(arr)-1', 'IF arr[index] = key THEN', 'OUTPUT index', 'STOP', 'OUTPUT -1', 'END']
    ]
  },
  {
    difficulty: 'hard',
    title: 'Find largest element in array',
    description: 'Write pseudocode to find the largest element in an array',
    answers: [
      ['START', 'READ array', 'SET max = array[0]', 'FOR i FROM 1 TO length(array)-1', 'IF array[i] > max THEN', 'SET max = array[i]', 'PRINT max', 'END'],
      ['START', 'INPUT arr', 'SET largest = arr[0]', 'FOR i FROM 1 TO size(arr)-1', 'IF arr[i] > largest THEN', 'SET largest = arr[i]', 'OUTPUT largest', 'END']
    ]
  },
  {
    difficulty: 'hard',
    title: 'Merge two sorted arrays',
    description: 'Write pseudocode to merge two sorted arrays into one sorted array',
    answers: [
      ['START', 'READ arr1, arr2', 'SET i = 0', 'SET j = 0', 'SET k = 0', 'WHILE i < length(arr1) AND j < length(arr2)', 'IF arr1[i] < arr2[j] THEN', 'SET result[k] = arr1[i]', 'SET i = i + 1', 'ELSE', 'SET result[k] = arr2[j]', 'SET j = j + 1', 'SET k = k + 1', 'WHILE i < length(arr1)', 'SET result[k] = arr1[i]', 'SET i = i + 1', 'SET k = k + 1', 'WHILE j < length(arr2)', 'SET result[k] = arr2[j]', 'SET j = j + 1', 'SET k = k + 1', 'PRINT result', 'END'],
      ['START', 'INPUT a1, a2', 'SET p1 = 0', 'SET p2 = 0', 'SET index = 0', 'WHILE p1 < size(a1) AND p2 < size(a2)', 'IF a1[p1] <= a2[p2] THEN', 'SET merged[index] = a1[p1]', 'SET p1 = p1 + 1', 'ELSE', 'SET merged[index] = a2[p2]', 'SET p2 = p2 + 1', 'SET index = index + 1', 'WHILE p1 < size(a1)', 'SET merged[index] = a1[p1]', 'SET p1 = p1 + 1', 'SET index = index + 1', 'WHILE p2 < size(a2)', 'SET merged[index] = a2[p2]', 'SET p2 = p2 + 1', 'SET index = index + 1', 'OUTPUT merged', 'END']
    ]
  },
  {
    difficulty: 'hard',
    title: 'Check if array is sorted',
    description: 'Write pseudocode to check if an array is sorted in ascending order',
    answers: [
      ['START', 'READ array', 'SET n = length(array)', 'FOR i FROM 0 TO n-2', 'IF array[i] > array[i+1] THEN', 'PRINT Not Sorted', 'STOP', 'PRINT Sorted', 'END'],
      ['START', 'INPUT arr', 'SET sorted = true', 'FOR i FROM 0 TO size(arr)-2', 'IF arr[i] > arr[i+1] THEN', 'SET sorted = false', 'BREAK', 'IF sorted == true THEN', 'OUTPUT Yes', 'ELSE', 'OUTPUT No', 'END']
    ]
  },
  {
    difficulty: 'hard',
    title: 'Find second largest in array',
    description: 'Write pseudocode to find the second largest element in an array',
    answers: [
      ['START', 'READ array', 'SET first = array[0]', 'SET second = array[0]', 'FOR i FROM 1 TO length(array)-1', 'IF array[i] > first THEN', 'SET second = first', 'SET first = array[i]', 'ELSE IF array[i] > second AND array[i] != first THEN', 'SET second = array[i]', 'PRINT second', 'END'],
      ['START', 'INPUT arr', 'SET max = arr[0]', 'SET secondMax = arr[0]', 'FOR i FROM 1 TO size(arr)-1', 'IF arr[i] > max THEN', 'SET secondMax = max', 'SET max = arr[i]', 'ELSE IF arr[i] > secondMax AND arr[i] < max THEN', 'SET secondMax = arr[i]', 'OUTPUT secondMax', 'END']
    ]
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('MongoDB connected...');
    
    // Clear existing questions
    await Question.deleteMany({});
    console.log('Cleared existing questions');
    
    // Insert new questions
    const inserted = await Question.insertMany(questions);
    console.log(`Successfully seeded ${inserted.length} questions`);
    
    // Display summary
    const easy = inserted.filter(q => q.difficulty === 'easy').length;
    const medium = inserted.filter(q => q.difficulty === 'medium').length;
    const hard = inserted.filter(q => q.difficulty === 'hard').length;
    
    console.log(`\nBreakdown:`);
    console.log(`  Easy: ${easy}`);
    console.log(`  Medium: ${medium}`);
    console.log(`  Hard: ${hard}`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();

# Pseudocode Checker - Full-Stack Web Application

A production-quality web application that evaluates user-submitted pseudocode against predefined correct solutions with precise, line-level feedback.

The system supports difficulty-based questions, multiple valid answers, and clear visual feedback to help users understand logical mistakes in their pseudocode.

## Features

- **Difficulty-Based Questions**: Easy, Medium, and Hard levels
- **Multiple Valid Answers**: Each question supports multiple correct pseudocode variations
- **Line-by-Line Comparison**: Order-aware, normalized comparison logic
- **Precise Error Feedback**: Identifies incorrect lines, missing steps, and logical mismatches
- **Visual Error Highlighting**: Clear UI feedback for incorrect submissions
- **Case-Insensitive Matching**: Ignores letter casing and extra whitespace

## Technology Stack

### Backend

- Node.js
- Express.js
- PostgreSQL
- Prisma ORM

### Frontend

- React.js (functional components)
- Bootstrap 5
- Axios

## Project Structure

````
pseudoGuide/
├── backend/
│   ├── config/
│   │   └── db.js                     # Prisma client setup
│   ├── controllers/
│   │   └── pseudocodeController.js   # Request handling logic
│   ├── prisma/
│   │   └── schema.prisma             # Prisma schema (PostgreSQL)
│   ├── routes/
│   │   └── pseudocodeRoutes.js       # API routes
│   ├── services/
│   │   └── pseudocodeMatcher.js      # Core comparison logic
│   ├── utils/
│   │   ├── normalizeLine.js          # Line normalization helpers
│   │   └── seedDB.js                 # Database seeding
│   ├── app.js                        # Express app configuration
│   ├── server.js                     # Server entry point
│   ├── testPrisma.js                 # Prisma connection testing
│   ├── envTest.js                    # Environment testing
│   ├── .env.example
│   ├── .gitignore
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── CodeEditor.js
│   │   │   ├── DifficultySelector.js
│   │   │   ├── LandingPage.js
│   │   │   ├── QuestionList.js
│   │   │   └── ResultViewer.js
│   │   ├── services/
│   │   │   └── api.js                # Axios API calls
│   │   ├── App.js
│   │   ├── index.js
│   │   ├── index.css
│   │   └── landingPage.css
│   ├── .gitignore
│   ├── package.json
│   └── package-lock.json
│
└── README.md
````

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL v14 or higher
- npm

## Installation & Setup

### 1. Clone the Repository

git clone git@github.com:nandanap24/pseudoGuide.git

cd pseudoGuide


### 2. Backend Setup


#### Navigate to backend directory
cd backend

#### Install dependencies
npm install

#### Configure Environment Variables

Create a .env file using .env.example:
```
PORT=5000
DATABASE_URL=postgresql://username:password@localhost:5432/pseudocode_checker
NODE_ENV=development
```
#### Prisma Setup & Database Seeding
##### Run database migrations
npx prisma migrate dev

#### Seed the database with sample questions
node run seed

#### Start Backend Server
npm start


#### For development with auto-restart:

npm run dev

```
The backend will run on:
http://localhost:5000
```

### 3. Frontend Setup

Open a new terminal:

#### Navigate to frontend directory
cd frontend

#### Install dependencies
npm install

#### Start the React development server
npm start

```
The frontend will run on:
http://localhost:3000
```
### Environment Variables

Backend (backend/.env)
```
PORT=5000
DATABASE_URL=postgresql://username:password@localhost:5432/pseudocode_checker
NODE_ENV=development
```
Frontend (frontend/.env)
```
REACT_APP_API_URL=http://localhost:5000/api
```

## API Endpoints

### Get Questions by Difficulty

```
GET /api/questions?difficulty=easy
```

**Response:**

```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "_id": "...",
      "difficulty": "easy",
      "title": "Check if a number is even",
      "description": "Write pseudocode to check whether a given number is even or odd"
    }
  ]
}
```

### Check Pseudocode Submission

```
POST /api/check-pseudocode
```

**Request Body:**

```json
{
  "questionId": 1,
  "userCode": "START\nREAD n\nIF n % 2 == 0 THEN\nPRINT Even\nELSE\nPRINT Odd\nEND"
}
```

**Response:**

```json
{
  "success": true,
  "status": "correct | partial | incorrect",
  "errors": [
    {
      "lineNumber": 3,
      "expected": ["FOR i FROM 2 TO n-1"],
      "received": "FOR i FROM 1 TO n",
      "reason": "Incorrect loop bounds"
    }
  ]
}
```

## Database Schema

### Question Model

```javascript
{
  difficulty: "easy | medium | hard",
  title: "Question title",
  description: "Question description",
  answers: [
    [
      "START",
      "READ n",
      "IF n % 2 == 0 THEN",
      "PRINT Even",
      "ELSE",
      "PRINT Odd",
      "END"
    ],
    // Additional valid answers...
  ],
  createdAt: Date,
}
```
```Prisma
model Question {
  id          Int      @id @default(autoincrement())
  difficulty  String
  title       String
  description String
  answers     Json
  createdAt   DateTime @default(now())
}
```
## Sample Questions

The application comes pre-seeded with 9 questions:

**Easy (3 questions):**

- Check if a number is even
- Find maximum of two numbers
- Sum of first N natural numbers

**Medium (3 questions):**

- Check if a number is prime
- Find factorial of a number
- Reverse a number

**Hard (3 questions):**

- Binary search algorithm
- Bubble sort algorithm
- Find GCD using Euclidean algorithm

## Comparison Logic

The pseudocode matcher performs:

1. **Normalization**: Converts to lowercase, removes extra whitespace
2. **Line-by-Line Comparison**: Order-aware matching
3. **Error Detection**: Identifies specific issues:
   - Incorrect loop bounds
   - Missing or incorrect conditions
   - Wrong variable assignments
   - Incorrect termination statements
   - Order issues
4. **Multiple Answer Support**: Tries matching against all valid answers
5. **Status Determination**: Returns `correct`, `partial`, or `incorrect`

## Usage Guide

1. **Select Difficulty**: Choose Easy, Medium, or Hard
2. **Pick a Question**: Click on any question from the list
3. **Write Pseudocode**: Enter your pseudocode in the editor
4. **Submit**: Click submit to check your answer
5. **Review Feedback**: See detailed line-by-line error explanations

## Testing

To test the application:

1. Ensure PostgreSQL is running
2. Run Prisma migration
3. Run `npm run seed` in the backend directory
4. Start both backend and frontend servers
5. Navigate to `http://localhost:3000`
6. Select a difficulty and question
7. Submit correct/incorrect pseudocode to test validation

## Future Enhancements

- AI-powered answer generation and feedback
- User authentication and progress tracking
- More question categories
- Code execution and visualization
- Leaderboard and scoring system

## Architecture Highlights

- **MVC + Service Pattern**: Clean separation of concerns
- **Modular Design**: Reusable components and utilities
- **Error Handling**: Comprehensive error messages
- **Validation**: Input validation at both frontend and backend
- **RESTful API**: Standard REST conventions
- **Responsive UI**: Bootstrap-based responsive design

## Troubleshooting

### PostgreSQL Connection Error

- Ensure PostgreSQL service is running
- Verify DATABASE_URL in backend/.env
- Confirm database name and credentials

### Port Already in Use

- Backend: Change `PORT` in `backend/.env`
- Frontend: Modify port in `package.json` start script

### API Connection Error

- Ensure backend is running on port 5000
- Check `REACT_APP_API_URL` in `frontend/.env`
- Verify CORS is enabled in backend

## License

MIT

## Contributors

Built following production-quality standards with MVC architecture, comprehensive error handling, and clean code principles.
````

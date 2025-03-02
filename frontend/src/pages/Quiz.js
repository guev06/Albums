import { useState } from "react";

function Quiz() {
  const questions = [
    {
      question: "Pick the color you like more",
      options: [
        {
          img: "https://img.freepik.com/premium-photo/pink-colored-square-sheet-paper_696657-29419.jpg?w=1060",
          alt: "Pink",
        },
        {
          img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Pure_black.svg/1200px-Pure_black.svg.png",
          alt: "Black",
        },
      ],
      answer: "Black",
    },
    {
      question: "Pick the album cover that appeals to you more",
      options: [
        {
          img: "https://upload.wikimedia.org/wikipedia/en/7/74/Taylor_Swift_-_Folklore.png",
          alt: "Soft - Folklore (Taylor Swift)",
        },
        {
          img: "https://upload.wikimedia.org/wikipedia/en/3/3b/Slipknot_-_Iowa.png",
          alt: "Harsh - Iowa (Slipknot)",
        },
      ],
      answer: "Harsh - Iowa (Slipknot)",
    },
    {
      question: "Which instrument would you rather play?",
      options: [
        {
          img: "https://upload.wikimedia.org/wikipedia/commons/6/6d/Acoustic_Guitar.jpg",
          alt: "Soft - Acoustic Guitar",
        },
        {
          img: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Electric_guitar_red.png",
          alt: "Harsh - Electric Guitar",
        },
      ],
      answer: "Harsh - Electric Guitar",
    },
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  const handleAnswer = (selectedAlt) => {
    setSelectedAnswer(selectedAlt);

    if (selectedAlt === questions[currentQuestionIndex].answer) {
      setCorrectAnswers((prev) => prev + 1);
    }

    setTimeout(() => {
      setSelectedAnswer(null);
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
      } else {
        alert(`Quiz complete! You got ${correctAnswers + 1} out of ${questions.length}`);
      }
    }, 1000);
  };

  const currentQuestion = questions[currentQuestionIndex];
  const points =0
  return (
    <div>
      <h1>Quiz App</h1>
      <div>
        <h2>{currentQuestion.question}</h2>
        <div>
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option.alt)}
              disabled={selectedAnswer !== null}
            >
              <img src={option.img} alt={option.alt} width="100" />
            </button>
          ))}
        </div>
        {selectedAnswer && (
          <div>if{selectedAnswer === currentQuestion.answer}{points=points+1}</div>
        )}
      </div>
    </div>
  );
}

export default Quiz;

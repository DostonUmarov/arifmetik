import React, { useState, useEffect } from "react";

const getRandomQuestion = () => {
  const a = Math.floor(Math.random() * 10) + 1;
  const b = Math.floor(Math.random() * 10) + 1;
  const ops = ["+", "-", "*", "/"];
  const op = ops[Math.floor(Math.random() * ops.length)];

  let question = `${a} ${op} ${b}`;
  let answer = eval(question);

  if (op === "/") answer = Math.floor(answer); // butun songa

  return { question, answer };
};

const SpeedGame = () => {
  const [timeLeft, setTimeLeft] = useState(60);
  const [score, setScore] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(getRandomQuestion());

  useEffect(() => {
    if (timeLeft === 0) return;
    const timer = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (parseInt(userAnswer) === currentQuestion.answer) {
      setScore((s) => s + 1);
    } else {
      setScore((s) => s - 1);
    }
    setUserAnswer("");
    setCurrentQuestion(getRandomQuestion());
  };

  if (timeLeft === 0) {
    return (
      <div>
        <h2>⏱️ O'yin tugadi!</h2>
        <p>Natijangiz: {score}</p>
      </div>
    );
  }

  return (
    <div>
      <h2>⏱️ Qolgan vaqt: {timeLeft} soniya</h2>
      <h3>❓ {currentQuestion.question}</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          autoFocus
        />
        <button type="submit">Yuborish</button>
      </form>
      <p>⭐ Ball: {score}</p>
    </div>
  );
};

export default SpeedGame;

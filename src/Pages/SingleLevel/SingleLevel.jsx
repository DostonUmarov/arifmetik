import x from "../../assets/x.svg"
import AnswerCircle from "../../Components/AnswerCircle"
import { useState } from "react"
import CSS from "../SingleLevel/SingleLevel.css"
import { useNavigate, useParams } from "react-router-dom"
import { useLayoutEffect } from "react"
import { useAuth } from "../../Components/context"

function SingleLevel() {
  const [activeButton, setActiveButton] = useState()
  const {operation} = useParams()
  const [sign, setSign] = useState()
  const [randomNumber, setRandomNumber] = useState(()=> Math.ceil(Math.random() * 20).toFixed(0))
  const [randomNumber2, setRandomNumber2] = useState(()=> Math.ceil(Math.random() * 10).toFixed(0))
  const [randomIndex, setRandomIndex] = useState(()=> Math.floor(Math.random() * 4))
  let correctAnswer
  setCorrectAnswer(sign)
  const [currentQuestion, setCurrentQuestion] = useState(1)
  const [score, setScore] = useState(0)
  const answers = [correctAnswer + 3, correctAnswer * 2, correctAnswer + 5, correctAnswer - 1]
  answers[randomIndex] = correctAnswer
  const {globalScore, setGlobalScore} = useAuth()

  const navigate = useNavigate()
  function setCorrectAnswer(sign){
    if (sign == "+") {
       correctAnswer = randomNumber + randomNumber2
    }else if(sign == "-"){
       correctAnswer = randomNumber - randomNumber2
    }else if(sign == "/"){
       correctAnswer = randomNumber / randomNumber2
    }else if(sign == "X"){
       correctAnswer = randomNumber * randomNumber2
    }
  }


  const answerButtons = answers.map((answer, index)=>{
    return <AnswerCircle 
    answer={answer}
    key={index}
    index={index}
    activeButton={activeButton}
    setActiveButton={setActiveButton}
    />
  })

  useLayoutEffect(()=>{
    if(operation == "addition"){
        document.body.classList = []
        document.body.classList.add("red")
        setSign("+")
    }else if(operation == "subtraction"){
        document.body.classList = []
        document.body.classList.add("blue")
        setSign("-")
    }else if(operation == "division"){
        document.body.classList = []
        document.body.classList.add("green")
        setSign("/")
    }else{
        document.body.classList = []
        document.body.classList.add("purple")
        setSign("X")
    }
  })

  function leaveGameConfirmation(){
    const leaveGame = confirm("are you sure you want to leave the game?")
    leaveGame ? navigate ("/category") : ""
  }


  return (
    <main className="gameplay-main">
      <div className="x-container">
        <img 
        src={x} 
        onClick={()=> leaveGameConfirmation()}
        alt="exit game" 
        className="cancel"/>
      </div>
        

        <p className="progress">
          Question {currentQuestion} of 5
        </p>

        <p className="question">
            {randomNumber + sign + randomNumber2}=?
        </p>

        <div className="answers">
            {answerButtons}
        </div>

        <button 
        onClick={()=>{
            if (currentQuestion == 5) {
              setGlobalScore(score)
                navigate("/score")
            }else{
              if (activeButton == correctAnswer) {
                setScore((prev)=> prev + 20)
             }
             setRandomNumber( Math.ceil(Math.random() * 10))
             setRandomNumber2( Math.ceil(Math.random() * 10))
             setActiveButton(null)
             setCurrentQuestion((prev)=> prev + 1)    
             setRandomIndex(Math.floor(Math.random() * 4)) 
            }          
            
        }}
        className={activeButton != null | activeButton != undefined? "" : "disabled"}
        >Next Question</button>
    </main>
  )
}

export default SingleLevel
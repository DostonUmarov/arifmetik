import x from "../../assets/x.svg"
import AnswerCircle from "../../Components/AnswerCircle"
import { useState } from "react"
import CSS from "../SingleLevel/SingleLevel.css"
import { useNavigate } from "react-router-dom"
import { useLayoutEffect } from "react"
import { useAuth } from "../../Components/context"
import { useRef } from "react"

function Addition() {
  const [activeButton, setActiveButton] = useState()
  const [sign, setSign] = useState()
  const [randomNumber, setRandomNumber] = useState(()=> Math.ceil(Math.random() * 20))
  const [randomNumber2, setRandomNumber2] = useState(()=> Math.ceil(Math.random() * 10))
  const [randomIndex, setRandomIndex] = useState(()=> Math.floor(Math.random() * 4))
  const correctAnswer = randomNumber + randomNumber2
  const [currentQuestion, setCurrentQuestion] = useState(1)
  const [score, setScore] = useState(0)
  const answers = removeDuplicateNumbers([correctAnswer + 3, correctAnswer * 2, correctAnswer + 5, correctAnswer - 1], 4)
  answers[randomIndex] = correctAnswer
  const {setGlobalScore, setCompletedLevelName, setGlobalHighScore} = useAuth()
  const floatingScoreRef = useRef()
  const navigate = useNavigate()

  useLayoutEffect(()=>{
    document.body.classList = []
    document.body.classList.add("red")
    setSign("+")
    setCompletedLevelName("addition")
  }, [])

  function showFloatingNumber(ref, numberToDisplay){
      ref.current.textContent = numberToDisplay
      ref.current.classList.add("visible")
      setTimeout(() => {
      ref.current.classList.remove("visible")   
      }, 1000)
  }
  function removeDuplicateNumbers(array, arrayLength){
    let newArr = [...new Set(array)]
    if (arrayLength !== newArr.length) {
      newArr.push(65)
      }
          return newArr
  }
  function leaveGameConfirmation(){
      const leaveGame = confirm("are you sure you want to leave the game?")
      leaveGame ? navigate ("/category") : ""
  }
  function handleButtonClick(){
          if (currentQuestion == 5) {
          if (activeButton == correctAnswer){
              setGlobalScore(score + 20)
              highScoreSetter(score + 20, "addition")
          }else{
              setGlobalScore(score)
              highScoreSetter(score, "addition")
          }       
            
            navigate("/score") 
        }else{
          if (activeButton == correctAnswer) {
            setScore((prev)=> prev + 20)
            showFloatingNumber(floatingScoreRef, "+20")
        }
        else if (activeButton !== correctAnswer) {
        navigator.vibrate(250)
        showFloatingNumber(floatingScoreRef, "+0")
        }
        setRandomNumber( Math.ceil(Math.random() * 20))
        setRandomNumber2( Math.ceil(Math.random() * 10))
        setActiveButton(null)
        setCurrentQuestion((prev)=> prev + 1)    
        setRandomIndex(Math.floor(Math.random() * 4)) 
        }    
          
        
  }
  function highScoreSetter(currentScore, category){
    let prevHs = localStorage.getItem(`math-game-hs-${category}`)

    if (prevHs == null) {
      setGlobalHighScore(currentScore)
      localStorage.setItem(`math-game-hs-${category}`, currentScore)
    }else{
      if (currentScore >= prevHs) {
        localStorage.setItem(`math-game-hs-${category}`, currentScore)
        setGlobalHighScore(currentScore)

      }else{
      }
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
        onClick={()=>handleButtonClick()}
        className={activeButton != null | activeButton != undefined? "" : "disabled"}>Next Question</button>

        <p 
        ref={floatingScoreRef}
        className="score-showcase">+20</p>
    </main>
  )
}

export default Addition
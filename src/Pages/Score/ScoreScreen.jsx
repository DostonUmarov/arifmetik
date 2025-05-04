import { useNavigate } from "react-router-dom"
import CSS from "../Score/ScoreScreen.css"
import { useAuth } from "../../Components/context"
import { useLayoutEffect } from "react"

function ScoreScreen() {
    const navigate = useNavigate()
    const {name, globalScore, completedLevelName, globalHighScore} = useAuth()

    function backToCategoriesPage(){
        navigate("/category")
    }

    function playAgain(){
        window.history.back()
    }

    useLayoutEffect(()=>{
        document.body.classList = []
        if (completedLevelName == "addition") {
            document.body.classList.add('red')
        }else if(completedLevelName == "subtraction"){
            document.body.classList.add("blue")
        }else if(completedLevelName == "division"){
            document.body.classList.add("green")
        }else if(completedLevelName == "multiplication"){
            document.body.classList.add("purple")
        }
    }, [])

  return (
    <main className="score-main">
        <p className="congrats">Tabriklaymiz</p>

        <p className="done">Barakalla {name}, Siz {completedLevelName} arifmetik amali bo'yicha sinovlarni yakunladingiz!🚀</p>

        <div className="scores">
            <div className="current-score">
                <p>Ballingiz</p>
                <p>{globalScore}</p>
            </div>

            <div className="high-score">
                <p>Maksimal ball</p>
                <p>{globalHighScore}</p>
            </div>
        </div>

        <div className="buttons">
            <button
            onClick={()=> playAgain()}
            >Yan boshlash</button>

            <button
            onClick={()=> backToCategoriesPage()}
            >Asosiy menyu</button>
        </div>
    </main>
  )
}

export default ScoreScreen

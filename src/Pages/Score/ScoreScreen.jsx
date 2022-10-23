import { useNavigate } from "react-router-dom"
import CSS from "../Score/ScoreScreen.css"
import { useAuth } from "../../Components/context"

function ScoreScreen() {
    const navigate = useNavigate()
    const {name, globalScore, completedLevelName, globalHighScore} = useAuth()

    function backToCategoriesPage(){
        navigate("/category")
    }

    function playAgain(){
        window.history.back()
    }

  return (
    <main className="score-main">
        <p className="congrats">Congratulations</p>

        <p className="done">Weldone {name}, you just finished the {completedLevelName} category!🚀</p>

        <div className="scores">
            <div className="current-score">
                <p>Score</p>
                <p>{globalScore}</p>
            </div>

            <div className="high-score">
                <p>Highscore</p>
                <p>{globalHighScore}</p>
            </div>
        </div>

        <div className="buttons">
            <button
            onClick={()=> playAgain()}
            >Play Again</button>

            <button
            onClick={()=> backToCategoriesPage()}
            >Main Menu</button>
        </div>
    </main>
  )
}

export default ScoreScreen
import CSS from "../Category/Category.css"
import Level from "../../Components/Level"
import { useAuth } from "../../Components/context"

function Category() {
    const levels = [
        {name: "addition", display: "2+2", color:"red", uzbname: "Qo'shish"},
         {name: "subtraction", display: "4-1", color:"blue", uzbname: "Ayirish"},
          {name: "division", display: "10/5", color:"green", uzbname: "Bo'lish"},
           {name: "multiplication", display: "2X2", color:"purple", uzbname: "Ko'paytirish"}
        ]
    
    const levelCircles = levels.map((level)=>{
        return <Level 
        levelName={level.uzbname} 
        levelDisplay={level.display}
        color={level.color}
        key={level.name}
        />
    })

    const {name, setNameFunction} = useAuth()


  return (
    <main className='categories-main'>
        <div className="top">
            <p>Salom {name} 👋<br />
             O'yinni davom ettirish uchun arifmetik amalni tanlang</p>
        </div>
        

        <div className="categories-body">
            <h1>Amallar turkumi</h1>

        <div className="categories-container">
            {levelCircles}
            
            </div>
            
        </div>
    </main>
  )
}

export default Category

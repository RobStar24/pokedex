import { useDispatch } from "react-redux"
import HomeFooter from "../components/home/HomeFooter"
import { setTrainerName } from "../store/slices/trainerName.slice"
import { useNavigate } from "react-router-dom"

const Home = () => {

  const dispatch = useDispatch()
 
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    const trainerName = e.target.trainerName.value
    dispatch(setTrainerName(trainerName))
    navigate("/pokedex")
  }
 
  return (
    <main className="grid grid-rows-[1fr_auto] min-h-screen">
        <section>
            <div>
                <img src="/images/logo.png" alt="" />
            </div>
            <h3>Hello Trainer!</h3>
            <p>In order to start, give me your name</p>

            <form onSubmit={handleSubmit}>
                <input required id="trainerName" type="text" />
                <button>Start!</button>
            </form>

        </section>
        
        {/* Seccion inferior */}
        <HomeFooter />
    </main>
  )
}
export default Home
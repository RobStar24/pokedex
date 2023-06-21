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
        <section className="flex flex-col items-center justify-center w-full">
            <div>
                <img src="/images/logo.png" alt="" />
            </div>
            <h3 className="text-red-600 font-bold text-4xl pt-10">Hello Trainer!</h3>
            <p className="font-semibold text-lg text-slate-700">In order to start, give me your name</p>

            <form className="pt-10" onSubmit={handleSubmit}>
                <input className="shadow-md border border-gray-100 h-10" required id="trainerName" type="text" />
                <button className="bg-red-500 w-[85px] text-white h-10">Start!</button>
            </form>

        </section>
        
        {/* Seccion inferior */}
        <HomeFooter />
    </main>
  )
}
export default Home
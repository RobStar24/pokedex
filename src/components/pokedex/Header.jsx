import { useDispatch } from "react-redux"
import { setTrainerName } from "../../store/slices/trainerName.slice"

const Header = () => {

  const dispatch = useDispatch()
  
  const handleClickLogout = () => {
    dispatch(setTrainerName(""))
  }

  return (
    <section className="relative">
      {/* Red Section */}
      <div className="bg-red-600 h-16 relative">
        <div className="absolute left-0 -bottom-2 w-[220px] xxs:w-[290px] sm:w-[400px]">
            <img src="/images/logo.png" alt="" />
        </div>
      </div>

      {/* Gray Section */}
      <div className="bg-gray-900 h-8"></div>

      {/* Pokeball button */}
      <div className="flex items-center justify-center absolute right-0 transform -translate-x-1/2 -translate-y-1/2 -bottom-14">
        <div className="w-[4.5rem] aspect-square bg-white border-[8px] border-gray-900 rounded-full">
          <div className="absolute w-11 aspect-square border-2 border-gray-700 rounded-full left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2">
            <button onClick={handleClickLogout} className="absolute z-2 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xl"><i className='bx bx-user'></i></button>
          </div>
        </div>
      </div>
    </section>
  )
}
export default Header
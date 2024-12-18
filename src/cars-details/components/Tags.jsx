import { FaTachometerAlt } from "react-icons/fa";
import { FaGears } from "react-icons/fa6";
import { FaGasPump } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
import { Calendar } from "lucide-react";

function Tags({listing}) {
    const tags='flex justify-center items-center gap-1 px-2 font-semibold bg-blue-100 text-blue-500 text-sm rounded-full cursor-pointer'

  return (
    <>
    <div className="flex gap-2 mb-4 w-full flex-wrap">
      <div className={tags}> <SlCalender />{listing.year}</div>
      <div className={tags}><FaTachometerAlt />{listing.mileage} miles</div>
      <div className={tags}><FaGears />{listing.transmission}</div>
      <div className={tags}><FaGasPump />{listing.fuelType}</div>
      <div className={tags}><Calendar className="scale-[0.8]"/>{listing.createdAt}</div>
    </div>
    </>
)
}

export default Tags
import Header from "@/components/Header"
import CarPrice from "./components/CarPrice"
import ContactOwner from "./components/ContactOwner"
import Features from "./components/Features"
import { db } from "@/lib/db"
import { listingsTable } from "@/lib/schema"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { eq } from "drizzle-orm"
import Cardetails from "./components/Carspecifications"
import Imgdescription from "./components/Img-description"

import Tags from "./components/Tags"
import Cardetailskeleton from "./components/Skeleton"
import MostSearched from "@/components/MostSearched"
import { useLocation } from "react-router-dom"
import DeleteListingButton from "./components/SuperDelete"
function Cardetail() {
  const [listingdetail, setlistingdetail] = useState();
  const { id } = useParams();
  const location = useLocation(); 
  const { listing } = location.state || {}; 

  useEffect(() => {
    async function getcardetails() {
      try {
        console.log("Fetching data from the database...");
        const result = await db
          .select()
          .from(listingsTable)
          .where(eq(listingsTable.id, id));
        setlistingdetail(result);
      } catch (error) {
        console.error("Error fetching car details:", error);
      }
    }

    if (listing) {
      ("Using state-provided listing:", listing);
      setlistingdetail([listing]);
    } else {
      console.log("No state provided, fetching from API...");
      getcardetails();
    }
  }, [id, listing]);
  
    return (
      <div>
        <Header />
        <div className="px-2 lg:px-10 py-4 googlehandfont">
          {listingdetail && listingdetail.length > 0 ? (
            <>
              <div className="text-4xl font-semibold py-2">{listingdetail[0].listingTitle}</div>
              <div className="mb-2 font-light">{listingdetail[0].tagline}</div>
              <Tags listing={listingdetail[0]}/>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-10 items-start">
                <div className="grid lg:col-span-2">
                  <Imgdescription listing={listingdetail[0]}/>
                  <Features features={listingdetail[0].features}/>
                  <DeleteListingButton listingId={listingdetail[0].id} userName={listingdetail[0]?.username}/>
                </div>
                <div className="grid gap-4">
                  <CarPrice Sprice={listingdetail[0].sellingPrice} Oprice={listingdetail[0].originalPrice} />
                  <Cardetails details={listingdetail[0]} />
                  <ContactOwner details={listingdetail[0]} />
                </div>
              </div>
            </>
          ) : (
            <Cardetailskeleton/>
          )}
        </div>
          
        <MostSearched head='other similar options' currentCardetails ={listingdetail?.[0]}/>
      </div>
    );

}

export default Cardetail




{/* <div>
<Header/>
<div className="p-10 googlehandfont">
  <div className="text-4xl font-semibold py-2">{listingdetail?.[0]?.listingTitle}</div>
  <div className="mb-2 font-light">{listingdetail?.[0]?.listingDescription}</div>
  <div className="flex gap-2 mb-4">
    <div className="px-2 font-semibold bg-blue-100 text-blue-500 text-sm rounded-full"> {listingdetail?.[0]?.year}</div>
    <div className="px-2 font-semibold bg-blue-100 text-blue-500 text-sm rounded-full">{listingdetail?.[0]?.mileage} miles</div>
    <div className="px-2 font-semibold bg-blue-100 text-blue-500 text-sm rounded-full">{listingdetail?.[0]?.transmission}</div>
    <div className="px-2 font-semibold bg-blue-100 text-blue-500 text-sm rounded-full">{listingdetail?.[0]?.fuelType}</div>
  </div>
  <div className="grid grid-cols-3 gap-10">
    <div className="grid col-span-2">
      <div>
        <img src={`https://picsum.photos/500/300?random=10`} className="w-full h-full object-cover" alt="car pic" />
      </div>
      <div className="p-3 border-2 my-4">
        <div className="text-xl mb-1 font-semibold">Description</div>
        <p className="text-sm">{listingdetail?.[0]?.description || "No description available"}</p>
      </div>
      <Features/>
    </div>
    <div >
      <CarPrice price={listingdetail?.[0]?.sellingPrice}/>
      <Cardetails details={listingdetail?.[0]}/>
      <ContactOwner/>
    </div>
  </div>
</div>
</div> */}
import { Link } from "react-router-dom";

function Notmatch(){
    return(
        <div className="container mx-auto flex items-center justify-center flex-col">
        <img className="sm:w-auto w-5/6 sm:mb-2.5 mb-2 object-cover object-center" src="http://api.elements.buildwithangga.com/storage/files/2/assets/Empty%20State/EmptyState4/Empty-4-1.png" alt="" />                    
        <div className="text-center  w-full">
          <h1 className="title-text text-3xl mb-5 font-semibold">
            Opss! Something Missing
          </h1>
          <p className="caption-text mb-16 tracking-wide leading-7">
            The page you’re looking for isn’t found. We<br className="sm:block hidden" /> suggest you Back to Homepage.
          </p>
          <div className="flex justify-center">
            <Link to="/">
            <button className="bg-green-600 inline-flex font-semibold text-white text-lg leading-7 py-4 px-6 rounded-xl focus:outline-none hover:bg-green-800">
              Back to Homepage
            </button>
            </Link>
          </div>
        </div>
      </div>
    )
}

export default Notmatch;
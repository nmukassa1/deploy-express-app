import { SignedOut, SignInButton } from "@clerk/clerk-react";
import {gsap} from 'gsap';
import { useEffect, useRef } from "react";

function Home() {

   const brand = useRef<HTMLHeadingElement>(null)
   useEffect(() => {
      gsap.set(brand.current, {
         // autoAlpha: 0,
         y: 100,
         opacity: 0,
      })

      const tl = gsap.timeline({defaults: {ease: 'power3.inOut'}})
      tl.to(brand.current, {
         y: 0,
         duration: .8,
         // autoAlpha: 1,
      })
      .to(brand.current, {
         opacity: 1,
         duration: 1,
      }, '-=.5')
      
   }, [])

    return ( 
        <div className='container mx-auto grid place-content-center h-full'>
         <div id="hero" className="text-center">
            <h1 ref={brand} className="text-8xl font-bold">Loom</h1>
            <SignedOut>
               <SignInButton forceRedirectUrl="http://localhost:5173/dashboard" />
            </SignedOut>
         </div>
        </div>
     );
}

export default Home;
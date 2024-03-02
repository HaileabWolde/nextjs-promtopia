"use client"

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import {signIn, signOut, useSession,
getProviders} from 'next-auth/react';
const Nav = () => {
  const isUserLogged = true;
  const [providers, setProviders] = useState(null)
  const [toogledown, setToggleDown] = useState(false)

  useEffect(()=>{
      const fetchProviders = async()=>{
        const response = await getProviders()
        setProviders(response) 
      }
      fetchProviders()
  }, [])
  return (
    <nav className="flex-between w-full">
        <Link href="/" className="flex-center">
          <Image
          src="/assets/images/logo.svg"
          alt="Promptopia Logo"
          width={30}
          height={30}
          className="object-contain"
          />
          <p className="logo_text">Promptopia</p>
        </Link>
     
       {/* Desktop Navigation*/}
       {isUserLogged ? 
       <div className="post">
           <Link href="/create-prompt" className="black_btn">
          Create Post
       </Link>
       <button
       type="button"
       className="outline_btn"
       onClick={signOut}
       >
        Sign Out
       </button>
       <Link
       href="/profile"
       >
          <Image
          src="/assets/images/logo.svg"
          width={37}
          height={37}
          alt="profile"
          className="rounded-full"
          onClick={()=> setToggle((prev)=> !prev)}
          />

       </Link>
       
       </div>      
       : 
       <>
       {
        providers && Object.values(providers).map(provider => (
          <button
          type="button"
          key={provider.name} 
          className="outline_btn"
          onClick={()=> signIn(provider.id)}
          >
           Sign In
          </button>
        ))
       }
       </>
       }
       {/*Mobile Navigation*/}
       <div className="post_mobile">
        {
          isUserLogged && 
          <div>
            <Image
              src="/assets/images/logo.svg"
              width={37}
              height={37}
              alt="profile"
              className="rounded-full"
              onClick={()=> setToggleDown((prev)=> !prev)}
            />
            {
              toogledown && 
              <div className="dropdown">
                  <Link
                  href='/profile'
                  onClick={()=> setToggleDown(false)}
                  >
                    Profile
                  </Link>
                  <Link
                  href="/create-prompt"
                  onClick={()=> setToggleDown(false)}
                  className="dropdown_link"
                  >
                    Create Posts
                  </Link>
                  <button
                  type="button"
                  onClick={()=> signOut()}
                  className="outline_btn w-full"
                  >
                    SignOut
                  </button>
              </div>
            }

          </div>
         
          
        }
       </div>
    </nav>
  )
}

export default Nav;
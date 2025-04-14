import { useState } from "react";
import Image from "./Image";
import { Link } from "react-router-dom";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full h-16 md:h-20 flex items-center justify-between px-4 md:px-8 lg:px-12 shadow-md">
      <Link to="/" className="flex items-center gap-2">
        {/* Use a local image from public folder */}
        <Image src="/logo.png" alt="PCMI Blog" w={32} h={32} />
        <span className="text-xl font-bold">PCMI Blog</span>
      </Link>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="flex flex-col justify-center items-center w-8 h-8 border-0 bg-transparent gap-1.5 cursor-pointer"
        >

  <span
            className={`block h-0.5 w-6 bg-black rounded-sm transition-all ease-in-out ${
              open ? "rotate-45 translate-y-2" : ""
            }`}
          ></span>
          <span
            className={`block h-0.5 w-6 bg-black rounded-sm transition-all ease-in-out ${
              open ? "opacity-0" : "opacity-100"
            }`}
          ></span>
          <span
            className={`block h-0.5 w-6 bg-black rounded-sm transition-all ease-in-out ${
              open ? "-rotate-45 -translate-y-2" : ""
            }`}
          ></span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed top-16 left-0 right-0 bottom-0 bg-[#e6e6ff] transition-all ease-in-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8 text-xl">
          <Link to="/" onClick={() => setOpen(false)}>
            Home
          </Link>
          <Link to="/blogs" onClick={() => setOpen(false)}>
            Blogs
          </Link>
          <Link to="/about" onClick={() => setOpen(false)}>
            About
          </Link>
          <Link to="/contact" onClick={() => setOpen(false)}>
            Contact
          </Link>
          <SignedOut>
            <Link
              to="/sign-in"
              onClick={() => setOpen(false)}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Login
            </Link>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
           {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-6">
        <Link to="/">Home</Link>
        <Link to="/blogs">Blogs</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        <SignedOut>
          <Link
            to="/sign-in"
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Login
          </Link>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
};

export default Navbar;  
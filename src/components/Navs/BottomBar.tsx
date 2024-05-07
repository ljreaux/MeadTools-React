import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import { FaDiscord } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";
export default function BottomBar() {
  return (
    <div className=" w-screen fixed bottom-0 left-0 text-textColor">
      <div className="w-full ">
        <span className="sm:flex sm:w-full sm:justify-center">
          <div className="flex w-full sm:w-fit sm:px-4 sm:my-2 sm:rounded-2xl items-center justify-center gap-1 bg-sidebar">
            <a
              className=" hover:text-background md:hover:scale-105 transition-all py-2 "
              href="https://github.com/ljreaux/MeadTools-React/tree/main"
              target="to_blank"
            >
              <FaGithub />
            </a>
            <a
              className=" hover:text-background md:hover:scale-105 transition-all py-2 "
              href="https://www.linkedin.com/in/ljreaux/"
              target="to_blank"
            >
              <FaLinkedin />
            </a>
            <a
              className=" hover:text-background md:hover:scale-105 transition-all py-2 "
              href="https://discord.gg/8sycKxYF"
              target="to_blank"
            >
              <FaDiscord />
            </a>
            <a
              className=" hover:text-background md:hover:scale-105 transition-all py-2 "
              href="https://www.facebook.com/profile.php?id=61555860082002"
              target="to_blank"
            >
              <FaFacebook />
            </a>
            <a
              className=" hover:text-background md:hover:scale-105 transition-all py-2"
              href="https://www.instagram.com/meadtools/"
              target="to_blank"
            >
              <AiFillInstagram />
            </a>
            <Link
              to="/contact"
              className="hover:text-background md:hover:scale-105 transition-all py-2"
            >
              <MdEmail />
            </Link>
          </div>
        </span>
      </div>
    </div>
  );
}

import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

import arrow_right from "../../assets/navbar/arrow_right.svg";
import arrow_left from "../../assets/navbar/arrow_left.svg";
import logout from "../../assets/navbar/logout.svg";

import { FaBlogger, FaCalendarAlt, FaMicrophone, FaQuoteLeft } from 'react-icons/fa';

export default function Navbar({ isOpen, setIsOpen, handleLogout, children }) {

  const path = useLocation().pathname;

  const LinkActive = (link) => {
    const linkCase = link.toLowerCase();
    const pathCase = path.toLowerCase();
    return pathCase.includes(linkCase);
  };

  const userDetail = { name: "Admin", email: "admin@connectmurali.com" };

  const scrollBarCSS = `
        #scrollableNav::-webkit-scrollbar {
            width: 5px;
        }
        #scrollableNav::-webkit-scrollbar-thumb {
            background: #2E90FA;
            border-radius: 6px;
        }
        #labelSearch {
            position: relative;
        }
        #labelSearch:before {
            content: "";
            position: absolute;
            left: 10px;
            top: 0;
            bottom: 0;
            width: 16px;
            background: url("data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 17 17' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M16 16L12.375 12.375M14.3333 7.66667C14.3333 11.3486 11.3486 14.3333 7.66667 14.3333C3.98477 14.3333 1 11.3486 1 7.66667C1 3.98477 3.98477 1 7.66667 1C11.3486 1 14.3333 3.98477 14.3333 7.66667Z' stroke='gray' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E%0A") center / contain no-repeat;
        }
    `;

  const navContent = [
    {
      icon: <FaBlogger />,
      alt: 'Blog Management',
      title: 'Blog Management',
      link: '/blogs',
      activeLink: '/blogs'
    },
    {
      icon: <FaCalendarAlt />,
      alt: 'Event Management',
      title: 'Event Management',
      link: '/events',
      activeLink: '/events'
    },
    {
      icon: <FaMicrophone />,
      alt: 'Podcast Management',
      title: 'Podcast Management',
      link: '/podcasts',
      activeLink: '/podcasts'
    },
    {
      icon: <FaQuoteLeft />,
      alt: 'Testimonial Management',
      title: 'Testimonial Management',
      link: '/testimonials',
      activeLink: '/testimonials'
    },
  ];

  useEffect(() => {
    path !== "/" ? setIsOpen(true) : setIsOpen(false);
    // eslint-disable-next-line
  }, [path]);

  const handleSetIsOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <style>{scrollBarCSS}</style>
      <div className="flex  w-full h-screen">
        <div
          className={`flex flex-col   justify-between h-full bg-primary-blue text-white ${!isOpen ? "items-center  w-[60px] lg:w-[80px] " : " w-[250px]"
            }`}
        >
          <div className="w-full">
            <div
              className={`h-[8vh] border-b border-gray-400 flex items-center justify-center gap-4 py-8 bg-primary-blue ${!isOpen && "justify-center"
                }`}
            >
              <Link to="/">
                {isOpen ?
                  <p className="text-2xl font-medium">Muralidharan R.</p>
                  : <p className="text-3xl font-medium">M</p>
                }
              </Link>
            </div>
            <div
              id="scrollableNav"
              className={`h-[70vh] flex flex-col gap-[10px] px-2 pt-2 overflow-y-auto ${!isOpen && "items-center"}`}
            >
              <div
                className={`flex flex-col gap-3 w-full ${isOpen ? "items-end" : "items-center"}`}
              >
                <button
                  onClick={handleSetIsOpen}
                  className={`flex items-center w-fit hover:bg-secondary-blue px-1 py-1 rounded-md`}
                >
                  {isOpen ? (
                    <img src={arrow_left} alt="Contract" title="Close" />
                  ) : (
                    <img src={arrow_right} alt="Expand" title="Open" />
                  )}
                </button>
              </div>
              {navContent?.map((item, index) => (
                <Link
                  key={index}
                  to={item.link}
                  className={`flex items-center gap-3 px-2 py-2 rounded-md hover:bg-secondary-blue ${LinkActive(item.link) && "bg-secondary-blue"}`}
                  title={!isOpen ? item.alt : ""}
                >
                  <div className="text-[17px]">{item.icon}</div>
                  {isOpen && <p>{item.title}</p>}
                </Link>
              ))}
            </div>
          </div>
          <div
            className={`h-[22vh] flex flex-col justify-end pb-4 px-2 ${!isOpen ? "items-center gap-3" : "gap-2"
              }`}
          >
            <div className="bg-gray-400 h-[1.5px] w-full" />
            <div className="flex justify-center gap-2">
              {isOpen ? (
                <div className="flex gap-1">
                  <div className="flex flex-col justify-center text-sm">
                    <p>{userDetail.name}</p>
                    <p>{userDetail.email}</p>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="flex justify-start h-fit w-[35px]"
                    title="Logout"
                  >
                    <img src={logout} alt="Logout" className="-mt-2" />
                  </button>
                </div>
              ) :
                <button
                  onClick={handleLogout}
                  className="flex justify-start h-fit w-[35px]"
                  title="Logout"
                >
                  <img src={logout} alt="Logout" className="-mt-2" />
                </button>
              }
            </div>
          </div>
        </div>
        <div
          className={`
            ${isOpen ? "w-[calc(100%-250px)]" : "w-[calc(100%-60px)]  lg:w-[calc(100%-80px)]"}`}
        >
          {children}
        </div>
      </div>
    </>
  );
}

import Feeds from "@/Components/Feeds";
import { Link, useNavigate } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import { useContext, useEffect, useState } from "react";
import { ContextProvider } from "../ContextApi/ContextApi";
import axios from "axios";
import Loading from "@/Components/Loading/Loading";
import NotFound from "./NotFound";
import defaultAvater from '.././src/assets/default-avatar.png'
function Home() {
  const { dark ,toggleThreads,toggleReplies ,threads} = useContext(ContextProvider);
  const user = JSON.parse(localStorage.getItem("user-threads"));
  const currentUserId = user.id;
  const navigate = useNavigate();
  const [noPost, setnoPost] = useState(false);
  const [feeds, setFeeds] = useState([]);
  const [allPost, setallPost] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [users,setusers]=useState([])
  const handleCreatePost = () => {
    navigate("/Post");
  };

  async function toggleLike(postId) {
    try {
      const res = await axios.post(
        `http://localhost:4000/api/post/like&dislike/${postId}`,
        { currentUserId },
        { withCredentials: true }
      );
      GetFeeds();
      console.log(users)
    } catch (error) {
      console.log(error);
    }
  }

  async function GetFeeds() {
    setIsLoading(true);
    try {
      const res = await axios.get("http://localhost:4000/api/post/feed", {
        withCredentials: true,
      });
      setFeeds(res.data);
      if(res.data.length==0){
        setnoPost(true)
      }
    } catch (error) {
      console.log(error);
      setnoPost(true);
    } finally {
      setIsLoading(false);
    }
  }
  async function GetAllpost() {
    setIsLoading(true);
    try {
      const res = await axios.get("http://localhost:4000/api/post/getallpost", {
        withCredentials: true,
      });
      setallPost(res.data.post);
      if(res.data.length==0){
        setnoPost(true)
      }
    } catch (error) {
      console.log(error);
      setnoPost(true);
    } finally {
      setIsLoading(false);
    }
  }
  async function GetUser() {
    setIsLoading(true);
    try {
      const res = await axios.get("http://localhost:4000/api/user/allprofile", {
        withCredentials: true,
      });
      setusers(res.data);
    } catch (error) {
      console.log(error);
      setnoPost(true);
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    GetUser()
    GetFeeds();
    GetAllpost();
  }, []);

  const colorSchemes = {
    dark: {
      midnightEmerald: {
        background: "linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)",
        hover: "linear-gradient(135deg, #2c5364 0%, #203a43 50%, #0f2027 100%)",
        iconColor: "#a5f3fc",
      },
      velvetSunset: {
        background: "linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)",
        hover: "linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)",
        iconColor: "#fafafa",
      },
      mercuryGlass: {
        background: "rgba(255, 255, 255, 0.16)",
        hover: "rgba(255, 255, 255, 0.24)",
        iconColor: "#ffffff",
        border: "1px solid rgba(255, 255, 255, 0.3)",
        backdropFilter: "blur(8px)",
      },
      obsidian: {
        background: "radial-gradient(circle, #1e293b 0%, #0f172a 100%)",
        hover: "radial-gradient(circle, #0f172a 0%, #1e293b 100%)",
        iconColor: "#e2e8f0",
        boxShadow: "0 4px 30px rgba(99, 102, 241, 0.3)",
      },
    },
    light: {
      morningSky: {
        background: "linear-gradient(135deg, #e0f2fe 0%, #bae6fd 50%, #7dd3fc 100%)",
        hover: "linear-gradient(135deg, #7dd3fc 0%, #bae6fd 50%, #e0f2fe 100%)",
        iconColor: "#0369a1",
        border: "1px solid #bae6fd",
      },
      cottonCandy: {
        background: "linear-gradient(135deg, #f0abfc 0%, #a5b4fc 100%)",
        hover: "linear-gradient(135deg, #a5b4fc 0%, #f0abfc 100%)",
        iconColor: "#4c1d95",
      },
      frostedGlass: {
        background: "rgba(255, 255, 255, 0.7)",
        hover: "rgba(255, 255, 255, 0.9)",
        iconColor: "#3b82f6",
        border: "1px solid rgba(203, 213, 225, 0.5)",
        backdropFilter: "blur(8px)",
      },
      pearl: {
        background: "radial-gradient(circle, #ffffff 0%, #f8fafc 100%)",
        hover: "radial-gradient(circle, #f8fafc 0%, #ffffff 100%)",
        iconColor: "#64748b",
        boxShadow: "0 4px 30px rgba(100, 116, 139, 0.2)",
      },
    },
  };

  const modeSchemes = dark ? colorSchemes.dark : colorSchemes.light;
  const selectedScheme = dark ? modeSchemes.midnightEmerald : modeSchemes.morningSky;

  if (isLoading) {
    return <Loading />;
  }

  if (noPost) {
    return <NotFound />;
  }

  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        backgroundColor: dark ? "#0f172a" : "#f8fafc",
      }}
    >
      {/* Horizontal scrollable user carousel */}
      <div
        style={{
          display: "flex",
          overflowX: "auto",
          gap: "12px",
          padding: "12px 16px",
          backgroundColor: dark ? "#1e293b" : "#f1f5f9",
          marginBottom: "16px",
        }}
      >
        <div
          className={`flex overflow-x-auto gap-4 py-4 px-4 mb-6 ${
            dark ? "bg-slate-800" : "bg-slate-100"
          } min-h-[180px] items-center scrollbar-hide`}
        >
          {users?.map((user) => (
            <Link to={`/${user.username}`}
              key={user._id}
              className={`shrink-0 w-36 flex flex-col items-center p-3 rounded-lg ${
                dark
                  ? "bg-slate-700 border border-slate-600"
                  : "bg-white border border-slate-200"
              } shadow-sm`}
            >
              <div
                className={`w-14 h-14 rounded-full mb-3 flex items-center justify-center ${
                  dark ? "bg-slate-600 text-slate-200" : "bg-slate-200 text-slate-600"
                } font-medium text-lg`}
              >
                <img src={user.profilepic||defaultAvater}
                className="rounded-full w-10 h-10" />
              </div>
              <p className={`font-semibold text-sm mb-1 ${dark ? "text-white" : "text-slate-800"}`}>
                {user.name.slice(0,5)+".."}
              </p>
              <p className={`text-xs mb-3 ${dark ? "text-gray-400" : "text-slate-500"}`}>
                @{user.username.slice(0,5)+".."}
              </p>
              <button
              className={`px-5 py-0.5 mt-2 rounded-lg text-sm font-medium transition-all duration-200 ease-out ${
                dark
      ? "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-teal-500 hover:to-blue-500 shadow-blue-500/20"
      : "bg-gradient-to-r from-blue-400 to-blue-500 hover:from-purple-400 hover:to-blue-400 shadow-blue-400/20"
  } shadow-xs hover:shadow-sm hover:-translate-y-0.5 active:scale-95`}
>
               <p className="text-sm">view</p>
            </button>
            </Link>
          ))}
        </div>
      </div>
      <div>
      </div>
      <div className="flex border-b" style={{ borderColor: dark ? '#374151' : '#e5e7eb' }}>
        <button
          onClick={toggleThreads}
          className={`flex-1 py-3 font-medium relative ${threads ? (dark ? 'text-white' : 'text-blue-600') : (dark ? 'text-gray-400' : 'text-gray-500')}`}
        >
          All Post
          {threads && (
            <span className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-1 rounded-full ${dark ? 'bg-blue-500' : 'bg-blue-600'}`}></span>
          )}
        </button>
        
        <button
          onClick={toggleReplies}
          className={`flex-1 py-3 font-medium relative ${!threads ? (dark ? 'text-white' : 'text-blue-600') : (dark ? 'text-gray-400' : 'text-gray-500')}`}
        >
          Feeds
          {!threads && (
            <span className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-1 rounded-full ${dark ? 'bg-blue-500' : 'bg-blue-600'}`}></span>
          )}
        </button>
      </div>
      {isLoading&&<Loading/>}
      {threads? <div style={{ paddingBottom: "80px" }}>
        {allPost.map((post) => (
          <Feeds key={post._id} feed={post} noPost={noPost} toggleLike={() => toggleLike(feed._id)} />
        ))}
      {isLoading&&<Loading/>}
      </div>:<div style={{ paddingBottom: "80px" }}>
        {feeds.map((feed) => (
          <Feeds key={feed._id} toggleLike={() => toggleLike(feed._id)} />
        ))}
      </div>}
      

      {/* Floating Action Button */}
      <button
        onClick={handleCreatePost}
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          width: "48px",
          height: "48px",
          background: selectedScheme.background,
          color: selectedScheme.iconColor,
          border: selectedScheme.border || "none",
          borderRadius: "50%",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow:
            selectedScheme.boxShadow ||
            (dark ? "0 4px 20px rgba(0, 0, 0, 0.2)" : "0 4px 20px rgba(0, 0, 0, 0.1)"),
          transition: "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",
          zIndex: 1000,
          backdropFilter: selectedScheme.backdropFilter || "none",
          transform: "translateZ(0)",
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.background = selectedScheme.hover;
          e.currentTarget.style.transform = "translateZ(0) scale(1.08)";
          e.currentTarget.style.boxShadow = selectedScheme.boxShadow
            ? selectedScheme.boxShadow.replace(dark ? "0.3" : "0.2", dark ? "0.5" : "0.3")
            : dark
            ? "0 6px 24px rgba(0, 0, 0, 0.3)"
            : "0 6px 24px rgba(0, 0, 0, 0.15)";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.background = selectedScheme.background;
          e.currentTarget.style.transform = "translateZ(0) scale(1)";
          e.currentTarget.style.boxShadow =
            selectedScheme.boxShadow ||
            (dark ? "0 4px 20px rgba(0, 0, 0, 0.2)" : "0 4px 20px rgba(0, 0, 0, 0.1)");
        }}
        aria-label="Create new post"
      >
        <FiPlus
          size={20}
          style={{
            strokeWidth: "2.5",
            color: selectedScheme.iconColor,
          }}
        />
      </button>
    </div>
  );
}

export default Home;
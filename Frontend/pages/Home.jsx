import Feeds from "@/Components/Feeds";
import Logout from "./Logout";
import { useNavigate } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import { useContext, useEffect, useState } from "react";
import { ContextProvider } from "../ContextApi/ContextApi";
import axios from "axios";

function Home() {
  const { dark } = useContext(ContextProvider);
  const navigate = useNavigate();
  const [noPost,setnoPost]=useState(false)
  const [feeds,setFeeds]=useState()
  const handleCreatePost = () => {
    navigate("/Post");
  };
  async function GetFeeds(){
    try {
      const res=await axios.get("http://localhost:4000/api/post/feed",{
        withCredentials:true
      })
      setFeeds(res.data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    GetFeeds()
  })

  // Color schemes for both dark and light modes
  const colorSchemes = {
    dark: {
      midnightEmerald: {
        background: 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)',
        hover: 'linear-gradient(135deg, #2c5364 0%, #203a43 50%, #0f2027 100%)',
        iconColor: '#a5f3fc'
      },
      velvetSunset: {
        background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)',
        hover: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
        iconColor: '#fafafa'
      },
      mercuryGlass: {
        background: 'rgba(255, 255, 255, 0.16)',
        hover: 'rgba(255, 255, 255, 0.24)',
        iconColor: '#ffffff',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        backdropFilter: 'blur(8px)'
      },
      obsidian: {
        background: 'radial-gradient(circle, #1e293b 0%, #0f172a 100%)',
        hover: 'radial-gradient(circle, #0f172a 0%, #1e293b 100%)',
        iconColor: '#e2e8f0',
        boxShadow: '0 4px 30px rgba(99, 102, 241, 0.3)'
      }
    },
    light: {
      morningSky: {
        background: 'linear-gradient(135deg, #e0f2fe 0%, #bae6fd 50%, #7dd3fc 100%)',
        hover: 'linear-gradient(135deg, #7dd3fc 0%, #bae6fd 50%, #e0f2fe 100%)',
        iconColor: '#0369a1',
        border: '1px solid #bae6fd'
      },
      cottonCandy: {
        background: 'linear-gradient(135deg, #f0abfc 0%, #a5b4fc 100%)',
        hover: 'linear-gradient(135deg, #a5b4fc 0%, #f0abfc 100%)',
        iconColor: '#4c1d95'
      },
      frostedGlass: {
        background: 'rgba(255, 255, 255, 0.7)',
        hover: 'rgba(255, 255, 255, 0.9)',
        iconColor: '#3b82f6',
        border: '1px solid rgba(203, 213, 225, 0.5)',
        backdropFilter: 'blur(8px)'
      },
      pearl: {
        background: 'radial-gradient(circle, #ffffff 0%, #f8fafc 100%)',
        hover: 'radial-gradient(circle, #f8fafc 0%, #ffffff 100%)',
        iconColor: '#64748b',
        boxShadow: '0 4px 30px rgba(100, 116, 139, 0.2)'
      }
    }
  };

  // Select schemes based on dark/light mode
  const modeSchemes = dark ? colorSchemes.dark : colorSchemes.light;
  
  // Select your preferred scheme here (use different schemes for different modes if you want)
  const selectedScheme = dark ? modeSchemes.midnightEmerald : modeSchemes.morningSky;

  return (
    <div style={{ 
      position: "relative", 
      minHeight: "100vh",
      backgroundColor: dark ? '#0f172a' : '#f8fafc'
    }}>
      {/* {horizontal scrollable } */}
      {feeds?.map((feed,index)=>(
          <div style={{ paddingBottom: "80px" }}>
          <Feeds key={index} feed={feed} />
        </div>
      ))}
      

      {/* Adaptive Floating Action Button */}
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
          border: selectedScheme.border || 'none',
          borderRadius: "50%",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: selectedScheme.boxShadow || 
            (dark ? '0 4px 20px rgba(0, 0, 0, 0.2)' : '0 4px 20px rgba(0, 0, 0, 0.1)'),
          transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
          zIndex: 1000,
          backdropFilter: selectedScheme.backdropFilter || 'none',
          transform: 'translateZ(0)'
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.background = selectedScheme.hover;
          e.currentTarget.style.transform = 'translateZ(0) scale(1.08)';
          e.currentTarget.style.boxShadow = selectedScheme.boxShadow 
            ? selectedScheme.boxShadow.replace(dark ? '0.3' : '0.2', dark ? '0.5' : '0.3') 
            : (dark ? '0 6px 24px rgba(0, 0, 0, 0.3)' : '0 6px 24px rgba(0, 0, 0, 0.15)');
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.background = selectedScheme.background;
          e.currentTarget.style.transform = 'translateZ(0) scale(1)';
          e.currentTarget.style.boxShadow = selectedScheme.boxShadow || 
            (dark ? '0 4px 20px rgba(0, 0, 0, 0.2)' : '0 4px 20px rgba(0, 0, 0, 0.1)');
        }}
        aria-label="Create new post"
      >
        <FiPlus 
          size={20} 
          style={{ 
            strokeWidth: "2.5",
            color: selectedScheme.iconColor
          }} 
        />
      </button>
    </div>
  );
}

export default Home;
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <header className="bg-black text-white rounded-b-3xl px-6 py-2">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-12 h-12 flex items-center justify-center">
            <img
              src="/logo.webp"
              alt="Logo"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex bg-black rounded-full overflow-hidden border border-gray-700">
            <Button
              variant="ghost"
              className={`text-white ${location.pathname === "/" ? "bg-black" : "hover:bg-gray-800"} rounded-full px-4`}
              onClick={() => navigate("/")}
            >
              Dashboard
            </Button>
            <Button
              variant="ghost"
              className={`text-white ${location.pathname.includes("/biomarker") ? "bg-black" : "hover:bg-gray-800"} rounded-full px-4`}
              onClick={() => navigate("/biomarker/ggt")}
            >
              Bloodwork
            </Button>
            <Button
              variant="ghost"
              className={`text-white ${location.pathname.includes("/recommendations") || location.pathname.includes("/plan") ? "bg-black" : "hover:bg-gray-800"} rounded-full px-4`}
              onClick={() => navigate("/recommendations")}
            >
              Performance
            </Button>
            <Button
              variant="ghost"
              className={`text-white ${location.pathname.includes("/education") ? "bg-black" : "hover:bg-gray-800"} rounded-full px-4`}
              onClick={() => navigate("/education")}
            >
              Education
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <div className="bg-green-400 text-black px-4 py-1 rounded-full text-sm font-medium">
              Vitality score: 92.1%
            </div>
            <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=John"
                alt="User avatar"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

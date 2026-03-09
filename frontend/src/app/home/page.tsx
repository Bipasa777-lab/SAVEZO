"use client";

import {
  UserIcon,
  X,
  MessageCircle,
  Building2,
  Pill,
  Clock,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Linkedin,
} from "lucide-react";
import React from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { useRouter } from "next/navigation";

const hospitals = [
  {
    name: "Narayana Hospital",
    location: "Madhyamgram,",
    area: "North 24 Parganas",
    timing: "OPD 10:00 AM - 12:00 PM",
    phone: "+919564099834",
    image: "/hospital1.svg",
  },
  {
    name: "Medica Superspecialty Hospital",
    location: "Mukundapur, Kolkata",
    area: "",
    timing: "OPD 9:00 am - 7:00 pm",
    phone: "+917076102587",
    image: "/hospital2.svg",
  },
];

const pharmacies = [
  {
    name: "Apollo Pharmacy",
    location: "Salt Lake City,",
    area: "Sector V, Kolkata",
    timing: "Open 24/7",
    phone: "+919876543210",
    image: "/pharmacy1.svg",
  },
  {
    name: "MedPlus Pharmacy",
    location: "Park Street, Kolkata",
    area: "",
    timing: "Open 8:00 AM - 10:00 PM",
    phone: "+919123456789",
    image: "/pharmacy2.svg",
  },
];

const recentChats = [
  { name: "Dr. Smith", message: "Your test results are ready", time: "2 hours ago" },
  { name: "Apollo Pharmacy", message: "Your prescription is ready for pickup", time: "1 day ago" },
  { name: "Narayana Hospital", message: "Appointment confirmed for tomorrow", time: "2 days ago" },
];

export default function HomePage(): JSX.Element {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const router = useRouter();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="bg-[#bcf3f3] min-h-screen w-full flex justify-center">
      <div className="bg-[#bcf3f3] w-full max-w-[1440px] min-h-screen relative overflow-hidden flex flex-col">
        
        {/* Main Content */}
        <div className="flex-grow w-full h-full bg-[#ffffff80] rounded-[30px] sm:rounded-[50px] mx-2 sm:mx-8 my-2 sm:my-8 overflow-y-auto pb-20">
          
          {/* ✅ Top Navigation */}
          <nav className="flex items-center justify-between px-4 sm:px-12 pt-4 sm:pt-10 pb-4 sm:pb-8">
            <Button
              onClick={toggleSidebar}
              variant="ghost"
              className="p-2 bg-[#bcf3f3] hover:bg-[#a0e8e8] rounded-lg transition-colors"
            >
              <img src="/menu.svg" alt="Menu" className="w-7 h-7 sm:w-8 sm:h-8 object-contain" />
            </Button>

            {/* ✅ Profile Avatar */}
            <Avatar
              onClick={() => router.push("/profile")}
              className="w-[36px] h-[36px] sm:w-[50px] sm:h-[50px] rounded-full border border-solid border-black ml-4 sm:ml-8 cursor-pointer hover:scale-105 transition-transform"
            >
              <AvatarImage src="/user.svg" alt="User" />
              <AvatarFallback>
                <UserIcon className="w-5 h-5 sm:w-7 sm:h-7" />
              </AvatarFallback>
            </Avatar>
          </nav>

          {/* ✅ Sidebar Overlay */}
          {isSidebarOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={toggleSidebar}
            />
          )}

          {/* ✅ Sidebar */}
          <div
            className={`fixed top-0 left-0 h-full w-72 sm:w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
              isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6 sm:mb-8">
                <h2 className="text-xl sm:text-2xl font-semibold text-black [font-family:'Outfit',Helvetica]">
                  Menu
                </h2>
                <Button
                  onClick={toggleSidebar}
                  variant="ghost"
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X className="w-7 h-7 sm:w-8 sm:h-8 text-black" />
                </Button>
              </div>

              {/* Sidebar Menu Items */}
              <div className="space-y-3 sm:space-y-4 mb-8">
                <Button
                  onClick={() => {
                    router.push("/chatassistant");
                    setIsSidebarOpen(false);
                  }}
                  variant="ghost"
                  className="w-full justify-start p-3 sm:p-4 hover:bg-[#bcf3f3] rounded-lg transition-colors"
                >
                  <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 mr-3 text-black" />
                  <span className="text-base sm:text-lg font-medium text-black [font-family:'Outfit',Helvetica]">
                    Chat Assistant
                  </span>
                </Button>

                <Button
                  onClick={() => {
                    router.push("/location");
                    setIsSidebarOpen(false);
                  }}
                  variant="ghost"
                  className="w-full justify-start p-3 sm:p-4 hover:bg-[#bcf3f3] rounded-lg transition-colors"
                >
                  <Building2 className="w-6 h-6 sm:w-7 sm:h-7 mr-3 text-black" />
                  <span className="text-base sm:text-lg font-medium text-black [font-family:'Outfit',Helvetica]">
                    Nearby Hospital
                  </span>
                </Button>

                <Button
                  onClick={() => {
                    router.push("/locat");
                    setIsSidebarOpen(false);
                  }}
                  variant="ghost"
                  className="w-full justify-start p-3 sm:p-4 hover:bg-[#bcf3f3] rounded-lg transition-colors"
                >
                  <Pill className="w-6 h-6 sm:w-7 sm:h-7 mr-3 text-black" />
                  <span className="text-base sm:text-lg font-medium text-black [font-family:'Outfit',Helvetica]">
                    Nearby Pharmacy
                  </span>
                </Button>
              </div>

              {/* Recent Chats */}
              <div className="border-t pt-5 sm:pt-6">
                <div className="flex items-center mb-3 sm:mb-4">
                  <Clock className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-black" />
                  <h3 className="text-base sm:text-lg font-semibold text-black [font-family:'Outfit',Helvetica]">
                    Recent Chat
                  </h3>
                </div>
                <div className="space-y-2 sm:space-y-3">
                  {recentChats.map((chat, index) => (
                    <div
                      key={index}
                      className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-black text-sm sm:text-base [font-family:'Outfit',Helvetica]">
                          {chat.name}
                        </span>
                        <span className="text-xs text-gray-500">{chat.time}</span>
                      </div>
                      <p className="text-sm text-gray-600 truncate">{chat.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ✅ Hospitals Section */}
          <div className="px-4 sm:px-12 mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-semibold text-black mb-6 sm:mb-8 [font-family:'Outfit',Helvetica]">
              Nearby Hospitals
            </h2>
            <div className="space-y-6 sm:space-y-8">
              {hospitals.map((hospital, index) => (
                <Card
                  key={index}
                  className="w-full bg-white/70 border-0 shadow-md sm:shadow-lg rounded-xl sm:rounded-2xl overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <CardContent className="p-0 flex flex-col sm:flex-row">
                    <div className="w-full sm:w-1/3">
                      <img
                        className="w-full h-[180px] sm:h-[250px] object-cover"
                        alt="Hospital"
                        src={hospital.image}
                      />
                    </div>
                    <div className="w-full sm:w-2/3 p-4 sm:p-8">
                      <h3 className="text-xl sm:text-2xl font-semibold text-black mb-3 sm:mb-4 [font-family:'Outfit',Helvetica]">
                        {hospital.name}
                      </h3>
                      <div className="space-y-1 sm:space-y-2 [font-family:'Outfit',Helvetica] font-medium text-black text-sm sm:text-lg">
                        <p>📍 {hospital.location} {hospital.area}</p>
                        <p>🕒 {hospital.timing}</p>
                        <p>📞 {hospital.phone}</p>
                      </div>
                      <Button className="mt-4 sm:mt-6 bg-[#bcf3f3] hover:bg-[#a0e8e8] text-black font-medium px-5 sm:px-6 py-2 rounded-lg transition-colors text-sm sm:text-base">
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* ✅ Pharmacies Section */}
          <div className="px-4 sm:px-12 pb-10 sm:pb-12">
            <h2 className="text-2xl sm:text-3xl font-semibold text-black mb-6 sm:mb-8 [font-family:'Outfit',Helvetica]">
              Nearby Pharmacies
            </h2>
            <div className="space-y-6 sm:space-y-8">
              {pharmacies.map((pharmacy, index) => (
                <Card
                  key={index}
                  className="w-full bg-white/70 border-0 shadow-md sm:shadow-lg rounded-xl sm:rounded-2xl overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <CardContent className="p-0 flex flex-col sm:flex-row">
                    <div className="w-full sm:w-1/3">
                      <img
                        className="w-full h-[180px] sm:h-[250px] object-cover"
                        alt="Pharmacy"
                        src={pharmacy.image}
                      />
                    </div>
                    <div className="w-full sm:w-2/3 p-4 sm:p-8">
                      <h3 className="text-xl sm:text-2xl font-semibold text-black mb-3 sm:mb-4 [font-family:'Outfit',Helvetica]">
                        {pharmacy.name}
                      </h3>
                      <div className="space-y-1 sm:space-y-2 [font-family:'Outfit',Helvetica] font-medium text-black text-sm sm:text-lg">
                        <p>📍 {pharmacy.location} {pharmacy.area}</p>
                        <p>🕒 {pharmacy.timing}</p>
                        <p>📞 {pharmacy.phone}</p>
                      </div>
                      <Button className="mt-4 sm:mt-6 bg-[#bcf3f3] hover:bg-[#a0e8e8] text-black font-medium px-5 sm:px-6 py-2 rounded-lg transition-colors text-sm sm:text-base">
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* ✅ Footer (sticky bottom nav for phones, normal for desktop) */}
        <footer className="bg-white/80 border-t border-gray-200 sm:py-6 mt-4 sm:mt-6">
          {/* Desktop/Tablet */}
          <div className="hidden sm:flex justify-center space-x-8">
            <a href="#" className="text-black hover:text-blue-600 transition-colors">
              <Facebook className="w-7 h-7" />
            </a>
            <a href="#" className="text-black hover:text-pink-500 transition-colors">
              <Instagram className="w-7 h-7" />
            </a>
            <a href="#" className="text-black hover:text-blue-400 transition-colors">
              <Twitter className="w-7 h-7" />
            </a>
            <a href="#" className="text-black hover:text-red-600 transition-colors">
              <Youtube className="w-7 h-7" />
            </a>
            <a href="#" className="text-black hover:text-blue-700 transition-colors">
              <Linkedin className="w-7 h-7" />
            </a>
          </div>

          {/* Phone Sticky Bottom Nav */}
          <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg flex justify-around py-2 z-50">
            <Button variant="ghost" size="icon">
              <Facebook className="w-6 h-6 text-blue-600" />
            </Button>
            <Button variant="ghost" size="icon">
              <Instagram className="w-6 h-6 text-pink-500" />
            </Button>
            <Button variant="ghost" size="icon">
              <Twitter className="w-6 h-6 text-sky-500" />
            </Button>
            <Button variant="ghost" size="icon">
              <Youtube className="w-6 h-6 text-red-600" />
            </Button>
            <Button variant="ghost" size="icon">
              <Linkedin className="w-6 h-6 text-blue-700" />
            </Button>
          </div>
        </footer>
      </div>
    </div>
  );
}

import { useRef, useEffect, useState } from "react";
import {
  FaFacebook,
  FaWhatsapp,
  FaTelegram,
  FaLinkedin,
  FaXTwitter,
} from "react-icons/fa6";
import { IoClose, IoCheckmark } from "react-icons/io5";
import { LuLink } from "react-icons/lu";

const ShareModal = ({ isOpen, setIsOpen, url, title = "Check this post out" }) => {
  const modalRef = useRef(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target))
        setIsOpen(false);
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    else document.removeEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, setIsOpen]);

  // মোডাল বন্ধ হলে "Copied" state রিসেট
  useEffect(() => {
    if (!isOpen) setCopied(false);
  }, [isOpen]);

  const handleCopy = () => {
    navigator.clipboard
      .writeText(url)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => {});
  };

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareOptions = [
    {
      name: "Facebook",
      icon: <FaFacebook className="text-2xl" />,
      bg: "bg-[#1877F2]",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      name: "WhatsApp",
      icon: <FaWhatsapp className="text-2xl" />,
      bg: "bg-[#25D366]",
      href: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
    },
    {
      name: "X",
      icon: <FaXTwitter className="text-2xl" />,
      bg: "bg-black",
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    },
    {
      name: "Telegram",
      icon: <FaTelegram className="text-2xl" />,
      bg: "bg-[#26A5E4]",
      href: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
    },
    {
      name: "LinkedIn",
      icon: <FaLinkedin className="text-2xl" />,
      bg: "bg-[#0A66C2]",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
  ];

  const openShareWindow = (href) => {
    window.open(href, "_blank", "noopener,noreferrer,width=600,height=500");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed z-50 inset-0 bg-black/40 flex justify-center items-center animate-fadeIn px-4 animate-fadeIn">
      <div
        ref={modalRef}
        className="bg-white rounded-2xl shadow-xl w-[420px] max-w-full relative flex flex-col overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-zinc-200">
          <h2 className="font-semibold text-gray-800 text-base">Share Post</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-gray-600 text-xl cursor-pointer"
          >
            <IoClose />
          </button>
        </div>

        {/* Social icons */}
        <div className="grid grid-cols-5 gap-3 px-5 pt-5 pb-2">
          {shareOptions.map((option) => (
            <button
              key={option.name}
              onClick={() => openShareWindow(option.href)}
              className="flex flex-col items-center gap-1.5 group cursor-pointer"
            >
              <span
                className={`${option.bg} text-white w-11 h-11 rounded-full flex items-center justify-center transition-transform group-active:scale-90 group-hover:scale-105`}
              >
                {option.icon}
              </span>
              <span className="text-[11px] text-gray-600">{option.name}</span>
            </button>
          ))}
        </div>

        {/* Copy link */}
        <div className="p-5 pt-3">
          <p className="text-xs text-gray-500 mb-2">Or copy link</p>
          <div className="flex items-center gap-2 bg-gray-100 rounded-xl px-3 py-2">
            <LuLink className="text-gray-500 shrink-0" />
            <input
              type="text"
              readOnly
              value={url}
              onClick={(e) => e.target.select()}
              className="flex-grow bg-transparent text-sm text-gray-700 outline-none truncate"
            />
            <button
              onClick={handleCopy}
              className={`shrink-0 text-xs font-medium px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1
                ${copied ? "bg-green-100 text-green-700" : "bg-blue-600 text-white hover:bg-blue-700"}`}
            >
              {copied ? (
                <>
                  <IoCheckmark className="text-sm" /> Copied
                </>
              ) : (
                "Copy"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
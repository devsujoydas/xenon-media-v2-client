import {
  IoCallOutline,
} from "react-icons/io5";
import { MdOutlineEmail, MdOutlineArrowOutward } from "react-icons/md";
import { TbWorldWww } from "react-icons/tb";
import { FaFacebook, FaYoutube, FaGithub, FaLinkedin } from "react-icons/fa";

const contacts = (userData) => [
  {
    id: "phone",
    label: "Phone",
    value: userData?.contactInfo?.phone,
    href: `tel:${userData?.contactInfo?.phone}`,
    icon: <IoCallOutline />,
    bg: "from-indigo-500 to-indigo-700 text-white",
  },
  {
    id: "email",
    label: "Email",
    value: userData?.email,
    href: `mailto:${userData?.email}`,
    icon: <MdOutlineEmail />,
    bg: "from-purple-500 to-purple-700 text-white",
  },
  {
    id: "website",
    label: "Website",
    value: userData?.contactInfo?.website,
    href: userData?.contactInfo?.website,
    icon: <TbWorldWww />,
    bg: "from-emerald-500 to-emerald-700 text-white",
  },
  {
    id: "facebook",
    label: "Facebook",
    value: userData?.contactInfo?.facebook,
    href: userData?.contactInfo?.facebook,
    icon: <FaFacebook />,
    bg: "from-blue-500 to-blue-700 text-white",
  },
  {
    id: "youtube",
    label: "YouTube",
    value: userData?.contactInfo?.youtube,
    href: userData?.contactInfo?.youtube,
    icon: <FaYoutube />,
    bg: "from-red-500 to-red-700 text-white",
  },
  {
    id: "github",
    label: "GitHub",
    value: userData?.contactInfo?.github,
    href: userData?.contactInfo?.github,
    icon: <FaGithub />,
    bg: "from-gray-700 to-black text-white",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    value: userData?.contactInfo?.linkedin,
    href: userData?.contactInfo?.linkedin,
    icon: <FaLinkedin />,
    bg: "from-sky-500 to-sky-700 text-white",
  },
];

export default function ContactInfo({ userData }) {
  return (
    <div className="space-y-4 pb-8">
      <h1 className="font-semibold text-lg border-b pb-2">
        Contact Information
      </h1>

      {contacts(userData)
        .filter((item) => item.value)
        .map((item) => (
          <a
            key={item.id}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-4 rounded-xl bg-white border border-zinc-100 shadow-sm hover:shadow-md hover:scale-[1.01] transition-transform group"
          >
            {/* Left Part */}
            <div className="flex items-center gap-3">
              <div
                className={`p-3 rounded-xl bg-gradient-to-br ${item.bg} shadow-md`}
              >
                {item.icon}
              </div>
              <div>
                <h1 className="font-medium text-zinc-800">{item.label}</h1>
                <p className="text-sm text-zinc-500 truncate max-w-[200px]">
                  {item.value}
                </p>
              </div>
            </div>

            {/* Right Arrow */}
            <MdOutlineArrowOutward className="text-zinc-400 group-hover:text-zinc-600 transition" />
          </a>
        ))}
    </div>
  );
}

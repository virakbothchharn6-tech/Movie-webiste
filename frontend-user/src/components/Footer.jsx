const Footer = ({ lang }) => {
  const isKm = lang === "km";

  return (
    <footer className="w-full bg-black border-t border-neutral-900 text-neutral-400 py-12 px-6 md:px-14">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Brand និងការពិពណ៌នា */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-2xl font-extrabold text-white tracking-wider uppercase">
              Ousa <span className="text-red-600">Movie</span>
            </h2>
            <p className="text-xs text-neutral-500 mt-1 max-w-sm">
              {isKm 
                ? "វេទិកាទស្សនាភាពយន្តអនឡាញកម្រិតខ្ពស់ រហ័ស និងសម្បូរបែបបំផុត។"
                : "Premium online movie streaming platform with rich cinematic experiences."}
            </p>
          </div>
          <div className="text-xs text-neutral-500">
            {isKm ? "ទាក់ទងជំនួយ៖ support@ousamovie.com" : "Support: support@ousamovie.com"}
          </div>
        </div>

        {/* Links ៤ ជួរ */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-xs">
          <ul className="space-y-2.5">
            <li className="hover:text-white transition cursor-pointer">{isKm ? "សំណួរញឹកញាប់" : "FAQ"}</li>
            <li className="hover:text-white transition cursor-pointer">{isKm ? "ទំនាក់ទំនង" : "Contact Us"}</li>
            <li className="hover:text-white transition cursor-pointer">{isKm ? "គណនីរបស់ខ្ញុំ" : "My Account"}</li>
          </ul>
          <ul className="space-y-2.5">
            <li className="hover:text-white transition cursor-pointer">{isKm ? "លក្ខខណ្ឌប្រើប្រាស់" : "Terms of Use"}</li>
            <li className="hover:text-white transition cursor-pointer">{isKm ? "គោលការណ៍ភាពឯកជន" : "Privacy Policy"}</li>
            <li className="hover:text-white transition cursor-pointer">{isKm ? "ល្បឿនអ៊ីនធឺណិត" : "Speed Test"}</li>
          </ul>
          <ul className="space-y-2.5">
            <li className="hover:text-white transition cursor-pointer">{isKm ? "ភាពយន្តពេញនិយម" : "Popular Movies"}</li>
            <li className="hover:text-white transition cursor-pointer">{isKm ? "កម្មវិធីទូរទស្សន៍" : "TV Series"}</li>
            <li className="hover:text-white transition cursor-pointer">{isKm ? "ភាពយន្តថ្មីៗ" : "New Releases"}</li>
          </ul>
          <ul className="space-y-2.5">
            <li className="hover:text-white transition cursor-pointer">{isKm ? "មជ្ឈមណ្ឌលជំនួយ" : "Help Center"}</li>
            <li className="hover:text-white transition cursor-pointer">{isKm ? "ការផ្សាយពាណិជ្ជកម្ម" : "Advertising"}</li>
            <li className="hover:text-white transition cursor-pointer">{isKm ? "អំពីយើង" : "About Us"}</li>
          </ul>
        </div>

        {/* Copyright */}
        <div className="pt-6 border-t border-neutral-900/80 flex flex-col sm:flex-row justify-between items-center text-xs text-neutral-600 gap-2">
          <p>© 2026 OUSA MOVIE. All rights reserved.</p>
          <p>{isKm ? "បង្កើតឡើងដោយក្តីស្រឡាញ់សម្រាប់អ្នកស្នេហាភាពយន្ត" : "Built with passion for cinema lovers."}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
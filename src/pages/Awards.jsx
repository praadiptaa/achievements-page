import React, { useState, useRef, useEffect } from 'react';
import { Award } from 'lucide-react';
import AwardCard from '../components/AwardCard';

export default function Awards() {
  const [currentPage, setCurrentPage] = useState(1);

  const awards = [
    {
      id: 1,
      title: "ISO 14001:2015",
      category: "Sistem Manajemen Lingkungan",
      year: "2015",
      image: "https://belajark3.com/iso-14001/images/iso-14001.webp",
      description: "Sertifikasi Sistem Manajemen Lingkungan"
    },
    {
      id: 2,
      title: "ISO 45001",
      category: "Sistem Manajemen Kesehatan dan Keselamatan Kerja",
      year: "2018",
      image: "https://qdt.com.au/wp-content/uploads/2019/05/ISO-45001-logo.png",
      description: "Sertifikasi Sistem Manajemen Kesehatan dan Keselamatan Kerja"
    },
    {
      id: 3,
      title: "ISO/IEC 27001:2022 – Information Security Management System",
      category: "Keamanan Informasi",
      year: "2024",
      image: "https://static.wixstatic.com/media/9138d2_05c1b6701b7b4277a30a1bfc8b2ce527~mv2.jpg/v1/fill/w_1000,h_750,al_c,q_85,usm_0.66_1.00_0.01/9138d2_05c1b6701b7b4277a30a1bfc8b2ce527~mv2.jpg",
      description: "PT Paiton Operation and Maintenance Indonesia (POMI) memperoleh sertifikasi ISO/IEC 27001:2022 atas penerapan sistem manajemen keamanan informasi (ISMS) dalam pengelolaan infrastruktur pusat data, sebagai bukti komitmen terhadap perlindungan dan pengelolaan data sesuai standar internasional."
    },
    {
      id: 4,
      title: "ISO 50001:2018 – Energy Management System",
      category: "Manajemen Energi",
      year: "2024",
      image: "https://media.licdn.com/dms/image/v2/D5622AQFyDdujHNc4kg/feedshare-shrink_2048_1536/B56ZPxSuU3G8As-/0/1734920038584?e=1762992000&v=beta&t=zZr-YIe5yeaa-ON4GbZkGXwEk-HWfxeB0ZARJnSosSQ",
      description: "PT Paiton Operation and Maintenance Indonesia (POMI) meraih sertifikasi ISO 50001:2018 atas penerapan sistem manajemen energi yang bertujuan meningkatkan efisiensi energi, mengurangi emisi gas rumah kaca, serta menekan dampak lingkungan dan biaya energi."
    },
    {
      id: 5,
      title: "ISO 55001:2014",
      category: "Sistem Manajemen Aset",
      year: "2014",
      image: "https://5.imimg.com/data5/SELLER/Default/2023/9/345879833/ID/JX/JQ/142010693/iso-55001-2014-certification-services-500x500.png",
      description: "Sertifikasi Sistem Manajemen Aset"
    },
    {
      id: 6,
      title: "Authorized Economic Operator (AEO)",
      category: "Occupational Health & Safety",
      year: "",
      image: "https://www.lnjlogistics.com/wp-content/uploads/2023/09/lnj-logistics-certification-aeo.png",
      description: "Otorisasi Operator Ekonomi Terpercaya dari Direktorat Jenderal Bea dan Cukai"
    },
    {
      id: 7,
      title: "SMK2",
      category: "Sistem Manajemen Keselamatan dan Ketenagalistrikan",
      year: "2024",
      image: "https://dantaramandiri.co.id/wp-content/uploads/2025/05/logo-tanpa-tulisan.webp",
      description: "Penghargaan dari Direktorat Jenderal Ketenagalistrikan (DJK) ESDM"
    },
    {
      id: 8,
      title: "SMK3",
      category: "Sistem Manajemen Kesehatan dan Keselamatan Kerja",
      year: "2024",
      image: "https://kualitasprimasertifikasi.com/wp-content/uploads/2019/08/smk3.jpg",
      description: "Penghargaan dari Kementerian Ketenagakerjaan (Kemnaker) Indonesia"
    },
    {
      id: 9,
      title: "Proper Kategori Hijau",
      category: "Pengelolaan Lingkungan",
      year: "2015-2016",
      image: "https://anntamandiri-sejahtera.co.id/storage/2024/01/7-3.jpg",
      description: "Penghargaan dari Kementerian Lingkungan Hidup dan Kehutanan"
    },
    {
      id: 10,
      title: "Sistem Manajemen Pengamanan Predikat Emas",
      category: "Pengelolaan Keamanan",
      year: "2023",
      image: "https://png.pngtree.com/png-clipart/20231101/original/pngtree-brushed-gold-shield-security-system-photo-png-image_13472178.png",
      description: " Kepolisian Negara Republik Indonesia (Polri)"
    },
    {
      id: 11,
      title: "Invesment Award Juara Harapan 1",
      category: "Penghargaan Investasi",
      year: "2022",
      image: "https://cdn3d.iconscout.com/3d/premium/thumb/award-3d-icon-png-download-10753108.png",
      description: "Penghargaan dari Badan Koordinasi Penanaman Modal (BKPM)"
    },
    {
      id: 12,
      title: "Program Pencegahan dan Penanggulangan Corona Virus Disease (COVID-19) di Tempat Kerja",
      category: "Platinum",
      year: "2021",
      image: "https://img.freepik.com/premium-vector/stop-coronavirus-icon-caution-vector-sign-with-covid19_182787-1021.jpg",
      description: "Penghargaan dari Kementerian Kesehatan RI"
    },
     {
      id: 13,
      title: "Indonesia Green Award – Plastic Waste Management Category",
      category: "Pengelolaan Limbah Plastik / Inovasi Lingkungan",
      year: "2024",
      image: "https://media.licdn.com/dms/image/v2/D5622AQGDJKG8ih4HWA/feedshare-shrink_800/feedshare-shrink_800/0/1708051508190?e=1762992000&v=beta&t=ZhFx8lLVXcCiMWMCfibMGZQxjppUD56l-xO0M8OJqzs",
      description: "PT Paiton Energy–POMI meraih Indonesia Green Award 2024 kategori Plastic Waste Management atas program inovatif “Popok to the Pot: From Waste to Best”, yang mengolah limbah popok sekali pakai menjadi pot tanaman sebagai bagian dari komitmen perusahaan terhadap pengelolaan limbah dan pemberdayaan masyarakat."
    },
     {
      id: 14,
      title: "Indonesia Climate Change Expo & Forum",
      category: "Partisipan",
      year: "2023",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ60A8d1eKzoougG6VCWKZH-FqjvNKtIj5nJA&s",
      description: "Indonesia Climate Change Expo & Forum 2023",
    },
  {
      id: 15,
      title: "Sistem Manajemen Keselamatan dan Kesehatan Kerja",
      category: "Predikat Emas",
      year: "2023", 
      image: "https://kualitasprimasertifikasi.com/wp-content/uploads/2019/08/smk3.jpg",
      description: "Penghargaan dari Kementerian Ketenagakerjaan (Kemnaker) Indonesia"
    },
  {
      id: 16,
      title: "Keselamatan dan Kesehatan Kerja(K3) Perkantoran",
      category: "Kantor Kementerian/BUMN/Swasta dengan Nilai Terbaik",
      year: "2023",
      image: "https://mahirajayabana.com/wp-content/uploads/2022/11/bendera-k3-png.png",
      description: "Penghargaan dari Kementerian Ketenagakerjaan (Kemnaker) Indonesia"
    },
   {
      id: 17,
      title: "Indonesia Green Awards",
      category: "Best CSR Program",
      year: "2022",
      image: "https://indonesiagreenawards.com/wp-content/uploads/2022/02/94-LogoIGA2022.jpg",
      description: "Penghargaan dari The La Tofi School of Social Responsibility"
    },
  {
      id: 18,
      title: "Top CSR Awards",
      category: "Bintang 5",
      year: "2023",
      image: "https://i.ytimg.com/vi/fdVZwGgvfZc/mqdefault.jpg",
      description: "Penghargaan dari Majalah Top Business"
    },
  {
      id: 19,
      title: "Top CSR Awards",
      category: "Top Leader on the 2023",
      year: "2023",
      image: "https://i.ytimg.com/vi/fdVZwGgvfZc/mqdefault.jpg",
      description: "Penghargaan dari Majalah Top Business"
    },
  {
      id: 20,
      title: "Stellar Award",
      category: "Workplace Recognition in Employee Commitment and Satisfaction",
      year: "2022",
      image: "https://cdn-p.smehost.net/sites/90b58e35a8714a8bbe2e845a0b7bffd2/wp-content/uploads/2022/07/284591503_5455300094532198_6205228550043948263_n.jpeg",
      description: "Penghargaan dari ONE GML"
    },
    {
      id: 21,
      title: "Top CSR 2022",
      category: "Dengan Predikat Bintang 4",
      year: "2022",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5s9wkvXoGLEnYNZG8oeMUFUDP_-C-YtTfHA&s",
      description: "Penghargaan dari Majalah Top Business"
    },
    {
      id: 22,
      title: "CSR Indonesia Award",
      category: "Karsa Budaya Prima Gold",
      year: "2022",
      image: "https://csr-indonesia.com/wp-content/uploads/2022/03/2022_CSRINDONSIAAWARDS-640x562.jpg",
      description: "Penghargaan dari Meprindo Communication dan Media CSR Indonesia Magazine"
    },
    {
      id: 23,
      title: "Zero Accident Award",
      category: "Keselamatan dan Kesehatan Kerja (K3) / Pencegahan Kecelakaan Kerja",
      year: "2022",
      image: "https://media.licdn.com/dms/image/v2/D5622AQEeynFlWVRqoQ/feedshare-shrink_1280/B56ZYTqbigHoAo-/0/1744086612772?e=1762992000&v=beta&t=CtpVQNEsEZJIfwdX6teX0tHG6udFhSyxvsfNq6oI9mw",
      description: "Diberikan oleh Gubernur Jawa Timur kepada PT Paiton Operation & Maintenance Indonesia atas keberhasilannya menerapkan standar K3 secara efektif. Perusahaan berhasil mempertahankan zero accident (tanpa kecelakaan kerja) dan tanpa Penyakit Akibat Kerja (PAK) selama tiga tahun berturut-turut, serta memperoleh sertifikat SMK3 tingkat Emas. Penghargaan ini menjadi bukti komitmen perusahaan dalam menjaga lingkungan kerja yang aman dan sehat."
    },
        {
      id: 24,
      title: "HIV/AIDS Prevention and Control Program Award",
      category: "Program Pencegahan dan Pengendalian HIV/AIDS di Tempat Kerja",
      year: "2025",
      image: "https://media.licdn.com/dms/image/v2/D5622AQEQU5h95c2mYg/feedshare-shrink_1280/B56ZW4sFL8HoAs-/0/1742560319083?e=1762992000&v=beta&t=54bX9n6hCF9pbfr76KGn8PwupkpHguXL9-Wfyhqx_-8",
      description: "Pada 14 Februari 2025, Gubernur Jawa Timur memberikan penghargaan kepada PT Paiton Operation and Maintenance Indonesia – PT Paiton Energy atas keberhasilannya dalam menerapkan Program Pencegahan dan Pengendalian HIV/AIDS di Tempat Kerja. Penghargaan ini diberikan di Kantor Disnaker Korwil Probolinggo."
    },
       {
      id: 25,
      title: "PROPER (Corporate Performance Rating Program) – Green Rating",
      category: "Lingkungan dan Tanggung Jawab Sosial (Environmental and Social Management)",
      year: "2024",
      image: "https://media.licdn.com/dms/image/v2/D5622AQEU7esab1nuMA/feedshare-shrink_1280/B56ZVfAaEJHQAk-/0/1741055699162?e=1762992000&v=beta&t=iq0_mBWVt6g0RS27gfeF40uqU0STKUCNV82bIS1zS6Y",
      description: "PT Paiton Energy – PT Paiton Operation and Maintenance Indonesia (POMI) meraih peringkat Hijau (Green Rating) dalam Program Penilaian Peringkat Kinerja Perusahaan (PROPER) dari Kementerian Lingkungan Hidup Republik Indonesia. Penghargaan ini diserahkan pada Upacara Penghargaan PROPER di Sasono Langen Budoyo, Taman Mini Indonesia Indah, Jakarta, pada 24 Februari 2025."
    },
      {
      id: 26,
      title: "EBTKE Award – Energy Efficiency in Energy Efficient Buildings Category",
      category: "Efisiensi Energi / Bangunan Hemat Energi",
      year: "2024",
      image: "https://media.licdn.com/dms/image/v2/D5622AQF1RGszNIy1QA/feedshare-shrink_2048_1536/B56ZUdbG3yGUAs-/0/1739955401266?e=1762992000&v=beta&t=KGWdoelsUAtLmUFUuI-1zWHBVaSg1pO5JUM0tnSHJ50",
      description: "PT Paiton Operation and Maintenance Indonesia (POMI) meraih penghargaan EBTKE Award 2024 dalam kategori Efisiensi Energi / Bangunan Hemat Energi. Penghargaan ini diberikan oleh Kementerian Energi dan Sumber Daya Mineral Republik Indonesia pada acara Malam Anugerah EBTKE 2024 di Jakarta, pada 24 Februari 2025."
    },
    {
      id: 27,
      title: "Siddhakarya Award",
      category: "Produktivitas Perusahaan",
      year: "2024",
      image: "https://media.licdn.com/dms/image/v2/D5622AQFHFUvk6ocvkg/feedshare-shrink_1280/B56ZTtSh7gGsAk-/0/1739147846330?e=1762992000&v=beta&t=nihSz0dRKowpG_FoNl0bfOv_IqwsOE183_Qd6lSKxoA",
      description: "PT Paiton Operation and Maintenance Indonesia (POMI) meraih penghargaan Siddhakarya Award 2024 dalam kategori Produktivitas Perusahaan. Penghargaan ini diberikan oleh Kementerian Ketenagakerjaan Republik Indonesia pada acara Malam Anugerah Siddhakarya 2024 di Jakarta, pada 24 Februari 2025."
    },
    {
      id: 28,
      title: "CSR Award",
      category: "Tanggung Jawab Sosial Perusahaan",
      year: "2024",
      image: "https://media.licdn.com/dms/image/v2/D5622AQFpBKn_xCFhFg/feedshare-shrink_2048_1536/B56ZQVECIEH0Ao-/0/1735520170684?e=1762992000&v=beta&t=7z_NUUJRAOK7b6xlScgM52m7klNhaXb3woD-RHL8OHo",
      description: "PT Paiton Operation and Maintenance Indonesia (POMI) meraih penghargaan CSR Award 2024 dalam kategori Tanggung Jawab Sosial Perusahaan. Penghargaan ini diberikan oleh Kementerian Ketenagakerjaan Republik Indonesia pada acara Malam Anugerah CSR 2024 di Jakarta, pada 24 Februari 2025."
    },
    {
      id: 29,
      title: "EDGE Final Certification – Green Building Council Indonesia",
      category: "Bangunan Hijau / Efisiensi Energi dan Sumber Daya",
      year: "2024",
      image: "https://media.licdn.com/dms/image/v2/D4E22AQE4XRLiYWiP3Q/feedshare-shrink_800/feedshare-shrink_800/0/1722907960279?e=1762992000&v=beta&t=V9M5RK7ePfMdDv9eXKSmRa-ogkzb9IgyfUGbtGgwf7Y",
      description: "PT Paiton Operation and Maintenance Indonesia (POMI) meraih sertifikasi EDGE Final 2024 dari Green Building Council Indonesia. Sertifikasi ini diberikan atas komitmen POMI dalam menerapkan praktik bangunan hijau dan efisiensi energi di seluruh operasionalnya."
    },
  ];

  const itemsPerPage = 6;
  const totalPages = Math.ceil(awards.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentAwards = awards.slice(startIndex, endIndex);

  // Hero parallax / visibility state
  const heroRef = useRef(null);
  const [offsetY, setOffsetY] = useState(0);
  const [isHeroVisible, setIsHeroVisible] = useState(true);

  useEffect(() => {
    let rafId = null;

    function onScroll() {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        setOffsetY(window.scrollY || window.pageYOffset);
        if (heroRef.current) {
          const rect = heroRef.current.getBoundingClientRect();
          setIsHeroVisible(rect.top < window.innerHeight && rect.bottom > 0);
        }
      });
    }

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <>
 {/* Hero Section */}
      <div 
        ref={heroRef}
        className="relative h-[60vh] min-h-[400px] overflow-hidden"
      >
        {/* Latar belakang dengan efek parallax */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('https://media.licdn.com/dms/image/v2/D5622AQFCmjOh9eeqdw/feedshare-shrink_2048_1536/B56Zh9efVVHkAo-/0/1754451803864?e=1762992000&v=beta&t=tMxudEv9vQb2GKPVoMWjRAI3DcSKaWEa3zluq9cYcDo')`,
            transform: `translateY(${offsetY * 0.4}px)`,
          }}
        />
        
        {/* Konten dengan efek fade-in */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
          <div 
            className={`transition-all duration-1000 ease-out ${
              isHeroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="flex items-center gap-3 mb-4">
              <Award size={40} className="text-blue-200" />
              <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
                Awards & Certifications
              </h1>
            </div>
            <p className="text-xl text-white max-w-3xl drop-shadow">
              PT. POMI Paiton Operation & Maintenance Indonesia has received numerous awards and certifications in various fields, demonstrating our commitment to excellence, safety, environmental management, and corporate social responsibility.
            </p>
          </div>
        </div>
      </div>

      {/* Awards Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentAwards.map((award) => (
            <AwardCard key={award.id} award={award} />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-2 mt-12">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>
          
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-4 py-2 rounded-md transition-colors ${
                currentPage === index + 1
                  ? 'bg-blue-600 text-white'
                  : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {index + 1}
            </button>
          ))}
          
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Next
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">© 2025 POMI - Paiton Operation & Maintenance Indonesia. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
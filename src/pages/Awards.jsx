import React, { useState, useRef, useEffect } from 'react';
import { Award, ChevronLeft, ChevronRight } from 'lucide-react';
import AwardCard from '../components/AwardCard';
import Modal from '../components/Modal';
import properUnit78 from '../assets/images/Sertifikat PROPER Unit 78 2015-2016.jpg'
import iga2024 from '../assets/images/IGA 2024.jpg'
import csrstar5 from '../assets/images/csr star 5.png'
import star4 from '../assets/images/CSR 4 star.png'
import stellar2022 from '../assets/images/piala hitam.png'
import greenproper from '../assets/images/green proper tropy.png' 
import smk3 from '../assets/images/SMK3.png'
import iso14001 from '../assets/images/14001.png'
import iso45001 from '../assets/images/45001.png'
import k3 from '../assets/images/K3.png'
import iso27001 from '../assets/images/27001.png'
import iso50001 from '../assets/images/50001.png'
import smp from '../assets/images/SMP.png'
import kesehatan from '../assets/images/bpjs kesehatan.jpg'
import siddhakarya from '../assets/images/siddhakarya.png'
import proper from '../assets/images/proper.png'
import iso55001 from '../assets/images/55001.png'
import aeo from '../assets/images/AEO.png'
// Background images
import awardsBg from '../assets/images/csr star 5.png';
import footerBg from '../assets/images/powerplant.jpg';

<style jsx>{`
  @keyframes cardFloat {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-8px) rotate(1deg); }
  }

  @keyframes cardGlow {
    0%, 100% {
      box-shadow: 0 4px 15px rgba(0,0,0,0.1);
      filter: brightness(1);
    }
    50% {
      box-shadow: 0 8px 25px rgba(59, 130, 246, 0.2);
      filter: brightness(1.05);
    }
  }

  @keyframes bgFloat {
    0%, 100% { background-position: center center; }
    25% { background-position: center top; }
    50% { background-position: center center; }
    75% { background-position: center bottom; }
  }

  @keyframes awardShimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }

  @keyframes bgZoom {
    0% { background-size: 100% 100%; }
    50% { background-size: 110% 110%; }
    100% { background-size: 100% 100%; }
  }
`}</style>

export default function Awards() {
  const [currentPage, setCurrentPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAward, setSelectedAward] = useState(null);

  function handleCardHover(a) {
    // Only open modal on hover/keyboard focus. Do not auto-close on leave.
    if (a) {
      setSelectedAward(a);
      setModalOpen(true);
    }
  }

  const awards = [
    {
      id: 1,
      title: "ISO 14001:2015",
      category: "Sertifikat Registrasi Sistem Manajemen Lingkungan",
      year: "2024",
      image: iso14001,
      description: "Sertifikat ini dikeluarkan oleh lembaga sertifikasi internasional Intertek SAI Global. Sertifikat ini menyatakan bahwa PT. Paiton Operation and Maintenance Indonesia (POMI) telah menerapkan dan menjalankan Sistem Manajemen Lingkungan yang memenuhi standar internasional ISO 14001:2015. Lingkup sertifikasi ini mencakup kegiatan operasi dan pemeliharaan Pembangkit Listrik Tenaga Uap (PLTU) Paiton Unit 3, 7 & 8. Perusahaan ini pertama kali mendapatkan sertifikasi ini pada 19 November 2003, yang menunjukkan komitmen jangka panjang terhadap pengelolaan lingkungan."
    },
    {
      id: 2,
      title: "Sistem Manajemen Kesehatan & Keselamatan Kerja (ISO 45001:2018)",
      category: "Sistem Manajemen Kesehatan & Keselamatan Kerja (Occupational Health & Safety Management System",
      year: "2024",
      image: iso45001,
      description: " Sertifikat ini dikeluarkan oleh lembaga sertifikasi internasional Intertek SAI Global. Sertifikat ini menjadi bukti bahwa PT. Paiton Operation and Maintenance Indonesia (POMI) telah menerapkan Sistem Manajemen Kesehatan & Keselamatan Kerja yang sesuai dengan standar internasional ISO 45001:2018. Lingkup sertifikasi ini mencakup kegiatan operasi dan pemeliharaan Pembangkit Listrik Tenaga Uap (PLTU) Paiton Unit 3, 7 & 8. Perusahaan ini pertama kali mendapatkan sertifikasi di bidang ini pada 23 Januari 2019"
    },
    {
      id: 3,
      title: "Sistem Manajemen Keamanan Informasi (ISO/IEC 27001:2022)",
      category: " Sistem Manajemen Keamanan Informasi (Information Security Management System - ISMS)",
      year: "2024",
      image: iso27001,
      description: "Sertifikat ini dikeluarkan oleh lembaga sertifikasi ternama BSI (British Standards Institution). Sertifikat ini menyatakan bahwa PT Paiton Operation & Maintenance Indonesia telah menerapkan Sistem Manajemen Keamanan Informasi yang memenuhi standar internasional ISO/IEC 27001:2022. Lingkup sertifikasi ini secara spesifik mencakup pengelolaan keamanan informasi dalam penyediaan infrastruktur Pusat Data (Data Centre). Pencapaian ini menunjukkan komitmen perusahaan dalam melindungi aset informasi dan data penting sesuai dengan praktik terbaik global."
    },
    {
      id: 4,
      title: "Sistem Manajemen Energi (ISO 50001:2018)",
      category: "Sistem Manajemen Energi (Energy Management System - EnMS)",
      year: "2024",
      image: iso50001,
      description: "Sertifikat ini dikeluarkan oleh lembaga sertifikasi BSI (British Standards Institution). Sertifikat ini menjadi bukti bahwa PT Paiton Operation & Maintenance Indonesia (POMI) telah menerapkan dan menjalankan Sistem Manajemen Energi yang memenuhi standar internasional ISO 50001:2018. Lingkup sertifikasi ini mencakup kegiatan Operasi dan Pemeliharaan Pembangkit Listrik dari Pembangkit Listrik Tenaga Uap (PLTU). Pencapaian ini menunjukkan komitmen perusahaan untuk meningkatkan efisiensi energi, mengurangi konsumsi, dan mengoptimalkan penggunaan energi secara berkelanjutan."
    },
    {
      id: 5,
      title: "ISO 55001:2014",
      category: "Sistem Manajemen Aset",
      year: "2014",
      image: iso55001,
      description: "Sertifikasi Sistem Manajemen Aset"
    },
    {
      id: 6,
      title: "Authorized Economic Operator (AEO)",
      category: "Occupational Health & Safety",
      year: "",
      image: aeo,
      description: "Otorisasi Operator Ekonomi Terpercaya dari Direktorat Jenderal Bea dan Cukai"
    },
    {
      id: 7,
      title: "SMK2",
      category: "Sistem Manajemen Keselamatan dan Ketenagalistrikan",
      year: "2024",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6RF_IK2xU5dGib9lY6AUoqKVlyNfHMW9d1A0bEyAMVBadfbsx7wO25xirN0YbRLpSC8I&usqp=CAU",
      description: "Penghargaan dari Direktorat Jenderal Ketenagalistrikan (DJK) ESDM"
    },
    {
      id: 8,
      title: "Sistem Manajemen Keselamatan dan Kesehatan Kerja (SMK3)",
      category: "Penerapan Sistem Manajemen K3 - Kategori Tingkat Lanjutan.",
      year: "2024",
      image: smk3,
      description: " Sertifikat ini merupakan penghargaan terbaru yang dianugerahkan oleh Menteri Ketenagakerjaan Republik Indonesia kepada PT. Paiton Operation & Maintenance Indonesia. Penghargaan ini diberikan sebagai pengakuan atas keberhasilan perusahaan dalam menerapkan kembali Sistem Manajemen Keselamatan dan Kesehatan Kerja (SMK3). Perusahaan berhasil meraih hasil audit 92,16%, yang kembali menempatkannya dalam kategori tingkat Lanjutan berdasarkan 166 kriteria penilaian. Ini merupakan pembaruan dari sertifikat serupa yang diterima pada tahun 2020."
    },
    {
      id: 9,
      title: "Penghargaan Program Penilaian Peringkat Kinerja Perusahaan (PROPER) dalam Pengelolaan Lingkungan Hidup",
      category: "Pengelolaan Lingkungan",
      year: "2015-2016",
      image: properUnit78,
      description: "Sertifikat ini dianugerahkan oleh Kementerian Lingkungan Hidup dan Kehutanan kepada PT. Paiton Energy Company sebagai pengakuan atas pencapaian peringkat \"Hijau\" dalam program PROPER periode 2015-2016, yang menilai kinerja perusahaan dalam pengelolaan lingkungan hidup."
    },
    {
      id: 10,
      title: "Tanda Penghargaan Penerapan Keselamatan dan Kesehatan Kerja (K3) Perkantoran.",
      category: " Penerapan K3 Perkantoran (Kategori Kantor Kementerian/ BUMN/ Swasta)",
      year: "2023",
      image: k3,
      description: "Penghargaan ini dianugerahkan oleh Menteri Kesehatan Republik Indonesia kepada PT. Paiton Operation And Maintenance Indonesia. Penghargaan ini diberikan sebagai pengakuan atas keberhasilan perusahaan dalam menerapkan standar Keselamatan dan Kesehatan Kerja (K3) secara spesifik di lingkungan perkantoran. Ini menunjukkan komitmen perusahaan terhadap kesehatan dan keselamatan tidak hanya di area operasional pabrik, tetapi juga di area fasilitas kantor."
    },
    {
      id: 11,
      title: "TOP CSR Awards 2023",
      category: "CSR Innovation Programs for Sustainable Business Growth",
      year: "2023",
      image: csrstar5,
      description: "TOP CSR Awards 2023 merupakan ajang penghargaan yang diselenggarakan oleh Majalah Top Business guna memberikan apresiasi dan penghargaan tertinggi kepada PT. POMI (Paiton Operation & Maintenance Indonesia) yang dinilai berhasil dalam menjalankan program CSR dengan pendekatan penciptaan nilai manfaat bersama berhasil."
    },
    {
      id: 12,
      title: "Stellar Workplace Award DX® 2022",
      category: "Stellar Workplace Recognition in Employee Commitment & Satisfaction",
      year: "2022",
      image: stellar2022,
      description: "Piala penghargaan yang diberikan kepada PT Paiton Energy sebagai pengakuan atas komitmen dan kepuasan karyawan dalam ajang Stellar Workplace Award DX® 2022."
    },
     {
      id: 13,
      title: "Sertifikat Penghargaan Nasional Lingkungan Hidup - Indonesia Green Awards (IGA) 2024",
      category: " Penanganan Sampah Plastik, Program: Sosialisasi Popok to The Post from Waste to Best, Nilai: 8,5",
      year: "2024",
  image: iga2024,
      description: " Sertifikat ini diberikan kepada PT Paiton Energy sebagai \"The Promising\" karena telah meraih penghargaan dalam kategori penanganan sampah plastik melalui program sosialisasi \"Popok to The Post from Waste to Best\" pada ajang Indonesia Green Awards 2024."
    },
     {
      id: 14,
      title: " Peringkat Hijau Program Penilaian Peringkat Kinerja Perusahaan (PROPER) 2017-2018",
      category: "Pengelolaan Lingkungan Hidup",
      year: "2018",
      image: greenproper,
      description: "Piala ini menandakan pencapaian Peringkat Hijau dalam Program Penilaian Peringkat Kinerja Perusahaan (PROPER) periode 2017-2018 yang diberikan oleh Kementerian Lingkungan Hidup dan Kehutanan.",
    },
  {
      id: 15,
      title: "Sistem Manajemen Pengamanan (SMP)",
      category: "Sistem Manajemen Pengamanan Swakarsa dengan predikat Gold Reward",
      year: "2023", 
      image: smp,
      description: "Sertifikat ini dianugerahkan oleh Kepala Kepolisian Negara Republik Indonesia (Kapolri) kepada PT Paiton Operation & Maintenance Indonesia. Penghargaan ini diberikan sebagai pengakuan atas keberhasilan perusahaan dalam menerapkan Sistem Manajemen Pengamanan Swakarsa sesuai dengan Peraturan Kepolisian Nomor 7 Tahun 2019. Pencapaian predikat Gold Reward merupakan level penghargaan tertinggi dalam audit ini, yang menandakan keunggulan perusahaan dalam mengelola sistem keamanan secara mandiri di lingkungannya."
    },

   {
      id: 16,
      title: "TOP CSR Awards 2022",
      category: "Best CSR Program",
      year: "2022",
      image: star4,
      description: "Piala ini adalah penghargaan TOP CSR Awards 2022 dengan peringkat Bintang 4 yang diberikan kepada PT Paiton Energy - PT POMI."
    },
    {
      id: 17,
      title: "CSR Indonesia Award",
      category: "Karsa Budaya Prima Gold",
      year: "2022",
      image: "https://csr-indonesia.com/wp-content/uploads/2022/03/2022_CSRINDONSIAAWARDS-640x562.jpg",
      description: "Penghargaan dari Meprindo Communication dan Media CSR Indonesia Magazine"
    },
    {
      id: 18,
      title: "Zero Accident Award",
      category: "Keselamatan dan Kesehatan Kerja (K3) / Pencegahan Kecelakaan Kerja",
      year: "2022",
      image: "https://media.licdn.com/dms/image/v2/D5622AQEeynFlWVRqoQ/feedshare-shrink_1280/B56ZYTqbigHoAo-/0/1744086612772?e=1762992000&v=beta&t=CtpVQNEsEZJIfwdX6teX0tHG6udFhSyxvsfNq6oI9mw",
      description: "Diberikan oleh Gubernur Jawa Timur kepada PT Paiton Operation & Maintenance Indonesia atas keberhasilannya menerapkan standar K3 secara efektif. Perusahaan berhasil mempertahankan zero accident (tanpa kecelakaan kerja) dan tanpa Penyakit Akibat Kerja (PAK) selama tiga tahun berturut-turut, serta memperoleh sertifikat SMK3 tingkat Emas. Penghargaan ini menjadi bukti komitmen perusahaan dalam menjaga lingkungan kerja yang aman dan sehat."
    },
        {
      id: 19,
      title: "HIV/AIDS Prevention and Control Program Award",
      category: "Program Pencegahan dan Pengendalian HIV/AIDS di Tempat Kerja",
      year: "2025",
      image: "https://media.licdn.com/dms/image/v2/D5622AQEQU5h95c2mYg/feedshare-shrink_1280/B56ZW4sFL8HoAs-/0/1742560319083?e=1762992000&v=beta&t=54bX9n6hCF9pbfr76KGn8PwupkpHguXL9-Wfyhqx_-8",
      description: "Pada 14 Februari 2025, Gubernur Jawa Timur memberikan penghargaan kepada PT Paiton Operation and Maintenance Indonesia – PT Paiton Energy atas keberhasilannya dalam menerapkan Program Pencegahan dan Pengendalian HIV/AIDS di Tempat Kerja. Penghargaan ini diberikan di Kantor Disnaker Korwil Probolinggo."
    },
       {
      id: 20,
      title: "PROPER (Corporate Performance Rating Program) – Green Rating",
      category: "Lingkungan dan Tanggung Jawab Sosial (Environmental and Social Management)",
      year: "2024",
      image: proper,
      description: "PT Paiton Energy – PT Paiton Operation and Maintenance Indonesia (POMI) meraih peringkat Hijau (Green Rating) dalam Program Penilaian Peringkat Kinerja Perusahaan (PROPER) dari Kementerian Lingkungan Hidup Republik Indonesia. Penghargaan ini diserahkan pada Upacara Penghargaan PROPER di Sasono Langen Budoyo, Taman Mini Indonesia Indah, Jakarta, pada 24 Februari 2025."
    },
      {
      id: 21,
      title: "EBTKE Award – Energy Efficiency in Energy Efficient Buildings Category",
      category: "Efisiensi Energi / Bangunan Hemat Energi",
      year: "2024",
      image: "https://media.licdn.com/dms/image/v2/D5622AQF1RGszNIy1QA/feedshare-shrink_2048_1536/B56ZUdbG3yGUAs-/0/1739955401266?e=1762992000&v=beta&t=KGWdoelsUAtLmUFUuI-1zWHBVaSg1pO5JUM0tnSHJ50",
      description: "PT Paiton Operation and Maintenance Indonesia (POMI) meraih penghargaan EBTKE Award 2024 dalam kategori Efisiensi Energi / Bangunan Hemat Energi. Penghargaan ini diberikan oleh Kementerian Energi dan Sumber Daya Mineral Republik Indonesia pada acara Malam Anugerah EBTKE 2024 di Jakarta, pada 24 Februari 2025."
    },
    {
      id: 22,
      title: "Siddhakarya Award",
      category: "Produktivitas Perusahaan",
      year: "2024",
      image: siddhakarya,
      description: "PT Paiton Operation and Maintenance Indonesia (POMI) meraih penghargaan Siddhakarya Award 2024 dalam kategori Produktivitas Perusahaan. Penghargaan ini diberikan oleh Kementerian Ketenagakerjaan Republik Indonesia pada acara Malam Anugerah Siddhakarya 2024 di Jakarta, pada 24 Februari 2025."
    },
    {
      id: 23,
      title: "CSR Award",
      category: "Tanggung Jawab Sosial Perusahaan",
      year: "2024",
      image: "https://media.licdn.com/dms/image/v2/D5622AQFpBKn_xCFhFg/feedshare-shrink_2048_1536/B56ZQVECIEH0Ao-/0/1735520170684?e=1762992000&v=beta&t=7z_NUUJRAOK7b6xlScgM52m7klNhaXb3woD-RHL8OHo",
      description: "PT Paiton Operation and Maintenance Indonesia (POMI) meraih penghargaan CSR Award 2024 dalam kategori Tanggung Jawab Sosial Perusahaan. Penghargaan ini diberikan oleh Kementerian Ketenagakerjaan Republik Indonesia pada acara Malam Anugerah CSR 2024 di Jakarta, pada 24 Februari 2025."
    },
    {
      id: 24,
      title: "EDGE Final Certification – Green Building Council Indonesia",
      category: "Bangunan Hijau / Efisiensi Energi dan Sumber Daya",
      year: "2024",
      image: "https://media.licdn.com/dms/image/v2/D4E22AQE4XRLiYWiP3Q/feedshare-shrink_800/feedshare-shrink_800/0/1722907960279?e=1762992000&v=beta&t=V9M5RK7ePfMdDv9eXKSmRa-ogkzb9IgyfUGbtGgwf7Y",
      description: "PT Paiton Operation and Maintenance Indonesia (POMI) meraih sertifikasi EDGE Final 2024 dari Green Building Council Indonesia. Sertifikasi ini diberikan atas komitmen POMI dalam menerapkan praktik bangunan hijau dan efisiensi energi di seluruh operasionalnya."
    },
    {
      id: 25,
      title: "Kepesertaan BPJS Kesehatan",
      category: "Bangunan Hijau / Efisiensi Energi dan Sumber Daya",
      year: "2023 ",
      image: kesehatan,
      description: "Sertifikat ini menunjukkan keikutsertaan 100% karyawan dan anggota keluarganya dari Paiton Operation and Maintenance Indonesia, PT dalam program Jaminan Kesehatan Nasional - Kartu Indonesia Sehat (JKN-KIS)."
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
  const [visibleSections, setVisibleSections] = useState({});

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

  // Intersection Observer for sections
  useEffect(() => {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => ({
              ...prev,
              [entry.target.id]: true
            }));
          }
        });
      },
      { threshold: 0.2, rootMargin: '-50px' }
    );

    // Observe all sections
    const sections = document.querySelectorAll('[data-section]');
    sections.forEach(section => sectionObserver.observe(section));

    return () => sectionObserver.disconnect();
  }, []);

  return (
    <>
 {/* Hero Section */}
      <div 
        ref={heroRef}
        className="relative h-[40vh] sm:h-[50vh] lg:h-[60vh] min-h-[300px] sm:min-h-[400px] overflow-hidden"
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
          <div className={`transition-all duration-1000 ease-out ${isHeroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="mb-8">
              <h2 className="text-3xl md:text-5xl font-extrabold text-white drop-shadow-2xl mb-2 transform transition-all duration-700 ease-out text-center" style={{ transform: isHeroVisible ? 'translateY(-12px)' : 'translateY(0)' }}>{'Awards & Certifications'}</h2>
              <p className="text-lg md:text-xl text-white max-w-3xl mx-auto text-center drop-shadow-2xl" style={{ transform: isHeroVisible ? 'translateY(-6px)' : 'translateY(0)' }}>
                PT. POMI Paiton Operation & Maintenance Indonesia has received numerous awards and certifications in various fields, demonstrating our commitment to excellence, safety, environmental management, and corporate social responsibility.
              </p>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-20">
          <Award size={24} className="text-white rotate-90" />
        </div>

        {/* Animated overlay particles */}
        <div className="absolute inset-0 pointer-events-none z-10">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-yellow-300/30 rounded-full animate-ping"></div>
          <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-blue-300/40 rounded-full animate-pulse delay-1000"></div>
          <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-white/20 rounded-full animate-bounce delay-500"></div>
          <div className="absolute top-2/3 right-1/4 w-1 h-1 bg-yellow-200/35 rounded-full animate-pulse delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 w-0.5 h-0.5 bg-white/50 rounded-full animate-ping delay-3000"></div>
        </div>
      </div>

      {/* Awards Grid */}
      <div 
        id="awards-section"
        data-section
        className={`max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-8 sm:py-12 transition-all duration-1000 ${
          visibleSections['awards-section'] 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8'
        }`}
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.95), rgba(255,255,255,0.95)), 
                           linear-gradient(rgba(59, 130, 246, 0.02), rgba(59, 130, 246, 0.02)), 
                           url('${awardsBg}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          animation: visibleSections['awards-section'] ? 'bgFloat 20s ease-in-out infinite' : 'none'
        }}
      >
        <div className="rounded-2xl overflow-hidden bg-gradient-to-b from-white via-sky-50 to-white shadow-lg p-4 sm:p-6 lg:p-8">
          <div className="max-w-4xl mx-auto text-center mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">Our Certifications & Awards</h2>
            <p className="text-gray-600 mt-2 text-sm sm:text-base">A curated showcase of our certifications, recognitions and achievements.</p>
          </div>

          <div className="relative">
            {/* hover-to-open modal behavior; no preview panel */}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 auto-rows-[1fr] items-stretch">
              {currentAwards.map((award, index) => (
                  <div 
                    key={award.id} 
                    className={`transform transition-all duration-500 hover:scale-105 h-full ${
                      visibleSections['awards-section'] 
                        ? 'opacity-100 translate-y-0' 
                        : 'opacity-0 translate-y-8'
                    }`}
                    style={{
                      transitionDelay: visibleSections['awards-section'] ? `${index * 150}ms` : '0ms',
                      animation: visibleSections['awards-section'] 
                        ? `cardFloat 8s ease-in-out infinite ${index * 0.8}s, cardGlow 6s ease-in-out infinite ${index * 0.5}s` 
                        : 'none'
                    }}
                  >
                    <AwardCard award={award} onOpen={(a) => { setSelectedAward(a); setModalOpen(true); }} onHover={handleCardHover} />
                  </div>
                ))}
            </div>
          </div>
        {/* Section-level Modal (single instance) */}
        <Modal wide={true} open={modalOpen} onClose={() => setModalOpen(false)} title={selectedAward?.title}>
          {selectedAward ? (
            <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
              <div className="lg:w-2/3 w-full bg-gray-50 flex items-center justify-center">
                <img src={selectedAward.image} alt={selectedAward.title} className="w-full h-auto max-h-[50vh] sm:max-h-[60vh] lg:max-h-[70vh] object-contain" />
              </div>
              <div className="lg:w-1/3 w-full">
                <div className="mb-2 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full self-start">{selectedAward.category}</span>
                  <h4 className="text-base sm:text-lg font-semibold">{selectedAward.title}</h4>
                </div>
                <p className="text-sm text-gray-700 whitespace-pre-line">{selectedAward.description}</p>
                <div className="mt-4 text-xs text-gray-500">Year: {selectedAward.year}</div>
              </div>
            </div>
          ) : null}
        </Modal>
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-3 sm:gap-4 mt-8 sm:mt-12">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="group flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 hover:border-gray-300 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:border-gray-200 transition-all duration-200 hover:shadow-sm"
          >
            <ChevronLeft size={16} className="transition-transform duration-200 group-hover:-translate-x-0.5" />
            <span className="font-medium">Previous</span>
          </button>
          
          <div className="flex gap-1">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                onClick={() => setCurrentPage(index + 1)}
                className={`px-3 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105 ${
                  currentPage === index + 1
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
          
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="group flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 hover:border-gray-300 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:border-gray-200 transition-all duration-200 hover:shadow-sm"
          >
            <span className="font-medium">Next</span>
            <ChevronRight size={16} className="transition-transform duration-200 group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer 
        className="bg-gray-800 text-white py-6 sm:py-8 mt-12 sm:mt-16"
        style={{
          backgroundImage: `linear-gradient(rgba(31, 41, 55, 0.95), rgba(31, 41, 55, 0.95)), 
                           linear-gradient(rgba(59, 130, 246, 0.1), rgba(59, 130, 246, 0.1)), 
                           url('${footerBg}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          animation: 'bgZoom 25s ease-in-out infinite'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400 text-sm sm:text-base">© 2025 POMI - Paiton Operation & Maintenance Indonesia. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
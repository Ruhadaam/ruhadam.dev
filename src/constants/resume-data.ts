export interface ResumeItem {
  id: string;
  type: "experience" | "education";
  title: string;
  organization: string;
  location?: string;
  startDate: string;
  endDate: string;
  description: string[];
  technologies?: string[];
}

export const resumeData: ResumeItem[] = [
  {
    id: "exp-1",
    type: "experience",
    title: "Ön Uç Geliştirici",
    organization: "JuniusTech",
    location: "Uzaktan",
    startDate: "Şub 2026",
    endDate: "Devam ediyor",
    description: [
      "Modern web teknolojileri ile kullanıcı arayüzü geliştirme.",
      "React.js ve Next.js ekosisteminde performans odaklı çözümler.",
      "Ekip içi kod standartlarını iyileştirme ve modernizasyon."
    ],
    technologies: ["React.js", "Next.js", "TypeScript"]
  },
  {
    id: "exp-2",
    type: "experience",
    title: "Mobil Uygulama Geliştirici",
    organization: "JuniusTech",
    location: "Yarı zamanlı",
    startDate: "Ara 2024",
    endDate: "Devam ediyor",
    description: [
      "Cross-platform mobil uygulama geliştirme süreçlerinin yönetimi.",
      "Kullanıcı deneyimini (UX) ön planda tutan arayüz tasarımları.",
      "API entegrasyonları ve veri senkronizasyonu."
    ],
    technologies: ["React Native", "Expo", "Redux", "Firebase"]
  },
  {
    id: "exp-3",
    type: "experience",
    title: "Grafik Tasarımcı",
    organization: "Kıvırcık Paspas",
    location: "Tam zamanlı",
    startDate: "Eyl 2024",
    endDate: "Nis 2025",
    description: [
      "Marka kimliği ve dijital varlıkların tasarımı.",
      "Sosyal medya ve reklam içerikleri üretimi.",
      "Baskı öncesi hazırlık ve tasarım süreçleri."
    ],
    technologies: ["Photoshop", "Illustrator", "Figma"]
  },
  {
    id: "exp-4",
    type: "experience",
    title: "Web Designer",
    organization: "Seta Meda",
    location: "Yarı zamanlı",
    startDate: "Eyl 2022",
    endDate: "Şub 2023",
    description: [
      "Kullanıcı odaklı web sitesi tasarımları.",
      "Responsive (duyarlı) tasarım prensiplerinin uygulanması.",
      "UI bileşen kütüphaneleri oluşturma."
    ],
    technologies: ["CSS", "Photoshop", "HTML"]
  },
  {
    id: "edu-1",
    type: "education",
    title: "Bilgisayar Programcılığı",
    organization: "Ankara Üniversitesi",
    location: "Ankara, TR",
    startDate: "2021",
    endDate: "Tem 2023",
    description: [
      "Algoritmalar ve Veri Yapıları üzerine temel eğitim.",
      "Web ve mobil uygulama geliştirme temelleri."
    ]
  }
];

export const skills = [
  "React.js", "Next.js", "React Native", "TypeScript", 
  "Tailwind CSS", "Framer Motion", "Expo", "Redux",
  "Node.js", "Firebase", "Photoshop", "Figma", 
  "Illustrator", "UI/UX Design", "Git", "REST APIs"
];

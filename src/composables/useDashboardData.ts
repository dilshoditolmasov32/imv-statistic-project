import { ref } from 'vue';
import type { StatCard, BottomCard, AdditionalStat } from "../interface/Dashboard";
import organazationIcon from "../assets/icons/organazation.svg"
import eyeIcon from "../assets/icons/eye.svg"
import cancelIcon from "../assets/icons/cancel.svg"
import peopleIcon from "../assets/icons/people.svg"
import bugIcon from "../assets/icons/bug.svg"
import workerIcon from "../assets/icons/worker.svg"
import studyIcon from "../assets/icons/study.svg"
export function useDashboardData() {
  const statsCards = ref<StatCard[]>([
    {
      id: '1',
      title: "Resedragi tashkilotlar soni",
      value: 214,
      change: 0,
      icon: organazationIcon,
      color: '#6366F1',
      bgColor: '#528BFF'
    },
    {
      id: '2',
      title: "Ariza yuborgan tashkilotlar soni",
      value: 721,
      change: 2,
      icon: studyIcon,
      color: '#10B981',
      bgColor: '#17B26A'
    },
    {
      id: '3',
      title: "Ariza berilgan yo'nalishlar soni",
      value: 721,
      change: 2,
      icon: eyeIcon,
      color: '#8B5CF6',
      bgColor: '#7A5AF8'
    },
    {
      id: '4',
      title: "Buyurtma berilgan ehtiyoj soni",
      value: 721,
      change: 2,
      icon: cancelIcon,
      color: '#EF4444',
      bgColor: '#F04438'
    }
  ]);


  const topBuyers = ref({
    title: "Buyurtma berilgan ehtiyojlar soni",
    value: 4000,
    change: -1.4,
    label: "O'tgan yilga nisbatan",
    detail: "Batafail"
  });

  const additionalStats = ref<AdditionalStat[]>([
    {
      title: "Yangi loyihalari amalga oshirish hisoblga",
      value: 1800,
      change: -3.2,
      isPositive: false
    },
    {
      title: "Amalda mavjud quvvatlarni modernizatsiya qilish hisoblga",
      value: 250,
      change: -6.4,
      isPositive: false
    },
    {
      title: "Boshqa yo'nalishlar hisobiga ehtiyojlar soni",
      value: 775,
      change: 0.8,
      isPositive: true
    }
  ]);

  const jobRequestCards = ref<BottomCard[]>([
    {
      id: '1',
      title: "Bitiruvchi talabalar talabalar soni",
      description: "Ma'lumotlar shakllantirilmoqda",
      icon: studyIcon,
      color: '#F59E0B',
      bgColor: '#EAAA08'
    },
    {
      id: '2',
      title: "Ish joyiga ega bo'lmagan talabalar",
      description: "Ma'lumotlar shakllantirilmoqda",
      icon: peopleIcon,
      color: '#10B981',
      bgColor: '#15B79E'
    }
  ]);

  const internshipCards = ref<BottomCard[]>([
    {
      id: '1',
      title: "Rasman band bo'lgan aholi",
      description: "Ma'lumotlar shakllantirilmoqda",
      icon: workerIcon,
      color: '#8B5CF6',
      bgColor: '#875BF7 '
    },
    {
      id: '2',
      title: "Mavjud bo'sh ish o'rinlari",
      description: "Ma'lumotlar shakllantirilmoqda",
      icon: bugIcon,
      color: '#F59E0B',
      bgColor: '#F79009 '
    }
  ]);

  return {
    statsCards,
    topBuyers,
    additionalStats,
    jobRequestCards,
    internshipCards
  };
}
export interface StatCard {
  id: string;
  title: string;
  value: number;
  change: number;
  icon: string;
  color: string;
  bgColor: string;
}




export interface BottomCard {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  bgColor: string;
}

export interface AdditionalStat {
  title: string;
  value: number;
  change: number;
  isPositive: boolean;
}

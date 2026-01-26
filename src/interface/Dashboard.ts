export interface StatCard {
  id: string;
  title: string;
  value: number;
  change: number;
  icon: string;
  color: string;
  bgColor: string;
}
export interface RegionDetail {
  label: string;
  value: string | number;
  color: string;
}

export interface RegionData {
  id: number;           
  name: string;       
  isActive: boolean;    
  details: RegionDetail[]; 
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

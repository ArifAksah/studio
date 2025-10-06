import type { LucideIcon } from 'lucide-react';
import {
  ShoppingCart,
  Utensils,
  Home,
  Car,
  Heart,
  Briefcase,
  GraduationCap,
  Gift,
  Dices,
  CircleDollarSign,
  Landmark,
} from 'lucide-react';

export const CATEGORIES: { value: string; label: string; icon: LucideIcon; type: 'income' | 'expense' }[] = [
  { value: 'salary', label: 'Salary', icon: Landmark, type: 'income' },
  { value: 'groceries', label: 'Groceries', icon: ShoppingCart, type: 'expense' },
  { value: 'food', label: 'Food & Dining', icon: Utensils, type: 'expense' },
  { value: 'housing', label: 'Housing', icon: Home, type: 'expense' },
  { value: 'transportation', label: 'Transportation', icon: Car, type: 'expense' },
  { value: 'health', label: 'Health', icon: Heart, type: 'expense' },
  { value: 'work', label: 'Work', icon: Briefcase, type: 'expense' },
  { value: 'education', label: 'Education', icon: GraduationCap, type: 'expense' },
  { value: 'gifts', label: 'Gifts', icon: Gift, type: 'expense' },
  { value: 'entertainment', label: 'Entertainment', icon: Dices, type: 'expense' },
  { value: 'other', label: 'Other', icon: CircleDollarSign, type: 'expense' },
];

export function getCategoryInfo(value: string) {
  return CATEGORIES.find(c => c.value === value);
}

import React, { useState } from 'react';
import { 
  ChevronRight, 
  Coins, 
  Calculator, 
  HelpCircle, 
  Info,
  Sparkles,
  Check
} from 'lucide-react';
import { ActiveScreen, Language } from '../types';

interface ZakatScreenProps {
  onNavigate: (screen: ActiveScreen) => void;
  lang: Language;
}

export const ZakatScreen: React.FC<ZakatScreenProps> = ({ onNavigate, lang }) => {
  const [currency, setCurrency] = useState<'USD' | 'TRY' | 'SAR' | 'EUR'>('USD');
  const [cash, setCash] = useState<number>(5000);
  const [goldGrams, setGoldGrams] = useState<number>(20);
  const [silverGrams, setSilverGrams] = useState<number>(0);
  const [businessStock, setBusinessStock] = useState<number>(2000);
  const [liabilities, setLiabilities] = useState<number>(500);

  // Gold price per gram approximate
  const goldPricePerGram = currency === 'USD' ? 75 : currency === 'TRY' ? 2500 : currency === 'SAR' ? 280 : 70;
  const silverPricePerGram = currency === 'USD' ? 0.95 : currency === 'TRY' ? 32 : currency === 'SAR' ? 3.5 : 0.90;
  
  // Nisab: 85g gold or 595g silver
  const goldNisabThreshold = 85 * goldPricePerGram;

  // Total wealth eligible
  const totalGoldVal = goldGrams * goldPricePerGram;
  const totalSilverVal = silverGrams * silverPricePerGram;
  const totalWealth = Math.max(0, cash + totalGoldVal + totalSilverVal + businessStock - liabilities);

  const isEligible = totalWealth >= goldNisabThreshold;
  const zakatDue = isEligible ? totalWealth * 0.025 : 0; // 2.5%

  const currencySymbol = currency === 'USD' ? '$' : currency === 'TRY' ? '₺' : currency === 'SAR' ? 'SR' : '€';

  return (
    <div className="relative min-h-full flex flex-col justify-between bg-[#07111E] text-white overflow-hidden pb-12 select-none font-arabic">
      
      {/* Background Decor */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B1A2E] via-[#07111E] to-[#040810] pointer-events-none" />

      <div className="relative z-10 flex flex-col h-full px-3.5 pt-1.5">
        
        {/* Header */}
        <div className="flex items-center justify-between py-1.5 border-b border-[#D4AF37]/20">
          <button 
            onClick={() => onNavigate('home')}
            className="w-9 h-9 rounded-full bg-[#0D1E30] border border-[#D4AF37]/35 flex items-center justify-center text-[#FFEAA7] hover:border-[#D4AF37] transition-all cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div className="text-center">
            <h2 className="text-lg font-bold font-quran gold-text">
              {lang === 'ug' ? 'ئېلېكترونلۇق زوكات ھېسابلىغۇچ' : lang === 'ar' ? 'حاسبة الزكاة الذكية' : lang === 'tr' ? 'Zekat Hesaplayıcı' : 'Smart Zakat Calculator'}
            </h2>
            <span className="text-[11px] text-gray-400">
              {lang === 'ug' ? 'نەق پۇل، ئالتۇن ۋە مال-مۈلۈك زوكاتى' : '2.5% Wealth Purification'}
            </span>
          </div>

          {/* Currency selector */}
          <select 
            value={currency}
            onChange={(e) => setCurrency(e.target.value as any)}
            className="bg-[#0D1E30] border border-[#D4AF37]/40 rounded-xl px-2 py-1 text-xs text-[#FFEAA7] font-bold outline-none cursor-pointer"
          >
            <option value="USD">USD ($)</option>
            <option value="TRY">TRY (₺)</option>
            <option value="SAR">SAR (ر.س)</option>
            <option value="EUR">EUR (€)</option>
          </select>
        </div>

        {/* Zakat Result Hero Card */}
        <div className="my-2.5 p-3.5 rounded-3xl bg-[#09182A]/90 border-2 border-[#D4AF37]/55 shadow-[0_0_25px_rgba(212,175,55,0.15)] relative overflow-hidden backdrop-blur-md">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs text-[#D4AF37] font-bold block mb-0.5">
                {lang === 'ug' ? 'چىقىرىلىدىغان زوكات مىقدارى (2.5%):' : 'Zakat Amount Payable (2.5%):'}
              </span>
              <div className="text-3xl font-extrabold text-white font-mono">
                {currencySymbol} {zakatDue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
            </div>

            <div className={`px-3 py-1 rounded-full text-xs font-bold border ${
              isEligible ? 'bg-emerald-950/80 border-emerald-500 text-emerald-400' : 'bg-gray-800/80 border-gray-600 text-gray-400'
            }`}>
              {isEligible ? (lang === 'ug' ? '✓ نىسابقا يەتتى (زوكات پەرز)' : 'Nisab Reached') : (lang === 'ug' ? 'نىسابقا يەتمىدى' : 'Below Nisab')}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-2.5 pt-2.5 border-t border-white/10 text-[11px] text-gray-300">
            <div>
              <span className="text-gray-400 block">{lang === 'ug' ? 'ھېسابلانغان ساپ مال:' : 'Net Wealth:'}</span>
              <span className="font-bold text-[#FFEAA7] font-mono">{currencySymbol} {totalWealth.toLocaleString()}</span>
            </div>
            <div>
              <span className="text-gray-400 block">{lang === 'ug' ? 'ئالتۇن نىسابى (85 گرام):' : 'Nisab Threshold:'}</span>
              <span className="font-bold text-[#93C5FD] font-mono">{currencySymbol} {goldNisabThreshold.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Inputs List */}
        <div className="flex-1 overflow-y-auto space-y-2 pr-0.5 max-h-[35vh]">
          
          {/* 1. Cash */}
          <div className="p-2.5 rounded-2xl bg-[#081524] border border-white/10 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-gray-200 block">
                {lang === 'ug' ? 'نەق پۇل ۋە بانكا ھېساباتى' : 'Cash & Bank Balance'}
              </span>
              <span className="text-[10px] text-gray-400">بانكىدىكى ياكى ياندىكى پۇل</span>
            </div>
            <div className="flex items-center gap-1 bg-[#06101B] border border-white/15 px-2.5 py-1 rounded-xl">
              <span className="text-xs text-[#D4AF37] font-bold">{currencySymbol}</span>
              <input 
                type="number"
                value={cash || ''}
                onChange={(e) => setCash(parseFloat(e.target.value) || 0)}
                className="w-20 bg-transparent text-right font-mono font-bold text-xs text-white outline-none"
              />
            </div>
          </div>

          {/* 2. Gold */}
          <div className="p-2.5 rounded-2xl bg-[#081524] border border-white/10 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-gray-200 block">
                {lang === 'ug' ? 'ئالتۇن مىقدارى (گرام)' : 'Gold (Grams)'}
              </span>
              <span className="text-[10px] text-gray-400">1 گرام = {currencySymbol}{goldPricePerGram}</span>
            </div>
            <div className="flex items-center gap-1 bg-[#06101B] border border-white/15 px-2.5 py-1 rounded-xl">
              <input 
                type="number"
                value={goldGrams || ''}
                onChange={(e) => setGoldGrams(parseFloat(e.target.value) || 0)}
                className="w-16 bg-transparent text-right font-mono font-bold text-xs text-white outline-none"
              />
              <span className="text-xs text-gray-400">g</span>
            </div>
          </div>

          {/* 3. Silver */}
          <div className="p-2.5 rounded-2xl bg-[#081524] border border-white/10 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-gray-200 block">
                {lang === 'ug' ? 'كۈمۈش مىقدارى (گرام)' : 'Silver (Grams)'}
              </span>
              <span className="text-[10px] text-gray-400">1 گرام = {currencySymbol}{silverPricePerGram}</span>
            </div>
            <div className="flex items-center gap-1 bg-[#06101B] border border-white/15 px-2.5 py-1 rounded-xl">
              <input 
                type="number"
                value={silverGrams || ''}
                onChange={(e) => setSilverGrams(parseFloat(e.target.value) || 0)}
                className="w-16 bg-transparent text-right font-mono font-bold text-xs text-white outline-none"
              />
              <span className="text-xs text-gray-400">g</span>
            </div>
          </div>

          {/* 4. Business stock */}
          <div className="p-2.5 rounded-2xl bg-[#081524] border border-white/10 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-gray-200 block">
                {lang === 'ug' ? 'تىجارەت ماللىرى قىممىتى' : 'Business Inventory'}
              </span>
              <span className="text-[10px] text-gray-400">سېتىلىدىغان تاۋارلار</span>
            </div>
            <div className="flex items-center gap-1 bg-[#06101B] border border-white/15 px-2.5 py-1 rounded-xl">
              <span className="text-xs text-[#D4AF37] font-bold">{currencySymbol}</span>
              <input 
                type="number"
                value={businessStock || ''}
                onChange={(e) => setBusinessStock(parseFloat(e.target.value) || 0)}
                className="w-20 bg-transparent text-right font-mono font-bold text-xs text-white outline-none"
              />
            </div>
          </div>

          {/* 5. Liabilities */}
          <div className="p-2.5 rounded-2xl bg-[#081524] border border-white/10 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-gray-200 block">
                {lang === 'ug' ? 'قەرز ۋە مەجبۇرىيەت چىقىمى' : 'Debts / Liabilities (-)'}
              </span>
              <span className="text-[10px] text-gray-400">چىقىرىۋېتىلىدىغان قەرز</span>
            </div>
            <div className="flex items-center gap-1 bg-[#06101B] border border-white/15 px-2.5 py-1 rounded-xl">
              <span className="text-xs text-red-400 font-bold">- {currencySymbol}</span>
              <input 
                type="number"
                value={liabilities || ''}
                onChange={(e) => setLiabilities(parseFloat(e.target.value) || 0)}
                className="w-20 bg-transparent text-right font-mono font-bold text-xs text-white outline-none"
              />
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

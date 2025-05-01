
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

interface LanguageProviderProps {
  children: ReactNode;
}

// Create context
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translations
const translations = {
  en: {
    // Common
    appName: "Smart Contracts Dashboard",
    darkMode: "Dark Mode",
    logout: "Logout",
    login: "Login",
    settings: "Settings",
    language: "Language",
    search: "Search",
    notifications: "Notifications",

    // Dashboard
    dashboard: "Dashboard",
    overview: "Overview",
    statistics: "Statistics",
    welcome: "Welcome to Smart Contracts Dashboard",
    recentActivity: "Recent Activity",
    quickActions: "Quick Actions",

    // Domains
    domains: "Domains",
    createDomain: "Create Domain",
    domainName: "Domain Name",
    domainDescription: "Domain Description",
    stage: "Stage",
    maxStage: "Max Stage",
    startTime: "Start Time",
    endTime: "End Time",
    active: "Active",
    inactive: "Inactive",
    manage: "Manage",
    view: "View",
    edit: "Edit",
    delete: "Delete",
    save: "Save",
    cancel: "Cancel",
    confirm: "Confirm",
    
    // Voting
    voting: "Voting",
    proposals: "Proposals",
    createProposal: "Create Proposal",
    activeProposals: "Active Proposals",
    completedProposals: "Completed Proposals",
    proposalTitle: "Proposal Title",
    proposalDescription: "Proposal Description",
    votingPeriod: "Voting Period",
    vote: "Vote",
    approve: "Approve",
    reject: "Reject",
    abstain: "Abstain",
    votingProgress: "Voting Progress",
    votingResults: "Voting Results",
    votesFor: "Votes For",
    votesAgainst: "Votes Against",
    
    // Rewards
    rewards: "Rewards",
    createReward: "Create Reward",
    myRewards: "My Rewards",
    availableRewards: "Available Rewards",
    rewardName: "Reward Name",
    pointsCost: "Points Cost",
    claim: "Claim",
    claimed: "Claimed",
    yourPoints: "Your Points",
    rewardHistory: "Reward History",

    // Settings
    accountSettings: "Account Settings",
    securitySettings: "Security Settings",
    notificationSettings: "Notification Settings",
    profileSettings: "Profile Settings",
    
    // Messages
    successCreated: "Successfully created!",
    successUpdated: "Successfully updated!",
    successDeleted: "Successfully deleted!",
    confirmDelete: "Are you sure you want to delete this item?",
    
    // Error messages
    errorOccurred: "An error occurred",
    unauthorized: "Unauthorized access",
    invalidInput: "Invalid input",
    insufficientFunds: "Insufficient funds",
    
    // Categories
    education: "Education",
    healthcare: "Healthcare",
    management: "Management",
    custom: "Custom",
  },
  ar: {
    // Common
    appName: "لوحة تحكم العقود الذكية",
    darkMode: "الوضع المظلم",
    logout: "تسجيل الخروج",
    login: "تسجيل الدخول",
    settings: "الإعدادات",
    language: "اللغة",
    search: "بحث",
    notifications: "الإشعارات",

    // Dashboard
    dashboard: "لوحة التحكم",
    overview: "نظرة عامة",
    statistics: "الإحصائيات",
    welcome: "مرحباً بك في لوحة تحكم العقود الذكية",
    recentActivity: "النشاطات الأخيرة",
    quickActions: "إجراءات سريعة",

    // Domains
    domains: "المجالات",
    createDomain: "إنشاء مجال",
    domainName: "اسم المجال",
    domainDescription: "وصف المجال",
    stage: "المرحلة",
    maxStage: "أقصى مرحلة",
    startTime: "وقت البدء",
    endTime: "وقت الانتهاء",
    active: "نشط",
    inactive: "غير نشط",
    manage: "إدارة",
    view: "عرض",
    edit: "تعديل",
    delete: "حذف",
    save: "حفظ",
    cancel: "إلغاء",
    confirm: "تأكيد",
    
    // Voting
    voting: "التصويت",
    proposals: "المقترحات",
    createProposal: "إنشاء مقترح",
    activeProposals: "المقترحات النشطة",
    completedProposals: "المقترحات المكتملة",
    proposalTitle: "عنوان المقترح",
    proposalDescription: "وصف المقترح",
    votingPeriod: "فترة التصويت",
    vote: "تصويت",
    approve: "موافق",
    reject: "رفض",
    abstain: "امتناع",
    votingProgress: "تقدم التصويت",
    votingResults: "نتائج التصويت",
    votesFor: "الأصوات المؤيدة",
    votesAgainst: "الأصوات المعارضة",
    
    // Rewards
    rewards: "المكافآت",
    createReward: "إنشاء مكافأة",
    myRewards: "مكافآتي",
    availableRewards: "المكافآت المتاحة",
    rewardName: "اسم المكافأة",
    pointsCost: "تكلفة النقاط",
    claim: "استلام",
    claimed: "تم الاستلام",
    yourPoints: "نقاطك",
    rewardHistory: "سجل المكافآت",

    // Settings
    accountSettings: "إعدادات الحساب",
    securitySettings: "إعدادات الأمان",
    notificationSettings: "إعدادات الإشعارات",
    profileSettings: "إعدادات الملف الشخصي",
    
    // Messages
    successCreated: "تم الإنشاء بنجاح!",
    successUpdated: "تم التحديث بنجاح!",
    successDeleted: "تم الحذف بنجاح!",
    confirmDelete: "هل أنت متأكد من أنك تريد حذف هذا العنصر؟",
    
    // Error messages
    errorOccurred: "حدث خطأ",
    unauthorized: "وصول غير مصرح به",
    invalidInput: "مدخلات غير صالحة",
    insufficientFunds: "رصيد غير كاف",
    
    // Categories
    education: "التعليم",
    healthcare: "الرعاية الصحية",
    management: "الإدارة",
    custom: "مخصص",
  }
};

// Language provider component
export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  // Translator function
  const t = (key: string): string => {
    const lang = translations[language];
    return lang[key as keyof typeof lang] || key;
  };

  // Effect to set direction based on language
  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
    
    // Apply font family based on language
    document.body.className = language === 'ar' ? 'font-arabic' : 'font-sans';
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use language context
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

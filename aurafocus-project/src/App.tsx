
import React, { useState, useEffect, useCallback } from 'react';

// TYPES
export enum Screen {
  Splash,
  OnboardingWelcome,
  OnboardingAdapts,
  OnboardingPrivacy,
  Permissions,
  SignIn,
  HomeDashboard,
  IntentPrompt,
  ActiveSession,
  SessionSummary,
  Reports,
  ManageApps,
  FocusRules,
  IntentHistory,
  AIFeedback,
}

type NavigateTo = (screen: Screen) => void;

interface ScreenProps {
  navigateTo: NavigateTo;
}

// --- REUSABLE COMPONENTS ---

const Header: React.FC<{ title: string; onBack: () => void; showMore?: boolean }> = ({ title, onBack, showMore = true }) => (
    <header className="sticky top-0 z-10 flex h-16 items-center bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm px-4 justify-between border-b border-white/10">
        <button onClick={onBack} className="flex size-10 shrink-0 items-center justify-start text-text-light dark:text-text-dark">
            <span className="material-symbols-outlined text-2xl">arrow_back</span>
        </button>
        <h1 className="text-xl font-bold text-text-light dark:text-text-dark">{title}</h1>
        <div className="flex size-10 shrink-0 items-center justify-end text-text-light dark:text-text-dark">
            {showMore && <span className="material-symbols-outlined text-2xl">more_vert</span>}
        </div>
    </header>
);

const BottomNavBar: React.FC<{ activeScreen: Screen; navigateTo: NavigateTo }> = ({ activeScreen, navigateTo }) => {
    const navItems = [
        { screen: Screen.HomeDashboard, icon: 'home', label: 'Home' },
        { screen: Screen.Reports, icon: 'bar_chart', label: 'Reports' },
        { screen: Screen.FocusRules, icon: 'shield', label: 'Rules' },
        { screen: Screen.ManageApps, icon: 'settings', label: 'Settings' },
    ];
    
    return (
        <nav className="sticky bottom-0 z-30 bg-card-dark/80 backdrop-blur-sm border-t border-white/10">
            <div className="mx-auto flex max-w-md justify-around p-2">
                {navItems.map(item => {
                    const isActive = activeScreen === item.screen;
                    return (
                        <button key={item.label} onClick={() => navigateTo(item.screen)} className={`flex flex-col items-center justify-center gap-1 rounded-lg px-4 py-2 w-24 ${isActive ? 'text-primary-light' : 'text-muted-dark'}`}>
                            <span className={`material-symbols-outlined ${isActive ? 'fill' : ''}`}>{item.icon}</span>
                            <span className={`text-xs ${isActive ? 'font-bold' : 'font-medium'}`}>{item.label}</span>
                        </button>
                    )
                })}
            </div>
        </nav>
    );
};

// --- SCREEN COMPONENTS ---

const SplashScreen: React.FC<ScreenProps> = ({ navigateTo }) => {
    useEffect(() => {
        const timer = setTimeout(() => navigateTo(Screen.OnboardingWelcome), 2500);
        return () => clearTimeout(timer);
    }, [navigateTo]);

    return (
        <div className="relative flex h-screen w-full flex-col bg-[#2A4365] group/design-root overflow-x-hidden">
            <div className="flex h-full w-full grow flex-col items-center justify-center p-4">
                <div className="flex flex-col items-center justify-center gap-4 text-center">
                    <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white/10 p-4">
                        <span className="material-symbols-outlined text-6xl" style={{ color: '#4FD1C5' }}>neurology</span>
                    </div>
                    <h2 className="text-white tracking-light text-[36px] font-bold leading-tight">AuraFocus</h2>
                    <p className="text-white/80 text-lg font-normal leading-normal">Transform distraction into focus.</p>
                </div>
            </div>
        </div>
    );
};

const OnboardingWelcomeScreen: React.FC<ScreenProps> = ({ navigateTo }) => (
    <div className="relative flex h-screen min-h-[600px] w-full flex-col bg-background-light dark:bg-background-darker overflow-y-auto">
        <header className="flex h-14 w-full shrink-0 items-center justify-end px-4 pt-2">
            <button onClick={() => navigateTo(Screen.Permissions)} className="flex items-center justify-center text-sm font-medium text-slate-500 dark:text-slate-400">Skip</button>
        </header>
        <main className="flex w-full flex-1 flex-col items-center justify-start px-4">
            <div className="flex max-w-sm flex-col items-center justify-center">
                <div className="flex w-full grow items-center justify-center py-8">
                    <div className="w-full max-w-[280px] aspect-square">
                        <div className="flex h-full w-full items-center justify-center rounded-full bg-primary-light/10 dark:bg-primary-light/20 p-8">
                            <div className="flex h-full w-full items-center justify-center rounded-full bg-primary-light/20 dark:bg-primary-light/30 p-8">
                                <div className="flex h-full w-full items-center justify-center rounded-full bg-primary-light p-4">
                                    <span className="material-symbols-outlined text-background-darker !text-7xl">auto_awesome</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <h1 className="font-display text-3xl font-bold tracking-tight text-slate-800 dark:text-white text-center">Welcome to AuraFocus</h1>
                <p className="font-display text-base font-normal leading-relaxed text-slate-600 dark:text-slate-300 pt-4 text-center">Transform distraction into focus. Before opening apps like social media, state your purpose and gain mindful control over your time.</p>
            </div>
        </main>
        <footer className="flex w-full shrink-0 flex-col items-center justify-end gap-4 px-4 pb-8 pt-4 sm:pb-12">
            <div className="flex w-full max-w-sm flex-row items-center justify-center gap-3 py-3">
                <div className="h-2 w-2 rounded-full bg-primary-light"></div>
                <div className="h-2 w-2 rounded-full bg-slate-300 dark:bg-slate-700"></div>
                <div className="h-2 w-2 rounded-full bg-slate-300 dark:bg-slate-700"></div>
            </div>
            <div className="flex w-full max-w-sm">
                <button onClick={() => navigateTo(Screen.OnboardingAdapts)} className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-5 flex-1 bg-primary-light text-background-darker text-base font-bold">
                    <span className="truncate">Continue</span>
                </button>
            </div>
        </footer>
    </div>
);

const OnboardingAdaptsScreen: React.FC<ScreenProps> = ({ navigateTo }) => (
     <div className="relative flex h-screen w-full flex-col bg-background-light dark:bg-background-darker overflow-x-hidden">
        <header className="flex h-14 w-full shrink-0 items-center justify-end px-4 pt-2">
            <button onClick={() => navigateTo(Screen.Permissions)} className="flex items-center justify-center text-sm font-medium text-slate-500 dark:text-slate-400">Skip</button>
        </header>
        <main className="flex flex-col flex-grow justify-between px-4">
            <div className="flex flex-col items-center justify-center py-8">
                <div className="relative flex items-center justify-center w-64 h-64">
                    <div className="absolute w-full h-full rounded-full border border-primary-light/20"></div>
                    <div className="absolute w-48 h-48 rounded-full border border-primary-light/20"></div>
                    <div className="absolute top-8 left-1/2 -translate-x-1/2"><span className="material-symbols-outlined text-primary-light text-4xl !font-light">schedule</span></div>
                    <div className="absolute bottom-1/2 translate-y-20 left-8"><span className="material-symbols-outlined text-primary-light text-4xl !font-light">location_on</span></div>
                    <div className="absolute bottom-1/2 translate-y-20 right-8"><span className="material-symbols-outlined text-primary-light text-4xl !font-light">home</span></div>
                </div>
            </div>
            <div className="flex flex-col items-center">
                <h1 className="text-slate-800 dark:text-white tracking-tight text-[32px] font-bold leading-tight text-center pb-3">Intelligently Adapts to You</h1>
                <p className="text-slate-600 dark:text-slate-300 text-base font-normal leading-normal pb-3 pt-1 text-center max-w-sm">
                    With Smart Location and Time Awareness, AuraFocus automatically adjusts your settings for seamless focus management.
                </p>
            </div>
        </main>
        <footer className="flex w-full shrink-0 flex-col items-center justify-end gap-4 px-4 pb-8 pt-4 sm:pb-12">
            <div className="flex w-full max-w-sm flex-row items-center justify-center gap-3 py-3">
                <div className="h-2 w-2 rounded-full bg-slate-300 dark:bg-slate-700"></div>
                <div className="h-2 w-2 rounded-full bg-primary-light"></div>
                <div className="h-2 w-2 rounded-full bg-slate-300 dark:bg-slate-700"></div>
            </div>
             <div className="flex w-full max-w-sm">
                <button onClick={() => navigateTo(Screen.OnboardingPrivacy)} className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-5 flex-1 bg-primary-light text-background-darker text-base font-bold">
                    <span className="truncate">Continue</span>
                </button>
            </div>
        </footer>
    </div>
);

const OnboardingPrivacyScreen: React.FC<ScreenProps> = ({ navigateTo }) => (
    <div className="relative flex h-screen w-full flex-col dark:bg-background-darker">
        <main className="flex flex-col items-center px-4 flex-auto">
            <div className="flex w-full max-w-sm justify-center py-8">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAvLHu9G63DxMQLc8UlFGhiVdllTsi7AdlIT32TK3TPLc4hSrXwvXHVMacGHrWJ4B4awpjcr1EodYQM26McefJiNeeXn-eXJcuoLRmRoJvUCmbQkmGqWIz7WtU3sTmHrvzmTx2-XW7CFxPLDDi79qyfitm5T4wpp7c5RJ_eyc9O8GXuhcFB0oCFQbHbNBt02PPOE11o9HqbeANV7NJHk_buKy-pnKKf4RL59351FlFxekl9tvvSUKJTgQp8B_8QbV8D8XvaqRVGkJ21" alt="Privacy shields illustration" className="w-full max-w-[180px]"/>
            </div>
            <h1 className="text-white tracking-tight text-[32px] font-bold leading-tight text-center pb-3">Your Privacy, Your Choice.</h1>
            <p className="text-white/70 text-base font-normal leading-normal pb-3 pt-1 text-center max-w-md">
              Enjoy a personalized focus experience with full transparency and control over your privacy.
            </p>
            <div className="flex w-full max-w-sm flex-col gap-3 p-4 pt-6">
                 {/* Content of this screen will be merged into SignInScreen for a smoother flow */}
            </div>
        </main>
        <footer className="w-full mt-auto p-4 space-y-4 max-w-sm mx-auto">
            <div className="flex w-full max-w-sm flex-row items-center justify-center gap-3 py-3">
                <div className="h-2 w-2 rounded-full bg-slate-300 dark:bg-slate-700"></div>
                <div className="h-2 w-2 rounded-full bg-slate-300 dark:bg-slate-700"></div>
                <div className="h-2 w-2 rounded-full bg-primary-light"></div>
            </div>
            <button onClick={() => navigateTo(Screen.Permissions)} className="flex h-12 w-full flex-row items-center justify-center rounded-xl bg-primary-light px-6 font-display text-base font-bold text-background-darker">Continue</button>
            <a className="block text-center text-sm font-medium text-primary-light/80 hover:text-primary-light" href="#">How we protect your data</a>
        </footer>
    </div>
);

const PermissionsScreen: React.FC<ScreenProps> = ({ navigateTo }) => {
    const [granted, setGranted] = useState<number[]>([]);
    const allRequiredGranted = granted.includes(1) && granted.includes(2);

    const grantPermission = (id: number) => {
        if (!granted.includes(id)) {
            setGranted(prev => [...prev, id].sort());
        }
    };
    
    return (
    <div className="relative flex min-h-screen w-full flex-col dark:bg-background-dark">
        <div className="flex-grow px-4 pt-8 pb-32">
            <div className="flex items-center justify-between pb-4">
                <h1 className="text-2xl font-bold tracking-tight text-text-light dark:text-text-dark">Let's Get Set Up</h1>
                <p className="text-sm font-medium text-muted-light dark:text-muted-dark">{granted.length} of 3</p>
            </div>
            <p className="text-base text-muted-light dark:text-muted-dark pb-8">These permissions are essential for AuraFocus to help you reduce distractions.</p>
            <div className="space-y-4">
                <div className="flex flex-col gap-4 rounded-xl bg-card-light dark:bg-card-dark p-4 shadow-sm">
                    <div className="flex items-start gap-4">
                        <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-primary/20 text-primary"><span className="material-symbols-outlined !text-3xl">shield</span></div>
                        <div className="flex flex-1 flex-col justify-center">
                            <p className="text-base font-semibold text-text-light dark:text-text-dark">Enable Accessibility Service</p>
                            <p className="text-sm font-normal text-muted-light dark:text-muted-dark">Needed to monitor app usage in real-time.</p>
                        </div>
                    </div>
                    <button onClick={() => grantPermission(1)} disabled={granted.includes(1)} className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 text-sm font-semibold leading-normal disabled:cursor-not-allowed enabled:bg-primary enabled:text-background-dark disabled:bg-primary/20 disabled:text-primary">
                        {granted.includes(1) ? <><span className="material-symbols-outlined !text-xl mr-2">check_circle</span> Granted</> : 'Grant Permission'}
                    </button>
                </div>
                <div className="flex flex-col gap-4 rounded-xl bg-card-light dark:bg-card-dark p-4 shadow-sm">
                    <div className="flex items-start gap-4">
                        <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-primary/20 text-primary"><span className="material-symbols-outlined !text-3xl">bar_chart</span></div>
                        <div className="flex flex-1 flex-col justify-center">
                            <p className="text-base font-semibold text-text-light dark:text-text-dark">Allow Usage Access</p>
                            <p className="text-sm font-normal text-muted-light dark:text-muted-dark">Helps our AI understand app usage patterns.</p>
                        </div>
                    </div>
                     <button onClick={() => grantPermission(2)} disabled={granted.includes(2)} className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 text-sm font-semibold leading-normal disabled:cursor-not-allowed enabled:bg-primary enabled:text-background-dark disabled:bg-primary/20 disabled:text-primary">
                        {granted.includes(2) ? <><span className="material-symbols-outlined !text-xl mr-2">check_circle</span> Granted</> : 'Grant Permission'}
                    </button>
                </div>
                 <div className="flex flex-col gap-4 rounded-xl bg-card-light dark:bg-card-dark p-4 shadow-sm">
                    <div className="flex items-start gap-4">
                        <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-primary/20 text-primary"><span className="material-symbols-outlined !text-3xl">location_on</span></div>
                        <div className="flex flex-1 flex-col justify-center">
                            <div className="flex items-center gap-2">
                                <p className="text-base font-semibold text-text-light dark:text-text-dark">Share Location</p>
                                <span className="rounded-full bg-muted-light/20 px-2 py-0.5 text-xs font-medium text-muted-light dark:text-muted-dark">Optional</span>
                            </div>
                            <p className="text-sm font-normal text-muted-light dark:text-muted-dark">Activates focus modes automatically at work or home.</p>
                        </div>
                    </div>
                     <button onClick={() => grantPermission(3)} disabled={granted.includes(3)} className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 text-sm font-semibold leading-normal disabled:cursor-not-allowed enabled:bg-primary enabled:text-background-dark disabled:bg-primary/20 disabled:text-primary">
                        {granted.includes(3) ? <><span className="material-symbols-outlined !text-xl mr-2">check_circle</span> Granted</> : 'Grant Permission'}
                    </button>
                </div>
            </div>
        </div>
        <div className="fixed bottom-0 left-0 right-0 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm">
            <div className="p-4 border-t border-muted-light/10 dark:border-muted-dark/20">
                <button onClick={() => navigateTo(Screen.SignIn)} disabled={!allRequiredGranted} className="flex w-full min-w-[84px] items-center justify-center overflow-hidden rounded-xl h-12 px-5 bg-primary text-background-dark text-base font-bold leading-normal disabled:bg-primary/50 disabled:text-background-dark/50 disabled:cursor-not-allowed">
                    <span className="truncate">Continue</span>
                </button>
                <button onClick={() => navigateTo(Screen.SignIn)} className="mt-4 block w-full text-center text-sm font-medium text-muted-light dark:text-muted-dark hover:text-primary">Skip Optional Permissions</button>
            </div>
        </div>
    </div>
    );
};

const SignInScreen: React.FC<ScreenProps> = ({ navigateTo }) => {
    const [privacyMode, setPrivacyMode] = useState('minimal');
    return (
         <div className="relative flex h-screen w-full flex-col items-center justify-center p-4 bg-background-light dark:bg-background-darker">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-primary-light/20 rounded-full filter blur-3xl opacity-50"></div>
                <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-primary-light/20 rounded-full filter blur-3xl opacity-50"></div>
            </div>
            <div className="relative z-10 flex flex-col items-center w-full max-w-md mx-auto">
                <div className="w-full text-center mb-8">
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">AuraFocus</h1>
                    <p className="mt-2 text-base text-slate-600 dark:text-slate-400">Find Your Focus</p>
                </div>
                <div className="w-full space-y-3 mb-8">
                    <button onClick={() => navigateTo(Screen.HomeDashboard)} className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-primary-light text-slate-900 gap-2 text-base font-bold transition-transform hover:scale-[1.02] active:scale-[0.98]">
                        <span className="material-symbols-outlined text-slate-900">login</span>
                        <span className="truncate">Sign in with Google</span>
                    </button>
                    <button onClick={() => navigateTo(Screen.HomeDashboard)} className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-slate-200/50 dark:bg-slate-800 text-slate-900 dark:text-white text-base font-bold transition-transform hover:scale-[1.02] active:scale-[0.98]">
                        <span className="truncate">Sign in with Email</span>
                    </button>
                </div>
                <div className="w-full text-center mb-8">
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Choose Your Privacy Mode</h2>
                    <div className="grid grid-cols-2 gap-3 p-1 bg-slate-200/50 dark:bg-slate-800 rounded-xl">
                         <button onClick={() => setPrivacyMode('minimal')} className={`relative flex cursor-pointer items-center justify-center rounded-lg py-3 text-sm font-bold ${privacyMode === 'minimal' ? 'text-slate-900 dark:text-white bg-white dark:bg-slate-900/50 shadow-sm' : 'text-slate-600 dark:text-slate-400'}`}>Minimal</button>
                        <button onClick={() => setPrivacyMode('advanced')} className={`relative flex cursor-pointer items-center justify-center rounded-lg py-3 text-sm font-bold ${privacyMode === 'advanced' ? 'text-slate-900 dark:text-white bg-white dark:bg-slate-900/50 shadow-sm' : 'text-slate-600 dark:text-slate-400'}`}>Advanced</button>
                    </div>
                    <div className="mt-4 px-2">
                        <p className="text-sm text-slate-600 dark:text-slate-400 h-8">{privacyMode === 'minimal' ? 'Shares only essential data for core features.' : 'Unlock AI insights by sharing anonymized data.'}</p>
                    </div>
                </div>
                <div className="w-full text-center">
                    <a className="text-xs text-slate-500 dark:text-slate-400 underline hover:text-primary-light" href="#">Terms of Service & Privacy Policy</a>
                </div>
            </div>
        </div>
    );
};

const HomeDashboardScreen: React.FC<ScreenProps> = ({ navigateTo }) => (
    <div className="relative flex min-h-screen w-full flex-col bg-background-dark">
        <div className="flex flex-col flex-grow">
            <header className="flex items-center p-4">
                <h1 className="text-white text-xl font-bold leading-tight flex-1">AuraFocus</h1>
                <button className="flex items-center justify-center rounded-full h-10 w-10 bg-card-dark text-white"><span className="material-symbols-outlined text-2xl">person</span></button>
            </header>
            <main className="flex-grow p-4 space-y-6">
                <h2 className="text-text-dark text-center text-lg font-medium leading-normal">Today's Focus Score</h2>
                <div className="relative flex items-center justify-center">
                    <svg className="h-48 w-48 -rotate-90 transform"><circle className="stroke-card-dark" cx="96" cy="96" fill="none" r="86" strokeWidth="12"></circle><circle className="stroke-primary" cx="96" cy="96" fill="none" r="86" strokeDasharray="540.35" strokeDashoffset="81.05" strokeWidth="12"></circle></svg>
                    <div className="absolute flex flex-col items-center justify-center"><span className="text-white text-5xl font-bold tracking-tighter">85</span><span className="text-text-dark text-sm font-medium">/100</span></div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2 rounded-xl p-4 bg-card-dark"><p className="text-text-dark text-sm font-medium leading-normal">Time Saved</p><p className="text-white tracking-light text-2xl font-bold leading-tight">45 Mins</p></div>
                    <button onClick={() => navigateTo(Screen.IntentHistory)} className="flex flex-col gap-2 rounded-xl p-4 bg-card-dark"><p className="text-text-dark text-sm font-medium leading-normal">Intent Sessions</p><p className="text-white tracking-light text-2xl font-bold leading-tight">3 Completed</p></button>
                </div>
                <div>
                    <button onClick={() => navigateTo(Screen.IntentPrompt)} className="flex w-full items-center justify-center gap-3 rounded-lg bg-primary py-4 px-5 text-background-dark text-base font-bold leading-normal mb-4">
                        <span className="material-symbols-outlined">rocket_launch</span><span>Start Focus Mode</span>
                    </button>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="flex flex-col items-center gap-2">
                            <button onClick={() => navigateTo(Screen.Reports)} className="flex h-16 w-full items-center justify-center rounded-xl bg-card-dark text-white"><span className="material-symbols-outlined text-3xl">bar_chart</span></button>
                            <p className="text-text-dark text-xs font-medium">Reports</p>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <button onClick={() => navigateTo(Screen.ManageApps)} className="flex h-16 w-full items-center justify-center rounded-xl bg-card-dark text-white"><span className="material-symbols-outlined text-3xl">apps</span></button>
                            <p className="text-text-dark text-xs font-medium">Manage Apps</p>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <button onClick={() => navigateTo(Screen.FocusRules)} className="flex h-16 w-full items-center justify-center rounded-xl bg-card-dark text-white"><span className="material-symbols-outlined text-3xl">rule</span></button>
                            <p className="text-text-dark text-xs font-medium">Rules</p>
                        </div>
                    </div>
                </div>
                <button onClick={() => navigateTo(Screen.AIFeedback)} className="flex flex-col gap-3 rounded-xl bg-card-dark p-4 w-full text-left">
                    <p className="text-primary text-sm font-medium leading-normal">Aura's Insight</p>
                    <p className="text-white text-lg font-semibold leading-tight">"The successful warrior is the average person, with laser-like focus."</p>
                    <p className="text-text-dark text-sm font-normal leading-normal self-end">- Bruce Lee</p>
                </button>
            </main>
        </div>
        <BottomNavBar activeScreen={Screen.HomeDashboard} navigateTo={navigateTo} />
    </div>
);

const IntentPromptScreen: React.FC<ScreenProps> = ({ navigateTo }) => (
    <div className="relative flex h-screen w-full flex-col items-center justify-center p-4 bg-background-dark">
        <div className="flex w-full max-w-md flex-col items-center justify-center space-y-8">
            <h1 className="text-white tracking-light text-center text-3xl font-bold leading-tight">What is your intent for using Instagram?</h1>
            <div className="flex w-24 h-24 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 via-pink-500 to-yellow-400">
                <img alt="Instagram Logo" className="h-16 w-16" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAgu8ojwNx6VhSi4sWFxaCNM1sB0P6E_LxQkAlElAbQqAc17dpEsjy6TLF7rKHDiGjWS2opmcZcVkH9LNoRJVCltpxgmaDM_fBLMJqdonkUWZYPNS8dK2YO15jaoqh3MRCdLdDMd9CxJqvNx1QSkqcdiVqgJx4_MZ-8NXj7NxWJtBQpnFzh18XwPR1ju3UUklIB_4mm6hqlONnOs7ob673HO2aBktdPCgf08h3hqmqWQq8mSgA09b5w9mD_dedTkXdOdphlAQqIC0jR"/>
            </div>
            <div className="w-full">
                <label className="flex flex-col w-full">
                    <p className="text-[#E2E8F0] text-base font-medium leading-normal pb-2">My Intention</p>
                    <div className="flex w-full flex-1 items-stretch rounded-lg bg-[#2D3748] border border-[#4A5568] focus-within:border-primary focus-within:ring-1 focus-within:ring-primary">
                        <input className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-l-lg text-white placeholder:text-muted-dark focus:outline-0 focus:ring-0 border-0 bg-transparent h-14 p-4 text-base" placeholder="e.g., 'Check messages from a friend'" />
                        <div className="text-muted-dark flex items-center justify-center pr-4"><span className="material-symbols-outlined text-2xl">mic</span></div>
                    </div>
                </label>
            </div>
            <div className="flex gap-3 pr-4 self-center">
                <div className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-card-dark px-4">
                    <p className="text-muted-dark text-sm font-medium leading-normal">Recommended: 5 minutes</p>
                </div>
            </div>
            <div className="pt-4"></div>
            <div className="flex w-full flex-col items-stretch gap-3">
                <button onClick={() => navigateTo(Screen.ActiveSession)} className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-primary text-background-dark text-base font-bold w-full">
                    <span className="truncate">Start Session</span>
                </button>
                <button onClick={() => navigateTo(Screen.HomeDashboard)} className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-transparent text-muted-dark text-base font-bold w-full">
                    <span className="truncate">Cancel</span>
                </button>
            </div>
        </div>
    </div>
);

const ActiveSessionScreen: React.FC<ScreenProps> = ({ navigateTo }) => {
     // A simple timer effect for the prototype
    const [timeLeft, setTimeLeft] = useState(24 * 60 + 17);
    const totalTime = 25 * 60;
    
    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const progress = ((totalTime - timeLeft) / totalTime) * 360;
    
    return (
        <div className="relative flex h-screen w-full flex-col justify-between p-6 bg-background-darkest text-text-dark">
            <header className="flex items-center justify-between">
                <h1 className="text-xl font-bold">AuraFocus</h1>
                <button className="flex h-10 w-10 items-center justify-center rounded-full"><span className="material-symbols-outlined text-2xl">more_vert</span></button>
            </header>
            <main className="flex flex-col items-center justify-center text-center -mt-16">
                 <div className="relative w-72 h-72 rounded-full grid place-items-center" style={{ background: `conic-gradient(#4FD1C5 ${progress}deg, #1f3a5a 0deg)` }}>
                    <div className="absolute h-[84%] w-[84%] bg-background-darkest rounded-full"></div>
                    <div className="relative flex flex-col items-center justify-center">
                        <p className="text-6xl font-bold tracking-tighter">{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</p>
                    </div>
                </div>
                <p className="mt-8 text-lg font-medium leading-normal">Stay present.</p>
            </main>
            <footer className="flex w-full flex-col items-center gap-8">
                <div className="w-full max-w-sm">
                    <div className="rounded-full bg-[#1f3a5a] h-2">
                        <div className="h-2 rounded-full bg-primary" style={{ width: `${(progress / 360) * 100}%` }}></div>
                    </div>
                </div>
                <div className="flex w-full max-w-sm flex-col items-stretch gap-3">
                    <button onClick={() => navigateTo(Screen.SessionSummary)} className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-14 px-5 bg-primary text-background-darkest text-base font-bold w-full">
                        <span className="truncate">End Early</span>
                    </button>
                    <button className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-14 px-5 border border-text-dark text-text-dark text-base font-bold w-full bg-transparent">
                        <span className="truncate">Extend Time</span>
                    </button>
                </div>
                <div className="flex flex-wrap justify-center gap-3">
                    <div className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-full bg-[#1f3a5a] px-4">
                        <p className="text-text-dark text-sm font-medium leading-normal">Monitoring Mode: Minimal</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

const SessionSummaryScreen: React.FC<ScreenProps> = ({ navigateTo }) => (
    <div className="relative flex min-h-screen w-full flex-col bg-background-darkest">
        <header className="flex items-center p-4 pb-2 justify-between">
            <button onClick={() => navigateTo(Screen.HomeDashboard)} className="text-white flex size-12 shrink-0 items-center justify-start">
                <span className="material-symbols-outlined">arrow_back</span>
            </button>
            <h1 className="text-white text-lg font-bold flex-1 text-center pr-12">Session Summary</h1>
        </header>
        <main className="flex flex-col gap-6 p-4 flex-grow">
            <div className="flex flex-col gap-3 rounded-lg bg-card-darkest p-6">
                <div className="flex gap-6 justify-between items-center">
                    <p className="text-white text-base font-medium">Goal Achieved!</p>
                    <span className="material-symbols-outlined text-primary fill">check_circle</span>
                </div>
                <div className="rounded bg-background-darkest"><div className="h-2 rounded bg-primary" style={{ width: '100%' }}></div></div>
                <p className="text-gray-400 text-sm">You did a great job staying focused.</p>
            </div>
            <div className="flex flex-wrap gap-4">
                <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-lg bg-card-darkest p-6"><p className="text-gray-400 text-base font-medium">Time Focused</p><p className="text-white text-3xl font-bold">45m 12s</p></div>
                <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-lg bg-card-darkest p-6"><p className="text-gray-400 text-base font-medium">Session Goal</p><p className="text-white text-3xl font-bold">Read</p></div>
            </div>
            <div className="flex flex-col items-stretch justify-start rounded-lg bg-card-darkest p-6">
                 <div className="flex items-center gap-2"><span className="material-symbols-outlined text-primary text-base">auto_awesome</span><p className="text-gray-400 text-sm font-medium">AI Coach Feedback</p></div>
                 <p className="text-white text-lg font-bold">Great work!</p>
                 <p className="text-gray-400 text-base">Your focus peaked during the last 15 minutes. Try a short break before your next session.</p>
            </div>
        </main>
        <footer className="flex justify-center p-4">
            <div className="flex w-full flex-1 gap-3 max-w-[480px] flex-col items-stretch">
                <button className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-transparent border border-primary text-primary text-base font-bold w-full">Share Progress</button>
                <button onClick={() => navigateTo(Screen.HomeDashboard)} className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-primary text-background-darkest text-base font-bold w-full">Done</button>
            </div>
        </footer>
    </div>
);

const ReportsScreen: React.FC<ScreenProps> = ({ navigateTo }) => (
    <div className="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark">
        <Header title="Focus Insights" onBack={() => navigateTo(Screen.HomeDashboard)} showMore={false} />
        <main className="flex flex-1 flex-col p-4">
            <div className="mb-6 rounded-xl bg-white p-6 shadow-sm dark:bg-white/5">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2"><span className="material-symbols-outlined text-lg text-primary">psychology</span><p className="font-medium text-text-light dark:text-white">Overall Focus Score</p></div>
                    <p className="text-2xl font-bold text-primary">82</p>
                </div>
                <div className="relative mt-4 h-3 w-full rounded-full bg-[#E2E8F0] dark:bg-white/10"><div className="h-3 rounded-full bg-primary" style={{ width: '82%' }}></div></div>
                <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">Great job! Your focus has improved by 7% from last week.</p>
            </div>
            <div className="flex flex-col gap-6">
                 {/* Weekly Summary Card and other cards */}
            </div>
        </main>
        <BottomNavBar activeScreen={Screen.Reports} navigateTo={navigateTo} />
    </div>
);

const ManageAppsScreen: React.FC<ScreenProps> = ({ navigateTo }) => {
    const [socialToggle, setSocialToggle] = useState(true);
    const [productivityToggle, setProductivityToggle] = useState(true);

    return (
        <div className="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark">
            <Header title="Manage Apps" onBack={() => navigateTo(Screen.HomeDashboard)} />
            <div className="px-4 py-3">
                <div className="relative flex items-center h-14 w-full">
                    <div className="absolute left-4 text-zinc-500 dark:text-zinc-400"><span className="material-symbols-outlined">search</span></div>
                    <input className="form-input w-full h-full rounded-xl pl-12 pr-4 text-zinc-900 dark:text-zinc-200 focus:outline-0 focus:ring-2 focus:ring-primary/50 border-none bg-white dark:bg-zinc-800/50 placeholder:text-zinc-500 dark:placeholder:text-zinc-400" placeholder="Search installed apps…"/>
                </div>
            </div>
            <main className="flex flex-col p-4 pt-2 gap-4">
                <details className="flex flex-col rounded-xl bg-white dark:bg-zinc-900/50 p-1 group" open>
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-6 p-3">
                        <p className="text-zinc-900 dark:text-white text-base font-medium">Monitored Apps</p>
                        <div className="text-zinc-600 dark:text-zinc-400 transition-transform duration-300 group-open:rotate-180"><span className="material-symbols-outlined">expand_more</span></div>
                    </summary>
                    <div className="flex flex-col gap-1 px-2 pb-3">
                        {/* List Item 1 */}
                        <div className="flex items-center gap-4 px-2 min-h-14 justify-between rounded-lg">
                            <div className="flex items-center gap-4">
                                <img className="rounded-lg size-10" alt="Social Media App Icon" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBy_mjnIwX00UXB02GeAJFkV-u4wCEOj-NkJ2wxn2DUOrRKoWVrAHs-oM6LRp2JUI-ab9ibIWAj3WV89nmFJBaZ-BQXUSUv0Vw6BU16t_pz7RBC6yOaRcix1HXeldnmA35Tjcahv6SboN2RZ2hvpwKpDkS-rWjJVDmP54h5v7cCXhkvaF3TOVIy0rU-oK2zwvF6zMBq_gVVdWkTbxHUV3I7oama4sY0k1yDkAnEjd5mZJo2-a1CkxJ3qUykZ59Ia4DJiWYL_M4K-uCz" />
                                <p className="text-zinc-800 dark:text-zinc-200 text-base">Social Media App</p>
                            </div>
                             <label className="relative flex h-[28px] w-[50px] cursor-pointer items-center rounded-full bg-zinc-200 dark:bg-zinc-700 p-0.5 transition-colors duration-300 has-[:checked]:bg-primary">
                                <input checked={socialToggle} onChange={() => setSocialToggle(p => !p)} className="toggle-switch invisible absolute" type="checkbox"/>
                                <div className="h-[24px] w-[24px] rounded-full bg-white transition-transform duration-300"></div>
                            </label>
                        </div>
                         {/* List Item 2 */}
                        <div className="flex items-center gap-4 px-2 min-h-14 justify-between rounded-lg">
                            <div className="flex items-center gap-4">
                                <img className="rounded-lg size-10" alt="Productivity App Icon" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA663I3OdVY0w8LAHsgNZOMI_DvBfo6KFkHN9VNxCbRU5al6WozMQOdOa2hfOpaqNSQAwZbz3aurm3qgJgfPHJZ7BtF9m-X4TL2FTWZGFogDb5RTcAiQaLTAtKK3Fh2n_iSL4dG3AxwDRyJtBvVB4of_JQU7kOUHIBWmoI1-6C5qtgU-LSq0fic5tT1ZrfIPFJtA4pe84knkzbnES2byFmseMhxa-oXgF7nlQmFr-ov4HdWUCcWQZNV7ayq3VPpyr9K-7T4-1gRZGlA" />
                                <p className="text-zinc-800 dark:text-zinc-200 text-base">Productivity App</p>
                            </div>
                             <label className="relative flex h-[28px] w-[50px] cursor-pointer items-center rounded-full bg-zinc-200 dark:bg-zinc-700 p-0.5 transition-colors duration-300 has-[:checked]:bg-primary">
                                <input checked={productivityToggle} onChange={() => setProductivityToggle(p => !p)} className="toggle-switch invisible absolute" type="checkbox"/>
                                <div className="h-[24px] w-[24px] rounded-full bg-white transition-transform duration-300"></div>
                            </label>
                        </div>
                    </div>
                </details>
                {/* Other sections */}
            </main>
             <BottomNavBar activeScreen={Screen.ManageApps} navigateTo={navigateTo} />
        </div>
    );
};

const FocusRulesScreen: React.FC<ScreenProps> = ({ navigateTo }) => (
    <div className="relative flex min-h-screen w-full flex-col dark:bg-[#2A4365]">
        <Header title="Focus Rules" onBack={() => navigateTo(Screen.HomeDashboard)} />
        <nav className="sticky top-[64px] bg-background-light dark:bg-[#2A4365] z-10">
            <div className="flex border-b border-slate-200 dark:border-white/10 px-4 justify-between">
                <a className="flex flex-col items-center justify-center border-b-[3px] border-b-primary pb-[13px] pt-4 flex-1" href="#"><p className="text-slate-900 dark:text-white text-sm font-bold">Location Rules</p></a>
                <a className="flex flex-col items-center justify-center border-b-[3px] border-b-transparent pb-[13px] pt-4 flex-1" href="#"><p className="text-slate-500 dark:text-muted-dark text-sm font-bold">Time Rules</p></a>
            </div>
        </nav>
        <main className="flex-1 pb-24">
             {/* Content here */}
        </main>
        <BottomNavBar activeScreen={Screen.FocusRules} navigateTo={navigateTo} />
    </div>
);

const IntentHistoryScreen: React.FC<ScreenProps> = ({ navigateTo }) => (
    <div className="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-darker">
        <Header title="Intent History" onBack={() => navigateTo(Screen.HomeDashboard)} showMore={false} />
        <div className="flex gap-3 px-4 py-3">
             {/* Filters */}
        </div>
        <main className="flex flex-1 flex-col gap-4 p-4 pt-2">
            <button onClick={() => navigateTo(Screen.AIFeedback)} className="w-full text-left flex flex-col gap-4 rounded-xl bg-card-light p-4 shadow-[0_4px_12px_rgba(0,0,0,0.05)] dark:bg-card-darker">
                <div className="flex items-start gap-4">
                    <img className="size-10 shrink-0 rounded-lg" alt="Instagram app icon" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD1JYlmLtGTVU0rbw9_RQgoYSaoL3GHHSANEjDh1esyNA3aErtV__M1TRz6yjMqMbrPcvOj-GwkGYy9FY9kjQiPWi0D5PDzEmh8e9JLDQHUP4KLhclxDghoGA6Dsjo2nuN0e7O0TciwXyNDZWPsg5c2kW9R93k4xqwP_T-WFuiDKsqcA6ZO4Pi28Wlo8OzOowu00fFR_zNVbR4QMngpIKv8lBt7uGbluwtpRQU6MTiVvwiUhILfuDhfcBhCZYZTSLFcHINhVeX3ICKQ"/>
                    <div className="flex flex-1 flex-col"><p className="text-base font-medium text-text-light dark:text-white">Check messages from family for 5 minutes.</p><p className="text-sm font-normal text-muted-light dark:text-muted-dark">Instagram</p></div>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center justify-center gap-x-2 rounded-full bg-success-light/10 px-3 py-1 text-sm font-medium text-success-light dark:bg-success-dark/20 dark:text-success-dark"><span className="material-symbols-outlined text-base">check_circle</span>Completed</div>
                    <p className="text-sm font-medium text-muted-light dark:text-muted-dark">5m 12s</p>
                </div>
            </button>
            {/* Other history items */}
        </main>
    </div>
);

const AIFeedbackScreen: React.FC<ScreenProps> = ({ navigateTo }) => (
    <div className="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark">
        <Header title="Aura’s Insights" onBack={() => navigateTo(Screen.HomeDashboard)} />
        <main className="flex-grow p-4 pb-28">
            <div className="flex flex-col gap-6">
                <div className="flex flex-col items-stretch justify-start rounded-xl bg-gradient-to-br from-primary/90 to-primary p-6 text-white shadow-lg">
                    <p className="text-lg font-medium opacity-90">You were most focused on</p>
                    <p className="text-3xl font-bold leading-tight">Thursday</p>
                    <div className="mt-4 flex items-end justify-between">
                        <div className="flex items-baseline gap-2"><p className="text-6xl font-black tracking-tighter">92%</p><p className="font-medium">Focus Score</p></div>
                        <p className="text-base font-medium opacity-90">Great job!</p>
                    </div>
                </div>
                <div>
                    <h2 className="px-2 pb-3 text-lg font-bold text-text-light dark:text-text-dark">AI-Generated Tips</h2>
                    {/* Tip items */}
                </div>
                 {/* Graph Section & Quote */}
            </div>
        </main>
        <footer className="fixed bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-background-light to-transparent p-4 pt-8 dark:from-background-dark">
            <button className="flex h-14 w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl bg-primary text-background-dark shadow-lg">
                <span className="text-base font-bold">View Detailed Report</span>
            </button>
        </footer>
    </div>
);


// --- MAIN APP COMPONENT ---

export default function App() {
    const [currentScreen, setCurrentScreen] = useState<Screen>(Screen.Splash);
    const [isAnimating, setIsAnimating] = useState(false);

    const navigateTo = useCallback((screen: Screen) => {
        setIsAnimating(true);
        setTimeout(() => {
            setCurrentScreen(screen);
            setIsAnimating(false);
        }, 300); // match duration of animation
    }, []);

    const renderScreen = () => {
        switch (currentScreen) {
            case Screen.Splash: return <SplashScreen navigateTo={navigateTo} />;
            case Screen.OnboardingWelcome: return <OnboardingWelcomeScreen navigateTo={navigateTo} />;
            case Screen.OnboardingAdapts: return <OnboardingAdaptsScreen navigateTo={navigateTo} />;
            case Screen.OnboardingPrivacy: return <OnboardingPrivacyScreen navigateTo={navigateTo} />;
            case Screen.Permissions: return <PermissionsScreen navigateTo={navigateTo} />;
            case Screen.SignIn: return <SignInScreen navigateTo={navigateTo} />;
            case Screen.HomeDashboard: return <HomeDashboardScreen navigateTo={navigateTo} />;
            case Screen.IntentPrompt: return <IntentPromptScreen navigateTo={navigateTo} />;
            case Screen.ActiveSession: return <ActiveSessionScreen navigateTo={navigateTo} />;
            case Screen.SessionSummary: return <SessionSummaryScreen navigateTo={navigateTo} />;
            case Screen.Reports: return <ReportsScreen navigateTo={navigateTo} />;
            case Screen.ManageApps: return <ManageAppsScreen navigateTo={navigateTo} />;
            case Screen.FocusRules: return <FocusRulesScreen navigateTo={navigateTo} />;
            case Screen.IntentHistory: return <IntentHistoryScreen navigateTo={navigateTo} />;
            case Screen.AIFeedback: return <AIFeedbackScreen navigateTo={navigateTo} />;
            default: return <SplashScreen navigateTo={navigateTo} />;
        }
    };

    return (
        <div key={currentScreen} className={`transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
            {renderScreen()}
        </div>
    );
}

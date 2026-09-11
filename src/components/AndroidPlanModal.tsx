import React, { useState } from 'react';
import { 
  FileCode2, 
  Layers, 
  Smartphone, 
  CheckCircle, 
  Copy, 
  Check, 
  ExternalLink, 
  Terminal, 
  Cpu, 
  Database, 
  BellRing, 
  Radio, 
  BookOpen 
} from 'lucide-react';

interface AndroidPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AndroidPlanModal: React.FC<AndroidPlanModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'architecture' | 'code' | 'steps' | 'gradle'>('architecture');
  const [copiedCode, setCopiedCode] = useState(false);

  if (!isOpen) return null;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const kotlinSample = `// AzanForegroundService.kt
package com.islamic.azanquran.service

import android.app.*
import android.content.Intent
import android.os.IBinder
import androidx.core.app.NotificationCompat
import androidx.media3.common.MediaItem
import androidx.media3.exoplayer.ExoPlayer
import com.islamic.azanquran.R

class AzanPlayerService : Service() {
    private var exoPlayer: ExoPlayer? = null

    override fun onCreate() {
        super.onCreate()
        exoPlayer = ExoPlayer.Builder(this).build()
    }

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        val prayerName = intent?.getStringExtra("PRAYER_NAME") ?: "المغرب"
        val notification = createAzanNotification(prayerName)
        startForeground(1001, notification)

        // Play authentic Azan audio
        val mediaItem = MediaItem.fromUri("asset:///audio/azan_makkah.mp3")
        exoPlayer?.setMediaItem(mediaItem)
        exoPlayer?.prepare()
        exoPlayer?.play()

        return START_NOT_STICKY
    }

    private fun createAzanNotification(prayerName: String): Notification {
        val channelId = "azan_alerts_channel"
        val channel = NotificationChannel(
            channelId, 
            "Azan Notifications", 
            NotificationManager.IMPORTANCE_HIGH
        ).apply {
            enableVibration(true)
            lockscreenVisibility = Notification.VISIBILITY_PUBLIC
        }
        val manager = getSystemService(NotificationManager::class.java)
        manager.createNotificationChannel(channel)

        return NotificationCompat.Builder(this, channelId)
            .setSmallIcon(R.drawable.ic_crescent)
            .setContentTitle("حان الآن موعد أذان $prayerName")
            .setContentText("يؤذن الآن في مدينتك (ئەزان توۋلانماقتا)")
            .setPriority(NotificationCompat.PRIORITY_MAX)
            .setAutoCancel(true)
            .build()
    }

    override fun onBind(intent: Intent?): IBinder? = null

    override fun onDestroy() {
        exoPlayer?.release()
        super.onDestroy()
    }
}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/85 backdrop-blur-md font-arabic" dir="rtl">
      <div className="relative w-full max-w-2xl bg-[#091728] border-2 border-[#D4AF37] rounded-3xl shadow-[0_0_50px_rgba(212,175,55,0.3)] flex flex-col max-h-[90vh] overflow-hidden text-white">
        
        {/* Modal Top Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#D4AF37]/30 bg-[#0B1E34]">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-full bg-[#183654] border border-[#D4AF37] flex items-center justify-center text-[#FFDF88]">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold gold-text">
                ئاندروئىد ئەپ دىتالى پىلانى (خطة تطوير تطبيق أندرويد 100%)
              </h2>
              <p className="text-[11px] text-gray-400">
                Kotlin + Jetpack Compose + Room + ExoPlayer + WorkManager
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white"
          >
            ✕
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-white/10 bg-[#071322] px-3 pt-2 gap-1 text-xs">
          <button
            onClick={() => setActiveTab('architecture')}
            className={`px-3 py-2 rounded-t-xl font-bold transition-all ${
              activeTab === 'architecture' ? 'bg-[#091728] text-[#FFDF88] border-t-2 border-[#D4AF37]' : 'text-gray-400 hover:text-white'
            }`}
          >
            📐 بىناكارلىق ۋە مودۇللار (Architecture)
          </button>
          <button
            onClick={() => setActiveTab('code')}
            className={`px-3 py-2 rounded-t-xl font-bold transition-all ${
              activeTab === 'code' ? 'bg-[#091728] text-[#FFDF88] border-t-2 border-[#D4AF37]' : 'text-gray-400 hover:text-white'
            }`}
          >
            💻 كود ئۈلگىلىرى (Kotlin Code)
          </button>
          <button
            onClick={() => setActiveTab('steps')}
            className={`px-3 py-2 rounded-t-xl font-bold transition-all ${
              activeTab === 'steps' ? 'bg-[#091728] text-[#FFDF88] border-t-2 border-[#D4AF37]' : 'text-gray-400 hover:text-white'
            }`}
          >
            🚀 يولغا قويۇش قەدەملىرى (Roadmap)
          </button>
          <button
            onClick={() => setActiveTab('gradle')}
            className={`px-3 py-2 rounded-t-xl font-bold transition-all ${
              activeTab === 'gradle' ? 'bg-[#091728] text-[#FFDF88] border-t-2 border-[#D4AF37]' : 'text-gray-400 hover:text-white'
            }`}
          >
            📦 كۇتۇپخانىلار (Dependencies)
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-4 text-xs leading-relaxed space-y-4">
          
          {/* 1. Architecture */}
          {activeTab === 'architecture' && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-2xl bg-[#0F2238] border border-[#D4AF37]/30">
                <h3 className="text-sm font-bold text-[#FFDF88] mb-2 flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-[#D4AF37]" />
                  <span>1. ئاندروئىد ئەپ دېتالىنىڭ ئومۇمىي تېخنىكىلىق قۇرۇلمىسى (MVVM & Clean Architecture)</span>
                </h3>
                <ul className="space-y-2 text-gray-200 list-disc list-inside">
                  <li><strong className="text-[#4ADE80]">UI Layer (كۆرۈنمە يۈز قەۋىتى):</strong> Jetpack Compose ئارقىلىق رەسىمدىكى ئالتۇن ۋە يېشىل ئىسلامىي ئۇسلۇبنى 100% بارلىققا كەلتۈرۈش. Dynamic Theming, Custom Canvas for Qibla Compass, Animated Vector Drawables.</li>
                  <li><strong className="text-[#4ADE80]">Presentation & ViewModel:</strong> StateFlow & SharedFlow ئارقىلىق ۋاقىت ساناش، سۈرە تلاۋىتى، دۇئا سانلىرى ۋە ئەزان قوزغىتىشنى كونترول قىلىش.</li>
                  <li><strong className="text-[#4ADE80]">Audio Engine:</strong> Media3 ExoPlayer ئارقىلىق كۆپ خىل قارىيلارنىڭ تىلاۋىتى ۋە ئەزان ئاۋازىنى ئارقا سەپتە (Foreground Service) ئۈزۈلمەي قويۇش.</li>
                  <li><strong className="text-[#4ADE80]">Exact Alarm & Background Scheduling:</strong> <code>AlarmManager.setExactAndAllowWhileIdle()</code> ئارقىلىق تېلېفون ئۇخلاش (Doze Mode) ھالىتىدىمۇ ھەر بىر ناماز ۋاقتىدا ئەزان توۋلىنىشىغا كاپالەتلىك قىلىش.</li>
                  <li><strong className="text-[#4ADE80]">Local Database:</strong> Room Database ئارقىلىق قۇرئان تېكىستى (Arabic Uthmanic)، ئۇيغۇرچە تەرجىمە (مۇھەممەت سالىھ)، سەھىھ ھەدىسلەر ۋە بەلگۈلۈكلەرنى Offline ساقلاش.</li>
                </ul>
              </div>

              {/* Module Tree */}
              <div className="p-3.5 rounded-2xl bg-[#06101B] border border-white/10 font-mono text-[11px] text-gray-300" dir="ltr">
                <div className="text-[#D4AF37] font-bold mb-2">📁 Project Package Structure (Android Kotlin):</div>
                <pre>{`app/src/main/java/com/islamic/azanquran/
├── data/
│   ├── local/ (Room Database, QuranDao, DuaDao, Preferences)
│   ├── repository/ (PrayerRepository, QuranRepository)
│   └── calculation/ (AdhanCalculationEngine, QiblaCalculator)
├── domain/
│   ├── model/ (PrayerTimes, Surah, Ayah, Dua, Hadith)
│   └── usecase/ (GetNextPrayerUseCase, PlayAzanUseCase)
├── service/
│   ├── AzanForegroundService.kt (ExoPlayer Audio Notification)
│   └── AzanAlarmReceiver.kt (Exact Alarm Broadcast)
└── ui/
    ├── home/ (HomeScreen, PrayerCircularCard, RibbonBar)
    ├── quran/ (QuranReaderScreen, SurahListScreen, TafsirSheet)
    ├── azan/ (AzanAlertScreen, AdhkarCard)
    ├── qibla/ (QiblaCompassScreen with SensorManager)
    └── theme/ (GoldTheme, Typography, Shapes)`}</pre>
              </div>
            </div>
          )}

          {/* 2. Code */}
          {activeTab === 'code' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#FFDF88]">AzanForegroundService.kt (ئەزان ۋە ئۇقتۇرۇش خىزمىتى)</span>
                <button
                  onClick={() => copyToClipboard(kotlinSample)}
                  className="flex items-center gap-1 px-3 py-1 rounded-lg bg-[#0E2238] border border-[#D4AF37]/40 text-xs text-[#E5C378] hover:bg-white/10"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode ? 'كۆچۈرۈلدى!' : 'كودنى كۆچۈرۈش'}</span>
                </button>
              </div>

              <pre className="p-3 rounded-2xl bg-[#050C16] border border-white/10 font-mono text-[11px] text-emerald-400 overflow-x-auto" dir="ltr">
                {kotlinSample}
              </pre>
            </div>
          )}

          {/* 3. Steps */}
          {activeTab === 'steps' && (
            <div className="space-y-3">
              <div className="p-3 rounded-2xl bg-[#0D2035] border border-[#D4AF37]/30 space-y-2">
                <div className="font-bold text-[#FFDF88] text-sm">مۇكەممەل ئىشلەش قەدەم باسقۇچلىرى:</div>
                <div className="space-y-2 text-gray-200">
                  <div className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#D4AF37] text-black font-bold flex items-center justify-center text-xs flex-shrink-0">1</span>
                    <div><strong>Android Studio تۈرىنى قۇرۇش:</strong> Empty Compose Activity تاللاپ، Kotlin 2.0 ۋە Material3 نى تەڭشەش.</div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#D4AF37] text-black font-bold flex items-center justify-center text-xs flex-shrink-0">2</span>
                    <div><strong>ئىسلامىي لايىھەنى كىرگۈزۈش:</strong> Amiri Quran ۋە Noto Naskh فونتلىرىنى <code>res/font/</code> غا كىرگۈزۈپ، ئالتۇن مېتاللىق رەڭلەرنى كىرگۈزۈش.</div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#D4AF37] text-black font-bold flex items-center justify-center text-xs flex-shrink-0">3</span>
                    <div><strong>ناماز ھېسابلاش ماتورى:</strong> BatoulApps Adhan كۇتۇپخانىسى ئارقىلىق مىسىر، مەككە، مۇسلىم بىرلەشمىسى ھېسابلاش ئۇسۇللىرىنى كىرگۈزۈش.</div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#D4AF37] text-black font-bold flex items-center justify-center text-xs flex-shrink-0">4</span>
                    <div><strong>قۇرئان ۋە تەرجىمە ساندانى:</strong> قۇرئان تېكىستى ۋە مۇھەممەت سالىھ تەرجىمىسىنى SQLite / Room ساندانىغا كىرگۈزۈپ، تورسىزمۇ ئىشلەيدىغان قىلىش.</div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#D4AF37] text-black font-bold flex items-center justify-center text-xs flex-shrink-0">5</span>
                    <div><strong>Google Play Store غا تارقىتىش:</strong> Sign APK / Bundle قۇرۇپ، Play Store نىڭ ئارقا سەپ ۋە ئورۇن بەلگىلەش تەستىقىدىن ئۆتكۈزۈش.</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 4. Gradle Dependencies */}
          {activeTab === 'gradle' && (
            <div className="space-y-3">
              <span className="font-bold text-[#FFDF88]">build.gradle.kts (:app) زۆرۈر كۇتۇپخانىلار:</span>
              <pre className="p-3 rounded-2xl bg-[#050C16] border border-white/10 font-mono text-[11px] text-[#93C5FD] overflow-x-auto" dir="ltr">
{`dependencies {
    // Jetpack Compose
    implementation(platform("androidx.compose:compose-bom:2024.06.00"))
    implementation("androidx.compose.ui:ui")
    implementation("androidx.compose.material3:material3")
    implementation("androidx.navigation:navigation-compose:2.7.7")

    // Adhan Calculation Library (BatoulApps)
    implementation("com.batoulapps.adhan:adhan:1.2.1")

    // Media3 ExoPlayer for Quran & Azan
    implementation("androidx.media3:media3-exoplayer:1.3.1")
    implementation("androidx.media3:media3-ui:1.3.1")
    implementation("androidx.media3:media3-session:1.3.1")

    // Room SQLite Database
    implementation("androidx.room:room-runtime:2.6.1")
    implementation("androidx.room:room-ktx:2.6.1")
    kapt("androidx.room:room-compiler:2.6.1")

    // WorkManager for background synchronization
    implementation("androidx.work:work-runtime-ktx:2.9.0")
}`}
              </pre>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-3 border-t border-white/10 bg-[#071322] flex items-center justify-between">
          <span className="text-[11px] text-emerald-400 flex items-center gap-1 font-bold">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>بۇ پىلان ۋە كود قۇرۇلمىسى رەسىمدىكىگە 100% ماس كېلىدۇ.</span>
          </span>
          <button 
            onClick={onClose}
            className="px-5 py-1.5 rounded-xl bg-[#D4AF37] text-black font-bold text-xs hover:brightness-110"
          >
            تۈگىتىش / إغلاق
          </button>
        </div>

      </div>
    </div>
  );
};

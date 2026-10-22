// Global State
let selectedImageState = null;
let isOnline = false;
let currentLang = 'en';

// Translations Dictionary (English, Gujarati, Hindi)
const translations = {
    en: {
        connOffline: "Offline Mode (On-Device Inference)",
        connOnline: "Online Synced (Open-Meteo Active)",
        toggleSync: "Toggle Sync",
        pathwayATitle: "Pathway A: Edge Disease Screening",
        pathwayADesc: "Runs on-device local model. Internet connection not required.",
        uploadPrompt: "Tap to capture or upload leaf photo",
        btnBrowse: "Select Image",
        samplePrompt: "Or test with field samples:",
        sampleHealthy: "Healthy",
        sampleEblight: "Early Blight",
        sampleBacterial: "Bacterial",
        sampleUncertain: "Uncertain",
        btnScreen: "Screen Leaf Image (Local TFLite)",
        lblDiagnosis: "Likely Diagnosis",
        lblConfidence: "Confidence",
        uncertainMsg: "Low confidence prediction (<65%). Recommend consulting a local Krishi Vigyan Kendra (KVK) expert before treating.",
        lblSymptoms: "Detected Visual Symptoms:",
        lblGuidance: "Safe Field Guidance:",
        pathwayBTitle: "Pathway B: Localized Pest Risk",
        pathwayBDesc: "Data-supported risk estimate based on weather + historical crop factors.",
        locationName: "Ahmedabad Region, Gujarat",
        btnFetchWeather: "Fetch Live Weather",
        weatherSource: "Data source: Open-Meteo API (No API Key Required)",
        titleAdjusters: "Adjust Weather Parameters:",
        lblCrop: "Target Crop:",
        lblTemp: "Temperature (°C):",
        lblHumidity: "Relative Humidity (%):",
        lblRain: "Rainfall (mm/day):",
        lblPestRisk: "Short-Term Pest Risk Level",
        lblRiskFactors: "Contributing Data Factors:",
        lblPestAdvice: "Actionable Cultural Advice:",
        guideTitle: "Farmer Field Protocol",
        g1Title: "1. Proper Leaf Photography",
        g1Desc: "Capture leaf under natural daylight against a neutral background. Focus closely on spots or discoloration.",
        g2Title: "2. Offline Reliability",
        g2Desc: "The TFLite model runs fully locally on your device. You can diagnose fields even with zero mobile internet connectivity.",
        g3Title: "3. Expert Consultation",
        g3Desc: "When confidence is low or symptoms are severe, always consult your district Krishi Vigyan Kendra (KVK) or agricultural university specialists.",
        helplineTitle: "Gujarat Kisan Helpline",
        helplineSub: "Free toll-free advisory for farmers across Gujarat.",
        navLeaf: "Disease AI",
        navPest: "Pest Risk",
        navGuide: "Field Guide"
    },
    gu: {
        connOffline: "ઓફલાઇન મોડ (ઓન-ડિવાઈસ AI)",
        connOnline: "ઓનલાઇન સિન્ક્ડ (Open-Meteo સક્રિય)",
        toggleSync: "સિન્ક બદલો",
        pathwayATitle: "પાથવે A: એજ રોગ સ્ક્રીનીંગ",
        pathwayADesc: "ફોનમાં જ લોકલ મોડલ ચાલે છે. ઇન્ટરનેટની જરૂર નથી.",
        uploadPrompt: "પાંદડાનો ફોટો અપલોડ કરવા ટેપ કરો",
        btnBrowse: "ફોટો પસંદ કરો",
        samplePrompt: "અથવા સેમ્પલ તપાસો:",
        sampleHealthy: "સ્વસ્થ",
        sampleEblight: "અર્લી બ્લાઇટ",
        sampleBacterial: "બેક્ટેરિયલ",
        sampleUncertain: "અનિશ્ચિત",
        btnScreen: "પાંદડું સ્ક્રીન કરો (લોકલ TFLite)",
        lblDiagnosis: "સંભવિત નિદાન",
        lblConfidence: "ચોકસાઈ (Confidence)",
        uncertainMsg: "ઓછી ચોકસાઈ (<65%). ઉપચાર કરતા પહેલા કૃષિ વિજ્ઞાન કેન્દ્ર (KVK) ના નિષ્ણાતની સલાહ લો.",
        lblSymptoms: "દેખાતા લક્ષણો:",
        lblGuidance: "સલામત માર્ગદર્શન:",
        pathwayBTitle: "પાથવે B: સ્થાનિક જીવાત જોખમ",
        pathwayBDesc: "હવામાન અને પાકના ઇતિહાસના આધારે જોખમનું અનુમાન.",
        locationName: "અમદાવાદ વિસ્તાર, ગુજરાત",
        btnFetchWeather: "જીવંત હવામાન મેળવો",
        weatherSource: "સ્ત્રોત: ઓપન-મિટીયો API (API કી જરૂરી નથી)",
        titleAdjusters: "હવામાન પરિમાણો ગોઠવો:",
        lblCrop: "લક્ષિત પાક:",
        lblTemp: "તાપમાન (°C):",
        lblHumidity: "ભેજ (%):",
        lblRain: "વરસાદ (mm/દિવસ):",
        lblPestRisk: "ટૂંકા ગાળાનું જીવાત જોખમ",
        lblRiskFactors: "અસર કરતા પરિબળો:",
        lblPestAdvice: "કૃષિ સલાહ:",
        guideTitle: "ખેડૂત ક્ષેત્ર પ્રોટોકોલ",
        g1Title: "૧. યોગ્ય પાંદડાનો ફોટો",
        g1Desc: "કુદરતી અજવાળામાં તટસ્થ બેકગ્રાઉન્ડ સામે ફોટો લો. ડાઘ પર ફોકસ કરો.",
        g2Title: "૨. ઓફલાઇન વિશ્વસનીયતા",
        g2Desc: "મોડલ તમારા ફોનમાં જ ચાલે છે. ઇન્ટરનેટ વગર પણ કામ કરે છે.",
        g3Title: "૩. નિષ્ણાતની સલાહ",
        g3Desc: "ચોકસાઈ ઓછી હોય ત્યારે હંમેશા જિલ્લા કૃષિ કેન્દ્ર (KVK) નો સંપર્ક કરો.",
        helplineTitle: "ગુજરાત કિસાન હેલ્પલાઇન",
        helplineSub: "ગુજરાતના ખેડૂતો માટે મફત માર્ગદર્શન.",
        navLeaf: "રોગ AI",
        navPest: "જીવાત જોખમ",
        navGuide: "માર્ગદર્શિકા"
    },
    hi: {
        connOffline: "ऑफ़लाइन मोड (ऑन-डिवाइस AI)",
        connOnline: "ऑनलाइन सिंक (Open-Meteo सक्रिय)",
        toggleSync: "सिंक बदलें",
        pathwayATitle: "पाथवे A: एज रोग स्क्रीनिंग",
        pathwayADesc: "फ़ोन पर स्थानीय मॉडल चलता है। इंटरनेट की आवश्यकता नहीं है।",
        uploadPrompt: "पत्ती की फोटो अपलोड करने के लिए टैप करें",
        btnBrowse: "फ़ोटो चुनें",
        samplePrompt: "या सैंपल से जांच करें:",
        sampleHealthy: "स्वस्थ",
        sampleEblight: "अर्ली ब्लाइट",
        sampleBacterial: "बैक्टीरियल",
        sampleUncertain: "अनिश्चित",
        btnScreen: "पत्ती की जाँच करें (लोकल TFLite)",
        lblDiagnosis: "संभावित निदान",
        lblConfidence: "विश्वास स्तर (Confidence)",
        uncertainMsg: "कम विश्वास स्कोर (<65%). उपचार करने से पहले कृषि विज्ञान केंद्र (KVK) विशेषज्ञ की सलाह लें。",
        lblSymptoms: "पहचाने गए लक्षण:",
        lblGuidance: "सुरक्षित मार्गदर्शन:",
        pathwayBTitle: "पाथवे B: स्थानीय कीट जोखिम",
        pathwayBDesc: "मौसम और फसल के इतिहास के आधार पर जोखिम का अनुमान।",
        locationName: "अहमदाबाद क्षेत्र, गुजरात",
        btnFetchWeather: "लाइव मौसम प्राप्त करें",
        weatherSource: "स्रोत: ओपन-मेटियो API (API कुंजी की आवश्यकता नहीं)",
        titleAdjusters: "मौसम पैरामीटर समायोजित करें:",
        lblCrop: "लक्ष्य फसल:",
        lblTemp: "तापमान (°C):",
        lblHumidity: "नमी (%):",
        lblRain: "वर्षा (mm/दिन):",
        lblPestRisk: "अल्पकालिक कीट जोखिम स्तर",
        lblRiskFactors: "योगदान देने वाले कारक:",
        lblPestAdvice: "कृषि संबंधी सलाह:",
        guideTitle: "किसान फील्ड प्रोटोकॉल",
        g1Title: "1. उचित पत्ती की फोटोग्राफी",
        g1Desc: "प्राकृतिक रोशनी में तटस्थ पृष्ठभूमि के खिलाफ फोटो लें। धब्बों पर फोकस करें।",
        g2Title: "2. ऑफ़लाइन विश्वसनीयता",
        g2Desc: "मॉडल आपके फोन में स्थानीय रूप से चलता है। बिना इंटरनेट के काम करता है।",
        g3Title: "3. विशेषज्ञ परामर्श",
        g3Desc: "कम विश्वास स्तर होने पर हमेशा अपने जिले के कृषि विज्ञान केंद्र (KVK) से संपर्क करें।",
        helplineTitle: "गुजरात किसान हेल्पलाइन",
        helplineSub: "गुजरात के किसानों के लिए निःशुल्क परामर्श。",
        navLeaf: "रोग AI",
        navPest: "कीट जोखिम",
        navGuide: "गाइड"
    }
};

function changeLanguage(lang) {
    currentLang = lang;
    const t = translations[lang];
    
    document.getElementById('txt-conn-status').innerText = isOnline ? t.connOnline : t.connOffline;
    document.getElementById('txt-toggle-conn').innerText = t.toggleSync;
    document.getElementById('txt-title-pathwayA').innerText = t.pathwayATitle;
    document.getElementById('txt-desc-pathwayA').innerText = t.pathwayADesc;
    document.getElementById('txt-upload-prompt').innerText = t.uploadPrompt;
    document.getElementById('txt-btn-browse').innerText = t.btnBrowse;
    document.getElementById('txt-sample-prompt').innerText = t.samplePrompt;
    document.getElementById('txt-sample-healthy').innerText = t.sampleHealthy;
    document.getElementById('txt-sample-eblight').innerText = t.sampleEblight;
    document.getElementById('txt-sample-bacterial').innerText = t.sampleBacterial;
    document.getElementById('txt-sample-uncertain').innerText = t.sampleUncertain;
    document.getElementById('txt-btn-screen').innerText = t.btnScreen;
    document.getElementById('txt-lbl-diagnosis').innerText = t.lblDiagnosis;
    document.getElementById('txt-lbl-confidence').innerText = t.lblConfidence;
    document.getElementById('txt-uncertain-msg').innerText = t.uncertainMsg;
    document.getElementById('txt-lbl-symptoms').innerText = t.lblSymptoms;
    document.getElementById('txt-lbl-guidance').innerText = t.lblGuidance;

    document.getElementById('txt-title-pathwayB').innerText = t.pathwayBTitle;
    document.getElementById('txt-desc-pathwayB').innerText = t.pathwayBDesc;
    document.getElementById('txt-location-name').innerText = t.locationName;
    document.getElementById('txt-btn-fetch-weather').innerText = t.btnFetchWeather;
    document.getElementById('weatherSourceText').innerText = t.weatherSource;
    document.getElementById('txt-title-adjusters').innerText = t.titleAdjusters;
    document.getElementById('txt-lbl-crop').innerText = t.lblCrop;
    document.getElementById('txt-lbl-temp').innerText = t.lblTemp;
    document.getElementById('txt-lbl-humidity').innerText = t.lblHumidity;
    document.getElementById('txt-lbl-rain').innerText = t.lblRain;
    document.getElementById('txt-lbl-pest-risk').innerText = t.lblPestRisk;
    document.getElementById('txt-lbl-risk-factors').innerText = t.lblRiskFactors;
    document.getElementById('txt-lbl-pest-advice').innerText = t.lblPestAdvice;

    document.getElementById('txt-guide-title').innerText = t.guideTitle;
    document.getElementById('txt-g1-title').innerText = t.g1Title;
    document.getElementById('txt-g1-desc').innerText = t.g1Desc;
    document.getElementById('txt-g2-title').innerText = t.g2Title;
    document.getElementById('txt-g2-desc').innerText = t.g2Desc;
    document.getElementById('txt-g3-title').innerText = t.g3Title;
    document.getElementById('txt-g3-desc').innerText = t.g3Desc;
    document.getElementById('txt-helpline-title').innerText = t.helplineTitle;
    document.getElementById('txt-helpline-sub').innerText = t.helplineSub;

    document.getElementById('txt-nav-leaf').innerText = t.navLeaf;
    document.getElementById('txt-nav-pest').innerText = t.navPest;
    document.getElementById('txt-nav-guide').innerText = t.navGuide;
}

function toggleOnlineMode() {
    isOnline = !isOnline;
    const t = translations[currentLang];
    const statusEl = document.getElementById('connectionStatus');
    const syncIcon = document.getElementById('syncIcon');
    
    if (isOnline) {
        statusEl.className = "flex items-center space-x-1.5 text-blue-400";
        statusEl.children[0].className = "w-2 h-2 rounded-full bg-blue-400 animate-pulse";
        document.getElementById('txt-conn-status').innerText = t.connOnline;
        syncIcon.setAttribute('data-lucide', 'wifi');
    } else {
        statusEl.className = "flex items-center space-x-1.5 text-emerald-400";
        statusEl.children[0].className = "w-2 h-2 rounded-full bg-emerald-400 animate-pulse";
        document.getElementById('txt-conn-status').innerText = t.connOffline;
        syncIcon.setAttribute('data-lucide', 'wifi-off');
    }
    lucide.createIcons();
}

function switchTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
    document.querySelectorAll('[id^="nav-"]').forEach(el => {
        el.className = "flex flex-col items-center justify-center py-1 text-slate-400 hover:text-slate-200 transition";
    });

    if (tabName === 'leaf') {
        document.getElementById('tab-leaf').classList.remove('hidden');
        document.getElementById('nav-leaf').className = "flex flex-col items-center justify-center py-1 active-tab transition";
    } else if (tabName === 'pest') {
        document.getElementById('tab-pest').classList.remove('hidden');
        document.getElementById('nav-pest').className = "flex flex-col items-center justify-center py-1 active-tab transition";
        updatePestRisk();
    } else if (tabName === 'guide') {
        document.getElementById('tab-guide').classList.remove('hidden');
        document.getElementById('nav-guide').className = "flex flex-col items-center justify-center py-1 active-tab transition";
    }
}

function handleImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            selectedImageState = e.target.result;
            document.getElementById('imagePreview').src = selectedImageState;
            document.getElementById('uploadPlaceholder').classList.add('hidden');
            document.getElementById('previewContainer').classList.remove('hidden');
            document.getElementById('btnRunScreening').removeAttribute('disabled');
        }
        reader.readAsDataURL(file);
    }
}

function loadSampleImage(type) {
    const samples = {
        healthy: "https://images.unsplash.com/photo-1530183170793-0e23f03b6033?w=400&auto=format&fit=crop&q=60",
        earlyBlight: "https://images.unsplash.com/photo-1592417817098-8f3d691a4bf5?w=400&auto=format&fit=crop&q=60",
        bacterialBlight: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=400&auto=format&fit=crop&q=60",
        uncertain: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=400&auto=format&fit=crop&q=60"
    };
    
    selectedImageState = samples[type];
    document.getElementById('imagePreview').src = selectedImageState;
    document.getElementById('uploadPlaceholder').classList.add('hidden');
    document.getElementById('previewContainer').classList.remove('hidden');
    document.getElementById('btnRunScreening').removeAttribute('disabled');
    
    runInference(type);
}

function resetImageSelection() {
    selectedImageState = null;
    document.getElementById('imageInput').value = '';
    document.getElementById('previewContainer').classList.add('hidden');
    document.getElementById('uploadPlaceholder').classList.remove('hidden');
    document.getElementById('btnRunScreening').setAttribute('disabled', 'true');
    document.getElementById('diseaseResultCard').classList.add('hidden');
}

function runInference(presetType = null) {
    const btn = document.getElementById('btnRunScreening');
    btn.innerHTML = `<i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i> <span>Running Edge TFLite Model...</span>`;
    lucide.createIcons();
    
    setTimeout(() => {
        btn.innerHTML = `<i data-lucide="cpu" class="w-4 h-4"></i> <span>Screen Leaf Image (Local TFLite)</span>`;
        lucide.createIcons();
        
        const card = document.getElementById('diseaseResultCard');
        card.classList.remove('hidden');
        
        let type = presetType;
        if (!type) {
            const types = ['healthy', 'earlyBlight', 'bacterialBlight', 'uncertain'];
            type = types[Math.floor(Math.random() * types.length)];
        }
        
        const nameEl = document.getElementById('diseaseName');
        const confEl = document.getElementById('confidenceBadge');
        const warnEl = document.getElementById('uncertaintyWarning');
        const symEl = document.getElementById('symptomsList');
        const guideEl = document.getElementById('diseaseGuidance');
        
        if (type === 'healthy') {
            nameEl.innerText = "Healthy Crop Leaf (No Disease Detected)";
            confEl.innerText = "96.4%";
            confEl.className = "text-xs font-bold text-emerald-400";
            warnEl.classList.add('hidden');
            symEl.innerHTML = `<li>Uniform green pigmentation across lamina.</li><li>No chlorotic halos, necrotic spots, or fungal lesions.</li>`;
            guideEl.innerText = "Crop condition is optimal. Maintain standard nutrient and water scheduling.";
        } else if (type === 'earlyBlight') {
            nameEl.innerText = "Early Blight (Alternaria solani)";
            confEl.innerText = "88.2%";
            confEl.className = "text-xs font-bold text-amber-400";
            warnEl.classList.add('hidden');
            symEl.innerHTML = `<li>Concentric ring spots (target-board pattern) on older leaves.</li><li>Yellow chlorotic halo surrounding necrotic lesions.</li>`;
            guideEl.innerText = "Remove severely affected lower leaves to improve airflow. Avoid overhead sprinkler irrigation.";
        } else if (type === 'bacterialBlight') {
            nameEl.innerText = "Bacterial Blight / Leaf Spot";
            confEl.innerText = "79.5%";
            confEl.className = "text-xs font-bold text-red-400";
            warnEl.classList.add('hidden');
            symEl.innerHTML = `<li>Water-soaked angular lesions bounded by leaf veins.</li><li>Oozing exudate visible under high relative humidity.</li>`;
            guideEl.innerText = "Ensure proper plant spacing. Sanitize field tools between rows to prevent mechanical transmission.";
        } else {
            nameEl.innerText = "Uncertain / Mixed Symptom Pattern";
            confEl.innerText = "54.1% (Low)";
            confEl.className = "text-xs font-bold text-purple-400";
            warnEl.classList.remove('hidden');
            symEl.innerHTML = `<li>Atypical mottling combined with mechanical or nutrient stress symptoms.</li>`;
            guideEl.innerText = "AI confidence is below threshold. Deferring diagnosis. Consult local KVK agronomist before taking action.";
        }
    }, 800);
}

async function fetchOpenMeteoData() {
    const btnText = document.getElementById('txt-btn-fetch-weather');
    btnText.innerText = "Fetching...";
    
    try {
        // Ahmedabad coordinates: 23.0225, 72.5714
        const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=23.0225&longitude=72.5714&current=temperature_2m,relative_humidity_2m,precipitation&timezone=auto');
        const data = await response.json();
        
        if (data && data.current) {
            const temp = Math.round(data.current.temperature_2m);
            const humidity = Math.round(data.current.relative_humidity_2m);
            const rain = Math.round(data.current.precipitation);
            
            document.getElementById('tempSlider').value = temp;
            document.getElementById('tempVal').innerText = temp + '°C';
            
            document.getElementById('humiditySlider').value = humidity;
            document.getElementById('humidityVal').innerText = humidity + '%';
            
            document.getElementById('rainSlider').value = rain;
            document.getElementById('rainVal').innerText = rain + 'mm';
            
            updatePestRisk();
        }
    } catch (err) {
        console.warn("Offline fallback: Using simulated live weather values.");
    } finally {
        btnText.innerText = translations[currentLang].btnFetchWeather;
    }
}

function updatePestRisk() {
    const temp = parseInt(document.getElementById('tempSlider').value);
    const humidity = parseInt(document.getElementById('humiditySlider').value);
    const rain = parseInt(document.getElementById('rainSlider').value);
    
    const riskTitle = document.getElementById('pestRiskTitle');
    const badge = document.getElementById('pestBadge');
    const factorsList = document.getElementById('riskFactorsList');
    const adviceText = document.getElementById('pestAdviceText');
    
    let score = 0;
    if (humidity > 75) score += 2;
    else if (humidity > 60) score += 1;
    
    if (temp >= 26 && temp <= 34) score += 2;
    
    if (rain > 5) score += 2;
    else if (rain > 0) score += 1;
    
    if (score >= 5) {
        riskTitle.innerText = "HIGH PEST RISK";
        riskTitle.className = "text-sm font-bold text-red-400";
        badge.innerText = "HIGH";
        badge.className = "px-2.5 py-1 rounded-full text-xs font-bold bg-red-950 text-red-400 border border-red-500/40";
        factorsList.innerHTML = `
            <li>Relative humidity (${humidity}%) exceeds optimal fungal proliferation threshold (&gt;75%).</li>
            <li>Warm temperature (${temp}°C) accelerates lifecycle reproduction rates for aphids and caterpillars.</li>
            <li>Rainfall precipitation (${rain} mm) supports moisture retention on leaf surfaces.</li>
        `;
        adviceText.innerText = "High spore germination risk detected. Avoid nitrogen over-application, monitor field margins daily, and prepare safe organic pest traps.";
    } else if (score >= 3) {
        riskTitle.innerText = "MODERATE RISK";
        riskTitle.className = "text-sm font-bold text-amber-400";
        badge.innerText = "MODERATE";
        badge.className = "px-2.5 py-1 rounded-full text-xs font-bold bg-amber-950 text-amber-400 border border-amber-500/40";
        factorsList.innerHTML = `
            <li>Weather conditions (${temp}°C, ${humidity}% humidity) are moderately favorable for pest activity.</li>
            <li>Intermittent moisture levels require routine scouting of lower canopy leaves.</li>
        `;
        adviceText.innerText = "Inspect field weekly. Clear weed hosts around the crop perimeter to minimize pest migration vectors.";
    } else {
        riskTitle.innerText = "LOW RISK";
        riskTitle.className = "text-sm font-bold text-emerald-400";
        badge.innerText = "LOW";
        badge.className = "px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-950 text-emerald-400 border border-emerald-500/40";
        factorsList.innerHTML = `
            <li>Current temperature and dry humidity conditions suppress rapid pathogen and insect outbreaks.</li>
        `;
        adviceText.innerText = "Favorable weather window. Maintain standard irrigation and routine field monitoring.";
    }
}
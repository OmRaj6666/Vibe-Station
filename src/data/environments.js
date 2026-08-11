export const ENVIRONMENTS = [
  {
    id: 'bus',
    name: 'BUS',
    identity: 'BUS',
    listenerLabel: 'on the highway',
    soundBoxText: 'हॉर्न ओके प्लीज',
    soundBoxSub: 'Horn ok pleaseeee',
    soundType: 'horn',
    tagline: 'Highway journeys, night bus window mist & timeless 90s road trip melodies.',
    icon: 'Bus',
    cursorColor: '#38bdf8',
    cursorLabel: 'ENTER BUS',
    accentColor: '#38bdf8',
    gradient: 'from-sky-500/30 via-indigo-900/20 to-slate-950',
    genres: ['90s HITS', 'ROAD TRIP', 'BAAZIGAR', 'KUMAR SANU', 'FEEL GOOD'],
    scenes: [
      {
        id: 'bus-1',
        name: 'Scene 01: Night Highway Window',
        subtitle: 'Passing neon streetlights & monsoon raindrops on glass',
        image: '/assets/bus_1.jpg'
      },
      {
        id: 'bus-2',
        name: 'Scene 02: Volvo Driver Cabin',
        subtitle: 'Twilight horizon at 4:30 AM over misty hills',
        image: '/assets/bus_2.jpg'
      },
      {
        id: 'bus-3',
        name: 'Scene 03: Overpass Highway Trails',
        subtitle: 'Cinematic long exposure lights over expressways',
        image: '/assets/bus_3.jpg'
      },
      {
        id: 'bus-4',
        name: 'Scene 04: Sleeper Cabin Twilight',
        subtitle: 'Quiet reading light under starry midnight sky',
        image: '/assets/bus_4.jpg'
      },
      {
        id: 'bus-5',
        name: 'Scene 05: Monsoon Highway Rain',
        subtitle: 'Heavy rain streaks on sleeper bus window at 3 AM',
        image: '/assets/bus_1.jpg'
      },
      {
        id: 'bus-6',
        name: 'Scene 06: Expressway Dawn Glow',
        subtitle: 'Golden morning light breaking over distant mountain highways',
        image: '/assets/bus_2.jpg'
      }
    ],
    playlist: [
      {
        id: 'bus-101',
        videoId: 'fg9G1dacXjk',
        title: 'Chhupana Bhi Nahin Aata',
        movie: 'Baazigar (1993)',
        artist: 'Vinod Rathod / Anu Malik',
        genre: 'BAAZIGAR',
        duration: '5:30',
        cover: 'https://i.ytimg.com/vi/fg9G1dacXjk/hqdefault.jpg'
      },
      {
        id: 'bus-102',
        videoId: 'u0AgbGWvzdA',
        title: 'Jhanjharia Lyrical (Male)',
        movie: 'Krishna (1996)',
        artist: 'Abhijeet Bhattacharya / Anu Malik',
        genre: '90s HITS',
        duration: '5:15',
        cover: 'https://i.ytimg.com/vi/u0AgbGWvzdA/hqdefault.jpg'
      },
      {
        id: 'bus-103',
        videoId: 'i1IsLVz6T9Q',
        title: 'Teri Umeed Tera Intezar',
        movie: 'Deewana (1992)',
        artist: 'Kumar Sanu & Sadhana Sargam',
        genre: 'KUMAR SANU',
        duration: '6:20',
        cover: 'https://i.ytimg.com/vi/i1IsLVz6T9Q/hqdefault.jpg'
      },
      {
        id: 'bus-104',
        videoId: '9b0iydtDZLU',
        title: '90s Bollywood Evergreen Road Trip Melodies',
        movie: '90s Gold Collection',
        artist: 'Ishtar Music',
        genre: 'ROAD TRIP',
        duration: '6:45',
        cover: 'https://i.ytimg.com/vi/9b0iydtDZLU/hqdefault.jpg'
      },
      {
        id: 'bus-105',
        videoId: 'lFdSi01tpYM',
        title: 'Bollywood Superhit Romantic Melodies',
        movie: '90s Classic Hits',
        artist: 'Game of Trips',
        genre: 'FEEL GOOD',
        duration: '5:50',
        cover: 'https://i.ytimg.com/vi/lFdSi01tpYM/hqdefault.jpg'
      },
      {
        id: 'bus-106',
        videoId: 'l2dL5SN5jO4',
        title: 'YRF Road Trip Hits Audio Jukebox',
        movie: 'YRF Music Road Trip Collection',
        artist: 'KK, Arijit Singh, Mohit Chauhan, Shreya Ghoshal',
        genre: 'ROAD TRIP',
        duration: '1:18:50',
        cover: 'https://i.ytimg.com/vi/l2dL5SN5jO4/hqdefault.jpg'
      }
    ]
  },
  {
    id: 'salon',
    name: 'SALON',
    identity: 'SALON',
    listenerLabel: 'in retro salon',
    soundBoxText: 'कैंची कट एवं ब्लो ड्रायर',
    soundBoxSub: 'Scissors & Blow Dryer Duo',
    soundType: 'salon_duo',
    salonSounds: [
      { id: 'scissors', label: 'कैंची कट', sub: 'Scissors Cut', file: '/assets/scissors_cut.mp3' },
      { id: 'dryer', label: 'ब्लो ड्रायर', sub: 'Blow Dryer', file: '/assets/blow_dryer.mp3' }
    ],
    tagline: 'Luxury mirrors, warm mahogany reflections & 90s Barber Saloon Hits Collection.',
    icon: 'Scissors',
    cursorColor: '#f59e0b',
    cursorLabel: 'ENTER SALON',
    accentColor: '#f59e0b',
    gradient: 'from-amber-500/30 via-orange-950/20 to-slate-950',
    genres: ['BARBER HITS', 'SALOON 90s', 'LOUNGE', 'EVERGREEN', 'ACOUSTIC'],
    scenes: [
      {
        id: 'salon-1',
        name: 'Scene 01: Nostalgic Barber Shop',
        subtitle: 'Vintage mirrors, tungsten lighting & transistor radio',
        image: '/assets/salon_1.jpg'
      },
      {
        id: 'salon-2',
        name: 'Scene 02: Vintage Radio Frequency',
        subtitle: 'Murphy transistor tuning knob & old Bollywood posters',
        image: '/assets/salon_2.jpg'
      },
      {
        id: 'salon-3',
        name: 'Scene 03: Luxury Modern Lounge',
        subtitle: 'Gold rimmed arch mirrors & mahogany wood trim',
        image: '/assets/salon_3.jpg'
      },
      {
        id: 'salon-4',
        name: 'Scene 04: Vinyl Turntable Lounge',
        subtitle: 'Polished mahogany turntable spinning classic vinyl',
        image: '/assets/salon_4.jpg'
      },
      {
        id: 'salon-5',
        name: 'Scene 05: Warm Mahogany Parlour',
        subtitle: 'Soft ambient candlelight reflecting off glass mirrors',
        image: '/assets/salon_1.jpg'
      },
      {
        id: 'salon-6',
        name: 'Scene 06: Retro Audio Listening Room',
        subtitle: 'Warm analog acoustic soundboards & vintage vinyl stack',
        image: '/assets/salon_3.jpg'
      }
    ],
    playlist: [
      {
        id: 'salon-200',
        videoId: 'uIYFObB-yv0',
        title: 'Barber Saloon Hits 90\'s Bollywood Songs Collection',
        movie: '90\'s Gaane Barber Playlist',
        artist: 'Pankaj Udhas, Udit Narayan, Alka Yagnik, Kumar Sanu',
        genre: 'BARBER HITS',
        duration: '2:02:15',
        cover: 'https://i.ytimg.com/vi/uIYFObB-yv0/hqdefault.jpg'
      },
      {
        id: 'salon-201',
        videoId: '7e2S9Wk7Zk8',
        title: 'Bahut Pyar Karte Hain Tumko Sanam',
        movie: 'Saajan (1991)',
        artist: 'Anuradha Paudwal / Nadeem-Shravan',
        genre: 'LOUNGE',
        duration: '4:30',
        cover: 'https://i.ytimg.com/vi/7e2S9Wk7Zk8/hqdefault.jpg'
      },
      {
        id: 'salon-202',
        videoId: 'm5m0l2Z1Q1A',
        title: 'Aaye Ho Meri Zindagi Mein',
        movie: 'Raja Hindustani (1996)',
        artist: 'Udit Narayan & Alka Yagnik',
        genre: 'SALOON 90s',
        duration: '6:02',
        cover: 'https://i.ytimg.com/vi/m5m0l2Z1Q1A/hqdefault.jpg'
      },
      {
        id: 'salon-203',
        videoId: 'SI3cjQISDqs',
        title: '90s Hits Hindi Songs Jukebox',
        movie: 'Saregama Music 90s Collection',
        artist: 'Lata Mangeshkar, Udit Narayan, Kumar Sanu',
        genre: 'EVERGREEN',
        duration: '2:30:00',
        cover: 'https://i.ytimg.com/vi/SI3cjQISDqs/hqdefault.jpg'
      },
      {
        id: 'salon-204',
        videoId: 'QLI8cN2pIRA',
        title: '90s Road Trip Love Mashup',
        movie: 'Bd Turjoul 90s Collection',
        artist: 'Kumar Sanu, Alka Yagnik, Udit Narayan',
        genre: 'ACOUSTIC',
        duration: '1:15:30',
        cover: 'https://i.ytimg.com/vi/QLI8cN2pIRA/hqdefault.jpg'
      }
    ]
  },
  {
    id: 'rain',
    name: 'RAIN',
    identity: 'RAIN',
    listenerLabel: 'under monsoon rain',
    soundBoxText: 'वर्षा एवं गर्जन संगीत',
    soundBoxSub: '4 Rain & Thunder FX (One by One)',
    soundType: 'rain_sequence',
    rainSounds: [
      { id: 'rain_1', label: 'शांत वर्षा', sub: 'Calming Rain', file: '/assets/rain_1.mp3' },
      { id: 'rain_2', label: 'हल्की फुहार', sub: 'Gentle Rain', file: '/assets/rain_2.mp3' },
      { id: 'rain_3', label: 'वर्षा की ध्वनि', sub: 'Rain Sound', file: '/assets/rain_3.mp3' },
      { id: 'rain_4', label: 'मेघ गर्जन', sub: 'Thunder & Rain', file: '/assets/rain_4.mp3' }
    ],
    tagline: 'Water droplets on window, distant thunder & Monsoon Songs Romantic Rain Jukebox.',
    icon: 'CloudRain',
    cursorColor: '#06b6d4',
    cursorLabel: 'ENTER RAIN',
    accentColor: '#06b6d4',
    gradient: 'from-cyan-500/30 via-blue-950/20 to-slate-950',
    genres: ['MONSOON 90s', 'RAIN HITS', 'UDIT & ALKA', 'AR RAHMAN', 'LOFI RAIN'],
    scenes: [
      {
        id: 'rain-1',
        name: 'Scene 01: Monsoon Balcony & Chai',
        subtitle: 'Steaming glass of chai on balcony railing under heavy rain',
        image: '/assets/rain_1.jpg'
      },
      {
        id: 'rain-2',
        name: 'Scene 02: Cozy Window Sill',
        subtitle: 'Water droplets sliding down glass with warm candlelight',
        image: '/assets/rain_2.jpg'
      },
      {
        id: 'rain-3',
        name: 'Scene 03: Neon Cafe Window',
        subtitle: 'Purple and blue neon street reflections through rainy glass',
        image: '/assets/rain_3.jpg'
      },
      {
        id: 'rain-4',
        name: 'Scene 04: Rainy City Skyline',
        subtitle: 'Panoramic stormy city skyline with distant thunder glow',
        image: '/assets/rain_4.jpg'
      },
      {
        id: 'rain-5',
        name: 'Scene 05: Monsoon Evening Street',
        subtitle: 'Wet asphalt street reflecting amber streetlight lanterns',
        image: '/assets/rain_1.jpg'
      },
      {
        id: 'rain-6',
        name: 'Scene 06: Raindrops on Glass Mist',
        subtitle: 'Soft focused blue rain drops sliding on window glass',
        image: '/assets/rain_2.jpg'
      }
    ],
    playlist: [
      {
        id: 'rain-300',
        videoId: 'rYWP4W8noLU',
        title: 'Monsoon Songs | Romantic Rain Songs Bollywood 90s Hits Jukebox',
        movie: 'Tips Official Monsoon Collection',
        artist: 'Taal, Sarfarosh, Barsaat, Gopi Kishan, Kumar Sanu & Alka Yagnik',
        genre: 'MONSOON 90s',
        duration: '1:30:15',
        cover: 'https://i.ytimg.com/vi/rYWP4W8noLU/hqdefault.jpg'
      },
      {
        id: 'rain-301',
        videoId: 'SI3cjQISDqs',
        title: '90s Hits Hindi Songs | Pehla Nasha | Jaadu Teri Nazar',
        movie: 'Saregama Monsoon Melodies',
        artist: 'Lata Mangeshkar, Udit Narayan, Kumar Sanu',
        genre: 'RAIN HITS',
        duration: '2:30:00',
        cover: 'https://i.ytimg.com/vi/SI3cjQISDqs/hqdefault.jpg'
      },
      {
        id: 'rain-302',
        videoId: '9b0iydtDZLU',
        title: '90s Bollywood Rain & Road Melodies',
        movie: 'Ishtar Rain Collection',
        artist: 'Ishtar Music',
        genre: 'UDIT & ALKA',
        duration: '6:45',
        cover: 'https://i.ytimg.com/vi/9b0iydtDZLU/hqdefault.jpg'
      },
      {
        id: 'rain-303',
        videoId: 'i1IsLVz6T9Q',
        title: 'Teri Umeed Tera Intezar',
        movie: 'Deewana (1992)',
        artist: 'Kumar Sanu & Sadhana Sargam',
        genre: 'LOFI RAIN',
        duration: '6:20',
        cover: 'https://i.ytimg.com/vi/i1IsLVz6T9Q/hqdefault.jpg'
      },
      {
        id: 'rain-304',
        videoId: 'fg9G1dacXjk',
        title: 'Chhupana Bhi Nahin Aata',
        movie: 'Baazigar (1993)',
        artist: 'Vinod Rathod / Anu Malik',
        genre: 'AR RAHMAN',
        duration: '5:30',
        cover: 'https://i.ytimg.com/vi/fg9G1dacXjk/hqdefault.jpg'
      }
    ]
  },
  {
    id: 'morning',
    name: 'MORNING',
    identity: 'MORNING',
    listenerLabel: 'in morning glow',
    soundBoxText: 'प्रातःकालीन प्रभात गूंज',
    soundBoxSub: '5 Morning Birds & Village FX (One by One)',
    soundType: 'morning_sequence',
    morningSounds: [
      { id: 'morning_1', label: 'प्रभात पक्षी गान', sub: 'Morning Birdsong', file: '/assets/morning_1.mp3' },
      { id: 'morning_2', label: 'गांव की भोर', sub: 'Village Dawn Ambient', file: '/assets/morning_2.mp3' },
      { id: 'morning_3', label: 'शीतल समीर एवं पक्षी', sub: 'Breeze & Birds', file: '/assets/morning_3.mp3' },
      { id: 'morning_4', label: 'सुहानी भोर 1', sub: 'Morning Birds Chorus 1', file: '/assets/morning_4.mp3' },
      { id: 'morning_5', label: 'सुहानी भोर 2', sub: 'Morning Birds Chorus 2', file: '/assets/morning_5.mp3' }
    ],
    tagline: 'Sunbeams over rolling mist, temple chimes & Morning Time Bhajans Collection.',
    icon: 'Sun',
    cursorColor: '#f97316',
    cursorLabel: 'ENTER MORNING',
    accentColor: '#f97316',
    gradient: 'from-amber-500/30 via-emerald-950/20 to-slate-950',
    genres: ['MORNING BHAJANS', 'SUNRISE BHAJANS', 'GULSHAN KUMAR', 'HARIHARAN', 'BHAKTI SAGAR'],
    scenes: [
      {
        id: 'morning-1',
        name: 'Scene 01: Sunrise Over Tea Hills',
        subtitle: 'Golden sun rays piercing morning valley mist at dawn',
        image: '/assets/morning_1.jpg'
      },
      {
        id: 'morning-2',
        name: 'Scene 02: Sunlit Terrace Garden',
        subtitle: 'Brass temple bell & fresh morning marigolds',
        image: '/assets/morning_2.jpg'
      },
      {
        id: 'morning-3',
        name: 'Scene 03: Misty Mountain Dawn',
        subtitle: 'Golden horizon lighting serene green peaks',
        image: '/assets/morning_3.jpg'
      },
      {
        id: 'morning-4',
        name: 'Scene 04: Sunrise Courtyard',
        subtitle: 'Peaceful morning light over traditional clay chimes',
        image: '/assets/morning_4.jpg'
      },
      {
        id: 'morning-5',
        name: 'Scene 05: Golden Horizon Ridge',
        subtitle: 'Warm sun flares over rolling green tea plantations',
        image: '/assets/morning_1.jpg'
      },
      {
        id: 'morning-6',
        name: 'Scene 06: Early Morning Village Sanctuary',
        subtitle: 'Birds flying over serene morning lake reflections',
        image: '/assets/morning_3.jpg'
      }
    ],
    playlist: [
      {
        id: 'morning-400',
        videoId: '4k3ZRQ5Hi6c',
        title: 'T-Series Bhakti Sagar Best Collection | Morning Time Bhajans',
        movie: 'Gulshan Kumar & Anuradha Paudwal Morning Collection',
        artist: 'Hariharan, Anuradha Paudwal, Sonu Nigam & Gulshan Kumar',
        genre: 'MORNING BHAJANS',
        duration: '1:08:15',
        cover: 'https://i.ytimg.com/vi/4k3ZRQ5Hi6c/hqdefault.jpg'
      },
      {
        id: 'morning-401',
        videoId: 'AETFvQonfV8',
        title: 'Shree Hanuman Chalisa (Original Video)',
        movie: 'T-Series Bhakti Sagar',
        artist: 'Hariharan & Gulshan Kumar',
        genre: 'SUNRISE BHAJANS',
        duration: '9:40',
        cover: 'https://i.ytimg.com/vi/AETFvQonfV8/hqdefault.jpg'
      },
      {
        id: 'morning-402',
        videoId: 'TplRlUULXz8',
        title: 'Subah Subah Le Shiv Ka Naam',
        movie: 'Shiv Mahima',
        artist: 'Hariharan & Gulshan Kumar',
        genre: 'GULSHAN KUMAR',
        duration: '6:15',
        cover: 'https://i.ytimg.com/vi/TplRlUULXz8/hqdefault.jpg'
      },
      {
        id: 'morning-403',
        videoId: '0pA10Fdr7yM',
        title: 'Hey Bhole Shankar Padhaaro',
        movie: 'Shiv Mahima',
        artist: 'Hariharan & Gulshan Kumar',
        genre: 'HARIHARAN',
        duration: '6:50',
        cover: 'https://i.ytimg.com/vi/0pA10Fdr7yM/hqdefault.jpg'
      }
    ]
  }
];

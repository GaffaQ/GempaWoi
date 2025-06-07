// Fungsi untuk mengambil data gempa dari API BMKG
async function fetchGempaData() {
    try {
        const [autogempa, gempaterkini] = await Promise.all([
            fetch('https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json').then(res => res.json()),
            fetch('https://data.bmkg.go.id/DataMKG/TEWS/gempaterkini.json').then(res => res.json())
        ]);
        return {
            latest: autogempa.Infogempa.gempa,
            recent: gempaterkini.Infogempa.gempa
        };
    } catch (error) {
        console.error('Error fetching earthquake data:', error);
        return null;
    }
}

function formatDateTime(tanggal, jam) {
    return {
        date: tanggal,
        time: jam
    };
}

function formatCoordinates(lat, lon) {
    const latStr = Math.abs(lat).toFixed(1) + '° ' + (lat < 0 ? 'LS' : 'LU');
    const lonStr = Math.abs(lon).toFixed(1) + '° ' + (lon < 0 ? 'BB' : 'BT');
    return `${latStr} - ${lonStr}`;
}

function showSkeletonLoading() {
    // Add skeleton class to main card elements
    document.querySelectorAll('.skeleton-text').forEach(el => {
        el.classList.add('animate-pulse');
        el.innerHTML = '<div class="h-4 bg-gray-700/50 rounded"></div>';
    });

    // Hide the recent earthquakes and show skeleton
    const recentContainer = document.getElementById('recent-earthquakes');
    recentContainer.innerHTML = Array(15).fill(null)
        .map(() => `
            <div class="bg-gray-800/50 backdrop-blur-sm rounded-lg p-3 border border-gray-700/50 animate-pulse">
                <div class="space-y-3">
                    <div class="flex items-center justify-between">
                        <div class="h-4 bg-gray-700/50 rounded w-16"></div>
                        <div class="h-4 bg-gray-700/50 rounded w-24"></div>
                    </div>
                    <div class="h-4 bg-gray-700/50 rounded w-3/4"></div>
                    <div class="grid grid-cols-2 gap-2">
                        <div class="h-4 bg-gray-700/50 rounded"></div>
                        <div class="h-4 bg-gray-700/50 rounded"></div>
                    </div>
                    <div class="h-4 bg-gray-700/50 rounded w-full"></div>
                </div>
            </div>
        `).join('');
}

function hideSkeletonLoading() {
    // Remove skeleton classes
    document.querySelectorAll('.animate-pulse').forEach(el => {
        el.classList.remove('animate-pulse');
    });
}

function updateRecentEarthquakes(earthquakes) {
    const container = document.getElementById('recent-earthquakes');
    container.innerHTML = earthquakes.map((quake, index) => {
        const datetime = formatDateTime(quake.Tanggal, quake.Jam);
        const magnitude = parseFloat(quake.Magnitude);
        const magnitudeColor = magnitude >= 6.0 ? 'text-red-500' : 
                              magnitude >= 5.0 ? 'text-yellow-500' : 
                              'text-green-500';
        
        // Mengekstrak nama wilayah untuk highlight
        const wilayah = quake.Wilayah;
        const wilayahParts = wilayah.split('-');
        const mainLocation = wilayahParts[0].trim();
        const subLocation = wilayahParts.slice(1).join('-').trim();

        // Menentukan warna berdasarkan kedalaman
        const depth = parseInt(quake.Kedalaman);
        const depthColor = depth >= 100 ? 'text-purple-400' :
                          depth >= 50 ? 'text-blue-400' :
                          'text-cyan-400';

        // Menentukan status dan warna berdasarkan potensi tsunami
        const statusColor = quake.Potensi.toLowerCase().includes('tidak') ? 
            'text-green-400' : 'text-red-400';

        return `
            <div class="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 border border-gray-700/50 hover:bg-gray-800/70 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg h-full flex flex-col">
                <div class="flex-1 space-y-4">
                    <!-- Header: Magnitude & DateTime -->
                    <div class="flex items-start justify-between">
                        <div class="flex items-baseline gap-2">
                            <span class="text-3xl font-bold ${magnitudeColor} font-mono">${quake.Magnitude}</span>
                            <span class="text-sm text-gray-400 font-medium">SR</span>
                        </div>
                        <div class="text-right">
                            <div class="text-sm font-medium text-blue-400">${datetime.date}</div>
                            <div class="text-xs text-gray-400">${datetime.time}</div>
                        </div>
                    </div>

                    <!-- Location -->
                    <div class="space-y-1">
                        <div class="text-sm text-gray-400 uppercase tracking-wider font-medium">Lokasi</div>
                        <div class="font-medium">
                            <span class="text-gray-200">${mainLocation}</span>
                            ${subLocation ? `<span class="text-gray-400 text-sm"> - ${subLocation}</span>` : ''}
                        </div>
                    </div>

                    <!-- Details Grid -->
                    <div class="grid grid-cols-2 gap-3">
                        <div class="space-y-1">
                            <div class="text-xs text-gray-400 uppercase tracking-wider font-medium">Koordinat</div>
                            <div class="font-mono text-sm text-gray-300">${quake.Coordinates}</div>
                        </div>
                        <div class="space-y-1">
                            <div class="text-xs text-gray-400 uppercase tracking-wider font-medium">Kedalaman</div>
                            <div class="font-medium ${depthColor}">${quake.Kedalaman}</div>
                        </div>
                    </div>
                </div>

                <!-- Status - Selalu di bagian bawah -->
                <div class="pt-4 mt-4 border-t border-gray-700/50">
                    <div class="text-sm text-center font-medium ${statusColor}">
                        ${quake.Potensi}
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

async function updateLatestEarthquake() {
    const data = await fetchGempaData();
    if (!data) return;

    const latest = data.latest;
    const datetime = formatDateTime(latest.Tanggal, latest.Jam);
    
    // Update datetime
    document.querySelector('#latest-datetime').textContent = `${datetime.date} ${datetime.time}`;
    
    // Update coordinates, latitude, and longitude separately
    document.querySelector('#latest-latitude').textContent = latest.Lintang;
    document.querySelector('#latest-longitude').textContent = latest.Bujur;
    document.querySelector('#latest-coordinates').textContent = latest.Coordinates;
    
    // Update magnitude
    document.querySelector('#latest-magnitude').textContent = latest.Magnitude;
    
    // Update depth
    document.querySelector('#latest-depth').textContent = latest.Kedalaman;
    
    // Update region
    document.querySelector('#latest-region').textContent = latest.Wilayah;

    // Update shakemap image
    const shakemapUrl = `https://static.bmkg.go.id/${latest.Shakemap}`;
    document.querySelector('#shakemap-image').style.backgroundImage = `url(${shakemapUrl})`;
    document.querySelector('#shakemap-container').classList.remove('items-center', 'justify-center');
    document.querySelector('#shakemap-placeholder').classList.add('hidden');

    // Update additional info
    document.querySelector('#earthquake-impact').textContent = latest.Potensi;
    document.querySelector('#felt-info').textContent = latest.Dirasakan || 'Tidak ada data';

    // Update recent earthquakes
    updateRecentEarthquakes(data.recent);
}

// Fungsi untuk memperbarui data
async function refreshData() {
    // Tampilkan loading state
    showSkeletonLoading();
    
    // Tambahkan animasi rotasi pada icon refresh
    const button = document.querySelector('button[onclick="refreshData()"]');
    const icon = button.querySelector('svg');
    icon.classList.add('animate-spin');
    button.disabled = true;
    
    try {
        // Tunggu 1 detik untuk efek loading
        await new Promise(resolve => setTimeout(resolve, 1000));
        await updateLatestEarthquake();
    } catch (error) {
        console.error('Error refreshing data:', error);
    } finally {
        // Sembunyikan loading state
        hideSkeletonLoading();
        
        // Hentikan animasi dan aktifkan kembali tombol
        icon.classList.remove('animate-spin');
        button.disabled = false;
    }
}

// Initialize the page when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    showSkeletonLoading();
    
    // Simulate loading delay
    setTimeout(async () => {
        hideSkeletonLoading();
        await updateLatestEarthquake();
    }, 1000);
}); 
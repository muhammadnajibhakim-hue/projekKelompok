let antrian = JSON.parse(localStorage.getItem("antrian")) || [];
let editId = null;

function simpanData() {
    localStorage.setItem("antrian", JSON.stringify(antrian));
}

function tambahAntrian() {
    let nama = prompt("Masukkan nama pasien:");
    if (!nama) return;

    let keluhan = prompt("Masukkan keluhan:");
    if (!keluhan) return;

    nama = nama.trim().toUpperCase();
    keluhan = keluhan.trim();

    let now = new Date();
    let waktu = now.getHours().toString().padStart(2, '0') + ":" +
        now.getMinutes().toString().padStart(2, '0');

    if (editId === null) {
        let id = Date.now(); // Menggunakan timestamp agar ID selalu unik
        let nomor = "A" + String(antrian.length + 1).padStart(3, '0');

        antrian.push({
            id: id,
            nomor: nomor,
            nama: nama,
            keluhan: keluhan,
            waktu: waktu
        });
        alert("Data berhasil ditambahkan!");
    } else {
        let index = antrian.findIndex(d => d.id === editId);
        if (index !== -1) {
            antrian[index].nama = nama;
            antrian[index].keluhan = keluhan;
        }
        alert("Data berhasil diupdate!");
        editId = null;
    }

    simpanData();
    refreshSemua();
}

function tampilkanAntrian() {
    let tabel = document.getElementById("tabelAntrian");
    if (!tabel) return;

    tabel.innerHTML = "";
    antrian.forEach((data, index) => {
        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${data.nomor}</td>
            <td>${data.nama}</td>
            <td>${data.keluhan}</td>
            <td>${data.waktu}</td>
            <td>
                <button onclick="editAntrian(${data.id})">Edit</button>
                <button onclick="hapusAntrian(${data.id})">Hapus</button>
            </td>
        `;
        tabel.appendChild(row);
    });
}

function tampilkanCard() {
    let container = document.getElementById("cardContainer");
    if (!container) return;

    container.innerHTML = "";
    antrian.forEach((data) => {
        let card = document.createElement("div");
        card.className = "card-antrian";
        card.innerHTML = `
            <div class="nomor"><h3>${data.nomor}</h3></div>
            <p><strong>Nama:</strong> ${data.nama}</p>
            <p><strong>Keluhan:</strong> ${data.keluhan}</p>
            <p><strong>Waktu:</strong> ${data.waktu}</p>
            <button onclick="editAntrian(${data.id})">Edit</button>
            <button onclick="hapusAntrian(${data.id})">Hapus</button>
        `;
        container.appendChild(card);
    });
}

function updateDashboard() {
    let total = document.getElementById("totalPasien");
    let hariIni = document.getElementById("antrianHariIni");
    let terakhir = document.getElementById("nomorTerakhir");

    if (total) total.innerText = antrian.length;
    if (hariIni) hariIni.innerText = antrian.length;
    if (terakhir) {
        terakhir.innerText = antrian.length > 0 ? antrian[antrian.length - 1].nomor : "-";
    }
}

function hapusAntrian(id) {
    if (confirm("Yakin mau hapus?")) {
        antrian = antrian.filter(d => d.id !== id);
        simpanData();
        refreshSemua();
    }
}

function editAntrian(id) {
    editId = id;
    let data = antrian.find(d => d.id === id);
    alert("Mengedit data: " + data.nama);
    tambahAntrian();
}

// Fungsi pembantu untuk memuat ulang semua tampilan
function refreshSemua() {
    tampilkanAntrian();
    tampilkanCard();
    updateDashboard();
}

// Event Listener
document.getElementById("btnTambah").addEventListener("click", tambahAntrian);

// Jalankan saat halaman dibuka
refreshSemua();
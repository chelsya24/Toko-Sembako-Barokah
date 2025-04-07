document.addEventListener('DOMContentLoaded', () => {
    // LOGIN
    const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const loginSection = document.getElementById('loginSection');
    const mainSection = document.getElementById('mainSection');
    const appHeader = document.getElementById('appHeader');
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');

    const USERNAME = 'adminbarokah';
    const PASSWORD = 'brkh123';

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        if (username === USERNAME && password === PASSWORD) {
            loginSection.classList.add('hidden');
            appHeader.classList.remove('hidden');
            mainSection.classList.remove('hidden');
            showPage('kassa');
        } else {
            alert('Username atau password salah!');
        }
    });

    function showPage(pageId) {
        pages.forEach(page => page.classList.add('hidden'));
        const pageToShow = document.getElementById(pageId);
        if (pageToShow) {
            pageToShow.classList.remove('hidden');
        }
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = e.target.getAttribute('data-target');
            showPage(target);
        });
    });

    // KASSA
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('status-toggle')) {
            const statusElement = e.target;
            if (statusElement.textContent.trim() === 'Aktif') {
                statusElement.textContent = 'Non-Aktif';
                statusElement.classList.remove('text-green-600');
                statusElement.classList.add('text-red-600');
            } else {
                statusElement.textContent = 'Aktif';
                statusElement.classList.remove('text-red-600');
                statusElement.classList.add('text-green-600');
            }
        }
    });

    // BARANG
    const barangForm = document.getElementById('barangForm');
    const barangInput = document.getElementById('barangInput');
    const hargaInput = document.getElementById('hargaInput');
    const barangList = document.getElementById('barangList');

    barangForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const namaBarang = barangInput.value.trim();
        const hargaBarang = parseInt(hargaInput.value.trim());

        if (!namaBarang || isNaN(hargaBarang) || hargaBarang <= 0) {
            alert('Nama barang dan harga harus diisi dengan benar!');
            return;
        }

        const idBarang = `00${barangList.children.length + 1}`.slice(-3);
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="border px-4 py-2">${idBarang}</td>
            <td class="border px-4 py-2">${namaBarang}</td>
            <td class="border px-4 py-2">Rp${hargaBarang.toLocaleString('id-ID')}</td>
            <td class="border px-4 py-2"><button class="hapus-barang bg-red-500 text-white px-2 py-1 rounded">Hapus</button></td>
        `;
        barangList.appendChild(row);

        barangInput.value = '';
        hargaInput.value = '';
    });

    barangList.addEventListener('click', (e) => {
        if (e.target.classList.contains('hapus-barang')) {
            const row = e.target.closest('tr');
            if (row) {
                row.remove();
            }
        }
    });

    barangList.addEventListener('click', (e) => {
        const cell = e.target;
        if (cell.classList.contains('editable')) {
            if (cell.querySelector('input')) return;

            const currentValue = cell.textContent.trim().replace(/[^\d]/g, '');
            const input = document.createElement('input');
            input.type = 'number';
            input.value = currentValue;
            input.className = 'w-full border border-gray-300 px-2 py-1 rounded';

            cell.textContent = '';
            cell.appendChild(input);
            input.focus();

            input.addEventListener('blur', () => {
                const newValue = parseInt(input.value.trim()) || 0;
                cell.textContent = `Rp${newValue.toLocaleString('id-ID')}`;
            });

            input.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') input.blur();
            });
        }
    });

    // SUPPLIER
    const supplierForm = document.getElementById('supplierForm');
    const supplierList = document.getElementById('supplierList');

    supplierForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const barang = document.getElementById('supplierBarang').value.trim();
        const supplier = document.getElementById('supplierName').value.trim();

        if (!barang || !supplier) {
            alert('Nama Barang dan Supplier harus diisi!');
            return;
        }

        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="border px-4 py-2">${barang}</td>
            <td class="border px-4 py-2">${supplier}</td>
        `;
        supplierList.appendChild(row);

        supplierForm.reset();
    });

    // PRODUSEN
    const produsenForm = document.getElementById('produsenForm');
    const produsenList = document.getElementById('produsenList');

    produsenForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const barang = document.getElementById('produsenBarang').value.trim();
        const produsen = document.getElementById('produsenName').value.trim();

        if (!barang || !produsen) {
            alert('Nama Barang dan Produsen harus diisi!');
            return;
        }

        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="border px-4 py-2">${barang}</td>
            <td class="border px-4 py-2">${produsen}</td>
        `;
        produsenList.appendChild(row);

        produsenForm.reset();
    });

    // CUSTOMER
    const customerForm = document.getElementById('customerForm');
    const customerName = document.getElementById('customerName');
    const customerAddress = document.getElementById('customerAddress');
    const customerPhone = document.getElementById('customerPhone');
    const customerList = document.getElementById('customerList');

    customerForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = customerName.value.trim();
        const address = customerAddress.value.trim();
        const phone = customerPhone.value.trim();

        if (!name || !address || !phone) {
            alert('Semua field harus diisi!');
            return;
        }

        const idCustomer = `C${String(customerList.children.length + 1).padStart(3, '0')}`;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="border px-4 py-2">${idCustomer}</td>
            <td class="border px-4 py-2">${name}</td>
            <td class="border px-4 py-2">${address}</td>
            <td class="border px-4 py-2">${phone}</td>
        `;
        customerList.appendChild(row);

        customerName.value = '';
        customerAddress.value = '';
        customerPhone.value = '';
    });

    // STOK
    const stokTable = document.getElementById('stokTable');
    stokTable.addEventListener('input', (e) => {
        if (e.target.classList.contains('editable')) {
            const newValue = e.target.textContent.trim();
            if (isNaN(newValue) || parseInt(newValue) < 0) {
                alert('Jumlah stok harus berupa angka positif!');
                e.target.textContent = '0';
            }
        }
    });

    // PEMBELIAN
    const pembelianForm = document.getElementById('pembelianForm');
    const pembelianList = document.getElementById('pembelianList');

    pembelianForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const tanggal = document.getElementById('pembelianTanggal').value.trim();
        const customer = document.getElementById('pembelianCustomer').value.trim();
        const produk = document.getElementById('pembelianProduk').value.trim();
        const jumlah = parseInt(document.getElementById('pembelianJumlah').value.trim());
        const total = parseInt(document.getElementById('pembelianTotal').value.trim());

        if (!tanggal || !customer || !produk || isNaN(jumlah) || isNaN(total) || jumlah <= 0 || total <= 0) {
            alert('Semua field harus diisi dengan benar!');
            return;
        }

        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="border px-4 py-2">${tanggal}</td>
            <td class="border px-4 py-2">${customer}</td>
            <td class="border px-4 py-2">${produk}</td>
            <td class="border px-4 py-2">${jumlah}</td>
            <td class="border px-4 py-2">Rp${total.toLocaleString('id-ID')}</td>
        `;
        pembelianList.appendChild(row);

        pembelianForm.reset();
    });
});

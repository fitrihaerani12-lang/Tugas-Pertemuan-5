// 10: Ambil elemen-elemen
var form = document.getElementById('itemForm');
var input = document.getElementById('itemInput');
var errorMessage = document.getElementById('errorMessage');
var list = document.getElementById('daftar');

 //11: Tambahkan event listener
   form.addEventListener("submit", function(event) {
       // 12a: Mencegah reload halaman
       event.preventDefault();
       // 12b: Ambil teks dari input
       var task = input.value.trim();
       // 12c: Periksa apakah kosong
       if (task === "") {
           // Jika kosong:
           errorMessage.textContent = "Field tidak boleh kosong";  // 12a.1
           input.classList.add("invalid");  // 12a.2
           return;  // 12a.3: Hentikan proses
       } else {
           // Jika tidak kosong:
           errorMessage.textContent = "";  // 12b.1
           input.classList.remove("invalid");  // 12b.2
           input.classList.add("valid");
           var newItem = document.createElement("li");  // 12b.3
           newItem.textContent = task;  // 12b.4
           list.append(newItem);  // 12b.5
           input.value = "";  // 12b.6
       }
   });
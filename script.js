// 定義 API 網址 (使用免費的 JSONPlaceholder)
const apiUrl = 'https://jsonplaceholder.typicode.com/users';

// 抓取畫面上的元素
const listElement = document.getElementById('contactList');
const addBtn = document.getElementById('addBtn');
const nameInput = document.getElementById('nameInput');

// --- 功能 1: 使用 GET 讀取資料 (Ex03 Network requests) ---
function loadContacts() {
    fetch(apiUrl)
        .then(response => response.json()) // 把回傳的資料轉成 JSON
        .then(users => {
            // 清空目前的清單
            listElement.innerHTML = '';
            
            // 只抓前 5 筆資料來顯示 (模擬通訊錄)
            // 運用陣列方法 forEach
            users.slice(0, 5).forEach(user => {
                const li = document.createElement('li');
                li.innerHTML = `<strong>${user.name}</strong><br>📞 ${user.phone}`;
                listElement.appendChild(li);
            });
        })
        .catch(error => {
            console.error('下載失敗:', error);
        });
}

// --- 功能 2: 使用 POST 新增資料 (Ex03 Network requests) ---
addBtn.addEventListener('click', () => {
    const name = nameInput.value;
    const phone = document.getElementById('phoneInput').value;

    if(name === '') {
        alert('請輸入姓名！');
        return;
    }

    // 準備要傳送的資料物件
    const newContact = {
        name: name,
        phone: phone,
        username: "user_test"
    };

    // 發送 POST 請求
    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(newContact) // 把物件轉成 JSON 字串
    })
    .then(response => response.json())
    .then(data => {
        console.log('成功:', data);
        alert(`新增成功！(模擬 ID: ${data.id})`);
        
        // 注意：因為是假 API，資料不會真的存進去，所以我們手動把它加到畫面上給使用者看
        const li = document.createElement('li');
        li.innerHTML = `<strong>${name}</strong><br>📞 ${phone} <span style="color:red">(新)</span>`;
        listElement.prepend(li); // 加在最上面
    });
});

// 網頁一打開就執行載入
loadContacts();

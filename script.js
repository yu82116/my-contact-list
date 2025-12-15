const apiUrl = 'https://jsonplaceholder.typicode.com/users';
const listElement = document.getElementById('contactList');
const addBtn = document.getElementById('addBtn');
const nameInput = document.getElementById('nameInput');
// 抓取 IG 輸入框
const igInput = document.getElementById('igInput');

// --- 功能 1: 讀取資料 (GET) ---
function loadContacts() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(users => {
            listElement.innerHTML = '';
            
            // 取前 5 筆假資料顯示
            users.slice(0, 5).forEach(user => {
                const li = document.createElement('li');
                
                // 產生 IG 連結
                li.innerHTML = `
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                        <span><strong>${user.name}</strong></span>
                        <a href="https://www.instagram.com/${user.username}/" target="_blank" style="color: #E1306C; text-decoration: none; font-weight: bold;">
                           @${user.username} 🔗
                        </a>
                    </div>
                `;
                listElement.appendChild(li);
            });
        })
        .catch(error => console.error('下載失敗:', error));
}

// --- 功能 2: 新增資料 (POST) ---
addBtn.addEventListener('click', () => {
    const name = nameInput.value;
    const igAccount = igInput.value; 

    // 檢查有沒有輸入
    if(name === '' || igAccount === '') {
        alert('請輸入暱稱和 IG 帳號！');
        return;
    }

    const newContact = {
        name: name,
        username: igAccount, // 把 IG 帳號對應到 API 的 username 欄位
    };

    // 發送 POST 請求
    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(newContact)
    })
    .then(response => response.json())
    .then(data => {
        alert(`發送成功！模擬 ID: ${data.id}`);
        
        // 手動將新資料加到畫面上 (因為是假 API)
        const li = document.createElement('li');
        li.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center;">
                <span><strong>${name}</strong></span>
                <a href="https://www.instagram.com/${igAccount}/" target="_blank" style="color: red; text-decoration: none; font-weight: bold;">
                    @${igAccount} (新) 🔗
                </a>
            </div>
        `;
        listElement.prepend(li); // 加在最上面
        
        // 清空輸入框
        nameInput.value = '';
        igInput.value = '';
    });
});

// 啟動程式
loadContacts();

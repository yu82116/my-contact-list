const apiUrl = 'https://jsonplaceholder.typicode.com/users';
const listElement = document.getElementById('contactList');
const addBtn = document.getElementById('addBtn');
const nameInput = document.getElementById('nameInput');
// 改成抓取 IG 輸入框
const igInput = document.getElementById('igInput'); 

function loadContacts() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(users => {
            listElement.innerHTML = '';
            
            // 我們把假資料的 username 當作 IG 帳號來顯示
            users.slice(0, 5).forEach(user => {
                const li = document.createElement('li');
                
                // --- 這裡改了！變成超連結 ---
                // 使用 target="_blank" 讓它開新分頁
                // 網址結構：https://www.instagram.com/帳號/
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

addBtn.addEventListener('click', () => {
    const name = nameInput.value;
    const igAccount = igInput.value; // 取得輸入的 IG

    if(name === '' || igAccount === '') {
        alert('請輸入暱稱和 IG 帳號！');
        return;
    }

    const newContact = {
        name: name,
        username: igAccount, // 對應 API 的欄位
    };

    fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=UTF-8' },
        body: JSON.stringify(newContact)
    })
    .then(response => response.json())
    .then(data => {
        alert(`發送成功！模擬 ID: ${data.id}`);
        
        const li = document.createElement('li');
        // --- 這裡也同步改成超連結 ---
        li.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center;">
                <span><strong>${name}</strong></span>
                <a href="https://www.instagram.com/${igAccount}/" target="_blank" style="color: red; text-decoration: none; font-weight: bold;">
                    @${igAccount} (新) 🔗
                </a>
            </div>
        `;
        listElement.prepend(li);
        
        // 清空輸入框
        nameInput.value = '';
        igInput.value = '';
    });
});

loadContacts();

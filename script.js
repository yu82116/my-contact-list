const apiUrl = 'https://jsonplaceholder.typicode.com/users';
// 之後有串正式 API 再替換網址

const listElement = document.getElementById('contactList');
const addBtn = document.getElementById('addBtn');
const nameInput = document.getElementById('nameInput');
const igInput = document.getElementById('igInput');
const countText = document.getElementById('countText');
const statusText = document.getElementById('statusText');

// 更新加入人數
function updateCount() {
    const count = listElement.children.length;
    countText.textContent = `目前已有 ${count} 位同學加入 IG 追蹤清單`;
}

// 載入既有資料（模擬伺服器資料）
function loadContacts() {
    statusText.textContent = '同步中...';

    fetch(apiUrl)
        .then(response => response.json())
        .then(users => {
            listElement.innerHTML = '';

            // 取前 5 筆當示範
            users.slice(0, 5).forEach(user => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                        <span><strong>${user.name}</strong></span>
                        <a href="https://www.instagram.com/${user.username}/" 
                           target="_blank" 
                           style="color:#E1306C; text-decoration:none; font-weight:bold;">
                           @${user.username} 🔗
                        </a>
                    </div>
                `;
                listElement.appendChild(li);
            });

            updateCount();
            statusText.textContent = '已同步至伺服器';
        })
        .catch(error => {
            console.error('下載失敗:', error);
            statusText.textContent = '同步失敗';
        });
}

// 新增聯絡人（加入班級）
addBtn.addEventListener('click', () => {
    const name = nameInput.value.trim();
    const igAccount = igInput.value.trim();

    if (name === '' || igAccount === '') {
        alert('請輸入暱稱和 IG 帳號！');
        return;
    }

    statusText.textContent = '同步中...';

    const newContact = {
        name: name,
        username: igAccount
    };

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(newContact)
    })
        .then(response => response.json())
        .then(data => {
            const li = document.createElement('li');
            li.innerHTML = `
                <div style="display:flex; justify-content:space-between; align-items:center;">
                    <span><strong>${name}</strong></span>
                    <a href="https://www.instagram.com/${igAccount}/" 
                       target="_blank" 
                       style="color:#E1306C; text-decoration:none; font-weight:bold;">
                        @${igAccount} (新) 🔗
                    </a>
                </div>
            `;
            listElement.prepend(li);

            updateCount();
            statusText.textContent = '已同步至伺服器';

            alert('你已加入班級 IG 追蹤清單 🎉');

            nameInput.value = '';
            igInput.value = '';
        })
        .catch(error => {
            console.error('新增失敗:', error);
            statusText.textContent = '同步失敗';
        });
});

// 初始化
loadContacts();

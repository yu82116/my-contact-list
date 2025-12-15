const apiUrl = 'https://jsonplaceholder.typicode.com/users';
// 之後有串API再替換網址
const listElement = document.getElementById('contactList');
const addBtn = document.getElementById('addBtn');
const nameInput = document.getElementById('nameInput');
const igInput = document.getElementById('igInput');
const countText = document.getElementById('countText');
const statusText = document.getElementById('statusText');

function updateCount() {
    const count = listElement.children.length;
    countText.textContent = `目前已有 ${count} 位同學加入 IG 追蹤清單`;
}

function loadContacts() {
    statusText.textContent = '同步中...';

    fetch(apiUrl)
        .then(response => response.json())
        .then(users => {
            listElement.innerHTML = '';

            // 目前暫取5筆日後亦可拿掉該功能
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

            alert('你已加入班級 IG 追蹤清單哩!');

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


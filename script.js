const apiUrl = 'https://jsonplaceholder.typicode.com/users';
//之後有串api再替換網址
const listElement = document.getElementById('contactList');
const addBtn = document.getElementById('addBtn');
const nameInput = document.getElementById('nameInput'); 
const igInput = document.getElementById('igInput');

function loadContacts() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(users => {
            listElement.innerHTML = '';
            
            // 可拿掉或擺著舉例測試用
            users.slice(0, 5).forEach(user => {
                const li = document.createElement('li');
                
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
    const igAccount = igInput.value; 

    if(name === '' || igAccount === '') {
        alert('請輸入暱稱和 IG 帳號！');
        return;
    }

    const newContact = {
        name: name,
        username: igAccount, 
    };

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
        
        // 假 API
        const li = document.createElement('li');
        li.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center;">
                <span><strong>${name}</strong></span>
                <a href="https://www.instagram.com/${igAccount}/" target="_blank" style="color: red; text-decoration: none; font-weight: bold;">
                    @${igAccount} (新) 🔗
                </a>
            </div>
        `;
        listElement.prepend(li); 
        
        nameInput.value = '';
        igInput.value = '';
    });
});

loadContacts();


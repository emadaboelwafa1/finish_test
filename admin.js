// تحميل بيانات المستخدمين من localStorage إذا كانت موجودة
let users = JSON.parse(localStorage.getItem('users')) || [];

// دالة لإضافة مستخدم جديد
function addUser() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const sessionDuration = document.getElementById('sessionDuration').value;
    const locations = document.getElementById('locations').value.split(';');  // يمكن إضافة عدة مواقع مفصولة بـ ";"
    const radius = document.getElementById('radius').value;

    const newUser = {
        username,
        password,
        sessionDuration: parseInt(sessionDuration),
        locations,
        radius: parseInt(radius),
        loginAttempts: 0,
        failedAttempts: 0
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    // تحديث عرض المستخدمين
    displayUsers();
    document.getElementById('userForm').reset();
}

// دالة لعرض قائمة المستخدمين
function displayUsers() {
    const userList = document.getElementById('userList');
    userList.innerHTML = ''; // مسح القائمة الحالية
    users.forEach(user => {
        const listItem = document.createElement('li');
        listItem.textContent = `${user.username} - مواقع العمل: ${user.locations.join(', ')} - مسافة: ${user.radius} متر - محاولات ناجحة: ${user.loginAttempts} - محاولات فاشلة: ${user.failedAttempts}`;
        userList.appendChild(listItem);
    });
}

// عرض المستخدمين عند تحميل الصفحة
window.onload = displayUsers;

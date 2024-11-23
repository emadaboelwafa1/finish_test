// بيانات المستخدم المخزنة
const users = [
    { username: "admin", password: "1234", lastLogin: "" }
];

// تخزين المستخدمين في localStorage
function addUser() {
    const username = document.getElementById("newUsername").value;
    const password = document.getElementById("newPassword").value;
    const sessionDuration = document.getElementById("sessionDuration").value;

    // إضافة المستخدم إلى localStorage
    let users = JSON.parse(localStorage.getItem("users")) || [];
    users.push({ username, password, sessionDuration });
    localStorage.setItem("users", JSON.stringify(users));

    // إضافة المستخدم إلى الجدول
    const table = document.getElementById("userTable").getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();
    newRow.innerHTML = `<td>${username}</td><td>${sessionDuration} دقائق</td><td><button onclick="editUser('${username}')">تعديل</button><button onclick="deleteUser('${username}')">حذف</button><button onclick="showPassword('${username}')">عرض كلمة المرور</button></td>`;
}

// عرض المستخدمين من localStorage عند تحميل الصفحة
window.onload = function() {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    const table = document.getElementById("userTable").getElementsByTagName('tbody')[0];

    users.forEach(user => {
        const newRow = table.insertRow();
        newRow.innerHTML = `<td>${user.username}</td><td>${user.sessionDuration} دقائق</td><td><button onclick="editUser('${user.username}')">تعديل</button><button onclick="deleteUser('${user.username}')">حذف</button><button onclick="showPassword('${user.username}')">عرض كلمة المرور</button></td>`;
    });
};

// تعديل المستخدم
function editUser(username) {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(u => u.username === username);

    document.getElementById("newUsername").value = user.username;
    document.getElementById("newPassword").value = user.password;
    document.getElementById("sessionDuration").value = user.sessionDuration;

    // حذف المستخدم من الذاكرة المؤقتة
    users = users.filter(u => u.username !== username);
    localStorage.setItem("users", JSON.stringify(users));
}

// حذف المستخدم
function deleteUser(username) {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    users = users.filter(u => u.username !== username);
    localStorage.setItem("users", JSON.stringify(users));

    // إعادة تحميل الجدول
    window.location.reload();
}

// عرض كلمة المرور
function showPassword(username) {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(u => u.username === username);
    alert(`كلمة المرور للمستخدم ${username}: ${user.password}`);
}

// بيانات المستخدم المخزنة
const users = [
    { username: "admin", password: "1234", lastLogin: "" }
];

// تسجيل الدخول
function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        user.lastLogin = new Date().toLocaleString();
        document.getElementById("lastLoginDisplay").innerText = `آخر تسجيل دخول: ${user.lastLogin}`;
        document.getElementById("loginDiv").style.display = "none";
        document.getElementById("adminPanel").style.display = "block";
    } else {
        document.getElementById("loginError").innerText = "خطأ في اسم المستخدم أو كلمة المرور!";
    }
}

// عرض نموذج إضافة المستخدم
function showAddUserForm() {
    document.getElementById("addUserForm").style.display = "block";
}

// إضافة مستخدم جديد إلى الجدول
function addUser() {
    const username = document.getElementById("newUsername").value;
    const sessionDuration = document.getElementById("sessionDuration").value;

    const table = document.getElementById("userTable").getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();
    newRow.innerHTML = `<td>${username}</td><td>${sessionDuration} دقائق</td>`;
}

// عرض نموذج إضافة الموقع
function showAddLocationForm() {
    document.getElementById("addLocationForm").style.display = "block";
}

// إضافة موقع جديد
function addLocation() {
    const locationName = document.getElementById("locationName").value;
    const googleMapUrl = document.getElementById("googleMapUrl").value;
    const radius = document.getElementById("radius").value;

    console.log(`الموقع: ${locationName}, الرابط: ${googleMapUrl}, المسافة: ${radius} متر`);
}

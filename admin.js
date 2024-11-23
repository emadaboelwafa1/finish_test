// بيانات المستخدم المخزنة
const users = [
    { username: "admin", password: "1234", lastLogin: "" }
];

// تسجيل الدخول
function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    console.log(`اسم المستخدم: ${username}, كلمة المرور: ${password}`);  // طباعة المدخلات في الـ Console

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

// التحقق من بيانات تسجيل الدخول
function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];
    
    // التحقق من وجود المستخدم
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        alert("تم تسجيل الدخول بنجاح!");
        // بعد تسجيل الدخول بنجاح، يمكن الانتقال إلى الصفحة الرئيسية أو التحميل
        window.location.href = "dashboard.html";  // استبدل بـ رابط لوحة التحكم الفعلي
    } else {
        document.getElementById("loginError").innerText = "اسم المستخدم أو كلمة المرور غير صحيحة!";
    }
}

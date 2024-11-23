// تحميل بيانات المستخدمين من localStorage
let users = JSON.parse(localStorage.getItem('users')) || [];

// دالة للتحقق من الموقع والمسافة المسموح بها
function validateLocation(latitude, longitude, user) {
    let isValid = false;

    // تحقق إذا كان الموقع في القائمة
    user.locations.forEach(location => {
        const url = new URL(location);
        const lat = parseFloat(url.searchParams.get('lat'));
        const lng = parseFloat(url.searchParams.get('lng'));

        // حساب المسافة بين النقاط
        const distance = getDistance(latitude, longitude, lat, lng);

        if (distance <= user.radius) {
            isValid = true;
        }
    });

    return isValid;
}

// دالة لحساب المسافة بين نقطتين باستخدام صيغة Haversine
function getDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // نصف قطر الأرض بالكيلومتر
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c * 1000; // المسافة بالمتر
}

// دالة للتحقق من بيانات الدخول
function validateLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const user = users.find(u => u.username === username);

    if (user && user.password === password) {
        // تحقق من الموقع
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                if (validateLocation(latitude, longitude, user)) {
                    const sessionDuration = user.sessionDuration;
                    document.getElementById("welcomeMessage").innerText = `أهلاً بك مهندس ${username}`;
                    document.getElementById("welcomeMessage").style.display = "block";

                    // بدء الجلسة
                    startSession(sessionDuration);

                    document.getElementById("loginForm").style.display = "none";
                    const iframe = document.getElementById("googleForm");
                    iframe.src = "https://docs.google.com/forms/d/e/1FAIpQLSe1MF2zm5bVheW0f2gXCqZcypHe4Dr8B9fLn1q6RCkIJLRzbw/viewform";
                    document.getElementById("formContainer").style.display = "block";
                } else {
                    alert("لا يمكنك الوصول إلى النموذج من موقعك الحالي.");
                }
            },
            () => {
                alert("يرجى السماح بالوصول إلى الموقع.");
            }
        );
    } else {
        alert("اسم المستخدم أو كلمة المرور غير صحيحة.");
        if (user) {
            user.failedAttempts++;
            localStorage.setItem('users', JSON.stringify(users)); // حفظ المحاولات الفاشلة
        }
    }
    return false;
}

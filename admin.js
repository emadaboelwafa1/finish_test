// بيانات المستخدمين والمواقع المخزنة في localStorage
const usersKey = "users";
const locationsKey = "locations";

// تسجيل الدخول
function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    
    // هنا قم بالتحقق من البيانات الخاصة بتسجيل الدخول
    if (username === "admin" && password === "1234") {
        document.getElementById("loginDiv").style.display = "none";
        document.getElementById("adminPanel").style.display = "block";
        loadUsers();
        loadLocations();
    } else {
        document.getElementById("loginError").innerText = "اسم المستخدم أو كلمة المرور غير صحيحة!";
    }
}

// عرض نموذج إضافة المستخدم
function showAddUserForm() {
    document.getElementById("addUserForm").style.display = "block";
}

// إغلاق نموذج إضافة المستخدم
function hideAddUserForm() {
    document.getElementById("addUserForm").style.display = "none";
}

// إضافة مستخدم
function addUser() {
    const username = document.getElementById("newUsername").value;
    const password = document.getElementById("newPassword").value;
    const sessionDuration = document.getElementById("sessionDuration").value;

    if (!username || !password || !sessionDuration) {
        alert("يرجى ملء جميع الحقول");
        return;
    }

    let users = JSON.parse(localStorage.getItem(usersKey)) || [];
    users.push({ username, password, sessionDuration });
    localStorage.setItem(usersKey, JSON.stringify(users));

    // إضافة المستخدم إلى الجدول
    loadUsers();

    // إغلاق النموذج بعد الإضافة
    hideAddUserForm();
}

// عرض نموذج إضافة الموقع
function showAddLocationForm() {
    document.getElementById("addLocationForm").style.display = "block";
}

// إغلاق نموذج إضافة الموقع
function hideAddLocationForm() {
    document.getElementById("addLocationForm").style.display = "none";
}

// إضافة موقع
function addLocation() {
    const locationName = document.getElementById("locationName").value;
    const googleMapUrl = document.getElementById("googleMapUrl").value;
    const radius = document.getElementById("radius").value;

    if (!locationName || !googleMapUrl || !radius) {
        alert("يرجى ملء جميع الحقول");
        return;
    }

    let locations = JSON.parse(localStorage.getItem(locationsKey)) || [];
    locations.push({ locationName, googleMapUrl, radius });
    localStorage.setItem(locationsKey, JSON.stringify(locations));

    // إضافة الموقع إلى الجدول
    loadLocations();

    // إغلاق النموذج بعد الإضافة
    hideAddLocationForm();
}

// تحميل المستخدمين من localStorage وعرضهم في الجدول
function loadUsers() {
    let users = JSON.parse(localStorage.getItem(usersKey)) || [];
    const table = document.getElementById("userTable").getElementsByTagName('tbody')[0];
    table.innerHTML = ''; // مسح الجدول قبل الإضافة

    users.forEach(user => {
        const newRow = table.insertRow();
        newRow.innerHTML = `<td>${user.username}</td><td>${user.sessionDuration} دقائق</td><td>
            <button onclick="editUser('${user.username}')">تعديل</button>
            <button onclick="deleteUser('${user.username}')">حذف</button>
            <button onclick="showPassword('${user.username}')">عرض كلمة المرور</button>
        </td>`;
    });
}

// تحميل المواقع من localStorage وعرضها في الجدول
function loadLocations() {
    let locations = JSON.parse(localStorage.getItem(locationsKey)) || [];
    const table = document.getElementById("locationTable").getElementsByTagName('tbody')[0];
    table.innerHTML = ''; // مسح الجدول قبل الإضافة

    locations.forEach(location => {
        const newRow = table.insertRow();
        newRow.innerHTML = `<td>${location.locationName}</td><td>${location.googleMapUrl}</td><td>${location.radius} متر</td><td>
            <button onclick="editLocation('${location.locationName}')">تعديل</button>
            <button onclick="deleteLocation('${location.locationName}')">حذف</button>
        </td>`;
    });
}

// تعديل المستخدم
function editUser(username) {
    // إضافة منطق تعديل المستخدم
}

// حذف المستخدم
function deleteUser(username) {
    let users = JSON.parse(localStorage.getItem(usersKey)) || [];
    users = users.filter(user => user.username !== username);
    localStorage.setItem(usersKey, JSON.stringify(users));
    loadUsers(); // تحديث الجدول
}

// عرض كلمة مرور المستخدم
function showPassword(username) {
    let users = JSON.parse(localStorage.getItem(usersKey)) || [];
    const user = users.find(user => user.username === username);
    alert(`كلمة المرور هي: ${user.password}`);
}

// تعديل الموقع
function editLocation(locationName) {
    // إضافة منطق تعديل الموقع
}

// حذف الموقع
function deleteLocation(locationName) {
    let locations = JSON.parse(localStorage.getItem(locationsKey)) || [];
    locations = locations.filter(location => location.locationName !== locationName);
    localStorage.setItem(locationsKey, JSON.stringify(locations));
    loadLocations(); // تحديث الجدول
}

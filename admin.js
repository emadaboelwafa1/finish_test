// تحميل بيانات المستخدمين من localStorage
let users = JSON.parse(localStorage.getItem('users')) || [];

// دالة لإضافة مستخدم جديد
function addUser(username, password, locations, radius) {
    const newUser = {
        username: username,
        password: password,
        locations: locations.split(',').map(location => location.trim()), // تحويل المواقع إلى مصفوفة
        radius: parseInt(radius),
        sessionDuration: 5 // مدة الجلسة يمكن تحديدها لاحقًا حسب الحاجة
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users)); // حفظ البيانات في localStorage
    renderUserList(); // تحديث قائمة المستخدمين
}

// دالة لعرض قائمة المستخدمين
function renderUserList() {
    const userListElement = document.getElementById('userList');
    userListElement.innerHTML = ''; // مسح القائمة القديمة

    users.forEach(user => {
        const listItem = document.createElement('li');
        listItem.textContent = `اسم المستخدم: ${user.username}, المواقع: ${user.locations.join(', ')}, المسافة: ${user.radius} متر`;
        userListElement.appendChild(listItem);
    });
}

// دالة للتعامل مع نموذج إضافة مستخدم جديد
document.getElementById('addUserForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const locations = document.getElementById('locations').value;
    const radius = document.getElementById('radius').value;

    addUser(username, password, locations, radius);

    // إعادة تعيين النموذج بعد إضافة المستخدم
    document.getElementById('addUserForm').reset();
});

// عرض قائمة المستخدمين عند تحميل الصفحة
renderUserList();

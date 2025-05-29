import React, { useEffect, useState } from "react";
import axios from "axios";

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]); 
  const [previewImg, setPreviewImg] = useState("");
  const [loadingField, setLoadingField] = useState({});

  useEffect(() => {
    axios
      .get("https://68219a05259dad2655afc16d.mockapi.io/log-in")
      .then((response) => {
        const data = response.data;
        if (Array.isArray(data) && data.length > 0) {
          setUser(data[0]);
          setUsers(data); 
          setPreviewImg(data[0].avatar);
        }
      });
  }, []);

  if (!user) return <div className="text-center mt-10 text-lg">لا توجد بيانات للمستخدم</div>;

  const updateField = (field, value) => {
    setLoadingField((prev) => ({ ...prev, [field]: true }));
    axios.put(`https://68219a05259dad2655afc16d.mockapi.io/log-in/${user.id}`, {
        ...user,
        [field]: value,
      })
      .then((res) => {
        setUser(res.data);
        if (field === "avatar") setPreviewImg(res.data.avatar);
      })
      .catch(() => alert("حدث خطأ أثناء تحديث البيانات"))
      .finally(() => setLoadingField((prev) => ({ ...prev, [field]: false })));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewImg(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const uploadImage = () => {
    updateField("avatar", previewImg);
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-8 bg-white rounded-3xl shadow-xl">
      <div className="mb-6 text-center">
        <img
          src={previewImg || user.avatar || ""}
          
          className="w-36 h-36 rounded-full mx-auto mb-4 object-cover border-4 border-blue-600 shadow-md"
        />
        <input type="file" onChange={handleImageChange} className="mb-2" />
        <button
          disabled={loadingField.avatar}
          onClick={uploadImage}
          className={`px-4 py-2 rounded bg-blue-600 text-white ${
            loadingField.avatar ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
          }`}
        >
          {loadingField.avatar ? "جاري رفع الصورة..." : "تحديث الصورة"}
        </button>
      </div>

      <div className="mb-6">
        <label className="block mb-2 font-semibold text-blue-700">الاسم</label>
        <input
          type="text"
          defaultValue={user.username}
          onChange={(e) => setUser((prev) => ({ ...prev, username: e.target.value }))}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
        />
        <button
          disabled={loadingField.username}
          onClick={() => updateField("username", user.username)}
          className={`mt-2 px-4 py-2 rounded bg-blue-600 text-white ${
            loadingField.username ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
          }`}
        >
          {loadingField.username ? "جاري الحفظ..." : "تحديث الاسم"}
        </button>
      </div>

      <div className="mb-6">
        <label className="block mb-2 font-semibold text-blue-700">البريد الإلكتروني</label>
        <input
          type="email"
          defaultValue={user.email}
          onChange={(e) => setUser((prev) => ({ ...prev, email: e.target.value }))}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
        />
        <button
          disabled={loadingField.email}
          onClick={() => updateField("email", user.email)}
          className={`mt-2 px-4 py-2 rounded bg-blue-600 text-white ${
            loadingField.email ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
          }`}
        >
          {loadingField.email ? "جاري الحفظ..." : "تحديث البريد الإلكتروني"}
        </button>
      </div>

      
      <div className="mt-10 grid grid-cols-1 gap-6">
        {users.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow-md p-4 flex items-center space-x-4"
          >
            <img
              src={item.avatar}
              alt={item.username}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h3 className="text-lg font-semibold">{item.username}</h3>
              <p className="text-gray-600">{item.email}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProfilePage;

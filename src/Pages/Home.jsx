import React, { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  const [user, setUser] = useState(null);

  const [imgUrl, setImgUrl] = useState("");
  const [username, setUsername] = useState("");
  const [nameGender, setNameGender] = useState("male");
  const [info, setInfo] = useState([]);
  const [sreachs, setsreachs] = useState("");

  const api = "https://68219a05259dad2655afc16d.mockapi.io/log-in";

  useEffect(() => {
    valdechen();

    setUser({
      id: "", 
      username: "",
    });
  }, []);

  const valdechen = () => {
    axios
      .get(api)
      .then((res) => setInfo(res.data))
      .catch(() => setInfo([]));
  };

  const handleSubmit = () => {
    if (!user) {
      alert("سجل دخول لازم");
      return;
    }
    if (!imgUrl || !username) {
      alert("ادخل الصورة والاسم");
      return;
    }
    axios
      .post(api, {
        imgUrl,
        username,
        nameGender,
        userId: user.id,
      })
      .then(() => {
        valdechen();
        setImgUrl("");
        setUsername("");
        setNameGender("male");
      });
  };

  const handleDelete = (id) => {
    if (!user) {
      alert("يجب تسجيل الدخول للحذف");
      return;
    }

    if (!window.confirm("هل أنت متأكد من حذف هذه الشخصية؟")) return;

    axios.delete(`${api}/${id}`).then(() => valdechen());
  };

  const filteredInfo = info.filter(
    (item) =>
      item.username &&
      item.username.toLowerCase().includes(sreachs.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 py-12 px-6 flex justify-center">
      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-xl p-10 space-y-10">
       
        <div>
          <label className="block mb-2 text-lg font-semibold text-blue-900">
            ابحث باسم الشخصية
          </label>
          <input
            type="text"
            value={sreachs}
            onChange={(e) => setsreachs(e.target.value)}
            placeholder="اكتب اسم الشخصية هنا..."
            className="w-full rounded-lg border border-blue-300 px-5 py-3 text-blue-900 text-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
          />
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          noValidate
          className="space-y-6"
        >
          <div>
            <label className="block mb-2 font-semibold text-blue-900 text-lg">
              رابط الصورة
            </label>
            <input
              type="text"
              value={imgUrl}
              onChange={(e) => setImgUrl(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="w-full rounded-lg border border-blue-300 px-5 py-3 text-blue-900 text-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold text-blue-900 text-lg">
              اسم المستخدم
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="اسم الشخصية"
              className="w-full rounded-lg border border-blue-300 px-5 py-3 text-blue-900 text-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold text-blue-900 text-lg">
              الجنس
            </label>
            <select
              value={nameGender}
              onChange={(e) => setNameGender(e.target.value)}
              className="w-full rounded-lg border border-blue-300 px-5 py-3 text-blue-900 text-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
            >
              <option value="male">ذكر</option>
              <option value="female">أنثى</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={!user}
            className={`w-full py-3 mt-4 rounded-xl font-bold text-white shadow-lg transition duration-300 ${
              user
                ? "bg-cyan-600 hover:bg-cyan-700 cursor-pointer"
                : "bg-cyan-300 cursor-not-allowed opacity-70"
            }`}
          >
            إضافة شخصية
          </button>

          {!user && (
            <p className="mt-3 text-center text-red-600 font-semibold">
              يجب تسجيل الدخول لإنشاء شخصية
            </p>
          )}
        </form>

        {/* قائمة الشخصيات */}
        <div className="grid gap-8 sm:grid-cols-2">
          {filteredInfo.length === 0 ? (
            <p className="col-span-full text-center text-red-600 font-bold text-xl">
              لا توجد شخصية بهذا الاسم
            </p>
          ) : (
            filteredInfo.map((item) => (
              <div
                key={item.id}
                className="relative rounded-2xl bg-white shadow-md p-6 flex flex-col items-center text-center hover:shadow-xl transition"
              >
                <img
                  src={item.imgUrl}
                  alt={item.username}
                  className="w-32 h-32 rounded-2xl object-cover shadow-md mb-4"
                />
                <h3 className="text-2xl font-extrabold text-blue-900 mb-1">
                  {item.username}
                </h3>
                <p className="text-blue-700 mb-4 font-semibold">
                  الجنس: {item.nameGender}
                </p>

                {user && user.id === item.userId && (
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="absolute top-3 right-3 bg-red-600 text-white px-4 py-2 rounded-lg shadow hover:bg-red-700 transition"
                    aria-label={`حذف شخصية ${item.username}`}
                  >
                    حذف
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;

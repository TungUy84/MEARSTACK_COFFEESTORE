import React, { useState } from "react";

const Settings = () => {
  const [userInfo, setUserInfo] = useState({
    name: "Admin User",
    email: "admin@example.com",
    password: "",
  });

  const [appSettings, setAppSettings] = useState({
    theme: "light",
    notifications: true,
  });

  const handleUserInfoChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleAppSettingsChange = (e) => {
    const { name, type, checked, value } = e.target;
    setAppSettings({
      ...appSettings,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSaveSettings = () => {
    alert("Settings saved successfully!");
  };

  return (
    <div className="bg-gray-100 p-6 min-h-screen">
      {/* Tiêu đề */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Settings</h1>

      {/* Thông tin tài khoản */}
      <div className="bg-white shadow-md rounded-lg p-4 mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Account Information</h2>
        <div className="space-y-4">
          <input
            type="text"
            name="name"
            value={userInfo.name}
            onChange={handleUserInfoChange}
            placeholder="Full Name"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            name="email"
            value={userInfo.email}
            onChange={handleUserInfoChange}
            placeholder="Email"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            name="password"
            value={userInfo.password}
            onChange={handleUserInfoChange}
            placeholder="New Password"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Cài đặt ứng dụng */}
      <div className="bg-white shadow-md rounded-lg p-4 mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">App Settings</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label htmlFor="theme" className="text-gray-700 font-medium">
              Theme
            </label>
            <select
              id="theme"
              name="theme"
              value={appSettings.theme}
              onChange={handleAppSettingsChange}
              className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>
          <div className="flex items-center justify-between">
            <label htmlFor="notifications" className="text-gray-700 font-medium">
              Enable Notifications
            </label>
            <input
              type="checkbox"
              id="notifications"
              name="notifications"
              checked={appSettings.notifications}
              onChange={handleAppSettingsChange}
              className="w-5 h-5"
            />
          </div>
        </div>
      </div>

      {/* Nút lưu */}
      <button
        onClick={handleSaveSettings}
        className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
      >
        Save Settings
      </button>
    </div>
  );
};

export default Settings;
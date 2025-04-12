import React, { useState } from 'react';

const Register = () => {
  const phone = new URLSearchParams(window.location.search).get('phone');

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agree: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword, agree } = form;

    if (!agree) return alert('Bạn cần đồng ý với điều khoản');
    if (password !== confirmPassword) return alert('Mật khẩu không khớp');

    // Comment các dòng mã API đăng ký
    // try {
    //   const res = await fetch('/register', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ name, email, password, phone }),
    //   });

    //   const data = await res.json();

    //   if (data.success) {
    //     alert('Đăng ký thành công!');
    //     window.location.href = '/login';
    //   } else {
    //     alert(`Đăng ký thất bại: ${data.message}`);
    //   }
    // } catch (err) {
    //   alert(`Đăng ký thất bại: ${err.message}`);
    // }

    // Chuyển hướng đến trang chủ sau khi đăng ký
    window.location.href = '/';
  };

  return (
    <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh', backgroundColor: '#f9f9f9' }}>
      <div className="form-container" style={{ width: '400px', padding: '20px', backgroundColor: 'white', borderRadius: '5px' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>Đăng ký tài khoản Wolsom</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Họ và tên*"
            value={form.name}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '3px' }}
          />
          <input
            type="email"
            name="email"
            placeholder="Email*"
            value={form.email}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '3px' }}
          />
          <input
            type="password"
            name="password"
            placeholder="Mật khẩu*"
            value={form.password}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '3px' }}
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Xác nhận mật khẩu*"
            value={form.confirmPassword}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '3px' }}
          />
          <label style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <input
              type="checkbox"
              name="agree"
              checked={form.agree}
              onChange={handleChange}
              required
              style={{ marginRight: '5px' }}
            />
            Tôi đồng ý
          </label>
          <p style={{ fontSize: '14px', color: '#3b82f6 ', marginBottom: '10px' }}>Đăng ký Hội Viên Wolsom sẽ được nhiều ưu đãi hơn.</p>
          <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#3b82f6 ', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer', fontWeight: 'bold' }}>
            Đăng ký ngay
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
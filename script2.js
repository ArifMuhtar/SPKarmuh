const container = document.getElementById("container");
const registerBtn = document.getElementById("register");
const loginBtn = document.getElementById("login");

registerBtn.addEventListener("click", () => {
  container.classList.add("active");
});

loginBtn.addEventListener("click", () => {
  container.classList.remove("active");
});

document.addEventListener("DOMContentLoaded", function () {
  // 🔹 Handle Pendaftaran (Sign Up)
  const signUpForm = document.querySelector(".sign-up form");

  signUpForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = signUpForm.querySelector("input[type='text']").value;
    const email = signUpForm.querySelector("input[type='email']").value;
    const password = signUpForm.querySelector("input[type='password']").value;

    if (name && email && password) {
      let users = JSON.parse(localStorage.getItem("users")) || [];

      // Cek apakah email sudah terdaftar
      const existingUser = users.find((user) => user.email === email);
      if (existingUser) {
        Swal.fire({
          title: "Email Sudah Terdaftar!",
          text: "Silakan gunakan email lain atau masuk.",
          icon: "warning",
          confirmButtonText: "OK",
        });
        return;
      }

      // Simpan user ke Local Storage
      users.push({ name, email, password });
      localStorage.setItem("users", JSON.stringify(users));

      Swal.fire({
        title: "Pendaftaran Berhasil!",
        text: "Akun telah dibuat. Silakan login.",
        icon: "success",
        showConfirmButton: false,
        timer: 2000,
      }).then(() => {
        container.classList.remove("active"); // Pindah ke form login
      });
    } else {
      Swal.fire({
        title: "Gagal Mendaftar!",
        text: "Harap isi semua kolom dengan benar.",
        icon: "error",
        confirmButtonText: "Coba Lagi",
      });
    }
  });

  // 🔹 Handle Login (Sign In)
  const loginForm = document.querySelector(".sign-in form");

  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const email = loginForm.querySelector("input[type='email']").value;
    const password = loginForm.querySelector("input[type='password']").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      Swal.fire({
        title: "Login Berhasil!",
        text: `Selamat datang, ${user.name}!`,
        icon: "success",
        showConfirmButton: false,
        timer: 2000,
      }).then(() => {
        localStorage.setItem("loggedInUser", JSON.stringify(user)); // Simpan sesi user
        window.location.href = "index.html"; // Redirect ke halaman utama
      });
    } else {
      Swal.fire({
        title: "Login Gagal!",
        text: "Email atau password salah!",
        icon: "error",
        confirmButtonText: "Coba Lagi",
      });
    }
  });
});

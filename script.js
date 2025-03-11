$(document).ready(function () {
  var navbar = $("nav");
  var logoPutih = $("nav img.putih");
  var logoHitam = $("nav img.hitam");
  var navbarHeight = navbar.outerHeight();
  var menuLinks = $("nav ul li a");
  var menu = $("nav .menu ul");
  var tombolMenu = $(".tombol-menu");

  function updateNavbar() {
    if ($(window).scrollTop() < 50) {
      navbar.removeClass("scrolled");
      logoPutih.css("opacity", "1");
      logoHitam.css("opacity", "0");
      menuLinks.css("color", "#ffffff");
    } else {
      navbar.addClass("scrolled");
      logoPutih.css("opacity", "0");
      logoHitam.css("opacity", "1");
      menuLinks.css("color", "#000000");
    }
  }

  $(window).scroll(updateNavbar);
  updateNavbar();

  // 🔹 Toggle menu untuk tampilan mobile
  tombolMenu.click(function () {
    menu.slideToggle();
  });

  // 🔹 Menutup menu jika item di dalamnya diklik (hanya di layar kecil)
  menu.find("li a").click(function () {
    if ($(window).width() < 990) {
      menu.slideUp();
    }
  });

  // 🔹 Pastikan menu tampil atau tersembunyi sesuai ukuran layar
  $(window)
    .resize(function () {
      if ($(window).width() > 989) {
        menu.show();
      } else {
        menu.hide();
      }
    })
    .resize();

  // 🔹 Smooth scroll untuk navigasi & footer
  $("a[href^='#']").click(function (event) {
    event.preventDefault();
    var target = $(this.getAttribute("href"));

    if (target.length) {
      var targetOffset = target.offset().top;

      // Jika target adalah footer, pastikan scroll sampai ke bawah
      if (target.is("#contact")) {
        targetOffset = $(document).height() - $(window).height();
      }

      $("html, body").animate({ scrollTop: targetOffset - navbarHeight }, 500);
    }
  });

  // 🔹 Pastikan video tetap fullscreen
  function resizeVideo() {
    let video = document.querySelector("header video");
    video.style.width = window.innerWidth + "px";
    video.style.height = window.innerHeight + "px";
  }

  window.addEventListener("resize", resizeVideo);
  resizeVideo();

  // 🔹 Drag-Scroll untuk galeri (ditulis hanya satu kali)
  const gallery = document.querySelector(".gallery-container");
  let isDown = false;
  let startX;
  let scrollLeft;

  gallery.addEventListener("mousedown", (e) => {
    isDown = true;
    gallery.classList.add("active");
    startX = e.pageX - gallery.offsetLeft;
    scrollLeft = gallery.scrollLeft;
  });

  gallery.addEventListener("mouseleave", () => {
    isDown = false;
    gallery.classList.remove("active");
  });

  gallery.addEventListener("mouseup", () => {
    isDown = false;
    gallery.classList.remove("active");
  });

  gallery.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - gallery.offsetLeft;
    const walk = (x - startX) * 2;
    gallery.scrollLeft = scrollLeft - walk;
  });
});

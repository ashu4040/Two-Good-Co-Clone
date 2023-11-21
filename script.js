function locomotiveAnimation() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}
locomotiveAnimation();

let videocon = document.querySelector(".video");
let mouse = document.querySelector(".mouse");

function videocons() {
  videocon.addEventListener("mouseenter", function () {
    gsap.to(mouse, {
      opacity: 1,
      scale: 1,
    });
  });

  videocon.addEventListener("mouseleave", function () {
    gsap.to(mouse, {
      opacity: 0,
      scale: 0,
    });
  });

  document.addEventListener("mousemove", function (dets) {
    gsap.to(mouse, {
      x: dets.x - 70,
      y: dets.y - 80,
    });
  });
}

let timeout;

function small_circle() {
  let xscale = 1;
  let yscale = 1;
  let prevx = 0;
  let prevy = 0;

  document
    .querySelector(".page5")
    .addEventListener("mousemove", function (dets) {
      clearTimeout(timeout);
      let xdiff = dets.clientX - prevx;
      let ydiff = dets.clientY - prevy;
      prevy = dets.clientY;

      prevx = dets.clientX;

      xscale = gsap.utils.clamp(0.8, 1.2, xdiff);
      yscale = gsap.utils.clamp(0.8, 1.2, ydiff);

      criclemove(xscale, yscale);
      timeout = setTimeout(function () {
        document.querySelector(
          "#circle"
        ).style.transform = `translate(${dets.clientX}px , ${dets.clientY}px)
       scale(1,1)`;
      }, 100);
    });
}

function criclemove() {
  document.querySelector(".page5").addEventListener("mouseenter", function () {
    gsap.to("#circle", {
      opacity: 1,
      scale: 1,
    });
  });

  document.querySelector(".page5").addEventListener("mouseleave", function () {
    gsap.to("#circle", {
      opacity: 0,
      scale: 0,
    });
  });

  document
    .querySelector(".page5")
    .addEventListener("mousemove", function (dets) {
      gsap.to("#circle", {
        // opacity: 1,
        y: dets.y + 10,
        x: dets.x,
      });
    });
}

criclemove();
small_circle();

gsap.to("#nav-part1 svg", {
  transform: "translateY(-100%)",
  scrollTrigger: {
    trigger: "#page1",
    scroller: "#main",
    start: "top 0",
    end: "top -5%",
    scrub: true,
  },
});
gsap.to("#links", {
  transform: "translateY(-100%)",
  opacity: 0,
  scrollTrigger: {
    trigger: "#page1",
    scroller: "#main",
    start: "top 0",
    end: "top -5%",
    scrub: true,
  },
});

function animations() {
  gsap.from(".page1 h1", {
    y: 100,
    opacity: 0,
    delay: 0.8,
    duration: 0.8,
    stagger: 0.3,
  });

  gsap.from(".video video", {
    scale: 0.9,
    opacity: 0,
    delay: 1.5,
    duration: 0.3,
  });
}

function mouse_move_circle() {
  document.addEventListener("mousemove", function (dets) {
    gsap.to(".mouse_circle", {
      top: dets.y,
      left: dets.x,
    });
  });

  document.querySelectorAll(".child").forEach(function (elem) {
    elem.addEventListener("mouseenter", function () {
      gsap.to(".mouse_circle", {
        scale: 1,
        transform: `translate(-50%, -50%)`,
      });
    });
  });
  document.querySelectorAll(".child").forEach(function (elem) {
    elem.addEventListener("mouseleave", function () {
      gsap.to(".mouse_circle", {
        scale: 0,
        transform: `translate(-50%, -50%)`,
      });
    });
  });
}

mouse_move_circle();
videocons();
animations();

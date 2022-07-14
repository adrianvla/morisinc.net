const whatido = ['Front-End', 'Software', 'Back-end', 'C / C++', 'Web'];
const coolColours = ['#CECDC7', '#B5B4A8', '#CDC5C5', '#A7AEB4', '#889490', '#DCDCF0', '#788489', '#9FAD8F'];
var whatidoindex = 0;
var revtextg;
let isHoveringDATAHOVER = false;
var revtextgold;
let locoScroll;
var mouseSpeed = 0;
var stanimations = [];
let isMouseFollowerOpen = false;
if (crypto.randomUUID) {} else {
  crypto.randomUUID = () => {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  };
}
window.paceOptions = {
  elements: false,
  restartOnRequestAfter: false,
  restartOnPushState: false,
  restartOnRequestAfter: false
};
const sineEase = CustomEase.create("custom", "M0,0,C0.5,0,0.504,1,1,1");
const superEase = CustomEase.create("custom", "M0,0,C0.206,0,0,1,1,1");
const elasticEaseInOut = CustomEase.create("custom", "M0,0 C0,0 0.034,0 0.034,0 0.05,0 0.046,0.004 0.062,0.001 0.072,0 0.091,-0.002 0.101,-0.007 0.111,-0.011 0.117,-0.015 0.125,-0.022 0.156,-0.048 0.16,-0.07 0.189,-0.094 0.194,-0.098 0.201,-0.099 0.207,-0.099 0.212,-0.099 0.218,-0.096 0.222,-0.092 0.228,-0.086 0.232,-0.08 0.236,-0.072 0.242,-0.06 0.246,-0.051 0.25,-0.037 0.261,0.008 0.267,0.036 0.275,0.084 0.286,0.158 0.29,0.199 0.298,0.274 0.313,0.432 0.318,0.515 0.333,0.673 0.339,0.741 0.342,0.776 0.351,0.843 0.359,0.901 0.364,0.933 0.375,0.99 0.378,1.01 0.382,1.022 0.388,1.042 0.392,1.055 0.395,1.063 0.401,1.075 0.404,1.081 0.407,1.085 0.411,1.089 0.414,1.092 0.417,1.094 0.42,1.096 0.424,1.098 0.427,1.098 0.43,1.098 0.434,1.098 0.437,1.097 0.44,1.095 0.448,1.091 0.453,1.088 0.46,1.082 0.486,1.058 0.501,1.04 0.528,1.018 0.536,1.011 0.554,0.995 0.574,0.99 0.61,0.98 0.712,0.972 0.728,0.972 0.758,0.972 0.864,0.98 0.916,0.999 0.947,1.01 1,1 1,1 ");
const workEase = "power4.inOut"
var vh = $(document).height();
var vw = $(document).width();
var f;
let workClickedOn = null;
class RevText {
  constructor(text, eltype, elattr) {
    this.text = text;
    var elstring = "";
    for (var i = 0; i < text.length; i++) {
      elstring = elstring + `<div><span class="inel">${text[i]}</span></div>`;
    }
    this.j = [];
    this.id = "revtext_" + crypto.randomUUID();
    this.el = $(`<${eltype} ${elattr} id="${this.id}" style="opacity:0">${elstring}</${eltype}>`)[0];
    this.el.classList.add('revtext-c');
    return this;
  }
  getEl() {
    return this.el;
  }
  async init(refresh) {
    var that = this;
    $(`#${this.id} div`).each(function (i) {
      $(this).css('width', `${$(this).width()}px`);
      $(this).children().css('margin-left', `${-$(this).width()}px`);
      that.j[i] = $(this).width();
    });
    if (refresh) {
      ScrollTrigger.refresh()
    }
    $(this.el).css('opacity', 1)
    return this;
  }
  open(duration, ease) {
    return gsap.to(`#${this.id} div span`, {
      marginLeft: 0,
      duration: duration,
      ease: ease
    });
  }
  close(duration, ease) {
    var h = [];
    var that = this;
    for (var i = 0; i < this.j.length; i++) {
      h[i] = gsap.to(document.querySelector(`#${this.id} div:nth-child(${i+1}) span`), {
        marginLeft: -this.j[i],
        duration: duration,
        ease: ease
      });
      //console.log(document.querySelector(`#${this.id} div:nth-child(${i+1}) span`),Object.assign(options,{marginLeft:-Math.ceil(this.j[i])}))
    }
    return h;
  }
}
var alreadymod = false;
let WorkAnim = true;


function hsl2rgb(h, s, l) {
  function hueToRgb(p, q, t) {
    if (t < 0) t += 1
    if (t > 1) t -= 1
    if (t < 1 / 6) return p + (q - p) * 6 * t
    if (t < 1 / 2) return q
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6

    return p
  }
  if (s === 0) return [l, l, l]
  h /= 360

  var q = l < 0.5 ? l * (1 + s) : l + s - l * s
  var p = 2 * l - q

  return [
    Math.round(hueToRgb(p, q, h + 1 / 3) * 255),
    Math.round(hueToRgb(p, q, h) * 255),
    Math.round(hueToRgb(p, q, h - 1 / 3) * 255)
  ]
}



function hslToHex(h, s, l) {
  l /= 100;
  const a = s * Math.min(l, 1 - l) / 100;
  const f = n => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}
gsap.registerPlugin(MotionPathPlugin, ScrollTrigger, Observer, ScrollToPlugin, TextPlugin);

function transRgbRgb(r1, g1, b1, r2, g2, b2, x) {
  // 0<=x<=1
  const h = [mapTo([r1, r2], x), mapTo([g1, g2], x), mapTo([b1, b2], x)];
  return h
}

function rgbToHex(r, g, b) {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}
var scrollProgresss = 0;
$(document).ready(function () {
  
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
    $('.change-browser').css('display','flex')
    $('.change-browser').html(`Your Device is not supported (especially if you're using Safari). Please view this website on a <span class="asdfg">COMPUTER</span><button id="closebrowser">Click here to close this popup</button><button id="opengithub">More info about me on github</button>`);
    /*setTimeout(()=>{
      $('.l2').css('transform','translateY(0)');
    },2000)*/
  }
  if($(window).width()<520){
    $('.change-browser').css('display','flex')
    $('.change-browser').html(`Your device resolution is not fully supported. You won't be able to use image sliders and some other features. Please view this website on <span class="asdfg">Google Chrome</span> or on a <span class="asdfg">COMPUTER</span><button id="closebrowser">Click here to close this popup</button><button id="opengithub">More info about me on github</button>Your experience would be WAY better if you'd view this website on a computer (like being able to interact with image sliders).`);
    $(document).on('click',function(e){
      console.log(e.target.outerHTML)
    });
  }

  if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent) || ($(window).width()<520)){
    $('#closebrowser').on('click',function(){
      $('.change-browser').css('display','none');

    });
    $('#opengithub').on('click',function(){
      window.location.href = "https://github.com/adrianvla";
    })
  }



  $('.distort').attr('width', $(window).width());
  $('.distort').attr('height', $(window).height());

  $('#bgcanv').attr('width', $(window).width());
  $('#bgcanv').attr('height', $(window).height());

  let workMouseEnterTL, workMouseLeaveTL;
  let isWorkHovered = false;
  let mouseOverWork = false;
  let attachImage = false;
  initWorkHover();
  var curList = [];
  const jq = async =>{
    let cnv = $('#bgcanv')[0];
    let ctx = cnv.getContext('2d');
    curList.push([xpp, ypp]);
    if (curList.length > 15) curList.shift();
    ctx.fillStyle = '#191918';
    ctx.fillRect(0, 0, $(window).width(), $(window).height());
    if (!curList) curList = [];
    var u = hsl2rgb(((scrollProgresss / 30) % 360) + 230, .84, .62);
    var k = hsl2rgb(((scrollProgresss / 30) % 360) + 191 % 360, .84, .62);
    curList.forEach((a, b) => {
      let o = transRgbRgb(...u, ...k, 1 - b / 15)
      ctx.fillStyle = `rgb(${o[0]},${o[1]},${o[2]})`;
      ctx.beginPath();
      ctx.arc(...a, 275 + (b / 2), 0, 2 * Math.PI);
      ctx.fill();
    });
    requestAnimationFrame(jq)
  };
  jq();
  refreshBlotter();
  bindBurgerMenu();

  function closeWorkPopup() {
    attachImage = false;
    gsap.timeline()
      .to($(this).find('.t')[0], {
        duration: 1.2,
        marginTop: 0,
        ease: workEase
      }, 0)
      .to($(this).find('.aft > div')[0], {
        duration: 1.2,
        width: "0%",
        ease: workEase
      }, 0)
      .to($(this).find('.aft > div')[1], {
        duration: 1.2,
        width: "0%",
        ease: workEase
      }, 0)
      .to('.f-image', {
        duration: 0.5,
        opacity: 0,
        ease: workEase
      }, 0)

    WorkAnim = false;
    try {
      workMouseEnterTL.kill()
    } catch (e) {}
    alreadymod = true;
    $('.follower-c').removeClass('cto');
    workMouseLeaveTL = gsap.timeline({
        onComplete: function () {
          isWorkHovered = false;
          WorkAnim = true;
          mouseOverWork = false;
        }
      })
      .to('.follower-c', {
        duration: 0.5,
        width: "3vh",
        height: "3vh",
        ease: "elastic.out(1.2, 0.75)"
      }, 0.1)
      .to('.follower-c > span', {
        duration: 1.3,
        fontSize: 0,
        ease: "power3.out"
      }, 0)
      .to('.follower-c > span', {
        duration: 0.2,
        opacity: 0
      }, 0)
      .set('.follower span', {
        display: 'none'
      }, 0)
      .to('.follower-c', {
        border: 0,
        duration: 0.1
      }, 0.1);
    setTimeout(function () {
      gsap.timeline()
        .set('.follower', {
          opacity: 0
        }, 0)
        .to('.follower', {
          opacity: 1,
          duration: 0.3
        }, 0)
        .set('.follower', {
          display: 'flex'
        }, 0)
        .set('.follower-c > span', {
          display: 'none'
        }, 0);
      isWorkHovered = false;
    }, 300);

    knowsHowToScroll = true;
  }

  function initWorkHover() {
    $('.work').on('click', function (e) {
      workClickedOn = this;
      $(this).addClass('work-clicked-on');
      e.preventDefault();
      $('body .tfb:not(.mi)').each(function () {
        console.log(this);
        gsap.timeline()
          .to($(this).find('span')[0], {
            y: $(this).height() + 10,
            duration: 1.5,
            ease: Power2.easeInOut
          }, 0)
          .to(this, {
            opacity: 0,
            duration: 0.5,
            ease: Power1.easeInOut
          }, 0.5)
      })
      $('.work:not(.work-clicked-on)').css('pointer-events', 'none');
      $(this).off('mouseleave');
      $(this).off('mouseenter');
      closeWorkPopup();

      gsap.timeline({
          onComplete: () => {
            barba.go(workClickedOn.parentElement.getAttribute('data-href'));
          }
        })
        .to('.line', {
          width: 0,
          opacity: 0,
          ease: Power2.easeInOut,
          duration: 1
        })
        .to('.work:not(.work-clicked-on)', {
          opacity: 0,
          duration: 0.75,
          ease: Power2.easeInOut
        }, 0)
        .to([$(this).find('.aft > div')[0], $(this).find('.aft > div')[1]], {
          duration: 0.3,
          width: "100%"
        }, 0)
        .to([$(this).find('.aft')[0], $(this).find('.aft > div')[0]], {
          opacity: 0,
          duration: 0.3,
          ease: Power2.easeInOut
        }, 0)
        .to([this, $(this).find('.t')[0], $(this).find('.tit')[0]], {
          height: 0,
          duration: 0.75,
          ease: Power2.easeInOut
        }, 0.3)
        .to(this, {
          opacity: 0,
          duration: 0.5,
          ease: Power2.easeInOut
        }, '-=0.1')


    });
    $('.work').on('mouseover', function () {
      mouseOverWork = true;
    });
    $('.work').on('mouseenter', function () {
      attachImage = true;
      /*
      var newImg = new Image;
      newImg.onload = function() {
        $('.f-image > img').attr('src',this.src)
        gsap.to('.f-image',{duration:0.5,opacity:1,ease:workEase})
      }
      newImg.src = $(this).attr('data-attach-image');*/
      $('.f-image img').attr('src', $(this).attr('data-attach-image'));
      gsap.timeline()
        .to($(this).find('.t')[0], {
          duration: 1.2,
          marginTop: "-27vh",
          ease: workEase
        }, 0)
        .to($(this).find('.aft > div')[0], {
          duration: 1.2,
          width: "100%",
          ease: workEase
        }, 0)
        .to($(this).find('.aft > div')[1], {
          duration: 1.2,
          width: "100%",
          ease: workEase
        }, 0)
        .to('.f-image', {
          duration: 0.5,
          opacity: 1,
          ease: workEase
        }, 0)
      WorkAnim = false;
      try {
        workMouseLeaveTL.kill()
      } catch (e) {}
      isWorkHovered = true;
      alreadymod = true;
      $('.follower-c').addClass('cto');

      gsap.timeline()
        .set('.follower', {
          display: 'none'
        }, 0)
        .set('.follower-c > span', {
          display: 'block'
        }, 0)
        .set('.follower-c > span', {
          opacity: 1
        }, 0)

      workMouseEnterTL = gsap.timeline({
          onComplete: function () {
            WorkAnim = true;
          }
        })
        .fromTo('.follower-c', {
          width: '3vh',
          height: '3vh'
        }, {
          duration: 0.7,
          width: "20vh",
          height: "10vh",
          ease: elasticEaseInOut
        }, 0)
        .fromTo('.follower-c > span', {
          fontSize: 0
        }, {
          duration: 0.5,
          fontSize: '1.5vh',
          ease: "power3.out"
        }, 0.2)
        .to('.follower-c', {
          border: '1px solid #fff'
        }, 0.1)
    });

    $('.work').on('mouseleave', closeWorkPopup);
  }


  setInterval(() => {
    if (!isHoveringDATAHOVER)
      if (!mouseOverWork) {
        if (WorkAnim) {
          if (isWorkHovered) {
            gsap.timeline()
              .set('.follower', {
                display: 'none'
              }, 0)
              .set('.follower-c > span', {
                display: 'block'
              }, 0);
          } else {
            let tl = gsap.timeline()
              .set('.follower', {
                display: 'flex'
              }, 0)
              .set('.follower-c > span', {
                display: 'none'
              }, 0)
              .set('.follower-c', {
                border: 0
              }, 0);
            if (!isMouseFollowerOpen) tl.set('.follower-c', {
              width: "3vh",
              height: "3vh",
              ease: "power3.out"
            }, 0)
          }
        }
      }
    let f = $('.follower-c > span')[0].style.display;
    if ((WorkAnim == true) && (isWorkHovered == false) && (mouseOverWork == true)) {
      if (f == 'none') {
        gsap.timeline()
          .set('.follower-c > span', {
            display: 'flex',
            opacity: 0
          }, 0)
          .to('.follower-c > span', {
            opacity: 1
          }, 0)
      }
    } else {
      if (f == 'none') {
        $('.follower-c > span').css({
          'opacity': ''
        });
      }
    }
  }, 60);








  $(window).resize(function () {
    locoScroll.update();
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
      // Take the user to a different screen here.
    }else{
      window.location.reload();
    }
    
    //ScrollTrigger.refresh();
    //locoScroll.update();
    //defEnter();
  });

  var mouseX = 0,
    mouseY = 0;
  var xpp = 0,
    ypp = 0;

  (() => {
    let oldMX = 0,
      oldMY = 0;
    var firstMouseMove = false;
    $(document).mousemove(function (e) {
      if (!firstMouseMove) {
        $('.follower-c').removeClass('f');
        gsap.timeline()
          .set('.follower-c', {
            opacity: 0
          })
          .to('.follower-c', {
            opacity: 1,
            duration: 0.4
          })
      }
      firstMouseMove = true;

      mouseX = e.pageX;
      mouseY = e.pageY;

      oldMX = mouseX;
      oldMY = mouseY;
    });

    // cache the selector
    var follower = $(".follower-c");
    var xp = 0,
      yp = 0,
      xpo = 0,
      ypo = 0,
      xpoo = 0,
      ypoo = 0;
    var xppp = 0,
      yppp = 0;
    var xpppp = 0,
      ypppp = 0;
    const filterMultiplier = 0.075;
    var loop = setInterval(function () {
      xp += (mouseX - xp) / 1;
      yp += (mouseY - yp) / 1;
      xpo += (mouseX - xpo) / 5;
      ypo += (mouseY - ypo) / 5;
      xpoo += (mouseX - xpoo) / 8;
      ypoo += (mouseY - ypoo) / 8;
      xpp += (mouseX - xpp) / 30;
      ypp += (mouseY - ypp) / 30;
      xppp += (mouseX - xppp) / 10;
      yppp += (mouseY - yppp) / 10;
      xpppp += (mouseX - xpppp) / 40;
      ypppp += (mouseY - ypppp) / 40;
      follower.css({
        left: xp,
        top: yp
      });
      $('.f-c-grab').css({
        left: xp,
        top: yp
      });
      mouseSpeed = distance(mouseX, xpppp, mouseY, ypppp);
      if (attachImage) {
        $('.f-image').css('transform', `translate(${xpppp}px,${ypppp}px)`);
        document.querySelector('feDisplacementMap').scale.baseVal = 0.25 * distance(xpppp, mouseX, ypppp, mouseY);
      }
      $('.follower span').css('transform', `translate(${xppp-xp}px,${yppp-yp}px)`);
      $('.f-c-grab span').css('transform', `translate(${xpo-xp}px,${ypo-yp}px)`);
      $('.f-c-grab .chev-r,.f-c-grab .chev-l').css('transform', `translate(${xpoo-xp}px,${ypoo-yp}px)`);
    }, 1);

  })();

  setInterval(() => {
    $("body").get(0).style.setProperty("--height", `${String($(window).height())}px`);
    //document.querySelector('feDisplacementMap').scale.baseVal = mouseSpeed;
  }, 1);
  setTimeout(function () {
    var currentMarquee = [];
    setTimeout(() => {
      document.documentElement.classList.add('is-ready');

      $('.tfb').each(function () { // always initial height
        $(this).css('height', `${String($(this).height())}px`);
      });
      $('.tfb > span').each(function () { // set over overflow
        $(this).css('transform', `translateY(${String($(this).height()+(0.01*vh))}px)`);
      });
      $('.l2').css('height', `${String($('.l1').height())}px`);
      //$('.l2').css('transform', `translateY(${String($('.l1').height() + (vh * 0.03))}px)`);
    }, 300)

    let options = {
      el: document.querySelector('[data-scroll-container]'),
      smooth: true,
      getSpeed: true,
      getDirection: true,
      mobile: {
         smooth: true
      },
      tablet: {
         smooth: true
      }
    }
    setTimeout(() => {
      locoScroll = new LocomotiveScroll(options);
      initStStuff();
      initST();
      bindImageSlider();

      barba.hooks.after(() => {
        locoScroll.update();
        ScrollTrigger.refresh();
      });

      initScrollProgress();

      function defLeave() {
        closeWorkPopup();
        intervalList.forEach(ok => clearInterval(ok));
        intervalList = [];
        console.log('leave');
        var prj = window.location.pathname.split('/');
        if (prj[2] == 'projects') {
          prj = prj[2]
        } else {
          prj = prj[1]
        }
        if (window.location.pathname == '/' || window.location.pathname == '/index.html') prj = 'portfolio'
      }

      window.defEnter = function defEnter() {
        console.log('enter');
        $('.tfb').each(function () { // always initial height
          $(this).css('height', `${String($(this).height())}px`);
        });
        $('.tfb:not(.mi) > span').each(function () { // set over overflow
          $(this).css('transform', `translateY(${String($(this).height()+(0.005*vh))}px)`);
        });
        $('.l2').css('height', `${String($('.l1').height())}px`);
        //$('.l2').css('transform', `translateY(${String($('.l1').height() + (vh * 0.03))}px)`);

        if (window.location.pathname == '/' || window.location.pathname == '/index.html') {
          let tl = gsap.timeline({
            defaults: {
              duration: 0.5,
              ease: superEase
            }
          });
          tl
            .to('.l1 > span', {
              ease: superEase,
              y: 0
            })
            .to('.l2', {
              opacity: 1,
              duration: 0
            }, 0.5)
            .fromTo('.l2 > span', {
              y: $('.l2').height()
            }, {
              y: 0
            }, 0.5)
            .to('.l3 > span', {
              y: 0
            }, 1);
          initWorkHover();
        }


        refreshBlotter();
        locoScroll.scrollTo(0, {
          duration: 0
        });
        gsap.timeline()
        .to('.mi > span > a', {
          duration: 0.5,
          letterSpacing: '0px',
          ease: superEase
        })
        setTimeout(function(){if (isBurgerOpen) $('.menu-burger').trigger('click');},300);
        
        
        

      }

      function defAfter() {
        setTimeout(function () {
          initST();
          bindImageSlider();

          if(new URLSearchParams(window.location.search).get("st")){
            console.log($(new URLSearchParams(window.location.search).get("st"))[0])
            locoScroll.scrollTo($(new URLSearchParams(window.location.search).get("st"))[0]);
          }
          setTimeout(()=>{locoScroll.update();},20);
        }, 100);
      }
      barba.init({
        preventRunning: true,
        debug: true,
        transitions: [{
            name: 'default-transition',
            leave() {
              defLeave();
            },
            enter() {
              defEnter();
            },
            after() {
              defAfter();
            }
          },
          {
            name: 'home-to-project',
            from: {
              namespace: [
                'home'
              ]
            },
            to: {
              namespace: [
                'project'
              ]
            },
            leave() {
              defLeave();


              console.log('leave to project')
            },
            enter() {
              defEnter();
              gsap.timeline()
              .fromTo('.scroll-c',{opacity:0},{opacity:1,duration:0.5},0.3)
              console.log('enter project')
            },
            after() {
              defAfter();
            }
          }

        ]
      });
      /*
      barba.Dispatcher.on('newPageReady', function (currentStatus, oldStatus, container) {
        $(container).find('script').each(function (i, script) {
            var $script = $(script);
            $.ajax({
                url: $script.attr('src'),
                cache: true,
                dataType: 'script',
                success: function () {
                    $script.trigger('load');
                }
            });
        });
      });*/
      locoScroll.on('scroll', (instance) => {
        document.documentElement.setAttribute('data-direction', instance.direction)
      });



      addldnum = false;
      ldnum = 100;
      if (window.location.pathname == '/' || window.location.pathname == '/index.html') {
        j = setInterval(() => {
          locoScroll.update()
        }, 100);
      }
    }, 1000);
    var hlen = 0;
    var ldnum = 0;
    var addldnum = true;
    $(document).ready(async function () {
      hlen = $('.h0').width();
      $('.tx div').each(function (i) {
        $(this).css('width', `${$(this).width()}px`);
        $(this).children().css('margin-left', `${-$(this).width()}px`);
      });

      $('.tx').removeClass('op0');
    });
    setTimeout(() => {
      gsap.to('.tx', {
        marginLeft: -hlen,
        duration: 2,
        ease: sineEase
      });
      revtext1();
    }, 300);

    function revtext1(g) {
      if (revtextgold) revtextgold.close(1, superEase);
      revtextg = new RevText(whatido[whatidoindex], 'div', ` data-scroll data-scroll-speed="2" data-scroll-position="top" class="rvt"`);
      setTimeout(() => {
        $('.l2 > div').text('');
        $('.l2 > div').append(revtextg.getEl());
        revtextg.init();
        if (g) {
          //var hh = $('.l2').height();
          //gsap.fromTo('.l2',{height:0},{height:hh,duration:1,ease:superEase});
          //gsap.to('.l3',{marginTop:"-4vh",duration:1,ease:superEase});
          locoScroll.update();
          clearInterval(j)
        }
        revtextg.open(1, superEase)
        whatidoindex++;
        if (whatidoindex > (whatido.length - 1)) whatidoindex = 0;
        revtextgold = revtextg;
      }, 1000);

    }
    setTimeout(() => {
      //$('.l2').css('min-height',$('.l1').height()+20);
      gsap.to('.loader-c', {
        height: 0,
        duration: 1.5,
        ease: superEase
      });
      $('body').addClass('already-loaded');
    }, 600);
    let j;
    setTimeout(() => {
      gsap.to('.scroll-c', {
        marginTop: 0,
        duration: 2,
        ease: superEase
      });

      revtext1();
    }, 600);
    setTimeout(() => {
      gsap.timeline({
          defaults: {
            duration: 0.5,
            ease: superEase
          }
        })
        .to('.l1 > span', {
          ease: superEase,
          y: 0
        }, 0)
        .to('.l2 > span', {
          ease: superEase,
          y: 0
        }, 0.1)
        .to('.l3 > span', {
          y: 0,
          ease: superEase
        }, 0.2)

    }, 1100);
    setTimeout(() => {
      if (window.location.pathname == '/' || window.location.pathname == '/index.html') {
        revtext1(true);
        //setInterval(revtext1, 4000);
      } else {
        try {
          clearInterval(j)
        } catch (e) {}
      }
      locoScroll.update();
      //noscroll = setTimeout(notScrollingFn,3000);
    }, 1200);


    function marquee(el, speed, ease, l) {
      var w = $(el + '>._1').width();
      if (l) {
        gsap.fromTo(el + '>._1', {
          marginLeft: 2 * w
        }, {
          marginLeft: -2 * w,
          duration: speed / 1000,
          ease: ease
        });
      } else {
        gsap.fromTo(el + '>._1', {
          marginLeft: -2 * w
        }, {
          marginLeft: 2 * w,
          duration: speed / 1000,
          ease: ease
        });
      }
      var interval = setInterval(() => {
        if (l) {
          gsap.fromTo(el + '>._1', {
            marginLeft: 2 * w
          }, {
            marginLeft: -2 * w,
            duration: speed / 1000,
            ease: ease
          });
        } else {
          gsap.fromTo(el + '>._1', {
            marginLeft: -2 * w
          }, {
            marginLeft: 2 * w,
            duration: speed / 1000,
            ease: ease
          });
        }

      }, speed);
      return interval;
    }




    async function setTitle(t) {
      currentMarquee.forEach(function (i) {
        clearInterval(i);
      });
      $('.marquee').html(t + '&nbsp;');
      currentMarquee.push(marquee('.mq-1', 6000, "none"));
      currentMarquee.push(marquee('.mq-2', 6000, "none", true));
    }
  }, 1000);

});
var noscroll = null;
var isScrolling, knowsHowToScroll = false;
var howmuchtimescroll = 0;

function initStStuff() {

  locoScroll.on("scroll", ({
    limit,
    scroll
  }) => {
    ScrollTrigger.update();
    scrollProgresss = scroll.y;
    /*
    try {
      clearTimeout(noscroll);
    } catch (e) {}
    if (!knowsHowToScroll) {
      noscroll = setTimeout(notScrollingFn, 3000);
      if (!isScrolling) {
        ScrollingFn();
      }
      isScrolling = true;

    }*/
    try {
      draww(scroll.y / limit.y * 100)
    } catch (e) {}
  });

  ScrollTrigger.scrollerProxy("[data-scroll-container]", {
    scrollTop(value) {
      return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight
      };
    },
    pinType: document.querySelector("[data-scroll-container]").style.transform ? "transform" : "fixed"
  });


  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  ScrollTrigger.refresh();

}
async function initST() {

  stanimations.forEach(function (anim, i) {
    try {
      anim.kill();
    } catch (e) {
      console.log(e)
    }
    delete stanimations[i]
  });
  stanimations=[];

  stanimations.push(gsap.fromTo('.line', {
    width: 0
  }, {
    ease: "power4.inOut",
    width: vw,
    scrollTrigger: {
      trigger: document.querySelector(".l3"),
      start: "top 50%",
      //end: "top 10%",
      scroller: document.querySelector("[data-scroll-container]"),
      //scrub: 2,
      //toggleActions: "restart pause reverse reset",
    },
    duration:2
  }));

  stanimations.push(gsap.to('.wks > span', {
    ease: "power4.inOut",
    y: 0,
    scrollTrigger: {
      trigger: document.querySelector(".wks"),
      start: "top 70%",
      //end: "top 60%",
      scroller: document.querySelector("[data-scroll-container]"),
      scrub: false,
      //toggleActions: "restart pause reverse reset",
    },
    duration:1
  }));
  stanimations.push(gsap.to('.n2 > span', {
    ease: "power2.inOut",
    y: 0,
    scrollTrigger: {
      trigger: document.querySelector(".n2"),
      start: "top 70%",
      end: "top 60%",
      scroller: document.querySelector("[data-scroll-container]"),
      scrub: 5,
      toggleActions: "restart pause reverse reset",
    }
  }));

  $('.wl .lline').each(function () {
    stanimations.push(gsap.to(this, {
      ease: "power2.inOut",
      width: 0.25 * vw,
      scrollTrigger: {
        trigger: this,
        start: "top 70%",
        end: "top 50%",
        scroller: document.querySelector("[data-scroll-container]"),
        scrub: 2,
        toggleActions: "restart pause reverse reset",
      }
    }));
  });

  stanimations.push(gsap.to('.tit > span', {
    ease: "power2.inOut",
    y: 0,
    scrollTrigger: {
      trigger: document.querySelector(".tit"),
      start: "top 70%",
      end: "top 60%",
      scroller: document.querySelector("[data-scroll-container]"),
      scrub: 5,
      toggleActions: "restart pause reverse reset",
    }
  }));
  stanimations.push(gsap.to('.date > span', {
    ease: "power2.out",
    y: 0,
    scrollTrigger: {
      trigger: document.querySelector(".date"),
      start: "top 100%",
      end: "top 80%",
      scroller: document.querySelector("[data-scroll-container]"),
      scrub: 3,
      toggleActions: "restart pause reverse reset",
    }
  }));
  stanimations.push(gsap.to('.ww', {
    ease: "linear",
    color: "#00000000",
    fontSize: "8vh",
    scrollTrigger: {
      trigger: document.querySelector('.v1'),
      start: "top 0%",
      end: "top -50%",
      scroller: document.querySelector("[data-scroll-container]"),
      scrub: 1,
      toggleActions: "restart pause reverse reset",
    }
  }));
  stanimations.push(gsap.to('.ww', {
    ease: "linear",
    marginTop: '2vh',
    scrollTrigger: {
      trigger: document.querySelector('.v1'),
      start: "top 0%",
      end: "top -50%",
      scroller: document.querySelector("[data-scroll-container]"),
      scrub: 1,
      toggleActions: "restart pause reverse reset",
    }
  }));

  $('p,.image-sec > div > div > span,h1,h2,h3,h4,li').each(function(){
    let words = $(this).html().replaceAll('AGE_NUMBER_COUNTDOWN',MyAge());
    let wordsMod = "";
    let ar = words.split(" ");
    let btnpos = [];
    let btns = [];
    ar.forEach(function(el,i){
      if(el.includes('[btn')){
        btnpos.push(i);
      }
    });
    let D = "btn_"+crypto.randomUUID();
    btnpos.forEach(async function(el){
      let inEl = el;
      let q = ar[el];
      let g = q;
      while(!q.includes('[/btn]')){
        el++;
        q=ar[el];
        g+=" "+q;
      }
      btns.push([g,inEl,el,new RegExp("(?:\\[btn)((.[\\s\\S]*))(?:\\[/btn\\])", "ig").exec(g)[1],false]);
    });
    $(ar).each(function(j, word) {
      let b = false;
      let g,gg=true;
      btns.forEach(function(e,i){
        if(e[1]<=j && j<=e[2] && !e[4]){
          b=true;
          btns[i][4]=true;
          g=e;
        }else if(e[1]<=j && j<=e[2]) gg=false
      });
      if(!b){
        if(gg) wordsMod+=`<div class="wrd"><div>${word}&nbsp;</div></div>`;
      }
      else{
        let l = g[3].match(new RegExp(` link="(.*)"\\]`))[1];
        let m = g[3].match(new RegExp(`\\](.*)`))[1].split('');
        let n = "";
        m.forEach(function(f){
          n+=`<div><div>${f}</div><div>${f}</div></div>`
        });
        wordsMod+=`<a href="${l}" target="_blank"><button class="btn" data-hover id="${D}"><div>${n}</div></button></a>`
      }
    });
    $(this).html(wordsMod);
    let q = $(this).find('div > div > div').height();
    $(this).find('.btn').each(async function(){
      $(this).find('div > div').css('height',`${q}px`);

    });
    $(this).find('.btn').on('mouseenter', function () {
      gsap.timeline()
      .to(`#${D} > div > div > div:nth-child(1)`,{marginTop:-q,ease:superEase,duration:0.7,stagger:0.04})
    });
    $(this).find('.btn').on('mouseleave', function () {
      gsap.timeline()
      .to(`#${D} > div > div > div:nth-child(1)`,{marginTop:0,ease:superEase,duration:0.7,stagger:0.04})
      
    });
    $(this).find('.wrd').each(async function(){
      $(this).css('height', `${String($(this).height())}px`);
      $(this).find('div').css('transform', `translateY(${String($(this).height()*1.5)}px) rotate(10deg)`);
      let tll = gsap.timeline({
        scrollTrigger:{
          trigger:this,
          scroller: document.querySelector("[data-scroll-container]"),
          start:"top 90%"
        }
      })
      .to($(this).find('div'),{y:0,rotate:0,duration:0.4,ease:superEase});
      stanimations.push(tll);
    });
  });
  $('.image-sec > div > div > img,.image-sec > div > div > video').each(function(){
    let id = "cool-image-"+crypto.randomUUID();
    let el = $(`<div class="cool-image" id="${id}"><div>${this.outerHTML}</div></div>`);
    this.outerHTML = el[0].outerHTML;
    let g;
    var Q = new Image();
    Q.src = $(`#${id} > div > img`).attr('src');
    Q.onload = function(){
      g = Q.height;
      if($(`#${id} > div > img`).height() !=0) g=$(`#${id} > div > img`).height();
      $(`#${id} > div > img,#${id}`).css('height',`${String(g)}px`);
      $(`#${id} > div`).css('height',`0`);
    }
    let tll = gsap.timeline({
      scrollTrigger:{
        trigger:`#${id}`,
        scroller: document.querySelector("[data-scroll-container]"),
        start:"top 50%"
      }
    })
    .to(`#${id} > div`,{height:'100%',duration:1,ease:superEase})
    stanimations.push(tll);
  });

}



var draww;
function MyAge(){
  var dob = new Date("04/23/2007");  
  var month_diff = Date.now() - dob.getTime();  
  var age_dt = new Date(month_diff);   
  var year = age_dt.getUTCFullYear();  
  var age = Math.abs(year - 1970);  
  return age;
}

function initScrollProgress() {

  var wrapper = document.querySelectorAll('.follower');
  Array.prototype.forEach.call(wrapper, function (wrapper, i) {
    var wrapperWidth,
      wrapperHeight,
      innerHTML,
      context,
      lineWidth,
      centerX,
      centerY,
      radius;


    draww = function (newPercent) {
      context.strokeStyle = "#fff";
      context.lineWidth = lineWidth;
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.beginPath();
      context.arc(centerX, centerY, radius, -0.5 * Math.PI, mapTo([-0.5, 1.5], newPercent / 100) * Math.PI, false);
      context.stroke();
    }
    wrapperWidth = parseInt(window.getComputedStyle(wrapper).width);
    wrapperHeight = wrapperWidth;
    innerHTML = '<span>SCROLL</span><canvas class="circleProgressCanvas" width="' + (wrapperWidth * 2) + '" height="' + wrapperHeight * 2 + '"></canvas>';
    wrapper.innerHTML = innerHTML;
    canvas = wrapper.querySelector(".circleProgressCanvas");
    canvas.style.width = canvas.style.height = wrapperWidth + "px";
    canvas.width = canvas.height = wrapperWidth;
    context = canvas.getContext('2d');
    centerX = canvas.width / 2;
    centerY = canvas.height / 2;
    lineWidth = 1;
    radius = canvas.width / 2 - (lineWidth / 2);
    strokeStyle = wrapper.getAttribute('data-cp-color');
    start = new Date().getTime();
    draww(0);



  });


}

function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}

function mapTo(interv, val) {
  return (interv[1] - interv[0]) * val + interv[0];
}

function getElementOffset(el) {
  return el.getBoundingClientRect();
}
const distance = (x1, x2, y1, y2) => {
  var a = x1 - x2;
  var b = y1 - y2;
  return Math.sqrt((a ** 2) + (b ** 2));
};

function notScrollingFn() {
  isMouseFollowerOpen = true;
  isScrolling = false;
  if (!alreadymod) {
    WorkAnim = false;
    gsap.timeline({
        onComplete: function () {
          WorkAnim = true;
        }
      })
      .to('.follower-c', {
        duration: 1.3,
        width: "10vh",
        height: "10vh",
        ease: "elastic.out(1, 0.75)"
      }, 0)
      .set('.follower span', {
        display: 'block'
      }, 0)
      .to('.follower', {
        duration: 1.5,
        fontSize: '1.5vh',
        ease: "elastic.out(1, 0.75)"
      }, 0);
  }
}

function ScrollingFn() {
  knowsHowToScroll = true;
  //disable scroll popup

  if (howmuchtimescroll > 0) knowsHowToScroll = true;
  howmuchtimescroll++;
  if (!alreadymod) {
    WorkAnim = false;
    gsap.timeline({
        onComplete: function () {
          WorkAnim = true;
          $('.follower span').css('display', 'none');
          isMouseFollowerOpen = false;
        }
      })
      .to('.follower-c', {
        duration: 0.6,
        width: "2vh",
        height: "2vh"
      }, 0)
      .to('.follower', {
        duration: 0.5,
        fontSize: 0
      }, 0);
  }
}

function refreshBlotter() {
  
}

class DEVTOOLS {
  constructor(TL) {
    this.tl = TL;
    this.d = TL.duration();
    $('body').append(`
    <div class="tl-devtools">
        <div class="tl-devtools-p-c">
            <div class="tl-devtools-p"></div>
        </div>
        <div class="tl-devtools-controls">
            <div class="tl-devtools-desc">TimeLine</div>
            <div class="tl-devtools-buttons">
            <div class="tl-devtools-seek tl-devtools-button">
                <
            </div>
            <div class="tl-devtools-play tl-devtools-button">
                pause
            </div>
            <div class="tl-devtools-select tl-devtools-button">
              <select name="time">
                <option value="2">2x</option>
                <option value="1">1x</option>
                <option value="0.5">0.5x</option>
                <option value="0.25">0.25x</option>
                <option value="0.1">0.1x</option>
              </select>
            </div>
            </div>
            <div class="tl-devtools-time">
            </div>
        </div>
    </div>
    `);
    this.currentseek = 0;
    let that = this;
    $('.tl-devtools-select select').val(1);
    this.loop = setInterval(() => {
      $('.tl-devtools-time').text(`${Math.floor(1000*TL.time())/1000} / ${that.d} s`);
      $('.tl-devtools-p').css('width', `${100 * TL.time() / that.d}%`);

      if (TL.paused()) {
        $('.tl-devtools-play').text('play')
      } else {
        $('.tl-devtools-play').text('pause')
      }
    }, 1);
    let dragging = false;
    $('.tl-devtools').on('mousedown', function () {
      dragging = true;
    });
    $('.tl-devtools-select select').on('change', function (e) {
      TL.timeScale(Number($('.tl-devtools-select select').val()));
    })
    $('.tl-devtools-play').on('click', function () {
      if (TL.paused()) {
        TL.resume();
      } else {
        TL.pause();
      }
    });
    $('.tl-devtools-seek').on('click', function () {
      TL.play(0);
    });
    $('.tl-devtools').on('mouseup', function () {
      dragging = false;
    });

    function i(e) {
      if (dragging) {
        let x = e.pageX;
        that.currentseek = x;
        let j = document.querySelector('.tl-devtools-p-c').offsetLeft;
        let w = document.querySelector('.tl-devtools-p-c').clientWidth;
        TL.time(that.d * (x - j) / w);
        TL.pause();
      }
    }
    $('.tl-devtools').on('mousemove', i);
    $('.tl-devtools').on('click', i);
    return this;
  }
  destroy() {
    $('.tl-devtools').remove();
    clearInterval(this.loop);
    return true;
  }
}


let debug;
let isBurgerOpen = false;
var intervalList = [];

function bindBurgerMenu() {
  const end = "M 0 100 V 0 Q 50 0 100 0 V 100 z";
  const end_ = "M 0 100 V 100 Q 50 100 100 100 V 100 z";
  let open, close;
  $('.menu-burger').on('click', function () {
    isBurgerOpen = !isBurgerOpen;
    if (isBurgerOpen) {
      $('.menu-burger').addClass('ac');
      $('.menu-c').addClass('ac');
      if (close) close.kill()
      open = new TimelineMax()
        .to('.path', .9, {
          attr: {
            d: "M 0 100 V 70 Q 50 0 100 70 V 100 z"
          },
          ease: Power4.easeIn
        })
        .to('.path', .7, {
          attr: {
            d: end
          },
          ease: Power4.easeOut
        })
        .to('.menu .mi > span', .7, {
          y: 0,
          ease: Power4.easeInOut,
          stagger: 0.1
        }, "-=0.5")
        .play(0);
    } else {
      $('.menu-burger').removeClass('ac');
      $('.menu-c').removeClass('ac');
      if (open) open.kill()
      close = new TimelineMax()
        .to('.menu .mi > span', .7, {
          y: "23vh",
          ease: Power4.easeInOut,
          stagger: 0.1
        })
        .to('.path', .8, {
          attr: {
            d: "M 0,100 V25 Q 50,80 100,25 V100 z"
          },
          ease: Power4.easeIn
        }, "-=0.5")
        .to('.path', 1.3, {
          attr: {
            d: end_
          },
          ease: Power4.easeOut
        })
        .play(0);
    }
  });
  
}
let noiseStep = 0.005;

const simplex = new SimplexNoise();

const points1 = createPoints();
const points2 = createPoints();

(function animate() {
  $('.menu-burger svg path')[0].setAttribute("d", spline(points1, 3, true));
  $('.menu-burger svg path')[1].setAttribute("d", spline(points2, 1, true));
  for (let i = 0; i < points1.length; i++) {
    const point = points1[i];
    const nX = noise(point.noiseOffsetX, point.noiseOffsetX);
    const nY = noise(point.noiseOffsetY, point.noiseOffsetY);
    const lo = 7;
    const x = map(nX, -1, 1, point.originX - lo, point.originX + lo);
    const y = map(nY, -1, 1, point.originY - lo, point.originY + lo);
    point.x = x;
    point.y = y;
    point.noiseOffsetX += noiseStep;
    point.noiseOffsetY += noiseStep;
  }
  for (let i = 0; i < points2.length; i++) {
    const point = points2[i];
    const nX = noise(point.noiseOffsetX, point.noiseOffsetX);
    const nY = noise(point.noiseOffsetY, point.noiseOffsetY);
    const lo = 7;
    const x = map(nX, -1, 1, point.originX - lo, point.originX + lo);
    const y = map(nY, -1, 1, point.originY - lo, point.originY + lo);
    point.x = x;
    point.y = y;
    point.noiseOffsetX += noiseStep;
    point.noiseOffsetY += noiseStep;
  }
  requestAnimationFrame(animate);
})();

function noise(x, y) {
  return simplex.noise2D(x, y);
}

function map(n, start1, end1, start2, end2) {
  return ((n - start1) / (end1 - start1)) * (end2 - start2) + start2;
}

function createPoints() {
  const points = [];
  const numPoints = 7;
  const angleStep = (Math.PI * 2) / numPoints;
  const rad = 75;

  for (let i = 1; i <= numPoints; i++) {
    const theta = i * angleStep;

    const x = 100 + Math.cos(theta) * rad;
    const y = 100 + Math.sin(theta) * rad;

    points.push({
      x: x,
      y: y,
      originX: x,
      originY: y,
      noiseOffsetX: Math.random() * 10000,
      noiseOffsetY: Math.random() * 10000,
    });
  }

  return points;
}


function bindImageSlider(){
  $('.image-sec.multiple').each(async function () {
    let slider = this,
      innerSlider = $(this).find('.inner')[0];

    let pressed = false,
      startX = 0,
      oldStartX = 0,
      x = 0,
      xo = 0;
    const ww = Number($(this).find('.inner').width()) - Number($(this).find('.inner').width() * 0.03);
    

    slider.addEventListener("mousedown", (e) => {
      startX = e.offsetX - $(slider).find('.inner > div')[0].offsetLeft + slider.offsetLeft;
      pressed = true;
    });
    window.addEventListener("mouseup", () => {
      pressed = false;
    });

    slider.addEventListener("mousemove", (e) => {
      if (!pressed) return;
      e.preventDefault();
      x = e.offsetX;
      oldStartX = startX;
    });
    intervalList.push(setInterval(function () {
      const adder = 40;
      xo+= (x - oldStartX - xo)/adder
      if (-xo > ww) xo = -ww;
      if (xo > 0) xo = 0;
      $(slider).find('.inner > div')[0].style.marginLeft = `${xo}px`;
    }));
  });
  
  let dataHoverENT, dataHoverLV;
  $('[data-hover]').on('mouseenter', function () {
    isHoveringDATAHOVER = true;
    if (dataHoverLV) dataHoverLV.kill()
    dataHoverENT = gsap.timeline()
      .to('.follower-c', {
        duration: 0.5,
        width: "7vh",
        height: "7vh",
        ease: "elastic.out(1.2, 0.75)"
      }, 0.1)
      .to('.follower-c', {
        duration: 0.3,
        background: '#c1c1c14e'
      }, 0)
  });
  $('[data-hover]').on('mouseover', () => {
    isHoveringDATAHOVER = true;
  });

  $('[data-hover]').on('mouseleave', function () {
    dataHoverLV = gsap.timeline({
        onComplete: () => {
          isHoveringDATAHOVER = false;
        }
      })
      .to('.follower-c', {
        duration: 0.5,
        width: "3vh",
        height: "3vh",
        ease: "elastic.out(1.2, 0.75)"
      }, 0.1)
      .to('.follower-c', {
        duration: 0.3,
        background: '#1919184e'
      }, 0)
  });

  let sjlkghjslkjeh,hjkdfjkghljdkj,gjgjgjhjhj;

  $('[data-hover-grab]').on('mouseenter', function () {
    isHoveringDATAHOVER = true;
    clearTimeout(hjkdfjkghljdkj);
    $('.follower-c').css('display', 'none')
    if (sjlkghjslkjeh) sjlkghjslkjeh.kill()
    if(gjgjgjhjhj) gjgjgjhjhj.kill()
    $('.f-c-grab').css('display', 'flex');
    $('.f-c-grab').css('opacity', '1');
    $('.follower-c').css('display', 'none');
    sjlkghjslkjeh = gsap.timeline()
      .to('.f-c-grab', {
        height: "8vh",
        width: "8vh",
        ease: "elastic.out(1.2, 0.75)",
        duration: 0.7
      })
      .to('.f-c-grab .chev-l', {
        marginLeft: "-13vh",
        ease: "elastic.out(1.2, 0.75)",
        duration: 0.7,
        opacity:1
      }, '-=0.65')
      .to('.f-c-grab .chev-r', {
        marginLeft: "13vh",
        ease: "elastic.out(1.2, 0.75)",
        duration: 0.7,
        opacity:1
      }, '<')

  });
  $('[data-hover-grab]').on('mouseover', () => {
    isHoveringDATAHOVER = true;
  });

  $('[data-hover-grab]').on('mouseleave', function () {
    isHoveringDATAHOVER = false;
    if (sjlkghjslkjeh) sjlkghjslkjeh.kill()
    hjkdfjkghljdkj=setTimeout(()=>{
      $('.f-c-grab').css('display', 'none');
      $('.follower-c').css('display', 'flex');
      $('.follower-c').css('opacity', '0');
      gjgjgjhjhj=gsap.to('.follower-c',{opacity:1,duration:0.3});
    },300);
    sjlkghjslkjeh = gsap.timeline()
      .to('.f-c-grab', {
        height: "0vh",
        width: "0vh",
        ease: "elastic.out(1.2, 0.75)",
        duration: 0.7
      })
      .to('.f-c-grab .chev-l', {
        marginLeft: "-5vh",
        ease: "elastic.out(1.2, 0.75)",
        duration: 0.7
      }, '-=0.6')
      .to('.f-c-grab .chev-r', {
        marginLeft: "5vh",
        ease: "elastic.out(1.2, 0.75)",
        duration: 0.7
      }, '<')
      .to('.f-c-grab',{
        opacity:0,duration:0.3
      },0)

  });





  $('.mi > span > a').on('mouseenter', function () {
    gsap.timeline()
      .to(this, {
        duration: 0.5,
        letterSpacing: '15px',
        ease: superEase
      })
  });
  $('.mi > span > a').on('mouseleave', function () {
    gsap.timeline()
      .to(this, {
        duration: 0.5,
        letterSpacing: '0px',
        ease: superEase
      })
  });

}
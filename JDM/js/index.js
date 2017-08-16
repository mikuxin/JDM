/**
 * Created by YIXIN on 2017/6/3.
 */
//动态改变header的透明度
(function () {
  
  var header = document.querySelector(".jd_header");
  window.onscroll = function () {
    //获取滚动距离，当距离超过600时，固定为0.9
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    var opacity = 0;
    if (scrollTop <= 600) {
      opacity = (scrollTop / 600) * 0.9;
    } else {
      opacity = 0.9;
    }
    header.style.backgroundColor = "rgba(222, 24, 27, " + opacity + ")";
  }
  
})();

//设置秒杀ul的宽度
(function () {
  var ul = document.querySelector(".jd_seckill .content ul");
  var lis = ul.children;
  var width = lis[0].offsetWidth;
  ul.style.width = lis.length * width + "px";
})();


//京东快报无缝滚动
(function () {
  var ul = document.querySelector(".jd_news .info>ul");
  var lis = ul.children;
  var height = lis[0].offsetHeight;
  //1. 添加假的li
  ul.appendChild(lis[0].cloneNode(true));
  //2. 设置定时器，每隔2秒钟让ul往上滚动一个li的高度（动画统一用过渡实现）
  var index = 0;
  setInterval(function () {
    index++;
    //设置过渡
    ul.style.transition = "all .5s";
    ul.style.transform = "translateY(" + -height * index + "px)";
  }, 2000);
  
  //3. 到最后一个li的动画结束时，换成第一个li
  ul.addEventListener("transitionend", function () {
    if (index >= lis.length - 1) {
      //瞬间变成第一个
      index = 0;
      ul.style.transition = "none";
      ul.style.transform = "translateY(0px)";
    }
  });
})();


//倒计时功能
(function () {
  
  var h = document.querySelector(".sec_h");
  var m = document.querySelector(".sec_m");
  var s = document.querySelector(".sec_s");
  
  var secKillTime = new Date("2017-06-08 10:00:00");
  
  var timer = setInterval(function () {
    var nowTime = new Date();
    var time = parseInt((secKillTime - nowTime) / 1000);
    if (time <= 0) {
      time = 0;
    }
    //转换成小时
    var hours = parseInt(time / 3600);
    h.innerHTML = addZero(hours);
    //转换成分钟
    var minutes = parseInt(time / 60) % 60;
    m.innerHTML = addZero(minutes);
    //转换成秒钟
    var seconds = time % 60;
    s.innerHTML = addZero(seconds);
    
    if (time == 0) {
      clearInterval(timer);
    }
  }, 1000);
  
  function addZero(n) {
    return n < 10 ? "0" + n : n;
  }
  
})();

//轮播图功能
//轮播需要前后各加一张假图片
(function () {
  
  //1. 找对象
  //轮播图大盒子
  var carousel = document.querySelector(".jd_carousel");
  //用于移动的ul的
  var imgBox = document.querySelector(".jd_carousel>.imgs");
  //屏幕宽度
  var width = carousel.offsetWidth;
  //小圆点盒子
  var pointBox = document.querySelector(".jd_carousel>.points");
  //小圆点列表
  var lis = pointBox.children;
  
  
  //2. 自动轮播功能
  var index = 1;//信号量
  var timer = setInterval(function () {
    //2.1 信号自增
    index++;
    //2.2 添加过渡
    addTransition();
    //2.3 设置偏移量
    setTranslateX(-index * width);
  }, 2000);
  
  //3. 注册过渡结束事件
  imgBox.addEventListener("transitionend", function () {
    //3.1 当达到最后一张图片的时候，需要变成第一张
    if (index >= 7) {
      index = 1;
    }
    //3.2 如果图片是第一张假图片的时候，需要换成倒数第二张
    if (index <= 0) {
      index = 6;
    }
    
    //3.3 移除过渡
    removeTransition();
    //3.4 设置偏移量
    setTranslateX(-index * width);
    
    //3.5 设置小圆点同步
    for (var i = 0; i < lis.length; i++) {
      lis[i].classList.remove("now");
    }
    lis[index - 1].classList.add("now");
    
  });
  
  //4.滑动功能
  var startX = 0;//记录touch事件的开始点
  var startTime = 0;//记录touch事件的开始时间
  
  imgBox.addEventListener("touchstart", function (e) {
    //清除定时器，不让自动播放
    clearInterval(timer);
    startX = e.touches[0].clientX;
    startTime = Date.now();
  });
  
  imgBox.addEventListener("touchmove", function (e) {
    var moveX = e.touches[0].clientX - startX;//移动距离
    removeTransition();
    setTranslateX(-index * width + moveX);//偏移距离需要添加滑动的距离
  });
  imgBox.addEventListener("touchend", function (e) {
    var moveTime = Date.now() - startTime;//移动的时间
    var moveX = e.changedTouches[0].clientX - startX;//移动距离
    
    //如果移动距离超过1/3 或者移动时间小于300毫秒并且距离超过30 ，都算滑动成功
    //否则滑动失败，吸附回去。
    if (Math.abs(moveX) > width / 3 || (Math.abs(moveX) > 30 && moveTime < 300)) {
      if (moveX > 0) {
        index--;
      } else {
        index++;
      }
    }
    
    addTransition();
    setTranslateX(-index * width);
    
    //触摸结束后，重新开启定时器
    timer = setInterval(function () {
      //2.1 信号自增
      index++;
      //2.2 添加过渡
      addTransition();
      //2.3 设置偏移量
      setTranslateX(-index * width);
    }, 2000);
  });
  
  //添加过渡
  function addTransition() {
    imgBox.style.transition = "all .2s";
    imgBox.style.webkitTransition = "all .2s";
  }
  
  //移除过渡
  function removeTransition() {
    imgBox.style.transition = "none";
    imgBox.style.webkitTransition = "none";
  }
  
  //设置偏移量
  function setTranslateX(x) {
    imgBox.style.transform = "translateX(" + x + "px)";
    imgBox.style.webkitTransform = "translateX(" + x + "px)";
  }
  
})();
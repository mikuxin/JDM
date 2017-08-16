/**
   * Created by YIXIN on 2017/6/6.
 */
//左侧滑动效果
(function () {
  
  var nav = document.querySelector(".jd_nav");
  var ul = nav.children[0];
  
  var startY = 0;
  var distanceY = 0;
  var currentY = 0;//记录移动的值
  
  //y能够取的最大值
  var maxSwipe = 100;
  //y能取的最大值
  var minSwipe = nav.offsetHeight - ul.offsetHeight - 100;
  
  var maxPosition = 0;
  var minPositon = nav.offsetHeight - ul.offsetHeight;
  ul.addEventListener("touchstart", function (e) {
    startY = e.touches[0].clientY;
  });
  
  ul.addEventListener("touchmove", function (e) {
    distanceY = e.touches[0].clientY - startY;
    //限制距离
    var y = currentY + distanceY;
    if (y >= minSwipe && y <= maxSwipe) {
      removeTransition();
      setTranslateY(y);
    }
    
  });
  
  ul.addEventListener("touchend", function () {
    var y = currentY + distanceY;
    if (y > maxPosition) {
      addTransition();
      setTranslateY(maxPosition);
    } else if (y < minPositon) {
      addTransition();
      setTranslateY(minPositon);
    } else {
      currentY = y;
    }
    
    moveY = 0;
  });
  
  
  function addTransition() {
    ul.style.transition = "all .2s";
    ul.style.webkitTransition = "all .2s";
  }
  
  function removeTransition() {
    ul.style.transition = "none";
    ul.style.webkitTransition = "none";
  }
  
  function setTranslateY(y) {
    ul.style.transform = "translateY(" + y + "px)";
    ul.style.webKitTransform = "translateY(" + y + "px)";
  }
})();

//右侧滑动效果，使用iScroll插件，一行代码搞定
window.onload = function () {
  new IScroll(".jd_content");
}

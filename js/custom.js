/******************************************
    Version: 1.0
/****************************************** */

(function($) {
    "use strict";
	
   /* ==============================================
		Scroll to top  
	============================================== */
		
	if ($('#scroll-to-top').length) {
		var scrollTrigger = 100, // px
			backToTop = function () {
				var scrollTop = $(window).scrollTop();
				if (scrollTop > scrollTrigger) {
					$('#scroll-to-top').addClass('show');
				} else {
					$('#scroll-to-top').removeClass('show');
				}
			};
		backToTop();
		$(window).on('scroll', function () {
			backToTop();
		});
		$('#scroll-to-top').on('click', function (e) {
			e.preventDefault();
			$('html,body').animate({
				scrollTop: 0
			}, 700);
		});
	}

        // Header scroll class
        $(window).scroll(function() {
            if ($(this).scrollTop() > 50) {
              $('#header').addClass('header-scrolled');
              $(".logo-scroled").attr("src","images/6.png")
            } else {
              $('#header').removeClass('header-scrolled');
              $(".logo-scroled").attr("src","images/logo.png")
            }
          });
        
          if ($(window).scrollTop() > 50) {
            $('#header').addClass('header-scrolled');
          }
        
          // Smooth scroll for the navigation and links with .scrollto classes
          $('.main-nav a, .mobile-nav a, .scrollto').on('click', function() {
            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
              var target = $(this.hash);
              if (target.length) {
                var top_space = 0;
        
                if ($('#header').length) {
                  top_space = $('#header').outerHeight();
        
                  if (! $('#header').hasClass('header-scrolled')) {
                    top_space = top_space - 40;
                  }
                }
        
                $('html, body').animate({
                  scrollTop: target.offset().top - top_space
                }, 1500, 'easeInOutExpo');
        
                if ($(this).parents('.main-nav, .mobile-nav').length) {
                  $('.main-nav .active, .mobile-nav .active').removeClass('active');
                  $(this).closest('li').addClass('active');
                }
        
                if ($('body').hasClass('mobile-nav-active')) {
                  $('body').removeClass('mobile-nav-active');
                  $('.mobile-nav-toggle i').toggleClass('fa-times fa-bars');
                  $('.mobile-nav-overly').fadeOut();
                }
                return false;
              }
            }
          });
        
          // Navigation active state on scroll
          var nav_sections = $('section');
          var main_nav = $('.main-nav, .mobile-nav');
          var main_nav_height = $('#header').outerHeight();
        
          $(window).on('scroll', function () {
            var cur_pos = $(this).scrollTop();
          
            nav_sections.each(function() {
              var top = $(this).offset().top - main_nav_height,
                  bottom = top + $(this).outerHeight();
          
              if (cur_pos >= top && cur_pos <= bottom) {
                main_nav.find('li').removeClass('active');
                main_nav.find('a[href="#'+$(this).attr('id')+'"]').parent('li').addClass('active');
              }
            });
          });
        
          
          var audio;

          // hide pause btn
          $("#pausebtn").hide();

          // initalize audio
          initAudio($("#playlist li:first-child"));

          // initalize funcions
          function initAudio(element){
            var song = element.attr("song");
            var title = element.text();
            var cover = element.attr("cover");
            var artist = element.attr("artist");

            // create an audio object 
            audio = new Audio(song);
             
            if(!audio.currentTime){
              $("#duration").text("0.00")
            }

            $("#audioplayer .title").text(title);
            $("#audioplayer .artist").text(artist);

            // Insert Cover 
            $(".cover").attr("src","images/"+cover);
            $("#playlist li").removeClass("active");
            element.addClass("active");
          }

          //play Button 
          $("#playbtn").on('click',function(){
            audio.play().then(function(){
              $("#playbtn").hide();
              $("#pausebtn").show();
              $("#duration").fadeIn(400);
              showDuration();
            })
          })

          $("#pausebtn").on('click',function(){
            audio.pause();
            $("#pausebtn").hide();
            $("#playbtn").show();
          })

          $("#stopbtn").on('click',function(){
            audio.pause();
            audio.currentTime = 0;

            $("#pausebtn").hide();
            $("#playbtn").show();
            $("#duration").fadeOut(400);
          })

          // next btn
          $("#nextbtn").on('click',function(){
            audio.pause();
            $("#playbtn").hide();
            $("#pausebtn").show();

            var next = $("#playlist li.active").next();
            if(next.length == 0){
              next = $("#playlist li:first-child");
            }

            initAudio(next);

            audio.play();
            showDuration();
          });

          // prev btn
          $("#prevbtn").on('click',function(){
            audio.pause();

            $("#playbtn").hide();
            $("#pausebtn").show();

            var prev = $("#playlist li.active").prev();

            if(prev.length == 0 ){
              prev =  $("#playlist li:last-child");
            }else initAudio(prev);

            audio.play();
            showDuration();
          })

          // volume slider
          $("#volume").change(function(){
            audio.volume = parseFloat(this.value / 10);

          })

          //showDuration function
          function showDuration(){
            $(audio).bind("timeupdate",function(){

              //get minutes
              var s = parseInt(audio.currentTime % 60);
              var m = parseInt((audio.currentTime / 60)%60);

              if(s < 10){
                s = "0" + s;
              }

              $("#duration").html(m + ":" + s);

              var value = 0;

              if(audio.currentTime > 0 ){
                value = Math.floor((100/audio.duration)* audio.currentTime);
              }

              $("#progress").css("width" , value + "%");

            })
          }

})(jQuery); 

// var headerScrolled = document.querySelector("header").at
// if (headerScrolled){
//   console.log("ok");
// }else {
//   console.log("no");
// }
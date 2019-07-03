$(document).ready(function(){

    // MODAL
    var modalText = {
      minesweeper: {
        title: 'minesweeper.com',
        tag: 'CLASSIC GAMES.',
        detail: 'Free Online Minesweeper in JavaScript. Play the classic game in Beginner, Intermediate, and Expert modes.',
        link: 'https://shpiglify.github.io/minesweeper/'
      },
      misterbitcoin: {
        title: 'Bitcoin Digital Wallet (front-end only)',
        tag: 'C.R.U.D APP.',
        detail: 'transfer bitcoins to your contacts!',
        link:'https://shpiglify.github.io/misterBitcoin/#/'
      },
      makeappoint: {
        title: 'makeappoint',
        tag: 'SERVICES BUSINESS.',
        detail: 'online scheduling app. find nearby businesses and services, or create your own business landing page',
        link:'https://make-appoint-demo.herokuapp.com/'
      },
      taskManager: {
        title: 'nodejs + vue fullstack simple app',
        tag: 'server side C.R.U.D.L APP',
        detail: 'an online task manager',
        link: 'https://node-app-task-manager.herokuapp.com/'
      },
      never: {
        title: 'NeverSurrender',
        tag: 'ALS AWARENESS.',
        detail: 'NeverSurrender is a platform for the new ALS foundation mobile app in hopes to raise awareness and research funding to fight ALS. Pure JavaScript marketing site to promote the new ALS NeverSurrender app.',
      },
      themall: {
        title: 'The Mall',
        tag: 'PEER GUIDED SHOPPING.',
        detail: 'The Mall is a place to follow the latest fashion purchases of your friends and favorite celebrities. Built with Node.js and Handlebars. Features the ability to import thousands of top brands products into one shopping site.',
      }
    };
  
    $('#gallery .button').on('click', function(){
      fillModal(this.id);
      $('.modal-wrap').addClass('visible');
    });
  
    $('.close').on('click', function(){
      $('.modal-wrap, #modal .button').removeClass('visible');
    });
  
    $('.mask').on('click', function(){
      $('.modal-wrap, #modal .button').removeClass('visible');
    });
  
    var carousel = $('#carousel'),
        slideWidth = 700,
        threshold = slideWidth/3,
        dragStart, 
        dragEnd;
  
    setDimensions();
  
    $('#next').click(function(){ shiftSlide(-1) })
    $('#prev').click(function(){ shiftSlide(1) })
  
    carousel.on('mousedown', function(){
      if (carousel.hasClass('transition')) return;
      dragStart = event.pageX;
      $(this).on('mousemove', function(){
        dragEnd = event.pageX;
        $(this).css('transform','translateX('+ dragPos() +'px)');
      });
      $(document).on('mouseup', function(){
        if (dragPos() > threshold) { return shiftSlide(1) }
        if (dragPos() < -threshold) { return shiftSlide(-1) }
        shiftSlide(0);
      });
    });
  
    function setDimensions() {
      if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
       slideWidth = $(window).innerWidth();
      }
      $('.carousel-wrap, .slide').css('width', slideWidth);
      $('.modal').css('max-width', slideWidth);
      $('#carousel').css('left', slideWidth * -1)
    }
  
    function dragPos() {
      return dragEnd - dragStart;
    }
  
    function shiftSlide(direction) {
      if (carousel.hasClass('transition')) return;
      dragEnd = dragStart;
      $(document).off('mouseup')
      carousel.off('mousemove')
              .addClass('transition')
              .css('transform','translateX(' + (direction * slideWidth) + 'px)'); 
      setTimeout(function(){
        if (direction === 1) {
          $('.slide:first').before($('.slide:last'));
        } else if (direction === -1) {
          $('.slide:last').after($('.slide:first'));
        }
        carousel.removeClass('transition')
        carousel.css('transform','translateX(0px)'); 
      },700)
    }
  
    function fillModal(id) {
      $('#modal .title').text(modalText[id].title);
      $('#modal .detail').text(modalText[id].detail);
      $('#modal .tag').text(modalText[id].tag);
      if (modalText[id].link) $('#modal .button').addClass('visible')
                                                 .parent()
                                                 .attr('href', modalText[id].link)
  
      $.each($('#modal li'), function(index, value ) {
        $(this).text(modalText[id].bullets[index]);
      });
      $.each($('#modal .slide'), function(index, value) {
        $(this).css({
          background: "url('img/slides/" + id + '-' + index + ".jpg') center center/cover",
          backgroundSize: 'cover'
        });
                
      });
    }
  })
  
location.href = "#home";
var tiempo_cargador = 1000;
$("#fakeLoader").fakeLoader({
	timeToHide:tiempo_cargador,
	zIndex:"999",
	spinner:"spinner1",
	bgColor:"#9B58B5"
});
setTimeout(function(){
	$("#bg-loader").hide();
},tiempo_cargador);
var cont_menu = 0;
(function() {
	var navEl = document.querySelector('nav.menu'),
		revealer = new RevealFx(navEl);
	$('#nav-icon3').click(function(){
		$(this).toggleClass('open');
		if( !$(this).hasClass('open') ){
			$(".hamburguesa").css({'background':'#9B58B5'});
			revealer.reveal({
				bgcolor: '#7A448F',
				duration: 400,
				easing: 'easeInOutCubic',
				onCover: function(contentEl, revealerEl) {
					$(navEl).removeClass("menu--open");
					contentEl.style.opacity = 0;
				}
			});
		}
		else {
			clearInterval(intervalAutomaticMenu);
			status_interval = 0;
			menuAutoStatus = 0;
			$(".hamburguesa").css({'background':'#7A448F'});
			revealer.reveal({
				bgcolor: '#7A448F',
				duration: 400,
				easing: 'easeInOutCubic',
				onCover: function(contentEl, revealerEl) {
					$(navEl).addClass("menu--open");
					contentEl.style.opacity = 1;
				}
			});
		}
	});
	var status_menu = 0;
	var menu_selected;
	var timer;
	$("#menu a").click(function(){
		cont_menu = $(this).attr("data-goto");
		if( status_interval==0 ){
			$("#menu a").removeClass("active");
			var ele = $(this);
			var data_id = $(ele).attr("data-id");
			$("body").attr("id",data_id);
			$(ele).addClass("active");
			menu_selected = $(ele);
			status_menu = 1;
			setTimeout(function(){
				if( $(".menu").hasClass("menu--open") ){
					if( menu_is_open==1 ){
						menu_is_open=0;
					}
					$('#nav-icon3').click();
				}
			},0);
		}
		else{
			$("#menu a").removeClass("active");
			var ele = $(this);
			var data_id = $(ele).attr("data-id");
			$("body").attr("id",data_id);
			$(ele).addClass("active");
			menu_selected = $(ele);
			status_menu = 1;
		}
		var url = $(this).attr("href");
		setTimeout(function(){
			location.href = url;
		},1000);
	});
	$("#menu a").mouseover(function() {
		clearTimeout(timer);
		$("#menu a").removeClass("active");
		var ele = $(this);
		var data_id = $(ele).attr("data-id");
		$("body").attr("id",data_id);
		$(ele).addClass("active");
	}).mouseout(function() {
		if(status_menu==0){
			$("#menu a").removeClass("active");
			$("body").attr("id","");
		}
		else{
			clearTimeout(timer);
			timer = setTimeout(function(){
			$("#menu a").removeClass("active");
			menu_selected.addClass("active"); 
			},250);
		}
	});
})();
var status_interval = 0;
var intervalAutomaticMenu;
var menuAutoStatus = 0;
var numero_menu = $("#menu li").length;
function playMenuAutomatico(p) {
	if( $(".menu").hasClass("menu--open") ){
		$('#nav-icon3').click().removeClass("open"); 
	}
	if( menuAutoStatus==0 ){
		var active_menu = $("#menu").find("a.active");
		if(p==1){
			status_interval = 1;
			if( cont_menu==numero_menu ){
				active_menu = "";
				cont_menu = 0;
			}
			if( active_menu.length>0 ){
				cont_menu++;
				active_menu = $("#menu").find("a.active");
				active_menu.parent().next().find("a").click();
			}
			else{
				cont_menu++;
				$("#menu a").eq(0).click();
				active_menu = $("#menu").find("a.active");
			}
			playMenuAutomatico();
		}
		else{
			menuAutoStatus = 1;
			intervalAutomaticMenu = setInterval(function(){
				status_interval = 1;
				if( cont_menu==numero_menu ){
					active_menu = "";
					cont_menu = 0;
				}
				if( active_menu.length>0 ){
					cont_menu++;
					active_menu = $("#menu").find("a.active");
					active_menu.parent().next().find("a").click();
				}else{
					cont_menu++;
					$("#menu a").eq(0).click();
					active_menu = $("#menu").find("a.active");
				}
			},2000);
		}
	}
}
function pauseMenuAutomatico(){
	clearInterval(intervalAutomaticMenu);
	p = -1;
	menuAutoStatus = 0;
	status_interval = 0;
}
var menu_is_open=0;
function menu_next(){
	menu_is_open = 1;
	pauseMenuAutomatico();
	var active_menu = $("#menu").find("a.active");
	if( cont_menu==numero_menu ){
		active_menu = "";
		cont_menu = 0;
	}
	if( active_menu.length>0 ){
		cont_menu++;
		active_menu = $("#menu").find("a.active");
		active_menu.parent().next().find("a").click();
	}else{
		cont_menu++;
		$("#menu a").eq(0).click();
		active_menu = $("#menu").find("a").eq(0);
		active_menu.find("a").click();
	}	
}
function menu_prev(){
	menu_is_open = 1;
	pauseMenuAutomatico();
	var active_menu = $("#menu").find("a.active");
	if( cont_menu==0 ){
		$("#menu a").eq(5).click();
		active_menu = $("#menu").find("a.active");
		cont_menu = numero_menu;
	}else{
		if( active_menu.length>0 ){
			cont_menu--;
			active_menu = $("#menu").find("a.active");
			active_menu.parent().prev().find("a").click();
		}else{
			cont_menu--;
			$("#menu a").eq(0).click();
			active_menu = $("#menu").find("a").eq(0);
			active_menu.find("a").click();
		}
	}
}
$(function () {
	$('.slider').anyslider({
		interval: 0,
		keyboard: false,
		speed: 500
	});
});
var formulario = document.getElementById( 'formulario' );
new stepsForm( formulario, {
	onSubmit : function( form ) {
		classie.addClass( formulario.querySelector( '.simform-inner' ), 'hide' );
		var messageEl = formulario.querySelector( '.final-message' );
		messageEl.innerHTML = '¡GRACIAS!\':)';
		classie.addClass( messageEl, 'show' );
	}
} );
$(document).ready(function(){
	$("#slider-prev").click(function(){
		$(".as-prev-arrow").click();
	});
	$("#slider-next").click(function(){
		$(".as-next-arrow").click();
	})
	;
	$("#slider-pega-prev").click(function(){
		$(".as-prev-arrow").click();
	});
	$("#slider-pega-next").click(function(){
		$(".as-next-arrow").click();
	})
	;
});
var scrolled=0;
$(document).ready(function(){
	$("#downClick").on("click" ,function(){
				scrolled=scrolled+300;
				$(".caja-logos").animate({
						scrollTop:  scrolled
				});
			});
	$("#upClick").on("click" ,function(){
				scrolled=scrolled-300;
				$(".caja-logos").animate({
						scrollTop:  scrolled
				});
			});
$(".clearValue").on("click" ,function(){
				scrolled=0;
		});
});
$(".cliente").animatedModal({
	animatedIn:'zoomIn',
	animatedOut:'bounceOut',
});
$(".ball").animatedModal({
	animatedIn:'zoomIn',
	animatedOut:'bounceOut',
});
$("#btn-close-modal").click(function(event){
	setTimeout(function(){noOverflow();}, 1000);
});
function noOverflow(){
	$("html, body").css('overflow','hidden');
}
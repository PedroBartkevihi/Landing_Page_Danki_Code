/*
	Landing Page Danki Code - interacoes da pagina
	Feito em vanilla JS, sem dependencias externas.
*/

(function(){
	"use strict";

	var cabecalho = document.querySelector(".cabecalho");
	var toggle = document.querySelector(".cabecalho_toggle");
	var menu = document.querySelector(".cabecalho_menu");
	var linksMenu = document.querySelectorAll(".cabecalho_menu a");


	/* Menu mobile: abre e fecha o dropdown */
	function abreMenu(){
		menu.classList.add("aberto");
		toggle.classList.add("ativo");
		toggle.setAttribute("aria-expanded", "true");
		toggle.setAttribute("aria-label", "Fechar menu");
	}

	function fechaMenu(){
		menu.classList.remove("aberto");
		toggle.classList.remove("ativo");
		toggle.setAttribute("aria-expanded", "false");
		toggle.setAttribute("aria-label", "Abrir menu");
	}

	if(toggle && menu){
		toggle.addEventListener("click", function(){
			if(menu.classList.contains("aberto")){
				fechaMenu();
			}else{
				abreMenu();
			}
		});

		linksMenu.forEach(function(link){
			link.addEventListener("click", fechaMenu);
		});

		document.addEventListener("keydown", function(e){
			if(e.key === "Escape"){
				fechaMenu();
			}
		});

		document.addEventListener("click", function(e){
			if(!menu.contains(e.target) && !toggle.contains(e.target)){
				fechaMenu();
			}
		});

		window.addEventListener("resize", function(){
			if(window.innerWidth > 900){
				fechaMenu();
			}
		});
	}


	/* Sombra no cabecalho ao rolar a pagina */
	function atualizaCabecalho(){
		if(window.scrollY > 8){
			cabecalho.classList.add("rolagem");
		}else{
			cabecalho.classList.remove("rolagem");
		}
	}

	if(cabecalho){
		atualizaCabecalho();
		window.addEventListener("scroll", atualizaCabecalho, { passive: true });
	}


	/* Revela os elementos [data-revelar] conforme entram na tela */
	var alvos = document.querySelectorAll("[data-revelar]");
	var semAnimacao = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

	function revelaTudo(){
		alvos.forEach(function(el){ el.classList.add("visivel"); });
	}

	if(alvos.length){
		if(semAnimacao || !("IntersectionObserver" in window)){
			revelaTudo();
		}else{
			try{
				var observador = new IntersectionObserver(function(entradas){
					entradas.forEach(function(entrada){
						if(entrada.isIntersecting){
							entrada.target.classList.add("visivel");
							observador.unobserve(entrada.target);
						}
					});
				}, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });

				alvos.forEach(function(el){ observador.observe(el); });

				setTimeout(revelaTudo, 4000);
			}catch(erro){
				revelaTudo();
			}
		}
	}


	/* Formulario: feedback simples de envio (nao ha back-end neste projeto) */
	var formulario = document.querySelector(".formulario");

	if(formulario){
		formulario.addEventListener("submit", function(e){
			e.preventDefault();
			formulario.innerHTML = '<p class="formulario_ok">Recebemos seus dados. Em breve entraremos em contato!</p>';
		});
	}

})();

---
layout: post
title: Transition page & animated text
date: 2016-05-03 12:20:02
categories: web
tag: [javascript, css, jekyll]
"posts-attribution": LVdesign
"posts-attribution-link": "http://lvdesign.com.fr"
comments: true
published: true
---


# Page de transition en css avec une animation de texte en javascript

J'avais réaliser en son temps [cette animation et sur les autres pages de ce site ](http://www.winkelmann.fr/accessory/) mais 
les animations en Flash sont en fin de vie… 

Il y a quelque temps j'avais aperçu cette très intéressante librairie en js pour animer des lettres : [lettering.js](http://letteringjs.com/). 

Le challenge est donc de réaliser un effet de texte avec une page de transition.

![Transition page & animated text ]({{ site.baseurl }}/images/montitreplugin.png "Transition page & animated text")



Le texte sera généré automatiquement en retrouvant la balise "title" de la page. 

La librairie rentre en action et après une pause avec un timbre la transition s'opère pour arriver sur la rubrique.

Je vous propose cette solution en plugin jQuery : $().makeLoaderLettering(); 

~~~
    
    /*
    Plugin loader-lettering
    version 1.0
    # besoin de :
    jQuery
    lettering.min.js
    loader_lettering.css
    
    #base Css transition page :
    https://ihatetomatoes.net/create-css3-spinning-preloader/
    #action la librairie :
     lettering.js
     http://letteringjs.com/
     https://github.com/davatron5000/Lettering.js
    #exemple de base ::
     https://css-tricks.com/animated-knockout-letters/
    */
    
    
    // style dédie pour le loader :
    // ordre de chargement si problème 
    $(document.head).append('<script src="js/LoaderLetterine/jquery.lettering.js"></script>');
    $(document.head).append('<link rel="stylesheet" href="js/LoaderLetterine/loader_lettering.css"/>');
    
    //console vérification-controle
    if(!$.fn.lettering ) throw new Error('Attention, Warning, jquery.lettering.js est nécessaire pour makeLoaderLettering');
    
    //le plugin
    $.fn.makeLoaderLettering = function(){
    
    //rechercher  valeur du <title> si n'existe pas alors "mon site sans nom"
    var title = $('title').html();
    var site_title = title ? title : "mon site sans nom"; // à adapter
    
    // si javascript actif
    // création du loader et texte à traiter
    
    $('<div id="loader-wrapper"><div id="loader"><h1>'+ site_title +'</h1></div><div class="loader-section section-left"></div><div class="loader-section section-right"></div></div>').prependTo($('body')); 
     
        
    $("#loader h1").lettering();
    $("#loader h1 span").each(function() {
    $(this).css({ 
    top: -(Math.floor(Math.random()*1000)+150), // du top : parametre base chiffre aleatoire fait varier amplitude
    left: Math.floor(Math.random()*1000)-500, // de la gauche : deplacement venant de diffrents points de left 
    }); 
    });
    
    // timing action
    setTimeout(function() {$('html').addClass("step-one");}, 1000); // départ action lettre
    setTimeout(function() {$('body').addClass('loaded');}, 6000);   // temps avant transition
    };

~~~
    
Je vous propose aussi une solution pour [Jekyll 'le blog-aware'. ](http://lvdesign.github.io/siteBMW/)


Voilà, à vous de découvrir ce plugin en action [sur mon site. ](http://www.lvdesign.com.fr/pageTransitionText/)


###### Mes sources : 
*    [base css transition page](https://ihatetomatoes.net/create-css3-spinning-preloader/)
*    [base animation texte](https://css-tricks.com/animated-knockout-letters/)



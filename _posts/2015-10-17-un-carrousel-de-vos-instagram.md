---
layout: post
title: un carousel de vos instagram sur votre site
date: 2015-10-17 12:20:02

categories: web
tag : jQuery

"posts-attribution": LVdesign
"posts-attribution-link": "http://lvdesign.com.fr"
comments: true
published: true
---




# Un plugin jQuery pour ce carousel : 

## makeCarouselInstaOwl();

### Création d'un carousel avec owl.js (de Bartosz Wojciechowski) et la diffusion de vos photos instagram avec instafeed.js (de Stevens Chobert )


Voici un petit gadget (un plugin basic !) pour animer votre site en quelques clics, si vous avez un compte Instagram !

J'ai réalisé ce principe sous la forme d'un plugin en jQuery.

Vous trouverez aussi la version de base, mais je pense que la construction en plugin est plus facile à implémenter.

Attention, depuis fin 2016, Instagram a limité la distribution de nos images.
Suivez la méthode de [Grafikart](https://www.grafikart.fr/tutoriels/php/instagram-api-515), c'est une bonne base pour gérer mon plugin.

Vous sélectionnez une photo sur votre compte instagram. Et non ce n'est plus possible, toutes les photos seront visible…
Vous lui attribuez un hashtag spécifique qui servira de lien vers votre carousel, le tour est joué. 

Ce carousel est modulable avec les paramètres de la librairie instafeed et aussi son aspect avec owl.js. A vous de jouer…
Et surtout merci à ces développeurs Bartosz Wojciechowski et Stevens Chobert, sans eux, j'aurais du recréer une sacrée roue.

Pour tester en live voici le lien :
la version de base :
[la page test de mon site ](http://www.lvdesign.com.fr/lv_owl_insta/)

Version plugin jQuery :
[les fichiers du test ](https://github.com/lvdesign/carouselInstaOwl)

Source :
[OWL](http://owlgraphic.com/owlcarousel/)
[Instafeed](http://instafeedjs.com/)
    

Et voici le code du plugin makeCarouselInstaOwl():

~~~   
       
    Don't forget to document your plugin! et oui!
    Include any assumptions that your plugin is making.
    version 1.0
    auteur : Laurent Vignaux pour lvdesign.com.fr
    contact : mailbox(at)lvdesign.com.fr

    methode :
    $('.owl-slider').makeCarouselInstaOwl();

    besoin de :
    * plugins parents : 
    owl.js version 1 
    instafeed.js

    * aide pour parametrer vos variables à vos souhaits : 
    -> instafeed.js
    https://github.com/stevenschobert/instafeed.js#advanced-options

    -> Owl.js  v1.3.2
    http://owlgraphic.com/owlcarousel/
   
    //en avant pour l'action :
    //chargement des styles du carousel Owl dans votre page si et seulement javascript est actif
    $(document.head).append('<link rel="stylesheet" href="lv-carousel-v1/owl-v1/lv-carousel.css">');

    //plugin
    $.fn.makeCarouselInstaOwl = function(){

    //gestion des erreurs :
    if(!$.fn.owlCarousel )throw new Error('Warning, plugin owlCarousel() must be loaded for action "makeCarouselInstaOwl" .');
    if(!new Instafeed() )throw new Error('Warning, plugin instafeed.js must be loaded for action "makeCarouselInstaOwl" .');

    var $carousel = this;
    
    //Set up instafeed
     
     var feed = new Instafeed({
 
    clientId: '97ae122024c4a91804f959f43f2635f', // votre clientID
    target: 'instafeed',
    get: 'user', // depuis fin 2016 utilisez 'user'
    tagName: 'cat', //votre hashtag reference
    links: true,
    limit: 25,
    sortBy: 'most-recent',
    resolution: 'standard_resolution',
    after: function () {
    
    //Set up Owl carousel  
    $carousel.owlCarousel({
        loop:true,
        margin:10,
        navigation: true,
        autoPlay: 4000, //Set AutoPlay to 4 seconds
        items : 4,
        itemsDesktop : [1199,3],
        itemsDesktopSmall : [979,3]
        });
               
    /* 
    Custom Navigation Events pour plus de possibilités, 
    début de style avec css mais peut faire mieux
    dans ce cas mettre dans parametres $carousel.owlCarousel({}); : navigation:false,
                
                  $(".next").click(function(){
                    $carousel.trigger('owl.next');
                  })
                  $(".prev").click(function(){
                    $carousel.trigger('owl.prev');
                  })
                  $(".play").click(function(){
                    $carousel.trigger('owl.play',1000); 
                    //owl.play event accept autoPlay speed as second parameter
                  })
                  $(".stop").click(function(){
                    $carousel.trigger('owl.stop');
                  })
    */
              
    },
    
    // creation du template
    template: '<div class="item"><a href="{{link}}" target="_blank"><span><img src="{{image}}" alt="{{caption}}"/></span></a></div>',
    /* 
    possibilité de rajouter des élements au template selon la présentation voulue :
    https://github.com/stevenschobert/instafeed.js#advanced-options
    */
    });               
                  
    feed.run();

    }//end function$
    
~~~

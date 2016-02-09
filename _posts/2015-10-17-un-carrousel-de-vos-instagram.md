---
layout: post
title: un carousel de vos instagram sur votre site
date: {}
categories: web
"posts-attribution": LVdesign
"posts-attribution-link": "http://lvdesign.com.fr"
comments: true
published: true
---




# Un plugin jQuery pour ce carousel : makeCarouselInstaOwl();

### Création d'un carousel avec owl.js (de Bartosz Wojciechowski) et la diffusion de vos photos instagram avec instafeed.js (de Stevens Chobert )


Voici un petit gadget (plugin basic) pour animer votre site en quelques clics, si vous avez un compte Instagram!
J'ai réalisé ce principe sous la forme d'un plugin basic en jQuery.
Vous trouverez aussi la version de base, mais je pense que la construction en plugin est plus facile à implementer.
Vous sélectionnez une photo sur votre compte instagram et vous lui donnez un hashtag bien spécifique, le tour est joué. 
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


```javascript

    Don't forget to document your plugin! 
    Include any assumptions that your plugin is making.
    version 1.0
    auteur : Laurent Vignaux pour lvdesign.com.fr
    contact : mailbox(at)lvdesign.com.fr

    methode :
    $('.owl-slider').makeCarouselInstaOwl();

    besoin de :
    # plugins parents : 
    owl.js version 1 
    instafeed.js

    # parametrer vos variables pour: 
    -> instafeed.js
    https://github.com/stevenschobert/instafeed.js#advanced-options

    -> Owl.js  v1.3.2
    http://owlgraphic.com/owlcarousel/
    */

    /*chargement des styles du carousel Owl v1 et specifique */
    $(document.head).append('<link rel="stylesheet" href="lv-carousel-v1/owl-v1/lv-carousel.css">');


    //plugin
    $.fn.makeCarouselInstaOwl = function(){

    //gestion des erreurs
    if(!$.fn.owlCarousel )throw new Error('Warning, plugin owlCarousel() must be loaded for action "makeCarouselInstaOwl" .');
    if(!new Instafeed() )throw new Error('Warning, plugin instafeed.js must be loaded for action "makeCarouselInstaOwl" .');

    var $carousel = this; //



    //Set up instafeed
     var feed = new Instafeed({
 
     clientId: '97ae5f4c024c4a91804f959f43f2635f', /* votre clientID */
     target: 'instafeed',
     get: 'tagged',
     tagName: 'cat', /* votre hashtag reference*/
     links: true,
     limit: 25,
     sortBy: 'most-recent',
     resolution: 'standard_resolution',
     
     /* pleins d'autres options voir notice
     https://github.com/stevenschobert/instafeed.js
     https://github.com/stevenschobert/instafeed.js#advanced-options
     */
    
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
               
                /* Custom Navigation Events pour plus de possibilitées, 
                début de style avec css mais peut faire mieux
                dans ce cas mettre dans parametres $carousel.owlCarousel({}); : navigation:false,
                
                  $(".next").click(function(){
                    $carousel.trigger('owl.next');
                  })
                  $(".prev").click(function(){
                    $carousel.trigger('owl.prev');
                  })
                  $(".play").click(function(){
                    $carousel.trigger('owl.play',1000); //owl.play event accept autoPlay speed as second parameter
                  })
                  $(".stop").click(function(){
                    $carousel.trigger('owl.stop');
                  })
                */
              
               },
                template: '<div class="item"><a href="{{link}}" target="_blank"><span><img src="{{image}}" alt="{{caption}}"/></span></a></div>',
                /*possibilite de rajouter des elements au template selon la presentation voulue, voir :
                https://github.com/stevenschobert/instafeed.js#advanced-options
                */
            });               
                  
    feed.run();

    }//end$
'''

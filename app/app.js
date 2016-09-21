'use strict';
var app = {};
jQuery( document ).ready(function(){
    app.main = (function () {
        var load = function(){
            tabs();
        },
        tabs = function(){
            var target = '.js-tabs';
            var tabs = $(target);
            if (tabs.length > 0){
                tabs.each(function(){
                    var container = $(this);
                    tabItem(container);
                });
            }
        },

        tabItem = function($elem){
            var tabsList = '.js-tabs-list',
                tabsListItem = '.js-tablist-item',
                tabsListLink = '.js-tablist-link',
                tabsPanelItem = '.js-tabs-panel-item',
                active = 'active';

            var $elementsLinks = $elem.find(tabsList + ' ' + tabsListLink),
                $accordionLink = $elem.find(tabsListLink),
                $accordionList = $elem.find(tabsListItem);

            $elementsLinks.on('click', function(event){
                event.preventDefault();
                var $this = $(this),
                    $parent = $elem,
                    $tabListItems = $parent.find( tabsListItem + '.' + active);

                    if( $tabListItems.length > 0 ){
                        $tabListItems.find(tabsListLink).attr('tabindex', '-1');
                        $tabListItems.removeClass( active ).attr('aria-selected', 'false');
                    }

                    var $parentActivate = $this.parents( tabsListItem );
                    $parentActivate.addClass( active ).attr('aria-selected', 'true');
                    $this.attr('tabindex', '0');

                    //panels
                    var $tabPanelItems = $parent.find( tabsPanelItem);
                    $tabPanelItems.attr('aria-hidden','true').removeClass( active );

                    $('#' + $parentActivate.attr('aria-controls')).attr('aria-hidden','false').addClass( active);

            });

            $accordionLink.on('keydown', function(e) {
                var $that = jQuery(this),
                    $accordionAgrup = $that.parents(tabsListItem),
                    elementsTab = $elem.find(tabsListItem).length - 1,
                    currentTab = $accordionAgrup.index(),
                    $element;
                if (!(e.shiftKey && e.keyCode === 9)) {
                    if (!(e.keyCode === 9)) { //tab
                        e.preventDefault();
                        //key left or key up - previous tab
                        if ((e.keyCode === 37 || e.keyCode === 38)) {
                            $accordionList.eq(currentTab).find(tabsListLink).attr('tabindex', '-1');
                            if (currentTab <= elementsTab) {
                                //there is elements-tab on left
                                $element = $accordionList.eq(currentTab - 1).find(tabsListLink).focus().attr('tabindex', '0');
                            } else {
                                if (currentTab == 0) {
                                    //start on last tab again
                                    $element = $accordionList.eq(elementsTab).find(tabsListLink).focus().attr('tabindex', '0');
                                }
                            }
                            $element.trigger('click');
                        } else {
                            //key right or key down - next tab
                            if ((e.keyCode === 39 || e.keyCode === 40)) {
                                $accordionList.eq(currentTab).find(tabsListLink).attr('tabindex', '-1');
                                if (currentTab < elementsTab) {
                                    //there is elements-tab on right
                                    $element = $accordionList.eq(currentTab + 1).find(tabsListLink).focus().attr('tabindex', '0');
                                } else {
                                    if (currentTab == elementsTab) {
                                        //start on first tab again
                                        $element = $accordionList.eq(0).find(tabsListLink).focus().attr('tabindex', '0');
                                    }
                                }
                                $element.trigger('click');
                            }
                        }
                    } else {
                        $accordionAgrup.siblings().find(tabsListLink).attr('tabindex', '-1');
                    }
                }
            });

            var $tabListContainer = $elem.find( tabsListItem );
            $tabListContainer.attr('aria-selected', 'false');
            $elementsLinks.attr('tabindex', '-1');


            var $tabListContainerActiveLink = $elem.find( tabsListItem + '.' + active + ' ' + tabsListLink);
            //comprobamos si tenemos un elemento activo
            if ( $tabListContainerActiveLink.length > 0 ) {
                $tabListContainerActiveLink.click();
            }else{ //hago click en el último elemento
                var $lastItem = $elem.find( tabsListItem + ':last');
                $lastItem.find( tabsListLink ).click();
            }
        };

        // Public API
        return {
            load: load
        };
    }());

    app.main.load();
});

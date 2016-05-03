/// -----------------------------------------------------------------------
/// IIFE unobtrusive, namespaced/non-clashing, 
///     jQuery enabled BellevueEdu javascript library
/// -----------------------------------------------------------------------
var BellevueEdu = window.BellevueEdu || {};
(function (bu_lib) {

    bu_lib(window.jQuery, window, document);

}(function ($, window, document) {
    $(function () {
        var $bu = BellevueEdu;

        $bu.initToggler();
        $bu.initTabs();

        $(".inline").fancybox();
    });

    BellevueEdu = (function () {
        var _href = location.href,
            _hash = location.hash,
            _mainNav = "nav:first",                 // main navigation
            _toggleable = ".toggleable",                  // selectors for toggleable content
            _mobileNavToggle = ".thirdLevelNavToggler",
            _tabDegreeNav = "nav.degree-tab-nav",
            _tabSections = {
                "do": "#degree-overview-section",
                "dc": "#degree-curriculum-section",
                "da": "#degree-admissions-section",
                "db": "#degree-benefits-section"
            };

        return {
            initMainNav: function (navSection) {
                navSection = (typeof navSection == 'undefined') ? _mainNav : navSection

                $(navSection).accessibleMegaMenu({
                    /* prefix for generated unique id attributes, which are required 
                       to indicate aria-owns, aria-controls and aria-labelledby */
                    uuidPrefix: "accessible-megamenu",

                    /* css class used to define the megamenu styling */
                    menuClass: "nav-menu",

                    /* css class for a top-level navigation item in the megamenu */
                    topNavItemClass: "nav-item",

                    /* css class for a megamenu panel */
                    panelClass: "sub-nav",

                    /* css class for a group of items within a megamenu panel */
                    panelGroupClass: "sub-nav-group",

                    /* css class for the hover state */
                    hoverClass: "hover",

                    /* css class for the focus state */
                    focusClass: "focus",

                    /* css class for the open state */
                    openClass: "open"
                });
            },
            initToggler: function (beforeafter) {
                var _tgc = $(_toggleable);

                if ($(_tgc).length == 0) {
                    return 0;
                } else {
                    var tglc = $(_toggleable + ' > div'),
                        tglr = $(_toggleable + ' > p, ' + _toggleable + ' > h1, ' + _toggleable + ' > h2, ' +
                                _toggleable + ' > h3, ' + _toggleable + ' > button');
                    
                    _tgc.attr('data-closed', 'true');

                    tglr.each(function () {
                        if ($(this).hasClass('toggler') === false) {
                            $(this).attr({
                                'class': 'toggler',
                                'role': 'button',
                                'aria-haspopup': 'true',
                                'aria-expanced': 'false'
                            });
                        }
                    });
                    
                    tglc.each(function () {
                        if ($(this).hasClass('toggle-container') === false) {
                            $(this).attr({
                                'class': 'toggle-container',
                                'aria-expanded': 'false',
                                'role': 'definition'
                            });
                        }
                    });

                    var _tglr_o = $(_toggleable + "[data-closed='false']"),
                        _tglr_c = $(_toggleable + "[data-closed='true']");

                    _tglr_c.children(".toggle-container").hide();
                    
                    var toggler = _tglr_c.find('.toggler'),
                        widget_close = '<i aria-hidden="true" class="icon-caret-down" /><span>&nbsp;</span>',
                        widget_open = '<i aria-hidden="false" class="icon-caret-right" /><span>&nbsp;</span>';

                    (beforeafter === "after") ? toggler.append(widget_close) : toggler.prepend(widget_close);
                    toggler.removeAttr('href');

                    toggler = _tglr_o.find('.toggler');

                    (beforeafter === "after") ? toggler.append(widget_open) : toggler.prepend(widget_open);

                    $(_toggleable).on('click', '.toggler', function (event) {
                        //event.preventDefault();

                        var $p = $(this).parent();

                        $p.toggleClass('current');

                        if ($p.attr('data-closed') === 'true') {
                            $p.attr('data-closed', "false");
                            //$p.children('.toggle-container').show('fast', function () {
                            $p.children('.toggler').children('i').removeClass('icon-caret-down').toggleClass('icon-caret-right');
                            $p.children('.toggle-container').show('slide', { direction: "up" }, 'fast', function () {
                                //$p.children('.toggler').children('i').removeClass('icon-caret-down').toggleClass('icon-caret-right');
                            });
                        } else {
                            $p.attr('data-closed', "true");
                            //$p.children('.toggle-container').hide('fast', function () {
                            $p.children('.toggler').children('i').removeClass('icon-caret-right').toggleClass('icon-caret-down');
                            $p.children('.toggle-container').hide('slide', { direction: "up" }, 100, function () {
                                //$p.children('.toggler').children('i').removeClass('icon-caret-right').toggleClass('icon-caret-down');
                            });
                        }

                        return false;  // performs both .preventDefault() and .stopPropergation()
                    });
                }
            },
            initMobileNavToggler: function (beforeafter) {
                var _tgc = $(_mobileNavToggle);

                if ($(_tgc).length == 0) {
                    return 0;
                } else {
                    var tglc = $(_mobileNavToggle + ' > div'),
                        tglr = $(_mobileNavToggle + ' > p, ' + _mobileNavToggle + ' > h1, ' + _mobileNavToggle + ' > h2, ' +
                                _mobileNavToggle + ' > h3, ' + _mobileNavToggle + ' > button');
                    
                    _tgc.attr('data-closed', 'true');
                    
                    tglr.each(function () {
                        if ($(this).hasClass('toggler') === false) {
                            $(this).attr({
                                'class': 'toggler',
                                'role': 'button',
                                'aria-haspopup': 'true',
                                'aria-expanced': 'false'
                            });
                        }
                    });
                    
                    tglc.each(function () {
                        if ($(this).hasClass('toggle-container') === false) {
                            $(this).attr({
                                'class': 'toggle-container',
                                'aria-expanded': 'false',
                                'role': 'definition'
                            });
                        }
                    });

                    var _tglr_o = $(_mobileNavToggle + "[data-closed='false']"),
                        _tglr_c = $(_mobileNavToggle + "[data-closed='true']");

                    _tglr_c.children(".toggle-container").hide();

                    var toggler = _tglr_c.find('.toggler'),
                        widget_close = '<i aria-hidden="true" class="icon-caret-down" /><span>&nbsp;</span>',
                        widget_open = '<i aria-hidden="false" class="icon-caret-right" /><span>&nbsp;</span>';

                    (beforeafter === "after") ? toggler.append(widget_close) : toggler.prepend(widget_close);
                    toggler.removeAttr('href');

                    toggler = _tglr_o.find('.toggler');

                    (beforeafter === "after") ? toggler.append(widget_open) : toggler.prepend(widget_open);

                    $(_mobileNavToggle).on('click', '.toggler', function (event) {
                        //event.preventDefault();

                        var $p = $(this).parent();

                        $p.toggleClass('current');

                        if ($p.attr('data-closed') === 'true') {
                            $p.attr('data-closed', "false");
                            //$p.children('.toggle-container').show('fast', function () {
                            $p.children('.toggler').children('i').removeClass('icon-caret-down').toggleClass('icon-caret-right');
                            $p.children('.toggle-container').show('slide', { direction: "up" }, 'fast', function () {
                                //$p.children('.toggler').children('i').removeClass('icon-caret-down').toggleClass('icon-caret-right');
                            });
                        } else {
                            $p.attr('data-closed', "true");
                            //$p.children('.toggle-container').hide('fast', function () {
                            $p.children('.toggler').children('i').removeClass('icon-caret-right').toggleClass('icon-caret-down');
                            $p.children('.toggle-container').hide('slide', { direction: "up" }, 100, function () {
                                //$p.children('.toggler').children('i').removeClass('icon-caret-right').toggleClass('icon-caret-down');
                            });
                        }

                        return false;  // performs both .preventDefault() and .stopPropergation()
                    });
                }
            },
            initDegreeTabs: function () {
                var tabParms = {
                    "tab-parm": "degreetab",
                    "parms": location.search,
                    "hash-parm": _hash
                },
                showDefault = function () {
                    $(_tabSections.do).show();
                    $("[href='" + _tabSections.do + "']").toggleClass("activeTab");
                };

                if ($(_tabDegreeNav).length == 0) {
                    return 0;
                } else {
                    $(".degree-section").hide();

                    if (tabParms["parms"].search(tabParms["tab-parm"]) !== -1) {

                        (function () {
                            var p_len = tabParms["tab-parm"].length,
                                p_beg = tabParms["parms"].search(tabParms["tab-parm"]),
                                p_end = 3,
                                parm = tabParms["parms"].substr(p_beg, p_len + p_end),
                                p_val = parm.split("=")[1];

                            if ($(_tabSections[p_val]).length === 0) {
                                showDefault();
                            } else {
                                $("[href='" + _tabSections[p_val] + "']").toggleClass("activeTab");
                                $(_tabSections[p_val]).show();

                                if (_hash.length === 0) {
                                    $('html,body').animate({ scrollTop: $("#degree-heading").offset().top }, 200);
                                } else {
                                    $('html,body').delay('200').animate({ scrollTop: $(_hash).offset().top }, 200);
                                }
                            }
                        })();
                    //} else if (_hash.length != 0) {
                    //    if (typeof _hash.split("#")[1] !== 'undefined') {
                    //        $("[href='" + _hash + "']").addClass("activeTab");
                    //        $(_hash).show();
                    //        $('html,body').animate({ scrollTop: $("#degree-heading").offset().top }, 200);
                    //    } else {
                    //        showDefault();
                    //    }
                    } else {
                        showDefault();
                    }

                    $(_tabDegreeNav + " a").on('click', function () {
                        var tab_href = $(this).attr('href');

                        $(".activeTab").toggleClass("activeTab");
                        $(".degree-section").hide();
                        $(tab_href).show();
                        $('html,body').animate({ scrollTop: $("#degree-heading").offset().top }, 200);
                        $("[href='" + tab_href + "']").toggleClass("activeTab");

                        return false;
                    });
                }
            },
            initTabs: function () {
                var tab_c = $("#tab-container");

                if ($(tab_c).length == 0) {
                    return 0;
                } else {
                    var navitem = $("#tabheader_1"),
                        tabcon = $("#tabscontent"),
                        ident = navitem[0].id.split("_")[1];

                    navitem.parent().attr('data-current', ident);
                    navitem.addClass("activeTab");
                    tabcon.children("div").hide();
                    $("#tabpage_" + ident).show();

                    $("#tabs ul li").click(function () {
                        var current = $(this).parent().attr("data-current");
                        
                        $("#tabheader_" + current).removeAttr("class");
                        $("#tabpage_" + current).hide();

                        var ident = $(this)[0].id.split("_")[1];
                        $(this).attr("class", "activeTab");
                        $("#tabpage_" + ident).fadeIn("500");
                        $(this).parent().attr("data-current", ident);

                        return false;
                    });
                }
            }
        }
    })();
}));
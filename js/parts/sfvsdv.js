(function () {
    var $body = $('body'), $window = $(window), $enabledPirates = $('#pirates .pirate.on'), $enabledPiratesLinks = $enabledPirates.find('.link'), smokeTicker, pirates, smartphoneManager;

    function SmokeTicker(options) {
        var defaults = {smokeLeftClass: 'smokeLeft', smokeRightClass: 'smokeRight'};
        this.options = $.extend({}, defaults, options);
        this.$smoke = $('#smoke');
        this.$smokeBalls = this.$smoke.children();
        this.timerId = null;
        this.seconds = -1;
        this.isActive = true;
        this.enable();
    }

    SmokeTicker.prototype = {
        tick: function () {
            var $smokeBall, smokeClass, smokeNumber;
            smokeNumber = ++this.seconds % 10;
            $smokeBall = this.$smokeBalls.eq(smokeNumber);
            smokeClass = (smokeNumber % 2) ? this.options.smokeLeftClass : this.options.smokeRightClass;
            $smokeBall.removeClass(smokeClass);
            setTimeout(function () {
                $smokeBall.addClass(smokeClass);
            }, 1);
        }, enable: function () {
            var that = this;
            this.seconds = -1;
            this.tick();
            this.timerId = setInterval(function () {
                that.tick.call(that);
            }, 1000);
        }, disable: function () {
            this.$smokeBalls.removeClass(this.options.smokeLeftClass).removeClass(this.options.smokeRightClass);
            clearInterval(this.timerId);
        }, toggle: function () {
            if (this.isActive)this.disable(); else this.enable();
            this.isActive = !this.isActive;
        }
    };
    smokeTicker = new SmokeTicker();
    var Pirates = function (options) {
        var defaults = {pirateHighlightClass: 'highlight', pirateLowlightClass: 'lowlight'};
        this.options = $.extend({}, defaults, options);
    };
    Pirates.prototype = {
        lowlight: function () {
            $enabledPirates.removeClass(this.options.pirateHighlightClass).addClass(this.options.pirateLowlightClass);
        }, restoreLight: function () {
            $enabledPirates.removeClass(this.options.pirateHighlightClass).removeClass(this.options.pirateLowlightClass);
        }, highlight: function (el) {
            this.lowlight();
            $(el).removeClass(this.options.pirateLowlightClass).addClass(this.options.pirateHighlightClass);
        }
    };
    pirates = new Pirates();
    var SmartphoneManager = function (options) {
        this.isSmartphone = DetectTierIphone();
        this.piratesCount = $enabledPirates.length;
        this.$piratesContainer = $('#pirates');
        var smartphoneClass = (this.isSmartphone) ? 'smartphone' : 'no-smartphone';
        $body.addClass(smartphoneClass);
        if (this.isSmartphone) {
            this.piratesSwipe = new Swipe(document.getElementById('piratesWrapper'));
        }
        else {
            $('#piratesWrapper').clone().attr('id', 'piratesSlider').appendTo('#speakers');
            this.piratesSwipe = new Swipe(document.getElementById('piratesSlider'));
            $('#morePirates .label').text('Scroll for more!');
        }
    };
    SmartphoneManager.prototype = {
        resize: function () {
            windowWidth = $window.width();
            if (this.isSmartphone) {
                $enabledPirates.width(windowWidth);
                this.$piratesContainer.width(this.piratesCount * windowWidth);
            }
        }
    };
    smartphoneManager = new SmartphoneManager();
    $window.resize(smartphoneManager.resize);
    smartphoneManager.resize();
    $('#morePirates .go').on('click', function (e) {
        var $el = $(e.target), isNext = $el.hasClass('next');
        if (isNext) {
            smartphoneManager.piratesSwipe.next();
        } else {
            smartphoneManager.piratesSwipe.prev();
        }
    });
    if (!smartphoneManager.isSmartphone) {
        $enabledPiratesLinks.on('mouseenter', function () {
            pirates.highlight(this.parentElement);
        });
        $enabledPiratesLinks.on('mouseleave', function () {
            pirates.restoreLight();
        });
    }
})();
$(function () {
    var $nav = $('.n-main');
    var startPos = 1365;

    function updateMenuPos() {
        if ($nav.css('position') === 'absolute') {
            var scrollPos = $(window).scrollTop();
            if (scrollPos > startPos) {
                $nav.css({'top': scrollPos});
            }
            else {
                $nav.css({'top': startPos});
            }
        } else {
            $nav.css({'top': 0});
        }
    }

    $(window).scroll(function (e) {
        updateMenuPos();
    });
    $(window).resize(function (e) {
        updateMenuPos();
    });
});

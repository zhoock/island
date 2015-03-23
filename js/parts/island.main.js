/**
 * Created by yaroslav on 03.03.15.
 */



var ISLAND = ISLAND || {};

ISLAND.owlMaps = function () {

    $(".js-owl-maps").owlCarousel({
        items: 1,
        navigation: true,
        slideSpeed: 300,
        paginationSpeed: 400,
        navigationText: ["<span class='icon-chevron-left'></span>", "<span class='icon-chevron-right'></span>"],
        pagination: false,
        transitionStyle: "fade"
    });
};

ISLAND.owlLeaders = function () {

    $(".js-owl-leaders").owlCarousel({
        autoPlay: 3000,
        stopOnHover: true,
        items: 3,
        navigation: true,

        //Basic Speeds
        slideSpeed: 300,
        paginationSpeed: 400,

        // Navigation
        navigationText: ["<span class='icon-chevron-left'></span>", "<span class='icon-chevron-right'></span>"],

        //Pagination
        pagination: false,
        transitionStyle: "fade",

        itemsDesktop : [1024,6],
        itemsDesktopSmall : [900,4],
        itemsTablet: [600,3]
    });
};

(function () {

    function SmokeTicker(options) {
        var defaults = {smokeLeftClass: 'b-smoke__left', smokeRightClass: 'b-smoke__right'};
        this.options = $.extend({}, defaults, options);
        this.$smoke = $('.js-smoke');
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

    new SmokeTicker();

})();

// FitText

(function ($) {

    $.fn.fitText = function (kompressor, options) {

        // Setup options
        var compressor = kompressor || 1,
            settings = $.extend({
                'minFontSize': Number.NEGATIVE_INFINITY,
                'maxFontSize': Number.POSITIVE_INFINITY
            }, options);

        return this.each(function () {

            // Store the object
            var $this = $(this);

            // Resizer() resizes items based on the object width divided by the compressor * 10
            var resizer = function () {
                $this.css('font-size', Math.max(Math.min($this.width() / (compressor * 10), parseFloat(settings.maxFontSize)),
                    parseFloat(settings.minFontSize)));
            };

            // Call once to set.
            resizer();

            // Call on resize. Opera debounces their resize by default.
            $(window).on('resize.fittext orientationchange.fittext', resizer);

        });
    };

})(jQuery);

ISLAND.modalWindow = function () {
    $(".js-plane, .close").on("click", function () {
        $(".b-modal__overlay").toggleClass("open");
    });
};

ISLAND.dropDown = function () {

    $(".js-menu-section-toggle").on('click', function () {
        var $this = $(this);

        $this.toggleClass("on");
        $("html").toggleClass('down');

    });
};

ISLAND.planeAnimation = function () {
    var plane = $(".js-plane", ".no-cssanimations");
    //var plane = $(".js-plane");

    console.log(plane);

    var planeMove = function () {
        plane.show().animate({
            transform: 'translate(1800px, 500px) scale(12)'
        }, 15000, function () {
            plane.hide().animate({
                transform: 'translate(-100px, 0) scale(1)'
            }, planeMove);
        });
    };

    plane.hover(function () {
        plane.stop();
    }, function () {
        planeMove();
    });

    planeMove();

};


// делим ширину контейнера на размер шрифта, умножаем на  .10 и получаем нужный kompressor
ISLAND.fitText = function () {
    $(".js-fittext-links").fitText(6, {minFontSize: '10px', maxFontSize: '16px'});
};

$(function () {

    ISLAND.owlMaps();
    ISLAND.owlLeaders();
    ISLAND.fitText();
    ISLAND.dropDown();
    ISLAND.modalWindow();
    ISLAND.planeAnimation();

});



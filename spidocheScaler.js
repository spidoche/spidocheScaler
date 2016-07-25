/*!
 * SpidocheScaler - Scale the dom width jQuery
 *
 * Version    : 1.2.2
 * Author     : Spidoche - spidoche.com
 * Require    : jQuery v1.7.2 or later
 * IE support : ie9 or later
 *
 * Plugin URL : https://github.com/spidoche/spidocheScaler
 * Demo URL   : http://spidoche.com/spidocheScaler/
 */

/* globals jQuery, window */
/** jshint -W117 */
/** jshint -W098 */

(function($){

    // custom select class
    function SpidocheScaler(item, options) {

        this.options = $.extend({
            maxWidth : 800,
            minWidth : 0,
            destroyAt: -1
        }, options);

        this.item = $(item);
        this.is_init = false;
        this.is_destroy = false;

        this.load();

    }

    SpidocheScaler.prototype = {

        init: function() {

            //console.log('init');

            var that = this;
            var $el = that.item;
            var timestamp = new Date().getTime();
            var $container = null;

            // Add uid to each object (required to give a unique name to resize event)
            that.uid = timestamp;

            // Create a warpper
            $el.wrap('<div class="spidochescaler-container" />');
            $container = $el.parent();

            // Scale on load
            that.scale_dom($el, $container, $container.width(), $el.height());

        },
        scale_dom: function($el, $container, maxWidth, maxHeight) {

            // Get options
            var settings = this.options;

            // Remove or set maxWidth
            if($container.width() > settings.maxWidth){
                $el.removeAttr('style').parent().removeAttr('style');
                return;
            }else{
                $el.css({width: settings.maxWidth});
            }

            // Init some variable
            var scaleX = 1,
                scaleY = 1,
                base_scale  = 1,
                base_scaleX = 1,
                base_scaleY = 1;

            // Get element base dimension
            var base_width  = $el.width(),
                base_height = $el.height();

            // Set the dimension
            scaleX = maxWidth / base_width;
            scaleY = maxHeight / base_height;
            base_scaleX = scaleX;
            base_scaleY = scaleY;
            base_scale = (scaleX > scaleY) ? scaleY : scaleX;

            // Apply dimension if sup to minWidth !BETA TEST
            if($container.width() > settings.minWidth){
                if($container.hasClass('spidochescaler-container')){
                    $container.height(base_height*base_scale);
                }

                $el.css({
                    width : settings.maxWidth,
                    transformOrigin : "0 0",
                    transform : 'scale(' + base_scale + ')'
                });
            }

        },
        resize: function(){

            var that = this;
            var $el  = that.item;
            var $container = $el.parent();
            var destroy_at = that.options.destroyAt;

            //console.log(this.is_init);

            $(window).on('resize.domScaler.'+that.uid,function () {
                //console.log(that.is_init);
                if($(window).width() > destroy_at && that.is_init === true ){
                    that.scale_dom($el, $container, $container.width(), $el.height());
                }else if($(window).width() <= destroy_at && that.is_init === true){
                    that.destroy();
                    //console.log('dd');
                }else if($(window).width() > destroy_at && that.is_init === false){
                    that.load();
                    that.is_init = true;
                }
            });

        },
        load: function(){

            // Init if window width up to destroy breakpoint
            if($(window).width() > this.options.destroyAt  ){
                 this.init();
                 this.is_init = true;
             }
             this.resize();
        },
        destroy: function() {

            //console.log('destroy');

            // Remove current item inline style
            this.item.removeAttr('style');

            // Remove container
            if(this.item.parent().hasClass('spidochescaler-container')){
                this.item.unwrap();
            }

            this.is_init = false;
            // Check if unbind resize is required
            //$(window).off('resize.domScaler.'+this.uid);

        }

    }; // END Prototype SpidocheScaler

    // jQuery plugin interface
    $.fn.spidochescaler = function(opt) {

        var args = Array.prototype.slice.call(arguments, 1);

        return this.each(function() {
            var item = $(this);
            var instance = item.data('SpidocheScaler');

            if(!instance) {
                // Create plugin instance if not created
                item.data('SpidocheScaler', new SpidocheScaler(this, opt));
            } else {
                // Otherwise check arguments for method call
                if(typeof opt === 'string') {
                    instance[opt].apply(instance, args);
                }
            }
        });
    };

}(jQuery));


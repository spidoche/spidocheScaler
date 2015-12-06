/*!
 * SpidocheScaler - Scale the dom width jQuery
 *
 * Version    : 1.1.0
 * Author     : Spidoche - spidoche.com
 * Require    : jQuery v1.7.2 or later
 * IE support : ie9 or later
 *
 * Plugin URL : https://github.com/spidoche/spidocheScaler
 * Demo URL   : http://spidoche.com/spidocheScaler/
 */

/** jshint -W117 */
/** jshint -W098 */

(function($){

    $.fn.spidochescaler = function(options){

        //Set the options
        var settings = $.extend({
            breakpoint : 800,
        },options);

        return this.each(function(){

            var $this = $(this);
            var $container = null;

            // create a warpper
            $this.wrap('<div class="spidochescaler-container" />');
            $container = $this.parent();

            // scale on load
            scale_dom($this, $container, $this.parent().width(), $this.height());

            // scale on resize
            $(window).resize(function () {
                 scale_dom($this, $container, $this.parent().width(), $this.height());
            });

        });// END each

        function scale_dom($el, $container, maxWidth, maxHeight) {

            // Remove or set breakpoint
            if($container.width() > settings.breakpoint){
                $el.removeAttr('style').parent().removeAttr('style');
                return;
            }else{
                $el.css({width: settings.breakpoint});
            }

            // init some variable
            var scaleX = 1,
                scaleY = 1,
                base_scale  = 1,
                base_scaleX = 1,
                base_scaleY = 1;

            // get element base dimension
            var base_width  = $el.width(),
                base_height = $el.height();

            // set the dimension
            scaleX = maxWidth / base_width;
            scaleY = maxHeight / base_height;
            base_scaleX = scaleX;
            base_scaleY = scaleY;
            base_scale = (scaleX > scaleY) ? scaleY : scaleX;

            // Apply dimension
            $container.height(base_height*base_scale);

            $el.css({
                width : settings.breakpoint,
                transformOrigin : "0 0",
                transform : 'scale(' + base_scale + ')'
            });

        }

   }; //END spidocheScale

})(jQuery);

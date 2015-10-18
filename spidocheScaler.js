/** jshint -W117 */
/** jshint -W098 */

(function($){

    $.fn.spidochescaler = function(options){

        //Set the option
        var settings = $.extend({
            base_width : 800,
        },options);

        return this.each(function(){

            var $this = $(this);

            $this.css({
                width: settings.base_width
            });
            $this.wrap('<div class="spidoche-scale-container" />');

            var $table_container = $this.parent();
            var basetable_width  = $this.width();
            var basetable_height = $this.height();
            var basetable_scale  = 1;
            var basetable_scaleX = 1;
            var basetable_scaleY = 1;

            scale_table($this, $this.parent().width(), $this.height());

            $(window).resize(function () {
                 scale_table($this, $this.parent().width(), $this.height());
            });


            function scale_table(table, maxWidth, maxHeight) {

              var scaleX = 1, scaleY = 1;
              scaleX = maxWidth / basetable_width;
              scaleY = maxHeight / basetable_height;
              basetable_scaleX = scaleX;
              basetable_scaleY = scaleY;
              basetable_scale = (scaleX > scaleY) ? scaleY : scaleX;

              $table_container.height(basetable_height*basetable_scale);
              table.css({
                  transformOrigin: "0 0",
                  transform: 'scale(' + basetable_scale + ')'
              });
            }

        });// END each

   }; //END spidocheScale

})(jQuery);

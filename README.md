#SpidocheScaler

## What?
SpidocheScaler is a responsive DOM scaler

DEMO : http://spidoche.com/spidocheScaler/

## Why?
This jQuery plugin is perfect to deal with complexe table on mobile when your client or your boss do not like table scroll overflow style ;) 

With spidocheScaler you can resize your table without breaking the layout.

Of course you have to enable the zoom on mobile devices to keep a good user experiences.

## How?
Scale all the table of a page
```
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
<script src="spidocheScaler.js"></script>
<script>
    jQuery(function($){
        $('table').spidochescaler();
    });
</script>
```

You can adjust the max-width of the DOM part you want to scale with the option 'breakpoint' (the default value is 800 px)
```
$('table').spidochescaler({breakpoint:500});
```

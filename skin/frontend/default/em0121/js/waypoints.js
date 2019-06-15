(function(){var e=[].indexOf||function(e){for(var t=0,n=this.length;t<n;t++){if(t in this&&this[t]===e)return t}return-1},t=[].slice;(function(e,t){if(typeof define==="function"&&define.amd){return define("waypoints",["jquery"],function(n){return t(n,e)})}else{return t(e.jQuery,e)}})(this,function(n,r){var i,s,o,u,a,f,l,c,h,p,d,v,m,g,y,b;i=n(r);c=e.call(r,"ontouchstart")>=0;u={horizontal:{},vertical:{}};a=1;l={};f="waypoints-context-id";d="resize.waypoints";v="scroll.waypoints";m=1;g="waypoints-waypoint-ids";y="waypoint";b="waypoints";s=function(){function e(e){var t=this;this.$element=e;this.element=e[0];this.didResize=false;this.didScroll=false;this.id="context"+a++;this.oldScroll={x:e.scrollLeft(),y:e.scrollTop()};this.waypoints={horizontal:{},vertical:{}};this.element[f]=this.id;l[this.id]=this;e.bind(v,function(){var e;if(!(t.didScroll||c)){t.didScroll=true;e=function(){t.doScroll();return t.didScroll=false};return r.setTimeout(e,n[b].settings.scrollThrottle)}});e.bind(d,function(){var e;if(!t.didResize){t.didResize=true;e=function(){n[b]("refresh");return t.didResize=false};return r.setTimeout(e,n[b].settings.resizeThrottle)}})}e.prototype.doScroll=function(){var e,t=this;e={horizontal:{newScroll:this.$element.scrollLeft(),oldScroll:this.oldScroll.x,forward:"right",backward:"left"},vertical:{newScroll:this.$element.scrollTop(),oldScroll:this.oldScroll.y,forward:"down",backward:"up"}};if(c&&(!e.vertical.oldScroll||!e.vertical.newScroll)){n[b]("refresh")}n.each(e,function(e,r){var i,s,o;o=[];s=r.newScroll>r.oldScroll;i=s?r.forward:r.backward;n.each(t.waypoints[e],function(e,t){var n,i;if(r.oldScroll<(n=t.offset)&&n<=r.newScroll){return o.push(t)}else if(r.newScroll<(i=t.offset)&&i<=r.oldScroll){return o.push(t)}});o.sort(function(e,t){return e.offset-t.offset});if(!s){o.reverse()}return n.each(o,function(e,t){if(t.options.continuous||e===o.length-1){return t.trigger([i])}})});return this.oldScroll={x:e.horizontal.newScroll,y:e.vertical.newScroll}};e.prototype.refresh=function(){var e,t,r,i=this;r=n.isWindow(this.element);t=this.$element.offset();this.doScroll();e={horizontal:{contextOffset:r?0:t.left,contextScroll:r?0:this.oldScroll.x,contextDimension:this.$element.width(),oldScroll:this.oldScroll.x,forward:"right",backward:"left",offsetProp:"left"},vertical:{contextOffset:r?0:t.top,contextScroll:r?0:this.oldScroll.y,contextDimension:r?n[b]("viewportHeight"):this.$element.height(),oldScroll:this.oldScroll.y,forward:"down",backward:"up",offsetProp:"top"}};return n.each(e,function(e,t){return n.each(i.waypoints[e],function(e,r){var i,s,o,u,a;i=r.options.offset;o=r.offset;s=n.isWindow(r.element)?0:r.$element.offset()[t.offsetProp];if(n.isFunction(i)){i=i.apply(r.element)}else if(typeof i==="string"){i=parseFloat(i);if(r.options.offset.indexOf("%")>-1){i=Math.ceil(t.contextDimension*i/100)}}r.offset=s-t.contextOffset+t.contextScroll-i;if(r.options.onlyOnScroll&&o!=null||!r.enabled){return}if(o!==null&&o<(u=t.oldScroll)&&u<=r.offset){return r.trigger([t.backward])}else if(o!==null&&o>(a=t.oldScroll)&&a>=r.offset){return r.trigger([t.forward])}else if(o===null&&t.oldScroll>=r.offset){return r.trigger([t.forward])}})})};e.prototype.checkEmpty=function(){if(n.isEmptyObject(this.waypoints.horizontal)&&n.isEmptyObject(this.waypoints.vertical)){this.$element.unbind([d,v].join(" "));return delete l[this.id]}};return e}();o=function(){function e(e,t,r){var i,s;r=n.extend({},n.fn[y].defaults,r);if(r.offset==="bottom-in-view"){r.offset=function(){var e;e=n[b]("viewportHeight");if(!n.isWindow(t.element)){e=t.$element.height()}return e-n(this).outerHeight()}}this.$element=e;this.element=e[0];this.axis=r.horizontal?"horizontal":"vertical";this.callback=r.handler;this.context=t;this.enabled=r.enabled;this.id="waypoints"+m++;this.offset=null;this.options=r;t.waypoints[this.axis][this.id]=this;u[this.axis][this.id]=this;i=(s=this.element[g])!=null?s:[];i.push(this.id);this.element[g]=i}e.prototype.trigger=function(e){if(!this.enabled){return}if(this.callback!=null){this.callback.apply(this.element,e)}if(this.options.triggerOnce){return this.destroy()}};e.prototype.disable=function(){return this.enabled=false};e.prototype.enable=function(){this.context.refresh();return this.enabled=true};e.prototype.destroy=function(){delete u[this.axis][this.id];delete this.context.waypoints[this.axis][this.id];return this.context.checkEmpty()};e.getWaypointsByElement=function(e){var t,r;r=e[g];if(!r){return[]}t=n.extend({},u.horizontal,u.vertical);return n.map(r,function(e){return t[e]})};return e}();p={init:function(e,t){var r;if(t==null){t={}}if((r=t.handler)==null){t.handler=e}this.each(function(){var e,r,i,u;e=n(this);i=(u=t.context)!=null?u:n.fn[y].defaults.context;if(!n.isWindow(i)){i=e.closest(i)}i=n(i);r=l[i[0][f]];if(!r){r=new s(i)}return new o(e,r,t)});n[b]("refresh");return this},disable:function(){return p._invoke.call(this,"disable")},enable:function(){return p._invoke.call(this,"enable")},destroy:function(){return p._invoke.call(this,"destroy")},prev:function(e,t){return p._traverse.call(this,e,t,function(e,t,n){if(t>0){return e.push(n[t-1])}})},next:function(e,t){return p._traverse.call(this,e,t,function(e,t,n){if(t<n.length-1){return e.push(n[t+1])}})},_traverse:function(e,t,i){var s,o;if(e==null){e="vertical"}if(t==null){t=r}o=h.aggregate(t);s=[];this.each(function(){var t;t=n.inArray(this,o[e]);return i(s,t,o[e])});return this.pushStack(s)},_invoke:function(e){this.each(function(){var t;t=o.getWaypointsByElement(this);return n.each(t,function(t,n){n[e]();return true})});return this}};n.fn[y]=function(){var e,r;r=arguments[0],e=2<=arguments.length?t.call(arguments,1):[];if(p[r]){return p[r].apply(this,e)}else if(n.isFunction(r)){return p.init.apply(this,arguments)}else if(n.isPlainObject(r)){return p.init.apply(this,[null,r])}else if(!r){return n.error("jQuery Waypoints needs a callback function or handler option.")}else{return n.error("The "+r+" method does not exist in jQuery Waypoints.")}};n.fn[y].defaults={context:r,continuous:true,enabled:true,horizontal:false,offset:0,triggerOnce:false};h={refresh:function(){return n.each(l,function(e,t){return t.refresh()})},viewportHeight:function(){var e;return(e=r.innerHeight)!=null?e:i.height()},aggregate:function(e){var t,r,i;t=u;if(e){t=(i=l[n(e)[0][f]])!=null?i.waypoints:void 0}if(!t){return[]}r={horizontal:[],vertical:[]};n.each(r,function(e,i){n.each(t[e],function(e,t){return i.push(t)});i.sort(function(e,t){return e.offset-t.offset});r[e]=n.map(i,function(e){return e.element});return r[e]=n.unique(r[e])});return r},above:function(e){if(e==null){e=r}return h._filter(e,"vertical",function(e,t){return t.offset<=e.oldScroll.y})},below:function(e){if(e==null){e=r}return h._filter(e,"vertical",function(e,t){return t.offset>e.oldScroll.y})},left:function(e){if(e==null){e=r}return h._filter(e,"horizontal",function(e,t){return t.offset<=e.oldScroll.x})},right:function(e){if(e==null){e=r}return h._filter(e,"horizontal",function(e,t){return t.offset>e.oldScroll.x})},enable:function(){return h._invoke("enable")},disable:function(){return h._invoke("disable")},destroy:function(){return h._invoke("destroy")},extendFn:function(e,t){return p[e]=t},_invoke:function(e){var t;t=n.extend({},u.vertical,u.horizontal);return n.each(t,function(t,n){n[e]();return true})},_filter:function(e,t,r){var i,s;i=l[n(e)[0][f]];if(!i){return[]}s=[];n.each(i.waypoints[t],function(e,t){if(r(i,t)){return s.push(t)}});s.sort(function(e,t){return e.offset-t.offset});return n.map(s,function(e){return e.element})}};n[b]=function(){var e,n;n=arguments[0],e=2<=arguments.length?t.call(arguments,1):[];if(h[n]){return h[n].apply(null,e)}else{return h.aggregate.call(null,n)}};n[b].settings={resizeThrottle:100,scrollThrottle:30};return i.load(function(){return n[b]("refresh")})})}).call(this);
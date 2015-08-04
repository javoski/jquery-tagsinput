/**
 * @author xujiongbo
 * @description jQuery Tags Input Plugin
 * Date: 2015-08-03
 */
(function($) {
    $.fn.tagsinput = function(opts) {
        return init(this, opts);
    };
    function init($input, opts) {
        var obj = {tagList:[]},
            $tagsInput = $('<div class="tags-input"></div>'),
            $tagsInputAdd = $('<input type="text" class="tags-input-add">'),
            options = $.extend({
                
            }, opts);

        //add tag by name
        obj.add = function(tagName){
            this.tagList.push(tagName);
            $input.val(this.tagList.join(','));
            var $tagItem = $('<span class="tag-input-item">'+tagName+'<span class="tag-input-remove"></span></span>');
            $tagItem.find('.tag-input-remove').click(function(){
                obj.remove($tagItem);
            });
            $tagsInputAdd.before($tagItem);
        };
        //add tags by string
        obj.addList = function(tagNames){
            var list = tagNames.split(',');
            for(var i=0;i<list.length;i++){
                this.add(list[i]);
            }
        };
        //remove tag by jquery object
        obj.remove = function($item){
            var tag = $item.text();
            this.tagList.splice(obj.tagList.indexOf(tag), 1);
            $item.remove();
            $input.val(obj.tagList.join(','));
        };
        //keys binding
        $tagsInputAdd.on('keydown', function(e){
            var which = e.which || e.keyCode;
            if(which === 13 || which === 9 || which === 32){
                var val =  $.trim($(this).val());
                if(val!==''){
                    obj.add(val);
                    $(this).val('');
                    $(this).focus();
                }
                return false;
            }
        });
        $tagsInput.click(function(){
            $(this).find('.tags-input-add').focus();
        });
        if($input.val()!='') obj.addList($input.val());
        $input.css('display', 'none');
        $tagsInput.append($tagsInputAdd);
        $input.after($tagsInput);
        return obj;
    };
})(jQuery);
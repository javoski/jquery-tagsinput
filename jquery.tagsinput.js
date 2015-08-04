/**
 * @author xujiongbo
 * @description jQuery Tags Input Plugin
 * Date: 2015-08-03
 */
(function($) {
    $.fn.tagsinput = function(opts) {
        this.each(function(){
            init.call(this, opts);
        });
    };
    var keyCodeReflect = {
        13: 'enter',
        9: 'tab',
        32: 'space'
    };
    function init(opts) {
        var $input = $(this),
            tagList = [],
            $tagsInput = $('<div class="xjb-tags-input"></div>'),
            $tagsInputAdd = $('<input type="text" class="xjb-tags-input-add">'),
            options = $.extend({
                tagKeys: ['enter', 'tab', 'space'],
                keyDeletion: false,
                separator: ','
            }, opts);

        //add tag by name
        var add = function(tagName){
            tagList.push(tagName);
            $input.val(tagList.join(','));
            var $tagItem = $('<span class="xjb-tag-input-item">'+tagName+'<span class="xjb-tag-input-remove"></span></span>');
            $tagItem.find('.xjb-tag-input-remove').click(function(){
                remove($tagItem);
            });
            $tagsInputAdd.before($tagItem);
        };
        //add tags by string
        var addList = function(tagNames){
            var list = tagNames.split(options.separator);
            for(var i=0;i<list.length;i++){
                add(list[i]);
            }
        };
        //remove tag by jquery object
        var remove = function($item){
            var tag = $item.text();
            tagList.splice(tagList.indexOf(tag), 1);
            $item.remove();
            $input.val(tagList.join(options.separator));
        };
        //remove the last tag
        var removeLast = function(){
            tagList.pop();
            $tagsInput.find('.xjb-tag-input-item:last').remove();
            $input.val(tagList.join(','));
        };
        $tagsInput.click(function(){
            $(this).find('.xjb-tags-input-add').focus();
        });
        if($input.val()!='') addList($input.val());
        $input.css('display', 'none');
        $tagsInput.append($tagsInputAdd);
        $input.after($tagsInput);
        //keys binding
        $tagsInputAdd.on('keydown', function(e){
            var which = e.which || e.keyCode;
            if(keyCodeReflect[which] && options.tagKeys.indexOf(keyCodeReflect[which])>=0){
                var val =  $.trim($(this).val());
                if(val!==''){
                    add(val);
                    $(this).val('');
                    $(this).focus();
                }
                return false;
            }else if(options.keyDeletion && which === 8){
                if($tagsInputAdd.val() === ''){
                    removeLast();
                }
            }
        });
    };
})(jQuery);
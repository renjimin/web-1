/**
 * Created by leon on 8/19/15.
 */
var index = {
    init: function () {
        //删除一行垃圾代码
        $$('#index span.tab-link-highlight').remove();

    },
    event: function () {

        /**
         * 添加标签
         */
        $('#index').on(clickEvent,'div.tag-list p a.unselected', function () {
            var btn = $$(this);
            index.functions.check_follow(function () {
                var tag = btn.attr('data-name');
                index.functions.add_tag(tag, function () {
                    //添加到我的标签中
                    btn.removeClass('unselected');
                    btn.addClass('selected');
                });
            });
        });

        /**
         * 删除标签
         */
        $$('#index').on(clickEvent,'div.tag-list p a.selected', function (e) {
            e.stopPropagation();
            var btn = $$(this);
            index.functions.check_follow(function () {
                var tag = btn.text();
                index.functions.remove_tag(tag, function () {
                    //添加到我的标签中
                    btn.removeClass('selected');
                    btn.addClass('unselected');
                });
            });
        });
        /**
         * 匹配
         */
        $$('#index').on(clickEvent,'a.pipei', function () {
            var btn = $$(this);
            index.functions.check_follow(function () {
                btn.addClass('hide');
                index.functions.pipei(function () {
                    $$('#index a.pipei-success').removeClass('hide');
                }, function () {
                    btn.removeClass('hide');
                });
            });
        });

        /**
         * 挂断
         */
        $$('#index').on(clickEvent,'a.hang-up', function () {
            var btn = $$(this);
            index.functions.check_follow(function () {
                btn.addClass('hide');
                $$('#index a.load.hide').removeClass('hide');
                index.functions.hang_up(function () {
                    $$('#index a.load').addClass('hide');
                    $$('#index a.pipei').removeClass('hide');
                    $$('#index a.hang-up').addClass('hide');
                });
            });
        });

    },
    functions: {
        pipei : function(callback,error_callback){
            $$('#index a.load.hide').removeClass('hide');
            var url = $$('html').attr('data-pipei-url');
            $$.post(url, function (e) {
                $$('#index a.load').addClass('hide');
                var json = JSON.parse(e);
                if(json.status == 200){
                    callback();
                }else{
                    mainFramework.alert(json.message);
                    error_callback();
                }
            });
        },
        /**
         * 挂断
         * @param callback
         */
        hang_up : function (callback) {
            var url = $$('html').attr('data-hang-up-url');
            $$.post(url, function (e) {
                var json = JSON.parse(e);
                if(json.status == 200){
                    $$('#index a.hang-up').addClass('hide');
                    callback();
                }else{
                    mainFramework.alert(json.message);
                }
            })
        },
        /**
         * 添加标签
         * @param callback
         */
        add_tag : function (tag,callback) {
            var url = $$('html').attr('data-add-tag-url');
            var post_data = {
                tag : tag
            }
            $$.post(url, post_data, function (e) {
                var json = JSON.parse(e);
                if(json.status == 200){
                    callback();
                }else{
                    mainFramework.alert(json.message);
                }
            });
        },
        /**
         * 删除标签
         * @param id
         * @param callback
         */
        remove_tag : function (tag, callback) {
            var url = $$('html').attr('data-remove-tag-url');
            var post_data = {
                tag : tag
            }
            $$.post(url, post_data, function (e) {
                var json = JSON.parse(e);
                if(json.status == 200){
                    callback();
                }else{
                    mainFramework.alert(json.message);
                }
            });
        },
        /**
         * 检查用户是否关注
         * @returns {boolean}
         */
        check_follow : function (callback) {
            var openid = $$('html').attr('data-openid');
            var follow_url = $$('html').attr('data-follow-url');
            if(openid == null || openid == '' || openid == undefined){
                mainFramework.confirm('您没有关注本微信平台,点击确认前往关注', function () {
                    window.location.href = follow_url;
                }, function () {
                    return ;
                });
            }else{
                callback();
            }
        }
    }
}
/*初始化页面*/
$(function(e){
    index.init();
    index.event();
})
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Main = Main || {};
var fn = require('./core/_fn.msx');
var data = require('./core/_data.msx');
Main.Home = require('./main/home.msx');
Main.Category = require('./main/category.msx');
Main.Post = require('./main/post.msx');
Main.Article = require('./main/article.msx');

data.token = $(document.getElementsByName("csrfToken")).val();
// alert($(token).val());
$(document).ajaxSend(function(elm, xhr, s){
  if (s.type == "POST") {
    xhr.setRequestHeader('Csrf-Token', data.token);
  }
});

Array.prototype.getItemByParam = function(paramPair) {
  var key = Object.keys(paramPair)[0];
  return this.find(function(item){return ((item[key] == paramPair[key]) ? true: false)});
}


m.route(document.querySelector('#app'), "/", {
  "/": Main.Home,
  "/post/:postID": Main.Post,
  "/blog/:slug": Main.Article,
  "/category/:categorySlug": Main.Category
});


module.exports = Main;

},{"./core/_data.msx":11,"./core/_fn.msx":12,"./main/article.msx":14,"./main/category.msx":15,"./main/home.msx":16,"./main/post.msx":17}],2:[function(require,module,exports){
var fn = require('../core/_fn.msx');
var data = require('../core/_data.msx');
var Comments = require('./_comment.msx');

var PostView = function(ctrl){
  return {tag: "div", attrs: {className:"main mh800"}, children: [
    ctrl.request.ready()?[
      {tag: "div", attrs: {}, children: [

        {tag: "hr", attrs: {className:"style3"}}, 
        {tag: "div", attrs: {className:"postWr"}, children: [
          {tag: "div", attrs: {className:"postTitle"}, children: [
            {tag: "h1", attrs: {}, children: [ctrl.article().article.title]}
          ]}, 
          {tag: "hr", attrs: {className:"style3"}}, 
          {tag: "div", attrs: {className:"postInfo cf"}, children: [
            {tag: "div", attrs: {className:"meta-data"}, children: [
              
              {tag: "span", attrs: {className:"upload"}, children: [ctrl.article().article.author]}, 
              {tag: "span", attrs: {className:"category"}, children: [
                          ctrl.article().article.tags.map(function(el){
                              return {tag: "a", attrs: {href:"javascript:void(0)"}, children: ["el"]}
                            })
                          
                      ]}, 
              {tag: "span", attrs: {className:"time"}, children: [moment(ctrl.article().article.time).format('L')]}
            ]}, 
            
            {tag: "div", attrs: {className:"t-left"}, children: [
              {tag: "a", attrs: {href:"#"}, children: [{tag: "img", attrs: {src:"/cover/get/" + ctrl.article().article.cover.id, alt:ctrl.article().article.cover.alt}}]}
            ]}, 
            {tag: "div", attrs: {className:"t-right"}, children: [
              {tag: "div", attrs: {className:"rate-nav"}, children: ["RATING"]}, 
              {tag: "div", attrs: {className:"rate-num"}, children: [ctrl.article().article.nLike]}, 
              {tag: "button", attrs: {className:"rate-button", 
                      onclick:function(el){
                        if(Window.user == undefined){
                          data.showSignin = true;
                        } else {
                          if (!ctrl.voted) {
                            $.ajax({
                              type: "POST",
                              url: "/blog/vote",
                              data: JSON.stringify({
                                "id": ctrl.slug,
                              }),
                              contentType: "application/json",
                              dataType: "text",
                              success: function (res) {
                                ctrl.article().article.nLike += 1;
                                m.redraw();
                              }
                            });
                          }
                          ctrl.voted = true;
                        }
                      }
              }, children: ["+1"]}
            ]}
          ]}, 
          {tag: "hr", attrs: {className:"style3"}}, 
          {tag: "div", attrs: {className:"postContent"}, children: [
            m.trust(marked(ctrl.article().article.body))
          ]}
        ]}
      ]},
      {tag: "hr", attrs: {className:"style3"}},
      Comments(ctrl, ctrl.article(), ctrl.slug, "article")
    
    ]:[
      {tag: "div", attrs: {className:"loading"}, children: [
        {tag: "div", attrs: {class:"loader"}, children: [
          {tag: "div", attrs: {class:"inner one"}}, 
          {tag: "div", attrs: {class:"inner two"}}, 
          {tag: "div", attrs: {class:"inner three"}}
        ]}
      ]}
    ]
    
  ]}
  
};



module.exports = PostView;
},{"../core/_data.msx":11,"../core/_fn.msx":12,"./_comment.msx":3}],3:[function(require,module,exports){
var data = require('../core/_data.msx');
var fn = require('../core/_fn.msx');

var Comments = function(ctrl, content, id, type){
  return [
    {tag: "div", attrs: {id:"comment"}, children: [
      {tag: "h2", attrs: {}, children: ["Bình luận ", (Window.user == undefined)?("(Bạn phải đăng nhập!)"):("")]}, 
      {tag: "hr", attrs: {className:"style1"}}, 
      {tag: "div", attrs: {className:"commentWr"}, children: [
              {tag: "span", attrs: {class:"poster"}, children: [
                {tag: "img", attrs: {src:(data.user != undefined)?(data.user.avatarURL):("/assets/images/silhouette.png"), class:"icon"}}, 
                {tag: "br", attrs: {}}
              ]}, 
        {tag: "div", attrs: {class:"comment commentBox"}, children: [
                {tag: "textarea", attrs: {name:"cmt", id:"cmt", 
                          onclick:function(){
                            if(Window.user == undefined){
                              data.showSignin = true;
                            }
                          }, 
                          onchange:function(el){
                            ctrl.comment($(el.target).val());
                            console.log(ctrl.comment());
                          }
                }, children: [
                  ctrl.comment()
                ]}, 
          (Window.user == undefined)?(
            {tag: "span", attrs: {className:"notUser"}, children: [
            "Chưa đăng nhập"
            ]}
          ):({tag: "span", attrs: {className:"isUser"}, children: [
            Window.user.fullName
          ]}), 
          {tag: "span", attrs: {className:"submit"}, children: [
                  {tag: "a", attrs: {href:"javascript:void(0)", 
                     onclick:function(){
                       $.ajax({
                         type: "POST",
                         url: "/comment/" + id,
                         data: JSON.stringify({
                           "data" : ctrl.comment(),
                           "type" : type
                         }),
                         contentType: "application/json",
                         dataType: "json",
                         success: function(res){
                           content.comments.unshift(res);
                           ctrl.comment('');
                           m.redraw();
                         }
                       });
                     }
                  }, children: [" Gửi "]}
                ]}
        ]}
      ]}, 
    
    
    
      content.comments.map(function(el){
        return {tag: "div", attrs: {className:"commentWr"}, children: [
                {tag: "span", attrs: {class:"poster"}, children: [
                  {tag: "img", attrs: {src:el.user.avatarURL, class:"icon"}}, 
                  {tag: "br", attrs: {}}
                ]}, 
          {tag: "div", attrs: {class:"comment"}, children: [
                  {tag: "span", attrs: {class:"info"}, children: [
                    {tag: "span", attrs: {className:"userName"}, children: [el.user.fullName]}, " Posted July 9th 2016, 01:04 AM", 
                    {tag: "span", attrs: {class:"buttons"}
                      
                    }
                  ]}, 
            el.comment
          ]}
        ]}
      })
  
  
    ]}
  ]
};

module.exports = Comments;
},{"../core/_data.msx":11,"../core/_fn.msx":12}],4:[function(require,module,exports){
var Content = function(ctrl){
  return {tag: "div", attrs: {className:"main cf mh800"}, children: [
    ctrl.request.ready()?[
      {tag: "div", attrs: {className:"sort roundbox", id:"top"}, children: [
        {tag: "form", attrs: {name:"news_set_sort", id:"news_set_sort", method:"post", action:"http://englishtips.org/"}, children: [
          {tag: "span", attrs: {}, children: ["Lọc theo: "]}, 
          {tag: "a", attrs: {href:"javascript:void(0)"}, children: ["Ngày đăng"]}, 
          {tag: "a", attrs: {href:"javascript:void(0)"}, children: ["Rating"]}, 
          {tag: "a", attrs: {href:"javascript:void(0)"}, children: ["Lượt xem"]}, 
          {tag: "a", attrs: {href:"javascript:void(0)"}, children: ["Bình luận"]}
        ]}
      ]},
      {tag: "div", attrs: {class:"navigation", align:"center", style:"margin-bottom:10px; margin-top:10px;"}, children: [
        {tag: "button", attrs: {className:"btn btn-1 btn-1a", 
            onclick:function(){
              ctrl.goPrev(ctrl.page)
            }
        }, children: ["PREV"]}, 
        {tag: "input", attrs: {type:"number", id:"page", value:ctrl.page, style:"width: 50px; text-alige: center"}}, 
        "/ ", Math.ceil(ctrl.posts().total/5), "  ", 
        {tag: "button", attrs: {className:"btn btn-1 btn-1a", 
            onclick:function(){
              ctrl.goToPage($('#page').val())
            }
        }, children: [" Go"]}, 
        {tag: "button", attrs: {className:"btn btn-1 btn-1a", 
            onclick:function(){
              ctrl.goNext(ctrl.page)
            }
        }, children: ["NEXT"]}
      ]},
      {tag: "hr", attrs: {className:"style3", style:"margin-top: 45px;"}},
      ctrl.posts().posts.map(function(el) {
        return {tag: "div", attrs: {className:"block main-item"}, children: [
          {tag: "div", attrs: {className:"title"}, children: [
            {tag: "div", attrs: {className:"t-left"}, children: [
              {tag: "a", attrs: {href:"/post/" + el._id, 
                 className:"title", 
                 config:m.route
              }, children: [el.title]}
            ]}, 
            {tag: "div", attrs: {className:"t-right"}, children: [
              {tag: "div", attrs: {className:"rate-nav"}, children: ["RATING"]}, 
              {tag: "div", attrs: {className:"rate-num"}, children: [el.nLike]}
            ]}
          ]}, 
          {tag: "div", attrs: {className:"meta-data"}, children: [
            {tag: "span", attrs: {className:"upload"}, children: [el.upload]}, 
            {tag: "span", attrs: {className:"category"}, children: [
                      el.categories.map(function (item) {
                        return {tag: "a", attrs: {href:"/category/" + item, 
                                  config:m.route
                        }, children: [{tag: "span", attrs: {}, children: [(Window.categories.getItemByParam({slug: item}) == undefined)?(""):(Window.categories.getItemByParam({slug: item}).name)]}]}
                      })
                      ]}, 
            {tag: "span", attrs: {className:"time"}, children: [moment(el.time).format('L')]}, 
            {tag: "span", attrs: {className:"nComment"}, children: [
                    {tag: "a", attrs: {href:"/post/" + el._id + "#comment", 
                       config:m.route
                    }, children: [el.nComment, " bình luận"]}
                    
                ]}
          ]}, 
          {tag: "div", attrs: {className:"info"}, children: [
            {tag: "a", attrs: {href:"#"}, children: [{tag: "img", attrs: {src:"/cover/get/" + el.cover.id, alt:el.cover.alt}}]}, 
            {tag: "p", attrs: {className:"description"}, children: [
              (window.isMobile) ? el.description.slice(0, 250) : el.description, " ..."
            ]}
          ]}
        ]}
      }),
     
      {tag: "hr", attrs: {className:"style3"}},
      {tag: "div", attrs: {class:"navigation", align:"center", style:"margin-bottom:10px; margin-top:10px;"}, children: [
        {tag: "button", attrs: {className:"btn btn-1 btn-1a", 
          onclick:function(){
            ctrl.goPrev(ctrl.page)
          }
        }, children: ["PREV"]}, 
        {tag: "input", attrs: {type:"number", id:"page", value:ctrl.page, style:"width: 50px; text-alige: center"}}, 
        "/ ", Math.ceil(ctrl.posts().total/5), "  ", 
        {tag: "button", attrs: {className:"btn btn-1 btn-1a", 
            onclick:function(){
              ctrl.goToPage($('#page').val())
            }
        }, children: [" Go"]}, 
        {tag: "button", attrs: {className:"btn btn-1 btn-1a", 
            onclick:function(){
              ctrl.goNext(ctrl.page)
            }
        }, children: ["NEXT"]}
      ]}
    
    ]:[
      {tag: "div", attrs: {className:"loading"}, children: [
        {tag: "div", attrs: {class:"loader"}, children: [
          {tag: "div", attrs: {class:"inner one"}}, 
          {tag: "div", attrs: {class:"inner two"}}, 
          {tag: "div", attrs: {class:"inner three"}}
        ]}
      ]}
    ]
  
  
  ]}
};



module.exports = Content;
},{}],5:[function(require,module,exports){
var data = require('../core/_data.msx');
var fn = require('../core/_fn.msx');

var Footer = function(ctrl){
  return [
    {tag: "div", attrs: {className:"footer"}, children: [
      {tag: "div", attrs: {className:"container"}, children: [
        "©2016 VnDocs.com"
      ]}
    ]}
  ]
};

module.exports = Footer;
},{"../core/_data.msx":11,"../core/_fn.msx":12}],6:[function(require,module,exports){
var data = require('../core/_data.msx');
var fn = require('../core/_fn.msx');

var Head = function(ctrl){
  return [
    {tag: "div", attrs: {className:"container"}, children: [
       {tag: "span", attrs: {className:"menu-icon", 
             onclick:function(elem){
               var el = document.querySelectorAll('.menu')[0];
               var el2 = document.querySelectorAll('.content')[0];
               fn.toggleClass(el, "menu-active");
               fn.toggleClass(el2, "menu-active");
               fn.toggleClass(elem.target, "menu-active");
             }
       }}, 
      {tag: "a", attrs: {href:"/", config:m.route}, children: [
        {tag: "img", attrs: {className:"logo", src:data.logo, alt:"logo Vndocs.com"}}
      ]}, 
      {tag: "span", attrs: {className:"slogan orange", 
        config:function(el, isInited, context){
          if(!isInited){
            setInterval(function(){
              fn.toggleClass(el, 'orange');
            }, 300)
          }
        }
      }, children: ["Nơi chia sẻ tài liệu hoàn toàn miễn phí !"]}, 
      {tag: "div", attrs: {className:"free-logoWr"}, children: [
        {tag: "img", attrs: {className:"free-logo", src:"/assets/images/100_free.png", alt:""}}, 
        {tag: "img", attrs: {className:"lookingfor", src:"/assets/images/lookingfor.png", alt:""}}
      ]}, 
      
      {tag: "div", attrs: {className:"shareWr"}, children: [
        {tag: "img", attrs: {className:"share", src:"/assets/images/sharing-is-caring.png", alt:""}}
      ]}
    ]}
  ]
};

module.exports = Head;
},{"../core/_data.msx":11,"../core/_fn.msx":12}],7:[function(require,module,exports){
var data = require('../core/_data.msx');


var Login = function(ctrl){
  return [
    {tag: "div", attrs: {className:"login-popup", 
         onclick:function(){
           if ($('.wrapper-content:hover').length == 0) {
             data.showSignin = false;
             data.showSignup = false;
           }
         }, 
         style:(!data.showSignin)?"display: none":""}, children: [
      {tag: "div", attrs: {className:"wrapper"}, children: [
        {tag: "div", attrs: {className:"wrapper-content"}, children: [
          {tag: "h3", attrs: {}, children: ["Đăng nhập"]}, 
          {tag: "form", attrs: {action:"/signIn", method:"POST"}, children: [
            {tag: "div", attrs: {}, children: [
              {tag: "div", attrs: {className:"label"}, children: [
                {tag: "label", attrs: {htmlFor:"email"}, children: ["Email : "]}
              ]}, 
              {tag: "input", attrs: {type:"email", className:"user-email", id:"email", name:"email"}}
            ]}, 
            {tag: "div", attrs: {}, children: [
              {tag: "div", attrs: {className:"label"}, children: [
                {tag: "label", attrs: {htmlFor:"password"}, children: ["Password : "]}
              ]}, 
              {tag: "input", attrs: {type:"password", className:"user-password", id:"password", name:"password"}}
            ]}, 
            {tag: "div", attrs: {}, children: [
              {tag: "div", attrs: {className:"label"}, children: [
                {tag: "label", attrs: {htmlFor:"rememberMe"}, children: ["Remember me"]}
              ]}, 
              {tag: "input", attrs: {type:"checkbox", id:"rememberMe", name:"rememberMe", value:"true", checked:"true"}}
            ]}, 
            {tag: "input", attrs: {type:"hidden", name:"csrfToken", value:data.token}}, 
            {tag: "div", attrs: {className:"logout"}, children: [
              {tag: "div", attrs: {className:"label"}
              }, 
              {tag: "input", attrs: {type:"submit", value:"Đăng nhập"}}, 
  
              {tag: "div", attrs: {style:"width: 40px; float: right; margin: 3px 10px 0 0;"}, children: [
                {tag: "a", attrs: {href:"/authenticate/google" + "?forward=" + m.route(), className:"social-button", id:"google-connect"}, children: [" "]}
              ]}, 
              
              {tag: "div", attrs: {style:"width: 40px; float: right; margin: 3px 10px 0 0;"}, children: [
                {tag: "a", attrs: {href:"/authenticate/facebook" + "?forward=" + m.route(), className:"social-button", id:"facebook-connect"}, children: [" "]}
              ]}
              
            ]}
          ]}, 
          {tag: "div", attrs: {className:"label"}}, 
          {tag: "span", attrs: {className:"other"}, children: [
            {tag: "a", attrs: {href:"#", className:"forgot-pass", 
              onclick:function(){
                data.showSignin = false;
                data.showSignup = true;
              }
            }, children: ["Đăng ký"]}, 
            {tag: "a", attrs: {href:"#", className:"forgot-pass"}, children: ["Quên mật khẩu?"]}
          ]}
          
        ]}
      ]}
    ]},
    {tag: "div", attrs: {className:"login-popup", 
         onclick:function(){
           if ($('.wrapper-content:hover').length == 0) {
             data.showSignin = false;
             data.showSignup = false;
           }
         }, 
         style:(!data.showSignup)?"display: none":""}, children: [
      {tag: "div", attrs: {className:"wrapper"}, children: [
        {tag: "div", attrs: {className:"wrapper-content"}, children: [
          {tag: "h3", attrs: {}, children: ["Đăng ký"]}, 
          {tag: "form", attrs: {action:"/signUp", method:"POST"}, children: [
            
            {tag: "input", attrs: {type:"hidden", name:"csrfToken", value:data.token}}, 
              
              {tag: "div", attrs: {className:"form-group  ", id:"firstName_field"}, children: [
                {tag: "div", attrs: {className:"label"}, children: [
                  {tag: "label", attrs: {htmlFor:"firstName"}, children: ["Họ : "]}
                ]}, 
                {tag: "input", attrs: {type:"text", id:"firstName", name:"firstName", required:"true", className:"form-control form-control input-lg", placeholder:"First name"}}
              ]}, 
              
              {tag: "div", attrs: {className:"form-group  ", id:"lastName_field"}, children: [
                {tag: "div", attrs: {className:"label"}, children: [
                  {tag: "label", attrs: {htmlFor:"lastName"}, children: ["Tên : "]}
                ]}, 
                {tag: "input", attrs: {type:"text", id:"lastName", name:"lastName", required:"true", className:"form-control form-control input-lg", placeholder:"Last name"}}
              ]}, 
              
              {tag: "div", attrs: {className:"form-group  ", id:"email_field"}, children: [
                {tag: "div", attrs: {className:"label"}, children: [
                  {tag: "label", attrs: {htmlFor:"email"}, children: ["Email : "]}
                ]}, 
                {tag: "input", attrs: {type:"text", id:"email", name:"email", className:"form-control form-control input-lg", placeholder:"Email"}}
              ]}, 
              
              {tag: "section", attrs: {}, children: [
                {tag: "div", attrs: {className:"form-group  ", id:"password_field"}, children: [
                  {tag: "div", attrs: {className:"label"}, children: [
                    {tag: "label", attrs: {htmlFor:"password"}, children: ["Mật khẩu : "]}
                  ]}, 
                  {tag: "input", attrs: {type:"password", id:"password", name:"password", required:"true", className:"form-control form-control input-lg", placeholder:"Password"}}
                ]}
              ]}, 
      
              {tag: "div", attrs: {className:"form-group"}, children: [
                {tag: "div", attrs: {}, children: [
                  {tag: "div", attrs: {className:"label"}}, 
                  {tag: "button", attrs: {id:"submit", type:"submit", className:"btn btn-lg btn-primary btn-block"}, children: ["Đăng ký"]}, 
                  {tag: "div", attrs: {style:"width: 40px; float: right; margin: 3px 10px 0 0;"}, children: [
                    {tag: "a", attrs: {href:"/authenticate/google" + "?forward=" + m.route(), className:"social-button", id:"google-connect"}, children: [" "]}
                  ]}, 
  
                  {tag: "div", attrs: {style:"width: 40px; float: right; margin: 3px 10px 0 0;"}, children: [
                    {tag: "a", attrs: {href:"/authenticate/facebook" + "?forward=" + m.route(), className:"social-button", id:"facebook-connect"}, children: [" "]}
                  ]}
                ]}
                
              ]}
          ]}, 
          {tag: "div", attrs: {className:"label"}}, 
          {tag: "span", attrs: {className:"other"}, children: [
            {tag: "span", attrs: {}, children: ["Đã có tài khoản? "]}, 
            {tag: "a", attrs: {href:"#", className:"forgot-pass", 
              onclick:function(){
                data.showSignin = true;
                data.showSignup = false;
              }
            }, children: ["Đăng nhập"]}
          ]}
        ]}
      ]}
    ]}
  ]
};

module.exports = Login;
},{"../core/_data.msx":11}],8:[function(require,module,exports){
var fn = require('../core/_fn.msx');
var data = require('../core/_data.msx');

var Menu = function(ctrl){
    return [
        {tag: "div", attrs: {className:"menu"}, children: [
            {tag: "div", attrs: {className:"menubar"}, children: [
                "Tài khoản"
            ]}, 
            {tag: "div", attrs: {className:"login"}, children: [
                (data.user !== undefined)?(
                    {tag: "div", attrs: {className:"userInfo"}, children: [
                        {tag: "div", attrs: {className:"top"}, children: [
                            {tag: "div", attrs: {className:"left"}, children: [
                                {tag: "img", attrs: {src:(data.user.avatarURL.length>0)?(data.user.avatarURL):("/assets/images/silhouette.png"), width:"50", height:"50", alt:"avatar"}}
                            ]}, 
                                {tag: "div", attrs: {className:"right"}, children: [
                                {tag: "div", attrs: {}, children: ["Xin chào"]}, 
                                {tag: "span", attrs: {}, children: [data.user.fullName]}
                            ]}
                        ]}, 
                        {tag: "div", attrs: {className:"bot"}, children: [
                            {tag: "a", attrs: {href:"/signOut?forward=" + m.route()}, children: ["Đăng xuất"]}
                        ]}
                    ]}
                ):(
                    {tag: "div", attrs: {class:"login-box"}, children: [
                        {tag: "div", attrs: {}, children: [{tag: "a", attrs: {href:"#", 
                                onclick:function(){
                                    data.showSignin = true;
                                    data.showSignup = false;
                                }
                        }, children: [{tag: "span", attrs: {}, children: ["Đăng nhập"]}]}, " /", 
                            {tag: "a", attrs: {href:"#", 
                               onclick:function(){
                                   data.showSignin = false;
                                   data.showSignup = true;
                               }
                            }, children: [{tag: "span", attrs: {}, children: [" Đăng ký"]}]}]}, 
                        {tag: "span", attrs: {style:"width: 20px;"}}, 
                        {tag: "a", attrs: {href:"/authenticate/facebook" + "?forward=" + m.route(), class:"social-button", id:"facebook-connect"}, children: [" ", {tag: "span", attrs: {}, children: [" Facebook"]}]}, 
                        {tag: "a", attrs: {href:"/authenticate/google" + "?forward=" + m.route(), class:"social-button", id:"google-connect"}, children: [" ", {tag: "span", attrs: {}, children: [" Google"]}]}
                    ]}
                )
    
            ]}, 
            {tag: "hr", attrs: {className:"style1"}}, 
            {tag: "div", attrs: {className:"menubar"}, children: [
                "Menu"
            ]}, 
            {tag: "div", attrs: {className:"list-menu"}, children: [
                fn.runCreateMenu(JSON.parse(Window.menu), 1)
            ]}
        ]}
    ];
};




module.exports = Menu;
},{"../core/_data.msx":11,"../core/_fn.msx":12}],9:[function(require,module,exports){
var fn = require('../core/_fn.msx');
var data = require('../core/_data.msx');
var Comments = require('./_comment.msx');

var PostView = function(ctrl){
    return {tag: "div", attrs: {className:"main mh800"}, children: [
      ctrl.request.ready()?[
         {tag: "div", attrs: {}, children: [
           {tag: "span", attrs: {className:"breadcrumb"}, children: [
             fn.buildBreadcrumb(Window.urls, Window.categories,ctrl.post().post.categories[0], []), 
             ctrl.post().post.title
           ]}, 
           
           {tag: "br", attrs: {}}, 
           {tag: "hr", attrs: {className:"style3"}}, 
           {tag: "div", attrs: {className:"postWr"}, children: [
             {tag: "div", attrs: {className:"postTitle"}, children: [
               {tag: "h1", attrs: {}, children: [ctrl.post().post.title]}
             ]}, 
             {tag: "hr", attrs: {className:"style3"}}, 
             {tag: "div", attrs: {className:"postInfo cf"}, children: [
               {tag: "div", attrs: {className:"meta-data"}, children: [
        
                 {tag: "span", attrs: {className:"upload"}, children: [ctrl.post().post.upload]}, 
                 {tag: "span", attrs: {className:"category"}, children: [
                     ctrl.post().post.categories.map(function (item) {
                         return {tag: "a", attrs: {href:"/category/" + item, 
                                   config:m.route
                         }, children: [{tag: "span", attrs: {}, children: [(Window.categories.getItemByParam({slug: item}) != undefined)?(Window.categories.getItemByParam({slug: item}).name):("")]}]}
                     })
                      ]}, 
                 {tag: "span", attrs: {className:"time"}, children: [moment(ctrl.post().post.time).format('L')]}
               ]}, 
      
               {tag: "div", attrs: {className:"t-left"}, children: [
                 {tag: "a", attrs: {href:"#"}, children: [{tag: "img", attrs: {src:"/cover/get/" + ctrl.post().post.cover.id, alt:ctrl.post().post.cover.alt}}]}
               ]}, 
               {tag: "div", attrs: {className:"t-right"}, children: [
                 {tag: "div", attrs: {className:"rate-nav"}, children: ["RATING"]}, 
                 {tag: "div", attrs: {className:"rate-num"}, children: [ctrl.post().post.nLike]}, 
                 {tag: "button", attrs: {className:"rate-button", 
                    onclick:function(el){
                        if(Window.user == undefined){
                            data.showSignin = true;
                        } else {
                            if(!ctrl.voted) {
                                $.ajax({
                                    type: "POST",
                                    url: "/post/vote",
                                    data: JSON.stringify({
                                        "id": ctrl.postID,
                                    }),
                                    contentType: "application/json",
                                    dataType: "text",
                                    success: function (res) {
                                        ctrl.post().post.nLike += 1;
                                        m.redraw();
                                    }
                                });
                                ctrl.voted = true;
                            }
                        }
                    }
                 }, children: ["+1"]}
               ]}, 
             {tag: "div", attrs: {className:"t-mid"}, children: [
                 {tag: "div", attrs: {className:"go-download"}, children: [
                     {tag: "a", attrs: {href:"#download"}, children: [{tag: "span", attrs: {}, children: ["Tải ngay"]}]}
                 ]}
             ]}
             ]}, 
             {tag: "hr", attrs: {className:"style3"}}, 
             {tag: "div", attrs: {className:"postContent"}, children: [
               m.trust(marked(ctrl.post().post.content)), 
               
               {tag: "div", attrs: {id:"download", className:"down-box "}, children: [
                   {tag: "h4", attrs: {style:"color: red; font-style: italic; margin-bottom: 5px;"}, children: ["Chọn link phía dưới để tải về!"]}, 
                   {tag: "div", attrs: {className:"inside"}, children: [
                       ctrl.post().post.link.map(function(link){
                          {/*return <span><a href={link.shortUrl}>Download {link.filename}</a></span>*/}
                          return {tag: "span", attrs: {}, children: [{tag: "a", attrs: {
                              href:fn.getShortUrl()  + "vndocs.com/download/" + link.url, target:"_blank"}, children: ["Download ", link.filename]}]}
                       })
                   ]}
               ]}
             ]}
           ]}
         ]},
          {tag: "hr", attrs: {className:"style3"}},
          Comments(ctrl, ctrl.post(), ctrl.postID, "post")
          
      ]:[
          {tag: "div", attrs: {className:"loading"}, children: [
              {tag: "div", attrs: {class:"loader"}, children: [
                  {tag: "div", attrs: {class:"inner one"}}, 
                  {tag: "div", attrs: {class:"inner two"}}, 
                  {tag: "div", attrs: {class:"inner three"}}
              ]}
          ]}
      ]
      
    ]}
      
};



module.exports = PostView;
},{"../core/_data.msx":11,"../core/_fn.msx":12,"./_comment.msx":3}],10:[function(require,module,exports){
var data = require('../core/_data.msx');

var Side = function(ctrl){
    return [{tag: "div", attrs: {className:"side mh1000"}, children: [
        {tag: "div", attrs: {className:"menubar"}, children: [
            "Tìm kiếm"
        ]}, 
        {tag: "div", attrs: {className:"search cf"}, children: [
            {tag: "form", attrs: {class:"search-form"}, children: [
                {tag: "div", attrs: {class:"search-field-container"}, children: [
                    {tag: "input", attrs: {type:"text", class:"search-field", placeholder:"Tìm kiếm..."}}
                ]}
            ]}
        ]}, 
        {tag: "hr", attrs: {className:"style1"}}, 
        {tag: "div", attrs: {className:"menubar"}, children: [
            "Fanpage website"
        ]}, 
        {tag: "div", attrs: {style:"height: 135px; margin-top: 10px;"}, children: [
            {tag: "iframe", attrs: {src:"https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fvndocs&tabs&width=190&height=136&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=695740397243976", width:"190", height:"136", style:"border:none;overflow:hidden", scrolling:"no", frameborder:"0", allowTransparency:"true"}}
        ]}, 
        {tag: "hr", attrs: {className:"style1"}}, 
        {tag: "div", attrs: {className:"menubar"}, children: [
            "Hướng dẫn/Chia sẻ"
        ]}, 
        {tag: "ul", attrs: {className:"side-article"}, children: [
            Window.articles.map(function(el){
                return {tag: "li", attrs: {}, children: [
                    {tag: "span", attrs: {}, children: [
                        {tag: "a", attrs: {href:"/blog/" + el._id, 
                            config:m.route
                        }, children: [
                            el.title
                        ]}
                    ]}
                ]}
            })
        ]}
    ]},
    
    ]
};

module.exports = Side;
},{"../core/_data.msx":11}],11:[function(require,module,exports){
var Data = {};

Data.logo = "/assets/images/logo" + Math.floor(Math.random()*5+1) +".png";
Data.showSignin = false;
Data.showSignup = false;
Data.sessionstorage = mx.storage( 'sessionsstorage' , mx.SESSION_STORAGE );



if(Window.user !== undefined) {
  
  Data.user = Window.user;
  console.log(Data.user)
}

module.exports = Data;
},{}],12:[function(require,module,exports){
var fn ={};


fn.cache = undefined;
fn.url = m.route();



fn.checkMenu = function(link){
    console.log(m.route());
    var partRoute = m.route().split('/');
    var result = true;
    var partLink = link.replace('https://', '').replace('http://', '').split('/');
    if(!(partLink[1] === "c" || partLink[1] === "p")){
        return false;
    }
    for(var i = 2; i < partLink.length; i++){
        if(partLink[i] != partRoute[i]){
            result = false;
        }
    }
    return result;
};

fn.createMenu = function(menuJson, level){
    return m('ul.level' + level, [
        menuJson.map(function(child){
            return m('li',  [
                m('a', {title: child.title, href: child.http, config: m.route} ,m('span', child.title)),
                (level > 1 )?{tag: "sup", attrs: {className:"norm"}, children: ["6431"]}:"",
                (child.children !== undefined)?fn.createMenu(child.children, level + 1):''
            ])
        })
    ])
};

fn.runCreateMenu = function(menuJson, level){

    if(fn.cache !== undefined){
        return fn.cache;
    } else {
        if(menuJson !== undefined) {
            fn.cache = fn.createMenu(menuJson, level);
            return fn.cache;
        }
    }
};


fn.toggleClass =  function(el, className){
    if(el.classList){
        if(el.classList.contains(className)) {
            el.classList.remove(className);
        } else {
            el.classList.add(className);
        }

    } else {
        el.className += ' ' + className;
    }
};

fn.requestWithFeedback = function(args, bind, fn) {
    var data = m.prop();
    var completed = m.prop(false);
    var complete = function() {
        completed(true)
    };
    args.background = true;
    args.config = function(xhr) {
        // xhr.timeout = 4000;
        xhr.timeout = 6000;
        xhr.onTimeout = function() {
            complete();
            m.redraw();
            window.location.reload();
        }
    };
    return {
        request: m.request(args).then(
            function(data) {
                completed(true); return data
            },
            function(err) {
                window.location.reload();
                completed(true); throw err
            })
            .then(function (data) {
                if(bind !== undefined) bind(data);
                if(fn !== undefined) fn();
                m.redraw();
                return data
            }
        ),
        data: data,
        ready: completed
    }
};

fn.buildBreadcrumb = function(urls, category, currentCategory, result){
    if(currentCategory === "NONE") {
        result.push(" » " ,{tag: "a", attrs: {href:"/", config:m.route}, children: ["Trang chủ"]} );
        return result.reverse();
    }
    var jsonCategory = category.getItemByParam({slug: currentCategory});
    result.push(" » " ,{tag: "a", attrs: {href:"/category/" + currentCategory, config:m.route}, children: [" ", jsonCategory.name, " "]});
    return fn.buildBreadcrumb(urls, category, jsonCategory.sku.slug, result);
};

fn.changePageUrl = function(title, pageOld, pageNew, id) {
    if(m.route().indexOf("?p=") >=0){
        var Old = "?p=" + pageOld;
        var New = "?p=" + pageNew;
        var newUrl = m.route().replace(Old, New);
        if (typeof (history.pushState) != "undefined") {
            var obj = { Title: title, Url: newUrl };
            history.pushState(obj, obj.Title, obj.Url);
        } else {
            alert("Browser does not support HTML5.");
        }
    } else {
        if (typeof (history.pushState) != "undefined") {
            var obj = { Title: title, Url:  m.route()+"?p=" + pageNew };
            history.pushState(obj, obj.Title, obj.Url);
        } else {
            alert("Browser does not support HTML5.");
        }
    }
    
    if(id != undefined){
        scroll(id);
    }
};

var shortUrl = [
    "http://ouo.io/s/jkaTd8hX?s=",
    "http://sh.st/st/e789c1b5ebbd52558715462cbeccf4ca/",
    "http://adf.ly/14693643/"
];

fn.getShortUrl = function(){
    return shortUrl[Math.floor(Math.random()*3)]
};

function scroll(element){
    var ele = document.getElementById(element);
    window.scrollTo(ele.offsetLeft,ele.offsetTop);
}

module.exports = fn;
},{}],13:[function(require,module,exports){
"use strict";

window.mobilecheck = function() {
  var check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};

window.isMobile = window.mobilecheck();

m.route.mode = "pathname";

var urlsString = jQuery.trim($('#initdata .durls').text());
var menuString = jQuery.trim($('#initdata .dmenu').text());
var categoriesString = jQuery.trim($('#initdata .dcategories').text());
var postsString = jQuery.trim($('#initdata .dposts').text());
var postString = jQuery.trim($('#initdata .dpost').text());
var commentsString = jQuery.trim($('#initdata .dcomments').text());
var articleString = jQuery.trim($('#initdata .darticle').text());
var articlesString = jQuery.trim($('#initdata .darticles').text());
var totalPostsString = jQuery.trim($('#initdata .dtotalPosts').text());
var userString = jQuery.trim($('#initdata .duser').text());


if(jQuery.trim(urlsString).length > 0) {
  Window.urls = jQuery.parseJSON(urlsString);
}

if(jQuery.trim(menuString).length > 0) {
  Window.menu = jQuery.parseJSON(menuString);
}
if(jQuery.trim(categoriesString).length > 0) {
  Window.categories = jQuery.parseJSON(categoriesString);
}
if(jQuery.trim(postsString).length > 0) {
  Window.posts = jQuery.parseJSON(postsString);
}
if(jQuery.trim(postString).length > 0) {
  Window.post = jQuery.parseJSON(postString);
}
if(jQuery.trim(commentsString).length > 0) {
  Window.comments = jQuery.parseJSON(commentsString);
}
if(jQuery.trim(articleString).length > 0) {
  Window.article = jQuery.parseJSON(articleString);
}
if(jQuery.trim(articlesString).length > 0) {
  Window.articles = jQuery.parseJSON(articlesString);
}
if(jQuery.trim(totalPostsString).length > 0) {
  Window.totalPosts = jQuery.parseJSON(totalPostsString);
}

if(jQuery.trim(userString).length > 0) {
  Window.user = jQuery.parseJSON(userString);
}
if(jQuery.trim(totalPostsString).length > 0) {
  Window.totalPosts = parseInt(totalPostsString);
}

//window.Nav = require('./_nav.msx');
window.Main = require('./_main.msx');
//window.Footer = require('./_footer.msx');



//re-route to dashboard
//m.route("/dashboard"); // logs "unloading home component"








},{"./_main.msx":1}],14:[function(require,module,exports){
var Post = {};
var Menu = require('../component/_menu.msx');
var fn = require('../core/_fn.msx');
var Data = require('../core/_data.msx');
var ArticleView = require('../component/_article.msx');
var Side = require('../component/_side.msx');
var Login = require('../component/_login.msx');
var Head = require('../component/_head.msx');
var Footer = require('../component/_footer.msx');


Post.controller = function(){
  
  if(Window.user == undefined){
    Data.sessionstorage.set( 'url' , m.route() );
  } else {
    Data.sessionstorage.set( 'url' , "/" );
  }
  
  var ctrl = this;
  ctrl.needUser = m.route.param("needUser");
  if(ctrl.needUser != undefined  && Window.user == undefined){
    Data.showSignin = true;
  }
  ctrl.setup = function(){
    m.redraw();
  };
  ctrl.slug =  m.route.param("slug");
  ctrl.request = {};
  ctrl.request.ready = m.prop(false);
  ctrl.article = m.prop({});
  ctrl.comment = m.prop("");
  ctrl.voted = false;
  
  if(Window.article === undefined) {
    console.log("run request !!!!!!!!!!")
    ctrl.request = fn.requestWithFeedback({method: "GET", url: "/blog/get/" + ctrl.slug}, ctrl.article, ctrl.setup);
  } else {
    // ctrl.request.data = m.prop(Window.post);
    ctrl.article().article = Window.article;
    ctrl.article().comments = Window.comments;
    Window.article = undefined;
    Window.comments = undefined;
    ctrl.request.ready = m.prop(true);
    m.redraw();
  };
  ctrl.setup = function(){
    // ctrl.post(ctrl.request.data());
    console.log(ctrl.article());
    m.redraw();
  };
  
};

Post.view = function(ctrl){
  return [
    {tag: "div", attrs: {className:"headWr "}, children: [
      Head(ctrl)
    ]},
    {tag: "div", attrs: {className:"container containerBor"}, children: [
          
      {tag: "div", attrs: {className:"bodyWr"}, children: [
        Menu(ctrl), 
        {tag: "div", attrs: {className:"content "}, children: [
          ArticleView(ctrl), 
          Side(ctrl)
        ]}
      ]}
    
    ]},
    Login(ctrl),
    Footer(ctrl)
  ]
};

module.exports =  Post;
},{"../component/_article.msx":2,"../component/_footer.msx":5,"../component/_head.msx":6,"../component/_login.msx":7,"../component/_menu.msx":8,"../component/_side.msx":10,"../core/_data.msx":11,"../core/_fn.msx":12}],15:[function(require,module,exports){
var Category = {};
var Menu = require('../component/_menu.msx');
var fn = require('../core/_fn.msx');
var Data = require('../core/_data.msx');
var Content = require('../component/_content.msx');
var Side = require('../component/_side.msx');
var Login = require('../component/_login.msx');
var Head = require('../component/_head.msx');
var Footer = require('../component/_footer.msx');


Category.controller = function(){
  if(Window.user == undefined){
    Data.sessionstorage.set( 'url' , m.route() );
  } else {
    Data.sessionstorage.set( 'url' , "/" );
  }
  
  var ctrl = this;
  ctrl.needUser = m.route.param("needUser");
  if(ctrl.needUser != undefined  && Window.user == undefined){
    Data.showSignin = true;
  }
  ctrl.request = {};
  ctrl.request.ready = m.prop(false);
  ctrl.posts = m.prop({});
  ctrl.categorySlug =  m.route.param("categorySlug");
  ctrl.posts().total = 1;
  ctrl.articles = Window.articles;
  ctrl.page = (m.route.param("p") == undefined)?(1):(parseInt(m.route.param("p")));
  
  if(Window.posts === undefined) {
    ctrl.request = fn.requestWithFeedback({method: "GET", url: "/category/" + ctrl.categorySlug + "/" + ctrl.page}, ctrl.posts, ctrl.setup);
  } else {
    ctrl.request.data = m.prop(Window.posts);
    ctrl.posts().posts=ctrl.request.data();
    ctrl.posts().total = Window.totalPosts;
    Window.posts = undefined;
    ctrl.request.ready = m.prop(true);
    m.redraw();
  };
  ctrl.setup = function(){
    m.redraw();
  };
  
  ctrl.goToPage = function(page){
    if(page >= 1 && page <= Math.ceil(ctrl.posts().total/5)) {
      ctrl.request2 = fn.requestWithFeedback({method: "GET", url: "/category/" + ctrl.categorySlug + "/" + page}, ctrl.posts, ctrl.setup);
      fn.changePageUrl("Page " + page, ctrl.page, page, 'top');
      ctrl.page = page;
    }
  };
  ctrl.goPrev = function(page){
    if(page > 1) {
      ctrl.request2 = fn.requestWithFeedback({method: "GET", url: "/category/" + ctrl.categorySlug + "/" + (page-1)}, ctrl.posts, ctrl.setup);
      fn.changePageUrl("Page " + (page-1), page, page-1, 'top');
      ctrl.page = page-1;
    }
  }
  ctrl.goNext = function(page){
    if(page < Math.ceil(ctrl.posts().total/5)) {
      ctrl.request2 = fn.requestWithFeedback({method: "GET", url: "/category/" + ctrl.categorySlug + "/" + (page+1)}, ctrl.posts, ctrl.setup);
      fn.changePageUrl("Page " + (page+1), page, page+1, 'top');
      ctrl.page = page+1;
    }
  }
};

Category.view = function(ctrl){
  return [
    {tag: "div", attrs: {className:"headWr "}, children: [
      Head(ctrl)
    ]},
    {tag: "div", attrs: {className:"container containerBor"}, children: [
           
      {tag: "div", attrs: {className:"bodyWr"}, children: [
        Menu(ctrl), 
        {tag: "div", attrs: {className:"content "}, children: [
          Content(ctrl), 
          Side(ctrl)
        ]}
      ]}
    
    ]},
    Login(ctrl),
    Footer(ctrl)
  ]
};

module.exports =  Category;
},{"../component/_content.msx":4,"../component/_footer.msx":5,"../component/_head.msx":6,"../component/_login.msx":7,"../component/_menu.msx":8,"../component/_side.msx":10,"../core/_data.msx":11,"../core/_fn.msx":12}],16:[function(require,module,exports){
var Home = {};
var Menu = require('../component/_menu.msx');
var fn = require('../core/_fn.msx');
var Data = require('../core/_data.msx');
var Content = require('../component/_content.msx');
var Side = require('../component/_side.msx');
var Login = require('../component/_login.msx');
var Head = require('../component/_head.msx');
var Footer = require('../component/_footer.msx');


Home.controller = function(){
  if(Window.user == undefined){
    Data.sessionstorage.set( 'url' , m.route() );
  } else {
    // if(Data.sessionstorage.get( 'url' ) != undefined && Data.sessionstorage.get( 'url' ) != "/" ){
    if(Data.sessionstorage.get( 'url' ) != undefined && Data.sessionstorage.get( 'url' ) != "/" ){
      m.route(Data.sessionstorage.get( 'url' ))
    }
  }
  
  
  
  var ctrl = this;
  ctrl.needUser = m.route.param("needUser");
  if(ctrl.needUser != undefined && Window.user == undefined){
    Data.showSignin = true;
  }
  ctrl.request = {};
  ctrl.request.ready = m.prop(false);
  ctrl.posts = m.prop({});
  ctrl.posts().total = 1;
  ctrl.articles = Window.articles;
  ctrl.page = (m.route.param("p") == undefined)?(1):(parseInt(m.route.param("p")));
  
  
  if(Window.posts === undefined) {
    ctrl.request = fn.requestWithFeedback({method: "GET", url: "/posts/" + ctrl.page}, ctrl.posts, ctrl.setup);
  } else {
    ctrl.request.data = m.prop(Window.posts);
    ctrl.posts().posts=ctrl.request.data();
    ctrl.posts().total = Window.totalPosts;
    Window.posts = undefined;
    ctrl.request.ready = m.prop(true);
    m.redraw();
  };
  ctrl.setup = function(){
    // ctrl.posts(ctrl.request.data());
    m.redraw();
  };
  
  ctrl.goToPage = function(page){
    if(page >= 1 && page <= Math.ceil(ctrl.posts().total/5)) {
      ctrl.request = fn.requestWithFeedback({method: "GET", url: "/posts/" + page}, ctrl.posts, ctrl.setup);
      fn.changePageUrl("Page " + page, ctrl.page, page, 'top');
      ctrl.page = page;
    }
  };
  ctrl.goPrev = function(page){
    if(page > 1) {
      ctrl.request = fn.requestWithFeedback({method: "GET", url: "/posts/" + (page-1)}, ctrl.posts, ctrl.setup);
      fn.changePageUrl("Page " + (page-1), page, page-1, 'top');
      ctrl.page = page-1;
    }
  }
  ctrl.goNext = function(page){
    if(page < Math.ceil(ctrl.posts().total/5)) {
      ctrl.request = fn.requestWithFeedback({method: "GET", url: "/posts/" + (page+1)}, ctrl.posts, ctrl.setup);
      fn.changePageUrl("Page " + (page+1), page, page+1, 'top');
      ctrl.page = page+1;
    }
  }
};

Home.view = function(ctrl){
  return [
    {tag: "div", attrs: {className:"headWr "}, children: [
      Head(ctrl)
    ]},
    {tag: "div", attrs: {className:"container containerBor"}, children: [
      
      {tag: "div", attrs: {className:"bodyWr"}, children: [
        Menu(ctrl), 
        {tag: "div", attrs: {className:"content "}, children: [
          Content(ctrl), 
          Side(ctrl)
        ]}
      ]}
    ]},
    Login(ctrl),
    Footer(ctrl)
  ]
};

module.exports =  Home;
},{"../component/_content.msx":4,"../component/_footer.msx":5,"../component/_head.msx":6,"../component/_login.msx":7,"../component/_menu.msx":8,"../component/_side.msx":10,"../core/_data.msx":11,"../core/_fn.msx":12}],17:[function(require,module,exports){
var Post = {};
var Menu = require('../component/_menu.msx');
var fn = require('../core/_fn.msx');
var Data = require('../core/_data.msx');
var PostView = require('../component/_post.msx');
var Side = require('../component/_side.msx');
var Login = require('../component/_login.msx');
var Head = require('../component/_head.msx');
var Footer = require('../component/_footer.msx');

Post.controller = function(){
  
  if(Window.user == undefined){
    Data.sessionstorage.set( 'url' , m.route() );
  } else {
    Data.sessionstorage.set( 'url' , "/" );
  }
  
  var ctrl = this;
  ctrl.needUser = m.route.param("needUser");
  if(ctrl.needUser != undefined  && Window.user == undefined){
    Data.showSignin = true;
  }
  ctrl.setup = function(){
    m.redraw();
  };
  ctrl.postID =  m.route.param("postID");
  ctrl.request = {};
  ctrl.request.ready = m.prop(false);
  ctrl.post = m.prop({});
  ctrl.comment = m.prop("");
  ctrl.voted = false;
  
  
  if(Window.post === undefined) {
    console.log("run request !!!!!!!!!!")
    ctrl.request = fn.requestWithFeedback({method: "GET", url: "/post/get/" + ctrl.postID}, ctrl.post, ctrl.setup);
  } else {
    // ctrl.request.data = m.prop(Window.post);
    ctrl.post().post = Window.post;
    ctrl.post().comments = Window.comments;
    Window.post = undefined;
    Window.comments = undefined;
    ctrl.request.ready = m.prop(true);
    m.redraw();
  };
  ctrl.setup = function(){
    // ctrl.post(ctrl.request.data());
    console.log(ctrl.post());
    m.redraw();
  };
};

Post.view = function(ctrl){
  return [
    {tag: "div", attrs: {className:"headWr "}, children: [
      Head(ctrl)
    ]},
    {tag: "div", attrs: {className:"container containerBor"}, children: [
   
      {tag: "div", attrs: {className:"bodyWr"}, children: [
        Menu(ctrl), 
        {tag: "div", attrs: {className:"content "}, children: [
          PostView(ctrl), 
          Side(ctrl)
        ]}
      ]}
    
    ]},
    Login(ctrl),
    Footer(ctrl)
  ]
};

module.exports =  Post;
},{"../component/_footer.msx":5,"../component/_head.msx":6,"../component/_login.msx":7,"../component/_menu.msx":8,"../component/_post.msx":9,"../component/_side.msx":10,"../core/_data.msx":11,"../core/_fn.msx":12}]},{},[13])
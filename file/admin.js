(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,(function(e){var n=t[o][1][e];return s(n?n:e)}),f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

var Main = Main || {};

Main.Home = require('./main/home.msx');
Main.NewProduct = require('./main/newproduct.msx');
Main.Product = require('./main/product.msx');
Main.Article = require('./main/article.msx');
Main.NewArticle = require('./main/newarticle.msx');
Main.NewCategory = require('./main/newcategory.msx');
Main.SetupCategoryController = require('./main/setup_category_controller.msx');
Main.IndexController = require('./main/buildindex.msx');
//Main.Dashboard = require('./main/_dashboard.msx');
// Main.Product = require('./main/_product.msx');
// Main.Category = require('./main/_category.msx');
// Main.Search = require('./main/_search.msx');


m.route(document.querySelector('#app'), "/", {
  "/": Main.Product,
  "/product/list": Main.Product,
  "/product/:status": Main.NewProduct,
  "/article/list": Main.Article,
  "/article/:status": Main.NewArticle,
  "/category/create": Main.NewCategory,
  "/setup/category": Main.SetupCategoryController,
  "/setup/nav": Main.SetupCategoryController,
  "/productShow": Main.IndexController
});

// m.route('/menu');


module.exports = Main;
},{"./main/article.msx":14,"./main/buildindex.msx":15,"./main/home.msx":17,"./main/newarticle.msx":18,"./main/newcategory.msx":19,"./main/newproduct.msx":20,"./main/product.msx":21,"./main/setup_category_controller.msx":22}],2:[function(require,module,exports){
"use strict";

window.token = $(document.getElementsByName("csrfToken")).val();
// alert($(token).val());
$(document).ajaxSend((function(elm, xhr, s){
  if (s.type == "POST") {
    xhr.setRequestHeader('Csrf-Token', window.token);
  }
}));

window.mobilecheck = function() {
  var check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};



window.isMobile = window.mobilecheck();


m.route.mode = "search";

//window.Nav = require('./_nav.msx');
window.Main = require('./_main.msx');
//window.Footer = require('./_footer.msx');







},{"./_main.msx":1}],3:[function(require,module,exports){
var fn = require('./fn.msx');

var input = m.prop("");
var data = m.prop({
  "_id" : "",
  "name": "",
  "category": "none",
  "extra": "normal",
  "price": 0,
  "available": true,
  "guarantee": 12,
  "image" : [
  ],
  "info": ""
});

var NewProduct = function(ctrl){
  return [
    {tag: "hr", attrs: {className:"ruler-xxl"}},
    {tag: "div", attrs: {className:"content"}, children: [
      {tag: "section", attrs: {}, children: [
        {tag: "div", attrs: {className:"section-body"}, children: [
          {tag: "div", attrs: {className:"card"}, children: [
            {tag: "div", attrs: {className:"card-body"}, children: [
              
              {tag: "nav", attrs: {"aria-label":"Page navigation"}, children: [
                {tag: "ul", attrs: {class:"pagination"}, children: [
                  {tag: "li", attrs: {}, children: [
                    {tag: "a", attrs: {href:"javascript:void(0)", "aria-label":"Previous", 
                       onclick:function(){
                         if(ctrl.page >1) {
                           ctrl.request = fn.requestWithFeedback({
                             method: "GET",
                             url: "/product/list/" + (ctrl.page - 1)
                           }, ctrl.productsTmp, ctrl.setupPrev);
                         }
                       }
                    }, children: [
                      {tag: "span", attrs: {"aria-hidden":"true"
                      }, children: ["«"]}
                    ]}
                  ]}, 
                  {tag: "li", attrs: {}, children: [{tag: "a", attrs: {href:"javascript:void(0)"}, children: [ctrl.page]}]}, 
                  {tag: "li", attrs: {}, children: [
                    {tag: "a", attrs: {href:"javascript:void(0)", "aria-label":"Next", 
                       onclick:function(){
                         ctrl.request = fn.requestWithFeedback({
                           method: "GET",
                           url: "/product/list/" + (ctrl.page + 1)
                         }, ctrl.productsTmp, ctrl.setupNext);
                       }
                    }, children: [
                      {tag: "span", attrs: {"aria-hidden":"true"}, children: ["»"]}
                    ]}
                  ]}, 
                  {tag: "li", attrs: {}, children: [
                    {tag: "div", attrs: {class:"input-group"}, children: [
                      {tag: "span", attrs: {class:"input-group-addon", id:"basic-addon1"}, children: [" Tìm kiếm: "]}, 
                      {tag: "input", attrs: {type:"text", class:"form-control", placeholder:"Tên sản phẩm", "aria-describedby":"basic-addon1"}}
                    ]}
                  ]}
                ]}
              
              ]}, 
              
              {tag: "div", attrs: {class:"table-responsive"}, children: [
                {tag: "table", attrs: {class:"table no-margin"}, children: [
                  {tag: "thead", attrs: {}, children: [
                  {tag: "tr", attrs: {}, children: [
                    {tag: "th", attrs: {}, children: ["Tên bài viết"]}, 
                    {tag: "th", attrs: {}}
                  ]}
                  ]}, 
                  {tag: "tbody", attrs: {}, children: [
                  ctrl.products().map((function(el){
                    return [{tag: "tr", attrs: {}, children: [
                      {tag: "td", attrs: {}, children: [el.title]}, 
                      {tag: "td", attrs: {}, children: [
                        {tag: "span", attrs: {style:"cursor: pointer", 
                              onclick:function(){
                                $.ajax({
                                  type: "POST",
                                  url: "/article/delete/" + el._id,
                                  data: JSON.stringify({}),
                                  contentType: "application/json",
                                  dataType: "text"
                                }).done((function() {
                                  alert("Xóa thành công")
                                  location.reload();
                                }))
                                    .fail((function() {
                                      alert( "error" );
                                    }));
                              }
                        }, children: [" Xóa "]}, " |", 
                        {tag: "span", attrs: {style:"cursor: pointer", 
                              onclick:function(){
                                m.route("/article/edit?article=" + el._id)
                              }
                        }, children: [" Sửa "]}
                      ]}
                    ]}
                    ]
                  }))
                  
                  
                  ]}
                ]}
              ]}
            ]}
          ]}
        ]}
      ]}
    ]}
  ]
};


module.exports = NewProduct;
},{"./fn.msx":16}],4:[function(require,module,exports){
var Content = function(ctrl){
  return [
    {tag: "hr", attrs: {className:"ruler-xxl"}},
    {tag: "div", attrs: {className:"content"}, children: [
        {tag: "section", attrs: {}, children: [
          {tag: "div", attrs: {className:"section-body"}, children: [
            {tag: "div", attrs: {className:"row"}, children: [
      
              {tag: "div", attrs: {className:"col-md-3 col-sm-6"}, children: [
                {tag: "div", attrs: {className:"card"}, children: [
                  {tag: "div", attrs: {className:"card-body no-padding"}, children: [
                    {tag: "div", attrs: {className:"alert alert-callout alert-info no-margin"}, children: [
                      {tag: "strong", attrs: {className:"pull-right text-success text-lg"}, children: ["0,38% ", {tag: "i", attrs: {className:"md md-trending-up"}}]}, 
                      {tag: "strong", attrs: {className:"text-xl"}, children: ["$ 32,829"]}, {tag: "br", attrs: {}}, 
                      {tag: "span", attrs: {className:"opacity-50"}, children: ["Revenue"]}, 
                      {tag: "div", attrs: {className:"stick-bottom-left-right"}, children: [
                        {tag: "div", attrs: {className:"height-2 sparkline-revenue", "data-line-color":"#bdc1c1"}}
                      ]}
                    ]}
                  ]}
                ]}
              ]}, 
              {tag: "div", attrs: {className:"col-md-3 col-sm-6"}, children: [
                {tag: "div", attrs: {className:"card"}, children: [
                  {tag: "div", attrs: {className:"card-body no-padding"}, children: [
                    {tag: "div", attrs: {className:"alert alert-callout alert-warning no-margin"}, children: [
                      {tag: "strong", attrs: {className:"pull-right text-warning text-lg"}, children: ["0,01% ", {tag: "i", attrs: {className:"md md-swap-vert"}}]}, 
                      {tag: "strong", attrs: {className:"text-xl"}, children: ["432,901"]}, {tag: "br", attrs: {}}, 
                      {tag: "span", attrs: {className:"opacity-50"}, children: ["Visits"]}, 
                      {tag: "div", attrs: {className:"stick-bottom-right"}, children: [
                        {tag: "div", attrs: {className:"height-1 sparkline-visits", "data-bar-color":"#e5e6e6"}}
                      ]}
                    ]}
                  ]}
                ]}
              ]}, 
              {tag: "div", attrs: {className:"col-md-3 col-sm-6"}, children: [
                {tag: "div", attrs: {className:"card"}, children: [
                  {tag: "div", attrs: {className:"card-body no-padding"}, children: [
                    {tag: "div", attrs: {className:"alert alert-callout alert-danger no-margin"}, children: [
                      {tag: "strong", attrs: {className:"pull-right text-danger text-lg"}, children: ["0,18% ", {tag: "i", attrs: {className:"md md-trending-down"}}]}, 
                      {tag: "strong", attrs: {className:"text-xl"}, children: ["42.90%"]}, {tag: "br", attrs: {}}, 
                      {tag: "span", attrs: {className:"opacity-50"}, children: ["Bounce rate"]}, 
                      {tag: "div", attrs: {className:"stick-bottom-left-right"}, children: [
                        {tag: "div", attrs: {className:"progress progress-hairline no-margin"}, children: [
                          {tag: "div", attrs: {className:"progress-bar progress-bar-danger", style:"width:43%"}}
                        ]}
                      ]}
                    ]}
                  ]}
                ]}
              ]}, 
              {tag: "div", attrs: {className:"col-md-3 col-sm-6"}, children: [
                {tag: "div", attrs: {className:"card"}, children: [
                  {tag: "div", attrs: {className:"card-body no-padding"}, children: [
                    {tag: "div", attrs: {className:"alert alert-callout alert-success no-margin"}, children: [
                      {tag: "h1", attrs: {className:"pull-right text-success"}, children: [{tag: "i", attrs: {className:"md md-timer"}}]}, 
                      {tag: "strong", attrs: {className:"text-xl"}, children: ["54 sec."]}, {tag: "br", attrs: {}}, 
                      {tag: "span", attrs: {className:"opacity-50"}, children: ["Avg. time on site"]}
                    ]}
                  ]}
                ]}
              ]}
            ]}
  
          ]}
        ]}
      ]}
  ]
}

module.exports = Content;
},{}],5:[function(require,module,exports){
var fn = require('./fn.msx');

var input = m.prop("");

var data = m.prop({
  "slug": "",
  "name" : "",
  "description": "",
  "sku": {
    "parent_id" : "NONE",
    "name" : "NONE",
    "slug" : "NONE"
  }
});


var CreateMenu = function(ctrl){
  return [
    {tag: "hr", attrs: {className:"ruler-xxl"}},
    {tag: "div", attrs: {className:"content"}, children: [
      {tag: "section", attrs: {}, children: [
        {tag: "div", attrs: {className:"section-body"}, children: [
          {tag: "div", attrs: {className:"card"}, children: [
            {tag: "div", attrs: {className:"card-body"}, children: [
              {tag: "div", attrs: {class:"row"
              }, children: [
                {tag: "div", attrs: {class:"box box-primary"}, children: [
                  {tag: "div", attrs: {class:"box-body"}, children: [
                    {tag: "div", attrs: {class:"dd", id:"domenu-0"}, children: [
                      {tag: "button", attrs: {class:"dd-new-item"}, children: ["+"]}, 
                      {tag: "li", attrs: {class:"dd-item-blueprint"}, children: [
                        {tag: "button", attrs: {class:"collapse", "data-action":"collapse", type:"button", style:"display: none;"}, children: ["–"]}, 
                        {tag: "button", attrs: {class:"expand", "data-action":"expand", type:"button", style:"display: none;"}, children: ["+"]}, 
                        {tag: "div", attrs: {class:"dd-handle dd3-handle"}, children: ["Drag"]}, 
                        {tag: "div", attrs: {class:"dd3-content"}, children: [
                          {tag: "span", attrs: {class:"item-name"}, children: ["[item_name]"]}, 
                          {tag: "div", attrs: {class:"dd-button-container"}, children: [
                            {tag: "button", attrs: {class:"item-add"}, children: ["+"]}, 
                            {tag: "button", attrs: {class:"item-remove", "data-confirm-class":"item-remove-confirm"}, children: ["×"]}
                          ]}, 
                          
                          {tag: "div", attrs: {class:"dd-edit-box", style:"display: none;"}, children: [
                            {tag: "input", attrs: {type:"text", name:"title", autocomplete:"off", placeholder:"Item", 
                                   "data-placeholder":"title?", 
                                   "data-default-value":"name {?numeric.increment}"}}, 
                            {tag: "input", attrs: {type:"text", name:"http", id:"http", autocomplete:"off", placeholder:"link"}}, 
                              {tag: "i", attrs: {class:"end-edit"}, children: ["save"]}
                          ]}
                        ]}
                      ]}, 
                      {tag: "ol", attrs: {class:"dd-list"}}
                    ]}, 
  
                    {tag: "br", attrs: {}}, 
                    {tag: "button", attrs: {id:"update", 
                      onclick:function(el){
                        console.log(" Zzzzzzzzzzzzzz ")
                        $(document).on('click', '#update', (function(){
                          var request = $.ajax({
                            type: "POST",
                            url: "/setup/" + ctrl.setupID,
                            data: ctrl.domenu.toJson(),
                            contentType: "application/json; charset=utf-8",
                            dataType: "text"
                          });
                          request.done((function( msg ) {
                          })).then((function(){
                          }));
                          request.fail((function( jqXHR, textStatus ) {
                            alert( "Request failed: " + textStatus );
                          }));
                        }));
                        {/*console.log(ctrl.domenu.toJson());*/}
                      }
                          
                    }, children: ["Update"]}, 
                    {tag: "button", attrs: {id:"preview", 
                            onclick:function(){
                              console.log("click")
                            }
                    }, children: ["PreView"]}
                  ]}
                ]}, 
    
                {tag: "div", attrs: {id:"view"}}
              ]}
            ]}
          ]}, 
          
          {tag: "div", attrs: {className:"row"}
          
          }, 
          
          {tag: "div", attrs: {className:"offcanvas"}, children: [
            {tag: "div", attrs: {id:"offcanvas-demo-size4", className:"offcanvas-pane width-12 " + (ctrl.showImgList?"active":""), style:"width: 800px; " + (ctrl.showImgList?"transform: translate(-800px, 0px)":(""))}, children: [
              {tag: "div", attrs: {className:"offcanvas-head"}, children: [
                {tag: "header", attrs: {}, children: ["Images controller "]}, 
                {tag: "div", attrs: {className:"offcanvas-tools"}, children: [
                  {tag: "a", attrs: {className:"btn btn-icon-toggle btn-default-light pull-right", "data-dismiss":"offcanvas", 
                     onclick:function(){
                       {/*ctrl.showImgList = false;*/}
                     }
                  }, children: [
                    {tag: "i", attrs: {className:"md md-close"}}
                  ]}
                ]}
              ]}, 
              {tag: "div", attrs: {className:"nano has-scrollbar", style:"height: 90vh;"}, children: [
                {tag: "div", attrs: {className:"nano-content", tabindex:"0", style:"right: -15px;"}, children: [
                  {tag: "div", attrs: {className:"offcanvas-body"}, children: [
                    {tag: "div", attrs: {className:"card-body"}, children: [
                      "test"
                    ]}
                  
                  
                  ]}
                ]}
              ]}
            ]}
          ]}
        
        
        ]}
      ]}
    ]},
    ctrl.showImgList?({tag: "div", attrs: {className:"backdrop", 
                           onclick:function(){
                             ctrl.showImgList = false;
                           }
    }}):""
  ]
};



module.exports = CreateMenu;
},{"./fn.msx":16}],6:[function(require,module,exports){


var Header = function(ctrl){
  return [
  {tag: "header", attrs: {id:"header"}, children: [
    {tag: "div", attrs: {className:"headerbar"}, children: [
      
      {tag: "div", attrs: {className:"headerbar-left"}, children: [
        {tag: "ul", attrs: {className:"header-nav header-nav-options"}, children: [
          {tag: "li", attrs: {className:"header-nav-brand"}, children: [
            {tag: "div", attrs: {className:"brand-holder"}, children: [
              {tag: "a", attrs: {href:"javascript:void(0)"}, children: [
                {tag: "span", attrs: {className:"text-lg text-bold text-primary"}, children: ["MATERIAL ADMIN"]}
              ]}
            ]}
          ]}, 
          {tag: "li", attrs: {}, children: [
            {tag: "a", attrs: {className:"btn btn-icon-toggle menubar-toggle", "data-toggle":"menubar", href:"javascript:void(0);"}, children: [
              {tag: "i", attrs: {className:"fa fa-bars"}}
            ]}
          ]}
        ]}
      ]}, 
      {tag: "div", attrs: {className:"headerbar-right", style:"margin-top: 15px; margin-right: 15px; border: 1px solid #ddd; border-radius: 5px; padding: 5px;"}, children: [
        {tag: "a", attrs: {href:"/signOut"}, children: ["Logout"]}
      ]}, 
      {tag: "div", attrs: {className:"headerbar-right", style:"margin-top: 15px; margin-right: 15px; border: 1px solid #ddd; border-radius: 5px; padding: 5px;"}, children: [
        {tag: "a", attrs: {href:"/signUp"}, children: ["Thêm tài khoản"]}
      ]}
      /*<div className="headerbar-right">*/
        /*<div className="header-nav header-nav-options">*/
          /*<li>*/
            /*<form className="navbar-search" role="search">*/
              /*<div className="form-group">*/
                /*<input type="text" className="form-control" name="headerSearch" placeholder="Enter your keyword"/>*/
              /*</div>*/
              /*<button type="submit" className="btn btn-icon-toggle ink-reaction"><i className="fa fa-search"></i></button>*/
            /*</form>*/
          /*</li>*/
          /*<li className="dropdown hidden-xs">*/
            /*<a href="javascript:void(0);" className="btn btn-icon-toggle btn-default" data-toggle="dropdown">*/
              /*<i className="fa fa-bell"></i><sup className="badge style-danger">4</sup>*/
            /*</a>*/
            /*<ul className="dropdown-menu animation-expand">*/
              /*<li className="dropdown-header">Today's messages</li>*/
              /*<li>*/
                /*<a className="alert alert-callout alert-warning" href="javascript:void(0);">*/
                  /*<img className="pull-right img-circle dropdown-avatar" src="/assets/admin/img/avatar2.jpg?1404026449" alt="" />*/
                  /*<strong>Alex Anistor</strong><br/>*/
                  /*<small>Testing functionality...</small>*/
                /*</a>*/
              /*</li>*/
              /*<li>*/
                /*<a className="alert alert-callout alert-info" href="javascript:void(0);">*/
                  /*<img className="pull-right img-circle dropdown-avatar" src="/assets/admin/img/avatar3.jpg?1404026799" alt="" />*/
                  /*<strong>Alicia Adell</strong><br/>*/
                  /*<small>Reviewing last changes...</small>*/
                /*</a>*/
              /*</li>*/
              /*<li className="dropdown-header">Options</li>*/
              /*<li><a href="../../html/pages/login.html">View all messages <span className="pull-right"><i className="fa fa-arrow-right"></i></span></a></li>*/
              /*<li><a href="../../html/pages/login.html">Mark as read <span className="pull-right"><i className="fa fa-arrow-right"></i></span></a></li>*/
            /*</ul>*/
          /*</li>*/
          /*<li className="dropdown hidden-xs">*/
            /*<a href="javascript:void(0);" className="btn btn-icon-toggle btn-default" data-toggle="dropdown">*/
              /*<i className="fa fa-area-chart"></i>*/
            /*</a>*/
            /*<ul className="dropdown-menu animation-expand">*/
              /*<li className="dropdown-header">Server load</li>*/
              /*<li className="dropdown-progress">*/
                /*<a href="javascript:void(0);">*/
                  /*<div className="dropdown-label">*/
                    /*<span className="text-light">Server load <strong>Today</strong></span>*/
                    /*<strong className="pull-right">93%</strong>*/
                  /*</div>*/
                  /*<div className="progress"><div className="progress-bar progress-bar-danger" style="width: 93%"></div></div>*/
                /*</a>*/
              /*</li>*/
              /*<li className="dropdown-progress">*/
                /*<a href="javascript:void(0);">*/
                  /*<div className="dropdown-label">*/
                    /*<span className="text-light">Server load <strong>Yesterday</strong></span>*/
                    /*<strong className="pull-right">30%</strong>*/
                  /*</div>*/
                  /*<div className="progress"><div className="progress-bar progress-bar-success" style="width: 30%"></div></div>*/
                /*</a>*/
              /*</li>*/
              /*<li className="dropdown-progress">*/
                /*<a href="javascript:void(0);">*/
                  /*<div className="dropdown-label">*/
                    /*<span className="text-light">Server load <strong>Lastweek</strong></span>*/
                    /*<strong className="pull-right">74%</strong>*/
                  /*</div>*/
                  /*<div className="progress"><div className="progress-bar progress-bar-warning" style="width: 74%"></div></div>*/
                /*</a>*/
              /*</li>*/
            /*</ul>*/
          /*</li>*/
        /*</div>*/
        /**/
        /**/
        /*<ul className="header-nav header-nav-profile">*/
          /*<li className="dropdown">*/
            /*<a href="javascript:void(0);" className="dropdown-toggle ink-reaction" data-toggle="dropdown">*/
              /*<img src="/assets/admin/img/avatar1.jpg?1403934956" alt="" />*/
              /*<span className="profile-info">*/
                  /*Daniel Johnson*/
                  /*<small>Administrator</small>*/
                /*</span>*/
            /*</a>*/
            /*<ul className="dropdown-menu animation-dock">*/
              /*<li className="dropdown-header">Config</li>*/
              /*<li><a href="../../html/pages/profile.html">My profile</a></li>*/
              /*<li><a href="../../html/pages/blog/post.html">My blog <span className="badge style-danger pull-right">16</span></a></li>*/
              /*<li><a href="../../html/pages/calendar.html">My appointments</a></li>*/
              /*<li className="divider"></li>*/
              /*<li><a href="../../html/pages/locked.html"><i className="fa fa-fw fa-lock"></i> Lock</a></li>*/
              /*<li><a href="../../html/pages/login.html"><i className="fa fa-fw fa-power-off text-danger"></i> Logout</a></li>*/
            /*</ul>*/
          /*</li>*/
        /*</ul>*/
      
      
        /*<ul className="header-nav header-nav-toggle">*/
          /*<li>*/
            /*<a className="btn btn-icon-toggle btn-default" href="#offcanvas-search" data-toggle="offcanvas" data-backdrop="false">*/
              /*<i className="fa fa-ellipsis-v"></i>*/
            /*</a>*/
          /*</li>*/
        /*</ul>*/
      /*</div>*/
      
    ]}
  ]}
  ]
} ;

module.exports = Header;
},{}],7:[function(require,module,exports){
var fn = require('./fn.msx');

var input = m.prop("");
var input2 = m.prop("");
var data = m.prop({
  "_id" : "",
  "title": "",
  "body": "",
  "tags": ["huong-dan"],
  "cover": {
    "id" : "ec97531f-6aa0-4374-87d4-77b6a030a854",
    "alt" : "anh dai dien"
  }
});

var IndexBuilder = function(ctrl){
  return [
    {tag: "hr", attrs: {className:"ruler-xxl"}},
    {tag: "div", attrs: {className:"content"}, children: [
      {tag: "section", attrs: {}, children: [
        {tag: "div", attrs: {className:"section-body"}, children: [
          {tag: "div", attrs: {className:"card"}, children: [
            {tag: "div", attrs: {className:"card-body"}, children: [
                {tag: "button", attrs: {type:"button", className:"btn ink-reaction btn-raised btn-primary", style:"float: right", 
                        onclick:function(){
                          $.ajax({
                            type: "POST",
                            url: "/indexbuild",
                            data: JSON.stringify(ctrl.items.colors()),
                            contentType: "application/json",
                            dataType: "json",
                            success: function(data){
                            }
                          });
                        }
                }, children: ["Publish"]}, 
                {tag: "button", attrs: {type:"button", className:"btn ink-reaction btn-raised", style:"float: right; margin-right: 20px;"}, children: ["Save"]}, 
                {tag: "br", attrs: {}}, 
                {tag: "br", attrs: {}}
            ]}
          ]}, 
          
          {tag: "div", attrs: {className:"row"}, children: [
            {tag: "div", attrs: {className:"col-md-6"}, children: [
              {tag: "div", attrs: {className:"card"}, children: [
                {tag: "div", attrs: {className:"card-body"}, children: [
                  {tag: "input", attrs: {type:"text", value:input(), 
                     onchange: m.withAttr("value", input)}
                  }, 
                  {tag: "input", attrs: {type:"button", value:"Thêm mới", 
                    onclick:function(){
                      ctrl.items.colors().push({"name": input(), listID: []});
                      input("")
                    }}
                  }, 
                  {tag: "div", attrs: {className:"drag-n-drop clearfix"}, children: [
                    {tag: "ol", attrs: {}, children: [
                      ctrl.items.colors().map((function(item, i) {
                        var dragging = (i == ctrl.items.dragging()) ? 'dragging' : '';
                        return m('li.clearfix' + ((ctrl.listProduct.name()==item.name)?".active":""), {
                          'data-id': i,
                          class: dragging,
                          draggable: 'true',
                          ondragstart: ctrl.dragStart.bind(ctrl),
                          ondragover: ctrl.dragOver.bind(ctrl),
                          ondragend: ctrl.dragEnd.bind(ctrl)
                        }, [ {tag: "span", attrs: {className:"name"}, children: [item.name]},
                          {tag: "span", attrs: {className:"edit pull-right", 
                            onclick:function(){
                              ctrl.listProduct.product(item.listID)
                              ctrl.listProduct.name(item.name)
                            }
                          }, children: ["Sửa"]},
                          {tag: "span", attrs: {className:"delete pull-right", 
                            onclick:function(){
                              var r = confirm("Xác nhận xóa");
                              if (r == true) {
                                ctrl.items.colors().splice(i ,1)
                              }
                            }
                          }, children: ["Xóa"]}
                        ])
                      }))
                      
                      /*<pre>*/
                        /*App State: {[JSON.stringify(ctrl.items,0,2)]}*/
                      /*</pre>*/
                    ]}
                  ]}
                ]}
              ]}
              
            ]}, 
  
  
            {tag: "div", attrs: {className:"col-md-6"}, children: [
              {tag: "div", attrs: {className:"card"}, children: [
                {tag: "div", attrs: {className:"card-body"}, children: [
                  {tag: "div", attrs: {className:"drag-n-drop"}, children: [
  
                    {tag: "div", attrs: {className:"clearfix"}, children: [
                      (ctrl.listProduct.name().length > 0)?[
                        {tag: "button", attrs: {type:"button", className:"btn pull-right", "data-toggle":"modal", "data-target":"#product", 
                                onclick:function(){
                                  ctrl.productList = fn.requestWithFeedback({method: "GET", url: "/product/list/" + ctrl.page}, ctrl.products, ctrl.setupProduct);
                                }
                        }, children: ["Thêm mới"]}
                      ]:("")
                    ]}, 
                    
                    {tag: "ol", attrs: {}, children: [
                      ctrl.listProduct.product().map((function(item, i) {
                        var dragging = (i == ctrl.listProduct.dragging()) ? 'dragging' : '';
                        return m('li', {
                          'data-id': i,
                          class: dragging,
                          draggable: 'true',
                          ondragstart: ctrl.dragStart2.bind(ctrl),
                          ondragover: ctrl.dragOver2.bind(ctrl),
                          ondragend: ctrl.dragEnd2.bind(ctrl)
                        }, [ item,
                          {tag: "span", attrs: {className:"delete pull-right", 
                               onclick:function(){
                                 var r = confirm("Xác nhận xóa");
                                 if (r == true) {
                                   ctrl.listProduct.product().splice(i ,1)
                                 }
                               }
                          }, children: ["Xóa"]}
                        ])
                      }))
                      
                      /*<pre>*/
                      /*App State: {[JSON.stringify(ctrl.items,0,2)]}*/
                      /*</pre>*/
                    ]}
                  ]}
                ]}
              ]}
  
            ]}
            
          ]}
          
        ]}, 
  
        {tag: "div", attrs: {id:"product", className:"modal fade", role:"dialog"}, children: [
          {tag: "div", attrs: {className:"modal-dialog uploadImage"}, children: [
            {tag: "div", attrs: {className:"modal-content "}, children: [
              {tag: "div", attrs: {className:"modal-header"}, children: [
                {tag: "button", attrs: {type:"button", className:"close", "data-dismiss":"modal"}, children: ["×"]}, 
                {tag: "h4", attrs: {className:"modal-title"}, children: ["Chọn sản phẩm"]}
              ]}, 
              {tag: "div", attrs: {className:"modal-body"}, children: [
                {tag: "nav", attrs: {"aria-label":"Page navigation"}, children: [
                  {tag: "ul", attrs: {class:"pagination"}, children: [
                    {tag: "li", attrs: {}, children: [
                      {tag: "a", attrs: {href:"javascript:void(0)", "aria-label":"Previous", 
                         onclick:function(){
                           if(ctrl.page >1) {
                             ctrl.request = fn.requestWithFeedback({
                               method: "GET",
                               url: "/product/list/" + (ctrl.page - 1)
                             }, ctrl.productsTmp, ctrl.setupPrev);
                           }
                         }
                      }, children: [
                      {tag: "span", attrs: {"aria-hidden":"true"
                      }, children: ["«"]}
                      ]}
                    ]}, 
                    {tag: "li", attrs: {}, children: [{tag: "a", attrs: {href:"javascript:void(0)"}, children: [ctrl.page]}]}, 
                    {tag: "li", attrs: {}, children: [
                      {tag: "a", attrs: {href:"javascript:void(0)", "aria-label":"Next", 
                         onclick:function(){
                           ctrl.request = fn.requestWithFeedback({
                             method: "GET",
                             url: "/product/list/" + (ctrl.page + 1)
                           }, ctrl.productsTmp, ctrl.setupNext);
                         }
                      }, children: [
                        {tag: "span", attrs: {"aria-hidden":"true"}, children: ["»"]}
                      ]}
                    ]}, 
                    {tag: "li", attrs: {}, children: [
                      {tag: "div", attrs: {class:"input-group"}, children: [
                        {tag: "span", attrs: {class:"input-group-addon", id:"basic-addon1"}, children: [" Tìm kiếm: "]}, 
                        {tag: "input", attrs: {type:"text", class:"form-control", placeholder:"Tên sản phẩm", "aria-describedby":"basic-addon1"}}
                      ]}
                    ]}
                  ]}
  
                ]}, 
                
                {tag: "div", attrs: {class:"table-responsive"}, children: [
                  {tag: "table", attrs: {class:"table no-margin"}, children: [
                    {tag: "thead", attrs: {}, children: [
                    {tag: "tr", attrs: {}, children: [
                      {tag: "th", attrs: {}, children: ["Tên laptop"]}, 
                      {tag: "th", attrs: {}, children: ["Giá"]}, 
                      {tag: "th", attrs: {}, children: ["Bảo hành"]}, 
                      {tag: "th", attrs: {}, children: ["Tình trạng"]}, 
                      {tag: "th", attrs: {}, children: ["Thuộc loại"]}, 
                      {tag: "th", attrs: {}}
                    ]}
                    ]}, 
                    {tag: "tbody", attrs: {}, children: [
                    ctrl.products().map((function(el){
                      return [{tag: "tr", attrs: {}, children: [
                        {tag: "td", attrs: {}, children: [el.name]}, 
                        {tag: "td", attrs: {}, children: [el.price]}, 
                        {tag: "td", attrs: {}, children: [el.guarantee]}, 
                        {tag: "td", attrs: {}, children: [el.available?"Còn hàng":"hết hàng"]}, 
                        {tag: "td", attrs: {}, children: [el.extra]}, 
                        {tag: "td", attrs: {}, children: [
                          {tag: "span", attrs: {style:"cursor: pointer", 
                                onclick:function(){
                                  ctrl.listProduct.product().push(el._id);
                                }
                          }, children: [" Thêm "]}
                        ]}
                      ]}
                      ]
                    }))
    
    
                    ]}
                  ]}
                ]}
                
              ]}, 
              {tag: "div", attrs: {className:"modal-footer"}, children: [
                {tag: "button", attrs: {type:"button", className:"btn btn-default", "data-dismiss":"modal"}, children: ["Close"]}
              ]}
            ]}
    
          ]}
        ]}
        
      ]}
    ]}
  ]
};


module.exports = IndexBuilder;
},{"./fn.msx":16}],8:[function(require,module,exports){
var Menu = function(ctrl){
  return [
    {tag: "div", attrs: {id:"menubar", className:"menubar-inverse "}, children: [
      {tag: "div", attrs: {className:"menubar-fixed-panel"}, children: [
        {tag: "div", attrs: {}, children: [
          {tag: "a", attrs: {className:"btn btn-icon-toggle btn-default menubar-toggle", "data-toggle":"menubar", href:"javascript:void(0);"}, children: [
            {tag: "i", attrs: {className:"fa fa-bars"}}
          ]}
        ]}, 
        {tag: "div", attrs: {className:"expanded"}, children: [
          {tag: "a", attrs: {href:"javascript:void(0)"}, children: [
            {tag: "span", attrs: {className:"text-lg text-bold text-primary "}, children: ["MATERIAL ADMIN"]}
          ]}
        ]}
      ]}, 
      
      {tag: "div", attrs: {className:"menubar-scroll-panel", 
        onmouseleave:function(){
          $('body').removeClass('menubar-visible');
        }, 
       onmouseenter:function(){
         $('body').addClass('menubar-visible');
       }
      }, children: [
        
        {tag: "div", attrs: {className:"gui-controls", id:"main-menu"}, children: [
          {tag: "li", attrs: {}, children: [
            {tag: "a", attrs: {href:"?/", className:"active"}, children: [
              {tag: "div", attrs: {className:"gui-icon"}, children: [{tag: "i", attrs: {className:"md md-home"}}]}, 
              {tag: "span", attrs: {className:"title"}, children: ["Dashboard"]}
            ]}
          ]}, 
  
          {tag: "li", attrs: {class:"gui-folder expanded"}, children: [
            {tag: "a", attrs: {}, children: [
              {tag: "div", attrs: {class:"gui-icon"}, children: [{tag: "i", attrs: {class:"fa fa-folder-open fa-fw"}}]}, 
              {tag: "span", attrs: {class:"title"}, children: ["LAPTOP"]}
            ]}, 
            {tag: "ul", attrs: {}, children: [
              {tag: "li", attrs: {}, children: [{tag: "a", attrs: {href:"/admin?/product/new"}, children: [{tag: "span", attrs: {class:"title"}, children: ["Thêm mới"]}]}]}, 
              {tag: "li", attrs: {}, children: [{tag: "a", attrs: {href:"/admin?/product/list"}, children: [{tag: "span", attrs: {class:"title"}, children: ["Danh sách"]}]}]}
            ]}
          ]}, 
  
          {tag: "li", attrs: {class:"gui-folder expanded"}, children: [
            {tag: "a", attrs: {}, children: [
              {tag: "div", attrs: {class:"gui-icon"}, children: [{tag: "i", attrs: {class:"fa fa-folder-open fa-fw"}}]}, 
              {tag: "span", attrs: {class:"title"}, children: ["Bài viết"]}
            ]}, 
            {tag: "ul", attrs: {}, children: [
              {tag: "li", attrs: {}, children: [{tag: "a", attrs: {href:"/admin?/article/new"}, children: [{tag: "span", attrs: {class:"title"}, children: ["Thêm mới"]}]}]}, 
              {tag: "li", attrs: {}, children: [{tag: "a", attrs: {href:"/admin?/article/list"}, children: [{tag: "span", attrs: {class:"title"}, children: ["Danh sách"]}]}]}
            ]}
          ]}, 
          
  
          {tag: "li", attrs: {}, children: [
            {tag: "a", attrs: {href:"/admin?/category/create"
            }, children: [
              {tag: "div", attrs: {className:"gui-icon"}, children: [{tag: "i", attrs: {className:"md md-web"}}]}, 
              {tag: "span", attrs: {className:"title"}, children: ["Thêm danh mục"]}
            ]}
          ]}, 
  
          {tag: "li", attrs: {}, children: [
            {tag: "a", attrs: {href:"/admin?/setup/category"
            }, children: [
              {tag: "div", attrs: {className:"gui-icon"}, children: [{tag: "i", attrs: {className:"md md-web"}}]}, 
              {tag: "span", attrs: {className:"title"}, children: ["Menu sản phẩm"]}
            ]}
          ]}, 
  
          {tag: "li", attrs: {}, children: [
            {tag: "a", attrs: {href:"/admin?/setup/nav"
            }, children: [
              {tag: "div", attrs: {className:"gui-icon"}, children: [{tag: "i", attrs: {className:"md md-web"}}]}, 
              {tag: "span", attrs: {className:"title"}, children: ["Menu chính"]}
            ]}
          ]}, 
          
          {tag: "li", attrs: {}, children: [
            {tag: "a", attrs: {href:"/admin?/productShow"
            }, children: [
              {tag: "div", attrs: {className:"gui-icon"}, children: [{tag: "i", attrs: {className:"md md-web"}}]}, 
              {tag: "span", attrs: {className:"title"}, children: ["Hiển thị trang chủ"]}
            ]}
          ]}
          
        ]}, 
        
        
        {tag: "div", attrs: {className:"menubar-foot-panel"}, children: [
          {tag: "small", attrs: {className:"no-linebreak hidden-folded"}, children: [
            {tag: "span", attrs: {className:"opacity-75"}, children: ["Copyright © 2014"]}, " ", {tag: "strong", attrs: {}, children: ["CodeCovers"]}
          ]}
        ]}
        
      ]}
    ]}
  ]
}

module.exports = Menu;
},{}],9:[function(require,module,exports){
var fn = require('./fn.msx');

var input = m.prop("");

var NewArticle = function(ctrl){
  return [
    {tag: "hr", attrs: {className:"ruler-xxl"}},
    {tag: "div", attrs: {className:"content"}, children: [
      {tag: "section", attrs: {}, children: [
        {tag: "div", attrs: {className:"section-body"}, children: [
          {tag: "div", attrs: {className:"card"}, children: [
            {tag: "div", attrs: {className:"card-body"}, children: [
              {tag: "form", attrs: {className:"form-horizontal", role:"form"}, children: [
                {tag: "button", attrs: {type:"button", className:"btn ink-reaction btn-raised btn-primary", style:"float: right", 
                  onclick:function(){
                    $.ajax({
                      type: "POST",
                      url: "/admin/article",
                      data: JSON.stringify(ctrl.data()),
                      contentType: "application/json",
                      dataType: "text"
                    }).done((function() {
                      m.route('/article/edit?article=' + ctrl.data()._id)
                    }))
                      .fail((function() {
                        alert( "error" );
                    }));
                  }
                }, children: [(ctrl.status=="new")?"Thêm mới":"Cập nhập"]}, 
                {tag: "br", attrs: {}}, 
                {tag: "br", attrs: {}}, 
  
                {tag: "div", attrs: {className:"form-group"}, children: [
                  {tag: "label", attrs: {htmlFor:"_id", className:"col-sm-2 control-label"}, children: ["slug"]}, 
                  {tag: "div", attrs: {className:"col-sm-10"}, children: [
                    {tag: "input", attrs: {type:"text", className:"form-control", id:"_id", name:"_id", 
                           onchange:function(el){
                             ctrl.data()._id = $(el.target).val()
                           }, 
                           value:ctrl.data()._id}
                    }, 
                    {tag: "div", attrs: {className:"form-control-line"}}
                  ]}
                ]}, 
                
                {tag: "div", attrs: {className:"form-group"}, children: [
                  {tag: "label", attrs: {htmlFor:"title", className:"col-sm-2 control-label"}, children: ["Tiêu đề"]}, 
                  {tag: "div", attrs: {className:"col-sm-10"}, children: [
                      {tag: "input", attrs: {type:"text", className:"form-control", id:"title", name:"title", 
                        onchange:function(el){
                          ctrl.data().title = $(el.target).val();
                          ctrl.data()._id = fn.slug(ctrl.data().title);
                        }, 
                        value:ctrl.data().title}
                      }, 
                    {tag: "div", attrs: {className:"form-control-line"}}
                  ]}
                ]}
                
              ]}
            ]}
          ]}, 
          
          {tag: "div", attrs: {className:"row"}, children: [
            {tag: "div", attrs: {className:"col-md-12"}, children: [
              {tag: "div", attrs: {className:"card card-body"}, children: [
                ctrl.requestArticle.ready()?({tag: "div", attrs: {id:"summernote", 
                     config:function (el, isInited) {
                       if (!isInited) {
                         $('#summernote').summernote({
                           callbacks: {
                             onChange: function(contents, $editable) {
                               ctrl.data().body = $('#summernote').summernote('code');
                             }
                           }
                         });
                         $('#summernote').summernote('code', ctrl.data().body);
                       }
                     }
                     
                }}):({tag: "div", attrs: {id:"summernote"}, children: [
                  "config=", function (el, isInited) {
                  if (!isInited) {
                    $('#summernote').summernote({
                      callbacks: {
                        onChange: function(contents, $editable) {
                          ctrl.data().body = $('#summernote').summernote('code');
                        }
                      }
                    });
                    $('#summernote').summernote('code', ctrl.data().body);
                  }
                }
                ]})
                
              ]}
            ]}
  
            
          ]}
        ]}
      ]}
    ]}
  ]
};


module.exports = NewArticle;
},{"./fn.msx":16}],10:[function(require,module,exports){
var fn = require('./fn.msx');

var input = m.prop("");

var data = m.prop({
  "_id": "",
  "name" : ""
});

var NewCategory = function(ctrl){
  return [
    {tag: "hr", attrs: {className:"ruler-xxl"}},
    {tag: "div", attrs: {className:"content"}, children: [
      {tag: "section", attrs: {}, children: [
        {tag: "div", attrs: {className:"section-body"}, children: [
          {tag: "div", attrs: {className:"card"}, children: [
            {tag: "div", attrs: {className:"card-body"}, children: [
              {tag: "form", attrs: {className:"form-horizontal", role:"form"}, children: [
                {tag: "button", attrs: {type:"button", className:"btn ink-reaction btn-raised btn-primary", style:"float: right", 
                  onclick:function(){
                    console.log(data());
                    {/*delete data().time;*/}
                    $.ajax({
                      type: "POST",
                      url: "/admin/newCategory",
                      data: JSON.stringify(data()),
                      contentType: "application/json",
                      dataType: "json",
                      success: function(data){
                        alert("Đã thêm thành công");
                        data()._id = "";
                        data()._name = "";
                        m.redraw();
                      }
                    });
                    
                  }
                }, children: ["Publish"]}, 
                {tag: "button", attrs: {type:"button", className:"btn ink-reaction btn-raised", style:"float: right; margin-right: 20px;"}, children: ["Save"]}, 
                {tag: "br", attrs: {}}, 
                {tag: "br", attrs: {}}, 
  
                {tag: "div", attrs: {className:"form-group"}, children: [
                  {tag: "label", attrs: {htmlFor:"url", className:"col-sm-2 control-label"}, children: ["Url"]}, 
                  {tag: "div", attrs: {className:"col-sm-10"}, children: [
                      {tag: "input", attrs: {type:"text", className:"form-control", id:"url", name:"title", 
                             onchange:function(el){
                               data()._id = $(el.target).val()
                             }, 
                             value:data()._id}
                      }, 
                  {tag: "div", attrs: {className:"form-control-line"}}
                  ]}
                ]}, 
  
                {tag: "div", attrs: {className:"form-group"}, children: [
                  {tag: "label", attrs: {htmlFor:"url", className:"col-sm-2 control-label"}, children: ["Name"]}, 
                  {tag: "div", attrs: {className:"col-sm-10"}, children: [
                      {tag: "input", attrs: {type:"text", className:"form-control", id:"url", name:"title", 
                             onchange:function(el){
                               data().name = $(el.target).val();
                               data()._id = fn.slug(data().name);
                             }, 
                             value:(data().name === undefined)?"":(data().name)}
                      }, 
                    {tag: "div", attrs: {className:"form-control-line"}}
                  ]}
                ]}
              ]}
            ]}
          ]}, 
          
          {tag: "div", attrs: {className:"row"}
            
          }
        
          
        ]}
      ]}
    ]}
  ]
};

var categories = [
  {
    "slug": "1",
    "name": "mot",
    "description": "abc",
  },
  {
    "slug": "2",
    "name": "hai",
    "description": "abc",
  },
  {
    "slug": "3",
    "name": "ba",
    "description": "abc",
  }
]


module.exports = NewCategory;
},{"./fn.msx":16}],11:[function(require,module,exports){
var fn = require('./fn.msx');

var input = m.prop("");


var NewProduct = function(ctrl){
  return [
    {tag: "hr", attrs: {className:"ruler-xxl"}},
    {tag: "div", attrs: {className:"content"}, children: [
      {tag: "section", attrs: {}, children: [
        {tag: "div", attrs: {className:"section-body"}, children: [
          {tag: "div", attrs: {className:"card"}, children: [
            {tag: "div", attrs: {className:"card-body"}, children: [
              {tag: "form", attrs: {className:"form-horizontal", role:"form"}, children: [
                
                {tag: "button", attrs: {type:"button", className:"btn ink-reaction btn-raised btn-primary", style:"float: right", 
                  onclick:function(){
                    if(ctrl.data().image.length > 0 && ctrl.data()._id.length > 0) {
                      $.ajax({
                        type: "POST",
                        url: "/admin/product",
                        data: JSON.stringify(ctrl.data()),
                        contentType: "application/json",
                        dataType: "text",
                        success: function (data) {
                          m.route("/product/edit?product=" + ctrl.data()._id)
                        }
                      });
                    } else {
                      alert("Phải chọn ảnh sản phẩm!")
                    }
                  }
                }, children: [(ctrl.productID != undefined)?"Cập nhập":"Thêm laptop"]}, 
                
                {tag: "br", attrs: {}}, 
                {tag: "br", attrs: {}}, 
  
                {tag: "div", attrs: {className:"form-group"}, children: [
                  {tag: "label", attrs: {htmlFor:"url", className:"col-sm-2 control-label"}, children: ["Url :"]}, 
                  {tag: "div", attrs: {className:"col-sm-10"}, children: [
                    {tag: "input", attrs: {type:"text", className:"form-control", id:"url", name:"title", disabled:(ctrl.productID != undefined)?"true":"", 
                           onchange:function(el){
                             ctrl.data()._id = $(el.target).val()
                           }, 
                           value:ctrl.data()._id}
                    }, 
                    {tag: "div", attrs: {className:"form-control-line"}}
                  ]}
                ]}, 
                
                {tag: "div", attrs: {className:"form-group"}, children: [
                  {tag: "label", attrs: {htmlFor:"title", className:"col-sm-2 control-label"}, children: ["Tên laptop :"]}, 
                  {tag: "div", attrs: {className:"col-sm-10"}, children: [
                    {tag: "input", attrs: {type:"text", className:"form-control", id:"title", name:"title", 
                    onchange:function(el){
                      ctrl.data().name = $(el.target).val();
                      ctrl.data().search = $(el.target).val();
                      ctrl.data()._id = fn.slug(ctrl.data().name);
                    }, 
                    value:ctrl.data().name}
                    }, 
                    {tag: "div", attrs: {className:"form-control-line"}}
                  ]}
                ]}, 
  
                {tag: "div", attrs: {className:"form-group"}, children: [
                  {tag: "label", attrs: {htmlFor:"title", className:"col-sm-2 control-label"}, children: ["Link driver"]}, 
                  {tag: "div", attrs: {className:"col-sm-10"}, children: [
                    {tag: "input", attrs: {type:"text", className:"form-control", id:"title", name:"title", 
                           onchange:function(el){
                             ctrl.data().driver = $(el.target).val();
                           }, 
                           value:ctrl.data().driver}
                    }, 
                    {tag: "div", attrs: {className:"form-control-line"}}
                  ]}
                ]}, 
  
                {tag: "div", attrs: {className:"form-group"}, children: [
                  {tag: "label", attrs: {htmlFor:"title", className:"col-sm-2 control-label"}, children: ["Video youtube"]}, 
                  {tag: "div", attrs: {className:"col-sm-10"}, children: [
                    {tag: "input", attrs: {type:"text", className:"form-control", id:"title", name:"title", 
                           onchange:function(el){
                             ctrl.data().youtube = $(el.target).val();
                           }, 
                           value:ctrl.data().youtube}
                    }, 
                    {tag: "div", attrs: {className:"form-control-line"}}
                  ]}
                ]}, 
                
                
                {tag: "div", attrs: {className:"form-group"}, children: [
                  {tag: "label", attrs: {htmlFor:"title", className:"col-sm-2 control-label"}, children: ["Loại hàng :"]}, 
                  {tag: "div", attrs: {className:"col-sm-5 control-label"}, children: [
                    {tag: "select", attrs: {className:"form-control", id:"categories", name:"categories", 
                            onchange:function(el){
                              ctrl.data().extra = $(el.target).val();
                            }
                    }, children: [
                      {tag: "option", attrs: {value:"normal", selected:(ctrl.data().extra == "normal")?"true":""}, children: ["Bình thường"]}, 
                      {tag: "option", attrs: {value:"hot", selected:(ctrl.data().extra == "hot")?"true":""}, children: ["Hàng Hot"]}, 
                      {tag: "option", attrs: {value:"new", selected:(ctrl.data().extra == "new")?"true":""}, children: ["Hàng mới về"]}, 
                      {tag: "option", attrs: {value:"sale", selected:(ctrl.data().extra == "sale")?"true":""}, children: ["Hàng khuyến mãi"]}
                    ]}
  
                  ]}
                ]}, 
  
                {tag: "div", attrs: {className:"form-group"}, children: [
                  {tag: "label", attrs: {htmlFor:"categories", className:"col-sm-2 control-label"}, children: ["Danh mục :"]}, 
                  {tag: "div", attrs: {className:"col-sm-5 control-label"}, children: [
                    {tag: "select", attrs: {className:"form-control", id:"categories", name:"categories", 
                      onchange:function(el){
                        ctrl.data().category = $(el.target).val();
                      }
                    }, children: [
                      ctrl.categories().map((function(el){
                        return  {tag: "option", attrs: {value:el._id}, children: [el.name]}
                      })), 
                      {tag: "option", attrs: {value:"none", selected:(ctrl.data().category == "none")?"true":""}, children: ["Chưa chọn"]}
                    ]}
                  ]}
                  /*<label htmlFor="image" className="col-sm-1 control-label">Cover</label>*/
                ]}, 
                
                {tag: "div", attrs: {className:"form-group"}, children: [
                  {tag: "label", attrs: {htmlFor:"", className:"col-sm-2 control-label"}, children: ["Tình trạng :"]}, 
                  {tag: "div", attrs: {className:"col-sm-5 control-label"}, children: [
                    {tag: "select", attrs: {className:"form-control", id:"categories", name:"categories", 
                            onchange:function(el){
                              ctrl.data().available = ($(el.target).val() == "true")?true:false;
                            }
                    }, children: [
                      {tag: "option", attrs: {value:"true", selected:(ctrl.data().available == true)?"true":""}, children: ["Còn hàng"]}, 
                      {tag: "option", attrs: {value:"false", selected:(ctrl.data().available == false)?"true":""}, children: ["Hết hàng"]}
                    ]}
                  ]}
                ]}, 
  
                {tag: "div", attrs: {className:"form-group"}, children: [
                  {tag: "label", attrs: {htmlFor:"", className:"col-sm-2 control-label"}, children: ["Bảo hành :"]}, 
                  {tag: "div", attrs: {className:"col-sm-1 control-label"}, children: [
                    {tag: "input", attrs: {type:"number", 
                           onchange:function(el){
                             ctrl.data().guarantee = parseInt($(el.target).val());
                           }, 
                           value:ctrl.data().guarantee}}
                  ]}
                ]}, 
  
                {tag: "div", attrs: {className:"form-group"}, children: [
                  {tag: "label", attrs: {htmlFor:"", className:"col-sm-2 control-label"}, children: ["Giá bán :"]}, 
                  {tag: "div", attrs: {className:"col-sm-1 control-label"}, children: [
                    {tag: "input", attrs: {type:"number", 
                           onchange:function(el){
                             ctrl.data().price = parseInt($(el.target).val());
                           }, 
                           value:ctrl.data().price}}
                  ]}
                ]}, 
  
                {tag: "div", attrs: {className:"row"}, children: [
                  {tag: "label", attrs: {htmlFor:"", className:"col-sm-2 control-label"}, children: ["Ảnh đại diện"]}, 
                  {tag: "div", attrs: {className:"col-sm-3"}, children: [
                    {tag: "button", attrs: {type:"button", className:"btn", style:"float:left", "data-toggle":"modal", "data-target":"#uploadImage"}, children: ["Up ảnh"]}, 
                    {tag: "button", attrs: {type:"button", className:"btn", style:"float: left; margin-left: 5px;", "data-toggle":"modal", "data-target":"#selectImage", 
                            onclick:function(){
                              ctrl.request2 = fn.requestWithFeedback({method: "GET", url: "/image/list/1"}, ctrl.imgList, ctrl.setup2);
                            }
                    }, children: ["Chọn ảnh"]}
                  ]}, 
                  {tag: "div", attrs: {className:"col-sm-5 control-label img-cover"}, children: [
                    (ctrl.data().image.length>0)?[
                        ctrl.data().image.map((function(el){
                          return {tag: "img", attrs: {src:"/cover/get/" + el._id, alt:el.alt, 
                            onclick:function(){
                              ctrl.data().image.splice(fn.getIndexByParam(ctrl.data().image, "_id", el._id) ,1)
                            }}
                          }
                        }))
                    ]:(
                        {tag: "img", attrs: {src:"http://localhost:9000/assets/images/laptop.jpg", alt:""}}
                    )
                    
                  ]}
                ]}
                
              ]}
            ]}
          ]}, 
          
          {tag: "div", attrs: {className:"card card-body"}, children: [
            (ctrl.requestProduct.ready() || ctrl.productID == undefined )?(
              {tag: "div", attrs: {id:"summernote", 
              config:function (el, isInited) {
                if (!isInited) {
                  $('#summernote').summernote({
                    callbacks: {
                      onChange: function(contents, $editable) {
                        console.log("change:" + contents);
                        ctrl.data().info = $('#summernote').summernote('code');
                        ctrl.data().info = $('#summernote').summernote('code');
                        {/*console.log(ctrl.data().info)*/}
                      }
                    }
                  });
                  $('#summernote').summernote('code', ctrl.data().info);
                }
              }
              
            }}):({tag: "div", attrs: {id:"summernote"}})
            
          ]}, 
  
          {tag: "div", attrs: {id:"uploadImage", className:"modal fade", role:"dialog"}, children: [
            {tag: "div", attrs: {className:"modal-dialog uploadImage"}, children: [
              {tag: "div", attrs: {className:"modal-content "}, children: [
                {tag: "div", attrs: {className:"modal-header"}, children: [
                  {tag: "button", attrs: {type:"button", className:"close", "data-dismiss":"modal"}, children: ["×"]}, 
                  {tag: "h4", attrs: {className:"modal-title"}, children: ["upload Image!"]}
                ]}, 
                {tag: "div", attrs: {className:"modal-body"}, children: [
                  {tag: "input", attrs: {
                      config:function(el, isInited){
                        if(!isInited){
                            var $input = $('input.file[type=file]');
                            if ($input.length) {
                              $input.fileinput();
                            }
                        }
                      }, 
                      id:"file-0a", class:"file", type:"file", multiple:true,"data-max-file-count":"5", "data-upload-url":"/upload/image"}}
                ]}, 
                {tag: "div", attrs: {className:"modal-footer"}, children: [
                  {tag: "button", attrs: {type:"button", className:"btn btn-default", "data-dismiss":"modal"}, children: ["Close"]}
                ]}
              ]}
    
            ]}
          ]}, 
  
  
          {tag: "div", attrs: {id:"selectImage", className:"modal fade", role:"dialog"
          }, children: [
            {tag: "div", attrs: {className:"modal-dialog uploadImage"}, children: [
              {tag: "div", attrs: {className:"modal-content"}, children: [
                {tag: "div", attrs: {className:"modal-header"}, children: [
                  {tag: "button", attrs: {type:"button", className:"close", "data-dismiss":"modal"}, children: ["×"]}, 
                  {tag: "h4", attrs: {className:"modal-title"}, children: ["select Image!"]}
                ]}, 
                {tag: "div", attrs: {className:"modal-body clearfix"}, children: [
                    ctrl.imgList().map((function(item){
                      return (
                          {tag: "div", attrs: {className:"col-lg-2 col-md-3 col-xs-4 thumb " + ((fn.getItemByParam(ctrl.data().image, "_id", item._id) == undefined)?"":"selected")}, children: [
                            {tag: "span", attrs: {
                              onclick:function(){
                                ctrl.data().image.splice(fn.getIndexByParam(ctrl.data().image, "_id", item._id) ,1)
                              }
                            }}, 
                            {tag: "a", attrs: {class:"thumbnail", href:"javascript:void(0)", 
                              onclick:function(){
                                if(fn.getItemByParam(ctrl.data().image, "_id", item._id) == undefined && ctrl.data().image.length<5){
                                  ctrl.data().image.push({"_id": item._id, "alt" : item.filename})
                                }
                              }
                            }, children: [
                              {tag: "img", attrs: {class:"img-responsive", src:"/cover/get/" + item._id, alt:""}}
                            ]}
                          ]}
                      )
                    }))
                ]}, 
                {tag: "div", attrs: {className:"modal-footer"}, children: [
                  {tag: "div", attrs: {class:"btn-group", role:"group", "aria-label":"..."}, children: [
                    {tag: "button", attrs: {type:"button", class:"btn btn-default", style:"margin-left: 5px", 
                      onclick:function(){
                        if(ctrl.imgPage >1) {
                          ctrl.request2 = fn.requestWithFeedback({
                            method: "GET",
                            url: "/image/list/" + (ctrl.imgPage - 1)
                          }, ctrl.imgList, ctrl.setupPrev);
                        }
                      }
                    }, children: ["Trang trước"]}, 
                    {tag: "button", attrs: {type:"button", class:"btn btn-default", style:"margin-left: 5px"}, children: [ctrl.imgPage]}, 
                    
                    {tag: "button", attrs: {type:"button", class:"btn btn-default", style:"margin-left: 5px", 
                            onclick:function(){
                              ctrl.request2 = fn.requestWithFeedback({
                                method: "GET",
                                url: "/image/list/" + (ctrl.imgPage + 1)
                              }, ctrl.imgListTmp, ctrl.setupNext);
                            }
                    }, children: ["Trang sau"]}
                  ]}, 
                  {tag: "button", attrs: {type:"button", className:"btn btn-default", "data-dismiss":"modal"}, children: ["Close"]}
                ]}
              ]}
    
            ]}
          ]}
          
        ]}
      ]}
    ]}
  ]
};


module.exports = NewProduct;
},{"./fn.msx":16}],12:[function(require,module,exports){
var fn = require('./fn.msx');

var input = m.prop("");
var data = m.prop({
  "_id" : "",
  "name": "",
  "category": "none",
  "extra": "normal",
  "price": 0,
  "available": true,
  "guarantee": 12,
  "image" : [
  ],
  "info": ""
});

var NewProduct = function(ctrl){
  return [
    {tag: "hr", attrs: {className:"ruler-xxl"}},
    {tag: "div", attrs: {className:"content"}, children: [
      {tag: "section", attrs: {}, children: [
        {tag: "div", attrs: {className:"section-body"}, children: [
          {tag: "div", attrs: {className:"card"}, children: [
            {tag: "div", attrs: {className:"card-body"}, children: [
              
              {tag: "nav", attrs: {"aria-label":"Page navigation"}, children: [
                {tag: "ul", attrs: {class:"pagination"}, children: [
                  {tag: "li", attrs: {}, children: [
                    {tag: "a", attrs: {href:"javascript:void(0)", "aria-label":"Previous", 
                       onclick:function(){
                         if(ctrl.page >1) {
                           ctrl.request = fn.requestWithFeedback({
                             method: "GET",
                             url: "/product/list/" + (ctrl.page - 1)
                           }, ctrl.productsTmp, ctrl.setupPrev);
                         }
                       }
                    }, children: [
                      {tag: "span", attrs: {"aria-hidden":"true"
                      }, children: ["«"]}
                    ]}
                  ]}, 
                  {tag: "li", attrs: {}, children: [{tag: "a", attrs: {href:"javascript:void(0)"}, children: [ctrl.page]}]}, 
                  {tag: "li", attrs: {}, children: [
                    {tag: "a", attrs: {href:"javascript:void(0)", "aria-label":"Next", 
                      onclick:function(){
                        ctrl.request = fn.requestWithFeedback({
                          method: "GET",
                          url: "/product/list/" + (ctrl.page + 1)
                        }, ctrl.productsTmp, ctrl.setupNext);
                      }
                    }, children: [
                      {tag: "span", attrs: {"aria-hidden":"true"}, children: ["»"]}
                    ]}
                  ]}
                  /*<li>*/
                    /*<div class="input-group">*/
                      /*<span class="input-group-addon" id="basic-addon1"> Tìm kiếm: </span>*/
                      /*<input type="text" class="form-control" placeholder="Tên sản phẩm" aria-describedby="basic-addon1"/>*/
                    /*</div>*/
                  /*</li>*/
                ]}
                
              ]}, 
              
              {tag: "div", attrs: {class:"table-responsive"}, children: [
                {tag: "table", attrs: {class:"table no-margin"}, children: [
                  {tag: "thead", attrs: {}, children: [
                  {tag: "tr", attrs: {}, children: [
                    {tag: "th", attrs: {}, children: ["Tên laptop"]}, 
                    {tag: "th", attrs: {}, children: ["Giá"]}, 
                    {tag: "th", attrs: {}, children: ["Bảo hành"]}, 
                    {tag: "th", attrs: {}, children: ["Tình trạng"]}, 
                    {tag: "th", attrs: {}, children: ["Thuộc loại"]}, 
                    {tag: "th", attrs: {}}
                  ]}
                  ]}, 
                  {tag: "tbody", attrs: {}, children: [
                  ctrl.products().map((function(el){
                    return [{tag: "tr", attrs: {}, children: [
                      {tag: "td", attrs: {}, children: [el.name]}, 
                      {tag: "td", attrs: {}, children: [el.price]}, 
                      {tag: "td", attrs: {}, children: [el.guarantee]}, 
                      {tag: "td", attrs: {}, children: [el.available?"Còn hàng":"hết hàng"]}, 
                      {tag: "td", attrs: {}, children: [el.extra]}, 
                      {tag: "td", attrs: {}, children: [
                        {tag: "span", attrs: {style:"cursor: pointer", 
                              onclick:function(){
                                $.ajax({
                                  type: "POST",
                                  url: "/product/delete/" + el._id,
                                  data: JSON.stringify({}),
                                  contentType: "application/json",
                                  dataType: "text"
                                }).done((function() {
                                  alert("Xóa thành công")
                                  location.reload();
                                }))
                                    .fail((function() {
                                      alert( "error" );
                                    }));
                              }
                        }, children: [" Xóa "]}, " |", 
                        {tag: "span", attrs: {style:"cursor: pointer", 
                          onclick:function(){
                            m.route("/product/edit?product=" + el._id)
                          }
                        }, children: [" Sửa "]}
                      ]}
                    ]}
                    ]
                  }))
                  
                  
                  ]}
                ]}
              ]}
            ]}
          ]}
        ]}
      ]}
    ]}
  ]
};


module.exports = NewProduct;
},{"./fn.msx":16}],13:[function(require,module,exports){
var Right = function(ctrl){
  return [
    {tag: "div", attrs: {className:"offcanvas"}, children: [
    
      {tag: "div", attrs: {id:"offcanvas-search", className:"offcanvas-pane width-8"}, children: [
        {tag: "div", attrs: {className:"offcanvas-head"}, children: [
          {tag: "header", attrs: {className:"text-primary"}, children: ["Search"]}, 
          {tag: "div", attrs: {className:"offcanvas-tools"}, children: [
            {tag: "a", attrs: {className:"btn btn-icon-toggle btn-default-light pull-right", "data-dismiss":"offcanvas"}, children: [
              {tag: "i", attrs: {className:"md md-close"}}
            ]}
          ]}
        ]}, 
        {tag: "div", attrs: {className:"offcanvas-body no-padding"}, children: [
          {tag: "ul", attrs: {className:"list "}, children: [
            {tag: "li", attrs: {className:"tile divider-full-bleed"}, children: [
              {tag: "div", attrs: {className:"tile-content"}, children: [
                {tag: "div", attrs: {className:"tile-text"}, children: [{tag: "strong", attrs: {}, children: ["A"]}]}
              ]}
            ]}, 
            {tag: "li", attrs: {className:"tile"}, children: [
              {tag: "a", attrs: {className:"tile-content ink-reaction", href:"#offcanvas-chat", "data-toggle":"offcanvas", "data-backdrop":"false"}, children: [
                {tag: "div", attrs: {className:"tile-icon"}, children: [
                  {tag: "img", attrs: {src:"/assets/admin/img/avatar4.jpg?1404026791", alt:""}}
                ]}, 
                {tag: "div", attrs: {className:"tile-text"}, children: [
                  "Alex Nelson", 
                  {tag: "small", attrs: {}, children: ["123-123-3210"]}
                ]}
              ]}
            ]}, 
            {tag: "li", attrs: {className:"tile"}, children: [
              {tag: "a", attrs: {className:"tile-content ink-reaction", href:"#offcanvas-chat", "data-toggle":"offcanvas", "data-backdrop":"false"}, children: [
                {tag: "div", attrs: {className:"tile-icon"}, children: [
                  {tag: "img", attrs: {src:"/assets/admin/img/avatar9.jpg?1404026744", alt:""}}
                ]}, 
                {tag: "div", attrs: {className:"tile-text"}, children: [
                  "Ann Laurens", 
                  {tag: "small", attrs: {}, children: ["123-123-3210"]}
                ]}
              ]}
            ]}, 
            {tag: "li", attrs: {className:"tile divider-full-bleed"}, children: [
              {tag: "div", attrs: {className:"tile-content"}, children: [
                {tag: "div", attrs: {className:"tile-text"}, children: [{tag: "strong", attrs: {}, children: ["J"]}]}
              ]}
            ]}, 
            {tag: "li", attrs: {className:"tile"}, children: [
              {tag: "a", attrs: {className:"tile-content ink-reaction", href:"#offcanvas-chat", "data-toggle":"offcanvas", "data-backdrop":"false"}, children: [
                {tag: "div", attrs: {className:"tile-icon"}, children: [
                  {tag: "img", attrs: {src:"/assets/admin/img/avatar2.jpg?1404026449", alt:""}}
                ]}, 
                {tag: "div", attrs: {className:"tile-text"}, children: [
                  "Jessica Cruise", 
                  {tag: "small", attrs: {}, children: ["123-123-3210"]}
                ]}
              ]}
            ]}, 
            {tag: "li", attrs: {className:"tile"}, children: [
              {tag: "a", attrs: {className:"tile-content ink-reaction", href:"#offcanvas-chat", "data-toggle":"offcanvas", "data-backdrop":"false"}, children: [
                {tag: "div", attrs: {className:"tile-icon"}, children: [
                  {tag: "img", attrs: {src:"/assets/admin/img/avatar8.jpg?1404026729", alt:""}}
                ]}, 
                {tag: "div", attrs: {className:"tile-text"}, children: [
                  "Jim Peters", 
                  {tag: "small", attrs: {}, children: ["123-123-3210"]}
                ]}
              ]}
            ]}, 
            {tag: "li", attrs: {className:"tile divider-full-bleed"}, children: [
              {tag: "div", attrs: {className:"tile-content"}, children: [
                {tag: "div", attrs: {className:"tile-text"}, children: [{tag: "strong", attrs: {}, children: ["M"]}]}
              ]}
            ]}, 
            {tag: "li", attrs: {className:"tile"}, children: [
              {tag: "a", attrs: {className:"tile-content ink-reaction", href:"#offcanvas-chat", "data-toggle":"offcanvas", "data-backdrop":"false"}, children: [
                {tag: "div", attrs: {className:"tile-icon"}, children: [
                  {tag: "img", attrs: {src:"/assets/admin/img/avatar5.jpg?1404026513", alt:""}}
                ]}, 
                {tag: "div", attrs: {className:"tile-text"}, children: [
                  "Mabel Logan", 
                  {tag: "small", attrs: {}, children: ["123-123-3210"]}
                ]}
              ]}
            ]}, 
            {tag: "li", attrs: {className:"tile"}, children: [
              {tag: "a", attrs: {className:"tile-content ink-reaction", href:"#offcanvas-chat", "data-toggle":"offcanvas", "data-backdrop":"false"}, children: [
                {tag: "div", attrs: {className:"tile-icon"}, children: [
                  {tag: "img", attrs: {src:"/assets/admin/img/avatar11.jpg?1404026774", alt:""}}
                ]}, 
                {tag: "div", attrs: {className:"tile-text"}, children: [
                  "Mary Peterson", 
                  {tag: "small", attrs: {}, children: ["123-123-3210"]}
                ]}
              ]}
            ]}, 
            {tag: "li", attrs: {className:"tile"}, children: [
              {tag: "a", attrs: {className:"tile-content ink-reaction", href:"#offcanvas-chat", "data-toggle":"offcanvas", "data-backdrop":"false"}, children: [
                {tag: "div", attrs: {className:"tile-icon"}, children: [
                  {tag: "img", attrs: {src:"/assets/admin/img/avatar3.jpg?1404026799", alt:""}}
                ]}, 
                {tag: "div", attrs: {className:"tile-text"}, children: [
                  "Mike Alba", 
                  {tag: "small", attrs: {}, children: ["123-123-3210"]}
                ]}
              ]}
            ]}, 
            {tag: "li", attrs: {className:"tile divider-full-bleed"}, children: [
              {tag: "div", attrs: {className:"tile-content"}, children: [
                {tag: "div", attrs: {className:"tile-text"}, children: [{tag: "strong", attrs: {}, children: ["N"]}]}
              ]}
            ]}, 
            {tag: "li", attrs: {className:"tile"}, children: [
              {tag: "a", attrs: {className:"tile-content ink-reaction", href:"#offcanvas-chat", "data-toggle":"offcanvas", "data-backdrop":"false"}, children: [
                {tag: "div", attrs: {className:"tile-icon"}, children: [
                  {tag: "img", attrs: {src:"/assets/admin/img/avatar6.jpg?1404026572", alt:""}}
                ]}, 
                {tag: "div", attrs: {className:"tile-text"}, children: [
                  "Nathan Peterson", 
                  {tag: "small", attrs: {}, children: ["123-123-3210"]}
                ]}
              ]}
            ]}, 
            {tag: "li", attrs: {className:"tile divider-full-bleed"}, children: [
              {tag: "div", attrs: {className:"tile-content"}, children: [
                {tag: "div", attrs: {className:"tile-text"}, children: [{tag: "strong", attrs: {}, children: ["P"]}]}
              ]}
            ]}, 
            {tag: "li", attrs: {className:"tile"}, children: [
              {tag: "a", attrs: {className:"tile-content ink-reaction", href:"#offcanvas-chat", "data-toggle":"offcanvas", "data-backdrop":"false"}, children: [
                {tag: "div", attrs: {className:"tile-icon"}, children: [
                  {tag: "img", attrs: {src:"/assets/admin/img/avatar7.jpg?1404026721", alt:""}}
                ]}, 
                {tag: "div", attrs: {className:"tile-text"}, children: [
                  "Philip Ericsson", 
                  {tag: "small", attrs: {}, children: ["123-123-3210"]}
                ]}
              ]}
            ]}, 
            {tag: "li", attrs: {className:"tile divider-full-bleed"}, children: [
              {tag: "div", attrs: {className:"tile-content"}, children: [
                {tag: "div", attrs: {className:"tile-text"}, children: [{tag: "strong", attrs: {}, children: ["S"]}]}
              ]}
            ]}, 
            {tag: "li", attrs: {className:"tile"}, children: [
              {tag: "a", attrs: {className:"tile-content ink-reaction", href:"#offcanvas-chat", "data-toggle":"offcanvas", "data-backdrop":"false"}, children: [
                {tag: "div", attrs: {className:"tile-icon"}, children: [
                  {tag: "img", attrs: {src:"/assets/admin/img/avatar10.jpg?1404026762", alt:""}}
                ]}, 
                {tag: "div", attrs: {className:"tile-text"}, children: [
                  "Samuel Parsons", 
                  {tag: "small", attrs: {}, children: ["123-123-3210"]}
                ]}
              ]}
            ]}
          ]}
        ]}
      ]}, 
      {tag: "div", attrs: {id:"offcanvas-chat", className:"offcanvas-pane style-default-light width-12"}, children: [
        {tag: "div", attrs: {className:"offcanvas-head style-default-bright"}, children: [
          {tag: "header", attrs: {className:"text-primary"}, children: ["Chat with Ann Laurens"]}, 
          {tag: "div", attrs: {className:"offcanvas-tools"}, children: [
            {tag: "a", attrs: {className:"btn btn-icon-toggle btn-default-light pull-right", "data-dismiss":"offcanvas"}, children: [
              {tag: "i", attrs: {className:"md md-close"}}
            ]}, 
            {tag: "a", attrs: {className:"btn btn-icon-toggle btn-default-light pull-right", href:"#offcanvas-search", "data-toggle":"offcanvas", "data-backdrop":"false"}, children: [
              {tag: "i", attrs: {className:"md md-arrow-back"}}
            ]}
          ]}, 
          {tag: "form", attrs: {className:"form"}, children: [
            {tag: "div", attrs: {className:"form-group floating-label"}, children: [
              {tag: "textarea", attrs: {name:"sidebarChatMessage", id:"sidebarChatMessage", className:"form-control autosize", rows:"1"}}, 
              {tag: "label", attrs: {for:"sidebarChatMessage"}, children: ["Leave a message"]}
            ]}
          ]}
        ]}, 
        {tag: "div", attrs: {className:"offcanvas-body"}, children: [
          {tag: "ul", attrs: {className:"list-chats"}, children: [
            {tag: "li", attrs: {}, children: [
              {tag: "div", attrs: {className:"chat"}, children: [
                {tag: "div", attrs: {className:"chat-avatar"}, children: [{tag: "img", attrs: {className:"img-circle", src:"/assets/admin/img/avatar1.jpg?1403934956", alt:""}}]}, 
                {tag: "div", attrs: {className:"chat-body"}, children: [
                  "Yes, it is indeed very beautiful.", 
                  {tag: "small", attrs: {}, children: ["10:03 pm"]}
                ]}
              ]}
            ]}, 
            {tag: "li", attrs: {className:"chat-left"}, children: [
              {tag: "div", attrs: {className:"chat"}, children: [
                {tag: "div", attrs: {className:"chat-avatar"}, children: [{tag: "img", attrs: {className:"img-circle", src:"/assets/admin/img/avatar9.jpg?1404026744", alt:""}}]}, 
                {tag: "div", attrs: {className:"chat-body"}, children: [
                  "Did you see the changes?", 
                  {tag: "small", attrs: {}, children: ["10:02 pm"]}
                ]}
              ]}
            ]}, 
            {tag: "li", attrs: {}, children: [
              {tag: "div", attrs: {className:"chat"}, children: [
                {tag: "div", attrs: {className:"chat-avatar"}, children: [{tag: "img", attrs: {className:"img-circle", src:"/assets/admin/img/avatar1.jpg?1403934956", alt:""}}]}, 
                {tag: "div", attrs: {className:"chat-body"}, children: [
                  "I just arrived at work, it was quite busy.", 
                  {tag: "small", attrs: {}, children: ["06:44pm"]}
                ]}, 
                {tag: "div", attrs: {className:"chat-body"}, children: [
                  "I will take look in a minute.", 
                  {tag: "small", attrs: {}, children: ["06:45pm"]}
                ]}
              ]}
            ]}, 
            {tag: "li", attrs: {className:"chat-left"}, children: [
              {tag: "div", attrs: {className:"chat"}, children: [
                {tag: "div", attrs: {className:"chat-avatar"}, children: [{tag: "img", attrs: {className:"img-circle", src:"/assets/admin/img/avatar9.jpg?1404026744", alt:""}}]}, 
                {tag: "div", attrs: {className:"chat-body"}, children: [
                  "The colors are much better now."
                ]}, 
                {tag: "div", attrs: {className:"chat-body"}, children: [
                  "The colors are brighter than before." + ' ' +
                  "I have already sent an example." + ' ' +
                  "This will make it look sharper.", 
                  {tag: "small", attrs: {}, children: ["Mon"]}
                ]}
              ]}
            ]}, 
            {tag: "li", attrs: {}, children: [
              {tag: "div", attrs: {className:"chat"}, children: [
                {tag: "div", attrs: {className:"chat-avatar"}, children: [{tag: "img", attrs: {className:"img-circle", src:"/assets/admin/img/avatar1.jpg?1403934956", alt:""}}]}, 
                {tag: "div", attrs: {className:"chat-body"}, children: [
                  "Are the colors of the logo already adapted?", 
                  {tag: "small", attrs: {}, children: ["Last week"]}
                ]}
              ]}
            ]}
          ]}
        ]}
      ]}
    ]}
  ]
};

module.exports = Right;
},{}],14:[function(require,module,exports){
var Product = {};
var Header = require('./_header.msx');
var Menu = require('./_menu.msx');
var Main = require('./_article.msx');
var Right = require('./_right.msx');
var fn = require('./fn.msx');


Product.controller = function(){
  console.log("new product");
  var ctrl = this;
  ctrl.page = 1;
  ctrl.products = m.prop([]);
  ctrl.productsTmp = m.prop([]);
  ctrl.setup = function(){
    m.redraw();
  };
  ctrl.setupPrev = function(){
    if(ctrl.productsTmp().length > 0){
      ctrl.products(ctrl.productsTmp());
      ctrl.page -=1;
    }
    m.redraw();
  };
  ctrl.setupNext = function(){
    if(ctrl.productsTmp().length > 0){
      ctrl.products(ctrl.productsTmp());
      ctrl.page +=1;
    }
    m.redraw();
  };
  ctrl.request = fn.requestWithFeedback({method: "GET", url: "/article/list/" + ctrl.page}, ctrl.products, ctrl.setup);
  window.runApp();
  window.runNav();
};



Product.view = function(ctrl){
  return  [
    Header(ctrl),
    {tag: "div", attrs: {id:"base"}, children: [
      
      Main(ctrl), 
      
      Menu(ctrl), 
      
      Right(ctrl)
    
    ]}
  ]
};


module.exports = Product;
},{"./_article.msx":3,"./_header.msx":6,"./_menu.msx":8,"./_right.msx":13,"./fn.msx":16}],15:[function(require,module,exports){
var IndexController = {};
var Header = require('./_header.msx');
var Menu = require('./_menu.msx');
var Index = require('./_indexbuilder.msx');
var Right = require('./_right.msx');
var fn = require('./fn.msx');

var postData = {"ok": "data"}

var Sortable = {};

Sortable.ListItems = function() {
  this.dragging = m.prop(undefined);
    this.colors = m.prop([
  ]);
};

Sortable.ListItems2 = function() {
  this.dragging = m.prop(undefined);
  this.name = m.prop("");
  this.product = m.prop([
  ]);
};


IndexController.controller = function(){
  var ctrl = this;
  ctrl.products = m.prop([]);
  this.items = new Sortable.ListItems();
  this.listProduct = new Sortable.ListItems2();
  
  // ==============================
  this.sort = function(colors, dragging) {
    this.items.colors(colors);
    this.items.dragging(dragging);
  };
  this.dragStart = function(e) {
    this.dragged = Number(e.currentTarget.dataset.id);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', null);
  };
  this.dragOver = function(e) {
    e.preventDefault();
    var over = e.currentTarget,
        dragging = this.items.dragging(),
        from = isFinite(dragging) ? dragging : this.dragged,
        to = Number(over.dataset.id);
    if((e.clientY - over.offsetTop) > (over.offsetHeight / 2)) to++;
    if(from < to) to--;
    
    var colors = this.items.colors();
    colors.splice(to, 0, colors.splice(from, 1)[0]);
    this.sort(colors, to);
  };
  this.dragEnd = function() {
    this.sort(this.items.colors(), undefined);
  };
  // ==============================
  
  
  // ==============================
  this.sort2 = function(colors, dragging) {
    this.listProduct.product(colors);
    this.listProduct.dragging(dragging);
  };
  this.dragStart2 = function(e) {
    this.dragged = Number(e.currentTarget.dataset.id);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', null);
  };
  this.dragOver2 = function(e) {
    e.preventDefault();
    var over = e.currentTarget,
        dragging = this.listProduct.dragging(),
        from = isFinite(dragging) ? dragging : this.dragged,
        to = Number(over.dataset.id);
    if((e.clientY - over.offsetTop) > (over.offsetHeight / 2)) to++;
    if(from < to) to--;
    
    var colors = this.listProduct.product();
    colors.splice(to, 0, colors.splice(from, 1)[0]);
    this.sort2(colors, to);
  };
  this.dragEnd2 = function() {
    this.sort2(this.listProduct.product(), undefined);
  };
  // ==============================
  
  ctrl.request = fn.requestWithFeedback({method: "GET", url: "/indexbuild"}, ctrl.items.colors, ctrl.setup);
  ctrl.setup = function(){
    m.redraw();
  }
  
  ctrl.setupProduct = function(){
    m.redraw();
  };
  ctrl.page = 1;
  ctrl.setupPrev = function(){
    if(ctrl.productsTmp().length > 0){
      ctrl.products(ctrl.productsTmp());
      ctrl.page -=1;
    }
    m.redraw();
  };
  ctrl.setupNext = function(){
    if(ctrl.productsTmp().length > 0){
      ctrl.products(ctrl.productsTmp());
      ctrl.page +=1;
    }
    m.redraw();
  };
  window.runApp();
  window.runNav();
};



IndexController.view = function(ctrl){
  return  [
    Header(ctrl),
    {tag: "div", attrs: {id:"base"}, children: [
      
      Index(ctrl), 
      
      Menu(ctrl), 
      
      Right(ctrl)
    
    ]}
  ]
};


module.exports = IndexController;
},{"./_header.msx":6,"./_indexbuilder.msx":7,"./_menu.msx":8,"./_right.msx":13,"./fn.msx":16}],16:[function(require,module,exports){
var Fn = {};


Fn.setupAce = function(editor){
  editor.renderer.setShowGutter(false);
  editor.setShowPrintMargin(false);
  
  editor.commands.addCommand({
    name: 'Ctrl_B',
    bindKey: {win: 'Ctrl-B',  mac: 'Command-B'},
    exec: function(editor) {
      var selectedText = editor.getSelectedText() + "";
      var Range = ace.require('ace/range').Range;
      var row = editor.selection.getRange().start.row;
      var column = editor.selection.getRange().start.column;
      var columnEnd = editor.selection.getRange().end.column;
      var rangeBefore = new Range(row, column - 2, row, column);
      var rangeAfter = new Range(row, columnEnd, row, columnEnd + 2);
      var before = editor.getSession().doc.getTextRange(rangeBefore);
      var after = editor.getSession().doc.getTextRange(rangeAfter);
      if(before === "**" && after === '**') {
        editor.session.replace(rangeAfter, "");
        editor.session.replace(rangeBefore, "");
      } else {
        var x = "**" + selectedText +"**";
        editor.session.replace(editor.selection.getRange(), x);
        var length = x.length;
        //editor.selection.moveCursorToPosition({row: row, column: column - length}) ;
        var range = new Range(row, column + 2, row, columnEnd + 2);
        editor.selection.setSelectionRange(range, true);
      }
    }
  });
  
  editor.commands.addCommand({
    name: 'Ctrl_I',
    bindKey: {win: 'Ctrl-I',  mac: 'Command-I'},
    exec: function(editor) {
      var selectedText = editor.getSelectedText() + "";
      var Range = ace.require('ace/range').Range;
      var row = editor.selection.getRange().start.row;
      var column = editor.selection.getRange().start.column;
      var columnEnd = editor.selection.getRange().end.column;
      var rangeBefore = new Range(row, column - 1, row, column);
      var rangeAfter = new Range(row, columnEnd, row, columnEnd + 1);
      var before = editor.getSession().doc.getTextRange(rangeBefore);
      var after = editor.getSession().doc.getTextRange(rangeAfter);
      if(before === "*" && after === '*') {
        editor.session.replace(rangeAfter, "");
        editor.session.replace(rangeBefore, "");
      } else {
        var x = "*" + selectedText +"*";
        editor.session.replace(editor.selection.getRange(), x);
        var length = x.length;
        //editor.selection.moveCursorToPosition({row: row, column: column - length}) ;
        var range = new Range(row, column + 1, row, columnEnd + 1);
        editor.selection.setSelectionRange(range, true);
      }
    }
  });
  
  editor.commands.addCommand({
    name: 'Alt_A',
    bindKey: {win: 'Alt-A',  mac: 'Alt-A'},
    exec: function(editor) {
      editor.selection.selectWord()
    }
  });
};


Fn.requestWithFeedback = function(args, bind, fn) {
  var data = m.prop();
  var completed = m.prop(false);
  var complete = function() {
    completed(true)
  };
  args.background = true;
  args.config = function(xhr) {
    xhr.timeout = 4000;
    xhr.ontimeout = function() {
      complete();
      m.redraw();
    }
  };
  return {
    request: m.request(args).then(data).then((function(data){
      if(bind !== undefined) bind(data);
      if(fn !== undefined) fn();
      complete();
      m.redraw();
    })),
    data: data,
    ready: completed
  }
};

Fn.slug = function(str) {
  str = str.replace(/^\s+|\s+$/g, ''); // trim
  str = str.toLowerCase();
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
  str = str.replace(/đ/g, 'd');
  // remove accents, swap ñ for n, etc
  var from = "ãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;";
  var to   = "aaaaaeeeeeiiiiooooouuuunc------";
  for (var i=0, l=from.length ; i<l ; i++) {
    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }
  
  str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
      .replace(/\s+/g, '-') // collapse whitespace and replace by -
      .replace(/-+/g, '-'); // collapse dashes
  
  return str;
};

Fn.bindOnce = (function() {
  console.log("run bindOnce")
  var cache = {}
  return function(view) {
    if (!cache[view.toString()]) {
      console.log("view")
      cache[view.toString()] = true
      return view()
    }
    else return {subtree: "retain"}
  }
}())


Fn.getItemByParam = function(list, key, value){
  var result = undefined;
  var length = list.length;
  for(var i=0; i<length; i++){
    if(list[i][key] == value){
      result = list[i];
      break;
    }
  }
  return result;
};

Fn.getIndexByParam = function(list, key, value){
  var result = -1;
  var length = list.length;
  for(var i=0; i<length; i++){
    if(list[i][key] == value){
      result = i;
      break;
    }
  }
  return result;
};

module.exports = Fn;
},{}],17:[function(require,module,exports){
var Home = {};
var Header = require('./_header.msx');
var Menu = require('./_menu.msx');
var Content = require('./_content.msx');
var Right = require('./_right.msx');
Home.controller = function(){
  console.log("run home")
  window.runApp();
  window.runNav();
};

Home.view = function(ctrl){
  return  [
      Header(ctrl),
      {tag: "div", attrs: {id:"base"}, children: [
        {tag: "div", attrs: {className:"offcanvas"}}, 

        Content(ctrl), 
        
        Menu(ctrl), 
  
        Right(ctrl)
        
      ]}
  ]
};


module.exports = Home;
},{"./_content.msx":4,"./_header.msx":6,"./_menu.msx":8,"./_right.msx":13}],18:[function(require,module,exports){
var Article = {};
var Header = require('./_header.msx');
var Menu = require('./_menu.msx');
var NewArticle = require('./_newarticle.msx');
var Right = require('./_right.msx');
var fn = require('./fn.msx');

var postData = {"ok": "data"}

Article.controller = function(){
  var ctrl = this;
  ctrl.data = m.prop({
    "_id" : "",
    "title": "",
    "body": ""
  });
  ctrl.requestArticle = {};
  ctrl.requestArticle.ready = m.prop(false);
  
  ctrl.setup = function(){
    console.log(ctrl.data().body);
    m.redraw();
  };
  
  ctrl.type = m.route.param("status");
  ctrl.articleID = m.route.param("article");
  
  if(ctrl.articleID != undefined){
    ctrl.requestArticle = fn.requestWithFeedback({method: "GET", url: "/article/get/" + ctrl.articleID}, ctrl.data, ctrl.setup);
  }

};



Article.view = function(ctrl){
  return  [
    Header(ctrl),
    {tag: "div", attrs: {id:"base"}, children: [
      
      NewArticle(ctrl), 
      
      Menu(ctrl), 
      
      Right(ctrl)
    
    ]}
  ]
};


module.exports = Article;
},{"./_header.msx":6,"./_menu.msx":8,"./_newarticle.msx":9,"./_right.msx":13,"./fn.msx":16}],19:[function(require,module,exports){
var NewProduct = {};
var Header = require('./_header.msx');
var Menu = require('./_menu.msx');
var NewCategory = require('./_newcategory.msx');
var Right = require('./_right.msx');
var fn = require('./fn.msx');

var postData = {"ok": "data"}

NewProduct.controller = function(){
  console.log("category")
  var ctrl = this;
  ctrl.showImgList = false;
  ctrl.imgList = m.prop([]);
  
  ctrl.setup = function(){
    ctrl.categories(ctrl.request.data());
    // ctrl.showImgList = true;
    m.redraw();
  };
  // ctrl.categories = m.prop([]);
  // ctrl.request = fn.requestWithFeedback({method: "GET", url: "/admin/category/listParent"}, ctrl.categories, ctrl.setup);

};



NewProduct.view = function(ctrl){
  return  [
    Header(ctrl),
    {tag: "div", attrs: {id:"base"}, children: [
      
      NewCategory(ctrl), 
      
      Menu(ctrl), 
      
      Right(ctrl)
    
    ]}
  ]
};


module.exports = NewProduct;
},{"./_header.msx":6,"./_menu.msx":8,"./_newcategory.msx":10,"./_right.msx":13,"./fn.msx":16}],20:[function(require,module,exports){
var Product = {};
var Header = require('./_header.msx');
var Menu = require('./_menu.msx');
var NewProduct = require('./_newproduct.msx');
var Right = require('./_right.msx');
var fn = require('./fn.msx');

var postData = {"ok": "data"}

Product.controller = function(){
  console.log("new product");
  var ctrl = this;
  ctrl.data = m.prop({
    "_id" : "",
    "name": "",
    "search": "",
    "category": "none",
    "extra": "normal",
    "price": 0,
    "available": true,
    "guarantee": 12,
    "image" : [
    ],
    "info": "",
    "driver": "",
    "youtube": ""
  });
  ctrl.type = m.route.param("status");
  ctrl.productID = m.route.param("product");
  ctrl.requestProduct = {}
  ctrl.requestProduct.ready = m.prop(false);
  
  
  ctrl.showImgList = false;
  ctrl.imgList = m.prop([]);
  ctrl.imgListTmp = m.prop([]);
  ctrl.imgPage = 1;
  ctrl.setup2 = function(){
    ctrl.imgList(ctrl.request2.data());
    ctrl.showImgList = true;
    m.redraw();
  };
  ctrl.categories = m.prop([]);
  ctrl.setupPrev = function(){
    ctrl.imgList(ctrl.request2.data());
    ctrl.Page -=1;
    m.redraw();
  };
  ctrl.setupNext = function(){
    if(ctrl.imgListTmp().length>0) {
      ctrl.imgList(ctrl.imgListTmp());
      ctrl.Page += 1;
    }
    m.redraw();
  };
  ctrl.setup = function(){
    console.log(ctrl.request.data());
    m.redraw();
  };
  ctrl.setupProduct = function(){
    console.log("setup Product !!");
    console.log(ctrl.data());
    m.redraw();
  };
  
  
  ctrl.categories = m.prop([]);
  ctrl.request = fn.requestWithFeedback({method: "GET", url: "/admin/category/listcategory"}, ctrl.categories, ctrl.setup);
  if(ctrl.productID != undefined){
    console.log("product !!");
    ctrl.requestProduct = fn.requestWithFeedback({method: "GET", url: "/product/get/" + ctrl.productID}, ctrl.data, ctrl.setupProduct);
  }
  

};



Product.view = function(ctrl){
  return  [
    Header(ctrl),
    {tag: "div", attrs: {id:"base"}, children: [
      
      NewProduct(ctrl), 
      
      Menu(ctrl), 
      
      Right(ctrl)
    
    ]}
  ]
};


module.exports = Product;
},{"./_header.msx":6,"./_menu.msx":8,"./_newproduct.msx":11,"./_right.msx":13,"./fn.msx":16}],21:[function(require,module,exports){
var Product = {};
var Header = require('./_header.msx');
var Menu = require('./_menu.msx');
var Main = require('./_product.msx');
var Right = require('./_right.msx');
var fn = require('./fn.msx');


Product.controller = function(){
  console.log("new product");
  var ctrl = this;
  ctrl.page = 1;
  ctrl.products = m.prop([]);
  ctrl.productsTmp = m.prop([]);
  ctrl.setup = function(){
    m.redraw();
  };
  ctrl.setupPrev = function(){
    if(ctrl.productsTmp().length > 0){
      ctrl.products(ctrl.productsTmp());
      ctrl.page -=1;
    }
    m.redraw();
  };
  ctrl.setupNext = function(){
    if(ctrl.productsTmp().length > 0){
      ctrl.products(ctrl.productsTmp());
      ctrl.page +=1;
    }
    m.redraw();
  };
  ctrl.request = fn.requestWithFeedback({method: "GET", url: "/product/list/" + ctrl.page}, ctrl.products, ctrl.setup);

};



Product.view = function(ctrl){
  return  [
    Header(ctrl),
    {tag: "div", attrs: {id:"base"}, children: [
      
      Main(ctrl), 
      
      Menu(ctrl), 
      
      Right(ctrl)
    
    ]}
  ]
};


module.exports = Product;
},{"./_header.msx":6,"./_menu.msx":8,"./_product.msx":12,"./_right.msx":13,"./fn.msx":16}],22:[function(require,module,exports){
var MenuController = {};
var Header = require('./_header.msx');
var Menu = require('./_menu.msx');
var Main = require('./_createSetupCategory.msx');
var Right = require('./_right.msx');
var fn = require('./fn.msx');

var postData = {"ok": "data"};


MenuController.controller = function(){
  console.log("run menu")
  var ctrl = this;
  ctrl.showImgList = false;
  ctrl.imgList = m.prop([]);
  ctrl.menu = m.prop([]);
  ctrl.setupID = (m.route() == "/setup/category")?"category":"nav";
  ctrl.setup = function(){
      ctrl.domenu = $('#domenu-0').domenu({
        onDomenuInitialized: [function() {
          console.log('event: onDomenuInitialized', 'arguments:', arguments, 'context:', this);
        }],
        maxDepth: (ctrl.setupID == "category")?2:1,
        data: JSON.stringify(ctrl.menu())
      }).parseJson()
    
  };
  
  ctrl.request = fn.requestWithFeedback({method: "GET", url: "/setup/" + ctrl.setupID}, ctrl.menu, ctrl.setup);
  // ctrl.menu = [{"title":"SẢN PHẨM PHẦN CỨNG","http":"/c/sp-phan-cung","parent":"NONE","children":[{"title":"CBUS","http":"/c/sp-phan-cung/cbus","parent":"sp-phan-cung","children":[{"title":"CBUS HOST","http":"/c/sp-phan-cung/cbus/cbus-host","parent":"CBUS"},{"title":"cBUS AddOn","http":"/c/sp-phan-cung/cbus/cbus-addon","parent":"cbus"}]}]},{"title":"Development Board","http":"/c/sp-phan-cung/development-board","parent":"sp-phan-cung","children":[{"title":"Microcontroller","http":"/c/sp-phan-cung/development-board/microcontroller","parent":"development-board"},{"title":"Arduino","http":"/c/sp-phan-cung/development-board/arduino","parent":"development-board"},{"title":"ARM","http":"/c/sp-phan-cung/development-board/arm","parent":"development-board"}]}]
  // ctrl.request = fn.requestWithFeedback({method: "GET", url: "/admin/category/listParent"}, ctrl.categories, ctrl.setup);
  

};



MenuController.view = function(ctrl){
  return  [
    Header(ctrl),
    {tag: "div", attrs: {id:"base"}, children: [
      
      Main(ctrl), 
      
      Menu(ctrl), 
      
      Right(ctrl)
    
    ]}
  ]
};


module.exports = MenuController;
},{"./_createSetupCategory.msx":5,"./_header.msx":6,"./_menu.msx":8,"./_right.msx":13,"./fn.msx":16}]},{},[2])

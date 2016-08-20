### 同构直出重构至angular中遇到的一些问题。(angular 1.5.x)

> 最近一个月一直在做老项目的重构，期间遇到了不少问题， 也体验到了angular带来的红利。 
> 为什么是 angular 1.5.x ?
> 其实一开始在 react 和 angular 1 两者之间纠结（其实个人更倾向 react， 因为是移动端项目， 总感觉angular 过重. 同时也或多或少了解过 angular 一些坑， 有点望而却步的感觉）， 
> 最终领导决定在我主要负责的项目中使用 angular 1, 另外一个项目则使用 react 技术栈。
> 于是我整出了这一套技术栈： `angular 1.5.3 + ui-router + ionic + webpack + ESLint + ES6 + SASS`， `ionic` 为我们提供了大量的 指令， 使我们降低了不少工作量， 至于`ionic`的样式库， 就只能呵呵了。
> 同时， 我们也将老项目中的 png icon 全面替换为了 svg, 整个项目下来虽然被坑的比较惨， 但收获也是满满的。 现总结一些典型问题， 以下：

------

+ mobile-angular-ui 中的 modal 使用问题 (bug 实在太多， 后来愤然放弃)
    > 弹出框出现之后，页面上随便点击出现`Could not resolve 'undefined' from state 'foo'` ERROR, 这个找了一些资料， 是跟 ui-router 的一些冲突， 想到整个项目的枢纽——路由， 你都能冲突， 我还是放弃你吧。
    当然， 这个问题当时还是解决了的， 方案： 使用SharedState进行初始化，不用ui-state 。 code -> `SharedState.initialize($scope, 'someModel', false);`。 当然， 它被放弃并不是因为这一个BUG， 还有诸如：
    modal中的 `ng-click` 事件不能够响应等各种迷之BUG！

+ iOS 平台下的日期字符串转日期对象的BUG， `var dateStr = '2016-07-26 00:00'; var dateObj = new Date(dateStr); // iOS平台下你将得到 Invalid Date`
    > 当时找到的一种解决方案： 
      ```
          var dateStr = '2016-07-26 00:00';
          var date = new Date(Date.apply(null, dateStr.replace(' ', 'T'))); // 此时的 date 为正确的日期对象。整合后：
          var fmtDate = (dateStr) => {
              let date = new Date(dateStr);
              if(!date.getTime()) {
                  date = new Date(Date.apply(null, dateStr.replace(' ', 'T')));
              }
              return date;
          }
      ```
      但并不能保证完全解决这个问题， 于是乎找到了 [moment.js](http://momentjs.com/)
      
+ 异步请求中， 请求头默认没有添加 XMLHttpRequest 标识， 后端获取 req.xhr === false
    > 解决方案： 
    ```
        app.factory('requestHeader', ()=> {
            return {
                request: function (config) {
                    config.headers['X-Requested-With'] = 'XMLHttpRequest';
                    return config;
                }
            };
        });
        app.config(($httpProvider) => {
            $httpProvider.interceptors.push('requestHeader');
        });
    ```
    
+ ionic 默认会预取 `30` 个页面模板的问题。 [文档说明](http://ionicframework.com/docs/api/provider/$ionicConfigProvider/), 大致描述如下： 
    > Sets the maximum number of templates to prefetch from the templateUrls defined in `$stateProvider.state`. 
      If set to `0`, the user will have to wait for a template to be fetched the first time when navigating to a new page.
      Default `30`.
    > 根据说明， 可以使用`templates.maxPrefetch(0)`关闭预取功能： 
    ```
    app.config(($ionicConfigProvider) => {
        $ionicConfigProvider.templates.maxPrefetch(0);
    });
    ```
    
+ 微信平台中不支持 `Shebang` 风格路由的问题 [Shebang](https://zh.wikipedia.org/wiki/Shebang)
    > 这个解决方案比较固定， 基本是 前端启动 HTML5 模式 + 后端重写 URL 实现。 Angular中或许算是麻烦的了， 需要指定 base URI 。[Angular 官方说明](https://docs.angularjs.org/api/ng/provider/$locationProvider) 。
    > 因为我们前端同时接管了Node 服务， 所以在 重写URL很是轻松：
    > 前端：`app.config(($locationProvider) => { $locationProvider.html5Mode(true); })`
    > template 页面:  `<base href="your base URI">`
    > node 端， 有两种方案: 
        1.URL 重写： `app.use(rewrite('source URI', 'target URI'))`
        2.路由匹配： `app.get('baseURI/*', middleware)`, 中间件中直接返回模板页面即可。
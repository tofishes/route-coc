*** 名词定义

**** 路由
* route - 路由、路线，仅指字符串路径，例如 '/hello/:name'
* router - 路由器，指包含route在内的一个配置对象

**** 参数，因为都是一个对象，因此使用单数形式，而非复数
* query: get请求地址?后跟的参数，req.query
* body: post请求体参数，req.body
* param: 路由中定义的参数，req.param
* param将被分别合并到req.query, req.body


*** 框架内扩展属性及方法：
* req.pathname 默认等于req.path, 使用req.forward功能后则不相等，req.path始终为原始请求地址
  推荐使用req.pathname替代req.path
* res.forward 服务器端跳转，区别于res.redirect
* req.stageIndex 当前stage索引，框架内使用，使用者可忽略
* req.router 当前pathname所匹配到的router

*** 工作流程
1、读取router文件夹所有配置，需对多个逗号分隔的route做分离
2、遍历routers，把route转为正则并存入router
3、返回一个中间件函数，标准的express中间件
4、中间件分析req，存储一些变量
4、匹配pathname请求路径，找到对应的router，如无则启用自动渲染或自动转发
5、匹配到router，取得param
6、判断是否有初期中间件，如有，执行中间件
7、传递req/res到router.query, router.body方法，this指向为router
8、执行异步或同步任务，获取数据，比如代理的请求或其他操作，抽象为Task对象
9、集合tasks返回的结果，传递给router.handle，this指向为router
10、判断view视图，string | function，渲染视图

*** 任务对象Task
```
class Task {
  string name;
  function do();
}
```

*** 备注
* 曾考虑过这样一种优化，根据get/post等方法细分routers，然后根据req.method得到一个较小的子集，这样循环匹配路由是不是可以更快一些。但是被自己否定了，如果这样做了，会隐藏掉一些错误，比如配置了一个get请求，但实际是用post，这样不能匹配到路由，也不能用405状态提示使用者，会让使用者难以发现问题。

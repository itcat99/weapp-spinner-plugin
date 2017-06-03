# weapp-spinner-plugin
一个weapp的spinner插件。

# 结构 | State
```
|
|- example // 示例目录
|  |- spinner // 开发环境下输出目录
|  |- pages
|  |- app.js
|  |- app.json
|
|- dist // 编译输出目录
|- src // 源文件 
```

# 编译 | Compile
```bash
# 1 step
npm i

# 2 step
  # 开发
  gulp # 生成的文件在 'example/spinner/' 内

  # 编译
  gulp deploy # 生成的文件在 'dist/' 内

```

# 使用 | Use
1. 在`js, wxml, wxss`中引入spinner相对应的文件。
2. 在js文件的data中设置初始变量，数据类型为`JSON数组`，`index`项必填，其他项可不填，初始化为默认设置
```js
  data:{
    spinners:[{
      index: 0, // 索引
      min: 0, // 最小值
      max: 10, // 最大值
      val: 0 // 初始数据
    }]
  }
``` 
3. 在wxml中添加相应的模版标签
```html
<block wx:for={{spinners}} wx:key="*this">
  <template is='spinner' data='{{...item}}'></template>
</block>
```
4. 在`onLoad`中初始化spinner
```js
onLoad(){
  new Spinner({
    // options
  })
}
```
# 默认值 | Default
```js
{
  val: 0,
  max: 10,
  min: 0
}
```

可以在初始化的时候修改默认值
```js
new Spinner({
  val: 10,
  max: 100,
  min: -100
});
```

# 事件 | Event
当spinner中的数字改变的时候，触发onChange事件，可以在初始化的时候设置。
返回值`data`为当前改变的那个spinner的信息。
```js
onLoad(){
  new Spinner({
    onChange: this.spinnerChange
  });

  // other codes...
},
spinnerChange(data){
  // do something...

  /*
    data: {
      index: ...,
      max: ...,
      min: ...,
      val: ...
    }
  */
}
```
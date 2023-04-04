## Client

Import plugin in your main file:

```js
import modal from './components/modal/Modal.js';
```

```js
Vue.prototype.$modal = modal;
```

# Examples
### 弹窗组件

基本用法：(下方有详细属性prop)

1. 可以设置弹窗属性
2. 方便自定义弹窗嵌套组件
3. 可以设置自定义弹窗嵌套组件的传递属性
4. 可以设置自定义弹窗嵌套组件的事件回调

```javascript
  methods:{
    openDialog(){
        this.$Modal({
            // 弹窗内嵌套组件
            component: xxx,
            // 嵌套组件传递属性
            componentProps: {
            },
            // 弹窗属性设置
            props: {
            },
            // 事件回调
            methods: {
            }
        });
    }
 }
```
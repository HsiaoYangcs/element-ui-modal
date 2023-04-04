import Vue from 'vue'
import { Dialog } from 'element-ui'
import store from "@/store";

let instance

const Modal = function ({ component, methods, props, componentProps }) {
  if (Vue.prototype.$isServer) return
  const dom = document.createElement('div')
  document.body.appendChild(dom)
  instance = new Vue({
    store,
    el: dom,
    data () {
      return {
        showModal: true
      }
    },
    components: {
      Dialog: Dialog,
      Plugin: component
    },
    render (createElement) {
      const plugin = this.showModal ? () => createElement('Plugin', {
        props: {
          ...componentProps
        },
        on: {
          close: (e) => this.close(e),
          ...methods
        }
      }) : null
      let zIndex = {}
      //appendToBody Dialog嵌套子Dialog modal遮罩层zindex由el-dialog动态计算,解决遮罩层不覆盖父级组件问题
      if(props?.appendToBody){
        zIndex = {}
      }else{
        //系统有前置报错message层级和dialog框层级共用现象 有时报错层级小于当前遮罩层估给dialog默认一个zIndex
        zIndex = {zIndex:2000}
      }
      return createElement(
        'Dialog', {
          props: {
            visible: this.showModal,
            ...zIndex,
            ...props
          },
          on: {
            close: (e) => this.close(e)
          },
          scopedSlots: {
            default: plugin
          }
        })
    },
    methods: {
      close () {
        this.showModal = false
        document.body.removeChild(this.$el)
        this.$destroy()
      }
    }
  })
  return instance
}

export default Modal

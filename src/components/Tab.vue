<template>
    <div role="tabpanel" class="tab-pane"
        v-bind:class="{hide:!show}"
        v-show="show"
        :transition="transition"
    >
    <slot></slot>
  </div>
</template>

<script>
  export default {
    props: {
      header: {
        type: String
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        index: 0,
        show: false
      }
    },
    computed: {
      show() {
        return (this.$parent.activeIndex == this.index);
      },
      transition() {
        return this.$parent.effect
      }
    },
    created() {
       console.log("进入tabItem created")
      
        this.$parent.tabItems.push({
          header: this.header,
          disabled: this.disabled
        })
    },
    ready() {
       console.log("进入tabItem ready")
        for (var c in this.$parent.$children)
        {
            if (this.$parent.$children[c].$el == this.$el)
            {
                this.index= c;
                break;
            }
        }
    }
  }
</script>

<style scoped>
  .tab-content > .tab-pane {
     overflow: auto;
    -webkit-overflow-scrolling: touch;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-flex: 0 1 auto;
    -ms-flex: 0 1 auto;
    flex: 0 1 auto;
    width: 100%;
    
    height: 100%;
    flex-flow:column nowrap;
  }
</style>

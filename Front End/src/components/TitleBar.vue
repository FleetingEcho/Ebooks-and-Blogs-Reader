<template>
  <transition name="slide-down">
    <div
      v-show="ifTitleAndMenuShow"
      class="title-wrapper"
    >
      <div @click="goToBooks" class="left">
        <span @click="goToBooks"  class="icon icon-back"></span>
      </div>
      <div class="right">
        <div @click="goToManage" class="icon-wrapper">
          <span  @click="goToManage" class="icon icon-more"></span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    ifTitleAndMenuShow: {
      type: Boolean
    }
  },
  methods:{
    goToBooks(){
      this.$router.push({
        name:'myBooks',
      })
    },
    goToManage(){
        this.$Modal.confirm({
        okText:'Go',
        cancelText:'Cancel',
          title: 'Confirm',
          content: `Are you sure to go to Ebooks List ?`,
          onOk: () => {
            this.$router.push({
              name:'upload',
            })

          },
        })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~@/assets/styles/mixin.scss';

  .title-wrapper {
    margin-top: 50px;
    height: 50px;
    display: flex;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: px2rem(48);
    box-shadow: 0 px2rem(8) px2rem(8) rgba(0, 0, 0, 0.15);
    z-index: 101;
    &.slide-down-enter-active,
    &.slide-down-leave-active {
      transition: all 0.3s linear;
    }
    &.slide-down-enter,
    &.slide-down-leave-to {
      transform: translate3d(0, -100%, 0);
    }
    .left {
      flex: 0 0 px2rem(60);
      @include center;
    }
    .right {
      flex: 1;
      display: flex;
      justify-content: flex-end;
      .icon-wrapper {
        flex: 0 0 px2rem(40);
        @include center;
      }
    }
  }
</style>

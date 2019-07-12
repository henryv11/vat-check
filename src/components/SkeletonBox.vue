<template>
  <span :style="{ height, width: computedWidth }" class="SkeletonBox shadow-sm shadow-inner"></span>
</template>

<script>
export default {
  name: "SkeletonBox",
  props: {
    maxWidth: {
      default: 100,
      type: Number
    },
    minWidth: {
      default: 80,
      type: Number
    },
    height: {
      default: "1em",
      type: String
    },
    width: {
      default: null,
      type: String
    }
  },
  computed: {
    computedWidth() {
      return (
        this.width ||
        `${Math.floor(
          Math.random() * (this.maxWidth - this.minWidth) + this.minWidth
        )}%`
      );
    }
  }
};
</script>

<style lang="less" scoped>
.SkeletonBox {
  border-radius: 0.2rem;
  display: inline-block;
  vertical-align: middle;
  background-color: #cfd9df;
  position: relative;
  overflow: hidden;
}

.SkeletonBox::after {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  border-radius: 0.2rem;
  transform: translateX(-100%);
  background: rgb(171, 110, 165);
  background-image: linear-gradient(to right, #cdd6db 0%, #c7cfd8 100%);
  animation: shimmer 2s infinite;
  content: "";

  @keyframes shimmer {
    100% {
      transform: translateX(100%);
    }
  }
}

.shadow-inner {
  -webkit-box-shadow: inset 0 0 4rem #000;
  -moz-box-shadow: inset 0 0 4px #000;
  box-shadow: inset 0 0 4px #000;
}
</style>


/* eslint-disable max-len */
<template>
  <div class="rating-wrapper" :style="wrapperStyles">
    <div
        ref="rating"
        :class="['star-list', {readonly}]"
        :style="starListStyles"
        :title="readableRating"
      >
        <div
          class="mask"
          :style="maskStyles"
        >
          <div class="on">
            <span
              v-for="(item, index) in parseInt(count)"
              :key="`on-${index}`"
              :style="marginStyle"
            >
              <slot name="active">
                <svg
                  enable-background="new 0 0 24 24"
                  viewBox="0 0 24 24"
                ><path
                  d="m23.363 8.584-7.378-1.127-3.307-7.044c-.247-.526-1.11-.526-1.357
                  0l-3.306 7.044-7.378 1.127c-.606.093-.848.83-.423 1.265l5.36
                  5.494-1.267 7.767c-.101.617.558 1.08
                  1.103.777l6.59-3.642 6.59 3.643c.54.3 1.205-.154
                  1.103-.777l-1.267-7.767 5.36-5.494c.425-.436.182-1.173-.423-1.266z"
                /></svg>
              </slot>
            </span>
          </div>
        </div>

        <div class="off">
          <span
            v-for="(item, index) in parseInt(count)"
            :key="`on-${index}`"
            :style="marginStyle"
          >
            <slot name="background">
              <svg
                enable-background="new 0 0 24 24"
                viewBox="0 0 24 24"
              ><path
                d="m23.363 8.584-7.378-1.127-3.307-7.044c-.247-.526-1.11-.526-1.357
                  0l-3.306 7.044-7.378 1.127c-.606.093-.848.83-.423 1.265l5.36
                  5.494-1.267 7.767c-.101.617.558 1.08
                  1.103.777l6.59-3.642 6.59 3.643c.54.3 1.205-.154
                  1.103-.777l-1.267-7.767 5.36-5.494c.425-.436.182-1.173-.423-1.266z"
              /></svg>
            </slot>
          </span>
        </div>
    </div>
    <div
      v-if="showLabel && readonly"
      :class="['rating-label', labelClassName]"
    >
      <slot name="label" :value="readableRating" :count="count">
        {{ readableRating }}/{{ count }}
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IceRatingStar',

  props: {
    value: {
      type: [Number, String],
      default: 1,
    },

    count: {
      type: Number,
      default: 5,
    },

    size: {
      type: Number,
      default: 40,
    },

    step: {
      type: Number,
      default: 1,
    },

    margin: {
      type: Number,
      default: 0,
    },

    readonly: {
      type: Boolean,
      default: true,
    },

    activeColor: {
      type: String,
      default: '',
    },

    backgroundColor: {
      type: String,
      default: '',
    },

    showLabel: {
      type: Boolean,
      default: false,
    },

    labelPos: {
      type: String,
      default: 'right',
    },

    labelClassName: {
      type: String,
      default: '',
    },
  },

  data: () => ({
    widthWrapper: null,
    hoverValue: null,
    val: null,
    handlers: [
      { event: 'click', fn: 'clickHandler' },
      { event: 'mousemove', fn: 'mouseMoveHandler' },
      { event: 'mouseleave', fn: 'mouseLeaveHandler' },
    ],
  }),

  computed: {
    maskStyles() {
      const width = this.round(Math.round(this.val * 100), this.step);
      const total = this.hoverValue || width;
      return {
        width: `${total}%`,
      };
    },

    marginValue() {
      return this.margin * (this.count - 1);
    },

    starListStyles() {
      const styles = {
        width: `${(this.size + this.margin) * this.count}px`,
        height: `${this.size}px`,
        '--star-size': `${this.size}px`,
      };

      if (this.activeColor) {
        styles['--color-active'] = this.activeColor;
      }

      if (this.backgroundColor) {
        styles['--color-background'] = this.backgroundColor;
      }

      return styles;
    },

    marginStyle() {
      return {
        margin: `0 ${this.margin / 2}px`,
      };
    },

    readableRating() {
      return this.readonly && this.value
        ? Math.round((this.value * this.count) * 100) / 100
        : '';
    },

    wrapperStyles() {
      const flexDirectionValues = {
        top: 'column-reverse',
        left: 'row-reverse',
        right: 'row',
        bottom: 'column',
      };

      return {
        'flex-direction': flexDirectionValues[this.labelPos],
      };
    },
  },

  watch: {
    value(newRate) {
      this.val = this.readonly ? newRate : Math.round((newRate) * 10) / 10;
      const maskWidth = this.readonly ? newRate * 100 : Math.round(newRate * 100);
      this.hoverValue = this.round(maskWidth, this.step);
    },

    readonly(newValue) {
      if (newValue) {
        this.removeEventHandlers();
      } else {
        this.addEventHandlers();
      }
    },
  },

  mounted() {
    this.val = this.readonly ? this.value : Math.round((this.value) * 10) / 10;
    this.widthWrapper = this.$refs.rating.getBoundingClientRect().width;
    if (!this.readonly) {
      this.addEventHandlers();
    }
  },

  beforeDestroy() {
    this.removeEventHandlers();
  },

  methods: {
    addEventHandlers() {
      const wrapper = this.$refs.rating;
      this.handlers.forEach((i) => wrapper.addEventListener(i.event, this[i.fn]));
    },

    removeEventHandlers() {
      const wrapper = this.$refs.rating;
      this.handlers.forEach((i) => wrapper.removeEventListener(i.event, this[i.fn]));
    },

    clickHandler() {
      this.val = this.hoverValue / 100;
      this.$emit('input', this.val);
    },

    mouseMoveHandler(event) {
      const wrapper = this.$refs.rating;
      const rect = wrapper.getBoundingClientRect();
      const maskWidth = Math.round(((event.clientX - rect.left) / this.widthWrapper) * 100);
      this.hoverValue = this.round(maskWidth, this.step);
    },

    mouseLeaveHandler() {
      this.hoverValue = null;
    },

    round(i, j) {
      return (Math.ceil(i / j) * j);
    },
  },
};
</script>

<style lang="scss" scoped>
  .rating-wrapper {
    display: flex;
    align-items: center;
  }

  .star-list {
    display: flex;
    position: relative;
    width: 175px;
    height: 35px;

    --color-active: #ffd347;
    --color-background: #e2e2e2;

    &:hover {
      cursor: pointer;
    }

    &.readonly {
      &:hover {
        cursor: default;
      }
    }

    span {
      line-height: 1;
    }

    svg {
      width: var(--star-size);
      height: var(--star-size);
    }
  }

  .mask {
    position: relative;
    width: 40%;
    height: 100%;
    overflow: hidden;
  }

  .on,
  .off {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    display: flex;
  }

  .on {
    z-index: 2;

    svg {
      fill: var(--color-active);
    }
  }

  .off {
    z-index: 1;

    svg {
      fill: var(--color-background);

    }
  }
</style>

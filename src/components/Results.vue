<template>
  <div class="results">
    <div class="ui mini statistic">
      <div class="value" style="color: #FF686B;">
        ${{totalPrice}}
      </div>
      <div class="label">
        可用金額
      </div>
    </div>

    <div v-for="item in items">
      <div class="ui mini statistic">
        <div class="value" style="color: #FFA69E;">
          ${{item.price}} / {{item.count}} 個
        </div>
        <div class="label">
          {{item.name}}
        </div>
      </div>
    </div>
    <div style="margin-top: 2em; margin-bottom: 0;">
      <div class="ui pointing below basic label">
        下方結果按照上方商品排序
      </div>
    </div>
    <div class="ui compact segments">
      <div class="ui segment" v-if="results.length === 0">
        沒有結果，請嘗試修改金額或數量
      </div>
      <div class="ui segment" v-for="result in results">
        <a class="ui label" v-for="num in result">
          {{num}}
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'results',
  data () {
    return {
      items: this.$route.params.items,
      totalPrice: this.$route.params.totalPrice,
      itemsCount: [],
      itemsPrice: [],
      results: []
    }
  },
  created: function () {
    if (typeof (Storage) !== 'undefined') {
      // Code for localStorage/sessionStorage.
      console.log(this.items)
      console.log(this.totalPrice)
      localStorage.lastItems = JSON.stringify(this.items)
      localStorage.lastTotalPrice = JSON.stringify(this.totalPrice)
    }

    this.calculateItems()
  },
  methods: {
    calculateItems: function () {
      var _this = this

      this.items.forEach(function (item, index) {
        _this.itemsCount.push(item.count)
        _this.itemsPrice.push(item.price)
      })

      this.callLoops(this.itemsCount,
        function (currCountList) {
          var total = 0
          for (var i = 0; i < currCountList.length; i++) {
            total = total + (currCountList[i] * _this.itemsPrice[i])
          }
          if (total === _this.totalPrice) {
            // Add matching results
            _this.results.push(currCountList.slice())
          }
        })
    },
    callLoops: function (maxIndices, func) {
      this.doLoops(maxIndices, func, [], 0)
    },
    doLoops: function (maxIndices, func, args, index) {
      if (maxIndices.length === 0) {
        func(args)
      } else {
        var rest = maxIndices.slice(1)
        for (args[index] = 0; args[index] < maxIndices[0]; ++args[index]) {
          this.doLoops(rest, func, args, index + 1)
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>

.results
  padding-top 2em
  font-weight bold
  // font-size 1em
  // input
    // background-color #A5FFD6
  .ui.segment
    background #A5FFD6
  .ui.segment:hover
    background #FFA69E
  .ui.button
    background-color #FF686B
    color #FFFFFF
  .ui.right.floated.icon.header
    font-size .8em
    margin-bottom 0
    margin-left 1em
    cursor pointer

</style>

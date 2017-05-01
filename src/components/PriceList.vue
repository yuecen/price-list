<template>
  <div class="price-list">
    <!-- <div class="ui container"> -->
      <div>
        <div class="ui input">
          <input type="text" placeholder="商品名稱" v-model.lazy="newItem" v-on:keyup.enter="addItem" size=10>
        </div>
        <div class="ui input">
          <input type="text" placeholder="輸入數量" v-model.number="newItemCount" v-on:keyup.enter="addItem" size=4>
          <div class="floating ui circular mini label">#</div>
        </div>
        <div class="ui input">
          <input type="text" placeholder="輸入金額" v-model.number="newItemPrice" v-on:keyup.enter="addItem" size=4>
          <div class="floating ui circular mini label">$</div>
        </div>
      </div>
      <div class="ui compact segments">
        <div class="ui segment" v-for="(item, index) in items">
          <div class="ui disabled input">
            <input type="text" v-model="item.name" size=8>
          </div>
          <div class="ui input">
            <input type="text" v-model.number="item.count" size=5>
            <div class="floating ui circular mini label">#</div>
          </div>
          <div class="ui input">
            <input type="text" v-model.number="item.price" size=5>
            <div class="floating ui circular mini label">$</div>
          </div>
          <div class="ui right floated icon header"><i class="ui remove icon" v-on:click="removeItem(index)"></i></div>
        </div>
      </div>
      <div>
        可用金額
        <div class="ui input">
          <input type="text" v-model.number="totalPrice" size=8>
          <div class="floating ui circular mini label">$</div>
        </div>
        <div class="ui button" v-on:click="showResult()">產生組合</div>
      </div>
    <!-- </div> -->
  </div>
</template>

<script>
export default {
  name: 'price-list',
  data () {
    return {
      newItem: '',
      newItemCount: 1,
      newItemPrice: 100,
      totalPrice: 3850,
      items: [
        {name: '商品一', count: 10, price: 550},
        {name: '商品二', count: 9, price: 660}
      ]
    }
  },
  created: function () {
    if (typeof (Storage) !== 'undefined') {
      if (localStorage.lastItems) {
        this.items = JSON.parse(localStorage.lastItems)
      }
      if (localStorage.lastTotalPrice) {
        this.totalPrice = JSON.parse(localStorage.lastTotalPrice)
      }
    }
  },
  methods: {
    addItem: function () {
      var text = this.newItem.trim()
      var count = this.newItemCount || 0
      var price = this.newItemPrice || 0
      if (text) {
        this.items.push({name: text, count: count, price: price})
        this.newItem = ''
        this.newItemCount = 0
        this.newItemPrice = 0
      }
    },
    removeItem: function (index) {
      this.items.splice(index, 1)
    },
    showResult: function () {
      this.$router.push({name: 'Results', params: {totalPrice: this.totalPrice, items: this.items}})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>

.price-list
  padding-top 2em
  font-weight bold
  // font-size 1em
  // input
    // background-color #A5FFD6
  .ui.segment
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

Vue.component('quantitySelectOption', {
  template:
  `
		<div @click="select" class="option">
			<div class="detail">
				<span class="amount">{{quantity.quantity}}</span>
				<span class="price">{{'$' + quantity.price}}</span>
			</div>
			<div class="icon"><i v-if="isSelected" class="material-icons">check</i></div>
		</div>
	`,
  computed: {
    isSelected() {
      return this.selected === this.quantity;
    } },

  props: {
    selected: {
      type: Object,
      required: false },

    quantity: {
      type: Object,
      required: false } },


  methods: {
    select() {
      const vm = this;
      this.$emit('select', vm.quantity);
    } } });



Vue.component('mobileSelect', {
  template:
  `
		<div v-show="open" class="select-wrap">
<transition name="fade">
			<div v-if="isOpen" @click="close" class="overlay"></div>
</transition>
<transition name="slide">
			<div v-show="isOpen" class="select-menu">
				<header class="select-head"><span>{{headerText}}</span> <button @click="close" class="dismiss">Done</button></header>
				<section class="select-options">								 
						<component v-for="(o, index) in options" :quantity="o" v-bind:is="optionTemplate" :selected="selected" v-on:select="select"></component>
				</section>
			</div>
</transition>
		</div>
	`,
  data() {
    return {
      hello: 'world',
      selected: null,
      isOpen: false };

  },
  methods: {
    select(arg) {
      this.selected = arg;
    },
    close() {
      const vm = this;
      this.isOpen = false;
      setTimeout(function () {
        vm.$emit('close');
      }, 400);
    } },

  props: ['optionTemplate', 'headerText', 'options', 'open'],
  watch: {
    open: function (newVal, oldVal) {
      const vm = this;
      this.isOpen = newVal;
      if (this.selected && newVal == false) {
        this.$emit('select', vm.selected);
      }
    } } });



var app = new Vue({
  el: '#phone',
  data() {
    return {
      options: [
      {
        price: 4.95,
        quantity: 10 },

      {
        price: 9.95,
        quantity: 25 },

      {
        price: 18.95,
        quantity: 50 },

      {
        price: 34.95,
        quantity: 100 },

      {
        price: 59.95,
        quantity: 200 },

      {
        price: 99.95,
        quantity: 500 }],


      optionState: false };

  },
  methods: {
    close() {
      this.optionState = false;
    },
    open() {
      console.log('clicked');
      this.optionState = true;
    },
    optionSelected(arg) {
      console.log(arg);
    } } });
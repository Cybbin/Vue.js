<template>
	<div class="cartcontrol">
		<transition name="move">
			<div class="cart-decrease" v-show="food.count>0" @click="decreaseCart($event)">
				<span class="icon-remove_circle_outline inner"></span>
			</div>
		</transition>
		<div class="cart-count" v-show="food.count>0">{{food.count}}</div>
		<div class="cart-add icon-add_circle" @click="addCart($event)"></div>
	</div>
</template>

<script>
import Vue from 'vue';
export default {
	props: {
		food: {
			type: Object
		}
	},
	methods: {
		addCart(event) {
			if (event._constructed) {
				return;
			}
			if (!this.food.count) {
				Vue.set(this.food, 'count', 1);
			} else {
				this.food.count++;
			}
		},
		decreaseCart(event) {
			if (event._constructed) {
				return;
			}
			if (this.food.count) {
				this.food.count--;
			}
		}
	}
};
</script>

<style>
.cartcontrol{
	font-size:0;
}
.cart-decrease{
	display:inline-block;
	padding:6px;
	transition:all 0.4s linear;
}
.move-enter, .move-leave-active{
	opacity:0;
	transform:translate3D(24px,0,0) rotate(180deg);
}
.cart-decrease .inner{
	display:inline-block;
	font-size:24px;
	color:rgb(0,160,220);
	transition:all 0.4s linear;
}
.cart-count{
	display:inline-block;
	vertical-align:top;
	padding-top:6px;
	line-height:24px;
	text-align:center;
	font-size:10px;
	color:rgb(147,153,159);
}
.cart-add{
	display:inline-block;
	padding:6px;
	font-size:24px;
	color:rgb(0,160,220);
}
</style>

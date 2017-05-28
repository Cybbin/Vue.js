 <template>
	<div class="shopcart">
		<div class="content" @click="toggleList">
			<div class="content-left">
				<div class="logo-wrapper">
					<div class="logo" :class="{'highlight':totalCount>0}">
						<i class="icon-shopping_cart" :class="{'highlight':totalCount>0}"></i>
					</div>
					<div class="num" v-show="totalCount>0">{{totalCount}}</div>
				</div>
				<div class="price" :class="{'highlight':totalCount>0}">￥{{totalPrice}}</div>
				<div class="desc">另需配送费￥{{deliveryPrice}}元</div>
			</div>
			<div class="content-right" @click.stop.prevent="pay">
				<div class="pay" :class="payClass">
					{{payDesc}}
				</div>
			</div>
			<div class="ball-container">
				<div v-for="ball in balls">
					<transition name="drop" v-on:before-enter="beforeEnter" v-on:enter="enter" v-on:after-enter="afterEnter">
						<div class="ball" v-show="ball.show">
							<div class="inner inner-hook"></div>
						</div>
					</transition>
				</div>
			</div>
		</div>
		<transition name="fold">
			<div class="shopcart-list" v-show="listShow">
				<div class="list-header">
					<h1 class="title">购物车</h1>
					<span class="empty" @click="empty">清空</span>
				</div>
				<div class="list-content" ref="listContent">
					<ul>
						<li class="food" v-for="food in selectFoods">
							<span class="name">{{food.name}}</span>
							<div class="price">
								<span>￥{{food.price*food.count}}</span>
							</div>
							<div class="cartcontrol-wrapper">
								<cartcontrol :food="food"></cartcontrol>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</transition>
		<transition name="fade">
			<div class="list-mask" v-show="listShow" @click="hideList"></div>
		</transition>
	</div>
</template>

<script>
import cartcontrol from '../cartcontrol/cartcontrol.vue';
import BScroll from 'better-scroll';

export default {
	data() {
		return {
			balls: [
				{
					show: false
				},
				{
					show: false
				},
				{
					show: false
				},
				{
					show: false
				},
				{
					show: false
				}
			],
			dropBall: [],
			fold: true
		};
	},
	props: {
		selectFoods: {
			type: Array,
			default() {
				return [];
			}
		},
		deliveryPrice: {
			type: Number,
			default: 0
		},
		minPrice: {
			type: Number,
			default: 0
		},
		ballShow: {
			type: Boolean,
			default: false
		}
	},
	computed: {
		totalPrice() {
			let total = 0;
			this.selectFoods.forEach((food) => {
				total += food.price * food.count;
			});
			return total;
		},
		totalCount() {
			let count = 0;
			this.selectFoods.forEach((food) => {
				count += food.count;
			});
			return count;
		},
		payDesc() {
			if (this.totalPrice === 0) {
				return `￥${this.minPrice}元起送`;
			} else if (this.totalPrice < this.minPrice) {
				let diff = this.minPrice - this.totalPrice;
				return `还差￥${diff}元起送`;
			} else {
				return '去结算';
			}
		},
		payClass() {
			if (this.totalPrice >= this.minPrice) {
				return 'enough';
			}
			return 'not-enough';
		},
		listShow() {
			if (!this.totalCount) {
				this.fold = true;
				return false;
			}
			let show = !this.fold;
			if (show) {
				if (!this.scroll) {
					this.$nextTick(() => {
						this.scroll = new BScroll(this.$refs.listContent, {
							click: true
						});
					});
				} else {
					this.scroll.refresh();
				}
			}
			return show;
		}
	},
	methods: {
		drop(el) {
			for (let i = 0; i < this.balls.length; i++) {
				let ball = this.balls[i];
				if (!ball.show) {
					ball.show = true;
					ball.el = el;
					this.dropBall.push(ball);
					return;
				}
			}
		},
		beforeEnter(el) {
			for (let i = 0; i < this.balls.length; i++) {
				let ball = this.balls[i];
				if (ball.show) {
					let rect = ball.el.getBoundingClientRect();
					let x = rect.left - 28;
					let y = -(window.innerHeight - rect.top - 44);
					el.style.display = '';
					el.style.webKitTransform = `translate3d(0,${y}px,0)`;
					el.style.transform = `translate3d(0,${y}px,0)`;
					let inner = el.getElementsByClassName('inner-hook')[0];
					inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
					inner.style.transform = `translate3d(${x}px,0,0)`;
				}
			}
		},
		enter(el) {
			el.offsetHeight;
			this.$nextTick(() => {
				el.style.webKitTransform = 'translate3d(0,0,0)';
				el.style.transform = 'translate3d(0,0,0)';
				let inner = el.getElementsByClassName('inner-hook')[0];
				inner.style.webkitTransform = `translate3d(0,0,0)`;
				inner.style.transform = `translate3d(0,0,0)`;
			});
		},
		afterEnter(el) {
			let ball = this.dropBall.shift();
			if (ball) {
				ball.show = false;
				el.style.display = 'none';
			}
		},
		toggleList() {
			if (!this.totalCount) {
				return;
			}
			this.fold = !this.fold;
		},
		hideList() {
			this.fold = true;
		},
		empty() {
			this.selectFoods.forEach((food) => {
				food.count = 0;
			});
		},
		pay() {
			if (this.totalPrice < this.minPrice) {
				return;
			}
			window.alert(`支付${this.totalPrice}元`);
		}
	},
	components: {
		'cartcontrol': cartcontrol
	}
};
</script>

<style>
.shopcart{
	position:fixed;
	left:0;
	bottom:0;
	z-index:50;
	width:100%;
	height:48px;
}
.shopcart .content{
	display:flex;
	background:#141d27;
	color:rgba(255,255,255,0.4);
}
.shopcart .content .content-left{
	flex:1;
	font-size:0;
}
.shopcart .content .content-left .logo-wrapper{
	display:inline-block;
	position:relative;
	top:-10px;
	margin:0 12px;
	padding:6px;
	width:56px;
	height:56px;
	box-sizing:border-box;
	vertical-align:top;
	border-radius:50%;
	background:#141d27;
}
.shopcart .content .content-left .logo-wrapper .logo{
	width:100%;
	height:100%;
	border-radius:50%;
	text-align:center;
	background:#2b343c;
}
.shopcart .content .content-left .logo-wrapper .highlight{
	background:rgb(0,160,220);
}
.shopcart .content .content-left .logo-wrapper .num{
	position:absolute;
	top:0;
	right:0;
	width:24px;
	height:16px;
	line-height:16px;
	text-align:center;
	border-radius:16px;
	font-size:9px;
	font-weight:700;
	color:#fff;
	background:rgb(240,20,20);
	box-shadow:0 4px 8px 0 rgba(0,0,0,0.4);
}
.shopcart .content .content-left .logo-wrapper .logo .icon-shopping_cart{
	line-height:44px;
	font-size:24px;
	color:#80858a;
}
.shopcart .content .content-left .logo-wrapper .logo .highlight{
	color:#fff;
}
.shopcart .content .content-left .price{
	display:inline-block;
	vertical-align:top;
	margin-top:12px;
	padding-right:12px;
	line-height:24px;
	box-sizing:border-box;
	border-right:1px solid rgba(255,255,255,0.1);
	font-size:16px;
	font-weight:700;
}
.shopcart .content .content-left .highlight{
	color:#fff;
}
.shopcart .content .content-left .desc{
	display:inline-block;
	vertical-align:top;
	margin:12px 0 0 12px;
	line-height:24px;
	font-size:10px;
}
.shopcart .content .content-right{
	flex:0 0 105px;
	width:105px;
}
.shopcart .content .content-right .pay{
	height:48px;
	line-height:48px;
	text-align:center;
	font-size:12px;
	font-weight:700;
}
.shopcart .content .content-right .not-enough{
	background:#2b333b;
}
.shopcart .content .content-right .enough{
	background:#00b43c;
	color:#fff;
}
.ball-container{
	
}
.ball-container .ball{
	position:fixed;
	left:32px;
	bottom:22px;
	z-index:200;
	transition: all 0.4s cubic-bezier(.2,-0.49,.92,.5);
}
.ball-container .ball .inner{
	width:16px;
	height:16px;
	border-radius:50%;
	background:rgb(0,169,220);
	transition:all 0.4s linear;
}
.shopcart-list{
	position: absolute;
	top:0;
	left:0;
	z-index:-1;
	width:100%;
	transition:all 0.5s;
	transform: translate3d(0,-100%,0);
}
.fold-enter, .fold-leave-active {
	transform: translate3d(0,0,0);
}
.shopcart-list .list-header{
	height:40px;
	line-height:40px;
	padding:0 18px;
	background:#f3f5f7;
	border-bottom:1px solid rgba(7,17,27,0.1);
}
.shopcart-list .list-header .title{
	float:left;
	font-size:14px;
	color:rgb(7,17,27);
}
.shopcart-list .list-header .empty{
	float:right;
	font-size:12px;
	color:rgb(0,160,240);
}
.shopcart-list .list-content{
	padding:0 18px;
	max-height:217px;
	overflow:hidden;
	background:#fff;
}
.shopcart-list .list-content .food{
	position:relative;
	padding:12px 0;
	box-sizing:border-box;
	border-bottom:1px solid rgba(7,17,27,0.1);
}
.shopcart-list .list-content .food .name{
	line-height:24px;
	font-size:14px;
	color:rgb(7,17,27);
}
.shopcart-list .list-content .food .price{
	position:absolute;
	right:90px;
	bottom:12px;
	line-height:24px;
	font-size:14px;
	font-weight:700;
	color:rgb(240,20,20);
}
.shopcart-list .list-content .food .cartcontrol-wrapper{
	position: absolute;
	right:0;
	bottom:6px;
}
.list-mask{
	position:fixed;
	top:0;
	left:0;
	width:100%;
	height:100%;
	z-index:-2;
	background:rgba(7,17,27,0.6);
	backdrop-filter:blur(10px);
	transition:all 0.5s;
}
.fade-enter-active,.fade-leave-active{
}
.fade-enter,.fade-leave-active{
	opacity:0;
	background:rgba(7,17,27,0);
}
</style>

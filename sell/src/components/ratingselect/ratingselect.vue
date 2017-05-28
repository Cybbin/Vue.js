<template>
	<div class="ratingselect">
		<div class="rating-type">
			<span @click="select(2,$event)" class="block positive" :class="{'pactive':rselectType===2}">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
			<span @click="select(0,$event)" class="block positive" :class="{'pactive':rselectType===0}">{{desc.positive}}<span class="count">{{positives.length}}</span></span>
			<span @click="select(1,$event)" class="block negative" :class="{'nactive':rselectType===1}">{{desc.negative}}<span class="count">{{negatives.length}}</span></span>
		</div>
		<div class="switch">
			<span @click="toggleContent"  class="icon-check_circle" :class="{'on':onlyContent}"></span>
			<span class="text">只看有内容的评价</span>
		</div>
	</div>
</template>

<script>
const POSITIVE = 0;
const NEGATIVE = 1;
const ALL = 2;
export default {
	data() {
		return {
			rselectType: this.selectType,
			ronlyContent: this.onlyContent
		};
	},
	props: {
		ratings: {
			type: Array,
			default() {
				return [];
			}
		},
		selectType: {
			type: Number,
			default: ALL
		},
		onlyContent: {
			type: Boolean,
			default: false
		},
		desc: {
			type: Object,
			default() {
				return {
					all: '全部',
					positive: '满意',
					negative: '不满意'
				};
			}
		}
	},
	computed: {
		positives() {
			return this.ratings.filter((rating) => {
				return rating.rateType === POSITIVE;
			});
		},
		negatives() {
			return this.ratings.filter((rating) => {
				return rating.rateType === NEGATIVE;
			});
		}
	},
	methods: {
		select(type, event) {
			if (!event._constructed) {
				return;
			}
			this.rselectType = type;
			this.$emit('increment', 'selectType', type);
		},
		toggleContent(event) {
			if (!event._constructed) {
				return;
			}
			this.ronlyContent = !this.ronlyContent;
			this.$emit('increment', 'onlyContent', this.ronlyContent);
		}
	}
};
</script>

<style>
.ratingselect{
	
}
.ratingselect .rating-type{
	padding:18px 0;
	margin:0 18px;
	line-height:8px;
	border-bottom:1px solid #ccc;
	font-size:0;
}
.ratingselect .rating-type .block{
	display:inline-block;
	padding:12px 12px;
	margin-right:8px;
	border-radius:1px;
	color:rgb(77,85,93);
	font-size:12px;
}
.ratingselect .rating-type .positive{
	background:rgba(0,160,220,0.2);
}
.ratingselect .rating-type .negative{
	background:rgba(77,85,93,0.2);
}
.ratingselect .rating-type .pactive{
	background:rgb(0,160,220);
	color:#fff;
}
.ratingselect .rating-type .nactive{
	background:rgb(77,85,93);
	color:#fff;
}
.ratingselect .rating-type .count{
	margin-left:2px;
	font-size:8px;
}
.ratingselect .switch{
	padding:12px 18px;
	line-height:24px;
	border-bottom:1px solid rgba(7,17,27,0.1);
	color:rgb(147,153,159);
	font-size:0;
}
.ratingselect .switch .icon-check_circle{
	display:inline-block;
	vertical-align:top;
	margin-right:4px;
	font-size:24px;
}
.ratingselect .on{
	color:#00c850;
}
.ratingselect .switch .text{
	display:inline-block;
	vertical-align:top;
	font-size:12px;
}
</style>

<template>
	<div class="header">
		<div class="content-wrapper">
			<div class="avatar">
				<img width="64" height="64" :src="seller.avatar"/>
			</div>
			<div class="content">
				<div class="title">
					<span class="brand"></span>
					<span class="name">{{seller.name}}</span>
				</div>
				<div class="description">
					{{seller.description}}/{{seller.deliveryTime}}分钟送达
				</div>
				<div v-if="seller.supports" class="support">
					<span class="icon" :class="classMap[seller.supports[4].type]"></span>
					<span class="text">{{seller.supports[0].description}}</span>
				</div>
			</div>
			<div v-if="seller.supports" class="support-count">
				<span class="count">{{seller.supports.length}}个</span>
				<i class="icon-keyboard_arrow_right"></i>
			</div>
		</div>
		<div class="bulletin-wrapper">
			<span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
		</div>
		<div class="background">
			<img :src="seller.avatar" width="100%" height="100%">
		</div>
	</div>
</template>

<script>
export default {
	props: {
		seller: {
			type: Object
		}
	},
	created() {
		this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
	}
};
</script>

<style>
.header{
	color:#fff;
	background:rgba(7,17,27,0.5);
	position:relative;
}
.content-wrapper{
	padding:24px 12px 18px 24px;
	font-size:0;
	position:relative;
}
.content-wrapper .avatar{
	display:inline-block;
	vertical-align:top;
}
.content-wrapper .avatar img{
	border-radius:2px;
}
.content-wrapper .content{
	display:inline-block;
	margin-left:16px;
}
.content-wrapper .content .title{
	font-size:14px;
	margin:2px 0 8px 0;
}
.content-wrapper .content .title .brand{
	width:30px;
	height:18px;
	display:inline-block;
	background-image: url(brand@2x.png);
	background-size:30px 18px;
	background-repeat:no-repeat;
	vertical-align:top;
}
.content-wrapper .content .title .name{
	margin-left:6px;
	font-size:16px;
	line-height:18px;
	font-weight:bold;
}
.content-wrapper .content .description{
	font-size:12px;
	margin-bottom:10px;
	line-height:12px;
}
.content-wrapper .content .support .icon{
	display:inline-block;
	width:12px;
	height:12px;
	margin-right:4px;
	background-size:12px 12px;
	background-repeat:no-repeat;
}
.content-wrapper .content .support .decrease{
	background-image:url(decrease_1@2x.png);
}
.content-wrapper .content .support .discount{
	background-image:url(discount_1@2x.png);
}
.content-wrapper .content .support .guarantee{
	background-image:url(guarantee_1@2x.png);
}
.content-wrapper .content .support .invoice{
	background-image:url(invoice_1@2x.png);
}
.content-wrapper .content .support .special{
	background-image:url(special_1@2x.png);
}
.content-wrapper .content .support .text{
	line-height:12px;
	font-size:10px;
	vertical-align:top;
}
.content-wrapper .support-count{
	position:absolute;
	right:12px;
	bottom:14px;
	padding:0 8px;
	height:24px;
	line-height:24px;
	border-radius:14px;
	background-color:rgba(0,0,0,0.2);
	text-align:center;
}
.content-wrapper .support-count .count{
	font-size:10px;
}
.content-wrapper .support-count .icon-keyboard_arrow_right{
	font-size:10px;
	width:10px;
	height:10px;
}
.bulletin-wrapper{
	height:28px;
	line-height:28px;
	padding:0 22px 0 12px;
	white-space:nowrap;
	overflow:hidden;
	text-overflow: ellipsis;
	background-color:rgba(7,17,27,0.2);
}
.bulletin-wrapper .bulletin-title{
	display:inline-block;
	width:22px;
	height:12px;
	background-image:url(bulletin@2x.png);
	background-size:22px 12px;
	background-repeat:no-repeat;
	vertical-align:top;
	margin-top:7px;
}
.bulletin-wrapper .bulletin-text{
	font-size:10px;
	margin:0 4px;
	vertical-align:top;
}
.background{
	position:absolute;
	z-index:-1;
	top:0;
	left:0;
	width:100%;
	height:100%;
	filter:blur(10px);
}
</style>

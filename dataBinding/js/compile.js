function Compile(el, vm) {
	this.el = document.querySelector(el);
	this.vm = vm;
	this.fragment = null;
	this.init();
}

Compile.prototype = {
	init: function() {
		if(this.el) {
			this.fragment = this.nodeToFragment(this.el);
			this.compileElement(this.fragment);
			this.el.appendChild(this.fragment);
		}else{
			console.log("Dom元素不存在");
		}
	},
	nodeToFragment: function(el) {
		var fragment = document.createDocumentFragment();
		var child = el.firstChild;
		while(child) {
			fragment.appendChild(child);
			child = el.firstChild;
		}
		return fragment;
	},
	compileElement: function(el) {
		var childNodes = el.childNodes;
		var self = this;
		var reg = /\{\{(.*)\}\}/;
		[].slice.call(childNodes).forEach(function(node) {
			var text = node.textContent;
			if(self.isElementNode(node)) { // 如果是元素节点
				self.compile(node);
			} else if(self.isTextNode(node) && reg.test(text)) { // 如果是文本节点 text
				self.compilText(node, reg.exec(text)[1]);
			}
			if(node.childNodes && node.childNodes.length){
				self.compileElement(node);
			}
		});
	},
	compile: function(node) {
		var nodeAttrs = node.attributes;
		var self = this;
		[].slice.call(nodeAttrs).forEach(function(attr) {
			var attrName = attr.name;
			if(self.isDirective(attrName)) { // 判断包含 v- 属性
				var exp = attr.value;
				var dir = attrName.substring(2);
				if(self.isEventDirective(dir)) { // 判断是不是事件指令 v-on:
					self.compileEvent(node, exp, dir);
				} else if(self.isModelDirective(dir)) { // 判断是不是v-model
					self.compileModel(node, exp, dir);
				}
				node.removeAttribute(attrName);
			}
		});
	},
	compileModel: function(node, exp, dir) {
		var self = this;
		var val = this.vm[exp];
		this.modelUpdate(node, val);
		new Watcher(this.vm, exp, function(value) {
			self.modelUpdate(node, value);
		});
		node.addEventListener('input', function(e) { // 添加input事件，监听input值
			var newVal = e.target.value;
			if(val === newVal) {
				return;
			}
			self.vm[exp] = newVal;
			val = newVal; // ???
		});
	},
	compilText: function(node, exp) {
		var self = this;
		var initText = this.vm[exp];
		this.updateText(node, initText);
		
		new Watcher(this.vm,exp,function(value){
			self.updateText(node,value);
		});
	},
	compileEvent: function(node, exp, dir) {
		var self=this;
		var eventType = dir.split(":")[1];
		var cb = this.vm.methods && this.vm.methods[exp];
		if(eventType && cb){
			node.addEventListener(eventType,function(){
				cb.call(self.vm);
			},false);
		}
	},
	modelUpdate: function(node, val) {
		node.value = (typeof val) === 'undefined' ? '' : val;
	},
	updateText: function(node, val) {
		var self = this;
		node.textContent = (typeof val) === 'undefined' ? '' : val;
	},
	isElementNode: function(node) { // 元素节点
		return node.nodeType === 1;
	},
	isTextNode: function(node) { // 文本节点
		return node.nodeType === 3;
	},
	isDirective(attrName) { // v-
		return attrName.indexOf('v-') === 0;
	},
	isEventDirective(dir) { // v-on:
		return dir.indexOf('on:') === 0;
	},
	isModelDirective(dir) { // v-model
		return dir.indexOf('model') === 0;
	}
}
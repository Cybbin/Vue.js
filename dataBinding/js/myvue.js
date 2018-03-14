function myvue(options) {
	var self = this;
	this.data = options.data;
	this.methods = options.methods;
	Object.keys(this.data).forEach(function(key) {
		self.proxyKeys(key);
	});
	observe(this.data);
	new Compile(options.el, this);
	if(options.created){ // 初始化成功后
		options.created.call(this);
	}
	if(options.mounted) {
		options.mounted.call(this); // 所有事情处理好后执行mounted函数
	}
}

myvue.prototype = {
	proxyKeys: function(key) {
		var self = this;
		Object.defineProperty(this, key, {
			enumerable: true,
			configurable: true,
			set: function(newVal) {
				self.data[key] = newVal;
			},
			get: function() {
				return self.data[key];
			}
		});
	}
}
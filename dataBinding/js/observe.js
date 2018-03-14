function Observe(data) {
	var self = this;
	Object.keys(data).forEach(function(key) {
		self.defineReactive(data, key, data[key]);
	});
}

Observe.prototype = {
	defineReactive: function(data, key, value) {
		var dep = new Dep();
		observe(value);
		Object.defineProperty(data, key, {
			enumerable: true,
			configurable: true,
			set: function(newVal) {
				if(newVal === value) {
					return;
				}
				value = newVal;
				dep.notify();
			},
			get: function() {
				if(Dep.target) {
					dep.addSub(Dep.target);
				}
				return value;
			}
		});
	}
}

function observe(data) {
	if(!data || typeof data !== 'object') {
		return;
	}
	return new Observe(data);
}

function Dep() {
	this.subs = [];
}
Dep.prototype = {
	addSub(sub) {
		this.subs.push(sub);
	},
	notify() {
		this.subs.forEach(function(sub) {
			sub.update();
		});
	}
}

Dep.target = null;
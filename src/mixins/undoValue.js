/**
 @mixins undoValue
 @desc 撤销保存 key是要保存的data里的字符串
 @function saveOldValue 保存旧的值
 @function checkValue 失去焦点的时候的值
 @function resetValue 重置值
 @example
 export default{
 		mixins: [undoValue],
 		data() {
 			return  {
 				example
 			}
 		},
 		methods: {
 			fun() {
 				this.checkValue('example').then(() => {
 					......
 				})
 			}
 		}
 }
 */
export default {
	data() {
		return {
			oldValue: {},
			timer: {}
		}
	},
	methods: {
		saveOldValue(key) {
			return new Promise(resolver => {
				this.oldValue[key] = this[key].value;
				resolver();
			})
		},
		checkValue(key) {
			return new Promise(resolver => {
				if(this[key].value === '' || this[key].value === this.oldValue[key]){
					return;
				}
				this[key].isError = false;
				this[key].isSave = true;
				let _this = this;
				this.timer[key] = setInterval(() => {
					_this[key].isSave = false;
					resolver();
					clearInterval(_this.timer[key]);
				}, 2000);
			})
		},
		resetValue(key) {
			this[key].value = this.oldValue[key];
			this[key].isSave = false;
			clearInterval(this.timer[key]);
		}
	},
	beforeDestroy() {
		if(Object.keys(this.timer).length === 0) return;
		for(let t of this.timer) {
			clearInterval(t)
		}
	}
}

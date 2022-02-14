export default {
  data() {
    return {
      clientStartY: 0,
      clientY: 0,
      upOver: false,
      downOver: true,
      direction: '',
      transition: {
        transition: 'all 0s ease 0s'
      },
      maxMove: 300,
      move: 0,
      scale: 1
    }
  },
  methods: {
    touchStart(e) {
      this.test = 1;
      this.transition={
        transition: 'all 0s ease 0s'
      };
      this.clientStartY = e.touches[0].clientY;
    },
    touchMove(e) {
      this.clientY = e.touches[0].clientY - this.clientStartY;
      if (this.clientY < 0 && this.$refs.isScroll.scrollTop === 0 && !this.upOver) {
        e.preventDefault();
        this.downOver = true;
        if(this.clientY > this.maxMove * -1) {
          if (this.clientY < -60) {
            this.direction = 'up';
          }else{
            this.direction = 'down';
          }
          this.toUp(this.clientY);
        } else {
          this.upOver = true;
          this.toUp(this.maxMove * -1);
        }
      }
      if (this.clientY > 0 && this.$refs.isScroll.scrollTop === 0 && !this.downOver) {
        e.preventDefault();
        this.upOver = true;
        if(this.clientY < this.maxMove) {
          if (this.clientY > 60) {
            this.direction = 'down';
          }else{
            this.direction = 'up';
          }
          this.toDown(this.clientY);
        } else {
          this.downOver = true;
          this.toDown(this.maxMove);
        }
      }
    },
    touchEnd() {
      this.transition={
        transition: 'all .4s ease 0s'
      };
      if (this.direction === 'up') {
        this.move = this.maxMove * -1;
        this.toUpEnd();
        this.upOver = true;
        setTimeout(()=>{
          this.downOver = false;
        }, 0);
      }
      if (this.direction === 'down') {
        this.move = 0;
        this.toDownEnd();
        this.downOver = true;
        setTimeout(()=>{
          this.upOver = false;
        }, 0);
      }
    },
  }
}

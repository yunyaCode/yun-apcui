<template>
<apc-clip></apc-clip>
</template>
<script>
	export default{
		name: 'clip'
	}
</script>
<style>
  .P.file.logo.org .H > .txt:before {
    content: "设置标志"; }

  .P.file.logo.user .H > .txt:before {
    content: "设置头像"; }

  .P.file.cover .list .H > .txt:before {
    content: "选择封面"; }

  .P.file.cover .form .H > .txt:before {
    content: "上传封面"; }

  .M.file .B {
    opacity: 1 !important;
    height: 85%; }

  .M.file .P > .H {
    background: rgba(255, 255, 255, 0.95); }

  .M .P.file .H .doc {
    position: absolute;
    top: 0.5625rem;
    left: 5.625rem;
    width: 2.5rem;
    height: 2.5rem;
    margin-left: 1.25rem;
    padding: 0.3125rem; }

  .M .P.file .H .doc u {
    display: block;
    padding: 0.3125rem;
    background: #fff;
    fill: #DDD;
    border-color: #FFF;
    border-radius: 2.5rem; }

  .M .P.file .H .doc:active u {
    background: #ff7f00;
    fill: #FFF; }

  .M .P.file .N {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%; }

  .M .P.file .N .switch {
    position: absolute;
    top: 0.625rem;
    right: 0.625rem;
    width: 25rem; }

  .M .P.file .N .switch a {
    padding-top: 0.3125rem; }

  .M .P.file .N .input {
    z-index: 10;
    width: 18.75rem;
    margin: 0 auto;
    padding-top: 0.25rem; }

  /*
  .P.file .U:before { display:none; }
  .P.file .P { height:700px; }
  .P.file .P .H { left:0;width:auto;margin:0;padding:0 20px; }
  .P.file .P .L { width:auto;height:100%; }*/
  .P.file .C {
    position: absolute;
    width: 100%; }

  .P.file .C .f:hover input {
    opacity: .9; }

  .P.file .f {
    position: relative;
    float: left;
    width: 12.5rem;
    height: 12.5rem;
    margin: 0.625rem 1.25rem 0.625rem 0;
    /*background: url() 0 0 no-repeat #FFF;*/
    background-size: 100%;
    transition: transform .4s; }

  .P.file .C.cover .f {
    width: 9.375rem;
    height: 14.0625rem;
    margin: 10px; }

  .P.file .C.illustration .f {
    width: 31.25rem;
    height: 13.125rem;
    border: 0; }

  .P.file .C.illustration .add {
    width: 13.125rem;
    height: 13.125rem; }

  .P.file .C .ff {
    cursor: pointer;
    position: relative;
    float: left;
    width: 17.1875rem;
    height: 3.75rem;
    margin: 0.625rem;
    border: 1px solid #DDD; }

  .P.file .C .ff.add {
    border: 0; }

  .P.file .C .ff.vl.c, .P.file .C.audio .ff.al.c {
    background: #AAD010; }

  .P.file .C .ff.vm.c {
    background: #2A8BBE; }

  .P.file .C .ff.vs.c, .P.file .C.audio .ff.as.c {
    background: #FF7F00; }

  .P.file .C .ff.c {
    color: #FFF;
    border-color: transparent;
    background: #2699f3; }

  .P.file .C .ff.c path {
    fill: #FFF; }

  .P.file .C .ff > u {
    position: absolute;
    top: 0.625rem;
    left: 0.625rem;
    width: 1.25rem;
    height: 1.25rem; }

  .P.file .C .ff > i {
    position: absolute;
    top: 0.75rem;
    left: 2.5rem;
    font-size: 1.125rem; }

  .P.file .C .file ~ .text {
    display: inline-block;
    width: 18.75rem; }

  .P.file u.bar {
    top: 50%; }

  .P.file a.add {
    display: block;
    width: 100%;
    height: 100%;
    border: 1px dashed #DDD;
    background: none; }

  .P.file .add:hover {
    outline: 0 !important;
    box-shadow: 0 0 0 !important; }

  .P.file a.add u {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 4.6875rem;
    height: 6.875rem;
    transform: translate(-50%, -50%);
    fill: #2699f3; }

  .P.file a.add u:after {
    content: "添加文件";
    position: absolute;
    bottom: 1.25rem;
    left: 0;
    width: 100%;
    font-size: 0.875rem;
    letter-spacing: 0.125rem;
    text-align: center;
    fill: #2699f3; }

  .P.file a.add.cover u:after {
    content: "添加封面"; }

  .P.file a.add.image u:after {
    content: "添加图片"; }

  .P.file a.add.audio u:after {
    content: "添加音频"; }

  .P.file a.add.video u:after {
    content: "添加视频"; }

  .P.file a.add.doc u:after {
    content: "添加文档"; }

  .P.file a.add:active {
    background: #2699f3;
    border-color: transparent; }

  .P.file a.add:active u {
    fill: #FFF;
    color: #FFF; }

  .P.file .C .ff a.add u {
    width: 9.375rem;
    height: 3.125rem; }

  .P.file .C .ff a.add u:after {
    bottom: 1.125rem;
    padding-left: 1.25rem;
    font-size: 1.25rem; }

  .P.file .C .ff a.add u svg {
    height: 100%; }

  .P.file .rename {
    opacity: 0;
    position: absolute;
    bottom: 0;
    left: 0;
    font-size: 18px;
    text-align: center;
    border: 0;
    border-radius: 0;
    background: #FFF !important;
    transition: opacity .4s; }

  .P.file .zoom {
    position: absolute;
    top: 0;
    left: 0;
    width: 2.5rem;
    height: 2.5rem; }

  .P.file .zoom u {
    display: block;
    width: 1.125rem;
    height: 1.125rem;
    margin: 0.6875rem; }

  .P.file .zoom path {
    fill: #999; }

  .P.file .zoom:hover path {
    fill: #AAD010; }

  .P.file .x1 {
    top: -17px;
    right: -17px;
    border-radius: 40px;
    background: #000;
    transform: scale(0);
    transition: all .4s; }

  .P.file .x1:hover u:before, .P.file .x1:hover u:after {
    background: #FFF; }

  .P.file .btn.list {
    clear: none;
    background: #AAD010; }

  .P.file .P {
    height: 37.5rem; }

  .P.file .C.list .file {
    width: 75rem;
    margin: 0 auto;
    padding: 1.25rem 0; }

  .P.file .C.list .file:after {
    content: '';
    display: block;
    position: relative;
    overflow: visible;
    clear: left; }

  .P.file .C.illustration .file {
    width: 880px; }

  .P.file .C.illustration .f {
    width: 200px;
    height: 84px;
    margin: 10px; }

  .P.file .C .f:hover {
    cursor: pointer;
    outline: 1px solid #DDD;
    box-shadow: 0 0 10px #DDD;
    transform: scale(1.05); }

  .P.file .C .f:hover .x1 {
    transform: scale(0.6); }

  .P.file .C .f:hover .x1:hover {
    background: #E60000; }

  .P.file .mo {
    display: block;
    position: relative;
    width: 75rem;
    margin: 0 auto; }

  .P.file .mo i {
    display: inline-block;
    padding: 0.75rem 0.625rem;
    font-size: 1rem;
    color: #999; }

  .P.file a.prev, .P.file a.next {
    position: absolute;
    top: 0;
    right: 0;
    width: 2.5rem;
    height: 2.5rem;
    border: 1px solid transparent;
    border-radius: 3.125rem;
    background: rgba(255, 255, 255, 0.75); }

  .P.file a.prev {
    right: 3.125rem; }

  .P.file a.prev u, .P.file a.next u {
    display: block;
    width: 2.5rem;
    height: 2.5rem;
    padding: 0.625rem;
    transform: rotate(90deg);
    fill: #2699f3; }

  .P.file a.prev u {
    transform: rotate(-90deg); }

  .P.file a.prev:active, .P.file a.next:active {
    background: #2699f3; }

  .P.file a.prev:active u, .P.file a.next:active u {
    fill: #FFF; }

  .P.file .C.form .L {
    height: 100%; }

  .P.file .C.form .file {
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    text-align: center;
    transform: translate(0, -50%); }

  .P.file .C.form .file > div {
    float: none;
    display: inline-block; }

  .P.file .C.form .file > div:hover {
    outline: 0;
    box-shadow: 0 0 0; }

  .P.file .C.form.cover .file .add {
    width: 9.375rem;
    height: 14.0625rem;
    border: 1px dashed #DDD; }

  .P.file .C.form.cover .file .add:active {
    border: 0; }

  .P.file .C.form .file > .mo {
    display: block;
    text-align: center; }

  .P.file .C.form a.back, .P.file .C.form a.upload {
    display: inline-block;
    width: 7.5rem;
    margin: 3.125rem 1.25rem 0.625rem;
    padding-left: 0.125rem;
    letter-spacing: 0.125rem;
    font-size: 1.25rem;
    color: #FFF;
    border-radius: 0.1875rem;
    background: #CCC; }

  .P.file .C.form a.upload {
    color: #FFF;
    background: #2699f3; }

  /**/
  .M.file .B {
    height: 40.625rem; }

  .M.file .clip .L {
    text-align: center; }

  .M.file .origin {
    position: relative;
    display: inline-block;
    width: 31.25rem;
    height: 31.25rem;
    /* border:1px solid #DDD; */
    border-radius: 0.3125rem;
    background: #F5F5F5; }

  .M.file .origin:before {
    content: '裁剪区域（支持直接将图片拖拽到此区域）' !important;
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    height: 2.1875rem;
    margin-top: -1.25rem;
    padding: 0.625rem;
    font-size: 1rem;
    color: #CCC;
    box-sizing: border-box;
    box-sizing: border-box;
    -moz-box-sizing: border-box; }

  .M.file .origin.c:before {
    display: none; }

  .M.file .origin .img {
    width: 100%;
    height: 100%; }

  .M.file .origin .upload {
    position: absolute;
    z-index: 1;
    top: 0.625rem;
    right: 0.625rem;
    width: 3.125rem;
    height: 3.125rem; }

  .P.file.org .origin .upload:after {
    content: '选择标志'; }

  .P.file.user .origin .upload:after {
    content: '选择照片'; }

  .M.file .origin input {
    opacity: 0;
    cursor: pointer;
    position: absolute;
    top: 0;
    left: 0;
    width: 6.25rem;
    height: 6.25rem; }

  .M.file .origin .upload path {
    fill: #2699f3; }

  /*.M .origin .from a:hover path { fill:#E60000}*/
  .M.file .origin.c .upload {
    color: #DDD; }

  .M.file .origin.c .upload:after {
    content: '重新上传'; }

  .M.file .origin.c .upload path {
    fill: #DDD; }

  .M.file .origin .upload:active {
    color: #E60000; }

  .M.file .origin .upload:active path {
    fill: #E60000; }

  .M.file .preview {
    position: relative;
    display: inline-block;
    width: 31.25rem;
    height: 31.25rem; }

  .M.file .preview:after {
    transition: all .4s;
    opacity: 1;
    content: '';
    position: absolute;
    z-index: 0;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    /*background: url(/css/img/hp_bg.jpg);*/
    background-size: cover; }

  .M.file .preview div {
    opacity: 0;
    overflow: hidden;
    z-index: 1;
    /*border:1px solid #DDD;*/
    background: #F5F5F5;
    transition: all .4s; }

  .M.file .p200 {
    position: absolute;
    top: 5.625rem;
    left: 1.875rem;
    width: 12.5rem;
    height: 12.5rem; }

  .M.file .p100 {
    position: absolute;
    top: 19.375rem;
    left: 16.25rem;
    width: 6.25rem;
    height: 6.25rem; }

  .M.file .p50 {
    position: absolute;
    top: 14.375rem;
    left: 24.375rem;
    width: 3.125rem;
    height: 3.125rem; }

  .M.file .p20 {
    position: absolute;
    top: 19.375rem;
    left: 29.375rem;
    width: 1.25rem;
    height: 1.25rem; }

  .M.file .preview.c:after {
    opacity: .1;
    filter: blur(3px); }

  .M.file .preview.c div {
    opacity: 1; }

  @media screen and (min-width: 1200px) and (max-height: 720px) {
    /*iPad Pro H*/ }
  @media screen and (max-width: 1024px) and (orientation: landscape) {
    /*iPad H*/ }
  @media screen and (max-width: 1024px) and (orientation: portrait) {
    /*iPad Pro V*/ }
  @media screen and (max-width: 768px) {
    /*iPad V*/
    .M.file .B {
      height: 100%; }

    .M.file .H {
      display: none; }

    .M.file .C .U {
      padding: 0; }

    .M.file .origin, .M.file .preview {
      width: 100%; } }
  @media screen and (max-width: 480px) {
    /*iphone6+*/ }
  @media screen and (max-width: 414px) {
    /*iphone6*/ }
  @media screen and (max-width: 393px) {
    /*Mi Note*/ }
  @media screen and (max-width: 384px) {
    /*MX4 Pro*/ }
  @media screen and (max-width: 375px) {
    /*iphone6*/ }
  @media screen and (max-width: 360px) {
    /*mi 615 height*/ }
  @media screen and (max-width: 320px) {
    /*iphone*/ }

</style>

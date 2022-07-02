<template>
  <div>
    <!-- navbar -->
<div>
  <b-navbar type="dark" variant="dark" >
    <b-navbar-nav>
      <b-nav-item class="text-center h3 text-uppercase" href="/">{{title}}</b-nav-item>
    </b-navbar-nav>
    <b-navbar-nav class="ml-auto">
      <b-nav-item class="ml-auto" href="/login" v-if="!this.$store.state.LoggedIn"> <button class="btn btn-primary" >Log In</button> </b-nav-item>
      <b-nav-item class="ml-auto" href="/logout"  v-else> <button class="btn btn-danger">Log Out</button> </b-nav-item>
    </b-navbar-nav>
  </b-navbar>
</div>
    <!-- end navbar -->

<div class="m-4">
<router-view></router-view>
</div>

<!-- start footer -->
<footer class="bg-dark">
  <marquee behavior="" direction="left">
    	<blockquote class="text-white">Don’t let mosquitoes get your blood first.</blockquote>
  </marquee>
</footer>
<!-- end footer -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: 'Panjab University Chandigarh Blood Database',
    }
  },
}
</script>

<style>
@import url(https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css);

button {
  padding: 15px 25px;
  font-size: 22px;
  text-align: center;
  cursor: pointer;
  outline: none;
  color: #fff;
  background-color: #04AA6D;
  border: none;
  border-radius: 15px;
  box-shadow: 0 3px rgb(6, 227, 243);
}

button:hover {background-color: #3e8e41}

button:active {
  background-color: #3e8e41;
  box-shadow: 0 5px #666;
  transform: translateY(4px);
}

.suggested_input{
  width:100%;
}
ul.suggestions{
 width:90%; /* its width according to input width */
 border:1px solid #ccc;
 height:auto;
 padding:0px;
 margin:0px;
 margin-left:1%;
 margin-right:1%;
}
/* if you want style so that's why i use "li a" also */
ul.suggestions li, 
ul.suggestions li a{
 background-color:#fff;
 color:#000;
 font-size:12px; /* according to your requirement */
 font-family:arial;
 font-weight:normal;
 padding:0 10px;
 margin:0px;
 line-height:25px; /* according to your requirement */
 display:block;
 cursor:pointer;
}
ul.suggestions li:hover,
ul.suggestions li a:hover{
 background-color:#ccc;
 color:#000;
 text-decoration:normal;
}
ul.suggestions li:hover .suggested_input{
 background-color:#FAFFBD;
 border:1px solid #3C8DBC;
}
.suggested_input:hover ul.suggestions{
display:block;
}
</style>
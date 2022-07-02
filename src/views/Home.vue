<template>
  <div>
    <div class="container-fluid m-4">
<!-- start search -->
<b-input-group  class="m-1">
      <b-form-input id="inline-form-input-username" placeholder="Search here name of student.." v-model="search"></b-form-input>
      <b-input-group-append>
            <b-button @click="addTag()" variant="primary" class="mr-1 ml-1" >search</b-button>
          </b-input-group-append>
    </b-input-group>
    <div>
      <!--
      <ul class="suggestions">
<li>option 1</li>
<li>option 2</li>
<li>option 3</li>
<li>option 4</li>
</ul> -->
    </div>
<!-- end search -->

<!-- start select button -->
<div class="m-3 justify-content-center d-flex" >
 <b-form-checkbox-group
        id="checkbox-b_type"
        v-model="b_type"
        :options="options"
        name="flavour-1"
      >
      </b-form-checkbox-group>
</div>
<!-- end -->

  <b-card-group deck>
  <studentCard v-for="n in record" :key="n.id" :id="n.id" :name="n.name" :photo="n.photo" :roll="n.roll" :dep="n.dep" :btype="n.b_type" :last_d="n.last_d" :time-d="n.time_d" :contact="n.contact" />
  </b-card-group>
</div>
  </div>
</template>


<script>
import axios from 'axios'
import studentCard from '@/components/studentCard.vue';
export default {
  watch:{
search(){
   this.posting();
},
b_type(){
   this.posting();
}
  },
data() {
  return {
    record:[],
    search:'',
    b_type:'',
    options: [
          { text: 'O +ve', value: 'O +ve' },
          { text: 'O -ve', value: 'o -ve' },
          { text: 'A +ve', value: 'A +ve' },
          { text: 'A -ve', value: 'A ve' },
          { text: 'B +ve', value: 'B +ve' },
          { text: 'B -ve', value: 'B -ve' },
          { text: 'AB +ve', value: 'AB +ve' },
          { text: 'AB -ve', value: 'AB -ve' }
        ]
  }
},
components:{
  studentCard
},
updated(){
  if(this.b_type==false){
    this.b_type=''
  }
console.log({
  b_type:this.b_type,
  search:this.search
})
},
created(){
 this.posting();
},
methods:{
  posting(){
     axios.post(`http://localhost:3000/getdata`,{search:this.search,b_type:this.b_type})
  .then((r)=>{
    console.log(r.data)
    this.record = r.data.result
  })
  .catch((e)=>{
    console.log(e.data)
  })
  }
}
}
</script>

<style>

</style>
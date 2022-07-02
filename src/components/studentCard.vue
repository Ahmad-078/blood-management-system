<template>
  <div>
  <b-card
    :title="name"
    :img-src="'http://localhost:3000/'+photo"
    :img-alt="name"
    img-top
    tag="article"
    style="max-width: 20rem;"
    class="mb-2"
  >
    <b-card-text>
          <ul class="font-weight-bold text-primary">
              <li v-if="id" class="p-1">ID: <span class="m-1 text-secondary">{{id}}</span> </li>
              <li v-if="roll" class="p-1">Roll: <span class="m-1 text-secondary">{{roll}}</span> </li>
              <li v-if="dep" class="p-1">Dep: <span class="m-1 text-secondary">{{dep}}</span> </li>
              <li v-if="btype" class="p-1">Blood Group: <span class="m-1 text-secondary">{{btype}}</span> </li>
              <li v-if="last_d" class="p-1">Last Donated: <span class="m-1 text-secondary">{{last_d}}</span> </li>
              <li v-if="time_d" class="p-1">Times Donated: <span class="m-1 text-secondary">{{time_d}}</span> </li>
          </ul>
    </b-card-text>

    <button class="btn btn-primary btn-block" :disabled="!contact" @click="callNum(contact)"> <i class="fa fa-ban" aria-hidden="true" v-if="!contact"></i> <i class="fa fa-phone" aria-hidden="true" v-else></i> contact</button>
  </b-card>
</div>
</template>

<script>
export default {
props:{
    id:[String,Number],
    name:String,
    photo:String,
    roll:String,
    dep:String,
    btype:String,
    last_d:String,
    time_d:String,
    contact:[Number,String]
},
methods:{
    callNum(num){
  window.open(`tel:${num}`);
  },
}
}
</script>

<style>

</style>
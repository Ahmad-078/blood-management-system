<template>
  <div>
          <div class="form-body d-flex justify-content-center">
        <div class="row">
            <div class="form-holder">
                <div class="form-content">
                    <div class="form-items">
                        <h3>Data feed here</h3>
                        <p>Fill in the data below.</p>
                        <form class="requires-validation" novalidate>
                            <div class="alert alert-danger bg-danger text-white" role="alert" v-if="err.length>1">{{err}}</div>
 <div class="alert alert-success bg-success text-white" role="alert" v-if="success.length">{{success}}</div>
                            <div class="drop display-inline align-center" @dragover.prevent @drop="onDrop">
    <div class="helper"></div> 
	  <label v-if="!image" class="btn display-inline">
	        SELECT OR DROP AN IMAGE
	        <input type="file" name="image_name" @change="onChange" id="select1">
</label> 
        <div class="hidden display-inline align-center" v-else v-bind:class="{ 'image': true }">
        <img :src="image" alt="" class="img" />
        <button class="btn btn-success" @click.once="removeFile">REMOVE</button>
      </div>
      </div>

                            <div class="col-md-12">
                               <input class="form-control" type="text" name="name" placeholder="Full Name" v-model.lazy="name" required>
                            </div>

                            <div class="col-md-12">
                                <input class="form-control" type="text" name="roll" placeholder="Complete Roll Number" v-model.lazy="roll" required>
                                 
                            </div>

                           <div class="col-md-12">
                                <select class="form-select mt-3" required v-model.lazy="dep">
                                      <option selected disabled value="">Department</option>
                                      <option value="I.T.">I.T.</option>
                                      <option value="CSE">CSE</option>
                                      <option value="Mechanical">Mechanical</option>
                                       <option value="Mechanical">Electrical</option>
                                        <option value="Mechanical">Electronic</option>
                               </select>
                           </div>
                               <div class="col-md-12">
                                <select class="form-select mt-3" v-model.lazy="btype">
                                      <option selected disabled value="">Blood Group</option>
                                      <option value="O +ve">O +ve</option>
                                      <option value="O -ve">O -ve</option>
                                      <option value="A +ve">A +ve</option>
                                       <option value="A -ve">A -ve</option>
                                        <option value="B +ve">B +ve</option>
                                         <option value="B -ve">B -ve</option>
                                          <option value="AB +ve">AB +ve</option>
                                           <option value="AB -ve">AB -ve</option>
                               </select>
                                
                           </div>


                           <div class="col-md-12 mt-3">
                              <input class="form-control" type="date" name="date" v-model.lazy="last_d" placeholder="last blood donation date" required>
                           </div>
                            <div class="col-md-12">
                              <input class="form-control" type="text" name="times" placeholder="Number of time denoted" v-model.lazy="time_d" required>
                           </div>

                           <div class="col-md-12 mt-3">
                            <label class="mb-3 mr-1" for="gender"  >Gender: </label>

                            <input type="radio" class="btn-check" name="gender" value="male" id="male" autocomplete="off" required v-model="gender">
                            <label class="btn btn-sm btn-outline-secondary" for="male">Male</label>

                            <input type="radio" class="btn-check" name="gender"  id="female" value="female" autocomplete="off" required v-model="gender">
                            <label class="btn btn-sm btn-outline-secondary" for="female">Female</label>

                            <input type="radio" class="btn-check" name="gender" value="secret" id="secret" autocomplete="off" required v-model="gender">
                            <label class="btn btn-sm btn-outline-secondary" for="secret">Secret</label>
                               <div class="valid-feedback mv-up">You selected a gender!</div>
                                <div class="invalid-feedback mv-up">Please select a gender!</div>
                            </div>

                        <div class="form-check">
                          <input class="form-check-input" type="checkbox" value="" id="invalidCheck" v-model.lazy="checkedAll" required>
                          <label class="form-check-label">I confirm that all data are correct</label>
                         <div class="invalid-feedback">Please confirm that the entered data are all correct!</div>
                        </div>
                  

                            <div class="form-button mt-3">
                                <button id="submit" type="submit" class="btn btn-primary" @click.prevent="register()">Register</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

  </div>
</template>

<script>
export default {
    data() {
        return {
          err:'',
            image: '',
     file_:'',
     image_name:'',
     name:'',
    roll:'',
    dep:'',
    btype:'',
    last_d:'',
    time_d:'',
    gender:'',
    checkedAll:'',
    success:''
        }
    },
    updated(){
      console.log({
         image: this.image,
         image_name:this.image_name,
     name:this.name,
    roll:this.roll,
    dep:this.dep,
    btype:this.btype,
    last_d:this.last_d,
    time_d:this.time_d,
    gender:this.gender,
    checkedAll:this.checkedAll
      })
  },
  /*eslint no-mixed-spaces-and-tabs: ["error", "smart-tabs"]*/
methods: {
      onDrop: function(e) {
        e.stopPropagation();
        e.preventDefault();
        var files = e.dataTransfer.files;
        this.createFile(files[0]);
      },
      onChange(e) {
        var files = e.target.files;
        this.createFile(files[0]);
      },
      createFile(file) {

        if (!file.type.match('image.*')) {
          alert('Select an image');
          return;
        }
        this.file_ = file;
        this.image_name = file.name;
        //var img = new Image();
        var reader = new FileReader();
        var vm = this;

        reader.onload = function(e) {
          vm.image = e.target.result;
        }
        reader.readAsDataURL(file);
      },
      removeFile() {
        this.image = '';
        this.file_ = '';
        this.$emit('removeFile');
      },
      register(){
        if(!this.file && !this.image){
          this.err ='Please select Image'
        }
        if(!this.name){
          this.err='Please Enter valid name'
        }
         if(!this.roll){
          this.err='Please Enter valid Roll Number start with UE..'
        }
         if(!this.dep){
          this.err='Please Enter valid Department'
        }
         if(!this.btype){
          this.err='Please Enter valid Blood group'
        }
         if(!this.last_d){
          this.err='Please Enter last time blood donated'
        }
         if(!this.time_d){
          this.err='Please Enter number of times donated'
        }
         if(!this.name){
          this.err='Please Enter valid gender'
        }
        if(!this.checkedAll){
          this.err='Please check All detail'
        }
        
        if(!this.err){
          this.$store.dispatch('register',{
            image: this.image,
            image_name:this.image_name,
     name:this.name,
    roll:this.roll,
    dep:this.dep,
    btype:this.btype,
    last_d:this.last_d,
    time_d:this.time_d,
    gender:this.gender,
          })
          .then(()=>{
            this.success='Successfull Registerd Condidate'
            setTimeout(() => {
              this.err='',
            this.image='',
     this.file_='',
     this.image_name='',
     this.name='',
    this.roll='',
    this.dep='',
    this.btype='',
    this.last_d='',
    this.time_d='',
    this.gender='',
    this.checkedAll='',
    this.success=''
            }, 1500);
          })
          .catch(()=>{
            this.err='Something error occurred !'
          })
        }

      }
    },
created(){
   
},
}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;700;900&display=swap");

*,
body {
  font-family: "Poppins", sans-serif;
  font-weight: 400;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  -moz-osx-font-smoothing: grayscale;
}

div{
  height: 100%;
  background-color: #646c70;
  overflow: hidden;
}

.form-holder {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 100vh;
}

.form-holder .form-content {
  position: relative;
  text-align: center;
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-align-items: center;
  align-items: center;
  padding: 60px;
}

.form-content .form-items {
  border: 3px solid #fff;
  padding: 40px;
  display: inline-block;
  width: 100%;
  min-width: 540px;
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  border-radius: 10px;
  text-align: left;
  -webkit-transition: all 0.4s ease;
  transition: all 0.4s ease;
}

.form-content h3 {
  color: #fff;
  text-align: left;
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 5px;
}

.form-content h3.form-title {
  margin-bottom: 30px;
}

.form-content p {
  color: #fff;
  text-align: left;
  font-size: 17px;
  font-weight: 300;
  line-height: 20px;
  margin-bottom: 30px;
}

.form-content label,
.was-validated .form-check-input:invalid ~ .form-check-label,
.was-validated .form-check-input:valid ~ .form-check-label {
  color: #fff;
}

.form-content input[type="text"],
.form-content input[type="password"],
.form-content input[type="email"],
.form-content select {
  width: 100%;
  padding: 9px 20px;
  text-align: left;
  border: 0;
  outline: 0;
  border-radius: 6px;
  background-color: #fff;
  font-size: 15px;
  font-weight: 300;
  color: #8d8d8d;
  -webkit-transition: all 0.3s ease;
  transition: all 0.3s ease;
  margin-top: 16px;
}

.btn-primary {
  background-color: #6c757d;
  outline: none;
  border: 0px;
  box-shadow: none;
}

.btn-primary:hover,
.btn-primary:focus,
.btn-primary:active {
  background-color: #495056;
  outline: none !important;
  border: none !important;
  box-shadow: none;
}

.form-content textarea {
  position: static !important;
  width: 100%;
  padding: 8px 20px;
  border-radius: 6px;
  text-align: left;
  background-color: #fff;
  border: 0;
  font-size: 15px;
  font-weight: 300;
  color: #8d8d8d;
  outline: none;
  resize: none;
  height: 120px;
  -webkit-transition: none;
  transition: none;
  margin-bottom: 14px;
}

.form-content textarea:hover,
.form-content textarea:focus {
  border: 0;
  background-color: #ebeff8;
  color: #8d8d8d;
}

.mv-up {
  margin-top: -9px !important;
  margin-bottom: 8px !important;
}

.invalid-feedback {
  color: #ff606e;
}

.valid-feedback {
  color: #2acc80;
}
* {
  font-family: "Arial";
  font-size: 12px;
}

*,
*:after,
*:before {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -webkit-touch-callout: none;
}

html, body {
  height: 100%;
  text-align: center;
}

.btn {
  background-color: royalblue;
  border: 100%;
  color: #fff;
  cursor: pointer;
  display: inline-block;
  font-weight: bold;
  padding: 15px 35px;
  margin:20px;
  position: relative;
}
.btn:active {
  box-shadow: 0 4px #999;
  transform: translateY(4px);  
}
.btn-success{
  background-color: orange;
  border: 100%;
  color: #fff;
  margin:20px;
  cursor: pointer;
  display: inline-block;
  font-weight: bold;
  padding: 15px 35px;
  position: relative;
}

.btn:hover {
  background-color: #722040;
}

input[type=file] {
  position: absolute;
  opacity: 0;
  z-index: -1;
}

.align-center {
  text-align: center;
}

.helper {
  height: 100%;
  display: inline-block;
  vertical-align: middle;
  width: 0;
}

.hidden {
  display: none !important;
}

.hidden.image {
  display: inline-block !important;
}

.display-inline {
  display: inline-block;
  vertical-align: middle;
}

.img {
  border: 1px solid #f6f6f6;
  display: inline-block;
  height: auto;
  max-height: 360px;
  max-width: 300px;
  width: auto;
}

.drop {
  background-color: red;
  border: 4px dashed #ccc;
  background-color: #f6f6f6;
  border-radius: 2px;
  height: 100%;
  max-height: auto;
  max-width: auto;
  width: 100%;
}

</style>